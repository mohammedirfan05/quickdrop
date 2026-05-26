# QuickDrop

> Ultra-fast clipboard sharing. Paste. Share. Done.

A minimal, zero-friction clipboard sharing tool built for developers. Paste any text or code, get a 6-character share code, someone else enters the code - instant transfer. No login, no accounts, ephemeral by design.

## Features

- Zero friction - no login, no account, no signup
- 6-char codes - crypto-random, collision-safe, human-readable
- Syntax highlighting - auto-detects Python, JS, TS, JSON, C++, Bash via Shiki
- Auto-expiry - snippets self-destruct after 10 minutes
- Rate limited - Upstash sliding window per IP
- Responsive - works on desktop, tablet, mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Upstash Redis |
| Rate Limiting | @upstash/ratelimit |
| Syntax Highlighting | Shiki |
| Analytics | Vercel Analytics |
| Performance | Vercel Speed Insights |
| Deployment | Vercel |

## Getting Started

### 1. Clone & install

```bash
git clone <repo>
cd pastebin
npm install
```

### 2. Set up Upstash Redis

1. Go to [console.upstash.com](https://console.upstash.com/redis)
2. Create a new Redis database
3. Copy the REST URL and REST token

### 3. Configure environment variables

```bash
cp .env.example .env.local
# Fill in your Upstash credentials
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API

### `POST /api/create`

Create a new snippet.

```json
// Request
{ "text": "console.log('hello')" }

// Response
{ "code": "K7X2QP", "expiresAt": 1716123456789 }
```

**Rate limit:** 10 requests/minute per IP

### `GET /api/fetch/:code`

Retrieve a snippet by code.

```json
// Response
{ "text": "console.log('hello')", "ttl": 542 }
```

**Rate limit:** 30 requests/minute per IP

### `POST /api/highlight`

Server-side syntax highlighting (used internally).

```json
// Request
{ "text": "def hello(): print('hi')" }

// Response  
{ "html": "<pre class=\"shiki\">...</pre>", "language": "python" }
```

## Architecture

```
User submits text
	-> POST /api/create
	-> Rate limit check (Upstash)
	-> Validate (non-empty, <=100KB)
	-> Generate unique 6-char code (crypto.getRandomValues)
	-> Store in Redis: clip:{CODE} = {text, createdAt} TTL=600s
	-> Return { code, expiresAt }

User enters code
	-> GET /api/fetch/{code}
	-> Rate limit check
	-> Validate code format
	-> Fetch from Redis (parallel: GET + TTL)
	-> POST /api/highlight (server-side Shiki)
	-> Display with countdown timer
```

## Deployment on Vercel

```bash
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel deploy
```

The app also includes Vercel Analytics and Vercel Speed Insights via the root layout, so those metrics are available automatically when deployed on Vercel.

## Security

- Input sanitized (null bytes, size limits)
- Code format validated (`/^[A-Z2-9]{6}$/`)
- HTML from Shiki is safe (server-controlled, not user HTML)
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`
- Rate limiting on all mutation endpoints
