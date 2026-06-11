import { Alchemy, Network } from "alchemy-sdk";
import { mainnet, base, sepolia } from "wagmi/chains";

const networkMap : Record<number, Network> = {
    [mainnet.id]:Network.ETH_MAINNET,
    [base.id]:Network.BASE_MAINNET,
    [sepolia.id]:Network.ETH_SEPOLIA,
};

const explorerMap: Record<number, string> = {
    [mainnet.id]:"https://etherscan.io",
    [base.id]:"https://basescan.org",
    [sepolia.id]:"https://sepolia.etherscan.io"
}

export function getAlchemy(chainId:number):Alchemy{
    return new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        network: networkMap[chainId] ?? Network.ETH_MAINNET
    })
}

export function getExplorerUrl(chainId:number):string{
    return explorerMap[chainId] ?? "https://etherscan.io";
}

export const supportedChains = [mainnet, base, sepolia]