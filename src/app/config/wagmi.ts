import {getDefaultConfig} from "@rainbow-me/rainbowkit"
import { mainnet, sepolia,base } from "wagmi/chains";

export const config = getDefaultConfig({
    appName :"Web3 Portfolio DashBoard",
    projectId : process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains : [mainnet, sepolia, base],
    ssr : true, //Next.js App Router need this 
})