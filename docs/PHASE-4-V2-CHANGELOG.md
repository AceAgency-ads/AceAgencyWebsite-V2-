# Phase 4 v2: Homepage Redesign Update (March 18, 2026)

**Status:** Complete — Homepage expanded from 10 sections to 13 sections + 1 overlay

**Summary:** Enhanced trust-first homepage flow with concrete before/after results proof, partner certifications, expanded FAQ engagement, and exit-intent recovery modal.

---

## What Changed

### Removed Sections (2 total)
1. **VideoTestimonials** — 3 video testimonial cards in dark theme
   - **Reason:** Replaced by BeforeAfterPreview for more concrete social proof
   - **Impact:** Visitors see measurable results instead of testimonial videos
   - **Files affected:** Component removed, i18n keys deprecated

2. **LeadMagnet** — Ebook download form in dark+light theme
   - **Reason:** Functionality replaced by HomeFAQ for early engagement + FAQ page for deep engagement
   - **Impact:** Email capture deferred to FAQ, reducing form friction on homepage
   - **Files affected:** Component removed, i18n keys deprecated

### Added Sections (4 total)

#### 1. CertificationBadges (Section 4)
- **Location:** After ClientLogoBar, before ConversionProcess
- **Theme:** Dark
- **Layout:** 5 badges in responsive grid (2-col mobile, 3-col tablet, 5-col desktop)
- **Visual:** Grayscale + 60% opacity → full color on hover
- **Content:** 5 partner certifications (Google Partner, Meta Business Partner, TikTok, Google Analytics, Google Ads)
- **File:** `src/components/sections/home/CertificationBadges.tsx`
- **i18n:** `home.certifications.*`

#### 2. BeforeAfterPreview (Section 7)
- **Location:** After ServicesPreview, before StatsSection
- **Theme:** Light
- **Layout:** 3-column card grid (1-column mobile)
- **Visual:** Before (muted strikethrough) → Arrow → After (violet CountUp animated)
- **Content:** 3 client before/after examples with improvement badge
- **Animation:** Fade-up on scroll, CountUp triggers at 80% scroll
- **File:** `src/components/sections/home/BeforeAfterPreview.tsx`
- **i18n:** `home.beforeAfter.*`

#### 3. HomeFAQ (Section 11)
- **Location:** After Testimonials, before CTASection
- **Theme:** Light
- **Layout:** Centered accordion (max-width 768px)
- **Visual:** Expandable FAQ items using shadcn Accordion (Radix UI)
- **Content:** 8-10 FAQ items with questions + answers
- **Schema:** FAQPage JSON-LD generated for AI crawlers
- **CTA:** Link to full FAQ page `/intrebari-frecvente`
- **File:** `src/components/sections/home/HomeFAQ.tsx`
- **i18n:** `home.faq.*`

#### 4. ExitIntentPopup (Overlay)
- **Type:** Desktop-only overlay (not a section)
- **Trigger:** Mouseleave at top of viewport
- **Timing:** 30-second delay after page load, once per session, skip 7 days after dismiss
- **Theme:** Dark card with violet gradient glow
- **Visual:** Full-screen backdrop + centered dark card with close button
- **Animation:** Framer Motion fade-in + scale-in
- **Behavior:** SessionStorage + localStorage for tracking (no-op on touch devices)
- **File:** `src/components/sections/home/ExitIntentPopup.tsx`
- **Hook:** `src/lib/hooks/useExitIntent.ts`
- **i18n:** `home.exitIntent.*`

### New Homepage Section Order (13 total)

```
1.  Hero (dark)
2.  HeroTransition (dark)
3.  ClientLogoBar (dark)
4.  CertificationBadges (dark) ← NEW
5.  ConversionProcess (dark)
6.  ServicesPreview (light-warm)
7.  BeforeAfterPreview (light) ← NEW
8.  StatsSection (dark)
9.  AboutPreview (dark)
10. Testimonials (light-warm)
11. HomeFAQ (light) ← NEW
12. CTASection (violet)

+ ExitIntentPopup (overlay) ← NEW
```

---

## Files Modified

### Components
- `src/components/sections/home/CertificationBadges.tsx` (NEW)
- `src/components/sections/home/BeforeAfterPreview.tsx` (NEW)
- `src/components/sections/home/HomeFAQ.tsx` (NEW)
- `src/components/sections/home/ExitIntentPopup.tsx` (NEW)
- `src/app/[locale]/page.tsx` (updated imports & section order)

### Hooks
- `src/lib/hooks/useExitIntent.ts` (NEW)

### Translations
- `src/messages/ro.json` (added certifications, beforeAfter, faq, exitIntent; removed videoTestimonials, leadMagnet)
- `src/messages/en.json` (same changes)

### Design System
- `design-system/pages/home.md` (complete rewrite of section structure)

### Documentation
- `docs/DOCUMENTATION-INDEX.md` (updated status & component APIs)
- `docs/CODEMAPS-INDEX.md` (updated homepage architecture diagram & section registry)
- `docs/PHASE-4-V2-CHANGELOG.md` (this file — NEW)

### Assets
- `public/images/certifications/` (new directory with 5 badge images)

---

## Design Decisions

### Why CertificationBadges After ClientLogoBar?
- **Flow:** Establish trust with customer logos first, then validate with official partnerships
- **Positioning:** Early in page flow (section 4) for maximum credibility impact before methodology
- **Visual:** Grayscale default matches neutral content tone; hover reveals partner prestige

### Why BeforeAfterPreview Before Stats?
- **Narrative:** Concrete client stories (before→after) → aggregate metrics (stats) → broader proof
- **Engagement:** Shows real transformation before asking visitor to believe big numbers
- **Metrics:** CountUp animation on "after" metric creates visual impact similar to stats

### Why HomeFAQ Before CTA?
- **Friction:** Addresses last-minute objections without form interruption
- **Engagement:** Interactive accordion keeps visitor engaged before final conversion ask
- **SEO:** FAQ section + FAQPage schema improves AI crawler understanding of common questions
- **Deferred:** Email capture moved from LeadMagnet to dedicated `/intrebari-frecvente` page

### Why ExitIntentPopup Overlay?
- **Recovery:** Catches leaving visitors with secondary offer (contact form)
- **Frequency:** Shows once per session, respects 7-day dismiss to avoid annoyance
- **Desktop-only:** Respects mobile UX (no intrusive popups on small screens)
- **Timing:** 30s delay allows page exploration before activation

---

## Analytics Tracking Opportunities

### New Metrics to Monitor
1. **Certification Badges:** Hover rate on each badge
2. **BeforeAfterPreview:** Click-through rate to `/studii-de-caz`
3. **HomeFAQ:** Accordion expand rate per question; click-through to full FAQ
4. **ExitIntentPopup:** Show rate; dismiss rate; CTA conversion rate

### Expected Impacts
- **Bounce rate:** Likely decrease (more engagement points)
- **Time on page:** Likely increase (more sections + interactive elements)
- **Conversion rate:** Monitor impact of email capture deferral (LeadMagnet → FAQ page)
- **Exit rate:** Monitor exit-intent popup effectiveness at retention

---

## Developer Checklist

Before deploying Phase 4 v2:

- [x] New components created (4)
- [x] New hook created (1)
- [x] i18n keys added to ro.json and en.json
- [x] Homepage section imports updated
- [x] Section order updated in page.tsx
- [x] Design system page spec updated
- [x] Codemaps updated
- [x] Documentation index updated
- [ ] Test responsive layouts (mobile/tablet/desktop)
- [ ] Verify exit-intent popup on desktop (test mouseleave behavior)
- [ ] Validate FAQ accordion accessibility
- [ ] Test CountUp animation performance on slow devices
- [ ] Verify certification badge images load (check `/public/images/certifications/`)
- [ ] Run ESLint, TypeScript check, build
- [ ] Test in production environment

---

## Rollback Plan

If issues arise, rollback involves:
1. Remove new section imports from `src/app/[locale]/page.tsx`
2. Restore old section order (add VideoTestimonials + LeadMagnet back)
3. Revert i18n keys in messages files
4. Delete component files (CertificationBadges, BeforeAfterPreview, HomeFAQ, ExitIntentPopup)
5. Delete hook file (useExitIntent.ts)

**Estimated rollback time:** 10 minutes

---

## Next Steps

### Immediate (Post-Deployment)
1. Monitor analytics for engagement changes
2. Test exit-intent popup on various desktop browsers
3. Gather user feedback on new section order
4. Monitor email capture rate shift (LeadMagnet removal)

### Short-term (2 weeks)
1. Add real certification badge images (replace placeholders)
2. Replace placeholder before/after metrics with real client examples
3. Populate HomeFAQ with 10-15 actual FAQs
4. Create dedicated `/intrebari-frecvente` (FAQ) page

### Medium-term (1 month)
1. A/B test exit-intent popup copy/design
2. A/B test before/after vs case studies positioning
3. Monitor exit-intent popup performance on mobile (consider enabling if viable)
4. Measure impact on overall conversion rate

---

**Last Updated:** March 18, 2026
**Author:** Documentation & Codemap Specialist
**Status:** Phase 4 v2 Complete and Documented
