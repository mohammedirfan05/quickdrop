import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { createRateLimit } from "@/lib/rate-limit";
import { generateCode } from "@/lib/generate-code";
import { validateText, getClientIp } from "@/lib/validate";
import type { Snippet, CreateResponse, ApiError } from "@/types/snippet";

const DEFAULT_TTL = 600; // 10 minutes
const MAX_COLLISION_RETRIES = 5;

export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateResponse | ApiError>> {
  // Rate limiting
  const ip = getClientIp(request);
  const { success, reset } = await createRateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) },
      }
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawText = (body as Record<string, unknown>)?.text;
  const validation = validateText(rawText);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error! }, { status: 400 });
  }

  const text = (rawText as string).trim();

  // Generate a unique code with collision detection
  let code = "";
  let attempts = 0;

  while (attempts < MAX_COLLISION_RETRIES) {
    const candidate = generateCode();
    const exists = await redis.exists(`clip:${candidate}`);
    if (!exists) {
      code = candidate;
      break;
    }
    attempts++;
  }

  if (!code) {
    return NextResponse.json(
      { error: "Failed to generate unique code — please try again" },
      { status: 500 }
    );
  }

  const snippet: Snippet = {
    text,
    createdAt: Date.now(),
  };

  // Store in Redis with TTL
  await redis.setex(`clip:${code}`, DEFAULT_TTL, JSON.stringify(snippet));

  return NextResponse.json({
    code,
    expiresAt: Date.now() + DEFAULT_TTL * 1000,
  });
}
