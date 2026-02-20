---
phase: 03-flagship-pages
plan: 02
subsystem: ui
tags: [countup, bento-grid, testimonials, cta, newsletter, gsap, next-intl, homepage]

# Dependency graph
requires:
  - phase: 03-flagship-pages
    provides: "SectionWrapper, SectionHeader, BentoGrid, CountUp, TextReveal, ScrollReveal, i18n stubs for Plan 02 sections"
  - phase: 02-design-system
    provides: "Design tokens, data-theme CSS selectors, brand colors"
provides:
  - "StatsSection (4-column animated count-up grid, light theme)"
  - "AboutPreview (two-column layout with floating AceAgency logo)"
  - "Testimonials (6-card bento grid with star ratings and hover lift)"
  - "CTASection (reusable burgundy CTA with TextReveal, namespace prop)"
  - "Newsletter (email form with GDPR checkbox, UI-only)"
  - "Complete homepage with all 7 sections wired in correct order"
affects: [03-03, 04-content-pages, 05-interactive]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Reusable CTA section with i18n namespace prop for cross-page reuse", "t.raw() for array-like i18n data access in stat/testimonial items"]

key-files:
  created:
    - src/components/sections/home/StatsSection.tsx
    - src/components/sections/home/AboutPreview.tsx
    - src/components/sections/home/Testimonials.tsx
    - src/components/sections/home/CTASection.tsx
    - src/components/sections/home/Newsletter.tsx
  modified:
    - src/app/[locale]/page.tsx
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "CTASection accepts namespace prop for reuse on About page with different i18n namespace"
  - "Portfolio CTA button disabled with aria-disabled and pointer-events-none since Portfolio is V2"
  - "Newsletter form is UI-only with e.preventDefault() — server action wiring deferred to Phase 5"
  - "First 2 testimonial cards span 2 rows (lg:row-span-2) for bento visual variety"
  - "AboutPreview logo uses GSAP yoyo float animation with prefers-reduced-motion check"

patterns-established:
  - "t.raw() for accessing i18n objects as typed data (StatItem, TestimonialItem interfaces)"
  - "CTASection namespace prop pattern: reusable section with different i18n contexts"

requirements-completed: [PAGE-01, DSGN-07, DSGN-09]

# Metrics
duration: 2min
completed: 2026-02-21
---

# Phase 3 Plan 02: Homepage Stats, About, Testimonials, CTA, Newsletter Summary

**Complete homepage with 7 sections: animated count-up stats, floating AceAgency logo preview, 6-card bento testimonials, burgundy CTA with TextReveal, and newsletter signup form with GDPR checkbox**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T22:06:39Z
- **Completed:** 2026-02-20T22:09:03Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Built all 5 remaining homepage sections completing the full 7-section homepage
- StatsSection with 4 animated CountUp numbers on light background with vertical dividers
- AboutPreview with agency text left, floating AceAgency logo right with brand glow backdrop
- Testimonials bento grid with 6 cards, star ratings, hover lift, first 2 cards tall for visual variety
- CTASection reusable via namespace prop, burgundy theme, TextReveal heading, Portfolio button disabled (V2)
- Newsletter section with email form and GDPR checkbox (UI-only, Phase 5 wiring)
- Added GDPR consent i18n key to newsletter namespace in both RO and EN

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Stats, About Preview, and Testimonials sections** - `64f7556` (feat)
2. **Task 2: Build CTA and Newsletter sections, wire all sections into homepage** - `847c28d` (feat)

## Files Created/Modified
- `src/components/sections/home/StatsSection.tsx` - 4-column stat grid with CountUp, light theme, vertical dividers
- `src/components/sections/home/AboutPreview.tsx` - Two-column layout with floating logo and brand glow
- `src/components/sections/home/Testimonials.tsx` - 6-card bento grid with star ratings and hover effects
- `src/components/sections/home/CTASection.tsx` - Reusable burgundy CTA with TextReveal and namespace prop
- `src/components/sections/home/Newsletter.tsx` - Newsletter form with GDPR checkbox, UI-only
- `src/app/[locale]/page.tsx` - Wired all 7 sections in correct render order
- `src/messages/ro.json` - Added newsletter.gdpr key
- `src/messages/en.json` - Added newsletter.gdpr key

## Decisions Made
- CTASection accepts `namespace` prop (default: 'home') enabling reuse on About page with different translations
- Portfolio CTA button rendered as disabled (aria-disabled, pointer-events-none, opacity-50) since Portfolio is V2
- Newsletter form prevents default only — no shared NewsletterForm component extraction yet (deferred to Phase 5)
- First 2 testimonial cards get `lg:row-span-2` for bento variety, remaining 4 are standard height
- AboutPreview logo float animation uses GSAP yoyo with prefers-reduced-motion media query check

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added GDPR consent i18n key to newsletter namespace**
- **Found during:** Task 1 (preparing i18n for newsletter)
- **Issue:** newsletter.gdpr key missing from home namespace in both ro.json and en.json
- **Fix:** Added `"gdpr": "Sunt de acord cu prelucrarea datelor personale"` (RO) and `"gdpr": "I agree to the processing of personal data"` (EN)
- **Files modified:** src/messages/ro.json, src/messages/en.json
- **Verification:** Build passes, key referenced in Newsletter component
- **Committed in:** 64f7556 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Missing i18n key would have caused runtime error. No scope creep.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Complete homepage with all 7 sections ready for visual verification
- CTASection reusable for About page (Plan 03) via namespace prop
- Newsletter form UI ready for Phase 5 server action wiring
- All section components follow established SectionWrapper + SectionHeader patterns

---
*Phase: 03-flagship-pages*
*Completed: 2026-02-21*
