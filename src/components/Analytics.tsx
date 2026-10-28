"use client";

import Script from "next/script";
import { useEffect } from "react";
import { APP_URL } from "@/lib/site";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-7WQMENB19Y";

type Gtag = (...args: unknown[]) => void;
type Win = Window & { gtag?: Gtag; google_tag_manager?: unknown };

/** How long we hold a same-tab navigation away from the site after flushing the GA hit. */
const NAV_DELAY_MS = 150;

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = (window as Win).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

/**
 * GA4 batches events and sends them up to ~5 s later. `event_callback` fires as soon as the
 * event is queued, not when it is sent, and `transport_type` is ignored by GA4 (it is only
 * recorded as a custom parameter). GA4 flushes its queue with a keepalive beacon on `pagehide`,
 * so we trigger that flush ourselves right before leaving the page: the request is then already
 * in flight (and survives the unload) when the browser navigates.
 */
function flushAnalytics() {
  try {
    window.dispatchEvent(new Event("pagehide"));
  } catch {
    /* ignore */
  }
}

function isSignupUrl(url: URL): boolean {
  return url.origin === new URL(APP_URL).origin && /^\/signup\b/.test(url.pathname);
}

function isContactLink(href: string, url: URL): boolean {
  return href.startsWith("mailto:") || (url.origin === window.location.origin && /^\/contact\/?$/.test(url.pathname));
}

/**
 * Delegated click tracking. Every matching rule fires (they are not exclusive):
 *  - explicit `data-ga-event` (+ `data-ga-*` params), e.g. book_walkthrough_click, select_plan
 *  - app /signup link         -> sign_up_click { location }
 *  - /contact or mailto: link -> contact_click { location, method }
 *  - any link inside a blog post body or the post CTA -> blog_cta_click
 *
 * Links that leave the site in the same tab (e.g. app.butterneck.com/signup) used to unload the
 * page while gtag still held the event in its batch, so sign-up clicks were never recorded. For
 * those we send the events, flush GA's queue as a beacon, then follow the link NAV_DELAY_MS later.
 */
function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute("href") || "";
  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return;
  }
  const ds = a.dataset;
  const location = ds.gaLocation || window.location.pathname;
  const label = (a.textContent || "").trim().slice(0, 100);
  const events: Array<[string, Record<string, unknown>]> = [];

  if (ds.gaEvent) {
    const params: Record<string, unknown> = { location, link_text: label, link_url: a.href };
    for (const [k, v] of Object.entries(ds)) {
      if (k.startsWith("ga") && k !== "gaEvent" && k !== "gaLocation") {
        params[k.slice(2).replace(/^./, (c) => c.toLowerCase())] = v;
      }
    }
    events.push([ds.gaEvent, params]);
  }
  if (ds.gaEvent !== "sign_up_click" && isSignupUrl(url)) {
    events.push(["sign_up_click", { location, link_text: label }]);
  }
  if (ds.gaEvent !== "contact_click" && isContactLink(href, url)) {
    events.push([
      "contact_click",
      { location, link_text: label, method: href.startsWith("mailto:") ? "email" : "contact_page" },
    ]);
  }
  if (ds.gaEvent !== "blog_cta_click" && a.closest(".post-body, .blog-cta")) {
    events.push(["blog_cta_click", { post: window.location.pathname, link_text: label, link_url: a.href }]);
  }
  if (events.length === 0) return;

  const w = window as Win;
  const leavesInThisTab =
    !e.defaultPrevented &&
    e.button === 0 &&
    !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) &&
    (!a.target || a.target === "_self") &&
    !a.hasAttribute("download") &&
    /^https?:$/.test(url.protocol) &&
    url.origin !== window.location.origin;
  // Only hold the navigation when gtag.js actually loaded (not blocked by the browser).
  const hold = leavesInThisTab && typeof w.gtag === "function" && !!w.google_tag_manager;

  for (const [name, params] of events) trackEvent(name, params);
  if (!hold) return;

  e.preventDefault();
  // gtag processes queued commands asynchronously; flush on the next tick, then navigate.
  window.setTimeout(flushAnalytics, 0);
  window.setTimeout(() => {
    window.location.href = a.href;
  }, NAV_DELAY_MS);
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
