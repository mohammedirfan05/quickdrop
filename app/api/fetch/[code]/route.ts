import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { fetchRateLimit } from "@/lib/rate-limit";
import { validateCode, getClientIp } from "@/lib/validate";
import type { Snippet, FetchResponse, ApiError } from "@/types/snippet";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
): Promise<NextResponse<FetchResponse | ApiError>> {
  const { code } = await params;

  // Rate limiting
  const ip = getClientIp(request);
  const { success, reset } = await fetchRateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests — slow down" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) },
      }
    );
  }

  // Validate code format
  const upperCode = code.trim().toUpperCase();
  const validation = validateCode(upperCode);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error! }, { status: 400 });
  }

  const key = `clip:${upperCode}`;

  // Fetch from Redis and get remaining TTL in one pipeline
  const [raw, ttl] = await Promise.all([
    redis.get<string>(key),
    redis.ttl(key),
  ]);

  if (raw === null) {
    return NextResponse.json(
      { error: "Snippet not found or expired" },
      { status: 404 }
    );
  }

  let snippet: Snippet;
  try {
    snippet = typeof raw === "string" ? JSON.parse(raw) : (raw as Snippet);
  } catch {
    return NextResponse.json(
      { error: "Corrupted snippet data" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    text: snippet.text,
    ttl: Math.max(0, ttl),
  });
}
