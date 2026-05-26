"use client";

import { useState, useCallback } from "react";

/**
 * Shared hook for clipboard copy with visual feedback states.
 * Eliminates duplication between CodeCard and SnippetDisplay.
 */
export function useCopyToClipboard(timeout = 2200) {
  const [copied, setCopied] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for older browsers / insecure contexts
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
      setTimeout(() => setCopied(false), timeout);
      setTimeout(() => setPulsing(false), 750);
    },
    [timeout]
  );

  return { copied, pulsing, copy } as const;
}
