import { NextRequest, NextResponse } from "next/server";
import { AgeResult, Country, GenderResult, NationResult } from "@/app/type/types";
import { countryName, normalizeCode } from "@/app/lib/countries";

export const dynamic = "force-dynamic";

const NAMSOR = "https://v2.namsor.com/NamSorAPIv2/api2/json";
const MAX_COUNTRIES = 6;
const CACHE = { next: { revalidate: 60 * 60 * 24 } }; // names don't change, cache 24h

const clean = (s: string | null) =>
    (s ?? "").trim().replace(/[^\p{L}\p{M}' -]/gu, "").slice(0, 35);

async function getJson(url: string, headers?: Record<string, string>) {
    const res = await fetch(url, { headers, ...CACHE });
    if (res.status === 429) throw new Error("rate-limit");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// ---------- Nationality ----------
async function namsorNation(first: string, last: string, key: string): Promise<NationResult> {
    const e = encodeURIComponent;
    // With a surname: "origin" (much more accurate). Without: "country" works on a single name.
    const d = last
        ? await getJson(`${NAMSOR}/origin/${e(first)}/${e(last)}`, { "X-API-KEY": key })
        : await getJson(`${NAMSOR}/country/${e(first)}`, { "X-API-KEY": key });

    const top: string | undefined = last ? d.countryOrigin : d.country;
    const alt: string | undefined = last ? d.countryOriginAlt : d.countryAlt;
    const list: string[] = (last ? d.countriesOriginTop : d.countriesTop) ?? [];
    const p: number | undefined = d.probabilityCalibrated;
    const pAlt: number | undefined = d.probabilityAltCalibrated; // P(top OR alt)
    if (!top) throw new Error("no result");

    const codes = Array.from(new Set([top, alt, ...list].filter(Boolean) as string[])).slice(0, MAX_COUNTRIES);
    const countries: Country[] = codes.map((code, i) => {
        let probability: number | null = null;
        if (i === 0 && p != null && p >= 0) probability = p;
        if (i === 1 && code === alt && p != null && pAlt != null && pAlt > p) probability = pAlt - p;
        return { code: normalizeCode(code), name: countryName(code), probability };
    });

    return {
        source: "namsor",
        countries,
        region: (last ? d.subRegionOrigin : d.subRegion) || null,
    };
}

async function nationalizeNation(first: string): Promise<NationResult> {
    const d = await getJson(`https://api.nationalize.io?name=${encodeURIComponent(first)}`);
    const countries: Country[] = (d.country ?? [])
        .slice(0, MAX_COUNTRIES)
        .map((c: { country_id: string; probability: number }) => ({
            code: normalizeCode(c.country_id),
            name: countryName(c.country_id),
            probability: c.probability,
        }));
    return { source: "nationalize", countries, region: null };
}

// ---------- Gender ----------
async function namsorGender(first: string, last: string, key: string): Promise<GenderResult> {
    const full = encodeURIComponent(`${first} ${last}`.trim());
    const d = await getJson(`${NAMSOR}/genderFull/${full}`, { "X-API-KEY": key });
    const g = d.likelyGender === "male" || d.likelyGender === "female" ? d.likelyGender : null;
    return { gender: g, probability: d.probabilityCalibrated ?? null, source: "namsor" };
}

async function genderizeGender(first: string): Promise<GenderResult> {
    const d = await getJson(`https://api.genderize.io?name=${encodeURIComponent(first)}`);
    return { gender: d.gender ?? null, probability: d.probability ?? null, source: "genderize" };
}

// ---------- Age ----------
async function agifyAge(first: string): Promise<AgeResult> {
    const d = await getJson(`https://api.agify.io?name=${encodeURIComponent(first)}`);
    return { age: d.age ?? null, count: d.count ?? 0 };
}

export async function GET(req: NextRequest) {
    const first = clean(req.nextUrl.searchParams.get("first")).split(" ")[0];
    const last = clean(req.nextUrl.searchParams.get("last"));
    if (!first) return NextResponse.json({ error: "missing name" }, { status: 400 });

    const key = process.env.NAMSOR_API_KEY;
    const warnings: string[] = [];

    const nationTask = async () => {
        if (key) {
            try {
                return await namsorNation(first, last, key);
            } catch (e) {
                console.error("NamSor nation failed, falling back:", e);
            }
        }
        return nationalizeNation(first.toLowerCase());
    };
    const genderTask = async () => {
        if (key) {
            try {
                return await namsorGender(first, last, key);
            } catch (e) {
                console.error("NamSor gender failed, falling back:", e);
            }
        }
        return genderizeGender(first.toLowerCase());
    };

    const [nation, gender, age] = await Promise.allSettled([
        nationTask(),
        genderTask(),
        agifyAge(first.toLowerCase()),
    ]);

    const unwrap = <T,>(r: PromiseSettledResult<T>, label: string): T | null => {
        if (r.status === "fulfilled") return r.value;
        warnings.push(
            (r.reason as Error)?.message === "rate-limit"
                ? `${label}: daily limit reached, try again tomorrow.`
                : `${label}: service unavailable.`
        );
        return null;
    };

    return NextResponse.json({
        name: [first, last].filter(Boolean).join(" "),
        nation: unwrap(nation, "Nationality"),
        gender: unwrap(gender, "Gender"),
        age: unwrap(age, "Age"),
        warnings,
    });
}
