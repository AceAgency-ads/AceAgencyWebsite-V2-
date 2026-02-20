# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-20)

**Core value:** A visually stunning, design-first website that positions AceAgency as a premium digital agency — the design IS the proof of capability.
**Current focus:** Phase 2 — Design System (In Progress)

## Current Position

Phase: 2 of 8 (Design System)
Plan: 2 of 3 in current phase
Status: In progress — Plans 02-01 and 02-02 complete, Plan 02-03 remaining
Last activity: 2026-02-20 — Completed 02-02-PLAN.md (Header, Footer, TextReveal)

Progress: [█████░░░░░] 21% (5/24 plans estimated)

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: ~10 min (auto tasks only)
- Total execution time: ~0.9 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 37 min | 12 min |
| 02-design-system | 2/3 | interactive + 4 min | — |

**Recent Trend:**
- Last 5 plans: 01-02 (2 min), 01-03 (5 min), 02-01 (interactive), 02-02 (4 min)
- Trend: Fast execution on component tasks; SplitText confirmed available without license

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Cal.com chosen over Calendly — open-source, more customizable; but `@calcom/embed-react` has a React 19 peer dep issue (#20814). Test npm install at Phase 1; use inline script fallback if needed.
- [Init]: Design-first build order — Homepage and About before service pages. Design IS the proof of capability.
- [Init]: No CMS in V1 — all content in `messages/ro.json` and `messages/en.json`.
- [Init]: GSAP SplitText requires Club GSAP license — evaluate at Phase 2/3; fall back to Framer Motion `staggerChildren` for character-level text animation if unlicensed.
- [01-01]: `turbopack.root: __dirname` set in next.config.ts — workspace has multiple package-lock.json files in parent dirs; this silences Next.js workspace root detection warning.
- [01-01]: `noUncheckedIndexedAccess` + `noImplicitOverride` added to tsconfig beyond basic strict — maximum type safety per CLAUDE.md requirements.
- [01-01]: shadcn/ui new-york style with neutral base and CSS variables — defaults selected match project requirements.
- [01-02]: `proxy.ts` used instead of `middleware.ts` — Next.js 16 renamed the middleware file.
- [01-02]: `localePrefix: 'always'` ensures `/` redirects to `/ro/` (default locale).
- [01-02]: Inner component pattern required for `useTranslations` — page is async (for await params), hook must be in sync child component.
- [01-02]: Root `src/app/layout.tsx` kept as minimal pass-through — `[locale]/layout.tsx` owns html/body/providers.
- [01-03]: Font WOFF2 conversion via Python fontTools (fonttools + brotli) — `fonttools convert` subcommand doesn't exist; use `TTFont.flavor = 'woff2'; TTFont.save(path)` Python API directly.
- [01-03]: Glacial Indifference sourced from font.download (ZIP) — GitHub raw binary links returned HTML; font.download provides proper OpenType ZIP.
- [01-03]: adjustFontFallback: 'Arial' on both custom fonts — critical for CLS = 0; auto-generates size-adjusted fallback metrics.
- [01-03]: shadcn semantic tokens remapped to brand oklch values in :root — keeps shadcn components brand-aligned while preserving semantic variable layer.
- [01-03]: ScrollTrigger.refresh() on window load inside useGSAP scope — prevents off-position triggers when fonts shift layout post-hydration (RESEARCH.md Pitfall 3).
- [01-03]: ScrollReveal exposes yOffset, duration, start props — avoids component proliferation for minor animation variations.
- [01-03]: Import all GSAP from @/lib/gsap (never directly from gsap package) — single plugin registration point established as team convention.
- [02-01]: Precision Elegance aesthetic direction chosen — geometric precision with premium warmth, aligned with addifico.com design sensibility.
- [02-01]: Color palette revised to Burgundy (#56151A) / Black (#262523) / Grey (#D9D9D9) — user-directed change from Electric Violet/Cobalt/Mint.
- [02-01]: 14 component patterns defined in components.md — reusable building blocks for all pages in Phases 3-5.
- [02-02]: SplitText confirmed available in standard gsap@3.14.2 — no Club GSAP license required. Blocker resolved.
- [02-02]: Header scroll hide/show uses ScrollTrigger direction detection with 60px threshold.
- [02-02]: MenuOverlay uses timeline-ref pattern: GSAP timeline in useRef, play/reverse controlled by React isOpen state.
- [02-02]: Glass morphism via CSS class toggle (.header-scrolled) — backdrop-blur-md on scroll past 50px.
- [02-02]: Newsletter form UI-only — GDPR checkbox included, server action wiring deferred to Phase 5.

### Pending Todos

- Install Cal.com embed and test React 19 peer dep compatibility (Phase 5 / contact page)

### Blockers/Concerns

- **Cal.com embed**: `@calcom/embed-react` v1.5.3 has open React 19 peer dep issue (GitHub #20814). Test at Phase 1 scaffolding; inline script fallback documented in Phase 5 plan.
- ~~**GSAP SplitText license**: Requires Club GSAP membership.~~ **RESOLVED in 02-02**: SplitText ships with gsap@3.14.2 standard package. No license issue.
- **GTM Consent Mode v2**: Wiring the exact `dataLayer.push` pattern to shadcn-cookie-consent's callback API needs hands-on testing in Phase 6. Block Phase 7 analytics work on this being verified.

## Session Continuity

Last session: 2026-02-20
Stopped at: Completed 02-02-PLAN.md (Header, Footer, TextReveal — SplitText confirmed available)
Resume file: None
