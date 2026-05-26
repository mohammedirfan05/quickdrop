"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-clipboard";
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
  const { copied, pulsing, copy } = useCopyToClipboard();

  return (
    <div className="snippet-card">
      <div className="code-card__bar" />

      <div className="snippet-header">
        <div className="snippet-meta">
          <span className="chip chip--mono">{language === "text" ? "plain" : language}</span>
          <ExpiryBadge expiresAt={expiresAt} />
        </div>

        <button
          onClick={() => copy(text)}
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