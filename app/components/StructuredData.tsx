import { type Dict, getDict, pathFor } from "../i18n";
import { site } from "../site";

const orgId = `${site.url}/#organization`;

// Schema.org graph: who we are, what we offer, and the FAQ — server-rendered for search and answer engines.
function buildGraph(t: Dict) {
  const en = getDict("en");
  const contacts = t.contacts;
  const services = t.services.items;
  const faq = t.faq.items;
  const pageUrl = `${site.url}${pathFor(t.lang)}`;
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": orgId,
      name: en.name,
      alternateName: getDict("ar").name,
      legalName: en.legalName,
      url: site.url,
      logo: `${site.url}/logo.png`,
      image: `${site.url}/og-en.png`,
      description: t.meta.description,
      ...(contacts.emails[0] ? { email: contacts.emails[0] } : {}),
      telephone: contacts.people[0].phone.replace(/\s/g, ""),
      identifier: { "@type": "PropertyValue", propertyID: "Commercial Registration", value: "1635804" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sohar",
        addressRegion: "Al Batinah",
        postalCode: "311",
        addressCountry: "OM",
      },
      areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
      knowsAbout: services.map((s) => s.title),
      contactPoint: contacts.people.map((p) => ({
        "@type": "ContactPoint",
        name: p.name,
        contactType: p.role,
        telephone: p.phone.replace(/\s/g, ""),
        ...(p.email ? { email: p.email } : {}),
        areaServed: "GCC",
        availableLanguage: ["English", "Arabic"],
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Logistics services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.body,
            serviceType: s.points.join(", "),
            provider: { "@id": orgId },
            areaServed: "GCC",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: en.name,
      description: en.meta.description,
      inLanguage: ["en", "ar"],
      publisher: { "@id": orgId },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: t.lang,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
  };
}

export default function StructuredData({ t }: { t: Dict }) {
  const graph = buildGraph(t);
  return (
    <script
      type="application/ld+json"
      // JSON is built from static content; escape "<" so it can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
