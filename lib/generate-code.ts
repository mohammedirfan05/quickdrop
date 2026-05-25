const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars: 0,O,I,1

/**
 * Generates a cryptographically random 6-character alphanumeric code.
 * Avoids visually ambiguous characters (0/O, 1/I) for better UX.
 */
export function generateCode(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => CHARS[b % CHARS.length])
    .join("");
}
