# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-20)

**Core value:** A visually stunning, design-first website that positions AceAgency as a premium digital agency — the design IS the proof of capability.
**Current focus:** Phase 4 — Service Pages (In Progress)

## Current Position

Phase: 4 of 8 (Service Pages)
Plan: 3 of 3 in current phase
Status: Phase 4 complete — all 6 service sub-pages with full bilingual content
Last activity: 2026-02-21 — Completed 04-03-PLAN.md (Email Marketing & Consultanta i18n content)

Progress: [████████████░] 50% (12/24 plans estimated)

## Performance Metrics

**Velocity:**
- Total plans completed: 12
- Average duration: ~7 min (auto tasks only)
- Total execution time: ~1.5 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 37 min | 12 min |
| 02-design-system | 3/3 | interactive + 4 min | — |
| 03-flagship-pages | 3/3 | 14 min | 5 min |
| 04-service-pages | 3/3 | 18 min | 6 min |

**Recent Trend:**
- Last 5 plans: 03-03 (4 min), 04-01 (10 min), 04-02 (~4 min), 04-03 (4 min)
- Trend: Phase 4 plans 02-03 fast (content refinement of existing stubs created in 04-01)

*Updated after each plan completion*
| Phase 04 P03 | 4min | 2 tasks | 2 files |

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
- [02-03]: CustomCursor removed by user after implementation — system cursor preferred; component deleted, body class stripped from globals.css.
- [02-03]: Color palette canonicalized — Electric Violet (#650CBE), Cobalt Blue (#4500D0), Electric Mint (#66F3A6) stripped from codebase; Burgundy (#56151A) / Black (#262523) / Grey (#D9D9D9) / White is the only palette.
- [02-03]: Phase 2 fully verified — Header, Footer, MenuOverlay, TextReveal approved by user on desktop and mobile.
- [03-01]: tokens.css imported into globals.css — brings data-theme section theming CSS selectors into project cascade.
- [03-01]: SectionWrapper uses data-theme attribute — dark/light/burgundy section theming via CSS custom properties.
- [03-01]: TextReveal extended with variant=word and trigger=load — hero kinetic typography uses word-level stagger on mount.
- [03-01]: Service items keyed by numeric index (0-5) in i18n — array-like access pattern for translation keys.
- [03-01]: All 7 homepage section i18n keys pre-populated — includes Plan 02 stubs for stats, about, testimonials, cta, newsletter.
- [03-02]: CTASection accepts namespace prop for reuse on About page with different i18n namespace.
- [03-02]: Portfolio CTA button disabled (aria-disabled, pointer-events-none, opacity-50) since Portfolio is V2.
- [03-02]: Newsletter form UI-only with e.preventDefault() — server action wiring deferred to Phase 5.
- [03-02]: First 2 testimonial cards span 2 rows (lg:row-span-2) for bento visual variety.
- [03-02]: AboutPreview logo float animation uses GSAP yoyo with prefers-reduced-motion media query check.
- [03-03]: CTASection enhanced with secondaryHref prop — enables secondary button with link for About page (/servicii) while homepage keeps disabled Portfolio button.
- [03-03]: About page uses fragment wrapper instead of <main> to prevent nested landmarks (layout already provides <main>).
- [03-03]: StorySection visual column hidden on mobile (geometry + timeline too complex for narrow screens).
- [04-01]: Service icon mapping separated into service-icons.ts — LucideIcon components can't cross server/client boundary; use iconName strings resolved client-side.
- [04-01]: All 6 service i18n content added upfront — generateStaticParams generates all 6 slugs, so all need content to build. Plans 02/03 refine rather than create.
- [04-01]: Breadcrumb is a server component — no 'use client' needed since links and JSON-LD are static.
- [04-01]: Service sub-page template pattern: all 6 section components accept serviceKey prop, read from services.{serviceKey}.{section}.* i18n keys.
- [04-03]: Content refinement approach — Plan 01 added all 6 service stubs; Plan 03 expanded emailMarketing and consultanta to full spec (6 features, 7 FAQs, updated stats, diacritics, cross-service mentions).
- [04-03]: SEO title tags aligned exactly with Specificatii-Tehnice-SEO document for Email Marketing and Consultanta pages.

### Pending Todos

- Install Cal.com embed and test React 19 peer dep compatibility (Phase 5 / contact page)

### Blockers/Concerns

- **Cal.com embed**: `@calcom/embed-react` v1.5.3 has open React 19 peer dep issue (GitHub #20814). Test at Phase 1 scaffolding; inline script fallback documented in Phase 5 plan.
- ~~**GSAP SplitText license**: Requires Club GSAP membership.~~ **RESOLVED in 02-02**: SplitText ships with gsap@3.14.2 standard package. No license issue.
- **GTM Consent Mode v2**: Wiring the exact `dataLayer.push` pattern to shadcn-cookie-consent's callback API needs hands-on testing in Phase 6. Block Phase 7 analytics work on this being verified.

## Session Continuity

Last session: 2026-02-21
Stopped at: Completed 04-03-PLAN.md (Email Marketing & Consultanta i18n content — Phase 4 complete)
Resume file: None
