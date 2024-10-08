import React from "react";

export default function FactDisplay({ fact }: { fact: string }) {
    return (
        <div className="flex flex-col justify-center items-center mt-8 pb-4 w-1/2 ">
            <h2
                className={`font-bold text-[1rem] lg:text-[1.25rem] text-[#D1D1D1]`}
            >
                Fact for you about diarrhea
            </h2>
            <div
                className={`flex justify-center items-center text-[1.1rem] bg-[#222222] text-[#D1D1D1] text-center rounded-lg py-2 px-5`}
            >
                {fact}
            </div>
        </div>
    );
}
