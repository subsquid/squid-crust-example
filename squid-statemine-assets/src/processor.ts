import {
  SubstrateProcessor,
  EventHandlerContext,
  Store,
  assertNotNull,
} from "@subsquid/substrate-processor";
import * as ss58 from '@subsquid/ss58'
import {
  Account,
  Asset,
  AssetBalance,
  AssetStatus,
  Transfer,
  TransferType,
} from "./model/generated";
import {
  getAssetsCreatedEvent,
  getAssetsOwnerChangedEventEvent,
  getAssetTeamChangedEvent,
  getAssetsAssetFrozenEvent,
  getAssetsAssetThawedEvent,
  getAssetsDestroyedEvent,
  getAssetsMetadataSetEvent,
  getAssetsMetadataClearedEvent,
  getAssetsIssuedEvent,
  getAssetsTransferredEvent,
  getAssetsBurnedEvent,
  getAssetsTransferredApprovedEvent,
  getAssetsFrozenEvent,
  getAssetsThawedEvent,
} from "./event_helpers";

const processor = new SubstrateProcessor("statemine_example");
processor.setDataSource({
  archive: "https://statemine.indexer.gc.subsquid.io/v4/graphql",
  chain: "wss://statemine-rpc.dwellir.com",
});

processor.setBlockRange({ from: 370000 });
processor.setTypesBundle("./typesBundle.json");

processor.addEventHandler("assets.Created", assetCreated);
processor.addEventHandler("assets.AssetFrozen", assetFrozen);
processor.addEventHandler("assets.AssetThawed", assetThawed);
processor.addEventHandler("assets.Destroyed", assetDestroyed);
processor.addEventHandler("assets.OwnerChanged", assetOwnerChanged);
processor.addEventHandler("assets.TeamChanged", assetTeamChanged);
processor.addEventHandler("assets.MetadataSet", assetMetadata);
processor.addEventHandler("assets.MetadataCleared", assetMetadataCleared);
processor.addEventHandler("assets.Issued", assetIssued);
processor.addEventHandler("assets.Transferred", assetTransfer);
processor.addEventHandler(
  "assets.TransferredApproved",
  assetTransferredApproved
);
processor.addEventHandler("assets.Frozen", assetAccountFrozen);
processor.addEventHandler("assets.Burned", assetBalanceBurned);
processor.addEventHandler("assets.Thawed", assetBalanceThawed);

processor.run();

export async function assetCreated(ctx: EventHandlerContext): Promise<void> {
  const { assetId, creator, owner } = getAssetsCreatedEvent(ctx);

  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.id = assetId.toString();
  asset.creator = assertNotNull(encodeID(creator, 2));
  asset.owner = assertNotNull(encodeID(owner, 2));
  asset.status = AssetStatus.ACTIVE;
  asset.totalSupply = 0n;

  await ctx.store.save(asset);
}

export async function assetOwnerChanged(
  ctx: EventHandlerContext
): Promise<void> {
  const { assetId, owner } = getAssetsOwnerChangedEventEvent(ctx);

  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.owner = assertNotNull(encodeID(owner, 2));

  await ctx.store.save(asset);
}

export async function assetTeamChanged(
  ctx: EventHandlerContext
): Promise<void> {
  const { assetId, issuer, admin, freezer } = getAssetTeamChangedEvent(ctx);
  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.issuer = assertNotNull(encodeID(issuer, 2));
  asset.admin = assertNotNull(encodeID(admin, 2));
  asset.freezer = assertNotNull(encodeID(freezer, 2));

  await ctx.store.save(asset);
}

export async function assetFrozen(ctx: EventHandlerContext): Promise<void> {
  const assetId = getAssetsAssetFrozenEvent(ctx);
  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.status = AssetStatus.FREEZED;

  await ctx.store.save(asset);
}

export async function assetThawed(ctx: EventHandlerContext): Promise<void> {
  const assetId = getAssetsAssetThawedEvent(ctx);
  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.status = AssetStatus.ACTIVE;

  await ctx.store.save(asset);
}

export async function assetDestroyed(ctx: EventHandlerContext): Promise<void> {
  const assetId = getAssetsDestroyedEvent(ctx);
  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.status = AssetStatus.DESTROYED;

  await ctx.store.save(asset);
}

export async function assetMetadata(ctx: EventHandlerContext): Promise<void> {
  const { assetId, name, symbol, decimals, isFrozen } =
    getAssetsMetadataSetEvent(ctx);
  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.name = String.fromCharCode(...name);
  asset.symbol = String.fromCharCode(...symbol);
  asset.decimal = decimals;
  asset.status = isFrozen ? AssetStatus.FREEZED : AssetStatus.ACTIVE;

  await ctx.store.save(asset);
}

export async function assetMetadataCleared(
  ctx: EventHandlerContext
): Promise<void> {
  const assetId = getAssetsMetadataClearedEvent(ctx);
  const asset = await getOrCreate(ctx.store, Asset, assetId.toString());

  asset.name = null;
  asset.symbol = null;
  asset.decimal = null;
  asset.status = asset.status ? asset.status : AssetStatus.ACTIVE;

  await ctx.store.save(asset);
}

export async function assetIssued(ctx: EventHandlerContext): Promise<void> {
  const { assetId, owner, totalSupply } = getAssetsIssuedEvent(ctx);
  const [asset] = await changeAssetBalance(
    ctx.store,
    assetId,
    owner,
    totalSupply
  );
  asset.owner = assertNotNull(encodeID(owner, 2));
  asset.totalSupply = asset.totalSupply || 0n + totalSupply;

  await ctx.store.save(asset);

  const transfer = new Transfer();
  transfer.amount = totalSupply;
  transfer.asset = asset;
  transfer.blockHash = ctx.block.hash;
  transfer.blockNum = ctx.block.height;
  transfer.createdAt = new Date(ctx.block.timestamp);
  transfer.extrinisicId = ctx.extrinsic?.id;
  transfer.to = assertNotNull(encodeID(owner, 2));
  transfer.id = ctx.event.id;
  transfer.type = TransferType.MINT;
  transfer.success = true;
  await ctx.store.save(transfer);
}

export async function assetTransfer(ctx: EventHandlerContext): Promise<void> {
  const { assetId, from, to, amount } = getAssetsTransferredEvent(ctx);
  const [asset] = await changeAssetBalance(
    ctx.store,
    assetId,
    from,
    -amount // decrements from sender account
  );
  await changeAssetBalance(ctx.store, assetId, to, amount);

  const transfer = new Transfer();
  transfer.amount = amount;
  transfer.asset = asset;
  transfer.blockHash = ctx.block.hash;
  transfer.blockNum = ctx.block.height;
  transfer.createdAt = new Date(ctx.block.timestamp);
  transfer.extrinisicId = ctx.extrinsic?.id;
  transfer.to = assertNotNull(encodeID(to, 2));
  transfer.from = assertNotNull(encodeID(from, 2));
  transfer.id = ctx.event.id;
  transfer.type = TransferType.REGULAR;
  transfer.success = true;
  await ctx.store.save(transfer);
}

export async function assetBalanceBurned(
  ctx: EventHandlerContext
): Promise<void> {
  const { assetId, owner, balance } = getAssetsBurnedEvent(ctx);
  const [asset] = await changeAssetBalance(
    ctx.store,
    assetId,
    owner,
    -balance // decrements from account
  );

  const transfer = new Transfer();
  transfer.amount = balance;
  transfer.asset = asset;
  transfer.blockHash = ctx.block.hash;
  transfer.blockNum = ctx.block.height;
  transfer.createdAt = new Date(ctx.block.timestamp);
  transfer.extrinisicId = ctx.extrinsic?.id;
  transfer.from = assertNotNull(encodeID(owner, 2));
  transfer.id = ctx.event.id;
  transfer.type = TransferType.BURN;
  transfer.success = true;
  await ctx.store.save(transfer);
}

export async function assetTransferredApproved(
  ctx: EventHandlerContext
): Promise<void> {
  const { assetId, owner, delegate, destination, amount } =
    getAssetsTransferredApprovedEvent(ctx);
  const [asset] = await changeAssetBalance(
    ctx.store,
    assetId,
    owner,
    -amount // decrements from sender account
  );
  await changeAssetBalance(ctx.store, assetId, destination, amount);

  const transfer = new Transfer();
  transfer.amount = amount;
  transfer.asset = asset;
  transfer.blockHash = ctx.block.hash;
  transfer.blockNum = ctx.block.height;
  transfer.createdAt = new Date(ctx.block.timestamp);
  transfer.extrinisicId = ctx.extrinsic?.id;
  transfer.to = assertNotNull(encodeID(destination, 2));
  transfer.from = assertNotNull(encodeID(owner, 2));
  transfer.delegator = assertNotNull(encodeID(delegate, 2));
  transfer.id = ctx.event.id;
  transfer.type = TransferType.DELEGATED;
  transfer.success = true;
  await ctx.store.save(transfer);
}

export async function assetAccountFrozen(
  ctx: EventHandlerContext
): Promise<void> {
  const {assetId, who} = getAssetsFrozenEvent(ctx);
  const [asset, , assetBalance] = await getAssetAccountDetails(
    ctx.store,
    assetId,
    who
  );
  assetBalance.status = AssetStatus.FREEZED;
  await ctx.store.save(assetBalance);

  const transfer = new Transfer();
  transfer.amount = assetBalance.balance;
  transfer.asset = asset;
  transfer.blockHash = ctx.block.hash;
  transfer.blockNum = ctx.block.height;
  transfer.createdAt = new Date(ctx.block.timestamp);
  transfer.extrinisicId = ctx.extrinsic?.id;
  transfer.from = assertNotNull(encodeID(who, 2));
  transfer.id = ctx.event.id;
  transfer.type = TransferType.FREEZE;
  transfer.success = true;
  await ctx.store.save(transfer);
}

export async function assetBalanceThawed(
  ctx: EventHandlerContext
): Promise<void> {
  const {assetId, who} = getAssetsThawedEvent(ctx);
  const [asset, , assetBalance] = await getAssetAccountDetails(
    ctx.store,
    assetId,
    who
  );
  assetBalance.status = AssetStatus.ACTIVE;
  await ctx.store.save(assetBalance);

  const transfer = new Transfer();
  transfer.amount = assetBalance.balance;
  transfer.asset = asset;
  transfer.blockHash = ctx.block.hash;
  transfer.blockNum = ctx.block.height;
  transfer.createdAt = new Date(ctx.block.timestamp);
  transfer.extrinisicId = ctx.extrinsic?.id;
  transfer.from = assertNotNull(encodeID(who, 2));
  transfer.id = ctx.event.id;
  transfer.type = TransferType.THAWED;
  transfer.success = true;
  await ctx.store.save(transfer);
}

async function getOrCreate<T extends { id: string }>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  entity_id: string
): Promise<T> {
  let e = await store.get<T>(entityConstructor, {
    where: { id: `${entity_id}` },
  });

  if (e == null) {
    e = new entityConstructor();
    e.id = entity_id;
  }

  return e;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};


async function getAssetAccountDetails(
  store: Store,
  assetId: number,
  accountId: Uint8Array
): Promise<[Asset, Account, AssetBalance]> {

  const encodedAccountId = assertNotNull(encodeID(accountId, 2));
  // const encodedAccountId = Buffer.from(accountId).toString('hex')
  const asset = await getOrCreate(store, Asset, assetId.toString());
  const account = await getOrCreate(store, Account, encodedAccountId);
  const assetBalance = await getOrCreate(store, AssetBalance, `${assetId}-${encodedAccountId}`);

  assetBalance.status = assetBalance.status
    ? assetBalance.status
    : AssetStatus.ACTIVE;
  return [asset, account, assetBalance];
}

async function changeAssetBalance(
  store: Store,
  assetId: number,
  accountId: Uint8Array,
  amount: bigint
): Promise<[Asset, Account, AssetBalance]> {
  const [asset, account, assetBalance] = await getAssetAccountDetails(store, assetId, accountId);

  await store.save(asset);
  await store.save(account);
  assetBalance.asset = asset;
  assetBalance.balance = assetBalance.balance || 0n + amount;
  assetBalance.account = account;
  await store.save(assetBalance);
  return [asset, account, assetBalance];
}

function encodeID(ID: Uint8Array, prefix: string | number) {
  let ret: string | null
  try {
      ret = ss58.codec(prefix).encode(ID)
  } catch (e) {
      ret = null
  }

  return ret
}
