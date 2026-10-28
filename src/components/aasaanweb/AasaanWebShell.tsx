import { Instrument_Sans, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { aasaanWebAppUrl } from "@/lib/aasaanweb";

/** AasaanWeb fonts, loaded only by AasaanWeb pages. */
const display = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--aw-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--aw-body" });

/** Server-rendered: content is visible without JavaScript (no scroll-in animation). */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`studio-reveal is-in${className ? ` ${className}` : ""}`}>{children}</div>;
}

function Logo({ height = 28 }: { height?: number }) {
  return (
    <a href="/" className="studio-logo" aria-label="AasaanWeb home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="studio-logo-word" src="/aasaanweb/logo-wordmark.svg" alt="AasaanWeb" width={Math.round((height * 991) / 155)} height={height} />
    </a>
  );
}

function Links() {
  return (
    <>
      <a href="#how">How it works</a>
      <a href="#who">Who it’s for</a>
      <a href="#faq">Questions</a>
    </>
  );
}

export function AasaanWebShell({ children }: { children: ReactNode }) {
  return (
    <div className={`studio ${display.variable} ${body.variable}`}>
      <div className="studio-header-bar">
        <header className="studio-header">
          <Logo />
          <nav className="studio-nav" aria-label="Page">
            <Links />
          </nav>
          <div className="studio-header-actions">
            <a href={aasaanWebAppUrl("/login")} className="studio-header-login">
              Log in
            </a>
            <a href={aasaanWebAppUrl("/signup")} className="studio-btn studio-btn-small">
              Get started
            </a>
          </div>
        </header>
      </div>
      {children}
      <footer className="studio-footer">
        <Logo height={22} />
        <nav aria-label="Footer">
          <Links />
          <a href={aasaanWebAppUrl("/login")}>Log in</a>
        </nav>
        <p>© {new Date().getFullYear()} AasaanWeb. All rights reserved.</p>
      </footer>
    </div>
  );
}
