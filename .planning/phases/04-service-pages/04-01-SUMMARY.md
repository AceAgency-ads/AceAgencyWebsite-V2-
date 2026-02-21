---
phase: 04-service-pages
plan: 01
subsystem: ui
tags: [next.js, services, seo, json-ld, accordion, radix, gsap, i18n, breadcrumb]

# Dependency graph
requires:
  - phase: 02-design-system
    provides: SectionWrapper, SectionHeader, TextReveal, ScrollReveal, CountUp, SpotlightCard
  - phase: 03-flagship-pages
    provides: CTASection with namespace prop, AboutHero inner-page pattern, i18n structure
provides:
  - Service registry (SERVICE_DEFINITIONS, getServiceBySlug) for all 6 services
  - 4 Services index sections (ServicesHero, ServicesGrid, ProcessSteps, WhyChooseSection)
  - 6 reusable Service sub-page sections (ServiceHero, ServiceFeatures, ServiceProcess, ServiceStats, ServiceFAQ, ServiceCTA)
  - Reusable Breadcrumb component with BreadcrumbList JSON-LD
  - Dynamic [slug] route with generateStaticParams for 6 services
  - Full bilingual i18n content for all 6 services + services index
  - shadcn Accordion (Radix) for FAQ sections
affects: [04-02, 04-03, 05-contact-page]

# Tech tracking
tech-stack:
  added: ["@radix-ui/react-accordion (via shadcn)"]
  patterns: ["service registry with icon name strings for server/client boundary", "dynamic route with generateStaticParams + generateMetadata", "FAQ accordion with FAQPage JSON-LD", "Breadcrumb with BreadcrumbList JSON-LD", "Service JSON-LD schema in metadata"]

key-files:
  created:
    - src/lib/services.ts
    - src/lib/service-icons.ts
    - src/components/sections/Breadcrumb.tsx
    - src/components/sections/services/ServicesHero.tsx
    - src/components/sections/services/ServicesGrid.tsx
    - src/components/sections/services/ProcessSteps.tsx
    - src/components/sections/services/WhyChooseSection.tsx
    - src/components/sections/services/ServiceHero.tsx
    - src/components/sections/services/ServiceFeatures.tsx
    - src/components/sections/services/ServiceProcess.tsx
    - src/components/sections/services/ServiceStats.tsx
    - src/components/sections/services/ServiceFAQ.tsx
    - src/components/sections/services/ServiceCTA.tsx
    - src/app/[locale]/servicii/page.tsx
    - src/app/[locale]/servicii/[slug]/page.tsx
    - src/components/ui/accordion.tsx
  modified:
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "Service icon mapping separated into service-icons.ts to avoid server/client serialization boundary error"
  - "All 6 service i18n content added upfront (not just Google Ads) to prevent build errors from generateStaticParams"
  - "Service registry uses iconName strings instead of LucideIcon components for server safety"

patterns-established:
  - "Service sub-page template: serviceKey prop pattern where all sections read from services.{serviceKey}.{section}.* i18n keys"
  - "Breadcrumb component: server component with JSON-LD schema, reusable across all non-homepage pages"
  - "FAQ accordion: shadcn Accordion type=single collapsible with FAQPage JSON-LD auto-generated from i18n items"

requirements-completed: [PAGE-03, PAGE-04]

# Metrics
duration: 10min
completed: 2026-02-21
---

# Phase 4 Plan 01: Services Infrastructure Summary

**Services index page with 7-card bento grid + dynamic sub-page route with 6 reusable section components, FAQ accordion with JSON-LD, and full bilingual content for all 6 services including Google Ads**

## Performance

- **Duration:** 10 min
- **Started:** 2026-02-21T03:09:21Z
- **Completed:** 2026-02-21T03:19:40Z
- **Tasks:** 2
- **Files modified:** 18

## Accomplishments
- Services index page at /servicii with hero, 7-card services grid, process steps, why-choose-us, and CTA sections in both RO and EN
- Dynamic service sub-page route generating all 6 services statically with ServiceHero, ServiceFeatures, ServiceProcess, ServiceStats, ServiceFAQ, ServiceCTA
- Reusable Breadcrumb component with BreadcrumbList JSON-LD schema used on both index and sub-pages
- FAQ accordion with FAQPage JSON-LD schema, keyboard accessible (Tab + Enter/Space)
- Full bilingual i18n content for all 6 services (not just Google Ads), enabling Plans 02/03 to refine rather than create content from scratch
- SEO metadata on all pages: unique titles, meta descriptions, canonical URLs, hreflang alternates, OG tags, Twitter Cards

## Task Commits

Each task was committed atomically:

1. **Task 1: Service registry, shadcn Accordion, Breadcrumb, and Services index page** - `8f4b76d` (feat)
2. **Task 2: Dynamic service sub-pages with 6 sections and full bilingual content** - `df04327` (feat)

## Files Created/Modified
- `src/lib/services.ts` - Service registry with 6 service definitions (slug, i18nKey, iconName)
- `src/lib/service-icons.ts` - Client-safe icon resolution from icon name strings
- `src/components/sections/Breadcrumb.tsx` - Reusable breadcrumb with BreadcrumbList JSON-LD
- `src/components/sections/services/ServicesHero.tsx` - Services index hero with TextReveal h1
- `src/components/sections/services/ServicesGrid.tsx` - 7-card bento grid with SpotlightCard hover
- `src/components/sections/services/ProcessSteps.tsx` - 4-step process with GSAP stagger animation
- `src/components/sections/services/WhyChooseSection.tsx` - Stats CountUp + differentiators list
- `src/components/sections/services/ServiceHero.tsx` - Sub-page hero with service icon
- `src/components/sections/services/ServiceFeatures.tsx` - Features grid with SpotlightCard
- `src/components/sections/services/ServiceProcess.tsx` - Timeline process steps
- `src/components/sections/services/ServiceStats.tsx` - 4-stat CountUp grid
- `src/components/sections/services/ServiceFAQ.tsx` - FAQ accordion with FAQPage JSON-LD
- `src/components/sections/services/ServiceCTA.tsx` - Service-specific CTA section
- `src/app/[locale]/servicii/page.tsx` - Services index page with generateMetadata
- `src/app/[locale]/servicii/[slug]/page.tsx` - Dynamic sub-page with generateStaticParams
- `src/components/ui/accordion.tsx` - shadcn Accordion (Radix primitives)
- `src/messages/ro.json` - Full services namespace with all 6 services + index content
- `src/messages/en.json` - Full services namespace with all 6 services + index content

## Decisions Made
- **Service icon serialization:** Split icon mapping into separate `service-icons.ts` client module because Lucide icon components (React functions) cannot be serialized across the Next.js server/client boundary. The service registry stores `iconName` strings, resolved to components only in 'use client' files.
- **Full i18n content for all 6 services upfront:** `generateStaticParams` generates all 6 slugs at build time, so all services need at minimum stub content to prevent MISSING_MESSAGE errors. Added complete bilingual content for all services, making Plans 02/03 about content refinement rather than creation.
- **Breadcrumb as server component:** No 'use client' needed since breadcrumb links and JSON-LD are static. Keeps it lightweight and SSR-friendly.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed server/client serialization of Lucide icon components**
- **Found during:** Task 2 (Dynamic sub-page build)
- **Issue:** Passing `service.icon` (a React component function) from server page.tsx to client ServiceHero caused "Functions cannot be passed directly to Client Components" error
- **Fix:** Created `src/lib/service-icons.ts` with string-to-component mapping. Changed ServiceDefinition.icon to ServiceDefinition.iconName (string). ServiceHero resolves icon client-side via `getServiceIcon()`.
- **Files modified:** src/lib/services.ts, src/lib/service-icons.ts, src/components/sections/services/ServiceHero.tsx, src/components/sections/services/ServicesGrid.tsx, src/app/[locale]/servicii/[slug]/page.tsx
- **Verification:** Build passes, icons render correctly
- **Committed in:** df04327

**2. [Rule 1 - Bug] Fixed noUncheckedIndexedAccess type error in ServiceFeatures**
- **Found during:** Task 2 (Build verification)
- **Issue:** `FEATURE_ICONS[index % FEATURE_ICONS.length]` returns `LucideIcon | undefined` due to strict TypeScript noUncheckedIndexedAccess
- **Fix:** Added nullish coalescing fallback `?? Search`
- **Files modified:** src/components/sections/services/ServiceFeatures.tsx
- **Verification:** TypeScript strict mode passes
- **Committed in:** df04327

**3. [Rule 3 - Blocking] Added i18n content for all 5 remaining services**
- **Found during:** Task 2 (Build verification)
- **Issue:** generateStaticParams generates all 6 slugs but Plan only specified Google Ads content. Build failed with MISSING_MESSAGE for facebookAds, tiktokAds, seo, emailMarketing, consultanta.
- **Fix:** Added complete bilingual content for all 5 remaining services (not just stubs) to both ro.json and en.json.
- **Files modified:** src/messages/ro.json, src/messages/en.json
- **Verification:** Build passes with all 6 service pages generating statically
- **Committed in:** df04327

---

**Total deviations:** 3 auto-fixed (2 bugs, 1 blocking)
**Impact on plan:** All fixes necessary for build to pass. Adding full content for all services was scope expansion but prevents Plans 02/03 from needing to create content from scratch.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 6 Service section components are fully reusable -- Plans 02 and 03 only need to refine i18n content for remaining 5 services
- Breadcrumb component ready for use on Contact page and future pages
- Service registry extensible for new services if needed
- FAQ accordion pattern established for any future FAQ sections

## Self-Check: PASSED

All 16 created files verified present. Both task commits (8f4b76d, df04327) verified in git log. `npm run build` passes with 21 static pages generated (0 errors).

---
*Phase: 04-service-pages*
*Completed: 2026-02-21*
