import ClipEditor from "@/components/ClipEditor";

export default function HomePage() {
  return (
    <div className="page">
      <main className="main container">
        <header className="hero">
          <div className="hero__copy">
            <span className="hero__eyebrow">Fast, private snippet sharing</span>

            <h1 className="hero__title">
              Paste once.
              <br />
              Share anywhere.
            </h1>

            <p className="hero__subtitle">
              Create a short-lived code for text, configs, or snippets. No login, no clutter, just a clean handoff.
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

        <section id="editor" className="editor-shell">
          <ClipEditor />
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>&copy; {new Date().getFullYear()} QuickDrop</span>
          <span className="footer__divider">|</span>
          <span>Snippets expire automatically</span>
          <span className="footer__divider">|</span>
          <span>No permanent storage</span>
        </div>
      </footer>
    </div>
  );
}
