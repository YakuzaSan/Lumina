import React from "react";
import { AgeResult } from "@/app/type/types";

export default function AgeDisplay({ result }: { result: AgeResult }) {
    return (
        <div className="font-bold mt-8 py-4 px-5 rounded-xl text-[1rem] lg:text-[1.25rem] bg-[#222222] w-[22rem] lg:w-[32rem] text-[#D1D1D1] text-center flex flex-col items-center justify-center">
            {result.age != null
                ? <>From your name you could be {result.age} years old.</>
                : <>Your name is too rare to guess your age.</>}
            {result.count > 0 && (
                <span className="font-normal text-sm text-neutral-500 mt-1">
                    based on {result.count.toLocaleString("en-US")} people with this name
                </span>
            )}
        </div>
    );
}
