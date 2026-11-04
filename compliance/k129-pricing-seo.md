# K-129: pricing seoTitle/meta add 'AI change requests'

**Branch:** `copy/k129-pricing-seo`  
**SHA:** `6f1188155013d785d75b0cbd9a278178a1201577`  
**Base:** `origin/main` @ `d96b2f0` (K-130 + K-131 already live)  
**Date:** Wed 4 Nov 2026 ~1:17 PM IST  
**Build:** `npm run build` OK (Next.js 16.4.3, 46/46 pages)  
**Status:** staged for Digital Compliance Lead — do **not** merge until Compliance PASS. No FF to main from this pack.

## Why
K-129 (pricing title/meta “AI change requests”) was previously bundled with K-130 on stale `origin/copy/k129-k130` @ `3993c04`. K-130/K-131 landed on main as `d96b2f0`; K-129 did not. This branch restages **K-129 only**.

## Change
**File:** `src/app/pricing/page.tsx` (metadata only; visible body unchanged)

```ts
title: `Pricing for AI change requests: free Starter, Pro $${usd}`,
description: `AI change requests for product teams: Starter free for 1 developer + 1 requester; Pro $${usd}/person/month with a one-month trial. AI runs on your own coding agent plan.`,
```

Was: `Pricing: free Starter, Pro $…, one-month trial` / description without “AI change requests” (ended with “no markup”).

## Out of scope
- `src/content/landing.ts` FAQ links (K-130/K-131) — already on main; not retouched.
- No merge/deploy from this pack.
- AasaanWeb files untouched.

## Accuracy checks
- No new product claims. Pricing page body / FAQ answers unchanged.
- “No markup” claim remains on-page in pricing FAQ (“Butterneck doesn’t run its own model or resell AI usage, so there’s no markup on your AI plan.”). Meta drops trailing “no markup” for length/SEO only — not a factual regression.
- No banned phrases (`always blocked` / `never leaves` / `stays on your computer` / “stays local” / PR-open claims).
- Sample shop vs one-month Pro trial wording kept distinct; Pro trial wording on /pricing unchanged.
- Diffstat: `src/app/pricing/page.tsx | 4 ++--` (2 lines only).

## Diff
See `compliance/k129-pricing-seo.diff` (`git diff origin/main...HEAD -- src/`).

## Ask
Digital Compliance Lead: please PASS (or note fixes). Not critical — SEO phrasing only. Do **not** merge until Compliance PASS.
