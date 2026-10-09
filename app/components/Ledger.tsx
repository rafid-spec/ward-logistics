import type { Dict } from "../i18n";
import { Words } from "./ui";

export default function Ledger({ t }: { t: Dict }) {
  const l = t.ledger;
  return (
    <section id="trust" className="ledger" aria-labelledby="trust-title">
      <header className="ledger-head">
        <span className="mono">{l.label}</span>
        <h2 id="trust-title" className="display" data-reveal>
          <Words text={l.title1} />
          <br />
          <Words text={l.title2} base={180} />
        </h2>
        <p data-reveal>{l.lede}</p>
      </header>

      <table className="ledger-table">
        <caption className="sr-only">{l.caption}</caption>
        <thead>
          <tr className="mono">
            {l.cols.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {l.rows.map((r, i) => (
            <tr key={r.feature} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
              <th scope="row" className="mono">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {r.feature}
              </th>
              <td className="ours display">{r.ours}</td>
              <td className="theirs" data-label={l.industry}>
                <span>{r.theirs}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="promise">
        <div className="promise-col" data-reveal>
          <h3 className="mono">{l.refuseTitle}</h3>
          <ul>
            {l.refuse.map((item) => (
              <li key={item} className="is-no">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="promise-col" data-reveal style={{ ["--d" as string]: "120ms" }}>
          <h3 className="mono">{l.signTitle}</h3>
          <ul>
            {l.sign.map((item) => (
              <li key={item} className="is-yes">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
