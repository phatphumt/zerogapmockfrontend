# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 5173 (does not auto-open browser).
- `npm run build` — `tsc -b && vite build`. Type errors fail the build.
- `npm run lint` — type-check only (`tsc -b --noEmit`). There is no ESLint/Prettier config; TypeScript strict mode is the lint.
- `npm run preview` — serve the production build.

No test runner is configured. If asked to add tests, propose a framework choice (Vitest is the natural fit for Vite + React) before installing.

## Stack

React 18 + TypeScript (strict, `noUnusedLocals`/`noUnusedParameters` on) + Vite 5. Tailwind v4 beta (`@tailwindcss/postcss`) — config lives in CSS via `@theme`, not `tailwind.config.js`. Routing: react-router-dom v6 (`createBrowserRouter`). State: Zustand with `persist` to `localStorage` (key `zerogap`). Charts: Recharts. Forms: react-hook-form + zod. Path alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

## Architecture

Frontend-only mockup. No backend, no API layer — every "AI" response and every score is computed locally from data files in `src/data/` and pure functions in `src/lib/`. The product is a Thai-language TCAS (university admissions) prep app; UI copy is Thai.

**Single store, derived everywhere.** `src/lib/store.ts` is the only mutable state. All scores (skill vector, readiness, EXP/level, radar series) are derived on render via pure functions in `src/lib/`. Don't cache derived values into the store.

Key derivations and their ownership:
- `lib/skills.ts` — `currentVector()` = baseline (from survey level + assets) + per-completed-node axis bumps + simulation deltas. `targetVector()` is the chosen career's profile.
- `lib/readiness.ts` — `readinessFor({ universityId, ... })` weights the four pillars: 40% skills (university-weighted), 30% portfolio, 20% simulation, 10% roadmap.
- `lib/exp.ts` — level curve: `level = floor(sqrt(xp/50)) + 1`. Don't change without updating the dashboard's progress bar.
- `lib/tcas.ts` — TCAS round dates are hardcoded for cycle 69. Update `TCAS_TARGETS` when the cycle rolls over.
- `lib/copilot.ts` — `parse()` is the "AI" copilot: regex-based intent detection (completion / next / status) over Thai+English keywords, returns a reply message and an action (e.g., `mark-done`). Roadmap nodes match by `keywords[]` substring. New nodes need keywords or the copilot can't recognize them.

**Routing and gating.** `src/routes.tsx` defines three zones: public Landing, the onboarding wizard (`/onboarding/level → career → university → assets → results`), and the authenticated app (`AppShell` with Dashboard / Roadmap / Simulation / Portfolio). `RequireProfile` redirects to `/onboarding/level` if `store.profile` is null — that's how "logged in" is modeled. The profile is created at the end of onboarding via `saveProfile`.

**Roadmap graph.** `src/data/roadmap-nodes.ts` is a DAG: each node has `prereqIds`, `axisFocus` (which `SkillAxis` it boosts on completion), and `keywords` (used by the copilot to match user messages). `isUnlocked(node, completed)` is the single gate. Completing a node awards `expReward` XP and a +5 bump on its axis.

## Design system

`DESIGN.md` is authoritative for visual tokens — colors, type scale, spacing, radii, component specs (the "Integrated Biosciences / Dark Academia Laboratory" language). Tokens are mirrored in `src/styles/globals.css` under `@theme` so Tailwind v4 picks them up as utilities (e.g., `bg-carbon`, `text-bio-green`, `rounded-cards`). Reusable component classes (`.bento-card`, `.btn-primary`, `.mono-tag`, `.input`) are also in `globals.css`. Prefer those over re-defining the same look inline.

Hard rules from DESIGN.md that the visual review will catch:
- No drop shadows. Surface differentiation comes from background color + 1px border only.
- Bio-Green (`#cef79e`) is an accent, never a primary CTA fill — the primary CTA is solid Carbon (`#222f30`).
- Cards use 40px radius; buttons and inputs use 8px.
- Latin text uses tight tracking (`-0.02em` on headlines). Thai text must not — `:lang(th)` in `globals.css` neutralizes letter-spacing. Keep that rule intact when editing global styles.
- Fonts: Aspekta (with Inter/Anuphan fallbacks for Thai) for everything; Roboto Mono only for small data labels.

## Conventions

- All UI strings are Thai. Keep them in Thai unless told otherwise.
- Use the `@/` alias for cross-directory imports; relative imports are fine within the same folder.
- IDs for transient items (chat messages, portfolio entries) come from `uid()` in `src/lib/store.ts`.
- The store is persisted — schema-incompatible changes to `ZeroGapState` require bumping the `version` in the `persist` config and (ideally) a `migrate` function, otherwise users with prior localStorage will hit a render error.
