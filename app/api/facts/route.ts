import { NextResponse } from "next/server";
export const revalidate = 0
export async function GET() {
    const NAME_ANIME_GAME_FACTS: Array<string> = [
        "The name ‘Kirito’ from the anime ‘Sword Art Online’ means ‘cutting sword’.",
        "In the game ‘Final Fantasy’, the character named ‘Cloud’ was originally going to be called ‘Sai’.",
        "The name ‘Sakura’ is a popular name in Japan, inspired by the character from ‘Naruto’.",
        "‘Link’ is the name of the protagonist in the ‘Legend of Zelda’ series, known for his courage.",
        "In the anime ‘Dragon Ball’, the character ‘Goku’ has a name that means ‘awakened to emptiness’.",
        "The name ‘Sephiroth’ is derived from Jewish mysticism and is used for the antagonist in ‘Final Fantasy VII’.",
        "The character ‘Tifa’ from ‘Final Fantasy VII’ has a name that means ‘pure’.",
        "‘Asuna’ from ‘Sword Art Online’ has a name that translates to ‘morning sun’.",
        "‘Aerith’ from ‘Final Fantasy VII’ was originally named ‘Aeris’ in the English versions.",
        "The name ‘Naruto’ is associated with a whirlpool or maelstrom in Japanese.",
        "‘Zelda’ is not the name of the protagonist in ‘Legend of Zelda’ but rather the name of the princess.",
        "The character ‘Sonic’ was named to represent both speed and sound.",
        "‘Sora’ in ‘Kingdom Hearts’ has a name that means ‘sky’ in Japanese.",
        "The character ‘Ryu’ from ‘Street Fighter’ has a name that means ‘dragon’ in Japanese.",
        "‘Yuna’ from ‘Final Fantasy X’ has a name that means ‘night’.",
        "The name ‘Miku’ from ‘Hatsune Miku’ means ‘future’.",
        "‘Chun-Li’ from ‘Street Fighter’ means ‘beautiful spring’.",
        "‘Lucina’ from ‘Fire Emblem’ has a name that means ‘light’.",
        "‘Joker’ from ‘Persona 5’ derives his name from playing cards and represents trickery and jest.",
        "The character ‘Bayonetta’ got her name from the Italian word for ‘witch’.",
    ];

    let randomFact = NAME_ANIME_GAME_FACTS[Math.floor(Math.random() * NAME_ANIME_GAME_FACTS.length + 1)];

    return NextResponse.json({ fact: randomFact });

}