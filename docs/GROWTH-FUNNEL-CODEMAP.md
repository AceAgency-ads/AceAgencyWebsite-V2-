# ACE Growth Engine Funnel Codemap

**Last Updated:** March 26, 2026
**Status:** Production
**Entry Points:** `/growth`, `/growth/checklist`, `/growth/multumesc`

---

## Overview

ACE Growth Engine is a conversion-focused funnel system for e-commerce brands. It presents a complete growth methodology via a multi-step VSL (Video Sales Letter) and audit application process, landing clients at Calendly for a 30-minute discovery call.

The funnel is optimized for **conversion velocity** — each section removes friction, builds social proof, and moves prospects toward application.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ /growth [Main Funnel Page] — 10 Sections                     │
├──────────────────────────────────────────────────────────────┤
│ 1. GrowthHero (MERGED WITH VSL)                              │
│    └─ Full viewport: dark hero + VSL video thumbnail        │
│    └─ Headline + subheadline + video facade + CTA            │
│    └─ Grid pattern overlay + radial violet glows             │
├──────────────────────────────────────────────────────────────┤
│ 2. GrowthClientLogos                                         │
│    └─ Marquee of client logos ("Au crescut cu noi")         │
├──────────────────────────────────────────────────────────────┤
│ 3. GrowthServices                                            │
│    └─ 8-card grid: what's included (Meta, TikTok, Google,   │
│       Creative, Email, CRO, AdPilot AI, Raportare)          │
│    └─ Visual redesign with shine effects on CTAs             │
├──────────────────────────────────────────────────────────────┤
│ 4. GrowthCaseStudies                                         │
│    └─ 3-card grid: IT Mar, Amora, Trady + links to full     │
│       case studies + repeated CTA at stopping point          │
│    └─ Visual redesign with deep shadows                      │
├──────────────────────────────────────────────────────────────┤
│ 5. GrowthProcess                                             │
│    └─ 3-step "How It Works": Audit → Strategy → Execution   │
│    └─ Gradient step numbers (violet→mint)                    │
│    └─ Visual redesign with pulsing glow effects              │
├──────────────────────────────────────────────────────────────┤
│ 6. GrowthGuarantee (NEW)                                     │
│    └─ Money-back guarantee + risk reversal messaging         │
│    └─ Centered card with violet glow border                  │
│    └─ Shield icon + CTA to audit form                        │
├──────────────────────────────────────────────────────────────┤
│ 7. GrowthFAQ                                                 │
│    └─ 7 FAQ items: pricing, timeline, AdPilot, etc.        │
│    └─ Accordion with visual redesign + repeated CTA          │
├──────────────────────────────────────────────────────────────┤
│ 8. GrowthAuditForm                                           │
│    └─ Main form (6 fields + honeypot): name, store URL,    │
│       revenue, ads budget, tried before, blocaj             │
│    └─ Visual redesign with shine effects on submit button    │
│       → Redirects to Calendly on success                    │
├──────────────────────────────────────────────────────────────┤
│ 9. GrowthLeadMagnetCTA                                       │
│    └─ Two-column layout: ebook cover + form                 │
│    └─ Secondary funnel with ebook cover image                │
├──────────────────────────────────────────────────────────────┤
│ 10. GrowthFooter                                             │
│     └─ Dark footer with brand, social, quick links          │
└──────────────────────────────────────────────────────────────┘

           ↓ Form Success

┌──────────────────────────────────────────────────────────────┐
│ /growth/checklist [Lead Magnet Landing]                      │
├──────────────────────────────────────────────────────────────┤
│ • Standalone page to capture email (lead magnet form)       │
│ • Includes 12-item revenue-leaks checklist                  │
│ • Footer with secondary CTAs back to /growth               │
└──────────────────────────────────────────────────────────────┘

           ↓ Lead Magnet Form Success

┌──────────────────────────────────────────────────────────────┐
│ /growth/multumesc [Thank You Page]                           │
├──────────────────────────────────────────────────────────────┤
│ • Confirmation message                                       │
│ • Email delivery confirmation                               │
│ • Links to case studies & blog                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Modules

### Pages

| File | Purpose | Layout | SEO |
|------|---------|--------|-----|
| `src/app/[locale]/growth/page.tsx` | Main funnel page | 10-section dark flow | Service + FAQ schemas |
| `src/app/[locale]/growth/checklist/page.tsx` | Lead magnet landing | Checklist display + poster | Standard meta |
| `src/app/[locale]/growth/multumesc/page.tsx` | Thank you confirmation | Minimal, high signal | Noindex |

### Components

| Component | Purpose | Props | Status |
|-----------|---------|-------|--------|
| `GrowthHero` | Hero + VSL merged (headline, video thumbnail, CTA) | — | Updated Mar 26 |
| `GrowthClientLogos` | Marquee of client logos | — | Unchanged |
| `GrowthServices` | 8-card service grid with shine effects | — | Updated Mar 26 |
| `GrowthCaseStudies` | 3-card case study preview + CTA | — | Updated Mar 26 |
| `GrowthProcess` | 3-step process with gradient numbers | — | Updated Mar 26 |
| `GrowthGuarantee` | Money-back guarantee card (NEW) | — | New Mar 26 |
| `GrowthFAQ` | 7-item FAQ accordion + CTA | — | Updated Mar 26 |
| `GrowthAuditForm` | Main application form (6 fields) | — | Updated Mar 26 |
| `GrowthLeadMagnetCTA` | Two-column: ebook cover + form | — | Updated Mar 26 |
| `GrowthFooter` | Dark branded footer | — | Unchanged |

All components located in: `/src/components/sections/growth/` (10 components total, removed GrowthProofBar and GrowthVSL)

### Server Actions

File: `/src/lib/actions/growth.ts`

| Action | Signature | Purpose | Email Template |
|--------|-----------|---------|-----------------|
| `submitAuditForm` | `(prevState: GrowthFormState, formData: FormData) => Promise<GrowthFormState>` | Main audit application | Sends to cretualin@aceagency.ro with name, storeUrl, revenue, adsBudget, triedBefore, blocaj |
| `submitLeadMagnet` | `(prevState: GrowthFormState, formData: FormData) => Promise<GrowthFormState>` | Lead magnet download capture | Sends to cretualin@aceagency.ro with name, email, storeUrl |

**Features:**
- Honeypot spam protection (silent accept for bots)
- Zod schema validation (both client + server)
- Resend email delivery
- Redirects to Calendly URL on success: `https://calendly.com/aceagency/audit-gratuit`
- Returns `GrowthFormState` with `success`, `errors`, `message`, `redirectUrl`

### Validation Schemas

File: `/src/lib/validations/growth-schema.ts`

| Schema | Fields | Error Messages | Notes |
|--------|--------|----------------|-------|
| `auditFormSchema` | name, storeUrl, revenue, adsBudget, triedBefore, blocaj, honeypot | i18n keys (e.g., 'nameMinLength') | Main form, Zod-based |
| `leadMagnetSchema` | name, email, storeUrl, honeypot | i18n keys (e.g., 'emailInvalid') | Mini form for lead magnet |

**Constants:**
- `revenueOptions`: ['sub-5000', '5000-10000', '10000-30000', '30000-100000', 'peste-100000']
- `adsBudgetOptions`: ['sub-1000', '1000-3000', '3000-10000', '10000-30000', 'peste-30000']
- `triedBeforeOptions`: ['nimic', 'facebook-ads', 'google-ads', 'tiktok-ads', 'seo', 'email-marketing', 'agentie', 'freelancer', 'in-house']

### Internationalization (i18n)

**Namespace:** `growth` in `src/messages/ro.json` and `en.json`

**Structure (Mar 26 updates):**
```json
{
  "growth": {
    "meta": { "title", "description" },
    "hero": { "headline", "subheadline" },
    "vsl": { "cta" },
    "clientLogos": { "label" },
    "services": { "heading", "subheading", "items": { "0": {...}, ... } },
    "caseStudies": { "heading", "subheading", "items": { "0": {...}, ... } },
    "process": { "overline", "description", "heading", "steps": { "0": {...}, ... } },
    "guarantee": { "overline", "heading", "description", "reinforcement", "cta" },
    "faq": { "overline", "heading", "items": { "0": {...}, ... } },
    "auditForm": { "overline", "description", "heading", "subheading", "fields": {...}, "submit", "submitting", "validation": {...}, "error": {...} },
    "leadMagnet": { "heading", "subheading", "title", "fields": {...}, "submit", "submitting", "success", "validation": {...} },
    "growthFooter": { ... }
  }
}
```

**New Keys Added (Mar 26):**
- `growth.guarantee.*` (overline, heading, description, reinforcement, cta)
- `growth.process.overline`, `growth.process.description`
- `growth.faq.overline`
- `growth.auditForm.overline`, `growth.auditForm.description`

---

## Data Flow

### Audit Application Flow

```
User fills GrowthAuditForm
    ↓
useActionState(submitAuditForm)
    ↓
Client-side validation (on-blur) via auditFormSchema
    ↓
Form submits → Server Action
    ↓
Honeypot check (silent success if filled)
    ↓
Server-side Zod validation
    ↓
If valid: Send email via Resend
    ↓
Return { success: true, redirectUrl: CALENDLY_URL }
    ↓
useEffect triggers redirect to Calendly
    ↓
trackEvent('generate_lead', { event_category: 'growth', event_label: 'audit_form' })
```

### Lead Magnet Flow

```
User fills lead magnet form (GrowthLeadMagnetCTA or /growth/checklist)
    ↓
useActionState(submitLeadMagnet)
    ↓
Client-side validation via leadMagnetSchema
    ↓
Form submits → Server Action
    ↓
Honeypot check
    ↓
Server-side Zod validation
    ↓
If valid: Send email via Resend
    ↓
Return { success: true }
    ↓
useEffect shows success toast / redirects to /growth/multumesc
```

### Email Notifications

**Audit Form Email:**
- **To:** cretualin@aceagency.ro
- **Subject:** 🔥 Aplicatie Audit Growth Engine - {name}
- **Body:** HTML template with all form fields

**Lead Magnet Email:**
- **To:** cretualin@aceagency.ro
- **Subject:** 📥 Lead Magnet Download - {name}
- **Body:** HTML template with name, email, storeUrl

---

## Layout Enhancements

### SectionWrapper `compact` Prop

Added to `/src/components/sections/SectionWrapper.tsx`:

```typescript
interface SectionWrapperProps {
  // ... existing props
  /** Use tighter padding for compact layouts (e.g. growth funnel). Default: false */
  readonly compact?: boolean;
}
```

**Usage:**
```tsx
<SectionWrapper theme="dark" compact>
  <SectionHeader ... />
  {/* Content */}
</SectionWrapper>
```

**Effect:** Reduces top/bottom padding for funnel pages where vertical whitespace should be minimal for conversion velocity.

---

## External Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `resend` | Email delivery | Latest |
| `next-intl` | i18n routing & translations | Latest |
| `zod` | Schema validation | Latest |
| `react-hook-form` | Form state (not used in growth forms) | Latest |
| `lucide-react` | Icons (Loader2 spinner) | Latest |

---

## SEO & Schema

### JSON-LD Schemas Rendered

1. **Organization Schema** — Standard on all pages
2. **Service Schema** — "ACE Growth Engine" service definition
3. **FAQ Schema** — 7 FAQ items for AI crawlers

### Meta Tags

**Title (max 60 chars):** "ACE Growth Engine — Sistem complet de crestere pentru magazine online"

**Description (max 155 chars):** "Reclame pe Meta, TikTok si Google + creative incluse + CRO + email marketing — totul gestionat de o singura echipa, monitorizat de AI, cu rezultate masurabile din prima luna."

**Canonical:** Auto-set via `generatePageMetadata()`

**OG Tags:** Auto-set via `generatePageMetadata()`

---

## Analytics & Tracking

### Events Tracked

| Event | Trigger | Properties |
|-------|---------|-----------|
| `generate_lead` | Audit form success | event_category: 'growth', event_label: 'audit_form' |

**Implementation:** `trackEvent()` in `GrowthAuditForm.tsx` on Calendly redirect

---

## Form Error Handling

### Client-Side Validation

- **On-blur field validation** via `validateField()` callback in `GrowthAuditForm`
- Errors resolved from i18n namespace: `growth.auditForm.validation.*`
- Real-time feedback without server round-trip

### Server-Side Validation

- Zod `safeParse()` validates all fields
- Returns `fieldErrors` on fail
- Error keys map to i18n: `growth.auditForm.validation.{errorKey}`

### Error Display

```tsx
{getFieldError('fieldName') && (
  <p className={errorClasses}>{getFieldError('fieldName')}</p>
)}
```

---

## Related Areas

- **Homepage** — Links to `/growth` via header CTA "Cere o Analiza" + footer
- **Blog** — Growth-related articles can link to `/growth` for lead capture
- **Case Studies** — Growth case studies (IT Mar, Amora, Trady) preview on funnel
- **Services** — Individual service pages can link to `/growth` funnel for upsell

---

## Visual Design Upgrades (March 26)

All inspired by vladpuscas.ro:

1. **Shine Effect on CTAs** — Animated gradient sweep across all buttons
2. **Radial Violet Glows** — Background depth with purple/mint glows
3. **Grid Pattern Overlay** — Hero section has subtle grid for depth
4. **Pulsing Glow Effects** — Key elements pulse to draw attention
5. **Deep Box Shadows** — Layering and visual hierarchy
6. **Repeated CTAs** — Conversion points after case studies, process, FAQ
7. **Gradient Step Numbers** — Process section uses violet→mint gradients
8. **Two-Column Layout** — LeadMagnetCTA displays ebook cover + form side-by-side

## TODOs / Future Enhancements

1. **TheMarketer Integration** — Currently commented out in server actions:
   - Audit form: `addSubscriber({ email, name, tags: ['aplicat-audit'], listName: 'Leads Noi' })`
   - Lead magnet: `addSubscriber({ ... tags: ['lead-magnet-checklist'] })` + 7-email nurture sequence

2. **Calendly Integration** — Currently static URL, can be replaced with dynamic booking widget

3. **A/B Testing** — Setup Vercel Analytics experiment for form field order / CTA copy variations

4. **SMS Notifications** — Optional Twilio integration for lead alerts to sales team

---

## File Structure

```
src/
├── app/[locale]/growth/
│   ├── page.tsx                    # Main funnel page (10 sections)
│   ├── checklist/page.tsx          # Lead magnet landing + poster image
│   └── multumesc/page.tsx          # Thank you page
├── components/sections/growth/
│   ├── GrowthHero.tsx              # Merged with VSL (video thumbnail included)
│   ├── GrowthClientLogos.tsx
│   ├── GrowthServices.tsx          # Visual redesign
│   ├── GrowthCaseStudies.tsx       # Visual redesign + CTA
│   ├── GrowthProcess.tsx           # Visual redesign (gradient numbers)
│   ├── GrowthGuarantee.tsx         # NEW — Money-back guarantee
│   ├── GrowthFAQ.tsx               # Visual redesign + CTA
│   ├── GrowthAuditForm.tsx         # Visual redesign
│   ├── GrowthLeadMagnetCTA.tsx     # Two-column: ebook cover + form
│   └── GrowthFooter.tsx
├── lib/
│   ├── actions/growth.ts           # Server actions: submitAuditForm, submitLeadMagnet
│   └── validations/growth-schema.ts # Zod schemas + constants
├── messages/
│   ├── ro.json                     # Growth namespace + new guarantee/process keys
│   └── en.json                     # Growth namespace + new guarantee/process keys
└── public/images/growth/
    ├── vsl-thumb.webp             # YouTube thumbnail (hero)
    ├── ebook-cover.webp           # Ebook cover (lead magnet CTA)
    ├── og-image.webp              # Open Graph image
    └── checklist-poster.webp      # Poster on /growth/checklist
```

---

## Performance Notes

- **VSL Video:** Embedded externally (YouTube/Vimeo) to avoid large downloads
- **Client Logos:** Marquee component with CSS animation (no JS-driven)
- **Form Validation:** Split between client (on-blur) and server (safeParse) for UX + security
- **Email Delivery:** Async via Resend, doesn't block form response

---

---

## Changelog — March 26, 2026

**What Changed:**
- GrowthHero and GrowthVSL merged (VSL video thumbnail now in hero)
- GrowthProofBar removed from page (component still exists but not imported)
- GrowthGuarantee added (new component for risk reversal)
- Section count: 11 → 10 (merger and removal offset new guarantee)
- Visual design upgraded with shine effects, glows, shadows, pulsing elements
- i18n added: guarantee, process.overline/description, faq.overline, auditForm.overline/description
- Canva assets integrated: vsl-thumb.webp, ebook-cover.webp, og-image.webp, checklist-poster.webp
- LeadMagnetCTA redesigned with two-column layout (ebook cover + form)
- All visual components redesigned (Services, CaseStudies, Process, FAQ, AuditForm)

**Files Modified:**
- `src/app/[locale]/growth/page.tsx` — Removed ProofBar and VSL imports
- `src/components/sections/growth/GrowthHero.tsx` — Major rewrite
- `src/components/sections/growth/GrowthGuarantee.tsx` — NEW
- `src/components/sections/growth/GrowthServices.tsx` — Visual redesign
- `src/components/sections/growth/GrowthCaseStudies.tsx` — Visual redesign
- `src/components/sections/growth/GrowthProcess.tsx` — Visual redesign
- `src/components/sections/growth/GrowthFAQ.tsx` — Visual redesign
- `src/components/sections/growth/GrowthAuditForm.tsx` — Visual redesign
- `src/components/sections/growth/GrowthLeadMagnetCTA.tsx` — Two-column layout
- `src/messages/ro.json` — Added guarantee, process, faq, auditForm keys
- `src/messages/en.json` — Added guarantee, process, faq, auditForm keys
- `src/app/[locale]/growth/checklist/page.tsx` — Added poster image

---

**Generated:** March 26, 2026
**Last Updated:** March 26, 2026
**Maintainer:** AceAgency Development Team
**ClickUp Task:** 869cjzqy0 (Due: March 29, 2025)
