"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import ExpiryBadge from "./ExpiryBadge";

interface CodeCardProps {
  code: string;
  expiresAt: number;
}

export default function CodeCard({ code, expiresAt }: CodeCardProps) {
  const [copied, setCopied] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
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
    <div className="code-card">
      <div className="code-card__bar" />

      <div className="code-card__body">
        <div className="code-card__header">
          <span className="chip">
            <span className="chip__dot" aria-hidden="true" />
            Clip Code
          </span>
          <ExpiryBadge expiresAt={expiresAt} />
        </div>

        <div className="code-pill">
          <span className="code-pill__text">{code}</span>

          <button
            onClick={handleCopy}
            aria-label={copied ? "Code copied" : "Copy code to clipboard"}
            className={`copy-button ${pulsing ? "animate-success-pulse" : ""}`}
            data-copied={copied ? "true" : "false"}
          >
            {copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <p className="code-card__hint">
          Share this code with anyone to transfer the snippet instantly. It will expire automatically.
        </p>
      </div>
    </div>
  );
}