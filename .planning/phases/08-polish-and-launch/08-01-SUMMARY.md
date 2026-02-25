---
phase: 08-polish-and-launch
plan: 01
subsystem: ui
tags: [gsap, accessibility, wcag, prefers-reduced-motion, matchMedia, lenis]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: GSAP/ScrollTrigger setup and ScrollReveal component
  - phase: 02-design-system
    provides: TextReveal with matchMedia pattern (reference implementation)
  - phase: 04-service-pages
    provides: Service section components (ServicesGrid, ServiceFeatures, etc.)
provides:
  - All animation components respect prefers-reduced-motion
  - Lenis smooth scroll disabled when reduced motion preferred
  - WCAG 2.1 AA motion accessibility compliance
affects: [08-02, 08-03]

# Tech tracking
tech-stack:
  added: []
  patterns: [gsap.matchMedia reduced-motion wrapping for all animation components]

key-files:
  created: []
  modified:
    - src/components/animations/ScrollReveal.tsx
    - src/components/layout/SmoothScroll.tsx
    - src/components/sections/services/ServicesGrid.tsx
    - src/components/sections/services/ServiceFeatures.tsx
    - src/components/sections/services/ServiceProcess.tsx
    - src/components/sections/services/WhyChooseSection.tsx
    - src/components/sections/services/ProcessSteps.tsx

key-decisions:
  - "gsap.matchMedia wrapping pattern standardized across all animation components for reduced-motion support"
  - "SmoothScroll uses early-return pattern (skip Lenis entirely) rather than matchMedia wrapper"

patterns-established:
  - "Reduced-motion pattern: wrap gsap.from/to/fromTo in mm.add('(prefers-reduced-motion: no-preference)', ...) and add mm.add('(prefers-reduced-motion: reduce)', () => gsap.set(elements, { opacity: 1, y: 0 }))"
  - "SmoothScroll reduced-motion: early return from useEffect when window.matchMedia('(prefers-reduced-motion: reduce)').matches"

requirements-completed: [SEO-06, CMPL-04]

# Metrics
duration: 2min
completed: 2026-02-25
---

# Phase 08 Plan 01: Reduced-Motion Accessibility Summary

**GSAP matchMedia reduced-motion guards on all 7 animation components plus Lenis smooth scroll bypass for WCAG 2.1 AA compliance**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-25T11:36:28Z
- **Completed:** 2026-02-25T11:38:18Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- ScrollReveal and SmoothScroll retrofitted with prefers-reduced-motion handling
- 5 service section components (ServicesGrid, ServiceFeatures, ServiceProcess, WhyChooseSection, ProcessSteps) wrapped with matchMedia
- All animated elements immediately visible (opacity 1, y/x 0) when user prefers reduced motion
- Lenis smooth scroll falls back to native browser scrolling when reduced motion is active
- Production build passes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Retrofit ScrollReveal and SmoothScroll** - `c60c313` (feat)
2. **Task 2: Retrofit 5 service section components** - `17baa3f` (feat)

## Files Created/Modified
- `src/components/animations/ScrollReveal.tsx` - Added matchMedia with no-preference/reduce branches
- `src/components/layout/SmoothScroll.tsx` - Added early return when reduced motion preferred
- `src/components/sections/services/ServicesGrid.tsx` - Wrapped card stagger animation in matchMedia
- `src/components/sections/services/ServiceFeatures.tsx` - Wrapped feature card animation in matchMedia
- `src/components/sections/services/ServiceProcess.tsx` - Wrapped process step animation in matchMedia
- `src/components/sections/services/WhyChooseSection.tsx` - Wrapped differentiator animation in matchMedia
- `src/components/sections/services/ProcessSteps.tsx` - Wrapped step animation in matchMedia

## Decisions Made
- Used gsap.matchMedia pattern (matching TextReveal.tsx reference) for all GSAP animation components
- SmoothScroll uses early-return pattern instead of matchMedia wrapper since Lenis should be completely skipped (not just animated differently)
- In reduce branches, explicitly set elements to visible final state with gsap.set() to prevent invisible content

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All animation components now respect prefers-reduced-motion
- Ready for Plan 02 (performance optimization) and Plan 03 (final polish)
- WCAG 2.1 AA motion accessibility requirement satisfied

## Self-Check: PASSED

All 7 modified files verified present. Both task commits (c60c313, 17baa3f) verified in git log.

---
*Phase: 08-polish-and-launch*
*Completed: 2026-02-25*
