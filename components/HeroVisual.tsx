"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_SNIPPETS = [
  {
    lang: "typescript",
    code: [
      "const share = await create({",
      '  text: config.env,',
      "  ttl: 600,",
      "});",
      "",
      `console.log(share.code);`,
      `// → "K7XM2P"`,
    ],
  },
  {
    lang: "python",
    code: [
      "import requests",
      "",
      "r = requests.post('/api/create',",
      "  json={'text': secret})",
      "",
      "print(r.json()['code'])",
      "# → 'R9QF4W'",
    ],
  },
  {
    lang: "bash",
    code: [
      "$ curl -X POST /api/create \\",
      "  -d '{\"text\":\"DB_PASS=x9k\"}'",
      "",
      '{ "code": "H3NZ7T",',
      '  "ttl": 600 }',
      "",
      "$ # share verbally →",
    ],
  },
];

const CHAR_SET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*";

// Precomputed per-line direction so render is deterministic (no Math.random in render)
const LINE_DIRECTIONS = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1];

function scramble(text: string, progress: number): string {
  let seed = 0;
  return text
    .split("")
    .map((char) => {
      if (char === " " || char === "\n") return char;
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      const revealThreshold = (seed >>> 0) / 0xffffffff;
      if (progress >= revealThreshold) return char;
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      if (((seed >>> 0) / 0xffffffff) < 0.35) {
        const idx = Math.floor(((seed >>> 0) / 0xffffffff) * CHAR_SET.length);
        return CHAR_SET[idx];
      }
      return char;
    })
    .join("");
}

export default function HeroVisual() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [ttl, setTtl] = useState(600);
  const [phase, setPhase] = useState<"alive" | "decaying" | "dissolving" | "transitioning">("alive");
  const [dissolveProgress, setDissolveProgress] = useState(0);
  const [displayLines, setDisplayLines] = useState(DEMO_SNIPPETS[0].code);
  const [opacity, setOpacity] = useState(1);
  const [blurAmount, setBlurAmount] = useState(0);
  const rafRef = useRef<number>(0);

  // TTL countdown
  useEffect(() => {
    if (phase !== "alive" && phase !== "decaying") return;
    const interval = setInterval(() => {
      setTtl((prev) => {
        const next = prev - 1;
        if (next <= 3) {
          setPhase("dissolving");
        } else if (next <= 30) {
          setPhase("decaying");
        }
        return next;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [phase]);

  // Dissolve animation
  useEffect(() => {
    if (phase !== "dissolving") return;
    let start: number | null = null;
    const duration = 1600;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      setDissolveProgress(p);
      setOpacity(1 - p * 0.9);
      setBlurAmount(p * 2.5);

      const snippet = DEMO_SNIPPETS[snippetIdx];
      const fullText = snippet.code.join("\n");
      const scrambled = scramble(fullText, 1 - p);
      setDisplayLines(scrambled.split("\n"));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setPhase("transitioning");
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, snippetIdx]);

  // Transition to next snippet
  useEffect(() => {
    if (phase !== "transitioning") return;
    const t = setTimeout(() => {
      const next = (snippetIdx + 1) % DEMO_SNIPPETS.length;
      setSnippetIdx(next);
      setDisplayLines(DEMO_SNIPPETS[next].code);
      setTtl(600);
      setDissolveProgress(0);
      setOpacity(1);
      setBlurAmount(0);
      setPhase("alive");
    }, 350);
    return () => clearTimeout(t);
  }, [phase, snippetIdx]);

  const formatTtl = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const urgency = ttl <= 30 ? "urgent" : ttl <= 120 ? "warn" : "ok";
  const codes = ["K7XM2P", "R9QF4W", "H3NZ7T"];
  const currentCode = codes[snippetIdx];
  const langs = ["TypeScript", "Python", "Bash"];
  const currentLang = langs[snippetIdx];

  return (
    <div className="hero-visual" aria-hidden="true">
      {/* Atmospheric depth rings */}
      <div className="hero-visual__rings">
        <div className="hero-visual__ring hero-visual__ring--1" />
        <div className="hero-visual__ring hero-visual__ring--2" />
        <div className="hero-visual__ring hero-visual__ring--3" />
      </div>

      {/* Main floating panel */}
      <div
        className={`hero-panel hero-panel--${urgency}`}
        style={{
          opacity,
          filter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
          willChange: "opacity, filter",
        }}
      >
        {/* Window chrome bar */}
        <div className="hero-panel__bar">
          <div className="hero-panel__dots">
            <span className="window-dot" />
            <span className="window-dot" />
            <span className="window-dot" />
          </div>
          <div className="hero-panel__meta">
            <span className="hero-panel__lang">{currentLang}</span>
            <span className="hero-panel__sep">·</span>
            <span className="hero-panel__filename">snippet.tmp</span>
          </div>
          <div className={`hero-panel__status hero-panel__status--${urgency}`}>
            <span className="hero-panel__status-dot" />
            {phase === "dissolving" || phase === "transitioning"
              ? "dissolving"
              : phase === "decaying"
              ? "expiring"
              : "live"}
          </div>
        </div>

        {/* Code body */}
        <div className="hero-panel__code">
          {displayLines.map((line, i) => {
            // Deterministic fade per line during dissolve (no Math.random in render)
            const lineOpacity =
              phase === "dissolving"
                ? Math.max(0, 1 - dissolveProgress * 1.5 + (i / displayLines.length) * dissolveProgress * 0.5)
                : 1;
            const lineShift =
              phase === "dissolving"
                ? dissolveProgress * LINE_DIRECTIONS[i % LINE_DIRECTIONS.length] * 6 * dissolveProgress
                : 0;
            return (
              <div
                key={i}
                className="hero-panel__line"
                style={{
                  opacity: lineOpacity,
                  transform: lineShift !== 0 ? `translateX(${lineShift}px)` : "none",
                }}
              >
                <span className="hero-panel__lineno">{(i + 1).toString().padStart(2, " ")}</span>
                <span className="hero-panel__linetext">{line || " "}</span>
              </div>
            );
          })}
        </div>

        {/* TTL bar */}
        <div className="hero-panel__footer">
          <div className="hero-panel__ttl-bar">
            <div
              className={`hero-panel__ttl-fill hero-panel__ttl-fill--${urgency}`}
              style={{ width: `${(ttl / 600) * 100}%` }}
            />
          </div>
          <div className="hero-panel__bottom">
            <span className={`hero-panel__timer hero-panel__timer--${urgency}`}>
              {phase === "dissolving" || phase === "transitioning" ? "——:——" : formatTtl(ttl)}
            </span>
            <span className="hero-panel__code-label">
              code:{" "}
              <span className="hero-panel__code-value">{currentCode}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Floating secondary badge — inside overflow:hidden container, kept modest */}
      <div className="hero-float-card">
        <div className="hero-float-card__icon">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="hero-float-card__text">
          <span className="hero-float-card__label">Ephemeral session</span>
          <span className="hero-float-card__sub">end-to-end</span>
        </div>
        <div className="hero-float-card__pulse" />
      </div>
    </div>
  );
}
