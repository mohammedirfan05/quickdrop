"use client";

import { useEffect, useState } from "react";

interface ExpiryBadgeProps {
  expiresAt: number;
}

function formatTime(seconds: number): string {
  if (seconds <= 0) return "Expired";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) return `${m}m ${s.toString().padStart(2, "0")}s`;
  return `${s}s`;
}

export default function ExpiryBadge({ expiresAt }: ExpiryBadgeProps) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const updateRemaining = () => {
      const secs = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setRemaining(secs);
      return secs;
    };

    if (updateRemaining() <= 0) return;

    const interval = setInterval(() => {
      const secs = updateRemaining();
      if (secs <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const isExpired = remaining <= 0;
  const isUrgent = remaining <= 60 && remaining > 0;

  return (
    <span
      className="expiry-badge"
      data-state={isExpired ? "expired" : isUrgent ? "urgent" : "ok"}
    >
      <span
        className={`expiry-badge__dot ${isExpired ? "" : "animate-dot-pulse"}`}
        aria-hidden="true"
      />
      {isExpired ? "Expired" : `${formatTime(remaining)}`}
    </span>
  );
}