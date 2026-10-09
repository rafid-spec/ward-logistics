import type { Dict } from "../i18n";
import { Plus, Words } from "./ui";

export default function Faq({ t }: { t: Dict }) {
  const faq = t.faq.items;
  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <header className="faq-head">
        <span className="mono">{t.faq.label}</span>
        <h2 id="faq-title" className="display" data-reveal>
          <Words text={t.faq.title} />
        </h2>
        <p data-reveal>{t.faq.lede}</p>
      </header>

      <div className="faq-list">
        {faq.map((f, i) => (
          <details key={f.q} className="faq-item" data-reveal style={{ ["--d" as string]: `${i * 50}ms` }}>
            <summary>
              <span className="mono faq-no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.q}</h3>
              <span className="faq-icon" aria-hidden="true">
                <Plus />
              </span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
