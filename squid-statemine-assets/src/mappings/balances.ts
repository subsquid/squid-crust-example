import { EventContext, StoreContext } from "@subsquid/hydra-common";
import {
  Account,
  HistoricalBalance,
  Transfer,
  TransferType,
} from "../generated/model";
import { Balances } from "../types/index";
import { get, getOrCreate } from "./helpers/entity-utils";

export async function balancesTransfer({
  store,
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  const [from, to, value] = new Balances.TransferEvent(event).params;
  const tip = extrinsic?.tip || 0n;

  const fromAcc = await getOrCreate(store, Account, from.toHex());
  fromAcc.wallet = from.toHuman();
  fromAcc.balance = fromAcc.balance || 0n;
  fromAcc.balance -= value.toBigInt();
  fromAcc.balance -= tip;
  await store.save(fromAcc);

  const toAcc = await getOrCreate(store, Account, to.toHex());
  toAcc.wallet = to.toHuman();
  toAcc.balance = toAcc.balance || 0n;
  toAcc.balance += value.toBigInt();
  await store.save(toAcc);

  const hbFrom = new HistoricalBalance();
  hbFrom.account = fromAcc;
  hbFrom.balance = fromAcc.balance;
  hbFrom.timestamp = new Date(block.timestamp);
  await store.save(hbFrom);

  const hbTo = new HistoricalBalance();
  hbTo.account = toAcc;
  hbTo.balance = toAcc.balance;
  hbTo.timestamp = new Date(block.timestamp);
  await store.save(hbTo);

  const transfer = new Transfer();
  transfer.amount = value.toBigInt();
  transfer.blockHash = block.hash;
  transfer.blockNum = block.height;
  transfer.extrinisicId = extrinsic?.id;
  transfer.from = from.toString();
  transfer.to = to.toString();
  transfer.success = true;
  transfer.id = event.id;
  transfer.type = TransferType.REGULAR;
  transfer.createdAt = new Date(block.timestamp);

  await store.save(transfer);
}

export async function transferFee({
  store,
  event,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  const [, fees] = new Balances.DepositEvent(event).params;

  if (extrinsic?.id) {
    const transfer = await get(store, Transfer, extrinsic?.id);
    if (!transfer) {
      // console.error("No transfer found for deposit event", event.id);
      return;
    }
    transfer.fee = fees.toBigInt();
    await store.save(transfer);
  } else {
    console.error("Extrinsic Null for deposit event ", event.id);
  }
}
