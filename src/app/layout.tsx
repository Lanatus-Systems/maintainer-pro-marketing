import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brand } from "@/lib/brand";
import {
  SITE_DESCRIPTION,
  SITE_OG_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${brand.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: brand.name,
  authors: [{ name: "Lanatus" }],
  creator: "Lanatus",
  category: "technology",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: "en_US",
    title: brand.name,
    description: SITE_OG_DESCRIPTION,
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: brand.name,
    description: SITE_OG_DESCRIPTION,
    images: ["/logo-512.png"],
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
      </body>
    </html>
  );
}
