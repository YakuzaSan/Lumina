# YourNation (Lumina)

Enter a name and get a guess for nationality, gender and age, plus some fun name stats.

Live: https://yournation.vercel.app/

## Data sources

| What | Primary | Fallback |
|---|---|---|
| Nationality | [NamSor](https://namsor.app) `origin` (first + last name) / `country` (first name only) | nationalize.io |
| Gender | NamSor `genderFull` | genderize.io |
| Age | agify.io | none |

All requests go through the server route `app/api/analyze`, so the API key never reaches the browser. Results are cached for 24h.

## Setup

```bash
npm install
cp .env.example .env.local   # put your NamSor key in there
npm run dev
```

On Vercel: Project Settings -> Environment Variables -> `NAMSOR_API_KEY`.

Without a key everything still works, just with the less accurate nationalize.io / genderize.io data.
