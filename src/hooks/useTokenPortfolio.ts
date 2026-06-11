"use client";

import { useEffect, useState } from "react";
import { useChainId } from "wagmi";
import { getAlchemy } from "../lib/chains";


export interface TokenData {
    symbol:string;
    name:string;
    balances:string;
    logo?:string;
    contractAddress:string;
    decimals:number;
}

export function useTokenPortfolio(address?:string){
    const chainId = useChainId()
    const [tokens, setTokens] = useState<TokenData[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(!address) return;
        setLoading(true);

        const alchemy = getAlchemy(chainId);

        alchemy.core
            .getTokensForOwner(address)
            .then((res)=>{
                const parsed : TokenData[] = res.tokens
                .filter((t)=>t.balance && parseFloat(t.balance)>0)
                .map((t)=>({
                    symbol: t.symbol ?? "???",
                    name: t.name ?? "Unknown Token",
                    balances: t.balance ?? "0",
                    logo: t.logo ?? undefined,
                    contractAddress: t.contractAddress,
                    decimals: t.decimals ?? 18
                }));
                setTokens(parsed)
            })
            .catch(console.error)
            .finally(()=>setLoading(false))
    }, [address, chainId])

    return {tokens, loading}
}