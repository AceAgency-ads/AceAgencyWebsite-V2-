# Client-Ready Website Enhancements — Design

**Date**: 2026-03-06
**Status**: Approved (brainstorming complete, not yet planned)

## Scope — 5 Features

| # | Feature | Category | Priority |
|---|---------|----------|----------|
| 1 | Dedicated Testimonials page (`/testimoniale`) | Trust | High |
| 2 | Cal.com booking embed on contact page | Conversion | High |
| 3 | Lead magnet / Free Audit funnel (`/audit-gratuit`) | Conversion | High |
| 4 | Exit-intent popup | Conversion | Medium |
| 5 | E2E tests (Playwright) | Hardening | High |

## 1. Testimonials Page (`/testimoniale`)

- **Format**: Mixed media — text cards + video testimonials
- Reuse existing `VideoTestimonialCard.tsx` component
- SEO-optimized for "pareri agentie marketing bucuresti"
- Homepage `Testimonials` section becomes a preview (keep 3-4 best, add "Vezi toate" CTA linking to `/testimoniale`)
- Schema markup: `Review` + `AggregateRating`
- i18n: RO + EN

## 2. Cal.com Booking Embed

- Install `@calcom/embed-react`
- Replace current `BookingSection.tsx` placeholder with real Cal.com embed
- Cal link: `aceads/30min`, month view layout
- Dark theme styling to match site
- Embed code provided by user:
```tsx
import Cal, { getCalApi } from "@calcom/embed-react";
// namespace: "30min", calLink: "aceads/30min", layout: "month_view"
```

## 3. Lead Magnet — Free Audit Landing Page (`/audit-gratuit`)

- Standalone landing page: headline, benefits list, dedicated form
- Form fields: name, email, website URL, business type
- Server action sends email via Resend (same pattern as contact form)
- Redirects to `/multumim` with audit-specific messaging
- SEO: "audit conversii gratuit", "analiza site gratuita"

## 4. Exit-Intent Popup

- Triggers on mouse leaving viewport (desktop) / after 30s idle (mobile fallback)
- Shows once per session (localStorage flag)
- Content: "Vrei un audit gratuit?" — links to `/audit-gratuit`
- Dismissible, respects cookie consent
- No popup on `/audit-gratuit` itself

## 5. E2E Tests (Playwright)

Critical flows:
- Homepage loads, all sections visible
- Navigation works (header links, locale switch)
- Contact form validation + submission
- Service page renders correctly
- Testimonials page loads
- Mobile responsive (viewport tests)
- CI-ready config

## Design Inspiration

See companion research docs:
- [badmarketing-design-analysis.md](./badmarketing-design-analysis.md) — photo integration, gallery carousel, stat animations, CTA repetition
- [nureachmedia-design-analysis.md](./nureachmedia-design-analysis.md) — case study cards, GSAP split-text, full-bleed heroes, "Schedule A Call" pattern
- [ecommerce-competitor-table.md](./ecommerce-competitor-table.md) — comparison table component inspiration, Romanian e-commerce market data
