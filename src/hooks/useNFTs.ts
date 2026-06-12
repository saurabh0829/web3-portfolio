"use client";

import { useEffect, useState } from "react";
import { NftOrdering } from "alchemy-sdk";
import { getAlchemy } from "../lib/chains";
import { useChainId } from "wagmi";

export interface NFTItem {
    tokenId : string;
    name: string;
    collection : string;
    image : string | undefined;
    contractAddress : string;
}

export function useNFTs(address?:string){
    const chainId = useChainId()
    const [nfts, setNfts] = useState<NFTItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect (()=>{
        if(!address) return;
        setLoading(true)
        
        const alchemy = getAlchemy(chainId);

        alchemy.nft
            .getNftsForOwner(address, {
                pageSize : 12,
                orderBy : NftOrdering.TRANSFERTIME,
                omitMetadata: false
            })
            .then((res)=>{
                const parsed : NFTItem[] = res.ownedNfts
                    .filter((n)=> n.image.thumbnailUrl) //only NFTs with images
                    .map((n)=>({
                        tokenId: n.tokenId,
                        name : n.name ?? `#${n.tokenId}`,
                        collection : n.collection?.name ?? "Unknown",
                        image: n.image.thumbnailUrl ,
                        contractAddress : n.contract.address
                    }))
                    setNfts(parsed)
            })
            .catch(console.error)
            .finally(()=>setLoading(false));
    }, [address, chainId]);

    return {nfts, loading}
}