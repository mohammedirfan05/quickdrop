"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2Icon, ZapIcon, SearchIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CodeCard from "./CodeCard";
import SnippetDisplay from "./SnippetDisplay";
import type { CreateResponse, FetchResponse } from "@/types/snippet";

const MAX_CHARS = 100 * 1024;

interface CreatedSnippet {
  code: string;
  expiresAt: number;
}

interface FetchedSnippet {
  text: string;
  html: string;
  language: string;
  expiresAt: number;
}

export default function ClipEditor() {
  const [text, setText] = useState("");
  const [createdSnippet, setCreatedSnippet] = useState<CreatedSnippet | null>(null);
  const [isCreating, startCreateTransition] = useTransition();

  const [codeInput, setCodeInput] = useState("");
  const [fetchedSnippet, setFetchedSnippet] = useState<FetchedSnippet | null>(null);
  const [isFetching, startFetchTransition] = useTransition();

  const [autoCopy, setAutoCopy] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoCopy || !createdSnippet) return;

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(createdSnippet.code);
      } catch {
        const el = document.createElement("textarea");
        el.value = createdSnippet.code;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    };

    copy().catch(() => {
      toast.error("Auto-copy failed. Copy manually.");
    });
  }, [autoCopy, createdSnippet]);

  function handleCreate() {
    if (!text.trim()) {
      toast.error("Nothing to share. Type something first.");
      return;
    }

    startCreateTransition(async () => {
      try {
        const res = await fetch("/api/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.trim() }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error ?? "Failed to create snippet");
          return;
        }

        const created = data as CreateResponse;
        setCreatedSnippet({ code: created.code, expiresAt: created.expiresAt });
        toast.success(autoCopy ? "Snippet created and copied." : "Snippet created. Share the code below.");
      } catch {
        toast.error("Network error. Please check your connection.");
      }
    });
  }

  function handleClear() {
    setText("");
    setCreatedSnippet(null);
    textareaRef.current?.focus();
  }

  function handleFetch() {
    const trimmed = codeInput.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Enter a code first.");
      return;
    }
    if (!/^[A-Z2-9]{6}$/.test(trimmed)) {
      toast.error("Invalid code. Must be 6 alphanumeric characters.");
      return;
    }

    startFetchTransition(async () => {
      try {
        const res = await fetch(`/api/fetch/${trimmed}`);
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            toast.error("Snippet not found. It may have expired.");
          } else if (res.status === 429) {
            toast.error("Too many requests. Please slow down.");
          } else {
            toast.error(data.error ?? "Failed to fetch snippet");
          }
          return;
        }

        const fetched = data as FetchResponse;

        const highlightRes = await fetch("/api/highlight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: fetched.text }),
        });

        if (highlightRes.ok) {
          const { html, language } = await highlightRes.json();
          setFetchedSnippet({
            text: fetched.text,
            html,
            language,
            expiresAt: Date.now() + fetched.ttl * 1000,
          });
        } else {
          const escaped = fetched.text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          setFetchedSnippet({
            text: fetched.text,
            html: `<pre class="shiki-fallback"><code>${escaped}</code></pre>`,
            language: "text",
            expiresAt: Date.now() + fetched.ttl * 1000,
          });
        }

        toast.success("Snippet retrieved.");
      } catch {
        toast.error("Network error. Please check your connection.");
      }
    });
  }

  function handleTextareaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleCreate();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      codeInputRef.current?.focus();
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && codeInput.length === 6) {
      event.preventDefault();
      handleFetch();
    }
  }

  const charCount = new TextEncoder().encode(text).length;
  const isOverLimit = charCount > MAX_CHARS;
  const fetchBtnClass = codeInput.length === 6 ? "btn btn--primary" : "btn btn--soft";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="editor"
    >
      <section className="card editor-card" aria-label="Create snippet">
        <div className="card__header">
          <div className="card__title">
            <div className="window-dots" aria-hidden="true">
              {[
                { color: "#ff5f57" },
                { color: "#febc2e" },
                { color: "#28c840" },
              ].map((c) => (
                <span key={c.color} className="window-dot" style={{ background: c.color }} />
              ))}
            </div>
            <span className="card__label">New snippet</span>
          </div>

          {text.length > 0 && (
            <span
              id="char-count"
              className="card__count"
              data-over={isOverLimit ? "true" : "false"}
            >
              {charCount > 1024 ? `${(charCount / 1024).toFixed(1)} KB` : `${charCount} B`} / 100 KB
            </span>
          )}
        </div>

        <textarea
          ref={textareaRef}
          id="clip-textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (createdSnippet) setCreatedSnippet(null);
          }}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Paste code, configs, notes, or anything..."
          rows={12}
          spellCheck={false}
          autoComplete="off"
          aria-label="Text input area"
          aria-describedby="char-count"
          className="editor-textarea"
        />

        <div className="card__footer">
          <div className="editor-actions">
            <button
              id="generate-code-btn"
              onClick={handleCreate}
              disabled={isCreating || !text.trim() || isOverLimit}
              className="btn btn--primary"
            >
              {isCreating ? <Loader2Icon size={14} className="animate-spin" /> : <ZapIcon size={14} />}
              {isCreating ? "Generating..." : "Generate Code"}
            </button>

            {text.length > 0 && (
              <button id="clear-btn" onClick={handleClear} className="btn btn--ghost btn--danger">
                <XIcon size={12} />
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            className="toggle"
            role="switch"
            aria-checked={autoCopy}
            onClick={() => setAutoCopy((prev) => !prev)}
          >
            Auto-copy
            <span className="toggle__track" aria-hidden="true">
              <span className="toggle__thumb" />
            </span>
          </button>
        </div>
      </section>

      <div className="editor-shortcuts">
        <span>
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to generate
        </span>
        <span>
          <kbd>Ctrl</kbd> + <kbd>K</kbd> to focus code
        </span>
      </div>

      <AnimatePresence>
        {createdSnippet && (
          <motion.div
            key="code-card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <CodeCard code={createdSnippet.code} expiresAt={createdSnippet.expiresAt} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divider" aria-hidden="true">
        <div className="divider__line" />
        <span className="divider__label">or retrieve</span>
        <div className="divider__line" />
      </div>

      <section id="retrieve" className="card editor-card" aria-label="Retrieve snippet">
        <div className="card__body">
          <div className="input-shell">
            <input
              id="code-input"
              ref={codeInputRef}
              type="text"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 6));
                if (fetchedSnippet) setFetchedSnippet(null);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Enter 6-character code"
              maxLength={6}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              aria-label="Clip code input"
              className="code-input"
              data-filled={codeInput.length > 0 ? "true" : "false"}
            />
            <span className="input-icon" aria-hidden="true">
              <SearchIcon size={15} />
            </span>
          </div>

          <button
            id="fetch-btn"
            onClick={handleFetch}
            disabled={isFetching || codeInput.length !== 6}
            className={fetchBtnClass}
          >
            {isFetching ? <Loader2Icon size={14} className="animate-spin" /> : <SearchIcon size={14} />}
            {isFetching ? "Fetching..." : "Retrieve"}
          </button>
        </div>
      </section>

      <AnimatePresence>
        {fetchedSnippet && (
          <motion.div
            key="snippet-display"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SnippetDisplay
              text={fetchedSnippet.text}
              html={fetchedSnippet.html}
              language={fetchedSnippet.language}
              expiresAt={fetchedSnippet.expiresAt}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}