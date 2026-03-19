# Homepage Quick Reference Guide

**Last Updated:** March 18, 2026
**Scope:** Phase 4 v2 — Current homepage structure with 13 sections + 1 overlay

---

## Homepage Structure at a Glance

```
┌─────────────────────────────────────────────┐
│ 1. Hero                        [dark]        │
│ 2. HeroTransition              [dark]        │
│ 3. ClientLogoBar               [dark]        │ ← SOCIAL PROOF
│ 4. CertificationBadges         [dark]        │
│ 5. ConversionProcess           [dark]        │
│ 6. ServicesPreview          [light-warm]     │
│ 7. BeforeAfterPreview          [light]       │ ← RESULTS PROOF
│ 8. StatsSection                [dark]        │
│ 9. AboutPreview                [dark]        │
│10. Testimonials             [light-warm]     │ ← ENGAGEMENT
│11. HomeFAQ                     [light]       │
│12. CTASection                 [violet]       │
└─────────────────────────────────────────────┘
        + ExitIntentPopup (overlay)
```

---

## Critical Component Paths

| Section | Component File | Theme | Key Feature |
|---------|---|---|---|
| 4 | `CertificationBadges.tsx` | dark | Grayscale → color hover |
| 7 | `BeforeAfterPreview.tsx` | light | CountUp metric animation |
| 11 | `HomeFAQ.tsx` | light | Accordion + FAQPage schema |
| Overlay | `ExitIntentPopup.tsx` | dark | Desktop-only, 30s delay |

---

## i18n Keys to Update

### For Content Updates

**Certifications (5 badges):**
```json
{
  "home.certifications.overline": "PARTENERI CERTIFICATI",
  "home.certifications.heading": "Certificari & Parteneriate",
  "home.certifications.badges": [
    { "name": "Google Partner", "src": "/images/certifications/google-partner.png" },
    { "name": "Meta Business Partner", "src": "/images/certifications/meta-business-partner.png" },
    // ... 3 more
  ]
}
```

**Before/After (3 items):**
```json
{
  "home.beforeAfter.items.0": {
    "client": "Client Name",
    "industry": "Industry Pill",
    "metricBefore": "X",
    "metricAfter": "Y",
    "metricSuffix": "%",
    "metricLabel": "Metric Type",
    "improvement": "+123%",
    "summary": "2-3 sentence description"
  }
}
```

**FAQ (8-10 items):**
```json
{
  "home.faq.items": [
    { "question": "Q1?", "answer": "A1..." },
    { "question": "Q2?", "answer": "A2..." }
  ]
}
```

**Exit Intent Popup:**
```json
{
  "home.exitIntent.heading": "Stop! Special Offer",
  "home.exitIntent.description": "Get 20% off your first project",
  "home.exitIntent.cta": "Claim Offer",
  "home.exitIntent.dismiss": "No thanks"
}
```

---

## Component API Quick Guide

### CertificationBadges
```tsx
<CertificationBadges />
// No props. Pulls from i18n home.certifications.*
// Outputs: Grid of 5 badges, responsive 2/3/5-col
```

### BeforeAfterPreview
```tsx
<BeforeAfterPreview />
// No props. Pulls from i18n home.beforeAfter.*
// Outputs: 3-card grid with CountUp animations
// CTA links to /studii-de-caz
```

### HomeFAQ
```tsx
<HomeFAQ />
// No props. Pulls from i18n home.faq.*
// Outputs: Centered accordion + FAQPage schema
// CTA links to /intrebari-frecvente
```

### ExitIntentPopup
```tsx
<ExitIntentPopup />
// No props. Uses useExitIntent hook internally
// Outputs: Desktop-only overlay modal
// Returns on empty JSX on mobile/touch
```

### useExitIntent Hook
```tsx
const { isVisible, dismiss } = useExitIntent();
// Returns: { isVisible: boolean, dismiss: () => void }
// Features: 30s delay, 1x per session, 7-day cache
```

---

## Common Modifications

### Update Certification Badge
1. Open `/public/images/certifications/` (or create if missing)
2. Add new badge image (PNG or SVG, ~140x60px)
3. Edit `src/messages/ro.json`:
   ```json
   "certifications.badges.0": {
     "name": "New Cert",
     "src": "/images/certifications/new-cert.png"
   }
   ```
4. Repeat for `en.json`

### Update Before/After Metrics
1. Edit `src/messages/ro.json`:
   ```json
   "beforeAfter.items.0": {
     "client": "New Client Name",
     "metricBefore": "5",
     "metricAfter": "22",
     // ... rest of fields
   }
   ```
2. Update `en.json` similarly
3. Verify metrics are numbers (not strings with units)

### Add FAQ Item
1. Edit `src/messages/ro.json`:
   ```json
   "faq.items": [
     // ... existing items
     { "question": "New Q?", "answer": "New A..." }
   ]
   ```
2. Update `en.json` similarly
3. FAQPage schema auto-regenerates

### Customize Exit Intent Popup
1. Edit `src/messages/ro.json` `home.exitIntent.*`
2. Change timing: Edit `useExitIntent.ts` constants:
   - `DELAY_MS = 30_000` (30 seconds)
   - `DISMISS_DAYS = 7` (7 days cache)
3. Change CTA: Edit ExitIntentPopup Link href

---

## Testing Checklist

### Desktop (Chrome/Safari/Firefox)
- [ ] Exit intent popup triggers after 30s delay
- [ ] Popup dismisses with X button
- [ ] Popup dismisses with "No thanks" button
- [ ] Popup shows only once per session
- [ ] Popup hidden on refresh after 7 days of dismissal
- [ ] CertificationBadges grayscale → color on hover (300ms)
- [ ] BeforeAfterPreview CountUp animates on scroll
- [ ] HomeFAQ accordion expands/collapses smoothly
- [ ] All CTAs link to correct pages

### Mobile (iOS/Android)
- [ ] Exit intent popup does NOT appear (desktop-only)
- [ ] CertificationBadges 2-col layout
- [ ] BeforeAfterPreview 1-col layout, cards stack
- [ ] HomeFAQ accordion responsive
- [ ] All touchable elements 48x48px minimum

### Accessibility
- [ ] Exit intent modal has focus trap
- [ ] Exit intent modal dismissable with Esc key
- [ ] Accordion keyboard navigable (arrow keys, Enter)
- [ ] All images have alt text
- [ ] Color contrast >4.5:1 for text

---

## Troubleshooting

### Exit Intent Popup Not Showing
- Check: Desktop browser (not mobile/tablet)
- Check: 30 seconds elapsed since page load
- Check: `sessionStorage` / `localStorage` not disabled
- Check: Browser console for errors
- Check: useExitIntent hook mounted in ExitIntentPopup component

### CountUp Animation Not Firing
- Check: Scroll position >80% of viewport
- Check: Component has `<ScrollReveal>` wrapper
- Check: GSAP ScrollTrigger loaded (check global window.gsap)
- Check: Browser supports CSS transforms

### Certification Badges Not Loading
- Check: Image files exist in `/public/images/certifications/`
- Check: Image paths in i18n match file names exactly (case-sensitive)
- Check: Image dimensions reasonable (max-width 140px)
- Check: Verify images load directly in browser URL bar

### FAQ Schema Not Generating
- Check: `faqSchema()` called in HomeFAQ
- Check: i18n keys match expected structure
- Check: Browser dev tools → Network → look for JSON-LD script tag
- Check: Test with Google's Structured Data Testing Tool

---

## File Locations (All Absolute)

**Components:**
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/CertificationBadges.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/BeforeAfterPreview.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/HomeFAQ.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ExitIntentPopup.tsx`

**Hooks:**
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/lib/hooks/useExitIntent.ts`

**Page:**
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/page.tsx`

**Translations:**
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/ro.json`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/en.json`

**Assets:**
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/images/certifications/`

**Documentation:**
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/home.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/DOCUMENTATION-INDEX.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/PHASE-4-V2-CHANGELOG.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/HOMEPAGE-QUICK-REFERENCE.md` (this file)

---

## Key Design Tokens

**Colors:**
- Primary accent: `#650CBE` (Electric Violet)
- Dark background: `#262523`
- Light background: `#FFFFFF`
- Light-warm background: `#FAF9F7`
- Muted text: `#D9D9D9`

**Animations:**
- Standard fade-up: 500ms
- CountUp: 2000ms
- Hover transition: 300ms
- Exit intent scale-in: 300ms

**Spacing:**
- Section horizontal padding: 16-32px (responsive)
- Section vertical padding: 64-96px
- Card gap: 24px

---

**For full details, see:**
- Design specs: `/design-system/pages/home.md`
- Component APIs: `/docs/DOCUMENTATION-INDEX.md`
- Architecture: `/docs/CODEMAPS-INDEX.md`
- Changelog: `/docs/PHASE-4-V2-CHANGELOG.md`
