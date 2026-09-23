import React from "react";

export default function NameInput({
    first,
    last,
    setFirst,
    setLast,
    onSubmit,
    loading,
}: {
    first: string;
    last: string;
    setFirst: (v: string) => void;
    setLast: (v: string) => void;
    onSubmit: () => void;
    loading: boolean;
}) {
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") onSubmit();
    };
    return (
        <div className="flex flex-col pt-20 items-center">
            <label className="font-bold text-[1.15rem] lg:text-[1.25rem] text-[#E2E2E2] text-center" htmlFor="search">
                Your Name
            </label>
            <div className="relative">
                <input
                    id="search"
                    type="text"
                    value={first}
                    autoFocus
                    onKeyDown={onKey}
                    onChange={(e) => setFirst(e.target.value)}
                    maxLength={35}
                    placeholder="First name"
                    className="font-bold relative text-center w-[22rem] lg:w-[42rem] rounded-xl bg-[#E2E2E2] shadow-lg outline-none text-[1.5rem] lg:text-[2rem] px-12 pt-1 placeholder:text-neutral-400"
                />
                <button
                    aria-label="submit"
                    onClick={onSubmit}
                    disabled={loading}
                    className="right-4 absolute top-[22%] lg:top-[28%] disabled:opacity-40"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-[3px] border-[#323232] border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="-rotate-90 scale-150 transition-transform hover:scale-[1.40] hover:translate-x-1" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8Zm0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 10V9c0-.55-.45-1-1-1s-1 .45-1 1v3H9.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79a.5.5 0 0 0-.35-.85H13Z"
                                fill="#323232"
                            />
                        </svg>
                    )}
                </button>
            </div>
            <input
                type="text"
                value={last}
                onKeyDown={onKey}
                onChange={(e) => setLast(e.target.value)}
                maxLength={35}
                placeholder="Last name (optional, more accurate)"
                className="mt-3 font-bold text-center w-[18rem] lg:w-[24rem] rounded-xl bg-[#2a2a2a] text-[#D1D1D1] outline-none text-[1rem] px-4 py-1.5 placeholder:text-neutral-500 placeholder:font-normal"
            />
        </div>
    );
}
