---
phase: 07-seo-and-analytics
plan: 03
subsystem: seo
tags: [sitemap, robots, vercel-analytics, ga4, gtm, datalayer]

# Dependency graph
requires:
  - phase: 07-01
    provides: "SITE_URL constant in seo/constants.ts"
  - phase: 07-02
    provides: "JSON-LD structured data on all pages"
  - phase: 06-01
    provides: "GTM Consent Mode v2 wiring and dataLayer type augmentation"
  - phase: 05-01
    provides: "ContactForm with useActionState and success redirect"
provides:
  - "Dynamic sitemap.xml with all pages in ro/en locales"
  - "robots.txt with crawl rules and sitemap reference"
  - "Vercel Analytics integration via <Analytics /> component"
  - "trackEvent() utility for GA4 events via GTM dataLayer"
  - "generate_lead GA4 event on contact form success"
affects: [08-performance]

# Tech tracking
tech-stack:
  added: ["@vercel/analytics"]
  patterns: ["trackEvent() dataLayer push pattern for GA4 events"]

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
    - src/lib/analytics.ts
  modified:
    - src/app/[locale]/layout.tsx
    - src/components/sections/contact/ContactForm.tsx

key-decisions:
  - "Reused Window.dataLayer type augmentation from gtm.ts instead of duplicate declaration in analytics.ts"
  - "Analytics component placed outside NextIntlClientProvider as sibling in body for reliability"

patterns-established:
  - "trackEvent(name, params) pattern: import from @/lib/analytics for any GA4 custom event"

requirements-completed: [SEO-07, CMPL-03, CMPL-08]

# Metrics
duration: 2min
completed: 2026-02-24
---

# Phase 7 Plan 3: Sitemap, Robots, Vercel Analytics, and GA4 Event Tracking Summary

**Dynamic sitemap.xml/robots.txt via Next.js file conventions, Vercel Analytics dashboard integration, and GA4 generate_lead event on contact form**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-24T11:09:52Z
- **Completed:** 2026-02-24T11:12:18Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Dynamic sitemap.xml listing all 28 URLs (8 static pages + 6 services x 2 locales) with priority/frequency
- robots.txt with Allow: /, Disallow: /multumim, and sitemap reference
- Vercel Analytics wired via `<Analytics />` in locale layout
- Type-safe trackEvent() utility pushing to GTM dataLayer
- generate_lead GA4 event fires on contact form success before redirect

## Task Commits

Each task was committed atomically:

1. **Task 1: Create sitemap.ts, robots.ts, and install Vercel Analytics** - `a6d0aad` (feat)
2. **Task 2: Add GA4 trackEvent utility and generate_lead event** - `20c4539` (feat)

## Files Created/Modified
- `src/app/sitemap.ts` - Dynamic sitemap with all pages in ro/en locales, excludes /multumim
- `src/app/robots.ts` - Robots.txt with Allow/Disallow rules and sitemap reference
- `src/lib/analytics.ts` - trackEvent() utility pushing custom events to GTM dataLayer
- `src/app/[locale]/layout.tsx` - Added @vercel/analytics import and `<Analytics />` component
- `src/components/sections/contact/ContactForm.tsx` - Added generate_lead event on form success

## Decisions Made
- Reused Window.dataLayer type augmentation from gtm.ts instead of adding a duplicate (conflicting modifiers) declaration in analytics.ts
- Analytics component placed as sibling outside NextIntlClientProvider in body tag for reliability per Vercel docs

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed duplicate Window.dataLayer type declaration**
- **Found during:** Task 2 (analytics.ts creation)
- **Issue:** analytics.ts declared `dataLayer?: Record<string, unknown>[]` (optional) conflicting with gtm.ts `dataLayer: Record<string, unknown>[]` (non-optional) - TypeScript error
- **Fix:** Removed global declaration from analytics.ts, added comment referencing gtm.ts augmentation
- **Files modified:** src/lib/analytics.ts
- **Verification:** Build passes
- **Committed in:** 20c4539 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Necessary fix for TypeScript compilation. No scope creep.

## Issues Encountered
None beyond the type declaration conflict resolved above.

## User Setup Required
None - no external service configuration required. Vercel Analytics activates automatically on Vercel deployment. GTM ID already configured via NEXT_PUBLIC_GTM_ID env var from Phase 6.

## Next Phase Readiness
- Phase 7 (SEO and Analytics) is now complete
- All SEO infrastructure in place: metadata factory, JSON-LD, sitemap, robots, analytics
- Ready for Phase 8 (Performance and Polish)

---
*Phase: 07-seo-and-analytics*
*Completed: 2026-02-24*
