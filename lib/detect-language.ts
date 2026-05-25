/**
 * Heuristic language detection for syntax highlighting.
 * Uses pattern matching on the text content to identify the most likely language.
 * Falls back to 'text' (plain text) when no language is detected confidently.
 */

type Language =
  | "python"
  | "javascript"
  | "typescript"
  | "json"
  | "cpp"
  | "bash"
  | "text";

interface LangPattern {
  lang: Language;
  patterns: RegExp[];
  weight: number;
}

const LANG_PATTERNS: LangPattern[] = [
  {
    lang: "json",
    patterns: [/^\s*[\[{]/, /^\s*"[^"]+"\s*:/m, /":\s*(true|false|null|\d+)/],
    weight: 3,
  },
  {
    lang: "python",
    patterns: [
      /^\s*(def |class |import |from .+ import|if __name__)/m,
      /:\s*$/m,
      /print\s*\(/,
      /^\s*#.*$/m,
    ],
    weight: 2,
  },
  {
    lang: "typescript",
    patterns: [
      /:\s*(string|number|boolean|void|any|unknown|never)\b/,
      /interface\s+\w+\s*{/,
      /type\s+\w+\s*=/,
      /as\s+(string|number|boolean|any)\b/,
      /<[A-Z]\w*>/,
    ],
    weight: 3,
  },
  {
    lang: "javascript",
    patterns: [
      /\b(const|let|var)\s+\w+\s*=/,
      /=>\s*{/,
      /console\.(log|error|warn)\s*\(/,
      /require\s*\(/,
      /module\.exports/,
    ],
    weight: 2,
  },
  {
    lang: "cpp",
    patterns: [
      /#include\s*[<"]/,
      /\bstd::/,
      /\bint\s+main\s*\(/,
      /\bcout\s*<</,
      /\bcin\s*>>/,
      /->/,
    ],
    weight: 2,
  },
  {
    lang: "bash",
    patterns: [
      /^#!/,
      /^\s*\$/m,
      /\b(apt|brew|npm|yarn|pip|chmod|sudo|export|source)\b/,
      /\b(echo|cd|ls|mkdir|rm|mv|cp|grep|sed|awk)\b/,
      /\|\|/,
      /&&/,
    ],
    weight: 2,
  },
];

export function detectLanguage(text: string): Language {
  const sample = text.slice(0, 2000); // Only scan first 2KB for perf
  const scores: Record<Language, number> = {
    python: 0,
    javascript: 0,
    typescript: 0,
    json: 0,
    cpp: 0,
    bash: 0,
    text: 0,
  };

  for (const { lang, patterns, weight } of LANG_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(sample)) {
        scores[lang] += weight;
      }
    }
  }

  // TypeScript must score higher than JS to win (it has JS patterns too)
  if (scores.typescript > 0 && scores.javascript > 0) {
    scores.javascript = Math.max(0, scores.javascript - scores.typescript);
  }

  const best = Object.entries(scores).sort(([, a], [, b]) => b - a)[0];
  return best[1] > 0 ? (best[0] as Language) : "text";
}
