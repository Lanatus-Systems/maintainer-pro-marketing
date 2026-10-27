"use client";

import Script from "next/script";
import { useEffect } from "react";
import { APP_URL } from "@/lib/site";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-7WQMENB19Y";

type Gtag = (...args: unknown[]) => void;

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

/**
 * Delegated click tracking. Explicit `data-ga-event` (+ `data-ga-*` params) wins;
 * otherwise links are classified by destination:
 *  - app /signup            -> sign_up_click { location }
 *  - /contact, mailto:      -> contact_click { location }
 *  - any link inside a blog post body / blog CTA also fires blog_cta_click.
 */
function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute("href") || "";
  const ds = a.dataset;
  const location = ds.gaLocation || window.location.pathname;
  const label = (a.textContent || "").trim().slice(0, 100);

  if (ds.gaEvent) {
    const params: Record<string, unknown> = { location, link_text: label, link_url: a.href };
    for (const [k, v] of Object.entries(ds)) {
      if (k.startsWith("ga") && k !== "gaEvent" && k !== "gaLocation") {
        params[k.slice(2).replace(/^./, (c) => c.toLowerCase())] = v;
      }
    }
    trackEvent(ds.gaEvent, params);
  } else if (a.href.startsWith(APP_URL) && /\/signup\b/.test(a.href)) {
    trackEvent("sign_up_click", { location, link_text: label });
  } else if (href.startsWith("mailto:") || /^\/contact\b/.test(href)) {
    trackEvent("contact_click", { location, link_text: label, method: href.startsWith("mailto:") ? "email" : "contact_page" });
  }

  if (a.closest(".post-body, .blog-cta")) {
    trackEvent("blog_cta_click", { post: window.location.pathname, link_text: label, link_url: a.href });
  }
}

export function Analytics() {
  useEffect(() => {
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
