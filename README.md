# Butterneck marketing

Next.js 16 (React 19, Node 22+) site for **butterneck.com**. The product app lives in `maintainer-pro-admin` at **app.butterneck.com**. The same codebase also builds the AasaanWeb site (**aasaanweb.butterneck.com**) when `APP_NAME=maintainer-pro`.

## Run

```bash
npm install
npm run dev     # or: npm run build && npm start
```

Dev server: http://localhost:3010

`APP_NAME` selects the product, the same variable the admin app uses. Values: `butterneck` (default) and `maintainer-pro` (AasaanWeb). Any other value stays on Butterneck. Products are defined in `src/lib/brand.ts`. Set variables in `.env.local` if needed; there is no `.env.example`.

`NEXT_PUBLIC_APP_URL` is where “Create workspace”, “Log in”, and Pro checkout go. Point it at the local admin (`http://localhost:4100`) while the app still lives there.

## Vercel

Add these as **Config** variables on Production, Preview, and Development. They are public. `NEXT_PUBLIC_*` cannot be Secret. Set them before the build, then redeploy after any change. Next bakes them into the site at build time.

| Name | Value |
|---|---|
| `APP_NAME` | `butterneck` |
| `NEXT_PUBLIC_SITE_URL` | `https://butterneck.com` |
| `NEXT_PUBLIC_APP_URL` | `https://app.butterneck.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) |

AasaanWeb builds use `APP_NAME=maintainer-pro`, and `NEXT_PUBLIC_AASAANWEB_APP_URL` (default `https://aasaan.butterneck.com`).

## Pages

Home, pricing, security, contact, privacy, terms, `/integrations/jira`, the Jira privacy and terms pages, the blog (`/blog`, `/blog/[slug]`, `/blog/rss.xml`, posts in `src/content/posts`, including comparison posts), plus `/llms.txt`, `/sitemap.xml`, `/robots.txt`, and the web manifest. AasaanWeb pages live in `src/app/aasaanweb-*` and are served through rewrites in `next.config.ts`.

`npm run indexnow:aasaanweb` submits changed AasaanWeb URLs to IndexNow. Run it by hand after a deploy. Prices match `maintainer-pro-admin/server/src/lib/pricing.ts`.
