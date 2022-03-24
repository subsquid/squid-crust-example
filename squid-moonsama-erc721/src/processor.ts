import {CONTRACT_ADDRESS, createContractEntity} from "./constants";
import {contractLogsHandler} from "./helpers/event";
import {assertNotNull, SubstrateEvmProcessor} from "@subsquid/substrate-evm-processor";
import * as erc721 from "./abis/erc721"


const processor = new SubstrateEvmProcessor('moonbeam-substrate')

const batchSize = parseInt(process.env.BATCH_SIZE || '');
processor.setBatchSize(Number.isInteger(batchSize) ? batchSize : 500)


processor.setDataSource({
    chain: assertNotNull(process.env.CHAIN_NODE),
    archive: assertNotNull(process.env.ARCHIVE)
})

processor.setTypesBundle('moonbeam');

processor.addPreHook({range: {from: 0, to: 0}}, async ctx => {
    await ctx.store.save(createContractEntity())
})


processor.addEvmLogHandler(
    CONTRACT_ADDRESS, 
    {
        filter: [
            erc721.events['Transfer(address,address,uint256)'].topic
        ], 
    }, 
    contractLogsHandler
)

processor.run()
