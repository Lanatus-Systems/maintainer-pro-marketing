"use client";

// Butterneck header with the mobile menu actions. Butterneck builds alias "@/components/SiteHeader"
// to this file (next.config.ts); SiteHeader.tsx stays as-is so the AasaanWeb bundle is unchanged.

import Link from "next/link";
import { useState } from "react";
import { NAV } from "@/content/landing";
import { brand } from "@/lib/brand";
import { appUrl } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="public-header">
      <Link href="/" className="public-brand" aria-label={`${brand.name} home`}>
        <img
          src={brand.wordmarkSrc}
          alt={brand.name}
          width={148}
          height={31}
        />
      </Link>
      <nav className="public-header-links" aria-label="Page">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <nav className="public-header-actions" aria-label="Account">
        <a className="public-link" href={appUrl("/login")}>
          Log in
        </a>
        <a className="public-signup" href={appUrl("/signup")} data-ga-location="header">
          Create workspace
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="nav-toggle-label">Menu</span>
        </button>
      </nav>
      <nav
        id="mobile-nav"
        className={open ? "mobile-nav is-open" : "mobile-nav"}
        aria-label="Page"
        hidden={!open}
      >
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className="mobile-nav-actions">
          <a className="landing-btn" href={appUrl("/login")}>
            Log in
          </a>
          <a className="landing-btn primary" href={appUrl("/signup")} data-ga-location="mobile_nav">
            Create workspace
          </a>
        </div>
      </nav>
    </header>
  );
}
