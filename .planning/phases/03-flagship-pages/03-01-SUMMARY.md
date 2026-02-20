---
phase: 03-flagship-pages
plan: 01
subsystem: ui
tags: [gsap, splittext, next-intl, bento-grid, parallax, countup, homepage, hero, sections]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Next.js scaffold, GSAP setup, fonts, i18n routing"
  - phase: 02-design-system
    provides: "Design tokens, Header, Footer, TextReveal, ScrollReveal, Container"
provides:
  - "SectionWrapper (data-theme theming for dark/light/burgundy)"
  - "SectionHeader (overline + heading + description pattern)"
  - "BentoGrid (responsive CSS Grid with GSAP stagger)"
  - "CountUp (GSAP number animation on scroll)"
  - "ParallaxLayer (scrub parallax, desktop only)"
  - "TextReveal word variant + load trigger"
  - "HeroSection (kinetic word-level typography, dual CTAs, scroll indicator)"
  - "ServicesPreview (6-card bento grid with hover micro-interactions)"
  - "Complete home i18n namespace (all 7 sections, RO + EN)"
affects: [03-02, 03-03, 04-content-pages, 05-interactive]

# Tech tracking
tech-stack:
  added: []
  patterns: ["data-theme section theming via CSS custom properties", "SectionWrapper + SectionHeader reusable section pattern", "BentoGrid stagger animation pattern", "TextReveal word/char variant with scroll/load trigger"]

key-files:
  created:
    - src/components/sections/SectionWrapper.tsx
    - src/components/sections/SectionHeader.tsx
    - src/components/sections/BentoGrid.tsx
    - src/components/animations/CountUp.tsx
    - src/components/animations/ParallaxLayer.tsx
    - src/components/sections/home/HeroSection.tsx
    - src/components/sections/home/ServicesPreview.tsx
  modified:
    - src/styles/globals.css
    - src/components/animations/TextReveal.tsx
    - src/app/[locale]/page.tsx
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "tokens.css imported into globals.css via relative path from src/styles/"
  - "SectionWrapper uses data-theme attribute matching CSS selectors in tokens.css for section theming"
  - "TextReveal extended with variant=word and trigger=load for hero kinetic typography"
  - "Service items keyed by numeric index in i18n (0-5) for array-like access"
  - "All 7 homepage section i18n keys pre-populated including Plan 02 stubs"

patterns-established:
  - "SectionWrapper + SectionHeader: standard section layout pattern for all pages"
  - "BentoGrid data-animate=card: child targeting pattern for stagger animations"
  - "gsap.matchMedia for reduced motion: all animation components check prefers-reduced-motion"
  - "ParallaxLayer desktop-only: parallax disabled below 1024px breakpoint"

requirements-completed: [PAGE-01, DSGN-02, DSGN-03, DSGN-04, DSGN-06, DSGN-08]

# Metrics
duration: 8min
completed: 2026-02-21
---

# Phase 3 Plan 01: Hero + Services Foundation Summary

**Homepage hero with word-level kinetic typography, services bento grid with hover interactions, and 5 reusable section components (SectionWrapper, SectionHeader, BentoGrid, CountUp, ParallaxLayer)**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-20T22:00:26Z
- **Completed:** 2026-02-20T22:08:26Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Built 5 reusable section components that all subsequent page plans depend on
- Implemented homepage hero with word-level SplitText kinetic typography on page load
- Implemented services preview with 6-card bento grid, stagger animations, and hover lift + burgundy shadow
- Extended TextReveal with word variant and load trigger (backward compatible)
- Added complete bilingual i18n content for all 7 homepage sections (hero, services, stats, about, testimonials, cta, newsletter)

## Task Commits

Each task was committed atomically:

1. **Task 1: Import tokens.css, add data-theme CSS, and build foundation section components** - `8763bad` (feat)
2. **Task 2: Build Homepage Hero and Services Preview sections with full i18n content** - `b9327d7` (feat)

## Files Created/Modified
- `src/components/sections/SectionWrapper.tsx` - Section theming via data-theme attribute with Container wrapper
- `src/components/sections/SectionHeader.tsx` - Reusable overline + heading + description with ScrollReveal
- `src/components/sections/BentoGrid.tsx` - Responsive CSS Grid with GSAP stagger animation
- `src/components/animations/CountUp.tsx` - GSAP-powered number count-up on scroll
- `src/components/animations/ParallaxLayer.tsx` - GSAP ScrollTrigger scrub parallax (desktop only)
- `src/components/animations/TextReveal.tsx` - Extended with word variant and load trigger
- `src/components/sections/home/HeroSection.tsx` - Hero with kinetic headline, CTAs, scroll indicator, brand glow
- `src/components/sections/home/ServicesPreview.tsx` - 6-card bento grid with hover micro-interactions
- `src/styles/globals.css` - Added tokens.css import
- `src/app/[locale]/page.tsx` - Replaced placeholder with HeroSection + ServicesPreview
- `src/messages/ro.json` - Complete home namespace (RO)
- `src/messages/en.json` - Complete home namespace (EN)

## Decisions Made
- tokens.css imported via relative path `../../design-system/tokens.css` from `src/styles/` - brings all data-theme selectors into the project CSS cascade
- SectionWrapper is a server component (no 'use client') - children handle their own client-side logic
- Service items use numeric string keys ("0"-"5") in i18n for indexed access via `t('services.items.${key}.title')`
- Stub i18n keys for Plan 02 sections (stats, about, testimonials, cta, newsletter) added now to complete the namespace
- Hero brand glow uses `var(--ds-gradient-brand-glow)` with ParallaxLayer for depth on desktop

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All reusable section components ready for Plans 02 and 03
- i18n content pre-populated for remaining homepage sections (Plan 02)
- Homepage renders hero + services; Plan 02 adds stats, about, testimonials, CTA, newsletter

---
*Phase: 03-flagship-pages*
*Completed: 2026-02-21*
