import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'

export class MarketFileSuccessEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'market.FileSuccess')
  }

  /**
   *  Place a storage order success.
   *  The first item is the account who places the storage order.
   *  The second item is the cid of the file.
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('market.FileSuccess') === '15a3ff7f9477a0e9afa431990d912c8024d507c02d31c44934807bcebbbd3adf'
  }

  /**
   *  Place a storage order success.
   *  The first item is the account who places the storage order.
   *  The second item is the cid of the file.
   */
  get asV1(): [Uint8Array, Uint8Array] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): [Uint8Array, Uint8Array] {
    deprecateLatest()
    return this.asV1
  }
}

export class SworkJoinGroupSuccessEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'swork.JoinGroupSuccess')
  }

  /**
   *  Join the group success.
   *  The first item is the member's account.
   *  The second item is the group owner's account.
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('swork.JoinGroupSuccess') === 'e54ae910805a8a9413af1a7f5885a5d0ba5f4e105175cd6b0ce2a8702ddf1861'
  }

  /**
   *  Join the group success.
   *  The first item is the member's account.
   *  The second item is the group owner's account.
   */
  get asV1(): [Uint8Array, Uint8Array] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): [Uint8Array, Uint8Array] {
    deprecateLatest()
    return this.asV1
  }
}

export class SworkWorksReportSuccessEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'swork.WorksReportSuccess')
  }

  /**
   *  Send the work report success.
   *  The first item is the account who send the work report
   *  The second item is the pub key of the sWorker.
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('swork.WorksReportSuccess') === '15a3ff7f9477a0e9afa431990d912c8024d507c02d31c44934807bcebbbd3adf'
  }

  /**
   *  Send the work report success.
   *  The first item is the account who send the work report
   *  The second item is the pub key of the sWorker.
   */
  get asV1(): [Uint8Array, Uint8Array] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): [Uint8Array, Uint8Array] {
    deprecateLatest()
    return this.asV1
  }
}
