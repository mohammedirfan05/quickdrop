import ClipEditor from "@/components/ClipEditor";
import HeroVisual from "@/components/HeroVisual";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ZapIcon,
  ShieldCheckIcon,
  CodeXmlIcon,
  UserXIcon,
  ClockIcon,
} from "lucide-react";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CodeSharePro",
    url: "https://codesharepro.vercel.app",
    description:
      "Share code snippets, configs, and text instantly with a 6-character code. No signup, no clutter — just paste, share, and retrieve.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instant 6-character code sharing",
      "Auto-expiring snippets",
      "Syntax highlighting for 20+ languages",
      "No signup required",
      "Dark and light mode",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page">
        {/* Navigation */}
        <nav className="navbar" aria-label="Main navigation">
          <div className="container navbar__inner">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a href="/" className="navbar__brand" aria-label="CodeSharePro Home">
                <span className="navbar__logo" aria-hidden="true">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <span className="navbar__name">
                  CodeShare<span className="navbar__name--accent">Pro</span>
                </span>
              </a>
              <span className="navbar__badge">v2</span>
            </div>

            <div className="navbar__actions">
              <a href="#editor" className="navbar__link">Editor</a>
              <a href="#retrieve" className="navbar__link">Retrieve</a>
              <span className="navbar__sep" aria-hidden="true" />
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="main container">

          {/* ── HERO ─────────────────────────────────────────────────── */}
          {/* Split layout: editorial text left, cinematic visual right */}
          <div className="hero-wrapper">
            <header className="hero">
              <span className="hero__eyebrow">
                <span className="hero__eyebrow-dot" aria-hidden="true" />
                live · ephemeral · secure
              </span>

              <h1 className="hero__title">
                Code that vanishes.
                <em>Speed&nbsp;that stays.</em>
              </h1>

              <p className="hero__subtitle">
                Generate a 6-character handoff code in one keystroke.
                Snippets self-destruct in 10 minutes.
                No accounts, no clutter.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#editor" id="hero-cta-share">
                  <ZapIcon size={13} />
                  Start sharing
                </a>
                <a className="btn btn--ghost" href="#retrieve" id="hero-cta-retrieve">
                  Retrieve snippet
                </a>
              </div>

              {/* Micro-stats — editorial, baseline-aligned, left-heavy */}
              <div className="hero__stat-row" aria-label="Product statistics">
                <div className="hero__stat">
                  <span className="hero__stat-value">6</span>
                  <span className="hero__stat-label">char code</span>
                </div>
                <div className="hero__stat-sep" aria-hidden="true" />
                <div className="hero__stat">
                  <span className="hero__stat-value">10m</span>
                  <span className="hero__stat-label">auto-expiry</span>
                </div>
                <div className="hero__stat-sep" aria-hidden="true" />
                <div className="hero__stat">
                  <span className="hero__stat-value">20+</span>
                  <span className="hero__stat-label">languages</span>
                </div>
                <div className="hero__stat-sep" aria-hidden="true" />
                <div className="hero__stat">
                  <span className="hero__stat-value">0</span>
                  <span className="hero__stat-label">signup needed</span>
                </div>
              </div>
            </header>

            {/* Right side — live animated snippet session */}
            <HeroVisual />
          </div>

          {/* ── EDITOR ───────────────────────────────────────────────── */}
          <section id="editor" className="editor-shell" aria-label="Code sharing editor">
            <ClipEditor />
          </section>

          {/* ── FEATURES — Asymmetric bento ──────────────────────────── */}
          <section className="features" aria-label="Features">
            {/* Editorial header — two-column, not centered */}
            <div className="features__header">
              <div className="features__heading-group">
                <span className="features__overline">Why CodeSharePro</span>
                <h2 className="features__heading">
                  Everything you need.{"\u00A0"}
                  <br />Nothing you don&apos;t.
                </h2>
              </div>
              <p className="features__aside">
                Built for developer handoffs. No fluff, no signups.
                Just a clean tool that respects your time.
              </p>
            </div>

            {/* Asymmetric 3-column grid — intentional hierarchy */}
            <div className="bento-grid">

              {/* ① Dominant — Instant Sharing — tall left column */}
              <article className="bento-card bento-card--dominant" aria-label="Instant sharing feature">
                <div className="bento-card__icon">
                  <ZapIcon size={17} />
                </div>
                <h3 className="bento-card__title">Instant Sharing</h3>
                <p className="bento-card__desc">
                  Paste any content — code, configs, environment variables, notes —
                  and receive a memorable 6-character code immediately.
                  Share verbally, drop it in chat, or read it aloud.
                  No waiting. No processing delay.
                </p>
                <div className="bento-speed-bar" aria-label="Sharing speed metrics">
                  <div className="bento-speed-row">
                    <span className="bento-speed-label">Create</span>
                    <div className="bento-speed-track">
                      <div className="bento-speed-fill" style={{ width: "98%" }} />
                    </div>
                    <span className="bento-speed-value">~80ms</span>
                  </div>
                  <div className="bento-speed-row">
                    <span className="bento-speed-label">Retrieve</span>
                    <div className="bento-speed-track">
                      <div className="bento-speed-fill" style={{ width: "95%" }} />
                    </div>
                    <span className="bento-speed-value">~60ms</span>
                  </div>
                  <div className="bento-speed-row">
                    <span className="bento-speed-label">Highlight</span>
                    <div className="bento-speed-track">
                      <div className="bento-speed-fill" style={{ width: "88%" }} />
                    </div>
                    <span className="bento-speed-value">~120ms</span>
                  </div>
                </div>
              </article>

              {/* ② Secondary — Syntax highlighting */}
              <article className="bento-card bento-card--secondary" aria-label="Syntax highlighting feature">
                <div className="bento-card__icon">
                  <CodeXmlIcon size={17} />
                </div>
                <h3 className="bento-card__title">Syntax Highlighting</h3>
                <p className="bento-card__desc">
                  Auto-detects 20+ languages. Rendered with Shiki.
                </p>
                <div className="bento-lang-chips" aria-label="Supported languages">
                  {["TypeScript", "Python", "Rust", "Go", "SQL", "YAML", "JSON", "Bash"].map((lang) => (
                    <span key={lang} className="bento-lang-chip">{lang}</span>
                  ))}
                </div>
              </article>

              {/* ③ Accent — Zero friction */}
              <article className="bento-card bento-card--accent" aria-label="No signup required feature">
                <div className="bento-card__icon">
                  <UserXIcon size={17} />
                </div>
                <h3 className="bento-card__title">Zero Friction</h3>
                <p className="bento-card__desc">
                  No accounts. No passwords. No tracking.
                </p>
                <div className="bento-steps" aria-label="Steps to share">
                  <div className="bento-step">
                    <span className="bento-step__num">1</span>
                    <span>Paste your content</span>
                  </div>
                  <div className="bento-step">
                    <span className="bento-step__num">2</span>
                    <span>Generate a 6-char code</span>
                  </div>
                  <div className="bento-step">
                    <span className="bento-step__num">3</span>
                    <span>Share it anywhere</span>
                  </div>
                </div>
              </article>

              {/* ④ Small — Auto-expiry */}
              <article className="bento-card bento-card--small-a" aria-label="Auto-expiry feature">
                <div className="bento-card__icon">
                  <ClockIcon size={17} />
                </div>
                <h3 className="bento-card__title">Auto-Expiry</h3>
                <p className="bento-card__desc">
                  Snippets self-destruct after 10 minutes.
                </p>
                <div className="bento-timer" aria-label="Expiry countdown example">
                  <span className="bento-timer__icon" aria-hidden="true">
                    <ClockIcon size={13} />
                  </span>
                  <span className="bento-timer__label">Expires in</span>
                  <span className="bento-timer__value">09:42</span>
                </div>
              </article>

              {/* ⑤ Small — Privacy */}
              <article className="bento-card bento-card--small-b" aria-label="Privacy feature">
                <div className="bento-card__icon">
                  <ShieldCheckIcon size={17} />
                </div>
                <h3 className="bento-card__title">Privacy by Design</h3>
                <p className="bento-card__desc">
                  Ephemeral storage. No logs retained after expiry.
                </p>
              </article>

            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container footer__inner">
            <div className="footer__brand">
              <span className="footer__logo-text">
                CodeShare<span className="navbar__name--accent">Pro</span>
              </span>
            </div>
            <div className="footer__meta">
              <span className="footer__indicator" aria-label="System operational">
                <span className="footer__indicator-dot" aria-hidden="true" />
                All systems operational
              </span>
              <span className="footer__divider" aria-hidden="true">&middot;</span>
              <span>&copy; {new Date().getFullYear()} CodeSharePro</span>
              <span className="footer__divider" aria-hidden="true">&middot;</span>
              <span>Snippets expire automatically</span>
              <span className="footer__divider" aria-hidden="true">&middot;</span>
              <span>No permanent storage</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
