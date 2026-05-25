import ClipEditor from "@/components/ClipEditor";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="container nav__inner">
          <div className="brand">
            <div className="brand__mark" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="#fff" strokeWidth="1.2" />
                <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            <span className="brand__name">ClipLink</span>
            <span className="badge">Beta</span>
          </div>

          <div className="nav__actions">
            <span className="nav__note">No login required</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="main container">
        <header className="hero">
          <span className="hero__eyebrow">
            <span className="status-dot animate-dot-pulse" aria-hidden="true" />
            Free to use, no account needed
          </span>

          <h1 className="hero__title">
            Paste. <span className="hero__accent">Share.</span> Done.
          </h1>

          <p className="hero__subtitle">
            Paste code, configs, or notes. Get a 6 character code. Share it anywhere, instantly.
          </p>

          <div className="hero__meta">
            {["No login", "Expires in 10 min", "100KB limit", "Syntax highlighting"].map((feat) => (
              <span key={feat} className="pill">
                {feat}
              </span>
            ))}
          </div>
        </header>

        <ClipEditor />
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>&copy; {new Date().getFullYear()} ClipLink</span>
          <span className="footer__divider">|</span>
          <span>Snippets expire automatically</span>
          <span className="footer__divider">|</span>
          <span>No permanent storage</span>
        </div>
      </footer>
    </div>
  );
}
