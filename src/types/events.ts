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
    return this.ctx._chain.getEventHash('market.FileSuccess') === 'ad49319822a2ac0ee63c322d4c5476e20f48c8c5705421cd3e5fbb3d276809fc'
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
    return this.ctx._chain.getEventHash('swork.JoinGroupSuccess') === 'fec36c1d81f9490dc6d0685919798598f0bc5f6d7f1c3967da0a7765494ff259'
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
    return this.ctx._chain.getEventHash('swork.WorksReportSuccess') === 'f64f629f75fdde2d0f286201ec75f1d4860e72c32a5c56a254dff8b3059c711a'
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
