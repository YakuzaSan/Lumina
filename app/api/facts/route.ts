import { NextResponse } from "next/server";
export const revalidate = 0
export async function GET() {
    const DEVELOPER_FACTS: Array<string> = [
        "Über 70 % aller Entwickler lernen neue Technologien lieber durch Online-Tutorials als durch Bücher.",
        "Viele Entwickler hassen es, Meetings zu haben – sie unterbrechen den sogenannten 'Flow State'.",
        "Der Beruf Softwareentwickler gehört zu den wenigen Jobs, die man komplett remote ausüben kann.",
        "Ein Großteil der Programmierzeit wird für Debugging statt für neue Features verwendet.",
        "Die meisten Entwickler bevorzugen Kaffee gegenüber Tee – teilweise extrem.",
        "Viele Programmierer haben das Gefühl, dass sie 'nichts wissen', obwohl sie Experten sind – ein klassischer Fall von Imposter-Syndrom.",
        "Dark Mode ist unter Entwicklern so beliebt, dass manche IDEs ihn als Standard aktiviert haben.",
        "Git wurde von Linus Torvalds innerhalb von nur zehn Tagen entwickelt.",
        "Programmiersprachen wie JavaScript oder Python sind bei Web-Entwicklern nach wie vor die beliebtesten Sprachen.",
        "Entwickler nutzen durchschnittlich 3–6 verschiedene Tools täglich, um produktiv zu bleiben.",
        "Viele Softwarefehler entstehen, weil Entwickler Annahmen treffen, die später falsch sind.",
        "Pair Programming kann Fehlerquote und Entwicklungszeit erheblich verbessern – wird aber oft gemieden.",
        "Viele Entwickler kommentieren ihren Code ungern und schreiben lieber selbsterklärenden Code.",
        "Ein großer Teil der Programmierzeit besteht aus Googeln, Lesen von Dokus und Stack Overflow.",
        "Entwickler sind häufig nachtaktive Arbeiter und arbeiten lieber spätabends.",
        "Viele Entwickler bevorzugen Mechanical Keyboards wegen des Schreibgefühls.",
        "Open-Source-Projekte treiben einen riesigen Teil der weltweiten Softwareentwicklung voran.",
        "Unit-Tests werden als wichtig angesehen – aber viele Teams haben trotzdem zu wenige.",
        "Agile Methoden wie Scrum werden oft verwendet, aber selten perfekt umgesetzt.",
        "Viele Entwickler haben Lieblings-Editoren wie VSCode, JetBrains IDEs oder Vim – oft mit starker Meinung dazu."
    ];
    let randomFact = DEVELOPER_FACTS[Math.floor(Math.random() * DEVELOPER_FACTS.length + 1)];
    return NextResponse.json({ fact: randomFact });
}

