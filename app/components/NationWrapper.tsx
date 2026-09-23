import React from "react";

export default function NationWrapper({ children, region }: { children: React.ReactNode; region?: string | null }) {
    return (
        <div className="w-full flex flex-col items-center pt-12">
            {region && (
                <p className="text-neutral-400 mb-4 text-center">
                    Your name most likely comes from <span className="text-[#D1D1D1] font-bold">{region}</span>
                </p>
            )}
            <ul className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-2 lg:gap-6">{children}</ul>
        </div>
    );
}
