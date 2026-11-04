# SEO maintenance

Canonical domain: https://renemu.github.io

After changing `data.js`, `script.js`, or page templates, regenerate the static content and all page metadata:

```sh
node scripts/build_site.js
node scripts/check_seo.js
```

Use this full build instead of running `build_infra.js` alone. Commit the generated HTML, `robots.txt`, and `sitemap.xml` along with source changes. The build reuses the existing card renderers, so projects remain visible without JavaScript while search and filters still work with JavaScript enabled.

Each page has its own title, description, canonical URL, Open Graph/Twitter metadata, and JSON-LD. The homepage describes the person and website; infrastructure pages describe the collection or technical case study and breadcrumbs. Dates and ratings are not invented. Social previews currently use the existing portrait.

After deployment, verify the site in Google Search Console, submit `https://renemu.github.io/sitemap.xml`, and inspect the homepage and a case-study URL. These account actions are not performed by the local build. Indexing and ranking are controlled by search engines and are not guaranteed by metadata changes.

If the primary domain changes, update `origin` in `scripts/build_site.js`, rebuild, and configure hosting redirects separately.
