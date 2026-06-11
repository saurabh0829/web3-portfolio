import { Alchemy, Network } from "alchemy-sdk";

// One client per network - lite separate Prisma clients per DB
export const alchemyMainnet = new Alchemy({
    apiKey:process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network:Network.ETH_MAINNET
})

export const alchemySepolia = new Alchemy({
    apiKey:process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA
})

export const alchemyBase = new Alchemy({
    apiKey:process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network:Network.BASE_MAINNET
})