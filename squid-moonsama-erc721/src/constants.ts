import {assertNotNull, Store} from "@subsquid/substrate-evm-processor"
import {ethers} from "ethers";
import ABI from './abis/ERC721.json'
import {Contract} from "./model"

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';

// API constants
export const INDEXER = process.env.INDEXER_ENDPOINT_URL
export const API_RETRIES = 5;

// From contract
export const CONTRACT_NAME = 'Moonsama'
export const CONTRACT_SYMBOL = 'MSAMA'
export const CONTRACT_TOTAL_SUPPLY = 1000n

// ethers contract
export const PROVIDER = new ethers.providers.WebSocketProvider(process.env.CHAIN_NODE || '');
export const CONTRACT_INSTANCE = new ethers.Contract(
    CONTRACT_ADDRESS, 
    ABI, 
    PROVIDER
);

export function createContractEntity(): Contract {
    return new Contract({
        id: CONTRACT_INSTANCE.address,
        name: 'Moonsama',
        symbol: 'MSAMA',
        totalSupply: 1000n
    })
}

let contractEntity: Contract | undefined

export async function getContractEntity({store}: {store: Store}): Promise<Contract> {
    if (contractEntity == null) {
        contractEntity = await store.get(Contract, CONTRACT_INSTANCE.address)
    }
    return assertNotNull(contractEntity)
}
