"use client";

import { useEffect, useRef, useState } from "react";
import { type Dict, serviceCodes, serviceScenes as sceneKeys } from "../i18n";
import { useExperience } from "./Experience";
import { ParallaxBox, serviceScenes } from "./Scenes";
import { Words } from "./ui";

export default function Services({ t }: { t: Dict }) {
  const services = t.services.items.map((s, i) => ({ ...s, code: serviceCodes[i], scene: sceneKeys[i] }));
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLElement | null)[]>([]);
  const { play } = useExperience();
  const last = useRef(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (last.current !== active) play("tick");
    last.current = active;
  }, [active, play]);

  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <header className="services-head">
        <span className="mono">{t.services.label}</span>
        <h2 id="services-title" className="display" data-reveal>
          <Words text={t.services.title1} />
          <br />
          <Words text={t.services.title2} base={200} />
        </h2>
        <p data-reveal>{t.services.lede}</p>
      </header>

      <div className="services-body">
        <div className="stage" aria-hidden="true" data-progress>
          <ParallaxBox className="stage-frame">
            {services.map((s, i) => {
              const Scene = serviceScenes[s.scene];
              return (
                <div key={s.code} className={`stage-img ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""}`}>
                  <Scene />
                </div>
              );
            })}
            <div className="stage-hud mono">
              <span>
                {services[active].code} / 0{services.length}
              </span>
              <span>{services[active].kicker}</span>
            </div>
          </ParallaxBox>
          <div className="stage-count display">
            <span style={{ transform: `translateY(${(-active * 100) / services.length}%)` }}>
              {services.map((s) => (
                <b key={s.code}>{s.code}</b>
              ))}
            </span>
          </div>
        </div>

        <ol className="svc-list">
          {services.map((s, i) => (
            <li
              key={s.code}
              ref={(el) => {
                rows.current[i] = el;
              }}
              data-index={i}
              className={`svc ${i === active ? "is-active" : ""}`}
              onPointerEnter={() => setActive(i)}
            >
              <div className="svc-img" data-reveal data-progress aria-hidden="true">
                <SvcScene k={s.scene} />
              </div>
              <div className="svc-top">
                <span className="mono">{s.code}</span>
                <span className="mono svc-kicker">{s.kicker}</span>
              </div>
              <h3 className="display">{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true" className="tick" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SvcScene({ k }: { k: keyof typeof serviceScenes }) {
  const Scene = serviceScenes[k];
  return <Scene />;
}
