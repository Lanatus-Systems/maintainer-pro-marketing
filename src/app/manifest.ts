import type { MetadataRoute } from "next";
import { brand, isAasaanWeb } from "@/lib/brand";
import { SITE_OG_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  if (isAasaanWeb) {
    return {
      name: brand.name,
      short_name: brand.name,
      description: brand.description,
      lang: "en-IN",
      start_url: "/",
      display: "standalone",
      background_color: "#f6f8fb",
      theme_color: brand.themeColor,
      icons: [
        { src: "/aasaanweb/favicon.svg", type: "image/svg+xml", sizes: "any" },
        { src: "/aasaanweb/logo-192.png", type: "image/png", sizes: "192x192" },
        { src: "/aasaanweb/logo-512.png", type: "image/png", sizes: "512x512" },
        { src: "/aasaanweb/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
      ],
    };
  }
  return {
    name: brand.name,
    short_name: brand.name,
    description: SITE_OG_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: brand.themeColor,
    icons: [
      { src: "/logo.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/logo-192.png", type: "image/png", sizes: "192x192" },
      { src: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
