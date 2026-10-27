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
      { source: "/butterneck-vs-clickup", destination: "/", statusCode: 301 },
      { source: "/signup", destination: "https://app.butterneck.com/signup", statusCode: 301 },
      { source: "/blogs", destination: "/blog", statusCode: 301 },
      ...blogSlugs.map((slug) => ({
        source: `/blogs/${slug}`,
        destination: `/blog/${slug}`,
        statusCode: 301,
      })),
      { source: "/blogs/:path*", destination: "/blog", statusCode: 301 },
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
