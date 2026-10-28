"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-in animation, ported from the admin app's StudioShell Reveal. The content is in the
 * server HTML; without JavaScript a <noscript> rule in AasaanWebShell keeps it visible.
 */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`studio-reveal${visible ? " is-in" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
