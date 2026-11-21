import type { NextConfig } from "next";

// GitHub Pages hosts the public showcase as static files under the repo path.
// Keep local development at "/" and leave server-backed features for a future host.
const pagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = pagesBuild
  ? {
      output: "export",
      basePath: "/Superior-MI-Web",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
