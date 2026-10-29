"use client";

// Butterneck-only theme and motion. AasaanWeb builds alias this module to ButterneckTheme.stub.tsx
// (see next.config.ts), so none of these styles or scripts reach aasaanweb.butterneck.com.
//
// Motion rules: everything here is progressive. The server HTML is the full, static page; this
// script only adds motion after hydration, never hides above-the-fold content, animates only
// opacity/transform (no layout shift), and does nothing under prefers-reduced-motion.
import { useEffect, useRef, type ReactNode } from "react";
import "./butterneck-theme.css";

const reducedMotion = () =>
  typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Page-wide enhancements: header state, scroll reveal, card tilt/spotlight, price counters. */
export function ButterneckTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".public-header");
    const onScroll = () => header?.classList.toggle("bn-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reducedMotion()) return () => window.removeEventListener("scroll", onScroll);

    root.classList.add("bn-motion");
    const cleanups: (() => void)[] = [() => window.removeEventListener("scroll", onScroll)];

    // Scroll reveal: only for elements that start below the fold, so nothing visible flashes.
    const targets = document.querySelectorAll<HTMLElement>(
      [
        ".landing-section > h2",
        ".landing-section > .landing-section-lead",
        ".landing-section > .landing-kicker",
        ".landing-section > .landing-demo-video",
        ".landing-grid > *",
        ".landing-fit > *",
        ".landing-steps",
        ".landing-steps > *",
        ".landing-prices > *",
        ".landing-faq > *",
        ".landing-safety",
        ".landing-safety-list > li",
        ".landing-proof p",
        ".landing-bottom",
        ".bn-marquee",
        ".blog-list > li",
        ".landing-section figure",
      ].join(","),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("bn-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const fold = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--bn-d", `${Math.min(i, 6) * 70}ms`);
      el.classList.add("bn-reveal");
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // Tilt + spotlight on cards, only with a fine pointer that can hover.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const cards = document.querySelectorAll<HTMLElement>(
        ".landing-grid > .card, .landing-steps > .card, .landing-fit > .card, .landing-price, .bn-stage, .blog-card",
      );
      cards.forEach((card) => {
        const max = card.classList.contains("bn-stage") ? 4 : 5;
        let frame = 0;
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            card.style.setProperty("--bn-rx", `${((0.5 - y) * max).toFixed(2)}deg`);
            card.style.setProperty("--bn-ry", `${((x - 0.5) * max).toFixed(2)}deg`);
            card.style.setProperty("--bn-mx", `${(x * 100).toFixed(1)}%`);
            card.style.setProperty("--bn-my", `${(y * 100).toFixed(1)}%`);
          });
        };
        const leave = () => {
          cancelAnimationFrame(frame);
          card.style.setProperty("--bn-rx", "0deg");
          card.style.setProperty("--bn-ry", "0deg");
        };
        card.classList.add("bn-tilt");
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
    }

    // Count up the prices already shown on the page ($0 → $19), then restore the exact text.
    const prices = document.querySelectorAll<HTMLElement>(".landing-price-amount strong");
    const countIo = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        countIo.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const final = el.textContent ?? "";
        const m = final.match(/^(\D*)(\d+)(\D*)$/);
        if (!m) continue;
        const [, pre, num, post] = m;
        const to = Number(num);
        const start = performance.now();
        const step = (now: number) => {
          if (el.textContent !== final && !el.dataset.bnCounting) return; // React re-rendered it
          const t = Math.min(1, (now - start) / 700);
          const eased = 1 - Math.pow(1 - t, 3);
          el.dataset.bnCounting = "1";
          el.textContent = t < 1 ? `${pre}${Math.round(to * eased)}${post}` : final;
          if (t < 1) requestAnimationFrame(step);
          else delete el.dataset.bnCounting;
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.6 });
    prices.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) countIo.observe(el);
    });
    cleanups.push(() => countIo.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

/** The request → AI → preview → developer flow, played on the hero chat mockup. */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage || reducedMotion()) return;
    const typed = stage.querySelector<HTMLElement>(".bn-typed");
    const request = stage.querySelector<HTMLElement>(".aui-preview-bubble.is-self")?.textContent ?? "";
    let timers: number[] = [];
    let visible = true;
    let running = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const set = (step: number) => stage.setAttribute("data-step", String(step));

    const play = () => {
      running = true;
      timers.forEach(clearTimeout);
      timers = [];
      set(0);
      if (typed) typed.textContent = "";
      stage.classList.add("is-typing");
      const perChar = 28;
      for (let i = 1; i <= request.length; i++) {
        at(500 + i * perChar, () => {
          if (typed) typed.textContent = request.slice(Math.max(0, i - 44), i);
        });
      }
      let t = 500 + request.length * perChar + 350;
      at(t, () => {
        stage.classList.remove("is-typing");
        if (typed) typed.textContent = "";
        set(1);
      });
      at((t += 700), () => set(2));
      at((t += 1900), () => set(3));
      at((t += 1500), () => set(4));
      at((t += 5200), () => {
        running = false;
        if (visible) play();
      });
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !running) play();
    });
    // Let the static first frame (the finished conversation) settle before the loop starts.
    const kickoff = window.setTimeout(() => io.observe(stage), 2200);
    return () => {
      clearTimeout(kickoff);
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="bn-stage" data-step="4">
      <div className="bn-stage-glow" aria-hidden="true" />
      {children}
      <div className="bn-composer-typed" aria-hidden="true">
        <span className="bn-typed" />
        <span className="bn-caret" />
      </div>
      <div className="bn-mini" aria-hidden="true">
        <div className="bn-mini-bar">
          <span />
          <span />
          <span />
          <em>Live preview</em>
        </div>
        <div className="bn-mini-body">
          <i className="bn-mini-line is-wide" />
          <i className="bn-mini-line" />
          <span className="bn-mini-btn">
            <b className="is-before">Get started</b>
            <b className="is-after">Book a call</b>
          </span>
        </div>
      </div>
    </div>
  );
}

/** A slow marquee of names and promises already on the page. */
export function ToolMarquee({ label, items }: { label: string; items: readonly string[] }) {
  // Each half repeats the list so the strip is wider than any screen; the second half is the loop copy.
  const half = [...items, ...items, ...items];
  const row = (hidden: boolean) => (
    <ul className="bn-marquee-row" aria-hidden={hidden || undefined}>
      {half.map((item, i) => (
        <li key={`${item}-${i}`} aria-hidden={!hidden && i >= items.length ? true : undefined}>
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <section className="bn-marquee" aria-label={label}>
      <p className="bn-marquee-label">{label}</p>
      <div className="bn-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
