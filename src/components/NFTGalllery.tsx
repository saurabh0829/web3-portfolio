"use client";

import { useNFTs } from "../hooks/useNFTs";
import Image from "next/image";

export function NFTGallery({address}: {address?:string}){
    const {nfts, loading} = useNFTs(address);

    if(!address) return null

    if(loading) return(
        <div>
            {Array.from({length:6}).map((_, i)=>(
                <div key={i}
                    className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl"/>
            ))}
        </div>
    )

    if(!nfts) return(
    <p className="text-sm text-gray-400 text-center py-4">
        No NFTs found for this address
    </p>
    )

    return (
        <div className="border rounded p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                NFT Collection <span className="normal-case font-normal">{nfts.length}</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
                {nfts.map((nft)=>(
                    <a 
                        key={`${nft.contractAddress}-${nft.tokenId}`}
                        href={`htttps://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.tokenId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-xl border hover:border-blue-400 transition-colors"
                    >
                        <Image
                            src={nft.image || 'placeholder.png'}
                            alt={nft.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="(max-width:768px) 33vw 150px"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                            <p className="text-white text-[10px] font-semibold truncate">
                                {nft.name}
                            </p>
                            <p className="text-gray-300 text-[9px] truncate">{nft.collection}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )

} 