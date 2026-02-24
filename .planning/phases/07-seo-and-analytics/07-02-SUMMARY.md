---
phase: 07-seo-and-analytics
plan: 02
subsystem: seo
tags: [json-ld, schema.org, structured-data, rich-results, breadcrumbs]

# Dependency graph
requires:
  - phase: 04-service-pages
    provides: Service sub-pages with breadcrumb navigation
  - phase: 06-compliance-legal
    provides: Legal pages and FAQ page with breadcrumb components
provides:
  - Centralized JSON-LD schema builders (Organization, LocalBusiness, Service, FAQ, BreadcrumbList)
  - renderJsonLd XSS-safe serialization helper
  - JSON-LD structured data on all 9 indexed pages via JSX script tags
affects: [07-seo-and-analytics]

# Tech tracking
tech-stack:
  added: []
  patterns: [centralized-schema-builders, jsx-json-ld-injection, xss-safe-serialization]

key-files:
  created:
    - src/lib/seo/schemas.ts
  modified:
    - src/app/[locale]/page.tsx
    - src/app/[locale]/despre-noi/page.tsx
    - src/app/[locale]/servicii/page.tsx
    - src/app/[locale]/servicii/[slug]/page.tsx
    - src/app/[locale]/contact/page.tsx
    - src/components/sections/services/ServiceFAQ.tsx
    - src/components/sections/faq/FAQPageContent.tsx

key-decisions:
  - "Breadcrumb component kept as-is for BreadcrumbList JSON-LD -- already renders correctly via JSX script tag, no duplication"
  - "ServiceFAQ and FAQPageContent migrated to centralized faqSchema builder with renderJsonLd for consistent XSS protection"
  - "metadata.other['script:ld+json'] completely removed -- renders as <meta> not <script>, breaking structured data"

patterns-established:
  - "JSON-LD via JSX: Always use <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: renderJsonLd(schema) }} /> pattern"
  - "Schema builders: Import from @/lib/seo/schemas for all structured data needs"

requirements-completed: [SEO-01, SEO-05]

# Metrics
duration: 4min
completed: 2026-02-24
---

# Phase 07 Plan 02: JSON-LD Schema Markup Summary

**Centralized JSON-LD schema builders with Organization, LocalBusiness, Service, FAQ, BreadcrumbList injected into all 9 pages via JSX script tags**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-24T11:02:37Z
- **Completed:** 2026-02-24T11:07:00Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Created centralized schema builder library with 5 functions + renderJsonLd helper
- Injected JSON-LD structured data into all 9 indexed pages (homepage, about, services, service sub-pages, contact, FAQ, privacy, cookies, terms)
- Removed broken metadata.other['script:ld+json'] pattern from service sub-pages and contact page
- Migrated ServiceFAQ and FAQPageContent to use centralized faqSchema builder with XSS-safe serialization

## Task Commits

Each task was committed atomically:

1. **Task 1: Create JSON-LD schema builder functions** - `ac0f63c` (feat)
2. **Task 2: Inject JSON-LD into all pages and verify breadcrumbs** - `7fbaa40` (feat)

## Files Created/Modified
- `src/lib/seo/schemas.ts` - Centralized JSON-LD schema builder functions (Organization, LocalBusiness, Service, FAQ, BreadcrumbList) + renderJsonLd helper
- `src/app/[locale]/page.tsx` - Added Organization + LocalBusiness JSON-LD
- `src/app/[locale]/despre-noi/page.tsx` - Added Organization JSON-LD
- `src/app/[locale]/servicii/page.tsx` - Added Organization JSON-LD
- `src/app/[locale]/servicii/[slug]/page.tsx` - Moved Service JSON-LD from metadata.other to JSX script tag
- `src/app/[locale]/contact/page.tsx` - Removed metadata.other Organization schema, added via JSX
- `src/components/sections/services/ServiceFAQ.tsx` - Migrated to centralized faqSchema + renderJsonLd
- `src/components/sections/faq/FAQPageContent.tsx` - Migrated to centralized faqSchema + renderJsonLd

## Decisions Made
- Breadcrumb component already renders BreadcrumbList JSON-LD correctly via JSX -- kept as-is to avoid duplicate breadcrumb schemas
- metadata.other['script:ld+json'] completely removed because it renders as `<meta>` tags instead of `<script>` tags, making structured data invisible to Google
- FAQ and legal pages unchanged at page level since their JSON-LD was already working (FAQ via FAQPageContent component, legal via Breadcrumb component)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All JSON-LD structured data in place for Google Rich Results
- Ready for Plan 03 (analytics integration)
- Schemas can be extended with Article schema when blog is built (V2)

## Self-Check: PASSED

All files exist and all commits verified.

---
*Phase: 07-seo-and-analytics*
*Completed: 2026-02-24*
