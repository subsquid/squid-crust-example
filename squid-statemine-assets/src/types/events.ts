import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v504 from './v504'
import * as v700 from './v700'

export class AssetsAssetFrozenEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.AssetFrozen')
  }

  /**
   *  Some asset `asset_id` was frozen. \[asset_id\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.AssetFrozen') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  Some asset `asset_id` was frozen. \[asset_id\]
   */
  get asV3(): number {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some asset `asset_id` was frozen.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.AssetFrozen') === '54828f2ad0eb28b7ccfebfbc9a9a269c2c381874a095b3dc64004ab1045d27b5'
  }

  /**
   * Some asset `asset_id` was frozen.
   */
  get asV700(): {assetId: number} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsAssetThawedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.AssetThawed')
  }

  /**
   *  Some asset `asset_id` was thawed. \[asset_id\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.AssetThawed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  Some asset `asset_id` was thawed. \[asset_id\]
   */
  get asV3(): number {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some asset `asset_id` was thawed.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.AssetThawed') === '54828f2ad0eb28b7ccfebfbc9a9a269c2c381874a095b3dc64004ab1045d27b5'
  }

  /**
   * Some asset `asset_id` was thawed.
   */
  get asV700(): {assetId: number} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsBurnedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Burned')
  }

  /**
   *  Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Burned') === '5a42f36466a84f545ee1a3330dbd7108a20dc2c22012110bbe8ff0aff5bc6309'
  }

  /**
   *  Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get asV3(): [number, Uint8Array, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get isV504(): boolean {
    return this.ctx._chain.getEventHash('assets.Burned') === '491d5eb10503fbf716b3399d749f1a02c0a60c5f903a500a8ed4f9f98fd07f34'
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get asV504(): [number, v504.AccountId32, bigint] {
    assert(this.isV504)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were destroyed.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Burned') === '007cbec9b9082462b45f0bfca685f3eef8cf4f6bd64ebde0c25183d6ec75bef6'
  }

  /**
   * Some assets were destroyed.
   */
  get asV700(): {assetId: number, owner: v700.AccountId32, balance: bigint} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, owner: v700.AccountId32, balance: bigint} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Created')
  }

  /**
   *  Some asset class was created. \[asset_id, creator, owner\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Created') === 'f968eb148e0dc7739feb64d5c72eea0de823dbf44259d08f9a6218f8117bf19a'
  }

  /**
   *  Some asset class was created. \[asset_id, creator, owner\]
   */
  get asV3(): [number, Uint8Array, Uint8Array] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some asset class was created.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Created') === '01c5b4c489f75602f5b4533c646777ff8677cd64a0cd24ad19aaa7193c001974'
  }

  /**
   * Some asset class was created.
   */
  get asV700(): {assetId: number, creator: v700.AccountId32, owner: v700.AccountId32} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, creator: v700.AccountId32, owner: v700.AccountId32} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsDestroyedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Destroyed')
  }

  /**
   *  An asset class was destroyed.
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Destroyed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  An asset class was destroyed.
   */
  get asV3(): number {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An asset class was destroyed.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Destroyed') === '54828f2ad0eb28b7ccfebfbc9a9a269c2c381874a095b3dc64004ab1045d27b5'
  }

  /**
   * An asset class was destroyed.
   */
  get asV700(): {assetId: number} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsFrozenEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Frozen')
  }

  /**
   *  Some account `who` was frozen. \[asset_id, who\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Frozen') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   *  Some account `who` was frozen. \[asset_id, who\]
   */
  get asV3(): [number, Uint8Array] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some account `who` was frozen.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Frozen') === '29f48097267d9c17a862db4feed96968aaccbc735ba9e4e1ed85812507045cbb'
  }

  /**
   * Some account `who` was frozen.
   */
  get asV700(): {assetId: number, who: v700.AccountId32} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, who: v700.AccountId32} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsIssuedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Issued')
  }

  /**
   *  Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Issued') === '5a42f36466a84f545ee1a3330dbd7108a20dc2c22012110bbe8ff0aff5bc6309'
  }

  /**
   *  Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get asV3(): [number, Uint8Array, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get isV504(): boolean {
    return this.ctx._chain.getEventHash('assets.Issued') === '491d5eb10503fbf716b3399d749f1a02c0a60c5f903a500a8ed4f9f98fd07f34'
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get asV504(): [number, v504.AccountId32, bigint] {
    assert(this.isV504)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were issued.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Issued') === '04a293a0727dace50583b1e9066320bba9eca27b394195f231ba9797603d6046'
  }

  /**
   * Some assets were issued.
   */
  get asV700(): {assetId: number, owner: v700.AccountId32, totalSupply: bigint} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, owner: v700.AccountId32, totalSupply: bigint} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsMetadataClearedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.MetadataCleared')
  }

  /**
   *  Metadata has been cleared for an asset. \[asset_id\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.MetadataCleared') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  Metadata has been cleared for an asset. \[asset_id\]
   */
  get asV3(): number {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Metadata has been cleared for an asset.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.MetadataCleared') === '54828f2ad0eb28b7ccfebfbc9a9a269c2c381874a095b3dc64004ab1045d27b5'
  }

  /**
   * Metadata has been cleared for an asset.
   */
  get asV700(): {assetId: number} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsMetadataSetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.MetadataSet')
  }

  /**
   *  New metadata has been set for an asset. \[asset_id, name, symbol, decimals, is_frozen\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.MetadataSet') === 'c1d0d141c6696c0e5c576dd8a951639d8107c6372398a2645e76ee469b471a5e'
  }

  /**
   *  New metadata has been set for an asset. \[asset_id, name, symbol, decimals, is_frozen\]
   */
  get asV3(): [number, Uint8Array, Uint8Array, number, boolean] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New metadata has been set for an asset.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.MetadataSet') === '70e50f56e329151cd6ac15f45bb6a69c66f668bf4a5fd0b33a5e87b09e296498'
  }

  /**
   * New metadata has been set for an asset.
   */
  get asV700(): {assetId: number, name: Uint8Array, symbol: Uint8Array, decimals: number, isFrozen: boolean} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, name: Uint8Array, symbol: Uint8Array, decimals: number, isFrozen: boolean} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsOwnerChangedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.OwnerChanged')
  }

  /**
   *  The owner changed \[asset_id, owner\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.OwnerChanged') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   *  The owner changed \[asset_id, owner\]
   */
  get asV3(): [number, Uint8Array] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * The owner changed.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.OwnerChanged') === '282af926068c862d990c6860efc77d13688c62323eee89a0ff55df22fc3daffb'
  }

  /**
   * The owner changed.
   */
  get asV700(): {assetId: number, owner: v700.AccountId32} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, owner: v700.AccountId32} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsTeamChangedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.TeamChanged')
  }

  /**
   *  The management team changed \[asset_id, issuer, admin, freezer\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.TeamChanged') === '608cf8b84887966db26c958a6b826fd41d8e098263ce7eaae9a421f1f8b1bd56'
  }

  /**
   *  The management team changed \[asset_id, issuer, admin, freezer\]
   */
  get asV3(): [number, Uint8Array, Uint8Array, Uint8Array] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * The management team changed.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.TeamChanged') === 'a4b3b1ea6aeb9cd592ffdda2f65983c16c73356bc6d83cc839a7f7a15f9a5a7b'
  }

  /**
   * The management team changed.
   */
  get asV700(): {assetId: number, issuer: v700.AccountId32, admin: v700.AccountId32, freezer: v700.AccountId32} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, issuer: v700.AccountId32, admin: v700.AccountId32, freezer: v700.AccountId32} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsThawedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Thawed')
  }

  /**
   *  Some account `who` was thawed. \[asset_id, who\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Thawed') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   *  Some account `who` was thawed. \[asset_id, who\]
   */
  get asV3(): [number, Uint8Array] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some account `who` was thawed.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Thawed') === '29f48097267d9c17a862db4feed96968aaccbc735ba9e4e1ed85812507045cbb'
  }

  /**
   * Some account `who` was thawed.
   */
  get asV700(): {assetId: number, who: v700.AccountId32} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, who: v700.AccountId32} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsTransferredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Transferred')
  }

  /**
   *  Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.Transferred') === '5940cf5f83945a6024e99655f1979c05762583b5af1201dba66c10c18b56cff1'
  }

  /**
   *  Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get asV3(): [number, Uint8Array, Uint8Array, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get isV504(): boolean {
    return this.ctx._chain.getEventHash('assets.Transferred') === 'd6b774c5b258baa877a8319bea3e3f8d42d54077cfd3ad4848765f205196496c'
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get asV504(): [number, v504.AccountId32, v504.AccountId32, bigint] {
    assert(this.isV504)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were transferred.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.Transferred') === 'd868858871cc662d14a67687feea357ae842db006bcaef16e832ad8bf3f67215'
  }

  /**
   * Some assets were transferred.
   */
  get asV700(): {assetId: number, from: v700.AccountId32, to: v700.AccountId32, amount: bigint} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, from: v700.AccountId32, to: v700.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV700
  }
}

export class AssetsTransferredApprovedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.TransferredApproved')
  }

  /**
   *  An `amount` was transferred in its entirety from `owner` to `destination` by
   *  the approved `delegate`.
   *  \[id, owner, delegate, destination\]
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('assets.TransferredApproved') === '311643bc5e8d1c3925b7916b65076213b8e04c24ee9268c197cff25413f64807'
  }

  /**
   *  An `amount` was transferred in its entirety from `owner` to `destination` by
   *  the approved `delegate`.
   *  \[id, owner, delegate, destination\]
   */
  get asV3(): [number, Uint8Array, Uint8Array, Uint8Array, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An `amount` was transferred in its entirety from `owner` to `destination` by
   * the approved `delegate`.
   * \[id, owner, delegate, destination\]
   */
  get isV504(): boolean {
    return this.ctx._chain.getEventHash('assets.TransferredApproved') === 'aa5749cf7f3cabc0e53fe58112a189f75671f6e6ed828d09582d110abfd0cc53'
  }

  /**
   * An `amount` was transferred in its entirety from `owner` to `destination` by
   * the approved `delegate`.
   * \[id, owner, delegate, destination\]
   */
  get asV504(): [number, v504.AccountId32, v504.AccountId32, v504.AccountId32, bigint] {
    assert(this.isV504)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An `amount` was transferred in its entirety from `owner` to `destination` by
   * the approved `delegate`.
   */
  get isV700(): boolean {
    return this.ctx._chain.getEventHash('assets.TransferredApproved') === 'cbd00ccb7ac2b444ece8aa7a3d2465c57c56be8f0925f97a42d8eb5cb7edb95d'
  }

  /**
   * An `amount` was transferred in its entirety from `owner` to `destination` by
   * the approved `delegate`.
   */
  get asV700(): {assetId: number, owner: v700.AccountId32, delegate: v700.AccountId32, destination: v700.AccountId32, amount: bigint} {
    assert(this.isV700)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV700
  }

  get asLatest(): {assetId: number, owner: v700.AccountId32, delegate: v700.AccountId32, destination: v700.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV700
  }
}
