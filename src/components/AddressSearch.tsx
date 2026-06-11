"use client";

import Image from "next/image";
import { useState } from "react";
import { isAddress } from "viem";
import { useBalance, useEnsAddress, useEnsAvatar, useEnsName, useChainId } from "wagmi";
import { getExplorerUrl } from "../lib/chains";

interface AddressSearchProps {
    onSearch?: (address: `0x${string}`) => void
}

export function AddressSearch({ onSearch }: AddressSearchProps) {
    const chainId = useChainId();
    const [input, setValue] = useState("");
    const [searched, setSearched] = useState("");
    const [copied, setCopied] = useState(false)

    const copy = () => {
        if (!finalAddress) return;
        navigator.clipboard.writeText(finalAddress)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch(() => {
                // fallback for browsers that block clipboard API
                const el = document.createElement("textarea")
                el.value = finalAddress
                document.body.appendChild(el)
                el.select()
                document.execCommand("copy")
                document.body.removeChild(el)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
    }

    // Detect if input is an address (0x...) or ENS name(.eth)
    const isAddr = isAddress(searched);
    const isEns = searched.endsWith(".eth")

    // If ENS -> resolve to address. If address -> resolve to ENS name.
    const { data: resolveAddr } = useEnsAddress({
        name: isEns ? searched : undefined,
        chainId: 1
    });
    const { data: resolvedName } = useEnsName({
        address: isAddr ? (searched as `0x${string}`) : undefined,
        chainId: 1
    })
    const { data: avatar } = useEnsAvatar({
        name: resolvedName ?? (isEns ? searched : undefined),
        chainId: 1
    });

    // Final address to query balance + History
    const finalAddress = (isAddr
        ? (searched as `0x${string}`) : resolveAddr) ?? undefined;

    const { data: balance } = useBalance({ address: finalAddress })

    const handleSearch = () => {
        const trimmed = input.trim();
        console.log("hello");

        if (!trimmed) return;
        setSearched(trimmed)
        if (finalAddress) onSearch?.(finalAddress)
    }

    return (
        <div className="w-full max-w-md mt-4 ">
            {/* search bar */}
            <div className="flex gap-2 m-4">
                <input
                    className="flex-1 border rounded-lg px-4 py-2 text-sm font-mono bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0x... or vitalik.eth"
                    value={input}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Result */}
            {finalAddress && (
                <div className="border rounded-xl p-5 space-y-4">
                    {/* Profile row */}
                    <div className="flex items-center gap-3">
                        {avatar ? (
                            <Image
                                src={avatar}
                                alt="ENS avatar"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        ) : (
                            <div
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
                            />
                        )}
                        <div>
                            <p className="font-semibold text-sm">
                                {resolvedName ?? (isEns ? searched : "No ENS name")}
                            </p>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); copy(); }}
                                className="flex items-center gap-1 text-xs font-mono text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {copied
                                    ? "✓ Copied"
                                    : <><span>{finalAddress.slice(0, 8)}</span><span>…</span><span>{finalAddress.slice(-6)}</span></>
                                }
                                <span className="text-[10px]">{copied ? "" : "⧉"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ETH Balance</span>
                        <span className="font-semibold">{balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "Loading..."}</span>
                    </div>

                    {/* Etherscan Link */}
                    <a
                        href={`${getExplorerUrl(chainId)}/address/${finalAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-xs text-blue-500 hover:underline pt-2 border-t mt-2"
                    >
                        View full history on Explorer ↗
                    </a>
                </div>
            )}
        </div>
    )
}