import type { Metadata, Viewport } from "next";
import { Archivo, Cairo, JetBrains_Mono } from "next/font/google";
import { getDict, type Lang, langs, pathFor } from "./i18n";
import { site } from "./site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** Metadata for a language's home page; absolute URLs so they stay correct under a deploy sub-path. */
export function buildMetadata(lang: Lang): Metadata {
  const t = getDict(lang);
  const other = langs.filter((l) => l !== lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${t.name}` },
    description: t.meta.description,
    applicationName: t.name,
    keywords: t.meta.keywords,
    authors: [{ name: t.legalName, url: site.url }],
    creator: t.legalName,
    publisher: t.legalName,
    category: "Logistics",
    alternates: {
      canonical: `${site.url}${pathFor(lang)}`,
      languages: { en: `${site.url}/`, ar: `${site.url}${pathFor("ar")}`, "x-default": `${site.url}/` },
    },
    openGraph: {
      type: "website",
      url: `${site.url}${pathFor(lang)}`,
      siteName: t.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: t.meta.ogLocale,
      alternateLocale: other.map((l) => getDict(l).meta.ogLocale),
      images: [{ url: `${site.url}/og-${lang}.png`, width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [`${site.url}/og-${lang}.png`] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: true, email: true },
    other: { "geo.region": "OM", "geo.placename": "Sohar" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0c0b10",
};

/** The document shell; each language's root layout renders it with its own lang/dir. */
export function Html({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} dir={getDict(lang).dir} className={`${archivo.variable} ${cairo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
