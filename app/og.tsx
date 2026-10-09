import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDict, type Lang } from "./i18n";

export const ogAlt = "Ward Logistics — ورد للخدمات اللوجستية · Oversized cargo logistics across the GCC";
export const ogSize = { width: 1200, height: 630 };

const copy = {
  en: {
    top: ["WARD LOGISTICS SERVICES", "SOHAR · SULTANATE OF OMAN"],
    l1: "SHIPPING THE",
    l2: "IMPOSSIBLE.",
    sub: "Oversized cargo, project logistics, customs clearance and petroleum transport across the GCC.",
  },
  ar: {
    top: ["ورد للخدمات اللوجستية", "صحار · سلطنة عُمان"],
    l1: "نشحن",
    l2: "المستحيل.",
    sub: "البضائع الضخمة ولوجستيات المشاريع والتخليص الجمركي ونقل المنتجات البترولية في دول الخليج.",
  },
};

/** Satori shapes Arabic glyphs but does not reorder words, so RTL lines are laid out word by word, right to left. */
function Line({ text, rtl, style }: { text: string; rtl: boolean; style?: React.CSSProperties }) {
  if (!rtl) return <div style={{ display: "flex", ...style }}>{text}</div>;
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", columnGap: "0.28em", ...style }}>
      {text.split(" ").map((w, i) => (
        <span key={i}>{w}</span>
      ))}
    </div>
  );
}

// Social share card per language, in the hero's dusk palette. Cairo covers both Arabic and Latin glyphs.
export async function renderOg(lang: Lang) {
  const t = copy[lang];
  const rtl = getDict(lang).dir === "rtl";
  const cairo = await readFile(join(process.cwd(), "app/assets/fonts/Cairo-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        dir={rtl ? "rtl" : "ltr"}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: rtl ? "flex-end" : "flex-start",
          padding: 72,
          color: "#f1ece3",
          background: "linear-gradient(180deg, #0c0b10 0%, #2a1d55 45%, #a8749f 72%, #f6c79c 100%)",
          fontFamily: "Cairo",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: rtl ? 0 : 4,
            opacity: 0.8,
          }}
        >
          <Line text={t.top[0]} rtl={rtl} />
          <Line text={t.top[1]} rtl={rtl} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: rtl ? "flex-end" : "flex-start" }}>
          <div style={{ fontSize: rtl ? 132 : 112, lineHeight: rtl ? 1.15 : 0.95, letterSpacing: rtl ? 0 : -4 }}>{t.l1}</div>
          <div style={{ fontSize: rtl ? 132 : 112, lineHeight: rtl ? 1.15 : 0.95, letterSpacing: rtl ? 0 : -4, color: rtl ? "#2a1d55" : "#f1ece3" }}>
            {t.l2}
          </div>
          <Line text={t.sub} rtl={rtl} style={{ fontSize: 30, marginTop: 24, maxWidth: 940, color: "#16141c", justifyContent: "flex-start", lineHeight: 1.5 }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Cairo", data: cairo, weight: 800, style: "normal" }] },
  );
}
