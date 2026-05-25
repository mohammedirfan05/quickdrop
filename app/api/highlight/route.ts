import { NextRequest, NextResponse } from "next/server";
import { highlightCode } from "@/lib/highlight";

const MAX_HIGHLIGHT_SIZE = 100 * 1024; // 100KB

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = (body as Record<string, unknown>)?.text;

  if (typeof text !== "string" || text.length === 0) {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }

  if (new TextEncoder().encode(text).length > MAX_HIGHLIGHT_SIZE) {
    return NextResponse.json({ error: "Text too large" }, { status: 400 });
  }

  const { html, language } = await highlightCode(text);

  return NextResponse.json({ html, language });
}