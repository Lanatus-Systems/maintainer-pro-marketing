import type { ReactNode } from "react";
import { HeaderBar } from "./HeaderBar";
import { StudioLogo } from "./Logo";

/** The admin app's Google Fonts request (client/index.html), loaded only by AasaanWeb pages. */
const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@500..700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";

/** The admin app's StudioShell START_URL; next.config redirects /site-form to the app. */
export const START_URL =
  "/site-form/c89547af-0752-4ab5-ab6a-4a47a51f49b3/8d47cc5e-6c3c-4fca-a79f-b14bcd3ffb71";

export type AasaanWebPage = "home" | "work" | "pricing" | "blog";

/** Same links as the admin app's StudioLinks; the current page is marked like the original. */
function Links({ footer = false, current }: { footer?: boolean; current?: AasaanWebPage }) {
  const mark = (page: AasaanWebPage) =>
    current === page ? { className: "is-current", "aria-current": "page" as const } : {};
  return (
    <>
      <a href="/work" {...mark("work")}>Our work</a>
      <a href="/pricing" {...mark("pricing")}>Pricing</a>
      <a href="/blog" {...mark("blog")}>Blog</a>
      <a href="/#how">How it works</a>
      <a href="/#who">Who it’s for</a>
      <a href="/#faq">Questions</a>
      {footer ? <a href="/contact">Contact</a> : null}
    </>
  );
}

export function AasaanWebShell({ children, current }: { children: ReactNode; current?: AasaanWebPage }) {
  return (
    <div className="studio">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="stylesheet" href={FONTS_CSS} precedence="default" />
      {/* Without JavaScript the scroll-in animation still plays, so nothing stays hidden. */}
      <noscript>
        <style>{".studio .studio-reveal{animation-play-state:running}"}</style>
      </noscript>
      <HeaderBar logo={<StudioLogo />} links={<Links current={current} />} menuLinks={<Links footer current={current} />} startUrl={START_URL} />
      {children}
      <footer className="studio-footer">
        <StudioLogo size={22} />
        <nav aria-label="Footer">
          <Links footer current={current} />
        </nav>
        <p>© {new Date().getFullYear()} AasaanWeb. All rights reserved.</p>
      </footer>
    </div>
  );
}
