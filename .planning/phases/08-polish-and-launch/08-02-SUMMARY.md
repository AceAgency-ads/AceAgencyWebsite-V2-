---
phase: 08-polish-and-launch
plan: 02
subsystem: infra
tags: [security-headers, hsts, 404-page, next-intl, i18n]

requires:
  - phase: 01-foundation
    provides: next-intl routing, locale layout, next.config.ts base
provides:
  - Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) on all routes
  - Branded locale-aware 404 page with i18n
  - Global fallback 404 page for unknown paths
affects: [08-03-PLAN]

tech-stack:
  added: []
  patterns: [security-headers-via-next-config, dual-404-pattern]

key-files:
  created:
    - src/app/[locale]/not-found.tsx
    - src/app/not-found.tsx
  modified:
    - next.config.ts
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "CSP header deferred — too complex with GTM, Cal.com, Google Maps, Analytics, and fonts"
  - "HTTPS/non-www redirects handled by Vercel infrastructure — no custom code needed (CMPL-06)"
  - "Global fallback 404 uses inline styles — renders outside any layout so Tailwind unavailable"

patterns-established:
  - "Dual 404 pattern: [locale]/not-found.tsx for programmatic notFound(), root not-found.tsx for truly unknown URLs"

requirements-completed: [CMPL-05, CMPL-06, CMPL-07]

duration: 3min
completed: 2026-02-25
---

# Phase 8 Plan 2: Security Headers & 404 Pages Summary

**Security headers (HSTS, nosniff, SAMEORIGIN, strict-origin) on all routes plus branded bilingual 404 pages**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-25T11:36:34Z
- **Completed:** 2026-02-25T11:39:14Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Security headers configured on all routes via next.config.ts async headers()
- Locale-aware 404 page with useTranslations for RO/EN, brand-consistent design
- Global fallback 404 page with inline styles for completely unknown paths
- HTTPS and non-www redirects documented as Vercel-handled (CMPL-06)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add security headers to next.config.ts** - `c60c313` (feat, included in 08-01 commit)
2. **Task 2: Create branded 404 page with bilingual support** - `9522760` (feat)

## Files Created/Modified
- `next.config.ts` - Added securityHeaders array and async headers() function
- `src/app/[locale]/not-found.tsx` - Locale-aware 404 with useTranslations, burgundy accent, Link to home
- `src/app/not-found.tsx` - Global fallback 404 with inline styles, hardcoded Romanian, link to /ro/
- `src/messages/ro.json` - Added notFound namespace (title, heading, description, backHome)
- `src/messages/en.json` - Added notFound namespace (title, heading, description, backHome)

## Decisions Made
- CSP header deferred per research recommendation — complex with GTM, Cal.com, Google Maps, Analytics, fonts
- HTTPS/non-www redirects handled by Vercel infrastructure, no custom code (CMPL-06 satisfied)
- Global fallback 404 uses inline styles since it renders outside any layout (no Tailwind available)
- Locale-aware 404 uses burgundy (#56151A) accent color and dark background matching site design

## Deviations from Plan

### Task 1 Already Committed

Task 1 (security headers in next.config.ts) was already included in the 08-01 plan commit `c60c313`. The headers were added as part of the accessibility/polish work. No duplicate commit created.

---

**Total deviations:** 1 (Task 1 already committed by prior plan)
**Impact on plan:** None — security headers were already correctly configured.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Security headers active on all routes, ready for production
- Both 404 pages ready for edge cases
- CMPL-05, CMPL-06, CMPL-07 requirements satisfied
- Ready for 08-03 (final pre-launch verification)

## Self-Check: PASSED

All files exist, all commits verified.

---
*Phase: 08-polish-and-launch*
*Completed: 2026-02-25*
