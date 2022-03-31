import * as ss58 from "@subsquid/ss58";
import {
  EventHandlerContext,
  Store,
  SubstrateProcessor,
  assertNotNull,
  ExtrinsicHandler,
  ExtrinsicHandlerContext,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { AccountIdentity } from "./model";
import { IdentityIdentitySetEvent } from "./types/events";
import { IdentitySetIdentityCall } from "./types/calls";
import { IdentityInfo } from "./types/v9110";

const processor = new SubstrateProcessor("polkadot_identities");

processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive("polkadot")[0].url,
  chain: "wss://rpc.polkadot.io",
});

processor.addEventHandler("identity.IdentitySet", async (ctx) => {
  console.log(ctx.extrinsic?.name);
  console.log(ctx.event.name);
  const identityEvent = getIdentitySetEvent(ctx);
  const accountId = assertNotNull( encodeID(identityEvent.who, 0));
  console.log(accountId);

  let { store, block, event, extrinsic, _chain } = ctx;
  const identityInfo = extrinsic? getIndentitySetCall({ store, block, event, extrinsic, _chain }) : null;
  // // console.log(Buffer.from(identityExt.web.raw).toString('hex'));
  // // console.log(hexToString(identityInfo.web.value));
  console.log(identityInfo?.web);
  const identity = await getOrCreate(ctx.store, AccountIdentity, assertNotNull(accountId));
  // identity.display = hexToString(identityInfo.web);
  // identity.legal = hexToString(identityInfo.web);
  // identity.web = hexToString(identityInfo.web);
  // identity.riot = hexToString(identityInfo.web);
  // identity.email = hexToString(identityInfo.web);
  // identity.image = hexToString(identityInfo.web);
  // identity.image = hexToString(identityInfo.web);
  
  await ctx.store.save(identity);
});

processor.run();

function getIndentitySetCall(ctx: ExtrinsicHandlerContext): IdentityInfo {
    const call = new IdentitySetIdentityCall(ctx);
    if (call.isV5) {
      const eventInfo = call.asV5;
      return eventInfo.info;
    }
    if (call.isV9110) {
      const eventInfo = call.asV9110;
      return eventInfo.info;
    }
    throw new Error("No Runtime version found");
}

interface IdentityIdentitySetEventInt {
  who: Uint8Array;
}

function getIdentitySetEvent(
  ctx: EventHandlerContext
): IdentityIdentitySetEventInt {
  const event = new IdentityIdentitySetEvent(ctx);
  if (event.isV5) {
    const who = event.asV5;
    return { who };
  }
  if (event.isV9140) {
    const { who } = event.asV9140;
    return { who };
  }
  throw new Error("No Runtime version found");
}

async function getOrCreate<T extends { id: string }>(
  store: Store,
  EntityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {
  let entity = await store.get<T>(EntityConstructor, {
    where: { id },
  });

  if (entity == null) {
    entity = new EntityConstructor();
    entity.id = id;
  }

  return entity;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};

function encodeID(ID: Uint8Array, prefix: string | number) {
  let ret: string | null;
  try {
    ret = ss58.codec(prefix).encode(ID);
  } catch (e) {
    ret = null;
  }

  return ret;
}

function isHex(text: string) {
  return text.startsWith("0x");
}

function hexToString(text: string) {
  let ret: string | null;
  try {
    ret = isHex(text)
      ? Buffer.from(text.replace(/^0x/, ""), "hex").toString()
      : text;
  } catch (e) {
    ret = null;
  }
  return ret;
}
