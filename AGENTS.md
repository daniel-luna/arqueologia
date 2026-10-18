# AGENTS.md

Frontend-only React 19 + TypeScript SPA ("ARqueologIA Rupestre") talking directly to Supabase (Postgres + Auth + RLS). There is NO backend to build: `docs/ARqueologIA_Rupestre_Especificacion_v3.md` describes an aspirational Node/Express/MySQL architecture that was superseded — the source of truth is `docs/ARqueologIA_Supabase_Development_Package/` plus the code (frontend only, per `05_AGENT_PROMPT.md`).

Language: code comments, error messages, UI text, routes (`/mapa`, `/sitio/:id`, `/registro`), and docs are all in Spanish — keep new ones in Spanish.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (this is also the typecheck; no separate typecheck script)
- `npm run lint` — type-aware ESLint (`strictTypeChecked`); depends on the referenced tsconfigs, so broken types fail lint too
- `npm run format` — Prettier, only covers `src/**/*.{ts,tsx,css}`

No test framework exists. The spec's "80% coverage" is aspirational — do not assume `npm test` works.

## Environment

Requires `.env` (gitignored; see `.env.example`) with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. `src/lib/supabase.ts` throws at import time if either is missing, so the app won't boot at all without them.

## Architecture

- Entry: `src/main.tsx` → `App.tsx` → `src/providers/app.provider.tsx` (QueryClient + BrowserRouter + AuthProvider) → `src/app/router.tsx` (lazy routes + Suspense).
- Strict layering: components → hooks (`src/hooks/`, TanStack Query) → services (`src/services/*.service.ts`) → supabase-js. Components never call Supabase directly; services never use React. Query keys live in `src/constants`.
- Path alias `@/` → `src/`, configured in both `vite.config.ts` and `tsconfig.app.json` (keep both in sync).
- Tailwind CSS v4 via `@tailwindcss/vite` — there is no `tailwind.config`; theme tokens are CSS variables in `src/styles/globals.css`. shadcn/ui components in `src/components/ui` (`components.json`), `cn()` in `src/utils`.
- Map: react-leaflet + leaflet.markercluster. Markercluster has no official types — ambient declarations are hand-written in `src/types/leaflet.markercluster.d.ts`; update it if you touch clustering APIs.

## Supabase

- `src/types/database.ts` is a hand-written stand-in for generated types. To regenerate: `supabase gen types typescript --linked > src/types/database.ts` (keep the `Database` shape). The client in `src/lib/supabase.ts` is not generic-typed; services cast query results.
- RLS is enforced server-side, not in the client (see `03_RLS_POLICY_GUIDE.md`): sites are public-read/admin-write; reviews are public-read, authenticated-insert, owner-update/delete. Coordinate privacy (`visibility_level`: PUBLIC/APPROXIMATE/HIDDEN) must stay enforced by RLS — never "fix" it by filtering coordinates in the frontend.
- Current tables: `sites`, `reviews`. `profiles`, `site_images`, `ar_elements` are planned (see `01_SUPABASE_ARCHITECTURE.md`) but not implemented.

## Style

- Prettier: double quotes, semicolons, 2-space indent, trailing commas, width 90 (`.prettierrc`).
- ESLint errors on unused vars unless prefixed with `_`.
