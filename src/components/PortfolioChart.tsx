"use client";

import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from "recharts";
import type { TokenData } from "../hooks/useTokenPortfolio";

const COLORS = ["#3B82F6","#8B5CF6","#EC4899","#F59E0B","#10B981","#6366F1","#F97316","#14B8A6"];

interface Props {
    tokens:TokenData[],
    ethBalance?:number
}

export function PortfolioChart ({tokens, ethBalance}:Props){
    const data = [
        ...(ethBalance ? [{name:"ETH", value:ethBalance}]:[]),
        ...tokens.slice(0,7).map((t)=>({
            name:t.symbol,
            value:parseFloat(t.balances),
        })),
    ].filter((d)=>d.value > 0)

    if(!data.length) return null;

    return (
        <div className="border rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Portfolio Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} strokeWidth={0}>
                        {data.map((_,i)=>(
                            <Cell key={i} fill={COLORS[i % COLORS.length]}/>    
                        ))}
                    </Pie>
                    <Tooltip formatter={(v) => typeof v === "number" ? v.toFixed(4) : v} />
                </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div>
                {data.map((d, i)=>(
                    <div key={i} className="flex flex-wrap gap-2 mt-2 justify-center">
                        <div className="w-2.5 h-2.5 rounded-full"
                            style={{background: COLORS[i % COLORS.length]}}
                        />
                        {d.name}
                    </div>
                ))}
            </div>
        </div>
    )
}