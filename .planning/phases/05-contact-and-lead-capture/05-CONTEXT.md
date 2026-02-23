# Phase 5: Contact and Lead Capture - Context

**Gathered:** 2026-02-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Visitors can contact AceAgency, book a meeting, and subscribe to the newsletter. All lead-capture mechanisms are functional, validated, and deliverable via Resend. The contact page is implemented using `/frontend-design` against `design-system/pages/contact.md`.

</domain>

<decisions>
## Implementation Decisions

### Contact Form UX
- Minimal fields: Name, Email, Phone (optional), Message
- On-blur validation — validate each field when user leaves it, show errors immediately
- Honeypot field for spam protection — no reCAPTCHA, no third-party dependency
- On successful submission, redirect to `/multumim` thank-you page (trackable in GA4)
- Server Action with Zod validation + Resend delivery

### Booking Integration
- Cal.com inline embed rendered directly in a contact page section — no modal, no extra clicks
- Single meeting type (e.g., 30-min consultation)
- Dark-themed to match AceAgency's design system (dark background, Electric Violet accents)
- Cal.com account is ready — user will provide embed link/username
- Use `@calcom/embed-react` with fallback to inline script per roadmap plan

### Page Composition
- Contact information displayed: email, phone, office address, social media links
  - Email: cretualin@aceagency.ro
  - Phone: 0750465757
  - Address: Bulevardul Aviatorilor 106, Bucharest (use Google Maps for AceAgency)
  - Social media links: to be provided later (build with configurable data)
- Google Maps embed with dark theme styling to match site aesthetic
- Page section order and hero treatment: Claude's discretion based on design system and conversion best practices

### Newsletter Capture
- Email-only field + submit button — lowest friction
- Placement: global footer (all pages) + dedicated section on contact page
- Server Action via Resend for email capture
- Newsletter copy/value proposition: Claude's discretion based on AceAgency's professional tone

### Claude's Discretion
- Contact page section order and visual hierarchy
- Hero section treatment (minimal, full, or none)
- Newsletter success state (inline confirmation vs redirect to /multumim)
- Newsletter CTA copy and value proposition
- Exact spacing, typography, and animation choices
- Loading and error states design

</decisions>

<specifics>
## Specific Ideas

- Thank-you page at `/multumim` — reusable for both contact form and potentially newsletter, trackable as GA4 conversion
- Dark-themed Google Maps to maintain visual cohesion with the site
- Social media links are TBD — build the component with configurable data so links can be swapped in later
- Cal.com embed should feel native to the page, not like an external widget

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-contact-and-lead-capture*
*Context gathered: 2026-02-23*
