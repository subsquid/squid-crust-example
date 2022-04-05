import {ethers} from "ethers";
import ABI from './abis/ERC721.json'

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
