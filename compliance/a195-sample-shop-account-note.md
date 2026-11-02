# A-195: sample shop CTA — say a free account is needed

**Branch:** `copy/a195-sample-shop-account-note`  
**Date:** Tue 3 Nov 2026 ~5:20 AM IST  
**Status:** staged only — do not merge until Digital Compliance Lead PASS + Samjot OK (and only if A-194 keep decision for live trial CTAs).

## Why
Live `/trial` redirects logged-out visitors to `/signup?trial=1` (admin `TrialPage.tsx:74`). Home + blog quiet lines and llms.txt said "before you connect a computer" / "try a request on a sample shop" without saying an account is required. HN readers comparing no-sign-up playgrounds (Adaptl, VisuMerge) hit a sign-up wall. Research run 140 / A-195.

## Change (factual, sample shop wording kept)
1. **Home hero** and **home footer** quiet notes (`src/app/page.tsx`):  
   From: `Not ready to connect a computer? Try a request on a sample shop first…`  
   To: link text `Create a free account and try a request on a sample shop` + `before you connect a computer. Your own project still needs a connected computer; Starter is free.`
2. **Blog post CTA** quiet note (`src/app/blog/[slug]/page.tsx`): same wording.
3. **llms.txt** (`src/app/llms.txt/route.ts`):  
   `Sample shop: create a free account at https://app.butterneck.com/trial and try a request on a sample shop before you connect a computer…`
4. **`PRODUCT_PAGES_UPDATED`** → `2026-11-03` (`src/app/sitemap.ts`).

## Out of scope on this branch
- Mid-post "See it before you set anything up…" lines (still omit account; optional follow-on if CTAs stay).
- Admin onboarding button "Try the trial" → "Try the sample shop" (A-196; coding-agent prompt in `growth/drafts/a196-onboarding-try-the-sample-shop-prompt.md`; no admin access).
- GA event name `trial_click` and CSS class `landing-trial-note` (internal; leave).
- No merge/deploy in this sprint.

## Accuracy checks
- Still says **sample shop**, not trial / sample preview.
- Does not claim no sign-up / no-account playground.
- Does not claim code never leaves / .env always blocked / merge/deploy.
- Pro one-month trial wording on /pricing untouched.

## Diff
See `compliance/a195-sample-shop-account-note.diff`.
