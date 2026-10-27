# Butterneck marketing

Next.js site for **butterneck.com**. The product app stays in `maintainer-pro-admin` and is planned to move to **app.butterneck.com**. This app does not replace that landing page yet.

## Run

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Dev server: http://localhost:3010

`APP_NAME` selects the product, the same variable the admin app uses. The only value today is `butterneck`, which is also the default. Any other value stays on Butterneck until that product is added in `src/lib/brand.ts`.

`NEXT_PUBLIC_APP_URL` is where “Create workspace”, “Log in”, and Pro checkout go. Point it at the local admin (`http://localhost:4100`) while the app still lives there.

## Pages

Home, pricing, FAQ, privacy, terms, contact, and the Jira privacy and terms pages. Prices match `maintainer-pro-admin/server/src/lib/pricing.ts`.
