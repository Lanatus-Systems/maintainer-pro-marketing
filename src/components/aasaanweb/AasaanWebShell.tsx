import type { ReactNode } from "react";
import { aasaanWebAppUrl } from "@/lib/aasaanweb";
import { HeaderBar } from "./HeaderBar";
import { StudioLogo } from "./Logo";

/** The admin app's Google Fonts request (client/index.html), loaded only by AasaanWeb pages. */
const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@500..700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";

/** The admin app's StudioShell START_URL, on the app's host. */
export const START_URL = aasaanWebAppUrl(
  "/site-form/c89547af-0752-4ab5-ab6a-4a47a51f49b3/8d47cc5e-6c3c-4fca-a79f-b14bcd3ffb71"
);

/** Same links as the admin app's StudioLinks, minus Pricing (no prices on this site). */
function Links({ footer = false }: { footer?: boolean }) {
  return (
    <>
      <a href={aasaanWebAppUrl("/work")}>Our work</a>
      <a href="/#how">How it works</a>
      <a href="/#who">Who it’s for</a>
      <a href="/#faq">Questions</a>
      {footer ? <a href={aasaanWebAppUrl("/contact")}>Contact</a> : null}
    </>
  );
}

export function AasaanWebShell({ children }: { children: ReactNode }) {
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
      <HeaderBar logo={<StudioLogo />} links={<Links />} menuLinks={<Links footer />} startUrl={START_URL} />
      {children}
      <footer className="studio-footer">
        <StudioLogo size={22} />
        <nav aria-label="Footer">
          <Links footer />
        </nav>
        <p>© {new Date().getFullYear()} AasaanWeb. All rights reserved.</p>
      </footer>
    </div>
  );
}
