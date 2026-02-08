# Copilot instructions for this repo

## Big picture architecture
- Monorepo with two apps: Strapi backend in [iglesia-backend](iglesia-backend) and Astro frontend in [iglesia-front](iglesia-front).
- Backend content lives in Strapi content types under [iglesia-backend/src/api](iglesia-backend/src/api) and reusable components under [iglesia-backend/src/components](iglesia-backend/src/components).
- The Home page is a Strapi single type with a dynamic zone of blocks (hero, schedule, public-atention, priest group). See [iglesia-backend/src/api/home/content-types/home/schema.json](iglesia-backend/src/api/home/content-types/home/schema.json#L1-L27).
- Frontend pulls Strapi data via `fetchAPI()` in [iglesia-front/src/lib/strapi.ts](iglesia-front/src/lib/strapi.ts) and maps dynamic-zone blocks by `__component` in [iglesia-front/src/pages/index.astro](iglesia-front/src/pages/index.astro#L10-L107).

## Data flow and integration
- Frontend requests Strapi REST endpoints under /api, using `qs` to build populate queries (see `JSON_POPULATE` in [iglesia-front/src/pages/index.astro](iglesia-front/src/pages/index.astro#L10-L66)).
- Environment variables used by the frontend: `STRAPI_URL` (default http://localhost:1337) and optional `STRAPI_TOKEN` for auth, set in the Astro runtime (see [iglesia-front/src/lib/strapi.ts](iglesia-front/src/lib/strapi.ts)).
- Strapi database configuration defaults to sqlite and is driven by env vars like `DATABASE_CLIENT` and `DATABASE_FILENAME` in [iglesia-backend/config/database.ts](iglesia-backend/config/database.ts).

## Developer workflows
- Backend (from iglesia-backend): run npm run dev/develop to start Strapi with auto reload; npm run build/start for production; run npm run seed:example to import sample data and uploads (seed logic in [iglesia-backend/scripts/seed.js](iglesia-backend/scripts/seed.js)).
- Frontend (from iglesia-front): run npm run dev for Astro dev server, npm run build for static build, npm run preview to preview.

## Project-specific conventions
- Strapi controllers/services are mostly default factories (see [iglesia-backend/src/api/home/controllers/home.ts](iglesia-backend/src/api/home/controllers/home.ts)); customization typically happens by editing content-type schemas and component definitions rather than custom code.
- Seed media files live in [iglesia-backend/data/uploads](iglesia-backend/data/uploads) and content in [iglesia-backend/data/data.json](iglesia-backend/data/data.json), which the seed script uploads and wires into entries.
- Styling in the frontend uses Tailwind via the Vite plugin config in [iglesia-front/astro.config.mjs](iglesia-front/astro.config.mjs), with global styles in [iglesia-front/src/styles/global.css](iglesia-front/src/styles/global.css).
