# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-20)

**Core value:** A visually stunning, design-first website that positions AceAgency as a premium digital agency — the design IS the proof of capability.
**Current focus:** Phase 1 — Foundation (COMPLETE)

## Current Position

Phase: 1 of 8 (Foundation)
Plan: 3 of 3 in current phase
Status: Phase complete — ready for Phase 2
Last activity: 2026-02-20 — Completed 01-03-PLAN.md (Fonts, Brand Tokens, GSAP, Animations)

Progress: [███░░░░░░░] 13% (3/24 plans estimated)

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 12 min
- Total execution time: 0.6 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 37 min | 12 min |

**Recent Trend:**
- Last 5 plans: 01-01 (30 min), 01-02 (2 min), 01-03 (5 min)
- Trend: Fast execution on infrastructure tasks

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

### Pending Todos

- Install Cal.com embed and test React 19 peer dep compatibility (Phase 5 / contact page)

### Blockers/Concerns

- **Cal.com embed**: `@calcom/embed-react` v1.5.3 has open React 19 peer dep issue (GitHub #20814). Test at Phase 1 scaffolding; inline script fallback documented in Phase 5 plan.
- **GSAP SplitText license**: Requires Club GSAP membership. Verify before using in Phase 3 hero animations. Framer Motion `staggerChildren` is the zero-cost alternative. Standard GSAP (useGSAP, ScrollTrigger) confirmed available without license.
- **GTM Consent Mode v2**: Wiring the exact `dataLayer.push` pattern to shadcn-cookie-consent's callback API needs hands-on testing in Phase 6. Block Phase 7 analytics work on this being verified.

## Session Continuity

Last session: 2026-02-20T16:45:05Z
Stopped at: Completed 01-03-PLAN.md (fonts, brand tokens, GSAP, ScrollReveal, Container)
Resume file: None
