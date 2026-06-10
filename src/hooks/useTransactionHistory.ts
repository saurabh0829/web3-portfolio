"use client";

import { useEffect, useState } from "react";
import {
  AssetTransfersCategory,
  AssetTransfersResult,
  SortingOrder,
} from "alchemy-sdk";
import { alchemyMainnet } from "../lib/Alchemy";

// Creating a new Type 
export type Transfer = AssetTransfersResult & {direction:'in'| 'out'};

export function useTransactionHistory(address?:string){
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        if(!address) return;
        setLoading(true)
        setError(null)

        const categories = [
            AssetTransfersCategory.EXTERNAL, //plain ETH transfers
            AssetTransfersCategory.ERC20 //token transfers
        ];

        const params = {
            category:categories,
            maxCount:10,
            withMetadata : true,
            order: SortingOrder.DESCENDING,
        };

        // Fetch sent + received in parallel - like Promise.all for two queries
        Promise.all([
            alchemyMainnet.core.getAssetTransfers({...params, fromAddress:address}), //sent
            alchemyMainnet.core.getAssetTransfers({...params, toAddress:address}) //received
        ])
        .then(([sent, received])=>{
            // adding direction property to each transfer
            const sentTxs = sent.transfers.map((t)=>({...t, direction:'out' as const}));
            const receivedTxs = received.transfers.map((t)=>({...t, direction:"in" as const}))

            // Merge + sort by block number descending + duplicate by hash
            const seen = new Set<string>();
            const merged = [...sentTxs, ...receivedTxs]
            .sort((a,b)=> Number(b.blockNum)-Number(a.blockNum))
            .filter((t)=>{
                if(seen.has(t.hash)) return false;
                seen.add(t.hash);
                return true;
            })
            .slice(0,15); //show latest 15

            setTransfers(merged);
        })
        .catch((e)=>setError(e.message))
        .finally(()=>setLoading(false))
    }, [address])

    return {transfers, loading, error}
}