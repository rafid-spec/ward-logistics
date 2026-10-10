"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "../i18n";

/** First-visit loader: a load meter counts to 100, then the curtain lifts. Skipped on repeat visits and for reduced motion. */
export default function Intro({ t }: { t: Dict }) {
  const [phase, setPhase] = useState<"run" | "lift" | "done">("run");
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem("aw-intro") === "1";
      sessionStorage.setItem("aw-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("is-ready");
      const id = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      if (num.current) num.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      root.style.setProperty("--load", eased.toFixed(3));
      if (k < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("lift");
        root.classList.add("is-ready");
        setTimeout(() => setPhase("done"), 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;
  return (
    <div className={`intro ${phase === "lift" ? "is-lift" : ""}`} aria-hidden="true">
      <div className="intro-inner">
        <span className="mono intro-tag">{t.intro}</span>
        <span className="intro-num display" ref={num}>
          000
        </span>
        <div className="intro-bar">
          <span />
        </div>
        <span className="mono intro-coords">24.3474° N · 56.7454° E</span>
      </div>
    </div>
  );
}
