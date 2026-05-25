"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import ExpiryBadge from "./ExpiryBadge";

interface SnippetDisplayProps {
  text: string;
  html: string;
  language: string;
  expiresAt: number;
}

export default function SnippetDisplay({
  text,
  html,
  language,
  expiresAt,
}: SnippetDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setPulsing(true);
    setTimeout(() => setCopied(false), 2200);
    setTimeout(() => setPulsing(false), 750);
  }

  return (
    <div className="snippet-card">
      <div className="code-card__bar" />

      <div className="snippet-header">
        <div className="snippet-meta">
          <span className="chip chip--mono">{language === "text" ? "plain" : language}</span>
          <ExpiryBadge expiresAt={expiresAt} />
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Text copied" : "Copy snippet text"}
          className={`copy-button copy-button--sm ${pulsing ? "animate-success-pulse" : ""}`}
          data-copied={copied ? "true" : "false"}
        >
          {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="snippet-body">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}