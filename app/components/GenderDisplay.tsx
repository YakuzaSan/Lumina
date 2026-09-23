import React from "react";
import { GenderResult } from "@/app/type/types";

export default function GenderDisplay({ result }: { result: GenderResult }) {
    const color =
        result.gender === "female" ? "text-pink-500" : result.gender === "male" ? "text-blue-500" : "text-[#D1D1D1]";
    const pct = result.probability != null ? Math.round(result.probability * 100) : null;

    return (
        <div className="flex flex-col justify-center mt-8 w-[22rem] lg:w-[32rem]">
            <h2 className="font-bold text-[1rem] lg:text-[1.25rem] text-[#D1D1D1] flex justify-center">
                Your Gender
            </h2>
            <div className={`flex flex-col items-center ${color} text-[1.1rem] bg-[#222222] text-center rounded-lg py-2 px-5 mt-1`}>
                {result.gender ? (
                    <>
                        <span>From your name you could be {result.gender}.</span>
                        {pct != null && (
                            <div className="w-full mt-2">
                                <div className="h-2 w-full rounded-full bg-[#333] overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${result.gender === "female" ? "bg-pink-500" : "bg-blue-500"}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="text-sm text-neutral-400">{pct}% sure</span>
                            </div>
                        )}
                    </>
                ) : (
                    <span>Your name could go either way.</span>
                )}
            </div>
        </div>
    );
}
