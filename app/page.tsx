"use client";
import React, { useEffect, useState } from "react";
import NameInput from "@/app/components/NameInput";
import FactDisplay from "@/app/components/FactsDisplay";
import NationWrapper from "@/app/components/NationWrapper";
import NationItem from "@/app/components/NationItem";
import DisplayAge from "@/app/components/DisplayAge";
import GenderDisplay from "@/app/components/GenderDisplay";
import NameStats from "@/app/components/NameStats";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AnalyzeResult, FactData } from "@/app/type/types";

type Status = "idle" | "loading" | "done" | "error";

const SOURCE_LABEL = { namsor: "NamSor", nationalize: "nationalize.io", genderize: "genderize.io" } as const;

export default function Page() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [fact, setFact] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [result, setResult] = useState<AnalyzeResult | null>(null);
    const [copied, setCopied] = useState(false);

    const fetchFact = async () => {
        try {
            const res = await fetch("/api/facts", { cache: "no-store" });
            const data: FactData = await res.json();
            setFact(data.fact);
        } catch (e) {
            console.error("Error fetching fact:", e);
        }
    };

    const handleSubmit = async () => {
        if (!first.trim() || status === "loading") return;
        setStatus("loading");
        fetchFact();
        try {
            const params = new URLSearchParams({ first: first.trim(), last: last.trim() });
            const res = await fetch(`/api/analyze?${params}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setResult(await res.json());
            setStatus("done");
        } catch (e) {
            console.error("Error analyzing name:", e);
            setStatus("error");
        }
    };

    const share = async () => {
        if (!result) return;
        const top = result.nation?.countries[0];
        const text = [
            `My name ${result.name} says:`,
            top && `🌍 most likely ${top.name}${top.probability != null ? ` (${Math.round(top.probability * 100)}%)` : ""}`,
            result.gender?.gender && `🧬 ${result.gender.gender}`,
            result.age?.age != null && `🎂 ${result.age.age} years old`,
            window.location.origin,
        ]
            .filter(Boolean)
            .join("\n");
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked */
        }
    };

    useEffect(() => {
        fetchFact();
    }, []);

    const countries = result?.nation?.countries ?? [];
    const notAName = status === "done" && result && countries.length === 0 && !result.gender?.gender && result.age?.age == null && result.warnings.length === 0;

    return (
        <>
            <div className="w-full min-h-screen flex flex-row justify-center bg-[#181818] overflow-x-hidden pb-16">
                <div className="flex flex-col items-center pt-20 px-4">
                    <h3 className="font-bold lg:text-3xl text-neutral-600 text-2xl text-center">Let me say something about you</h3>

                    <NameInput
                        first={first}
                        last={last}
                        setFirst={setFirst}
                        setLast={setLast}
                        onSubmit={handleSubmit}
                        loading={status === "loading"}
                    />

                    {status === "idle" && (
                        <p className="font-bold mt-10 text-[1rem] lg:text-[1.25rem] text-[#D1D1D1] text-center">
                            Enter a name to get started.
                        </p>
                    )}

                    {status === "error" && (
                        <p className="font-bold mt-10 text-[1rem] lg:text-[1.25rem] text-[#D75235] text-center">
                            Something went wrong. Try again in a moment.
                        </p>
                    )}

                    {notAName && (
                        <p className="font-bold mt-10 text-[1rem] lg:text-[1.25rem] text-[#D1D1D1] text-center">
                            Are you sure that&apos;s a name?
                        </p>
                    )}

                    {status !== "idle" && result && !notAName && (
                        <div className={`flex flex-col items-center transition-opacity ${status === "loading" ? "opacity-40" : "opacity-100"}`}>
                            {countries.length > 0 && (
                                <NationWrapper region={result.nation?.region}>
                                    {countries.map((c, i) => (
                                        <NationItem
                                            key={c.code}
                                            index={i}
                                            nation={c.name}
                                            code={c.code}
                                            percentage={c.probability != null ? Math.round(c.probability * 100) : null}
                                        />
                                    ))}
                                </NationWrapper>
                            )}
                            {result.gender && <GenderDisplay result={result.gender} />}
                            {result.age && <DisplayAge result={result.age} />}
                            <NameStats name={result.name.split(" ")[0]} />

                            {result.warnings.map((w) => (
                                <p key={w} className="text-sm text-[#D78335] mt-3">{w}</p>
                            ))}

                            <button
                                onClick={share}
                                className="mt-8 font-bold text-[#181818] bg-[#D3B92C] hover:bg-[#e0c83a] transition-colors rounded-xl px-5 py-2"
                            >
                                {copied ? "Copied!" : "Copy my results"}
                            </button>

                            <p className="text-xs text-neutral-600 mt-3 text-center">
                                Data:{" "}
                                {[
                                    result.nation && SOURCE_LABEL[result.nation.source],
                                    result.gender && SOURCE_LABEL[result.gender.source],
                                    result.age && "agify.io",
                                ]
                                    .filter((v, i, a) => v && a.indexOf(v) === i)
                                    .join(", ")}
                            </p>
                        </div>
                    )}

                    <FactDisplay fact={fact} />
                </div>
            </div>
            <SpeedInsights />
            <Analytics />
        </>
    );
}
