import { NextResponse } from "next/server";
export const revalidate = 0
export async function GET() {
    const NAME_ANIME_GAME_FACTS: Array<string> = [
         "WHYYYYYYYYYYYYYYYYYYYY",

    ];
    let randomFact = NAME_ANIME_GAME_FACTS[Math.floor(Math.random() * NAME_ANIME_GAME_FACTS.length + 1)];
    return NextResponse.json({ fact: randomFact });
}
