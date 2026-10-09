"use client";

import { useEffect, useId, useRef } from "react";

/* ─────────────── Parallax plumbing ─────────────── */

/** Wraps a scene and feeds it lerped pointer coordinates (--mx / --my in [-1, 1]). */
export function ParallaxBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      raf ||= requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <div ref={ref} className={`pbox ${className}`}>
      {children}
    </div>
  );
}

/** One depth plane. All planes share a 400×500 canvas and crop to fill their frame. */
const L = ({ z, children, className = "" }: { z: number; children: React.ReactNode; className?: string }) => (
  <svg className={`px ${className}`} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ ["--z" as string]: z }} aria-hidden="true">
    {children}
  </svg>
);

const f = (n: number) => n.toFixed(1);

/* ─────────────── Warehouse ─────────────── */

const VX = 200, VY = 236;
const at = (s: number, side: -1 | 1, frac: number) => {
  // frac 0 = floor, 1 = top of rack
  const x = VX + side * 190 * s;
  const y = VY + 236 * s - frac * 410 * s;
  return [x, y] as const;
};

function rackSide(side: -1 | 1) {
  const depths = [1, 0.74, 0.55, 0.41, 0.31, 0.235, 0.18, 0.14];
  const levels = [0, 0.28, 0.54, 0.8];
  const out: React.ReactNode[] = [];
  for (let i = 0; i < depths.length - 1; i++) {
    const a = depths[i], b = depths[i + 1];
    levels.slice(0, -1).forEach((lv, j) => {
      // boxes on this bay/level
      const h = 0.17;
      const [x1, y1] = at(a, side, lv);
      const [x2, y2] = at(b, side, lv);
      const [x3, y3] = at(b, side, lv + h);
      const [x4, y4] = at(a, side, lv + h);
      const shade = (i + j) % 3;
      out.push(
        <path
          key={`b${i}-${j}`}
          d={`M${f(x1)},${f(y1)} L${f(x2)},${f(y2)} L${f(x3)},${f(y3)} L${f(x4)},${f(y4)} Z`}
          className={`wh-box s${shade}`}
        />,
      );
    });
    levels.forEach((lv, j) => {
      const [x1, y1] = at(a, side, lv);
      const [x2, y2] = at(b, side, lv);
      out.push(<path key={`s${i}-${j}`} d={`M${f(x1)},${f(y1)} L${f(x2)},${f(y2)}`} className="wh-beam" />);
    });
  }
  depths.forEach((d, i) => {
    const [x1, y1] = at(d, side, 0);
    const [, y2] = at(d, side, 0.86);
    out.push(<path key={`u${i}`} d={`M${f(x1)},${f(y1)} V${f(y2)}`} className="wh-upright" style={{ strokeWidth: 1 + d * 5 }} />);
  });
  return out;
}

export function WarehouseScene() {
  const u = useId().replace(/:/g, "");
  return (
    <div className="scn scn-warehouse">
      <L z={0.15}>
        <defs>
          <linearGradient id={`wh-wall-${u}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b1534" />
            <stop offset=".55" stopColor="#3b2b74" />
            <stop offset="1" stopColor="#6b4c9a" />
          </linearGradient>
          <radialGradient id={`wh-door-${u}`} cx=".5" cy=".6" r=".5">
            <stop offset="0" stopColor="#ffe2c4" />
            <stop offset="1" stopColor="#f2a888" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#wh-wall-${u})`} />
        <rect x="180" y="196" width="40" height="40" fill="#f9d8b8" />
        <circle cx="200" cy="222" r="60" fill={`url(#wh-door-${u})`} opacity=".7" />
        {[0.9, 0.62, 0.43, 0.3, 0.21].map((s, i) => (
          <g key={i} className="wh-lamp" style={{ animationDelay: `${i * 0.4}s` }}>
            <ellipse cx={VX} cy={f(VY - 190 * s)} rx={f(26 * s)} ry={f(4 * s)} />
            <path d={`M${f(VX - 22 * s)},${f(VY - 188 * s)} L${f(VX - 80 * s)},${f(VY + 120 * s)} L${f(VX + 80 * s)},${f(VY + 120 * s)} L${f(VX + 22 * s)},${f(VY - 188 * s)} Z`} className="wh-shaft" />
          </g>
        ))}
      </L>
      <L z={0.4}>
        <path d={`M0,500 L${VX - 30},${VY + 30} L${VX + 30},${VY + 30} L400,500 Z`} className="wh-floor" />
        {[-150, -60, 60, 150].map((dx) => (
          <path key={dx} d={`M${VX + dx * 2.2},500 L${VX + dx * 0.1},${VY + 30}`} className="wh-lane" />
        ))}
      </L>
      <L z={0.7}>{rackSide(-1)}</L>
      <L z={0.7}>{rackSide(1)}</L>
      <L z={1.1}>
        <g className="wh-fork">
          <rect x="166" y="352" width="40" height="34" rx="3" className="wh-crate" />
          <path d="M166 362 H206 M186 352 V386" className="wh-crate-line" />
          <path d="M208 330 V392 M214 330 V392" className="wh-mast" />
          <path d="M160 388 H214" className="wh-tines" />
          <path d="M214 352 H244 L256 372 V396 H214 Z" className="wh-body" />
          <path d="M222 322 H248 L254 352 H222 Z" className="wh-cage" />
          <circle cx="226" cy="398" r="8" className="wh-wheel" />
          <circle cx="250" cy="398" r="7" className="wh-wheel" />
          <rect x="230" y="316" width="8" height="5" rx="2" className="wh-beacon" />
        </g>
        <ellipse cx="210" cy="408" rx="58" ry="5" className="wh-shadow" />
      </L>
    </div>
  );
}

/* ─────────────── 01 Blueprint ─────────────── */

export function BlueprintScene() {
  const u = useId().replace(/:/g, "");
  return (
    <div className="scn scn-blueprint">
      <L z={0.15}>
        <defs>
          <pattern id={`bp-grid-${u}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" className="bp-grid" />
          </pattern>
          <pattern id={`bp-grid-l-${u}`} width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M100 0H0V100" className="bp-grid-l" />
          </pattern>
        </defs>
        <rect width="400" height="500" className="bp-bg" />
        <rect width="400" height="500" fill={`url(#bp-grid-${u})`} />
        <rect width="400" height="500" fill={`url(#bp-grid-l-${u})`} />
      </L>
      <L z={0.45}>
        {/* route plan */}
        <path d="M40 120 C 110 60, 160 180, 230 130 S 340 70, 362 150" className="bp-route" pathLength={1} />
        <circle cx="40" cy="120" r="6" className="bp-node" />
        <circle cx="362" cy="150" r="6" className="bp-node" />
        <text x="40" y="104" className="bp-label">A · ORIGIN</text>
        <text x="362" y="176" textAnchor="end" className="bp-label">B · SITE</text>
        <path d="M150 154 l10 -10 M150 144 l10 10" className="bp-x" />
        <text x="164" y="168" className="bp-label dim">LOW BRIDGE — REROUTE</text>
      </L>
      <L z={0.8}>
        {/* elevation drawing of the rig */}
        <g className="bp-draw">
          <rect x="70" y="268" width="190" height="64" rx="8" />
          <path d="M40 352 H300 L312 340 H340 V356 H40 Z" />
          <path d="M300 356 V306 Q300 292 314 292 H340 L360 318 V356" />
          {[64, 92, 120, 250, 280, 318, 350].map((x) => (
            <circle key={x} cx={x} cy="364" r="10" />
          ))}
          {[100, 130, 160, 190, 220].map((x) => (
            <path key={x} d={`M${x} 272 V328`} className="thin" />
          ))}
        </g>
        <g className="bp-dim">
          <path d="M40 396 H360 M40 388 V404 M360 388 V404" />
          <path d="M386 240 V374 M378 240 H394 M378 374 H394" />
          <text x="200" y="414" textAnchor="middle" className="bp-label">LENGTH</text>
          <text x="380" y="310" className="bp-label" transform="rotate(-90 380 310)" textAnchor="middle">
            HEIGHT
          </text>
        </g>
      </L>
      <L z={1.2}>
        <g className="bp-compass">
          <path d="M300 40 L270 150 M300 40 L332 146" className="bp-leg" />
          <circle cx="300" cy="40" r="7" className="bp-pivot" />
          <path d="M300 22 V33" className="bp-leg" />
        </g>
        <path d="M18 470 H130" className="bp-scale" />
        <text x="18" y="462" className="bp-label">SCALE 1:100</text>
      </L>
    </div>
  );
}

/* ─────────────── 02 Safe delivery ─────────────── */

export function CraneScene() {
  const u = useId().replace(/:/g, "");
  return (
    <div className="scn scn-crane">
      <L z={0.12}>
        <defs>
          <linearGradient id={`cr-sky-${u}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#120f1d" />
            <stop offset=".7" stopColor="#2b2150" />
            <stop offset="1" stopColor="#4c3684" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#cr-sky-${u})`} />
        <circle cx="300" cy="150" r="120" className="cr-glow" />
      </L>
      <L z={0.35}>
        {/* gantry silhouette */}
        <path d="M40 500 V90 H360 V500 M60 500 V110 H340 V500" className="cr-gantry" />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${60 + i * 22} 90 L${82 + i * 22} 110`} className="cr-truss" />
        ))}
        <rect x="170" y="80" width="60" height="22" rx="3" className="cr-trolley" />
      </L>
      <L z={0.75}>
        <g className="cr-swing">
          <path d="M193 102 V236 M207 102 V236" className="cr-cable" />
          <path d="M188 236 h24 v14 h-24 Z" className="cr-block" />
          <path d="M200 250 v12 a10 10 0 1 1 -10 10" className="cr-hook" />
          <path d="M200 268 L130 318 M200 268 L270 318" className="cr-sling" />
          <g className="cr-crate">
            <rect x="120" y="318" width="160" height="108" rx="4" />
            <path d="M120 344 H280 M120 400 H280 M146 318 V426 M254 318 V426" className="cr-slat" />
            <path d="M120 318 L280 426 M280 318 L120 426" className="cr-slat faint" />
            <rect x="176" y="350" width="48" height="36" rx="3" className="cr-label" />
            <path d="M188 362 l12 -6 l12 6 v8 q0 10 -12 14 q-12 -4 -12 -14 Z" className="cr-shield" />
          </g>
          <path d="M150 318 V426 M250 318 V426" className="cr-strap" />
        </g>
      </L>
      <L z={1.15}>
        <rect x="0" y="456" width="400" height="44" className="cr-ground" />
        <path d="M110 456 h180 l-10 -12 h-160 Z" className="cr-pad" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${i * 36} 500 l24 -26 h14 l-24 26 Z`} className="cr-hazard" />
        ))}
      </L>
    </div>
  );
}

/* ─────────────── 03 Global network ─────────────── */

export function GlobeScene() {
  const arcs = [
    "M262 236 Q 220 120 130 170",
    "M262 236 Q 320 140 330 200",
    "M262 236 Q 200 260 120 300",
    "M262 236 Q 300 300 300 340",
    "M262 236 Q 240 330 190 360",
  ];
  return (
    <div className="scn scn-globe">
      <L z={0.12}>
        <rect width="400" height="500" className="gl-bg" />
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 500} r={i % 5 === 0 ? 1.4 : 0.8} className="gl-star" style={{ animationDelay: `${(i % 7) * 0.5}s` }} />
        ))}
      </L>
      <L z={0.4}>
        <circle cx="210" cy="250" r="150" className="gl-halo" />
        <circle cx="210" cy="250" r="128" className="gl-sphere" />
        {[-90, -60, -30, 0, 30, 60, 90].map((lat) => {
          const y = 250 + 128 * Math.sin((lat * Math.PI) / 180);
          const rx = 128 * Math.cos((lat * Math.PI) / 180);
          return <ellipse key={lat} cx="210" cy={f(y)} rx={f(rx)} ry={f(rx * 0.16)} className="gl-lat" />;
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse key={i} cx="210" cy="250" ry="128" rx="128" className="gl-mer">
            <animate attributeName="rx" values="128;0;128" dur="12s" begin={`${-i * 2}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </L>
      <L z={0.75}>
        {arcs.map((d, i) => (
          <path key={i} d={d} className="gl-arc" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
        {[
          [130, 170],
          [330, 200],
          [120, 300],
          [300, 340],
          [190, 360],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" className="gl-node" />
        ))}
        <circle cx="262" cy="236" r="6" className="gl-hq" />
        <text x="272" y="230" className="gl-label">MUSCAT</text>
      </L>
      <L z={1.15}>
        <ellipse cx="210" cy="250" rx="180" ry="46" className="gl-orbit" transform="rotate(-18 210 250)" />
        <g transform="rotate(-18 210 250)">
          <circle r="4" className="gl-sat">
            <animateMotion dur="9s" repeatCount="indefinite" path="M30,250 a180,46 0 1,0 360,0 a180,46 0 1,0 -360,0" />
          </circle>
        </g>
      </L>
    </div>
  );
}

/* ─────────────── 04 Customs ─────────────── */

export function CustomsScene() {
  return (
    <div className="scn scn-customs">
      <L z={0.15}>
        <rect width="400" height="500" className="cu-bg" />
        {/* border post + barrier */}
        <rect x="24" y="120" width="70" height="120" rx="4" className="cu-booth" />
        <rect x="34" y="134" width="50" height="34" rx="2" className="cu-window" />
        <rect x="96" y="214" width="12" height="40" className="cu-post" />
        <g className="cu-arm">
          <rect x="102" y="214" width="230" height="10" rx="5" className="cu-bar" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={124 + i * 44} y="214" width="20" height="10" className="cu-bar-stripe" />
          ))}
        </g>
        <path d="M0 254 H400" className="cu-line" />
      </L>
      <L z={0.5}>
        <g transform="rotate(-8 200 340)">
          <rect x="90" y="250" width="220" height="200" rx="4" className="cu-paper back" />
        </g>
        <g transform="rotate(5 200 340)">
          <rect x="94" y="246" width="220" height="200" rx="4" className="cu-paper mid" />
        </g>
      </L>
      <L z={0.85}>
        <g className="cu-doc">
          <rect x="96" y="240" width="210" height="210" rx="4" className="cu-paper" />
          <text x="116" y="272" className="cu-head">DECLARATION</text>
          {[292, 306, 320, 346, 360, 374, 400, 414].map((y, i) => (
            <rect key={y} x="116" y={y} width={i % 3 === 2 ? 100 : 170} height="5" rx="2" className="cu-text" />
          ))}
          <g className="cu-impression">
            <rect x="168" y="330" width="122" height="46" rx="6" />
            <text x="229" y="360" textAnchor="middle">
              CLEARED
            </text>
          </g>
        </g>
      </L>
      <L z={1.25}>
        <g className="cu-stamp">
          <rect x="200" y="200" width="60" height="16" rx="3" className="cu-stamp-base" />
          <path d="M218 200 V160 H242 V200" className="cu-stamp-neck" />
          <ellipse cx="230" cy="154" rx="22" ry="14" className="cu-stamp-knob" />
        </g>
      </L>
    </div>
  );
}

/* ─────────────── 05 Petroleum ─────────────── */

export function RefineryScene() {
  const u = useId().replace(/:/g, "");
  return (
    <div className="scn scn-refinery">
      <L z={0.1}>
        <defs>
          <linearGradient id={`rf-sky-${u}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1230" />
            <stop offset=".5" stopColor="#5a3672" />
            <stop offset=".78" stopColor="#d9826f" />
            <stop offset="1" stopColor="#f6c08f" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#rf-sky-${u})`} />
        <circle cx="90" cy="300" r="46" className="rf-sun" />
      </L>
      <L z={0.35}>
        {/* towers & flare stack */}
        <path d="M60 360 V250 H74 V360 M100 360 V210 H118 V360 M150 360 V270 H176 V360 M300 360 V180 H310 V360" className="rf-tower" />
        <path d="M60 280 H74 M60 310 H74 M100 240 H118 M100 270 H118 M100 300 H118" className="rf-ring" />
        <g className="rf-flare">
          <path d="M305 180 C 290 160, 300 140, 305 120 C 312 142, 322 158, 305 180 Z" className="rf-flame" />
          <path d="M305 178 C 298 166, 302 154, 305 142 C 309 156, 313 166, 305 178 Z" className="rf-flame-core" />
        </g>
        <g className="rf-smoke">
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="305" cy="110" r="10" style={{ animationDelay: `${i * 1.3}s` }} />
          ))}
        </g>
        <rect x="0" y="358" width="400" height="142" className="rf-plain" />
      </L>
      <L z={0.6}>
        {[
          [196, 46],
          [262, 34],
          [340, 52],
        ].map(([cx, r]) => (
          <g key={cx} className="rf-tank">
            <rect x={cx - r} y={372 - r * 1.1} width={r * 2} height={r * 1.1} />
            <ellipse cx={cx} cy={372 - r * 1.1} rx={r} ry={r * 0.18} className="top" />
            <path d={`M${cx - r} ${372 - r * 0.6} H${cx + r}`} className="band" />
          </g>
        ))}
        <path d="M0 384 H400" className="rf-pipe" />
        <path d="M0 392 H400" className="rf-pipe thin" />
      </L>
      <L z={1.05}>
        <g className="rf-truck">
          <rect x="40" y="398" width="220" height="56" rx="28" className="rf-barrel" />
          <path d="M60 404 H240" className="rf-barrel-hi" />
          <rect x="140" y="390" width="22" height="10" rx="2" className="rf-hatch" />
          <path d="M260 452 V414 Q260 400 274 400 H310 L336 428 Q346 430 346 442 V452 Z" className="rf-cab" />
          <path d="M282 408 H306 L322 428 H282 Z" className="rf-glass" />
          <path d="M260 440 H346" className="rf-stripe" />
          {[74, 110, 220, 296, 330].map((x) => (
            <g key={x} transform={`translate(${x} 456)`}>
              <circle r="12" className="rf-tyre" />
              <circle r="5" className="rf-rim" />
            </g>
          ))}
          <text x="150" y="434" textAnchor="middle" className="rf-label">
            FLAMMABLE · 1203
          </text>
        </g>
        <rect x="0" y="468" width="400" height="32" className="rf-road" />
      </L>
    </div>
  );
}

export const serviceScenes = {
  blueprint: BlueprintScene,
  crane: CraneScene,
  globe: GlobeScene,
  customs: CustomsScene,
  refinery: RefineryScene,
} as const;
export type SceneKey = keyof typeof serviceScenes;
