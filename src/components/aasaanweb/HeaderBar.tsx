"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

/** Header with the mobile menu toggle, ported from the admin app's StudioShell. */
export function HeaderBar({
  logo,
  links,
  menuLinks,
  startUrl,
}: {
  logo: ReactNode;
  links: ReactNode;
  menuLinks: ReactNode;
  startUrl: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  return (
    <div className="studio-header-bar" ref={barRef}>
      <header className="studio-header">
        {logo}
        <nav className="studio-nav" aria-label="Page">
          {links}
        </nav>
        <div className="studio-header-actions">
          <a href={startUrl} className="studio-btn studio-btn-small">
            Get started
          </a>
          <button
            type="button"
            className="studio-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="studio-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>
      {menuOpen ? (
        <nav id="studio-mobile-menu" className="studio-mobile-menu" aria-label="Menu" onClick={() => setMenuOpen(false)}>
          {menuLinks}
        </nav>
      ) : null}
    </div>
  );
}
