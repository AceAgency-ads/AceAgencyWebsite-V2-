---
phase: 06-compliance-and-legal
plan: 01
subsystem: compliance
tags: [gdpr, cookie-consent, gtm, consent-mode-v2, vanilla-cookieconsent]

# Dependency graph
requires:
  - phase: 05-contact-lead
    provides: Google Maps component with consent placeholder, layout.tsx structure
provides:
  - GDPR cookie consent banner with 4 granular categories (necessary, analytics, marketing, functionality)
  - GTM Consent Mode v2 helpers (default denied + update on consent)
  - Google Maps consent gate wired to cookie consent state
  - CookieConsentBanner layout component
affects: [07-analytics, 06-02-legal-pages]

# Tech tracking
tech-stack:
  added: [vanilla-cookieconsent v3]
  patterns: [GTM Consent Mode v2 default/update, cookie consent category callbacks, consent-gated iframes]

key-files:
  created:
    - src/lib/gtm.ts
    - src/components/layout/CookieConsent.tsx
  modified:
    - src/app/[locale]/layout.tsx
    - src/components/sections/contact/GoogleMap.tsx
    - src/styles/globals.css
    - package.json

key-decisions:
  - "vanilla-cookieconsent v3 chosen over shadcn-cookie-consent for granular category support and built-in GTM Consent Mode integration"
  - "GTM consent default script uses beforeInteractive strategy to execute before GTM container"
  - "Google Maps gated behind functionality category (not analytics) since Maps embeds functional cookies"
  - "updateGtagConsent uses lazy require() to avoid bundling vanilla-cookieconsent in server context"

patterns-established:
  - "Consent-gated embeds: use CookieConsent.acceptedCategory() + cc:onChange/cc:onConsent window events for dynamic state"
  - "GTM script ordering: consent default (beforeInteractive) -> GTM container (afterInteractive, conditional on env var)"

requirements-completed: [CMPL-01, CMPL-02]

# Metrics
duration: 5min
completed: 2026-02-23
---

# Phase 06 Plan 01: GDPR Cookie Consent Summary

**Granular GDPR cookie consent banner with vanilla-cookieconsent v3, GTM Consent Mode v2 gating, and Google Maps consent-gated iframe**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-23T17:56:33Z
- **Completed:** 2026-02-23T18:01:41Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Cookie consent banner with 4 categories (necessary, analytics, marketing, functionality) and bilingual RO/EN text
- GTM Consent Mode v2 integration: all storage types denied by default, updated on consent callback
- Google Maps iframe gated behind functionality consent with dynamic state updates
- Brand-matched CSS overrides for vanilla-cookieconsent (Burgundy/Black/Grey palette)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install vanilla-cookieconsent, create GTM helpers and CookieConsent component** - `47c83f4` (feat)
2. **Task 2: Wire CookieConsent into layout and connect Google Maps consent gate** - `a15d5d5` (feat)

## Files Created/Modified
- `src/lib/gtm.ts` - GTM Consent Mode v2 helpers (updateGtagConsent, GTM_CONSENT_DEFAULT_SCRIPT)
- `src/components/layout/CookieConsent.tsx` - Client component wrapping vanilla-cookieconsent with categories, i18n, GTM callbacks
- `src/app/[locale]/layout.tsx` - Added GTM scripts (consent default + container) and CookieConsentBanner mount
- `src/components/sections/contact/GoogleMap.tsx` - Converted to client component with consent-gated iframe
- `src/styles/globals.css` - Brand CSS overrides for vanilla-cookieconsent
- `package.json` - Added vanilla-cookieconsent dependency

## Decisions Made
- vanilla-cookieconsent v3 chosen over shadcn-cookie-consent for granular category support and built-in GTM Consent Mode integration
- GTM consent default script uses next/script beforeInteractive strategy to ensure it executes before GTM container
- Google Maps gated behind "functionality" category since Maps embeds functional cookies (not analytics)
- updateGtagConsent uses lazy require() to avoid bundling vanilla-cookieconsent in server-side context
- Cookie consent banner positioned bottom-right (box layout) per plan specification

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing untracked FAQ page (`intrebari-frecvente/`) in working tree caused build failure due to missing `faq` i18n namespace. This was resolved by a separate process adding the namespace. Not caused by this plan's changes.

## User Setup Required

To enable GTM tracking in production, set the `NEXT_PUBLIC_GTM_ID` environment variable:
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```
Without this env var, no GTM scripts are injected (expected behavior for development).

## Next Phase Readiness
- Cookie consent system complete and ready for legal page content (Plan 02)
- GTM Consent Mode v2 foundation ready for Phase 07 analytics wiring
- All consent categories defined; future services can be gated behind appropriate categories

---
*Phase: 06-compliance-and-legal*
*Completed: 2026-02-23*
