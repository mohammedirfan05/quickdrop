"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Keep the initial server render stable; the theme value resolves client-side.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div className="theme-toggle__placeholder" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}