import type { NextConfig } from "next";

// Fully static export: deployable to GitHub Pages (under NEXT_PUBLIC_BASE_PATH) or any static host.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
