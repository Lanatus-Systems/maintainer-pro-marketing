#!/usr/bin/env node
/**
 * IndexNow for the AasaanWeb site (site-fixes/06). Run by hand AFTER a deploy that adds or changes
 * pages; it is not part of the build and nothing calls it automatically.
 *
 *   node scripts/indexnow-aasaanweb.mjs <url> [<url> ...]   # submit the changed URLs
 *   node scripts/indexnow-aasaanweb.mjs --sitemap           # submit every URL in the live sitemap
 *   add --dry-run to print the request without sending it
 *
 * The key is the existing public/07e58e8e930ecda50fb694811b41575f.txt, which every build serves at
 * the site root, so https://aasaanweb.butterneck.com/<key>.txt is the key location. The script checks
 * that file on the live host before it submits anything.
 */
const HOST = "aasaanweb.butterneck.com";
const ORIGIN = `https://${HOST}`;
const KEY = "07e58e8e930ecda50fb694811b41575f";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
let urls = args.filter((a) => !a.startsWith("--"));

if (args.includes("--sitemap")) {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
urls = [...new Set(urls)];
if (!urls.length) {
  console.error("No URLs. Pass changed URLs or --sitemap.");
  process.exit(1);
}
const foreign = urls.filter((u) => new URL(u).host !== HOST);
if (foreign.length) {
  console.error(`Only ${HOST} URLs can be submitted with this key:\n${foreign.join("\n")}`);
  process.exit(1);
}

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
if (dryRun) {
  console.log(`POST ${ENDPOINT}\n${JSON.stringify(body, null, 2)}`);
  process.exit(0);
}

const keyRes = await fetch(KEY_LOCATION);
const keyText = (await keyRes.text()).trim();
if (!keyRes.ok || keyText !== KEY) {
  console.error(`Key file check failed: ${KEY_LOCATION} returned ${keyRes.status}. Not submitting.`);
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
