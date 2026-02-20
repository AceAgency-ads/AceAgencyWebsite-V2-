---
phase: 01-foundation
plan: 02
subsystem: infra
tags: [next-intl, i18n, routing, locale, bilingual, typescript, react]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 16 App Router scaffold with TypeScript strict mode and TailwindCSS 4
provides:
  - next-intl 4.8.3 configured with RO/EN bilingual routing
  - proxy.ts middleware at project root for locale prefix routing
  - src/i18n/routing.ts — defineRouting with RO default, always prefix
  - src/i18n/navigation.ts — type-safe Link, redirect, usePathname, useRouter
  - src/i18n/request.ts — server-side locale resolution with hasLocale validation
  - src/app/[locale]/layout.tsx — locale-aware root layout with generateStaticParams and setRequestLocale
  - src/messages/ro.json and en.json — RO/EN translation files with HomePage namespace
  - LocaleSwitcher component preserving page slug across locale switches
  - Static (SSG) rendering verified for all [locale] pages
affects:
  - 01-03 (fonts/styles — builds on [locale]/layout.tsx)
  - All Phase 2-8 pages (depend on [locale] routing and useTranslations pattern)

# Tech tracking
tech-stack:
  added:
    - next-intl@4.8.3
  patterns:
    - proxy.ts at project root (Next.js 16 convention for middleware)
    - createNextIntlPlugin wrapping nextConfig in next.config.ts
    - setRequestLocale(locale) called first in all [locale] layout/page components
    - generateStaticParams returning routing.locales.map for static pre-rendering
    - useTranslations('Namespace') in server component children (inner component pattern)
    - createNavigation(routing) for type-safe locale-aware navigation
    - 'use client' component with useRouter().replace(pathname, { locale }) for locale switching

key-files:
  created:
    - src/i18n/routing.ts
    - src/i18n/navigation.ts
    - src/i18n/request.ts
    - proxy.ts
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/messages/ro.json
    - src/messages/en.json
    - src/components/layout/LocaleSwitcher.tsx
  modified:
    - next.config.ts (added createNextIntlPlugin)
    - src/app/layout.tsx (stripped to minimal pass-through)

key-decisions:
  - "proxy.ts used instead of middleware.ts — Next.js 16 renamed the middleware file"
  - "localePrefix: 'always' ensures / redirects to /ro/ (default locale)"
  - "Inner component pattern used for useTranslations in async page — hook must be in sync component, page is async for await params"
  - "Root src/app/layout.tsx kept as minimal pass-through — [locale]/layout.tsx handles all html/body/providers"

patterns-established:
  - "All new pages under src/app/[locale]/ must call setRequestLocale(locale) as first statement"
  - "useTranslations must be called in sync (non-async) child component, not in the async page component itself"
  - "Import Link, useRouter, usePathname from @/i18n/navigation (not next-intl directly) for locale-aware navigation"
  - "LocaleSwitcher pattern: useLocale() + router.replace(pathname, { locale: nextLocale }) preserves page slug"

requirements-completed:
  - FNDN-02

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 01 Plan 02: next-intl Bilingual Routing Summary

**next-intl 4.8.3 with RO/EN locale routing via proxy.ts middleware, SSG-verified [locale] layout with setRequestLocale/generateStaticParams, and LocaleSwitcher preserving page slug**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T16:35:07Z
- **Completed:** 2026-02-20T16:37:51Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- Installed and configured next-intl 4.8.3 with `defineRouting` (RO default, always locale prefix)
- Created all i18n infrastructure: routing.ts, navigation.ts, request.ts, proxy.ts middleware, updated next.config.ts
- Moved app to `[locale]` routing with `generateStaticParams` and `setRequestLocale` — pages render as SSG (not dynamic)
- Built LocaleSwitcher client component with 48px tap targets, aria-current, and slug-preserving locale switch

## Task Commits

Each task was committed atomically:

1. **Task 1: Set up next-intl routing, middleware, and locale layout with static rendering** - `381a526` (feat)
2. **Task 2: Build LocaleSwitcher component and verify bidirectional locale navigation** - `edc4077` (feat)

**Plan metadata:** (pending this commit)

## Files Created/Modified

- `src/i18n/routing.ts` — defineRouting with locales: ['ro', 'en'], defaultLocale: 'ro', localePrefix: 'always'
- `src/i18n/navigation.ts` — createNavigation exports: Link, redirect, usePathname, useRouter, getPathname
- `src/i18n/request.ts` — getRequestConfig with hasLocale validation and dynamic message import
- `proxy.ts` — next-intl middleware at project root (Next.js 16 convention)
- `next.config.ts` — wrapped with createNextIntlPlugin('./src/i18n/request.ts'), turbopack.root preserved
- `src/app/[locale]/layout.tsx` — locale layout with generateStaticParams, setRequestLocale, NextIntlClientProvider, LocaleSwitcher header
- `src/app/[locale]/page.tsx` — async page with setRequestLocale + inner sync component for useTranslations
- `src/messages/ro.json` — Romanian translations: HomePage.title, HomePage.subtitle
- `src/messages/en.json` — English translations: HomePage.title, HomePage.subtitle
- `src/components/layout/LocaleSwitcher.tsx` — 'use client' component with RO/EN buttons, aria-current, 48px tap targets
- `src/app/layout.tsx` — stripped to minimal pass-through (html/body moved to [locale]/layout.tsx)

## Decisions Made

- **proxy.ts not middleware.ts**: Next.js 16 renamed the middleware file from `middleware.ts` to `proxy.ts`. Used `proxy.ts` at project root per Next.js 16 convention.
- **localePrefix: 'always'**: Ensures visiting `/` redirects to `/ro/` (default locale). All pages always have explicit locale prefix in URL.
- **Inner component pattern for useTranslations**: The page is an async function (needed for `await params`), but `useTranslations` is a hook that must be called in a sync component. Used inner `HomePageContent` component as the hook caller.
- **Root layout as pass-through**: `src/app/layout.tsx` stripped to minimal pass-through — `[locale]/layout.tsx` owns all `<html>`, `<body>`, providers, and global styles.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed JSX.Element type error in LocaleSwitcher**

- **Found during:** Task 2 (build verification)
- **Issue:** Return type annotated as `JSX.Element` but TypeScript strict mode with React 18+ automatic JSX transform does not expose `JSX` namespace globally
- **Fix:** Changed return type to `React.JSX.Element` consistent with project convention established in 01-01
- **Files modified:** `src/components/layout/LocaleSwitcher.tsx`
- **Verification:** `npm run build` passes with zero TypeScript errors
- **Committed in:** edc4077 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Single type fix necessary for TypeScript strict compliance. No scope creep.

## Issues Encountered

- None beyond the JSX.Element type fix documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Bilingual routing fully operational: /ro/ and /en/ serve correct translations
- SSG rendering confirmed: all [locale] pages show `●` (generateStaticParams) in build output, not `λ`
- LocaleSwitcher component ready — will be replaced by full Header component in Phase 2
- Translation files established with HomePage namespace — Phase 2+ pages add their namespaces to ro.json/en.json
- Ready for 01-03: custom fonts (Glacial Indifference, Red Hat Display) and brand CSS tokens

---
*Phase: 01-foundation*
*Completed: 2026-02-20*
