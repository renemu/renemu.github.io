# SEO maintenance

Canonical domain: `https://renemu.github.io`

After changing `src/data/portfolio.ts` or page templates, build and validate the static export:

```sh
npm run build
npm run check:seo
```

Next.js static export (`output: "export"`, `trailingSlash: true`) prerenders all pages into `out/`, including `robots.txt`, `sitemap.xml`, and `.nojekyll`.

Each page has its own title, description, canonical URL, Open Graph/Twitter metadata, and JSON-LD defined via `src/lib/seo.ts`:
- Homepage (`/`): `ProfilePage`, `Person`, `WebSite`
- Infrastructure index (`/infrastructure/`): `CollectionPage`, `BreadcrumbList`
- Case studies (`/infrastructure/<slug>/`): `TechArticle`, `BreadcrumbList`

If the primary domain changes, update `SITE_CONFIG.origin` in `src/data/portfolio.ts` and rebuild.
