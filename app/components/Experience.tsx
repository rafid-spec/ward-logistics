"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type Sound = "tick" | "open" | "close" | "success";

type Ctx = {
  lenis: React.RefObject<Lenis | null>;
  scrollTo: (target: string | number) => void;
  contactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  play: (s: Sound) => void;
};

const ExperienceContext = createContext<Ctx | null>(null);

export const useExperience = () => {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience outside provider");
  return ctx;
};

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Tiny synthesized sound kit — no assets, nothing plays until the user opts in. */
function createSynth() {
  let ctx: AudioContext | null = null;
  const ac = () => (ctx ??= new AudioContext());
  const blip = (freq: number, end: number, dur: number, gain: number, type: OscillatorType = "sine", at = 0) => {
    const a = ac();
    const t = a.currentTime + at;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(end, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  };
  const air = (dur: number, from: number, to: number, gain: number) => {
    const a = ac();
    const t = a.currentTime;
    const buf = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource();
    src.buffer = buf;
    const f = a.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.4;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(a.destination);
    src.start(t);
  };
  return {
    resume: () => ac().resume(),
    play(s: Sound) {
      if (s === "tick") blip(1900, 1200, 0.045, 0.035, "triangle");
      if (s === "open") air(0.42, 500, 2600, 0.05);
      if (s === "close") air(0.32, 2200, 420, 0.04);
      if (s === "success") {
        blip(880, 880, 0.18, 0.05);
        blip(1320, 1320, 0.26, 0.04, "sine", 0.07);
      }
    },
  };
}

export default function Experience({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const synth = useRef<ReturnType<typeof createSynth> | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  // Smooth scroll + scroll-linked CSS variables
  useEffect(() => {
    const rm = reducedMotion();
    const l = new Lenis({ duration: 1.15, smoothWheel: !rm, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.current = l;
    const root = document.documentElement;

    // Elements that expose scroll progress as --p (0 → 1 while crossing the viewport)
    const tracked = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => (e.isIntersecting ? tracked.add(e.target as HTMLElement) : tracked.delete(e.target as HTMLElement))),
      { rootMargin: "20% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => io.observe(el));

    let raf = 0;
    const frame = (time: number) => {
      l.raf(time);
      const vh = window.innerHeight;
      root.style.setProperty("--scroll", String(l.progress || 0));
      tracked.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mode = el.dataset.progress;
        // "pin": 0 when top hits top, 1 when bottom hits bottom. default: enter-bottom → leave-top
        const p = mode === "pin" ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height);
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Reveal-on-enter
    const reveal = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      reveal.disconnect();
      l.destroy();
    };
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem("aw-sound") === "1") setSoundOn(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (contactOpen) lenis.current?.stop();
    else lenis.current?.start();
  }, [contactOpen]);

  const play = useCallback(
    (s: Sound) => {
      if (!soundOn) return;
      synth.current ??= createSynth();
      synth.current.play(s);
    },
    [soundOn],
  );

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      try {
        localStorage.setItem("aw-sound", next ? "1" : "0");
      } catch {}
      if (next) {
        synth.current ??= createSynth();
        synth.current.resume();
        synth.current.play("success");
      }
      return next;
    });
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const rm = reducedMotion();
    if (lenis.current) lenis.current.scrollTo(target as string, { duration: rm ? 0 : 1.6, offset: 0 });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lenis,
      scrollTo,
      contactOpen,
      openContact: () => {
        setContactOpen(true);
        play("open");
      },
      closeContact: () => {
        setContactOpen(false);
        play("close");
      },
      soundOn,
      toggleSound,
      play,
    }),
    [contactOpen, soundOn, play, scrollTo, toggleSound],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
