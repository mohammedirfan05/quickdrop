import ClipEditor from "@/components/ClipEditor";
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a href="/" className="navbar__brand" aria-label="CodeSharePro Home">
                <span className="navbar__logo" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
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
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="main container">
          {/* Hero */}
          <header className="hero">
            <span className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Ephemeral · Secure · Zero-friction
            </span>

            <h1 className="hero__title">
              Code that vanishes.{" "}
              <em>Speed&nbsp;that stays.</em>
            </h1>

            <p className="hero__subtitle">
              Generate a 6-character handoff code in one keystroke. Share it
              anywhere — no accounts, no clutter. Snippets self-destruct in 10 minutes.
            </p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#editor" id="hero-cta-share">
                <ZapIcon size={14} />
                Start sharing
              </a>
              <a className="btn btn--ghost" href="#retrieve" id="hero-cta-retrieve">
                Retrieve snippet
              </a>
            </div>

            {/* Social proof micro-stats */}
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

          {/* Editor — Layered glass panel */}
          <section id="editor" className="editor-shell" aria-label="Code sharing editor">
            <ClipEditor />
          </section>

          {/* Features — Bento grid */}
          <section className="features" aria-label="Features">
            <p className="features__sub">
              Built for developer handoffs. Designed for speed.
            </p>
            <h2 className="features__heading">Everything you need. Nothing you don&apos;t.</h2>

            <div className="bento-grid">
              {/* Wide — Instant sharing */}
              <article className="bento-card bento-card--wide" aria-label="Instant sharing feature">
                <div className="bento-card__icon">
                  <ZapIcon size={18} />
                </div>
                <h3 className="bento-card__title">Instant Sharing</h3>
                <p className="bento-card__desc">
                  Paste any content and receive a memorable 6-character code immediately.
                  No waiting, no processing. Share it verbally, via chat, or via any channel.
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

              {/* Syntax highlighting */}
              <article className="bento-card" aria-label="Syntax highlighting feature">
                <div className="bento-card__icon">
                  <CodeXmlIcon size={18} />
                </div>
                <h3 className="bento-card__title">Syntax Highlighting</h3>
                <p className="bento-card__desc">
                  Auto-detects 20+ languages. Renders beautifully with Shiki.
                </p>
                <div className="bento-lang-chips" aria-label="Supported languages">
                  {["TypeScript", "Python", "Rust", "Go", "SQL", "YAML", "JSON", "Bash"].map((lang) => (
                    <span key={lang} className="bento-lang-chip">{lang}</span>
                  ))}
                </div>
              </article>

              {/* Dark accent — No login */}
              <article className="bento-card bento-card--accent" aria-label="No signup required feature">
                <div className="bento-card__icon">
                  <UserXIcon size={18} />
                </div>
                <h3 className="bento-card__title">Zero Friction</h3>
                <p className="bento-card__desc">
                  No accounts. No passwords. No tracking. Open the page and start sharing.
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
                    <span>Share the code verbally or via chat</span>
                  </div>
                </div>
              </article>

              {/* Auto-expiry */}
              <article className="bento-card" aria-label="Auto-expiry feature">
                <div className="bento-card__icon">
                  <ClockIcon size={18} />
                </div>
                <h3 className="bento-card__title">Auto-Expiry</h3>
                <p className="bento-card__desc">
                  Snippets self-destruct after 10 minutes. No permanent storage, no data lingering.
                </p>
                <div className="bento-timer" aria-label="Expiry countdown example">
                  <span className="bento-timer__icon" aria-hidden="true">
                    <ClockIcon size={14} />
                  </span>
                  <span className="bento-timer__label">Snippet expires in</span>
                  <span className="bento-timer__value">09:42</span>
                </div>
              </article>

              {/* Privacy */}
              <article className="bento-card" aria-label="Privacy feature">
                <div className="bento-card__icon">
                  <ShieldCheckIcon size={18} />
                </div>
                <h3 className="bento-card__title">Privacy by Design</h3>
                <p className="bento-card__desc">
                  Ephemeral storage with no logs retained. What you share stays between you and your recipient.
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
