---
phase: 07-seo-and-analytics
plan: 01
subsystem: seo
tags: [metadata, seo, opengraph, twitter-card, hreflang, canonical, i18n, next-metadata]

# Dependency graph
requires:
  - phase: 03-flagship-pages
    provides: Home and About page components
  - phase: 04-service-pages
    provides: Service pages with hand-written metadata
  - phase: 06-compliance
    provides: Legal and FAQ pages with hand-written metadata
provides:
  - generatePageMetadata() centralized factory for all page SEO metadata
  - SITE_URL, ORG_NAME, DEFAULT_OG_IMAGE constants
  - Complete metadata (canonical, hreflang, OG, Twitter Card) on all 10 pages
  - Home and About generateMetadata exports (previously missing)
  - Meta i18n keys for home and about namespaces (RO and EN)
affects: [07-seo-and-analytics]

# Tech tracking
tech-stack:
  added: []
  patterns: [generatePageMetadata factory for consistent SEO metadata across all pages]

key-files:
  created:
    - src/lib/seo/constants.ts
    - src/lib/seo/metadata.ts
  modified:
    - src/app/[locale]/page.tsx
    - src/app/[locale]/despre-noi/page.tsx
    - src/app/[locale]/servicii/page.tsx
    - src/app/[locale]/servicii/[slug]/page.tsx
    - src/app/[locale]/contact/page.tsx
    - src/app/[locale]/intrebari-frecvente/page.tsx
    - src/app/[locale]/politica-confidentialitate/page.tsx
    - src/app/[locale]/politica-cookies/page.tsx
    - src/app/[locale]/termeni-si-conditii/page.tsx
    - src/app/[locale]/multumim/page.tsx
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "generatePageMetadata factory centralizes all SEO metadata generation — eliminates 40+ lines of boilerplate per page"
  - "SITE_URL constant eliminates all hardcoded URLs from page files"
  - "Preserved JSX JSON-LD script tags added by parallel Plan 02 execution — metadata.other with script:ld+json removed only where Plan 02 had already migrated to JSX"

patterns-established:
  - "SEO metadata pattern: every page exports generateMetadata using generatePageMetadata() from @/lib/seo/metadata"
  - "SEO constants pattern: all SEO-related constants in src/lib/seo/constants.ts (SITE_URL, ORG_NAME, DEFAULT_OG_IMAGE)"

requirements-completed: [SEO-02, SEO-03, SEO-04, SEO-08]

# Metrics
duration: 5min
completed: 2026-02-24
---

# Phase 07 Plan 01: SEO Metadata Summary

**Centralized generatePageMetadata() factory with canonical, hreflang, OG, and Twitter Card applied to all 10 pages via SITE_URL constant**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-24T11:02:35Z
- **Completed:** 2026-02-24T11:07:53Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Created centralized SEO metadata factory eliminating 40+ lines of boilerplate per page
- Added generateMetadata exports to Home and About pages (previously had none)
- All 10 pages now have complete metadata: title, description, canonical, hreflang (ro, en, x-default), Open Graph, Twitter Card
- Zero hardcoded `https://aceagency.ro` URLs remaining in any page file

## Task Commits

Each task was committed atomically:

1. **Task 1: Create SEO constants and metadata factory** - `7a8ac31` (feat)
2. **Task 2: Apply metadata factory to all pages, add missing i18n meta keys** - `4264f8e` (feat)

## Files Created/Modified
- `src/lib/seo/constants.ts` - SITE_URL, ORG_NAME, DEFAULT_OG_IMAGE constants
- `src/lib/seo/metadata.ts` - generatePageMetadata() factory function
- `src/app/[locale]/page.tsx` - Added generateMetadata with home meta keys
- `src/app/[locale]/despre-noi/page.tsx` - Added generateMetadata with about meta keys
- `src/app/[locale]/servicii/page.tsx` - Replaced hand-written metadata with factory
- `src/app/[locale]/servicii/[slug]/page.tsx` - Replaced hand-written metadata with factory, removed metadata.other
- `src/app/[locale]/contact/page.tsx` - Replaced hand-written metadata with factory
- `src/app/[locale]/intrebari-frecvente/page.tsx` - Replaced hand-written metadata with factory
- `src/app/[locale]/politica-confidentialitate/page.tsx` - Replaced hand-written metadata with factory
- `src/app/[locale]/politica-cookies/page.tsx` - Replaced hand-written metadata with factory
- `src/app/[locale]/termeni-si-conditii/page.tsx` - Replaced hand-written metadata with factory
- `src/app/[locale]/multumim/page.tsx` - Replaced hand-written metadata with factory (noIndex: true)
- `src/messages/ro.json` - Added home.meta and about.meta i18n keys
- `src/messages/en.json` - Added home.meta and about.meta i18n keys

## Decisions Made
- Used `generatePageMetadata()` factory pattern to centralize all metadata — single function handles canonical, hreflang, OG, Twitter Card, and noIndex
- Preserved JSX JSON-LD script tags added by parallel Plan 02 execution — only removed `metadata.other` where Plan 02 had already migrated schemas to JSX
- Homepage path uses empty string `''` producing canonical `https://aceagency.ro/ro` (no trailing slash)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Parallel plan modified page files**
- **Found during:** Task 2 (applying factory to pages)
- **Issue:** Plan 02 (JSON-LD schemas) had modified Home, About, Services, Contact, and Service sub-pages concurrently — adding JSON-LD JSX script tags and schema imports
- **Fix:** Adapted edits to preserve Plan 02's changes (JSON-LD scripts, schema imports) while replacing only the metadata portion
- **Files modified:** All 10 page files
- **Verification:** Build passes, JSON-LD scripts preserved, metadata factory applied
- **Committed in:** 4264f8e (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking — parallel file modification)
**Impact on plan:** Adaptation needed to coexist with parallel Plan 02 changes. No scope creep.

## Issues Encountered
None beyond the parallel modification handled above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All pages have complete SEO metadata via centralized factory
- Ready for Plan 02 (JSON-LD structured data) and Plan 03 (sitemap, robots, analytics)
- SITE_URL constant available for use by future SEO features

---
*Phase: 07-seo-and-analytics*
*Completed: 2026-02-24*
