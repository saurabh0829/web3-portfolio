import {getDefaultConfig} from "@rainbow-me/rainbowkit"
import { mainnet, sepolia, base } from "wagmi/chains";
import { http } from "wagmi";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export const config = getDefaultConfig({
    appName: "Web3 Portfolio DashBoard",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, sepolia, base],
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`),
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`),
        [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`),
    },
    ssr: true,
})