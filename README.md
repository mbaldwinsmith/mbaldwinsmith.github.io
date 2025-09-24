# mbaldwinsmith.github.io

This repository contains the source code for my personal [Astro](https://astro.build/) site. It collects prayers, poetry, musings, portfolio work, and contact information in one place and is configured to deploy automatically to GitHub Pages.

## Prerequisites

- [Node.js](https://nodejs.org/) v18.17.0 or newer
- npm v9 or newer (bundled with recent Node.js releases)

You can verify your environment with:

```bash
node --version
npm --version
```

## Getting started

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:4321](http://localhost:4321).

## Project structure

- `src/` &ndash; page content, layouts, and components
- `public/` &ndash; static assets copied to the final build unchanged
- `astro.config.mjs` &ndash; site-wide Astro configuration
- `tsconfig.json` &ndash; TypeScript configuration for editor tooling

## Available scripts

- `npm run dev` &ndash; start the local development server
- `npm run build` &ndash; create a production build in `dist/`
- `npm run preview` &ndash; preview the production build locally
- `npm run check` &ndash; run type and Astro diagnostics

## Deployment

GitHub Actions builds the site and deploys the static output to the `gh-pages` environment whenever changes are pushed to the `main` branch.
