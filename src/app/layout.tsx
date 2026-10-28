import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brand } from "@/lib/brand";
import { SITE_OPEN_GRAPH } from "@/lib/meta";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  X_HANDLE,
} from "@/lib/site";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  verification: { google: "EOVsihMwIiCq5RoRH3urwZL9tgCnsNHl1SZ7XLL_uGc" },
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${brand.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: brand.name,
  authors: [{ name: "Lanatus Systems LLP", url: "https://lanatussystems.com" }],
  creator: "Lanatus Systems LLP",
  publisher: "Lanatus Systems LLP",
  category: "technology",
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${brand.name} blog` }] },
  },
  openGraph: SITE_OPEN_GRAPH,
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: brand.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={plex.className}
      data-app={brand.appName}
      style={{
        ["--accent" as string]: brand.accent,
        ["--accent-hover" as string]: brand.accentHover,
        ["--accent-soft" as string]: brand.accentSoft,
        ["--accent-kicker" as string]: brand.accentKicker,
      }}
    >
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
