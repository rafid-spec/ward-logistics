import type { Dict } from "../i18n";
import { ParallaxBox, WarehouseScene } from "./Scenes";
import { Words } from "./ui";

export function Band({ t }: { t: Dict }) {
  const band = t.about.band;
  const row = (
    <span className="band-row">
      {band.map((b) => (
        <span key={b}>
          {b}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </span>
  );
  return (
    <div className="band" aria-hidden="true">
      <div className="band-track">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function About({ t }: { t: Dict }) {
  const words = t.about.statement.split(" ");
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <header className="section-head">
        <span className="mono">{t.about.label}</span>
        <h2 id="about-title" className="sr-only">
          {t.about.srTitle}
        </h2>
      </header>

      <div className="about-statement" data-progress>
        <p className="statement" style={{ ["--n" as string]: words.length }}>
          {words.map((w, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="about-grid">
        <figure className="about-figure" data-progress>
          <div className="about-mask reveal-mask" data-reveal role="img" aria-label={t.about.figAria}>
            <ParallaxBox>
              <WarehouseScene />
            </ParallaxBox>
          </div>
          <div className="stamp" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="stamp-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
              </defs>
              <text textAnchor="middle">
                <textPath href="#stamp-circle" startOffset="50%">
                  {t.about.stamp}
                </textPath>
              </text>
            </svg>
            <span className="display">100%</span>
          </div>
          <figcaption className="mono">{t.about.caption}</figcaption>
        </figure>

        <div className="about-pillars">
          <article className="pillar" data-reveal>
            <span className="mono pillar-no">A.</span>
            <h3 className="display">
              <Words text={t.about.mission.title} />
            </h3>
            <p>
              {t.about.mission.body}
            </p>
          </article>
          <article className="pillar" data-reveal>
            <span className="mono pillar-no">B.</span>
            <h3 className="display">
              <Words text={t.about.vision.title} />
            </h3>
            <p>
              {t.about.vision.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
