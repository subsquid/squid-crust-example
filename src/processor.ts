import {
  SubstrateProcessor,
  EventHandlerContext,
  Store,
} from "@subsquid/substrate-processor";
import {
  Account,
  WorkReport,
  JoinGroup,
  StorageOrder,
} from "./model/generated";
import * as crustTypes from "@crustio/type-definitions";
import {
  MarketFileSuccessEvent,
  SworkJoinGroupSuccessEvent,
  SworkWorksReportSuccessEvent,
} from "./types/events";

const processor = new SubstrateProcessor("crust_example");
processor.setDataSource({
  archive: "https://crust.indexer.gc.subsquid.io/v4/graphql",
  chain: "wss://rpc-crust-mainnet.decoo.io",
});
processor.setBlockRange({ from: 583000 });
processor.setTypesBundle(crustTypes);
processor.addEventHandler("market.FileSuccess", fileSuccess);
processor.addEventHandler("swork.JoinGroupSuccess", joinGroupSuccess);
processor.addEventHandler("swork.WorksReportSuccess", workReportSuccess);

processor.run();

function stringifyArray(list: any[]): any[] {
  let listStr: any[] = [];
  list = list[0];
  for (let vec of list) {
    for (let i = 0; i < vec.length; i++) {
      vec[i] = String(vec[i]);
    }
    listStr.push(vec);
  }
  return listStr;
}

async function joinGroupSuccess(ctx: EventHandlerContext): Promise<void> {
  let event = new SworkJoinGroupSuccessEvent(ctx);
  const memberId = String(event.asV1[0]);
  const account = await getOrCreate(ctx.store, Account, memberId);
  const joinGroup = new JoinGroup();

  joinGroup.id = ctx.event.id;
  joinGroup.member = account;
  joinGroup.owner = String(event.asV1[1]);
  joinGroup.blockHash = ctx.block.hash;
  joinGroup.blockNum = ctx.block.height;
  joinGroup.createdAt = new Date(ctx.block.timestamp);
  joinGroup.extrinisicId = ctx.extrinsic?.id;

  //console.log(joinGroup);
  await ctx.store.save(account);
  await ctx.store.save(joinGroup);
}

async function fileSuccess(ctx: EventHandlerContext): Promise<void> {
  let event = new MarketFileSuccessEvent(ctx);
  const accountId = String(event.asV1[0]);
  const account = await getOrCreate(ctx.store, Account, accountId);
  const storageOrder = new StorageOrder();

  storageOrder.id = ctx.event.id;
  storageOrder.account = account;
  storageOrder.fileCid = String(event.asV1[1]);
  storageOrder.blockHash = ctx.block.hash;
  storageOrder.blockNum = ctx.block.height;
  storageOrder.createdAt = new Date(ctx.block.timestamp);
  storageOrder.extrinisicId = ctx.extrinsic?.id;

  //console.log(storageOrder);
  await ctx.store.save(account);
  await ctx.store.save(storageOrder);
}

async function workReportSuccess(ctx: EventHandlerContext): Promise<void> {
  let event = new SworkWorksReportSuccessEvent(ctx);
  const accountId = String(event.asV1[0]);
  const accountPr = getOrCreate(ctx.store, Account, accountId);
  const addedFilesObjPr = ctx.extrinsic?.args.find(
    (arg) => arg.name === "addedFiles"
  );
  const deletedFilesObjPr = ctx.extrinsic?.args.find(
    (arg) => arg.name === "deletedFiles"
  );
  const [account, addFObj, delFObj] = await Promise.all([
    accountPr,
    addedFilesObjPr,
    deletedFilesObjPr,
  ]);

  const workReport = new WorkReport();

  //console.log(addFObj);
  //console.log(delFObj);

  workReport.addedFiles = stringifyArray(Array(addFObj?.value));
  workReport.deletedFiles = stringifyArray(Array(delFObj?.value));
  if (workReport.addedFiles.length > 0 || workReport.deletedFiles.length > 0) {
    workReport.account = account;

    workReport.id = ctx.event.id;
    workReport.blockHash = ctx.block.hash;
    workReport.blockNum = ctx.block.height;
    workReport.createdAt = new Date(ctx.block.timestamp);
    workReport.extrinisicId = ctx.extrinsic?.id;

    await ctx.store.save(account);
    await ctx.store.save(workReport);
  }
}

async function getOrCreate<T extends { id: string }>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {
  let e = await store.get<T>(entityConstructor, {
    where: { id },
  });

  if (e == null) {
    e = new entityConstructor();
    e.id = id;
  }

  return e;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};
