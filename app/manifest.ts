import type { MetadataRoute } from "next";
import { basePath } from "./i18n";
import { site } from "./site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#0c0b10",
    theme_color: "#0c0b10",
    icons: [{ src: `${basePath}/favicon.ico`, sizes: "any", type: "image/x-icon" }],
  };
}
