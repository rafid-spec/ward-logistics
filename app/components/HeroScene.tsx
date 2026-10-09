"use client";

import { useEffect, useId, useRef } from "react";

/* Seamless ridge: integer-frequency sines repeat exactly every W, so two tiles loop without a seam. */
const W = 1600;
function ridge(h: number, base: number, amp: number, harmonics: [number, number, number][], sharp = 0) {
  const pts: string[] = [];
  const n = 160;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * W;
    let v = 0;
    for (const [k, a, ph] of harmonics) v += a * Math.sin((2 * Math.PI * k * x) / W + ph);
    if (sharp) v = v * (1 - sharp) + sharp * (1 - Math.abs(Math.sin((Math.PI * 7 * x) / W + 0.6))) * 1.4;
    pts.push(`${x.toFixed(1)},${(base - v * amp).toFixed(1)}`);
  }
  return `M0,${h} L${pts.join(" L")} L${W},${h} Z`;
}

const far = ridge(300, 170, 70, [[2, 0.6, 0.3], [3, 0.5, 1.9], [5, 0.35, 0.7], [9, 0.18, 2.4], [14, 0.08, 1.1]], 0.35);
const near = ridge(300, 190, 55, [[1, 0.5, 2.2], [4, 0.55, 0.4], [7, 0.3, 1.5], [11, 0.15, 0.2]], 0.25);
const dunes = ridge(200, 110, 38, [[2, 0.7, 0.9], [3, 0.4, 2.6], [6, 0.18, 0.1]]);
const fg = ridge(400, 90, 34, [[1, 0.6, 1.2], [3, 0.5, 0.2], [5, 0.2, 2.0]]);

// Shrubs sitting on the foreground ridge
const shrubs = [140, 420, 610, 980, 1270, 1480].map((x, i) => {
  let v = 0;
  for (const [k, a, ph] of [[1, 0.6, 1.2], [3, 0.5, 0.2], [5, 0.2, 2.0]] as const) v += a * Math.sin((2 * Math.PI * k * x) / W + ph);
  const y = 90 - v * 34;
  const s = 0.7 + (i % 3) * 0.35;
  return `M${x},${y} q${-4 * s},${-14 * s} ${-12 * s},${-18 * s} M${x},${y} q${1 * s},${-18 * s} ${3 * s},${-26 * s} M${x},${y} q${6 * s},${-10 * s} ${14 * s},${-15 * s} M${x},${y} q${-1 * s},${-8 * s} ${-18 * s},${-8 * s}`;
}).join(" ");

const stars = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
  return { x: `${(r(1) * 100).toFixed(2)}%`, y: `${(r(2) * 30).toFixed(2)}%`, s: r(3) > 0.85 ? "2px" : "1px", d: `${(r(4) * 4).toFixed(2)}s` };
});

function Tile({ d, className, h }: { d: string; className: string; h: number }) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Loop({ children, speed }: { children: React.ReactNode; speed: number }) {
  return (
    <div className="loop" style={{ ["--speed" as string]: `${speed}s` }}>
      {children}
      {children}
    </div>
  );
}

const Wheel = ({ x }: { x: number }) => (
  <g transform={`translate(${x} 186)`}>
    <circle r="19" className="tr-tyre" />
    <g className="tr-spin">
      <circle r="10" className="tr-rim" />
      <path d="M0-10V10M-10 0H10M-7-7L7 7M-7 7L7-7" className="tr-spoke" />
    </g>
    <circle r="3" className="tr-hub" />
  </g>
);

function Truck() {
  const u = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 780 210" className="truck-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`tr-cargo-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6efe4" />
          <stop offset=".45" stopColor="#d9cfc0" />
          <stop offset="1" stopColor="#8f8597" />
        </linearGradient>
        <linearGradient id={`tr-cab-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3eee6" />
          <stop offset="1" stopColor="#bdb3c4" />
        </linearGradient>
        <linearGradient id={`tr-livery-${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5536e0" />
          <stop offset="1" stopColor="#b35cff" />
        </linearGradient>
        <linearGradient id={`tr-beam-${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe9c9" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffe9c9" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* headlight beam + ground shadow */}
      <path d="M752 158 L780 140 L780 196 Z" fill={`url(#tr-beam-${u})`} className="tr-beam" />
      <ellipse cx="390" cy="206" rx="370" ry="6" className="tr-shadow" />

      {/* lowboy trailer */}
      <path d="M40 172 H560 L582 150 H640 V176 H40 Z" className="tr-deck" />
      <rect x="40" y="168" width="520" height="4" className="tr-deck-edge" />

      {/* oversized cargo: transformer on cradles */}
      <rect x="150" y="150" width="34" height="20" className="tr-cradle" />
      <rect x="410" y="150" width="34" height="20" className="tr-cradle" />
      <rect x="118" y="44" width="360" height="110" rx="14" fill={`url(#tr-cargo-${u})`} />
      {[150, 190, 230, 270, 310, 350, 390, 430].map((x) => (
        <rect key={x} x={x} y="50" width="6" height="98" className="tr-rib" />
      ))}
      <rect x="140" y="26" width="72" height="22" rx="4" className="tr-cap" />
      <rect x="380" y="20" width="56" height="28" rx="4" className="tr-cap" />
      {[156, 172, 188].map((x) => (
        <rect key={x} x={x} y="10" width="8" height="18" rx="3" className="tr-bushing" />
      ))}
      <path d="M200 44 L176 172 M396 44 L424 172" className="tr-strap" />
      <path d="M118 44 l-14 -8 l0 18 Z M478 44 l14 -8 l0 18 Z" className="tr-flag" />
      <rect x="250" y="88" width="96" height="24" rx="3" className="tr-plate" />
      <text x="298" y="105" textAnchor="middle" className="tr-plate-t">
        WARD
      </text>

      {/* tractor unit */}
      <path d="M612 176 V92 Q612 64 640 64 H700 L740 112 Q756 116 756 134 V176 Z" fill={`url(#tr-cab-${u})`} />
      <path d="M612 140 H756 V156 H612 Z" fill={`url(#tr-livery-${u})`} />
      <path d="M652 76 H698 L726 112 H652 Z" className="tr-glass" />
      <path d="M660 80 L676 80 L664 108 L656 108 Z" className="tr-glint" />
      <rect x="600" y="70" width="6" height="74" rx="2" className="tr-stack" />
      <rect x="646" y="56" width="14" height="8" rx="2" className="tr-beacon" />
      <rect x="742" y="122" width="14" height="8" rx="2" className="tr-head" />
      <rect x="690" y="160" width="58" height="12" rx="2" className="tr-banner" />
      <text x="719" y="169" textAnchor="middle" className="tr-banner-t">
        OVERSIZE
      </text>

      {[78, 118, 158, 438, 478, 642, 718].map((x) => (
        <Wheel key={x} x={x} />
      ))}
    </svg>
  );
}

export default function HeroScene({ night = false }: { night?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  // Pointer parallax: lerped --mx / --my in [-1, 1]
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      raf ||= requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div ref={ref} className={`scene ${night ? "is-night" : ""}`} aria-hidden="true">
      <div className="layer sky" style={{ ["--z" as string]: 0.05, ["--sy" as string]: "34vh" }}>
        {stars.map((s, i) => (
          <i key={i} style={{ left: s.x, top: s.y, width: s.s, height: s.s, animationDelay: s.d }} />
        ))}
      </div>
      <div className="layer sun-wrap" style={{ ["--z" as string]: 0.12, ["--sy" as string]: "30vh" }}>
        <div className="sun" />
      </div>
      <div className="layer l-far" style={{ ["--z" as string]: 0.22, ["--sy" as string]: "24vh" }}>
        <Loop speed={260}>
          <Tile d={far} h={300} className="r-far" />
        </Loop>
      </div>
      <div className="layer l-haze" style={{ ["--z" as string]: 0.3, ["--sy" as string]: "20vh" }} />
      <div className="layer l-near" style={{ ["--z" as string]: 0.38, ["--sy" as string]: "17vh" }}>
        <Loop speed={150}>
          <Tile d={near} h={300} className="r-near" />
        </Loop>
      </div>
      <div className="layer l-dunes" style={{ ["--z" as string]: 0.55, ["--sy" as string]: "11vh" }}>
        <Loop speed={60}>
          <Tile d={dunes} h={200} className="r-dunes" />
        </Loop>
      </div>
      <div className="layer l-road" style={{ ["--z" as string]: 0.75, ["--sy" as string]: "5vh" }}>
        <div className="road">
          <div className="road-dash" />
        </div>
        <div className="truck">
          <div className="dust">
            {Array.from({ length: 7 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.32}s` }} />
            ))}
          </div>
          <Truck />
        </div>
      </div>
      <div className="layer l-fg" style={{ ["--z" as string]: 1.25, ["--sy" as string]: "0vh" }}>
        <Loop speed={26}>
          <svg viewBox={`0 0 ${W} 400`} preserveAspectRatio="none" className="r-fg">
            <path d={fg} />
            <path d={shrubs} className="shrub" />
          </svg>
        </Loop>
      </div>
    </div>
  );
}
