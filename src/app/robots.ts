import type { MetadataRoute } from "next";
import { isAasaanWeb } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (isAasaanWeb) {
    return {
      rules: { userAgent: "*", allow: "/", disallow: ["/signup", "/login"] },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
