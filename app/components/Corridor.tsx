import type { Dict } from "../i18n";

const K = 28;
const px = (lon: number) => (lon - 34) * K;
const py = (lat: number) => (32 - lat) * K;

const hq = { name: "Sohar", lon: 56.71, lat: 24.36 };
const cities = [
  { name: "Muscat", lon: 58.41, lat: 23.59, side: "b" },
  { name: "Dubai", lon: 55.27, lat: 25.2, side: "t" },
  { name: "Abu Dhabi", lon: 54.37, lat: 24.45, side: "b" },
  { name: "Doha", lon: 51.53, lat: 25.29, side: "b" },
  { name: "Manama", lon: 50.58, lat: 26.23, side: "t" },
  { name: "Kuwait City", lon: 47.98, lat: 29.37, side: "t" },
  { name: "Riyadh", lon: 46.72, lat: 24.71, side: "b" },
  { name: "Jeddah", lon: 39.17, lat: 21.49, side: "b" },
  { name: "Salalah", lon: 54.09, lat: 17.02, side: "l" },
];

const route = (c: (typeof cities)[number]) => {
  const x1 = px(hq.lon), y1 = py(hq.lat), x2 = px(c.lon), y2 = py(c.lat);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const bend = 0.18;
  return `M${x1},${y1} Q${mx - dy * bend},${my + dx * bend} ${x2},${y2}`;
};

export default function Corridor({ t }: { t: Dict }) {
  const stats = t.corridor.stats;
  return (
    <section id="corridor" className="corridor" data-progress="pin" aria-labelledby="corridor-title">
      <div className="corridor-pin">
        <header className="corridor-head">
          <span className="mono">{t.corridor.label}</span>
          <h2 id="corridor-title" className="display">
            {t.corridor.l1}
            <br />
            <em>{t.corridor.em}</em>
            {t.corridor.rest}
          </h2>
        </header>

        <figure className="map" aria-label={t.corridor.mapAria}>
          <svg viewBox="0 0 800 476" role="img" aria-hidden="true">
            <defs>
              <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="1.2" className="dot" />
              </pattern>
              <radialGradient id="hq-glow">
                <stop offset="0" stopColor="var(--violet)" stopOpacity=".55" />
                <stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="476" fill="url(#dots)" />
            {[36, 40, 44, 48, 52, 56].map((lon) => (
              <g key={lon} className="grat">
                <line x1={px(lon)} x2={px(lon)} y1="0" y2="476" />
                <text x={px(lon) + 4} y="468">{lon}°E</text>
              </g>
            ))}
            {[18, 22, 26, 30].map((lat) => (
              <g key={lat} className="grat">
                <line y1={py(lat)} y2={py(lat)} x1="0" x2="800" />
                <text y={py(lat) - 4} x="4">{lat}°N</text>
              </g>
            ))}
            {cities.map((c, i) => (
              <path key={c.name} className="route" d={route(c)} pathLength={1} style={{ ["--i" as string]: i }} />
            ))}
            {cities.map((c, i) => {
              const x = px(c.lon), y = py(c.lat);
              const tx = c.side === "l" ? -10 : c.side === "r" ? 10 : 0;
              const ty = c.side === "t" ? -12 : c.side === "b" ? 20 : 4;
              return (
                <g key={c.name} className="city" style={{ ["--i" as string]: i }}>
                  <circle cx={x} cy={y} r="3.5" />
                  <text x={x + tx} y={y + ty} textAnchor={c.side === "l" ? "end" : c.side === "r" ? "start" : "middle"}>
                    {t.corridor.cities[i]}
                  </text>
                </g>
              );
            })}
            <circle cx={px(hq.lon)} cy={py(hq.lat)} r="46" fill="url(#hq-glow)" className="hq-glow" />
            <circle cx={px(hq.lon)} cy={py(hq.lat)} r="7" className="hq" />
            <text x={px(hq.lon) + 12} y={py(hq.lat) + 22} className="hq-label">
              {t.corridor.hq}
            </text>
          </svg>
        </figure>

        <dl className="stats">
          {stats.map((s, i) => (
            <div key={s.unit} className="stat" style={{ ["--i" as string]: i }}>
              <dt className="mono">{s.label}</dt>
              <dd>
                <span className="display">{s.value}</span>
                <span className="mono">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="corridor-meter" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
