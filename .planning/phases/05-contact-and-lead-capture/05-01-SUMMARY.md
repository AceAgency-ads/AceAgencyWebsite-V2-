---
phase: 05-contact-and-lead-capture
plan: 01
subsystem: ui, api
tags: [resend, zod, contact-form, server-actions, google-maps, faq, i18n]

# Dependency graph
requires:
  - phase: 03-flagship-pages
    provides: SectionWrapper, SectionHeader, ScrollReveal, TextReveal, Breadcrumb components
  - phase: 04-service-pages
    provides: ServiceFAQ accordion pattern, i18n key structure
provides:
  - Contact page with 5 sections (hero, form+info, map, booking placeholder, FAQ)
  - Resend client singleton for email delivery
  - Contact form Server Action with Zod validation and honeypot
  - Newsletter Server Action for email capture
  - Thank-you page at /[locale]/multumim
  - Contact and newsletter Zod schemas
  - Full bilingual i18n content (contact + thankYou namespaces)
affects: [05-02 (Cal.com booking, newsletter wiring), 06 (cookie consent for map)]

# Tech tracking
tech-stack:
  added: [resend, zod, @calcom/embed-react]
  patterns: [useActionState + Zod Server Action, Resend singleton with dev mock, on-blur field validation, honeypot anti-spam]

key-files:
  created:
    - src/lib/resend.ts
    - src/lib/validations/contact-schema.ts
    - src/lib/validations/newsletter-schema.ts
    - src/lib/actions/contact.ts
    - src/lib/actions/newsletter.ts
    - src/app/[locale]/contact/page.tsx
    - src/app/[locale]/multumim/page.tsx
    - src/components/sections/contact/ContactHero.tsx
    - src/components/sections/contact/ContactForm.tsx
    - src/components/sections/contact/ContactInfo.tsx
    - src/components/sections/contact/GoogleMap.tsx
    - src/components/sections/contact/ContactFAQ.tsx
    - .env.example
  modified:
    - package.json
    - src/messages/ro.json
    - src/messages/en.json

key-decisions:
  - "Resend client uses dev mock (logs to console) when RESEND_API_KEY missing in development"
  - "On-blur validation parses full schema then extracts field-specific errors (avoids Zod .pick() TypeScript issues)"
  - "Contact form uses useActionState with redirect to /multumim on success via useEffect"
  - "Google Maps iframe with CSS invert filter for dark mode; consent gate placeholder ready for Phase 6"
  - "@calcom/embed-react installed upfront but used in Plan 02"

patterns-established:
  - "Server Action pattern: 'use server' + Zod safeParse + honeypot check + Resend delivery"
  - "On-blur validation: parse full schema, extract field errors, translate via i18n keys"
  - "Contact info glass card pattern: bg-white/5 backdrop-blur-sm with icon + label + value"

requirements-completed: [PAGE-10, FUNC-01, FUNC-06]

# Metrics
duration: 5min
completed: 2026-02-23
---

# Phase 5 Plan 01: Contact Page & Lead Capture Infrastructure Summary

**Contact page with Zod-validated form, Resend email delivery, Google Maps dark embed, FAQ accordion, and thank-you redirect page**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-23T11:58:07Z
- **Completed:** 2026-02-23T12:03:00Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- Functional contact page at /ro/contact and /en/contact with 5 sections (hero, form+info, map, booking placeholder, FAQ)
- Contact form Server Action with Zod validation, honeypot anti-spam, and Resend email delivery
- Newsletter Server Action ready for wiring in Plan 02
- Thank-you page at /[locale]/multumim as GA4 conversion tracking destination
- Full bilingual i18n content for all contact page sections

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, create Resend client, Zod schemas, Server Actions, and thank-you page** - `196dba8` (feat)
2. **Task 2: Build Contact page sections, route, and full bilingual i18n content** - `c87f9a1` (feat)

## Files Created/Modified
- `.env.example` - Environment variable template for RESEND_API_KEY and CAL_LINK
- `src/lib/resend.ts` - Resend client singleton with dev mock fallback
- `src/lib/validations/contact-schema.ts` - Zod schema for contact form with i18n error keys
- `src/lib/validations/newsletter-schema.ts` - Zod schema for newsletter signup
- `src/lib/actions/contact.ts` - Contact form Server Action (validate, honeypot, send email)
- `src/lib/actions/newsletter.ts` - Newsletter Server Action (validate, notify agency)
- `src/app/[locale]/multumim/page.tsx` - Thank-you page with checkmark icon and back link
- `src/app/[locale]/contact/page.tsx` - Contact page route with metadata and JSON-LD
- `src/components/sections/contact/ContactHero.tsx` - Hero with TextReveal headline and breadcrumb
- `src/components/sections/contact/ContactForm.tsx` - Form with useActionState and on-blur validation
- `src/components/sections/contact/ContactInfo.tsx` - Glass card with address, email, phone, hours
- `src/components/sections/contact/GoogleMap.tsx` - Dark-themed Google Maps iframe embed
- `src/components/sections/contact/ContactFAQ.tsx` - FAQ accordion with FAQPage JSON-LD
- `src/messages/ro.json` - Added contact and thankYou namespaces (Romanian)
- `src/messages/en.json` - Added contact and thankYou namespaces (English)
- `package.json` - Added resend, zod, @calcom/embed-react dependencies

## Decisions Made
- Resend dev mock: In development without RESEND_API_KEY, the client logs emails to console instead of throwing (prevents blocking local development)
- On-blur validation: Parse full Zod schema and extract individual field errors rather than using .pick() (TypeScript compatibility issue with dynamic pick keys)
- Contact form redirect: Uses useEffect watching state.success to call router.push('/multumim')
- Google Maps: CSS filter approach (invert + grayscale + hue-rotate) for dark mode, with consent gate placeholder for Phase 6 cookie consent wiring
- Service select: Uses native HTML select with Tailwind styling (simpler than shadcn Select for this use case)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Zod .pick() TypeScript error in on-blur validation**
- **Found during:** Task 2 (ContactForm implementation)
- **Issue:** `contactFormSchema.pick({ [fieldName]: true })` caused TypeScript error because dynamic keys don't satisfy the pick type constraint
- **Fix:** Changed approach to parse full schema with minimal test data and extract field-specific errors from flattened result
- **Files modified:** src/components/sections/contact/ContactForm.tsx
- **Verification:** TypeScript compiles without errors
- **Committed in:** c87f9a1 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Auto-fix necessary for TypeScript correctness. No scope creep.

## Issues Encountered
None beyond the Zod .pick() TypeScript issue documented above.

## User Setup Required

Resend email delivery requires:
- `RESEND_API_KEY` environment variable (get from Resend Dashboard -> API Keys)
- Domain verification: Add DKIM/SPF DNS records for aceagency.ro in Resend Dashboard -> Domains
- For development: No setup needed (dev mock logs to console)

## Next Phase Readiness
- Contact page and Server Actions complete, ready for Plan 02 (Cal.com booking embed, newsletter wiring)
- @calcom/embed-react already installed, ready for BookingSection component
- Newsletter Server Action ready for wiring to Footer newsletter form
- Google Maps consent gate placeholder ready for Phase 6 cookie consent integration

---
*Phase: 05-contact-and-lead-capture*
*Completed: 2026-02-23*
