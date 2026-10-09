"use client";

import type { Dict } from "../i18n";
import { useExperience } from "./Experience";
import HeroScene from "./HeroScene";
import { Arrow, Magnetic, Roll } from "./ui";

export default function Hero({ t }: { t: Dict }) {
  const { openContact, scrollTo, play } = useExperience();
  return (
    <section id="home" className="hero" data-progress aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <HeroScene />
        <div className="hero-shade" />
      </div>

      <div className="hero-meta mono hero-in" style={{ ["--d" as string]: "700ms" }}>
        <span>{t.hero.meta1}</span>
        <span>{t.hero.meta2}</span>
      </div>

      <h1 id="hero-title" className="hero-title display">
        <span className="line">
          <span className="hero-in" style={{ ["--d" as string]: "120ms" }}>{t.hero.l1}</span>
        </span>
        <span className="line">
          <span className="hero-in" style={{ ["--d" as string]: "240ms" }}>
            <em>{t.hero.em}</em>
            {t.hero.rest}
          </span>
        </span>
        <span className="line line-sub">
          <span className="hero-in" style={{ ["--d" as string]: "420ms" }}>{t.hero.sub}</span>
        </span>
      </h1>

      <div className="hero-foot">
        <p className="hero-lede hero-in" style={{ ["--d" as string]: "620ms" }}>
          {t.hero.lede}
        </p>
        <div className="hero-actions hero-in" style={{ ["--d" as string]: "760ms" }}>
          <Magnetic>
            <button className="btn btn-lg" onClick={openContact} data-cursor={t.hero.cursor}>
              <Roll>{t.hero.cta}</Roll>
              <Arrow />
            </button>
          </Magnetic>
          <a
            href="#about"
            className="scroll-cue"
            onClick={(e) => {
              e.preventDefault();
              play("tick");
              scrollTo("#about");
            }}
          >
            <span className="scroll-cue-line" aria-hidden="true" />
            <span className="mono">{t.hero.scroll}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
