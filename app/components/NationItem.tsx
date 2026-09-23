import React from "react";
import Image from "next/image";

const colorFor = (p: number) => {
    if (p >= 50) return "text-[#30C136]";
    if (p >= 40) return "text-[#ADCA3B]";
    if (p >= 25) return "text-[#D3B92C]";
    if (p >= 10) return "text-[#D78335]";
    return "text-[#D75235]";
};

export default function NationItem({
    nation,
    index,
    code,
    percentage,
}: {
    nation: string;
    index: number;
    code: string;
    percentage: number | null;
}) {
    return (
        <li className="font-bold bg-[#222222] relative h-14 w-72 flex flex-row items-center gap-3 py-2 px-3 rounded-xl">
            <h3 className="font-bold text-[1.15rem] text-[#D1D1D1] w-6">{index + 1}.</h3>
            <Image
                className="rounded-full w-8 h-8 object-cover"
                width={50}
                height={50}
                src={`https://flagcdn.com/w160/${code}.png`}
                alt={`flag of ${nation}`}
            />
            <h3 className="font-bold text-[1.05rem] leading-tight text-[#D1D1D1] flex-1 line-clamp-2" title={nation}>
                {nation}
            </h3>
            {percentage != null ? (
                <div className={`font-bold text-[1.15rem] ${colorFor(percentage)} border border-amber-700 rounded-xl px-2 py-1`}>
                    {percentage}%
                </div>
            ) : (
                <div className="text-sm text-neutral-500 px-2">ranked</div>
            )}
        </li>
    );
}
