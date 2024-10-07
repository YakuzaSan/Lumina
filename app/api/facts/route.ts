import { NextResponse } from "next/server";
export const revalidate = 3
export async function GET() {
    const NAME_ANIME_GAME_FACTS: Array<string> = [
        "
        import { NextResponse } from 'next/server';

            const rateLimit = {
              windowMs: 60 * 1000, // 1 Minute
              max: 10, // max 10 requests per windowMs
            };
            
            let requestCounts = {};
            
            export function middleware(req) {
              const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
            
              if (!ip) {
                return NextResponse.next();
              }
            
              if (!requestCounts[ip]) {
                requestCounts[ip] = {
                  count: 1,
                  timestamp: Date.now(),
                };
              } else {
                const currentTime = Date.now();
                const timeDifference = currentTime - requestCounts[ip].timestamp;
            
                if (timeDifference < rateLimit.windowMs) {
                  requestCounts[ip].count += 1;
                } else {
                  requestCounts[ip] = {
                    count: 1,
                    timestamp: currentTime,
                  };
                }
              }
            
              if (requestCounts[ip].count > rateLimit.max) {
                return new NextResponse('Rate limit exceeded', { status: 429 });
              }
            
              return NextResponse.next();
            }

        ",
    ];

    let randomFact = NAME_ANIME_GAME_FACTS[Math.floor(Math.random() * NAME_ANIME_GAME_FACTS.length + 1)];

    return NextResponse.json({ fact: randomFact });

}
