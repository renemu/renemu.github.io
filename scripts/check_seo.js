const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, 5);
const titles = new Set();
for (const url of urls) {
  const file = path.join(root, new URL(url).pathname, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert(html.includes(`rel="canonical" href="${url}"`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  assert(html.includes(`property="og:url" content="${url}"`));
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  assert(!titles.has(title)); titles.add(title);
  const json = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(json['@graph'][0].url, url);
  if (url.endsWith('.io/')) {
    for (const id of ['about', 'experience', 'projects', 'tech-stack', 'infrastructure']) {
      const content = html.match(new RegExp(`<!-- static:${id}-container:start -->([\\s\\S]*?)<!-- static:${id}-container:end -->`));
      assert(content && content[1].length > 100, `${id} not prerendered`);
    }
  }
}
console.log('SEO checks passed: unique metadata, canonical URLs, structured data, sitemap, and static content.');
