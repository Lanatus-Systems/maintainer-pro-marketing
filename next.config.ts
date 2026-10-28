import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { resolveAppName } from "./src/lib/brand";

const blogSlugs = readdirSync("./src/content/posts")
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .map((f) => f.replace(/\.ts$/, ""));

const appName = resolveAppName(process.env.APP_NAME);

const isAasaanWeb = appName === "maintainer-pro";
const aasaanWebAppUrl = (
  process.env.NEXT_PUBLIC_AASAANWEB_APP_URL || "https://aasaan.butterneck.com"
).replace(/\/$/, "");

/** AasaanWeb (APP_NAME=maintainer-pro): its own home page; signup and login live on the app. */
const aasaanWebRedirects = [
  { source: "/signup", destination: `${aasaanWebAppUrl}/signup`, statusCode: 307 as const },
  { source: "/login", destination: `${aasaanWebAppUrl}/login`, statusCode: 307 as const },
  { source: "/aasaanweb-home", destination: "/", statusCode: 308 as const },
  // Live example pages, shared previews and the start form are served by the app. Old links on
  // this host keep working. Redirects, not rewrites: the app adds a trailing slash with a
  // relative Location, which would bounce back here through a proxy.
  { source: "/p/:path*", destination: `${aasaanWebAppUrl}/p/:path*`, statusCode: 307 as const },
  { source: "/site-form/:path*", destination: `${aasaanWebAppUrl}/site-form/:path*`, statusCode: 307 as const },
  { source: "/work", destination: `${aasaanWebAppUrl}/work`, statusCode: 307 as const },
];

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  env: isAasaanWeb
    ? { APP_NAME: appName, NEXT_PUBLIC_AASAANWEB_APP_URL: aasaanWebAppUrl }
    : { APP_NAME: appName },
  ...(isAasaanWeb
    ? {
        async rewrites() {
          return { beforeFiles: [{ source: "/", destination: "/aasaanweb-home" }], afterFiles: [], fallback: [] };
        },
      }
    : {}),
  async redirects() {
    if (isAasaanWeb) return aasaanWebRedirects;
    return [
      { source: "/butterneck-vs-clickup", destination: "/", statusCode: 301 },
      { source: "/signup", destination: "https://app.butterneck.com/signup", statusCode: 301 },
      {
        source: "/blog/butterneck-vs-jira-coding-agent",
        destination: "/integrations/jira",
        statusCode: 301,
      },
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
