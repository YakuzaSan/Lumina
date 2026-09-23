import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const NAME_FACTS: string[] = [
    "Muhammad, in its many spellings, is widely considered the most common first name in the world.",
    "Wang, Li and Zhang are among the most common surnames on Earth, each shared by tens of millions of people.",
    "In Chinese names the family name comes first: in \"Wang Xiaoming\", Wang is the surname.",
    "Many Chinese given names are picked for the meaning of their characters, so one romanized name can hide very different meanings.",
    "Most Icelanders have no family name. Their surname is built from a parent's first name plus -son or -dóttir.",
    "In Iceland, new first names have to be approved by the Icelandic Naming Committee.",
    "Spanish speakers traditionally carry two surnames, one from each parent.",
    "Around 4 in 10 Vietnamese people share the surname Nguyen.",
    "Kim, Lee and Park together cover close to half of South Korea's population.",
    "Müller is the most common surname in Germany. It comes from the old word for miller.",
    "Smith is the most common surname in the US, the UK and Australia, named after the metalworking trade.",
    "German registry offices can refuse a first name if it could harm the child's wellbeing.",
    "Russian names include a patronymic: Pyotr, son of Ivan, is Pyotr Ivanovich.",
    "In Czech and Polish, surnames change with gender, like Novák and Nováková.",
    "Many Indonesians and Burmese people have no family name at all.",
    "Japanese parents can pick unusual readings for kanji, so even native speakers sometimes can't read a written name.",
    "The study of names and their origins is called onomastics.",
    "The name Wendy was made popular by J. M. Barrie's Peter Pan.",
    "Guessing age from a first name works because names go in and out of fashion, generation by generation.",
    "Name based guesses are statistics: they describe what is typical for a name, not who you actually are.",
];

export async function GET() {
    const fact = NAME_FACTS[Math.floor(Math.random() * NAME_FACTS.length)];
    return NextResponse.json({ fact });
}
