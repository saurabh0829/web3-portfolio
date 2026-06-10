"use client"

import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";

export default function EnsAvatarCard(){

    const {address} = useAccount();
    const {data : ensName} = useEnsName({address, chainId: mainnet.id})
    const { data:avatar, isLoading, error } = useEnsAvatar({name:ensName ?? undefined, chainId:mainnet.id})
    return(
        <div className=" mt-4 p-4 border rounded-lg">
            <h2 className="text-lg font-bold mb-4">
                ENS Avatar
            </h2>
            <p className="text-xs text-gray-400 mb-2">name: {ensName ?? "null"} | avatar: {avatar ?? "null"}</p>
            {isLoading && <p className="">Loading...</p>}

            {error && (
                <p className="text-red-500">Failed to load avatar</p>
            )}

            {avatar && (
                <div>
                    <img
                    src={avatar}
                    alt="ENS Avatar"
                    className="w-24 h-24 rounded-full"
                />
                <p>{avatar}</p>
                </div>
            )}

        </div>
    )
}