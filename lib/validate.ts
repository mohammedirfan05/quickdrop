const MAX_TEXT_BYTES = 100 * 1024; // 100KB
const CODE_REGEX = /^[A-Z2-9]{6}$/; // 6 uppercase alphanumeric, no ambiguous chars

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateText(text: unknown): ValidationResult {
  if (typeof text !== "string") {
    return { valid: false, error: "Text must be a string" };
  }

  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Text cannot be empty" };
  }

  const byteLength = new TextEncoder().encode(trimmed).length;
  if (byteLength > MAX_TEXT_BYTES) {
    return {
      valid: false,
      error: `Text exceeds maximum size of ${MAX_TEXT_BYTES / 1024}KB`,
    };
  }

  // Sanitize: strip null bytes which can cause issues
  if (trimmed.includes("\0")) {
    return { valid: false, error: "Text contains invalid characters" };
  }

  return { valid: true };
}

export function validateCode(code: unknown): ValidationResult {
  if (typeof code !== "string") {
    return { valid: false, error: "Code must be a string" };
  }

  const upper = code.trim().toUpperCase();

  if (!CODE_REGEX.test(upper)) {
    return {
      valid: false,
      error: "Invalid code format — must be 6 alphanumeric characters",
    };
  }

  return { valid: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "127.0.0.1";
}
