import {Owner, Token, Transfer} from "../model";
import {EvmLogHandlerContext} from "@subsquid/substrate-evm-processor";
import {CONTRACT_INSTANCE, getContractEntity} from '../constants'
import * as erc721 from "../abis/erc721"


export interface EVM_LOG {
    data: string;
    topics?: Array<string> | null;
    address: string;

}
export interface ParsedLogs {
    name: string;
    args?: any;
    topics: string;
    fragment: any;
    signature: string;
}

export async function contractLogsHandler(ctx: EvmLogHandlerContext): Promise<void> {
        let transfer = erc721.events['Transfer(address,address,uint256)'].decode(ctx)

        let from = await ctx.store.get(Owner, transfer.from)
        if (from == null) {
            from = new Owner({id: transfer.from, balance: 0n})
            await ctx.store.save(from)
        }

        let to = await ctx.store.get(Owner, transfer.to)
        if (to == null) {
            to = new Owner({id: transfer.to, balance: 0n})
            ctx.store.save(to)
        }

        let token = await ctx.store.get(Token, transfer.tokenId.toString())
        if (token == null) {
            token = new Token({
                id: transfer.tokenId.toString(),
                uri: await CONTRACT_INSTANCE.tokenURI(transfer.tokenId),
                contract: await getContractEntity(ctx),
                owner: to
            })
            await ctx.store.save(token)
        } else {
            token.owner = to
            await ctx.store.save(token)
        }

        await ctx.store.save(new Transfer({
            id: ctx.txHash,
            token,
            from,
            to,
            timestamp: BigInt(ctx.substrate.block.timestamp),
            block: ctx.substrate.block.height,
            transactionHash: ctx.txHash
        }))
}
