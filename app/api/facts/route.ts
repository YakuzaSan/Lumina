import { NextResponse } from "next/server";
export const revalidate = 0
export async function GET() {
    const NAME_ANIME_GAME_FACTS: Array<string> = [
"    Infektionen: Bakterien (z.B. E. coli, Salmonellen), Viren (z.B. Norovirus, Rotavirus), Parasiten (z.B. Giardia).",
"    Lebensmittelvergiftung: Verzehr kontaminierter Lebensmittel oder Wasser.",
"    Medikamente: Antibiotika können das Gleichgewicht der Darmflora stören.",
"    Nahrungsmittelunverträglichkeiten: Laktoseintoleranz, Glutenunverträglichkeit (Zöliakie).",
"    Erkrankungen: Reizdarmsyndrom (IBS), entzündliche Darmerkrankungen (z.B. Morbus Crohn, Colitis ulcerosa).",
"    Stress und Angst: Emotionale Faktoren können den Darm beeinflussen.",

    ];
    let randomFact = NAME_ANIME_GAME_FACTS[Math.floor(Math.random() * NAME_ANIME_GAME_FACTS.length + 1)];
    return NextResponse.json({ fact: randomFact });
}
