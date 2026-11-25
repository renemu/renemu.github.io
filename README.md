# Muhammad Rifki Zulfikar — Portfolio

Personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and configured for **static export on GitHub Pages** (`https://renemu.github.io`).

## Tech Stack
- **Framework**: Next.js 15 (App Router, `output: "export"`)
- **Language**: TypeScript
- **Styling**: Bootstrap 5 CSS + Custom CSS Variables (Dark & Light theme) + Font Awesome 6 + Google Fonts (`Poppins`)
- **Deployment**: GitHub Actions → GitHub Pages (`out/`)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build & Verify Static Export

```bash
npm run typecheck
npm run build
npm run check:seo
```

The static site is generated in the `out/` directory.

## Deploying to GitHub Pages

1. Push your changes to the `master` branch.
2. In your GitHub repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically run typecheck, build `out/`, verify SEO metadata, and deploy to GitHub Pages.
