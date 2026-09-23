import React from "react";

// Classic English Scrabble letter values
const SCRABBLE: Record<string, number> = {
    a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
    d: 2, g: 2, b: 3, c: 3, m: 3, p: 3, f: 4, h: 4, v: 4, w: 4, y: 4,
    k: 5, j: 8, x: 8, q: 10, z: 10,
};

export default function NameStats({ name }: { name: string }) {
    const letters = name
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .toLowerCase()
        .replace(/[^a-z]/g, "");
    if (!letters) return null;

    const vowels = letters.replace(/[^aeiou]/g, "").length;
    const unique = new Set(letters).size;
    const scrabble = letters.split("").reduce((s, c) => s + (SCRABBLE[c] ?? 0), 0);
    const reversed = name.split("").reverse().join("").toLowerCase();

    const stats = [
        { label: "Letters", value: letters.length },
        { label: "Vowels", value: vowels },
        { label: "Unique", value: unique },
        { label: "Scrabble", value: scrabble },
    ];

    return (
        <div className="flex flex-col items-center mt-8 w-[22rem] lg:w-[32rem]">
            <h2 className="font-bold text-[1rem] lg:text-[1.25rem] text-[#D1D1D1]">Your name in numbers</h2>
            <div className="grid grid-cols-4 gap-3 w-full mt-1">
                {stats.map((s) => (
                    <div key={s.label} className="bg-[#222222] rounded-lg py-2 flex flex-col items-center">
                        <span className="text-[1.4rem] font-bold text-[#D3B92C]">{s.value}</span>
                        <span className="text-xs text-neutral-500">{s.label}</span>
                    </div>
                ))}
            </div>
            <p className="text-sm text-neutral-500 mt-2">
                Backwards: <span className="text-[#D1D1D1] capitalize">{reversed}</span>
            </p>
        </div>
    );
}
