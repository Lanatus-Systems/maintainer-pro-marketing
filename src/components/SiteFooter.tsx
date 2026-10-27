import Link from "next/link";
import { FOOTER_NAV } from "@/content/landing";
import { brand } from "@/lib/brand";
import { appUrl, LINKEDIN_URL, X_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="landing-footer">
      <Link href="/" className="public-brand" aria-label={brand.name}>
        <img
          src={brand.wordmarkSrc}
          alt=""
          width={124}
          height={26}
        />
      </Link>
      <nav aria-label="Footer">
        {FOOTER_NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" data-ga-event="social_click" data-ga-network="linkedin">
          LinkedIn
        </a>
        <a href={X_URL} target="_blank" rel="noopener noreferrer" data-ga-event="social_click" data-ga-network="x">
          X
        </a>
        <a href={appUrl("/login")}>Log in</a>
      </nav>
      <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
    </footer>
  );
}
