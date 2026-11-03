# A-202: Adaptl playground 404 disclosure

**Branch:** `copy/a202-adaptl-playground-404`  
**SHA:** `f36b0ed`  
**Date:** Wed 4 Nov 2026 ~1:20 AM IST  
**Status:** staged for Digital Compliance Lead — competitor-claim accuracy. Do **not** merge until Compliance PASS. Not critical for launch; factual correction of a dead competitor link we previously soft-advertised.

## Why
Research run 145: live Adaptl playground URLs return **404** (`https://inloop.adaptl.ai/playground` and `https://adaptl.ai/playground`). Butterneck's Adaptl comparison still presented the playground as available after commit `104bfd2` removed the 404 disclosure that had been in `93aad6b`. Re-check this sprint (~1:18 AM IST) confirmed both playground URLs still 404; Adaptl home still advertises "Try the playground".

## What changed (`src/content/posts/adaptl-alternative.ts` only)
1. Source date: "as read on November 3, 2026" → **"as read on November 4, 2026"**.
2. Adaptl home headline restored to the live H1 quote: **"AI made software cheap to build. Adaptl makes it safe to own."** (verified on https://adaptl.ai/ this sprint).
3. Body playground sentence: no href to the dead URL; notes the linked playground URL **returned 404 on 4 Nov 2026 re-check**.
4. Table "Try before setup" Adaptl cell: **"Playground linked from home (URL 404 on 4 Nov 2026 re-check)"**.
5. Table header date: Adaptl column **"as of 4 Nov 2026"**.
6. `date` field left `2026-11-03` (no `updated` field on this post; matches prior Adaptl-post pattern).

## Exact strings (after)
- Body: `and a playground linked from its home for exploring a shared project first (that playground URL returned 404 when we re-checked on 4 Nov 2026).`
- Table cell: `Playground linked from home (URL 404 on 4 Nov 2026 re-check)`
- Headline: `Adaptl's home page headline now says: "AI made software cheap to build. Adaptl makes it safe to own."`

## Unchanged / accuracy
- Sample shop column unchanged (`app.butterneck.com/trial`).
- No invented replacement playground path; no live href to the 404 URL.
- Butterneck still does not commit/push/open PR/merge/deploy.
- Approved accuracy line kept: "The edit runs on your computer. Your team still decides what goes live."
- No banned phrases (`always blocked` / `never leaves` / `stays on your computer`).
- K-127 (live-preview "AI change requests" seoTitle/meta) already live on main — **not** in this branch.

## Diff
See `compliance/a202-adaptl-playground-404.diff` (`git diff origin/main -- src/content/posts/adaptl-alternative.ts`).

## Ask
Digital Compliance Lead: please PASS (or note fixes). Merge only after PASS. Do not FF to main from this note.
