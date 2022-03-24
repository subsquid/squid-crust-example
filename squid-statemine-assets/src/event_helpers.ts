import {
  AssetsCreatedEvent,
  AssetsAssetFrozenEvent,
  AssetsAssetThawedEvent,
  AssetsBurnedEvent,
  AssetsDestroyedEvent,
  AssetsFrozenEvent,
  AssetsIssuedEvent,
  AssetsMetadataClearedEvent,
  AssetsMetadataSetEvent,
  AssetsOwnerChangedEvent,
  AssetsTeamChangedEvent,
  AssetsThawedEvent,
  AssetsTransferredApprovedEvent,
  AssetsTransferredEvent,
} from "./types/events";

import { EventHandlerContext } from "@subsquid/substrate-processor";

export interface AssetsCreatedEventInterface {
  assetId: number;
  creator: Uint8Array;
  owner: Uint8Array;
}

export function getAssetsCreatedEvent(
  ctx: EventHandlerContext
): AssetsCreatedEventInterface {
  const event = new AssetsCreatedEvent(ctx);
  if (event.isV3) {
    const [assetId, creator, owner] = event.asV3;
    return { assetId, creator, owner };
  }
  if (event.isV700) {
    const { assetId, creator, owner } = event.asV700;
    return { assetId, creator, owner };
  }
  throw new Error("No Runtime version found");
}

export interface AssetsOwnerChangedEventInterface {
  assetId: number;
  owner: Uint8Array;
}

export function getAssetsOwnerChangedEventEvent(
  ctx: EventHandlerContext
): AssetsOwnerChangedEventInterface {
  const event = new AssetsOwnerChangedEvent(ctx);
  if (event.isV3) {
    const [assetId, owner] = event.asV3;
    return { assetId, owner };
  }
  if (event.isV700) {
    const { assetId, owner } = event.asV700;
    return { assetId, owner };
  }
  throw new Error("No Runtime version found");
}

export interface AssetTeamChangedEventInterface {
  assetId: number;
  issuer: Uint8Array;
  admin: Uint8Array;
  freezer: Uint8Array;
}

export function getAssetTeamChangedEvent(
  ctx: EventHandlerContext
): AssetTeamChangedEventInterface {
  const event = new AssetsTeamChangedEvent(ctx);
  if (event.isV3) {
    const [assetId, issuer, admin, freezer] = event.asV3;
    return { assetId, issuer, admin, freezer };
  }
  if (event.isV700) {
    const { assetId, issuer, admin, freezer } = event.asV700;
    return { assetId, issuer, admin, freezer };
  }
  throw new Error("No Runtime version found");
}

export interface AssetIdInterface {
  assetId: number;
}

export function getAssetsAssetFrozenEvent(
  ctx: EventHandlerContext
): AssetIdInterface {
  const event = new AssetsAssetFrozenEvent(ctx);
  if (event.isV3) {
    const assetId = event.asV3;
    return { assetId };
  }
  if (event.isV700) {
    const { assetId } = event.asV700;
    return { assetId };
  }
  throw new Error("No Runtime version found");
}

export function getAssetsAssetThawedEvent(
  ctx: EventHandlerContext
): AssetIdInterface {
  const event = new AssetsAssetThawedEvent(ctx);
  if (event.isV3) {
    const assetId = event.asV3;
    return { assetId };
  }
  if (event.isV700) {
    const { assetId } = event.asV700;
    return { assetId };
  }
  throw new Error("No Runtime version found");
}

export function getAssetsDestroyedEvent(
  ctx: EventHandlerContext
): AssetIdInterface {
  const event = new AssetsDestroyedEvent(ctx);
  if (event.isV3) {
    const assetId = event.asV3;
    return { assetId };
  }
  if (event.isV700) {
    const { assetId } = event.asV700;
    return { assetId };
  }
  throw new Error("No Runtime version found");
}

export interface AssetMetadataInterface {
  assetId: number;
  name: Uint8Array;
  symbol: Uint8Array;
  decimals: number;
  isFrozen: boolean;
}

export function getAssetsMetadataSetEvent(
  ctx: EventHandlerContext
): AssetMetadataInterface {
  const event = new AssetsMetadataSetEvent(ctx);
  if (event.isV3) {
    const [assetId, name, symbol, decimals, isFrozen] = event.asV3;
    return { assetId, name, symbol, decimals, isFrozen };
  }
  if (event.isV700) {
    const { assetId, name, symbol, decimals, isFrozen } = event.asV700;
    return { assetId, name, symbol, decimals, isFrozen };
  }
  throw new Error("No Runtime version found");
}

export function getAssetsMetadataClearedEvent(
  ctx: EventHandlerContext
): AssetIdInterface {
  const event = new AssetsMetadataClearedEvent(ctx);
  if (event.isV3) {
    const assetId = event.asV3;
    return { assetId };
  }
  if (event.isV700) {
    const { assetId } = event.asV700;
    return { assetId };
  }
  throw new Error("No Runtime version found");
}

export interface AssetsIssuedEventInterface {
  assetId: number;
  owner: Uint8Array;
  totalSupply: bigint;
}

export function getAssetsIssuedEvent(
  ctx: EventHandlerContext
): AssetsIssuedEventInterface {
  const event = new AssetsIssuedEvent(ctx);
  if (event.isV3) {
    const [assetId, owner, totalSupply] = event.asV3;
    return { assetId, owner, totalSupply };
  }
  if (event.isV504) {
    const [assetId, owner, totalSupply] = event.asV504;
    return { assetId, owner, totalSupply };
  }
  if (event.isV700) {
    const { assetId, owner, totalSupply } = event.asV700;
    return { assetId, owner, totalSupply };
  }
  throw new Error("No Runtime version found");
}

export interface AssetsTransferredEventInterface {
  assetId: number;
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
}

export function getAssetsTransferredEvent(
  ctx: EventHandlerContext
): AssetsTransferredEventInterface {
  const event = new AssetsTransferredEvent(ctx);
  if (event.isV3) {
    const [assetId, from, to, amount] = event.asV3;
    return { assetId, from, to, amount };
  }
  if (event.isV504) {
    const [assetId, from, to, amount] = event.asV504;
    return { assetId, from, to, amount };
  }
  if (event.isV700) {
    const { assetId, from, to, amount } = event.asV700;
    return { assetId, from, to, amount };
  }
  throw new Error("No Runtime version found");
}

export interface AssetsTransferredApprovedEventInterface {
  assetId: number;
  owner: Uint8Array;
  delegate: Uint8Array;
  destination: Uint8Array;
  amount: bigint;
}

export function getAssetsTransferredApprovedEvent(
  ctx: EventHandlerContext
): AssetsTransferredApprovedEventInterface {
  const event = new AssetsTransferredApprovedEvent(ctx);
  if (event.isV3) {
    const [assetId, owner, delegate, destination, amount] = event.asV3;
    return { assetId, owner, delegate, destination, amount };
  }
  if (event.isV504) {
    const [assetId, owner, delegate, destination, amount] = event.asV504;
    return { assetId, owner, delegate, destination, amount };
  }
  if (event.isV700) {
    const { assetId, owner, delegate, destination, amount } = event.asV700;
    return { assetId, owner, delegate, destination, amount };
  }
  throw new Error("No Runtime version found");
}

export interface AssetsFrozenEventInterface {
  assetId: number;
  who: Uint8Array;
}

export function getAssetsFrozenEvent(
  ctx: EventHandlerContext
): AssetsFrozenEventInterface {
  const event = new AssetsFrozenEvent(ctx);
  if (event.isV3) {
    const [assetId, who] = event.asV3;
    return { assetId, who };
  }
  if (event.isV700) {
    const { assetId, who } = event.asV700;
    return { assetId, who };
  }
  throw new Error("No Runtime version found");
}

export function getAssetsThawedEvent(
  ctx: EventHandlerContext
): AssetsFrozenEventInterface {
  const event = new AssetsThawedEvent(ctx);
  if (event.isV3) {
    const [assetId, who] = event.asV3;
    return { assetId, who };
  }
  if (event.isV700) {
    const { assetId, who } = event.asV700;
    return { assetId, who };
  }
  throw new Error("No Runtime version found");
}

export interface AssetsBurnedEventInterface {
  assetId: number;
  owner: Uint8Array;
  balance: bigint;
}

export function getAssetsBurnedEvent(
  ctx: EventHandlerContext
): AssetsBurnedEventInterface {
  const event = new AssetsBurnedEvent(ctx);
  if (event.isV3) {
    const [assetId, owner, balance] = event.asV3;
    return { assetId, owner, balance };
  }
  if (event.isV504) {
    const [assetId, owner, balance] = event.asV504;
    return { assetId, owner, balance };
  }
  if (event.isV700) {
    const { assetId, owner, balance } = event.asV700;
    return { assetId, owner, balance };
  }
  throw new Error("No Runtime version found");
}
