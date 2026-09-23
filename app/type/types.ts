export interface Country {
    code: string;              // ISO2, lowercase (for flagcdn)
    name: string;              // English country name
    probability: number | null; // 0..1, null if the source gives only a ranking
}

export interface NationResult {
    source: "namsor" | "nationalize";
    countries: Country[];
    region: string | null;     // e.g. "Eastern Asia" (NamSor only)
}

export interface GenderResult {
    gender: "male" | "female" | null;
    probability: number | null;
    source: "namsor" | "genderize";
}

export interface AgeResult {
    age: number | null;
    count: number;
}

export interface AnalyzeResult {
    name: string;
    nation: NationResult | null;
    gender: GenderResult | null;
    age: AgeResult | null;
    warnings: string[];
}

export interface FactData {
    fact: string;
}
