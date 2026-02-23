---
phase: 05-contact-and-lead-capture
plan: 02
subsystem: ui, api
tags: [calcom, embed, newsletter, server-actions, resend, footer, i18n]

# Dependency graph
requires:
  - phase: 05-contact-and-lead-capture
    provides: Contact page layout, newsletter Server Action, @calcom/embed-react dependency
provides:
  - Cal.com booking embed on contact page (BookingSection with dark theme)
  - Newsletter Server Action wired into global Footer with useActionState
  - All Phase 5 lead-capture mechanisms functional (form, booking, newsletter, map)
affects: [06 (cookie consent may gate Cal.com embed), 07 (newsletter generate_lead event)]

# Tech tracking
tech-stack:
  added: []
  patterns: [Cal.com embed-react inline integration, useActionState for Footer newsletter, NEXT_PUBLIC env var for Cal link]

key-files:
  created:
    - src/components/sections/contact/BookingSection.tsx
  modified:
    - src/components/layout/Footer.tsx
    - src/app/[locale]/contact/page.tsx
    - src/messages/ro.json
    - src/messages/en.json
    - .env.example

key-decisions:
  - "Cal.com embed uses @calcom/embed-react with dark theme config and NEXT_PUBLIC_CAL_LINK env var"
  - "Footer newsletter wired with useActionState(submitNewsletter) replacing e.preventDefault() stub"
  - "BookingSection container uses bg-[#262523] to prevent white flash during Cal.com load"

patterns-established:
  - "Cal.com embed pattern: 'use client' + Cal component with calLink from env var + dark bg container"
  - "Footer newsletter: useActionState with inline success/error messages and pending state"

requirements-completed: [FUNC-02, FUNC-03]

# Metrics
duration: 4min
completed: 2026-02-23
---

# Phase 5 Plan 02: Cal.com Booking Embed & Newsletter Wiring Summary

**Cal.com inline booking embed on contact page and newsletter Server Action wired into global Footer with useActionState success/error states**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-23T12:10:00Z
- **Completed:** 2026-02-23T12:14:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Cal.com booking embed renders inline on contact page with dark theme and configurable calLink via NEXT_PUBLIC_CAL_LINK env var
- Footer newsletter form upgraded from UI-only stub to fully functional Server Action with inline success/error feedback
- All 5 Phase 5 lead-capture mechanisms are now functional: contact form, Cal.com booking, newsletter, Google Maps, thank-you redirect

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Cal.com BookingSection and wire Newsletter Server Action into Footer** - `accb73b` (feat)
2. **Task 2: Visual and functional verification** - checkpoint (human-verify, approved)

## Files Created/Modified
- `src/components/sections/contact/BookingSection.tsx` - Cal.com embed-react component with dark theme, loading skeleton, ScrollReveal
- `src/components/layout/Footer.tsx` - Newsletter form wired to submitNewsletter Server Action with useActionState
- `src/app/[locale]/contact/page.tsx` - Added BookingSection import between GoogleMap and ContactFAQ
- `src/messages/ro.json` - Newsletter success/error i18n keys
- `src/messages/en.json` - Newsletter success/error i18n keys (English)
- `.env.example` - Added NEXT_PUBLIC_CAL_LINK variable

## Decisions Made
- Cal.com embed uses @calcom/embed-react with dark theme config (`theme: "dark"`) and `NEXT_PUBLIC_CAL_LINK` env var with fallback to "aceagency/consultatie"
- BookingSection container uses `bg-[#262523]` dark background to prevent white flash during Cal.com embed loading (per RESEARCH.md Pitfall 3)
- Footer newsletter replaced `e.preventDefault()` stub with `useActionState(submitNewsletter)` pattern including pending state, inline success message, and error display
- GDPR checkbox preserved in Footer newsletter form

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

Cal.com booking requires:
- `NEXT_PUBLIC_CAL_LINK` environment variable (e.g., `aceagency/consultatie`) — get from Cal.com dashboard after creating an event type
- For development: embed renders with fallback link; actual booking requires a Cal.com account

Newsletter email delivery requires:
- `RESEND_API_KEY` environment variable (configured in Plan 01)
- For development: dev mock logs to console

## Next Phase Readiness
- All Phase 5 lead-capture functionality complete
- Phase 6 (Compliance and Legal) can proceed — cookie consent banner, legal pages, FAQ page
- Google Maps consent gate placeholder ready for Phase 6 cookie consent wiring
- Cal.com embed may need consent gating in Phase 6 depending on cookie policy scope

## Self-Check: PASSED

- FOUND: src/components/sections/contact/BookingSection.tsx
- FOUND: src/components/layout/Footer.tsx
- FOUND: .planning/phases/05-contact-and-lead-capture/05-02-SUMMARY.md
- FOUND: commit accb73b

---
*Phase: 05-contact-and-lead-capture*
*Completed: 2026-02-23*
