import ClipEditor from "@/components/ClipEditor";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ZapIcon, ShieldIcon, CodeIcon, GlobeIcon } from "lucide-react";

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
            <a href="/" className="navbar__brand" aria-label="CodeSharePro Home">
              <span className="navbar__logo" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <span className="navbar__name">
                CodeShare<span className="navbar__name--accent">Pro</span>
              </span>
            </a>

            <div className="navbar__actions">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="main container">
          {/* Hero */}
          <header className="hero">
            <div className="hero__copy">
              <span className="hero__eyebrow">Fast, private snippet sharing</span>

              <h1 className="hero__title">
                Paste once.
                <br />
                Share anywhere.
              </h1>

              <p className="hero__subtitle">
                Create a short-lived code for text, configs, or snippets. No login, no clutter, just
                a clean handoff.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#editor">
                  Start sharing
                </a>
                <a className="btn btn--ghost" href="#retrieve">
                  Retrieve a snippet
                </a>
              </div>
            </div>
          </header>

          {/* Editor */}
          <section id="editor" className="editor-shell" aria-label="Code sharing editor">
            <ClipEditor />
          </section>

          {/* Features */}
          <section className="features" aria-label="Features">
            <h2 className="sr-only">Why CodeSharePro</h2>
            <div className="features__grid">
              <article className="feature-card">
                <div className="feature-card__icon">
                  <ZapIcon size={20} />
                </div>
                <h3 className="feature-card__title">Instant Sharing</h3>
                <p className="feature-card__desc">
                  Paste any text, get a 6-character code instantly. Share it verbally, via chat, or
                  anywhere.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-card__icon">
                  <ShieldIcon size={20} />
                </div>
                <h3 className="feature-card__title">Auto-Expiring</h3>
                <p className="feature-card__desc">
                  Snippets self-destruct after 10 minutes. No permanent storage, no data lingering
                  around.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-card__icon">
                  <CodeIcon size={20} />
                </div>
                <h3 className="feature-card__title">Syntax Highlighting</h3>
                <p className="feature-card__desc">
                  Auto-detects 20+ languages and renders code beautifully with full syntax
                  highlighting.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-card__icon">
                  <GlobeIcon size={20} />
                </div>
                <h3 className="feature-card__title">No Signup Required</h3>
                <p className="feature-card__desc">
                  Just open and use. No accounts, no friction, no tracking. A clean tool that
                  respects your time.
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
