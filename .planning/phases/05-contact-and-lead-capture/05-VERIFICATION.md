---
phase: 05-contact-and-lead-capture
verified: 2026-02-23T14:28:34Z
status: gaps_found
score: 8/10 must-haves verified
re_verification: false
gaps:
  - truth: "Cal.com booking widget renders on the contact page and allows selecting a meeting slot"
    status: partial
    reason: "BookingSection.tsx hardcodes calLink='aceads/30min' instead of reading from process.env.NEXT_PUBLIC_CAL_LINK. The env var NEXT_PUBLIC_CAL_LINK=aceagency/consultatie is set in .env.example but never consumed. The widget will load the wrong calendar link."
    artifacts:
      - path: "src/components/sections/contact/BookingSection.tsx"
        issue: "calLink hardcoded to 'aceads/30min' — should be process.env.NEXT_PUBLIC_CAL_LINK ?? 'aceagency/consultatie'"
    missing:
      - "Replace calLink=\"aceads/30min\" with calLink={process.env.NEXT_PUBLIC_CAL_LINK ?? 'aceagency/consultatie'} in BookingSection.tsx"
  - truth: "Newsletter form on contact page submits via Server Action and shows success/error state"
    status: failed
    reason: "The contact page (contact/page.tsx) does not render any newsletter form. The newsletter form only exists in the global Footer. The plan's must_have truth ('Newsletter form on contact page') and the CONTEXT.md spec ('dedicated section on contact page') are both unmet."
    artifacts:
      - path: "src/app/[locale]/contact/page.tsx"
        issue: "No newsletter section rendered — page includes ContactHero, ContactForm, ContactInfo, GoogleMap, BookingSection, ContactFAQ but no newsletter form"
    missing:
      - "Add a newsletter section to the contact page — either a dedicated NewsletterSection component or inline form using submitNewsletter Server Action"
human_verification:
  - test: "Submit contact form with valid data (name, email, message)"
    expected: "Page redirects to /ro/multumim after submission; email appears in Resend logs (or console mock in dev)"
    why_human: "Email delivery depends on runtime RESEND_API_KEY env var; redirect requires live browser interaction"
  - test: "Submit contact form with empty name and blur the name field"
    expected: "Red error message appears below the name field without a page reload"
    why_human: "On-blur validation requires real browser interaction"
  - test: "Click an FAQ accordion item on /ro/contact"
    expected: "Accordion item expands to show the answer; clicking again collapses it"
    why_human: "Accordion interaction requires live browser"
  - test: "Scroll to Footer on any page and submit newsletter form with valid email"
    expected: "Inline success message appears in green; form disappears"
    why_human: "Success state transition requires live browser interaction"
  - test: "Verify Cal.com booking section renders on /ro/contact"
    expected: "Section with heading 'Rezerva o Consultatie Gratuita' is visible; calendar embed loads (requires Cal.com account to be configured)"
    why_human: "Cal.com loading depends on external service and correct calLink configuration"
---

# Phase 5: Contact and Lead Capture Verification Report

**Phase Goal:** Visitors can contact AceAgency, book a meeting, and subscribe to the newsletter — all lead-capture mechanisms are functional, validated, and deliverable via Resend.
**Verified:** 2026-02-23T14:28:34Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth                                                                                           | Status      | Evidence                                                                                              |
|----|-------------------------------------------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------|
| 1  | Contact page renders at /ro/contact and /en/contact with hero, form, info, map, and FAQ sections | ✓ VERIFIED  | contact/page.tsx renders ContactHero, ContactForm+ContactInfo, GoogleMap, BookingSection, ContactFAQ  |
| 2  | Submitting contact form with valid data calls Resend and returns success state                   | ✓ VERIFIED  | contact.ts Server Action: safeParse → resend.emails.send → return { success: true }                  |
| 3  | Submitting contact form with invalid data shows field-level validation errors                    | ✓ VERIFIED  | ContactForm.tsx: useActionState + on-blur validateField + server errors rendered below each field     |
| 4  | Google Maps embed shows AceAgency office location with dark styling                              | ✓ VERIFIED  | GoogleMap.tsx: iframe with CSS filter (invert grayscale hue-rotate saturate) + correct address URL    |
| 5  | Thank-you page renders at /ro/multumim and /en/multumim                                          | ✓ VERIFIED  | Build output shows /ro/multumim and /en/multumim as SSG routes; CheckCircle + back link present      |
| 6  | FAQ accordion on contact page expands and collapses                                              | ✓ VERIFIED  | ContactFAQ.tsx uses shadcn Accordion with 5 items from i18n; 'use client' directive present           |
| 7  | Cal.com booking widget renders on the contact page                                               | ✗ PARTIAL   | BookingSection exists and is imported; but calLink hardcoded to 'aceads/30min' not env var            |
| 8  | Newsletter form in Footer submits via Server Action and shows success/error state                 | ✓ VERIFIED  | Footer.tsx: useActionState(submitNewsletter); success state toggles form → green success message      |
| 9  | Newsletter form on contact page submits via Server Action and shows success/error state           | ✗ FAILED    | contact/page.tsx has no newsletter form; only Footer newsletter exists                                |
| 10 | All text is bilingual via next-intl (RO + EN)                                                    | ✓ VERIFIED  | All keys verified: contact.*, thankYou.*, footer.newsletter.* present in ro.json and en.json         |

**Score:** 8/10 truths verified

### Required Artifacts

| Artifact                                                      | Expected                              | Status      | Details                                                                         |
|---------------------------------------------------------------|---------------------------------------|-------------|---------------------------------------------------------------------------------|
| `src/lib/resend.ts`                                           | Resend client singleton               | ✓ VERIFIED  | Exports `resend`; dev mock + production singleton; `new Resend(apiKey)` present |
| `src/lib/actions/contact.ts`                                  | Contact form Server Action            | ✓ VERIFIED  | 'use server'; exports `submitContactForm`; Zod safeParse; resend.emails.send    |
| `src/lib/actions/newsletter.ts`                               | Newsletter Server Action              | ✓ VERIFIED  | 'use server'; exports `submitNewsletter`; Zod safeParse; resend.emails.send     |
| `src/lib/validations/contact-schema.ts`                       | Zod contact form schema               | ✓ VERIFIED  | Exports `contactFormSchema`; all 6 fields with i18n error keys; honeypot        |
| `src/lib/validations/newsletter-schema.ts`                    | Zod newsletter schema                 | ✓ VERIFIED  | Exports `newsletterSchema`; email + honeypot fields                             |
| `src/components/sections/contact/ContactForm.tsx`             | Form with useActionState              | ✓ VERIFIED  | 'use client'; useActionState(submitContactForm); on-blur validation; redirect   |
| `src/app/[locale]/contact/page.tsx`                           | Contact page route                    | ✓ VERIFIED  | Contains ContactHero; SSG at /ro/contact and /en/contact; generateMetadata      |
| `src/components/sections/contact/BookingSection.tsx`          | Cal.com inline embed with dark theme  | ⚠ PARTIAL  | Exists; imports Cal from @calcom/embed-react; calLink hardcoded not env var     |
| `src/components/layout/Footer.tsx`                            | Newsletter form wired to Server Action| ✓ VERIFIED  | useActionState(submitNewsletter); form action={newsletterAction}; success state |
| `src/app/[locale]/multumim/page.tsx`                          | Thank-you page                        | ✓ VERIFIED  | CheckCircle icon; heading + description; back link to homepage                  |

### Key Link Verification

| From                                        | To                                     | Via                                   | Status      | Details                                                        |
|---------------------------------------------|----------------------------------------|---------------------------------------|-------------|----------------------------------------------------------------|
| `ContactForm.tsx`                           | `src/lib/actions/contact.ts`           | `useActionState(submitContactForm)`   | ✓ WIRED     | Line 31: `const [state, formAction, pending] = useActionState(submitContactForm, initialState)` |
| `src/lib/actions/contact.ts`                | `src/lib/resend.ts`                    | `resend.emails.send`                  | ✓ WIRED     | Line 53: `const { error } = await resend.emails.send({...})`  |
| `src/lib/actions/contact.ts`                | `src/lib/validations/contact-schema.ts`| `contactFormSchema.safeParse`         | ✓ WIRED     | Line 35: `const result = contactFormSchema.safeParse(rawData)` |
| `BookingSection.tsx`                        | `@calcom/embed-react`                  | `Cal component import`                | ⚠ PARTIAL  | Import correct: `import Cal, { getCalApi } from '@calcom/embed-react'`; but calLink hardcoded to 'aceads/30min' not env var |
| `Footer.tsx`                                | `src/lib/actions/newsletter.ts`        | `useActionState(submitNewsletter)`    | ✓ WIRED     | Line 46: `const [newsletterState, newsletterAction, newsletterPending] = useActionState(submitNewsletter, { success: false })` |

### Requirements Coverage

| Requirement | Source Plan | Description                                                       | Status       | Evidence                                                                                              |
|-------------|------------|-------------------------------------------------------------------|--------------|-------------------------------------------------------------------------------------------------------|
| PAGE-10     | 05-01      | Contact page with form, Google Maps embed, Cal.com booking widget  | ✓ SATISFIED  | contact/page.tsx renders all sections; SSG at /ro/contact and /en/contact                             |
| FUNC-01     | 05-01      | Contact form with Zod validation, honeypot anti-spam, Resend email | ✓ SATISFIED  | contact.ts + contact-schema.ts + ContactForm.tsx all implement the full pattern                       |
| FUNC-02     | 05-02      | Newsletter signup with email collection via Resend and GDPR checkbox| ✓ SATISFIED  | Footer.tsx has email input + submitNewsletter action + GDPR checkbox (line 174-181)                   |
| FUNC-03     | 05-02      | Cal.com booking embed on contact page                              | ⚠ PARTIAL   | BookingSection renders but calLink hardcoded to wrong/non-configurable value 'aceads/30min'           |
| FUNC-06     | 05-01      | Google Maps embed on contact page                                  | ✓ SATISFIED  | GoogleMap.tsx renders iframe with dark CSS filter; included in contact/page.tsx                       |

### Anti-Patterns Found

| File                                             | Line | Pattern                              | Severity   | Impact                                                          |
|--------------------------------------------------|------|--------------------------------------|------------|-----------------------------------------------------------------|
| `src/components/sections/contact/BookingSection.tsx` | 68 | `calLink="aceads/30min"` hardcoded   | ⚠ Warning  | Cal.com embed loads wrong calendar; not configurable via env var |
| `src/components/sections/contact/ContactInfo.tsx`    | 78 | Social links `href="#"` placeholders  | ℹ Info     | Placeholder social links — scope for Phase 6 (social links are FUNC-05, pending) |
| `src/components/layout/Footer.tsx`                   | 31 | Legal link `placeholder hrefs` comment | ℹ Info   | Legal pages are Phase 6 scope; placeholder hrefs intentional   |

### Human Verification Required

### 1. Contact Form Email Delivery

**Test:** Fill contact form at /ro/contact with valid data (name, email, message) and submit.
**Expected:** Redirect to /ro/multumim; email appears in Resend dashboard or console dev mock logs.
**Why human:** Email delivery depends on runtime RESEND_API_KEY environment variable; redirect requires live browser session.

### 2. Contact Form On-Blur Validation

**Test:** Visit /ro/contact, click into the name field, then click away without entering text. Then enter a 1-character name and blur.
**Expected:** Red error message appears below the name field ("Minim 2 caractere" or equivalent) without a page reload.
**Why human:** On-blur JavaScript interaction requires a live browser.

### 3. FAQ Accordion Interaction

**Test:** Visit /ro/contact, scroll to FAQ section, click on "Cat dureaza un proiect web?"
**Expected:** Accordion expands to show the answer; clicking again collapses it. Only one item open at a time (type="single").
**Why human:** Accordion toggle requires live browser interaction.

### 4. Footer Newsletter Success State

**Test:** Scroll to Footer on any page, enter a valid email in the newsletter form, click submit.
**Expected:** The form disappears and a green success message "Multumim pentru abonare!" appears inline.
**Why human:** State transition requires live browser; email delivery requires RESEND_API_KEY.

### 5. Cal.com Booking Widget

**Test:** Visit /ro/contact, scroll to the booking section. Note: the hardcoded calLink is 'aceads/30min' — this loads a specific Cal.com account that may not be the intended AceAgency calendar.
**Expected:** Calendar renders with month view and dark theme; slot selection is possible.
**Why human:** Cal.com loading depends on external service availability and whether 'aceads/30min' is a valid/accessible calendar.

## Gaps Summary

Two gaps block full goal achievement:

**Gap 1 — Hardcoded Cal.com link (PARTIAL, blocks configurability):**
`BookingSection.tsx` has `calLink="aceads/30min"` hardcoded. The plan specified reading from `process.env.NEXT_PUBLIC_CAL_LINK` with a fallback. `.env.example` has `NEXT_PUBLIC_CAL_LINK=aceagency/consultatie` but the component never reads it. The wrong calendar link will be loaded (`aceads/30min` vs the intended `aceagency/consultatie`). Fix is a one-line change: replace `calLink="aceads/30min"` with `calLink={process.env.NEXT_PUBLIC_CAL_LINK ?? 'aceagency/consultatie'}`.

**Gap 2 — Missing newsletter section on contact page (FAILED):**
The plan's must_have truth and the CONTEXT.md specification both require a newsletter form directly on the contact page ("dedicated section on contact page"). The contact page currently renders 6 sections (Hero, Form+Info, Map, Booking, FAQ) but has no newsletter form. The Footer newsletter satisfies the ROADMAP success criterion (SC 5) and the FUNC-02 requirement since these only require the newsletter form to exist and work — but the plan-level must_have truth is unmet. Adding a newsletter section to the contact page between ContactFAQ and the footer would close this gap.

The ROADMAP success criteria 1-4 are fully verified programmatically. Criteria 3 (Cal.com booking) and 5 (newsletter) have the gaps noted above. The build passes cleanly with zero errors and all 5 requirements (PAGE-10, FUNC-01, FUNC-02, FUNC-03, FUNC-06) are marked complete in REQUIREMENTS.md.

---

_Verified: 2026-02-23T14:28:34Z_
_Verifier: Claude (gsd-verifier)_
