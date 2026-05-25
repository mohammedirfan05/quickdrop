import { codeToHtml } from "shiki";
import { detectLanguage } from "./detect-language";

const MAX_HIGHLIGHT_CHARS = 50_000; // 50KB — beyond this we skip highlighting

/**
 * Server-side syntax highlighting using Shiki.
 * Returns safe HTML string with syntax highlighting applied.
 * Falls back to escaped plain text for large payloads.
 */
export async function highlightCode(text: string): Promise<{
  html: string;
  language: string;
}> {
  // Skip highlighting for very large texts
  if (text.length > MAX_HIGHLIGHT_CHARS) {
    return {
      html: `<pre class="shiki-fallback"><code>${escapeHtml(text)}</code></pre>`,
      language: "text",
    };
  }

  const language = detectLanguage(text);

  // Map our internal lang IDs to Shiki-supported ones
  const shikiLang =
    language === "text"
      ? "plaintext"
      : language === "cpp"
        ? "cpp"
        : language;

  try {
    const html = await codeToHtml(text, {
      lang: shikiLang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });

    return { html, language };
  } catch {
    // Fallback if Shiki fails for any reason
    return {
      html: `<pre class="shiki-fallback"><code>${escapeHtml(text)}</code></pre>`,
      language,
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
