import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { resolveAppName } from "./src/lib/brand";

const blogSlugs = readdirSync("./src/content/posts")
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .map((f) => f.replace(/\.ts$/, ""));

const appName = resolveAppName(process.env.APP_NAME);

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  env: {
    APP_NAME: appName,
  },
  async redirects() {
    return [
      { source: "/butterneck-vs-clickup", destination: "/", permanent: true },
      { source: "/signup", destination: "https://app.butterneck.com/signup", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      ...blogSlugs.map((slug) => ({
        source: `/blogs/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),
      { source: "/blogs/:path*", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
