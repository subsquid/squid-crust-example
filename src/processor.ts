import { lookupArchive } from "@subsquid/archive-registry";
import * as ss58 from "@subsquid/ss58";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  toHex,
} from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { In } from "typeorm";
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
import { EventItem } from "@subsquid/substrate-processor/lib/interfaces/dataSelection";

const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setDataSource({
    // Lookup archive by the network name in the Subsquid registry
    archive: lookupArchive("kusama", { release: "FireSquid" }),

    // Use archive created by archive/docker-compose.yml
    // archive: 'http://localhost:8888/graphql'
  })
  .setBlockRange({ from: 583000 })
  .addEvent("Market.FileSuccess", {
    data: { event: { args: true } },
  } as const)
  .addEvent("Swork.JoinGroupSuccess", {
    data: { event: { args: true } },
  } as const)
  .addEvent("Swork.WorksReportSuccess", {
    data: { event: { args: true } },
  } as const);

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

processor.run(new TypeormDatabase(), async (ctx) => {
  let events = getEvents(ctx);

  let accountIds = new Set<string>();
  for (const jg of events.joinGroups) {
    accountIds.add(jg.memberId);
  }
  for (const mf of events.marketFiles) {
    accountIds.add(mf.accountId);
  }
  for (const wr of events.workReports) {
    accountIds.add(wr.accountId);
  }

  let accounts = await ctx.store
    .findBy(Account, { id: In([...accountIds]) })
    .then((accounts) => {
      return new Map(accounts.map((a) => [a.id, a]));
    });

  await ctx.store.save(Array.from(accounts.values()));
});

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

interface JoinGroupInfo {
  id: string;
  memberId: string;
  owner: string;
  blockHash: string;
  blockNum: number;
  createdAt: Date;
  extrinisicId: string | null | undefined;
}

interface FileSuccessInfo {
  id: string;
  accountId: string;
  fileCid: string;
  blockHash: string;
  blockNum: number;
  createdAt: Date;
  extrinisicId: string | null | undefined;
}

interface WorkReportInfo {
  id: string;
  accountId: string;
  addedFiles:
    | ((string | undefined | null)[] | undefined | null)[]
    | undefined
    | null;
  deletedFiles:
    | ((string | undefined | null)[] | undefined | null)[]
    | undefined
    | null;
  blockHash: string;
  blockNum: number;
  createdAt: Date;
  extrinisicId: string | null | undefined;
}

interface EventInfo {
  joinGroups: JoinGroupInfo[];
  marketFiles: FileSuccessInfo[];
  workReports: WorkReportInfo[];
}

function getEvents(ctx: Ctx): EventInfo {
  let events: EventInfo = {
    joinGroups: [],
    marketFiles: [],
    workReports: [],
  };
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name === "Swork.JoinGroupSuccess") {
        const e = new SworkJoinGroupSuccessEvent(ctx, item.event);
        events.joinGroups.push({
          id: item.event.id,
          memberId: ss58.codec("crust").encode(e.asV1[0]),
          owner: ss58.codec("crust").encode(e.asV1[1]),
          blockHash: block.header.hash,
          blockNum: block.header.height,
          createdAt: new Date(block.header.timestamp),
          extrinisicId: item.event.id, // error, could not find extrinsicId, assigning eventId
        });
      }
      if (item.name === "Swork.WorksReportSuccess") {
        const e = new MarketFileSuccessEvent(ctx, item.event);
        events.marketFiles.push({
          id: item.event.id,
          accountId: ss58.codec("crust").encode(e.asV1[0]),
          fileCid: toHex(e.asV1[1]),
          blockHash: block.header.hash,
          blockNum: block.header.height,
          createdAt: new Date(block.header.timestamp),
          extrinisicId: item.event.id, // error, could not find extrinsicId, assigning eventId
        });
      }
      if (item.name === "Market.FileSuccess") {
        const e = new SworkWorksReportSuccessEvent(ctx, item.event);
        const addedExtr = item.event.args.find(
          (arg: { name: string }) => arg.name === "addedFiles"
        );
        const deletedExtr = item.event.args.find(
          (arg: { name: string }) => arg.name === "deletedFiles"
        );

        const addedFiles = stringifyArray(Array(addedExtr.value));
        const deletedFiles = stringifyArray(Array(deletedExtr.value));

        if (addedFiles.length > 0 || deletedFiles.length > 0) {
          events.workReports.push({
            id: item.event.id,
            addedFiles: addedFiles,
            deletedFiles: deletedFiles,
            accountId: ss58.codec("crust").encode(e.asV1[0]),
            blockHash: block.header.hash,
            blockNum: block.header.height,
            createdAt: new Date(block.header.timestamp),
            extrinisicId: item.event.id, // error, could not find extrinsicId, assigning eventId
          });
        }
      }
    }
  }
  return events;
}

function getAccount(m: Map<string, Account>, id: string): Account {
  let acc = m.get(id);
  if (acc == null) {
    acc = new Account();
    acc.id = id;
    m.set(id, acc);
  }
  return acc;
}
