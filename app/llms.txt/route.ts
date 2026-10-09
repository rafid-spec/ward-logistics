import { getDict } from "../i18n";
import { site } from "../site";

export const dynamic = "force-static";

// Plain-text brief for LLM crawlers and answer engines (llmstxt.org format).
export function GET() {
  const t = getDict("en");
  const ar = getDict("ar");
  const c = t.contacts;
  const body = [
    `# ${t.legalName} (${ar.legalName})`,
    "",
    `> ${t.meta.description}`,
    "",
    `Website (English): ${site.url}/`,
    `Website (Arabic / العربية): ${site.url}/ar/`,
    `Headquarters: ${c.address.join(", ")}. ${c.registry}.`,
    `Service area: ${site.areaServed.join(", ")} (the GCC).`,
    "",
    "## Services",
    ...t.services.items.map((s) => `- **${s.title}** — ${s.body} Includes: ${s.points.join("; ")}.`),
    "",
    "## The Ward Logistics standard vs. the industry average",
    ...t.ledger.rows.map((r) => `- ${r.feature}: ${r.ours} (industry: ${r.theirs.toLowerCase()}).`),
    "",
    "## Frequently asked questions",
    ...t.faq.items.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Contact",
    ...c.people.map((p) => `- ${p.name}, ${p.role}: ${p.phone}${p.email ? `, ${p.email}` : ""}`),
    ...c.emails.map((e) => `- Email: ${e}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
