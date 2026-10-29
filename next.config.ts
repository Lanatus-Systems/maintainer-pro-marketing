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

/** App-only (signed-in, checkout or password) routes on the AasaanWeb app. */
const AASAANWEB_APP_ROUTES = [
  "/checkout",
  "/forgot-password",
  "/reset-password",
  "/get-started",
  "/onboarding",
  "/golems/:path*",
  "/bridges/:path*",
  "/site-from-message/:path*",
  "/partners/:path*",
  "/clients/:path*",
  "/users",
  "/usage",
  "/billing",
  "/stats/:path*",
  "/settings",
  "/applications",
  "/companies",
];

/** AasaanWeb (APP_NAME=maintainer-pro): its own home page; signup and login live on the app. */
const aasaanWebRedirects = [
  { source: "/signup", destination: `${aasaanWebAppUrl}/signup`, statusCode: 307 as const },
  { source: "/login", destination: `${aasaanWebAppUrl}/login`, statusCode: 307 as const },
  { source: "/aasaanweb-home", destination: "/", statusCode: 308 as const },
  // Site forms and previews live on the app; path and query string carry over.
  { source: "/site-form/:path*", destination: `${aasaanWebAppUrl}/site-form/:path*`, statusCode: 307 as const },
  { source: "/p/:path*", destination: `${aasaanWebAppUrl}/p/:path*`, statusCode: 307 as const },
  // Every other app-only route (see the admin repo's client/src/App.tsx) is served by the app.
  ...AASAANWEB_APP_ROUTES.map((route) => ({
    source: route,
    destination: `${aasaanWebAppUrl}${route}`,
    statusCode: 307 as const,
  })),
  { source: "/aasaanweb-pages/:page", destination: "/:page", statusCode: 308 as const },
];

/** Public AasaanWeb pages that share a path with a Butterneck page are served from src/app/aasaanweb-pages. */
const aasaanWebRewrites = [
  { source: "/", destination: "/aasaanweb-home" },
  ...["work", "pricing", "contact", "privacy", "terms"].map((page) => ({
    source: `/${page}`,
    destination: `/aasaanweb-pages/${page}`,
  })),
  { source: "/jira/privacy", destination: "/aasaanweb-pages/jira-privacy" },
  { source: "/jira/terms", destination: "/aasaanweb-pages/jira-terms" },
];

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  // Butterneck builds swap the AasaanWeb blog and legal modules for stubs, so the shared /blog routes
  // never pull AasaanWeb styles into www.butterneck.com and the AasaanWeb-only routes stay inert there.
  ...(isAasaanWeb
    ? {}
    : {
        turbopack: {
          resolveAlias: {
            "@/components/aasaanweb/AasaanWebBlog": "./src/components/aasaanweb/AasaanWebBlog.stub.tsx",
            "@/components/aasaanweb/LegalDocument": "./src/components/aasaanweb/LegalDocument.stub.tsx",
          },
        },
      }),
  env: isAasaanWeb
    ? { APP_NAME: appName, NEXT_PUBLIC_AASAANWEB_APP_URL: aasaanWebAppUrl }
    : { APP_NAME: appName },
  ...(isAasaanWeb
    ? {
        async rewrites() {
          return { beforeFiles: aasaanWebRewrites, afterFiles: [], fallback: [] };
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
