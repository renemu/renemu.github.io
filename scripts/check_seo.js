const fs = require("fs");
const path = require("path");
const assert = require("assert");

const outDir = path.resolve(__dirname, "..", "out");
assert(fs.existsSync(outDir), "out/ directory not found. Run `npm run build` first.");
assert(fs.existsSync(path.join(outDir, ".nojekyll")), "Missing out/.nojekyll for GitHub Pages.");
assert(fs.existsSync(path.join(outDir, "robots.txt")), "Missing out/robots.txt.");

const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(urls.length, 5, `Expected 5 sitemap URLs, found ${urls.length}`);

const titles = new Set();

for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(outDir, pathname, "index.html");
  assert(fs.existsSync(file), `Missing static HTML file for ${url}: ${file}`);

  const html = fs.readFileSync(file, "utf8");
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Canonical count mismatch on ${url}`);
  assert(html.includes(`rel="canonical" href="${url}"`), `Canonical href mismatch on ${url}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Expected single <h1> on ${url}`);
  assert.equal((html.match(/name="description"/g) || []).length, 1, `Expected single meta description on ${url}`);
  assert(html.includes(`property="og:url" content="${url}"`), `og:url mismatch on ${url}`);
  assert(html.includes('name="twitter:card"'), `Missing twitter:card on ${url}`);

  // Semantic HTML5 landmarks
  assert(html.includes("<header"), `Missing <header> landmark on ${url}`);
  assert(html.includes("<nav"), `Missing <nav> landmark on ${url}`);
  assert(html.includes("<main"), `Missing <main> landmark on ${url}`);
  assert(html.includes("<footer"), `Missing <footer> landmark on ${url}`);

  // Heading hierarchy check (no skipped levels like h2 -> h4)
  assert(!/<h4\b/.test(html), `Unexpected skipped heading <h4> on ${url}`);

  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  assert(titleMatch && titleMatch[1], `Missing <title> on ${url}`);
  const title = titleMatch[1];
  assert(!titles.has(title), `Duplicate title "${title}" on ${url}`);
  titles.add(title);

  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(ldMatch && ldMatch[1], `Missing JSON-LD on ${url}`);
  const json = JSON.parse(ldMatch[1]);
  assert.equal(json["@graph"][0].url, url, `JSON-LD url mismatch on ${url}`);

  if (url.endsWith(".io/")) {
    for (const id of [
      "about-container",
      "experience-container",
      "projects-container",
      "infrastructure-container",
      "tech-stack-container",
    ]) {
      assert(html.includes(`id="${id}"`), `Missing prerendered section #${id} on homepage`);
    }
  }
}

console.log(
  `SEO & semantic checks passed for ${urls.length} static pages in out/: unique metadata, canonical URLs, semantic landmarks, heading hierarchy, JSON-LD, sitemap, robots.txt, and .nojekyll.`
);
