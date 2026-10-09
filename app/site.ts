// Canonical site facts shared by metadata, structured data, sitemap and llms.txt.
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://salahu01.github.io/ward-logistics").replace(/\/$/, ""),
  name: "Ward Logistics",
  legalName: "Ward Logistics Services",
  title: "Ward Logistics — Oversized Cargo & Project Logistics Across the GCC",
  description:
    "Ward Logistics Services is a Sohar-based logistics company moving oversized machinery, project cargo and petroleum across the GCC, with in-house customs clearance, real-time GPS tracking and all-inclusive flat-rate pricing.",
  locale: "en_US",
  areaServed: ["Oman", "United Arab Emirates", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait"],
  keywords: [
    "oversized cargo logistics",
    "heavy lift transport Oman",
    "project cargo GCC",
    "customs clearance Oman",
    "GCC freight forwarding",
    "petroleum transport Oman",
    "oil and gas logistics GCC",
    "Ward Logistics",
  ],
};
