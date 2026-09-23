const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

// Some sources return non-standard codes
const FIXES: Record<string, string> = { sq: "al", uk: "gb" };

export function normalizeCode(code: string): string {
    const c = code.trim().toLowerCase();
    return FIXES[c] ?? c;
}

const SHORT: Record<string, string> = { HK: "Hong Kong", MO: "Macao", US: "USA", GB: "United Kingdom" };

export function countryName(code: string): string {
    const up = normalizeCode(code).toUpperCase();
    if (SHORT[up]) return SHORT[up];
    try {
        return displayNames.of(normalizeCode(code).toUpperCase()) ?? code.toUpperCase();
    } catch {
        return code.toUpperCase();
    }
}
