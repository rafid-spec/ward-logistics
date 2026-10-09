"use client";

import { Fragment, useEffect, useRef } from "react";

/** Pulls its child toward the pointer while hovered. Transform-only, rAF-driven. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => (raf ||= requestAnimationFrame(loop));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const leave = () => {
      tx = ty = 0;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}

/** Splits a phrase into masked words that rise in sequence when the parent gets .is-in */
export function Words({ text, base = 0, step = 40 }: { text: string; base?: number; step?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span style={{ transitionDelay: `${base + i * step}ms` }}>{w}</span>
          </span>{" "}
        </Fragment>
      ))}
      <span className="sr-only">{text}</span>
    </>
  );
}

/** Dot + trailing ring. Ring expands with a label over [data-cursor] targets. Fine pointers only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      const r = ring.current!;
      r.dataset.state = t ? (t.dataset.cursor ? "label" : "hover") : "";
      label.current!.textContent = t?.dataset.cursor ?? "";
    };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.current!.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.current!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);
  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ring} className="cursor-ring">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg className={`arrow ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

export const Plus = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="plus">
    <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/** Rolling-text button label: on hover the copy slides up and is replaced by a duplicate. */
export const Roll = ({ children }: { children: string }) => (
  <span className="roll" data-text={children}>
    <span>{children}</span>
  </span>
);
