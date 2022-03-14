import {create} from './_registry'
import {AccountId32} from '@polkadot/types/interfaces'
import {Bytes, bool, u128, u32, u8} from '@polkadot/types'
import {SubstrateEvent} from '@subsquid/hydra-common'

export namespace Assets {
  /**
   * Some asset class was created. \[asset_id, creator, owner\]
   */
  export class CreatedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32, AccountId32] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value), create('AccountId32', this.event.params[2].value)]
    }
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  export class IssuedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32, u128] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value), create('u128', this.event.params[2].value)]
    }
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  export class TransferredEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32, AccountId32, u128] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value), create('AccountId32', this.event.params[2].value), create('u128', this.event.params[3].value)]
    }
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  export class BurnedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32, u128] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value), create('u128', this.event.params[2].value)]
    }
  }

  /**
   * The management team changed \[asset_id, issuer, admin, freezer\]
   */
  export class TeamChangedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32, AccountId32, AccountId32] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value), create('AccountId32', this.event.params[2].value), create('AccountId32', this.event.params[3].value)]
    }
  }

  /**
   * The owner changed \[asset_id, owner\]
   */
  export class OwnerChangedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value)]
    }
  }

  /**
   * Some account `who` was frozen. \[asset_id, who\]
   */
  export class FrozenEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value)]
    }
  }

  /**
   * Some account `who` was thawed. \[asset_id, who\]
   */
  export class ThawedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value)]
    }
  }

  /**
   * Some asset `asset_id` was frozen. \[asset_id\]
   */
  export class AssetFrozenEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32] {
      return [create('u32', this.event.params[0].value)]
    }
  }

  /**
   * Some asset `asset_id` was thawed. \[asset_id\]
   */
  export class AssetThawedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32] {
      return [create('u32', this.event.params[0].value)]
    }
  }

  /**
   * An asset class was destroyed.
   */
  export class DestroyedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32] {
      return [create('u32', this.event.params[0].value)]
    }
  }

  /**
   * New metadata has been set for an asset. \[asset_id, name, symbol, decimals, is_frozen\]
   */
  export class MetadataSetEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, Bytes, Bytes, u8, bool] {
      return [create('u32', this.event.params[0].value), create('Bytes', this.event.params[1].value), create('Bytes', this.event.params[2].value), create('u8', this.event.params[3].value), create('bool', this.event.params[4].value)]
    }
  }

  /**
   * Metadata has been cleared for an asset. \[asset_id\]
   */
  export class MetadataClearedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32] {
      return [create('u32', this.event.params[0].value)]
    }
  }

  /**
   * An `amount` was transferred in its entirety from `owner` to `destination` by
   * the approved `delegate`.
   * \[id, owner, delegate, destination\]
   */
  export class TransferredApprovedEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [u32, AccountId32, AccountId32, AccountId32, u128] {
      return [create('u32', this.event.params[0].value), create('AccountId32', this.event.params[1].value), create('AccountId32', this.event.params[2].value), create('AccountId32', this.event.params[3].value), create('u128', this.event.params[4].value)]
    }
  }

}
