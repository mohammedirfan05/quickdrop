# CodeSharePro

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Upstash Redis](https://img.shields.io/badge/Upstash-Redis-0F172A?logo=redis&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-ready-black?logo=vercel)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?logo=opensourceinitiative)

> Instant code and text sharing with ephemeral, Redis-backed snippets.

## Project Overview

CodeSharePro is a public developer utility for pasting text or code, generating a short share code, and retrieving the content from another browser or device. Snippets are stored in Upstash Redis with a 10-minute TTL and are designed for fast handoffs, temporary debugging notes, and lightweight collaboration.

There is no authentication flow. Access is controlled by code validity, input validation, and IP-based rate limiting.

## Features

- 6-character share codes with ambiguous characters removed for readability
- Ephemeral snippets with automatic expiry after 10 minutes
- Server-side syntax highlighting with Shiki
- Auto-detects common languages such as TypeScript, JavaScript, Python, JSON, C++, and Bash
- Copy-to-clipboard support for both generated codes and retrieved snippets
- Theme toggle with light/dark support
- Responsive UI with animated hero and editor flows
- Rate limiting on create and fetch endpoints
- Security headers, robots rules, and server-rendered metadata for production deployment

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| UI | React 19.2.4 |
| Styling | Tailwind CSS 4, `tw-animate-css`, `class-variance-authority`, `tailwind-merge`, `clsx` |
| UI Primitives | `@base-ui/react` |
| Animation | Framer Motion |
| Icons | Lucide React |
| Theme | `next-themes` |
| Data Store | Upstash Redis |
| Rate Limiting | `@upstash/ratelimit` |
| Syntax Highlighting | Shiki |
| Toasts | Sonner |
| Analytics | Vercel Analytics |
| Performance Monitoring | Vercel Speed Insights |
| Package Manager | npm |

## Architecture Overview

The app is a single Next.js application with a small server API surface:

```mermaid
flowchart LR
  A[Browser UI] -->|POST /api/create| B[Create Route]
  A -->|GET /api/fetch/[code]| C[Fetch Route]
  A -->|POST /api/highlight| D[Highlight Route]

  B --> E[(Upstash Redis)]
  C --> E
  D --> F[Shiki]

  B -->|code + expiresAt| A
  C -->|text + ttl| A
  D -->|html + language| A
```

Core flow:

- The user pastes content into the editor.
- `POST /api/create` validates the text, rate limits the request, generates a unique 6-character code, and stores the snippet in Redis with a 600-second TTL.
- The user shares the code.
- `GET /api/fetch/[code]` validates the code, rate limits the request, reads the snippet and remaining TTL from Redis, and returns the raw text.
- The client calls `POST /api/highlight` to render the snippet with server-side syntax highlighting.

Important detail: fetch is read-only. Snippets are not deleted when retrieved; they expire naturally via Redis TTL.

## Preview

The repository includes generated social preview assets in:
- `app/opengraph-image.tsx`
- `app/twitter-image.tsx`

There are no committed product screenshots in the repository yet. If you add documentation images later, common placeholders would be:
- Home / hero view
- Create snippet flow
- Retrieve snippet flow
- Dark mode example

## Folder Structure

```text
app/
  api/
    create/route.ts
    fetch/[code]/route.ts
    highlight/route.ts
    favicon/route.ts
  layout.tsx
  page.tsx
  manifest.ts
  opengraph-image.tsx
  robots.ts
  sitemap.ts
  twitter-image.tsx
components/
  ClipEditor.tsx
  CodeCard.tsx
  ExpiryBadge.tsx
  HeroVisual.tsx
  SnippetDisplay.tsx
  ThemeProvider.tsx
  ThemeToggle.tsx
  ui/
lib/
  detect-language.ts
  generate-code.ts
  highlight.ts
  rate-limit.ts
  redis.ts
  utils.ts
  validate.ts
  hooks/
types/
public/
Logo/
```

## Installation

1. Clone the repository.
2. Install dependencies with npm.
3. Create your local environment file.
4. Configure Upstash Redis credentials.

```bash
git clone <repo-url>
cd quickdrop
npm install
cp .env.example .env.local
```

If you are on PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## Environment Variables

The app requires Upstash Redis at runtime. The example file also includes an optional public URL variable.

| Variable | Required | Purpose |
|---|---:|---|
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis REST token |
| `NEXT_PUBLIC_APP_URL` | No | Present in `.env.example`; useful if you want to drive public metadata from env later |

Example `.env.local`:

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-rest-token

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Local Development

Start the app after the Redis environment variables are in place:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Development notes:

- The app will fail fast if the Upstash variables are missing because `lib/redis.ts` validates them at import time.
- Use `Ctrl + Enter` to generate a code from the editor.
- Use `Ctrl + K` to focus the code input.
- The code input accepts only 6-character values from the app’s allowed character set.

Troubleshooting:

- `Missing UPSTASH_REDIS_REST_URL environment variable` means `.env.local` is incomplete.
- `Too many requests. Please slow down.` means the per-IP rate limit has been hit.
- `Snippet not found or expired` means the code is invalid, expired, or never existed.
- Large snippets may fall back to plain text if syntax highlighting is skipped.

## Database Setup

CodeSharePro uses Upstash Redis as its only persistence layer.

Setup steps:

1. Create a Redis database in Upstash.
2. Copy the REST URL and REST token.
3. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in `.env.local`.
4. Start the app.

Storage behavior:

- Snippets are stored under keys like `clip:{CODE}`.
- The create route stores `{ text, createdAt }`.
- Each snippet gets a fixed TTL of 600 seconds.
- There are no SQL migrations, schemas, or ORM models.

## Authentication

There is no authentication system in this repository.

The app is intentionally public and depends on:

- short-lived Redis storage
- code validation
- IP-based rate limiting

If you need authenticated sharing, that would require a separate auth layer and is not currently implemented.

## API Overview

### `POST /api/create`

Creates a new snippet.

Request:

```json
{ "text": "console.log('hello')" }
```

Response:

```json
{
  "code": "K7XM2P",
  "expiresAt": 1716123456789
}
```

Behavior:

- Validates that `text` is a non-empty string
- Rejects payloads above 100 KB
- Rejects null bytes
- Rate limited to 10 requests per minute per IP
- Generates a collision-resistant 6-character code
- Stores the snippet in Redis with a 10-minute TTL

### `GET /api/fetch/[code]`

Fetches a snippet by code.

Response:

```json
{
  "text": "console.log('hello')",
  "ttl": 542
}
```

Behavior:

- Validates the code format
- Rate limited to 30 requests per minute per IP
- Returns raw snippet text and remaining TTL
- Does not delete the snippet on read

### `POST /api/highlight`

Server-side syntax highlighting endpoint used by the client.

Request:

```json
{ "text": "def hello():\n  print('hi')" }
```

Response:

```json
{
  "html": "<pre class=\"shiki\">...</pre>",
  "language": "python"
}
```

Behavior:

- Rejects invalid or empty text
- Rejects payloads above 100 KB
- Uses Shiki for syntax highlighting
- Falls back to escaped plain text if highlighting fails

## Usage Guide

Create and share a snippet:

1. Paste code, config, or text into the editor.
2. Click `Generate Code` or press `Ctrl + Enter`.
3. Copy the generated 6-character code.
4. Share the code with the recipient.

Retrieve a snippet:

1. Enter the code in the retrieve field.
2. Click `Retrieve` or press `Enter`.
3. View the snippet with syntax highlighting.
4. Copy the text if needed.

Operational note:

- Retrieval is not destructive.
- Snippets remain available until their Redis TTL expires.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Deployment

The project is configured for Vercel-style deployment and already includes:

- Vercel Analytics
- Vercel Speed Insights
- Open Graph and Twitter preview routes
- Metadata, sitemap, and robots configuration

Deployment checklist:

1. Set the required Upstash environment variables in your hosting provider.
2. Build the app with the default Next.js production workflow.
3. Deploy the repository.
4. Verify the homepage, create flow, and fetch flow after deployment.

## Security Notes

- Input is validated before storage or retrieval.
- Codes are restricted to the allowed 6-character format.
- Snippet size is capped at 100 KB.
- Null bytes are rejected.
- Rate limiting is enforced separately for create and fetch requests.
- API routes are excluded from crawling in `robots.ts`.
- `next.config.ts` sets security headers including `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, and `Permissions-Policy`.
- Highlighted HTML is generated server-side rather than accepting user-supplied markup.

## Performance Optimizations

- Shiki highlighting is server-side only.
- Large snippets skip highlighting and fall back to escaped plain text.
- Language detection samples only the first 2 KB of text.
- The highlight route caps payloads at 100 KB.
- Redis TTL handles expiry without cleanup jobs.
- Fonts are loaded through `next/font` for optimized delivery.
- `serverExternalPackages: ["shiki"]` keeps server bundling predictable.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Install dependencies with npm.
4. Run `npm run lint` before opening a pull request.
5. Keep changes focused and consistent with the existing Next.js App Router structure.

## License

CodeSharePro is released under the MIT License — see [LICENSE](LICENSE) for the full text.
