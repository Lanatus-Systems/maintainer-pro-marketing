# A-195 + K-120: free-account sample shop CTA + try-without-install FAQ

**Branch:** `copy/a195-sample-shop-account-note`  
**Date:** Tue 3 Nov 2026 ~9:20 AM IST  
**Status:** staged for Digital Compliance Lead — request PASS; treat as product-claim clarity (critical-ish). Samjot already approved A-194 keep (sample-shop CTAs stay live, ~4:26 AM IST Nov 3) and K-120; Samjot OK before merge is still safer before Show HN tonight (8:30 PM IST). Do not merge or deploy from this pack.

## Why
Live `/trial` redirects logged-out visitors to `/signup?trial=1`. Home/blog quiet lines and mid-post CTAs needed to say a free account is required (not a no-account playground). K-120 adds an FAQ for "Can I try it without installing anything?" that separates the sample shop from the one-month Pro trial and states own-product use needs the connector.

## Change
### A-195 (already on branch; verify, do not regress)
1. **Home hero** and **home footer** quiet notes (`src/app/page.tsx`): link text `Create a free account and try a request on a sample shop` + `before you connect a computer…`
2. **Blog post CTA** quiet note (`src/app/blog/[slug]/page.tsx`): same wording.
3. **llms.txt** (`src/app/llms.txt/route.ts`): Sample shop line mentions create a free account.
4. **`PRODUCT_PAGES_UPDATED`** → `2026-11-03` (`src/app/sitemap.ts`).

### K-120 FAQ (this commit)
5. **FAQ** (`src/content/landing.ts`): new last FAQ after "Why not use a tool that opens the pull request for you?":
   - q: `Can I try it without installing anything?`
   - Answer points to https://app.butterneck.com/signup?trial=1 (same as /trial), runs on our computer, not the Pro trial; own product needs connector on a computer that already has the project.

### Mid-post free-account clarification (this commit)
6. **12 posts** under `src/content/posts/` with the mid-post line:
   - From: `**See it before you set anything up:** you can [try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer.`
   - To: `**See it before you set anything up:** [create a free account and try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer.`
   - Rest of paragraph unchanged: `On your own project, the edit runs on your computer. Your team still decides what goes live.`
   - Bumped `updated` to `2026-11-03` only where that field already existed (8 posts). Adaptl comparison table cells left alone.

## Out of scope
- Admin onboarding button "Try the trial" → "Try the sample shop" (A-196).
- GA event name `trial_click` / CSS `landing-trial-note`.
- No merge/deploy in this sprint.
- AasaanWeb files untouched.

## Accuracy checks
- Still says **sample shop**, not trial / sample preview (Pro trial called out separately in K-120).
- Does not claim no sign-up / no-account playground.
- Does not claim code never leaves / .env always blocked / merge/deploy/PR.
- Uses approved accuracy line: edit runs on your computer; team still decides what goes live.
- Pro one-month trial wording on /pricing untouched.

## Approvals already on record
- A-194 keep: sample-shop CTAs stay live (~4:26 AM IST Nov 3).
- K-120 FAQ text pre-approved by Samjot (~4:26 AM IST Nov 3).

## Diff
See `compliance/a195-sample-shop-account-note.diff` (`git diff origin/main -- src/`).

## Ask
Digital Compliance Lead: please PASS (or note fixes). Prefer Samjot OK before merge even though K-120 was pre-approved — product-claim clarity ahead of Show HN.
