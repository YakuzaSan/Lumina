"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

export default function NationItem({
    nation,
    index,
    img_src,
    percentage,


}: {
    nation: string;
    index: number;
    img_src: string;
    percentage: string ;

}) {

    useEffect(() => {
        getTextColor();
        return () => {};
    }, []);

    const [color, setColor] = useState("");

    const getTextColor = () => {
        let numPercentage = Number(percentage);

        if (numPercentage >= 0) {
            setColor("text-[#D75235]");
        }
        if (numPercentage >= 10) {
            setColor("text-[#D78335]");
        }
        if (numPercentage >= 25) {
            setColor("text-[#D3B92C]");
        }
        if (numPercentage >= 40) {
            setColor("text-[#ADCA3B]");
        }
        if (numPercentage >= 50) {
            setColor("text-[#30C136]");
        }
    }
    return (
        <li
            className={` font-bold bg-[#222222] cursor-pointer relative h-14 w-72 lg:w-72 flex flex-row justify-between items-center py-2 px-3 rounded-xl`}
        >
            <h3
                className={` font-bold text-[1.15rem] pt-1 text-[#D1D1D1]  lg:block`}
            >
                {index + 1}.
            </h3>
            <Image
                className="rounded-full w-8 h-8"
                width={50}
                height={50}
                src={img_src}
                alt={`flag_${nation}`}
            />
            <h3
                className={`font-bold text-[1.15rem] pt-1 text-[#D1D1D1] w-24 overflow-clip text-ellipsis`}
            >
                {nation}
            </h3>

            <div className={` font-bold text-[1.25rem] ${color} border border-amber-700 rounded-xl px-2 pt-2 pb-[0.25rem]`}>
                {percentage}%
            </div>
        </li>
    );
}
