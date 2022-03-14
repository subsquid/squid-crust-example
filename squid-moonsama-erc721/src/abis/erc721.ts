import {Interface} from "@ethersproject/abi"
import erc721Json from "./ERC721.json"
import {EvmLogHandlerContext} from '@subsquid/substrate-evm-processor'

const abi = new Interface(erc721Json)

export interface TransferEvent {
    from: string
    to: string
    tokenId: bigint
}

const transfer_fragment = abi.getEvent('Transfer(address,address,uint256)')

export const events = {
    'Transfer(address,address,uint256)': {
        topic: abi.getEventTopic('Transfer(address,address,uint256)'),
        decode(data: EvmLogHandlerContext): TransferEvent {
            let result = abi.decodeEventLog(transfer_fragment, data.data || '', data.topics)
            return {
                from: result[0],
                to: result[1],
                tokenId: result[2].toBigInt()
            }
        }
    }
}
