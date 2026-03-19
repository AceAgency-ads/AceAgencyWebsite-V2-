# Laboratorul de Conversii Documentation Index

**Last Updated:** March 18, 2026
**Status:** Phase 4 Complete (Updated) — Homepage Redesign v2 with Certification Badges, Before/After Preview, FAQ & Exit Intent

---

## Quick Navigation

### Design System (Source of Truth)

| Document | Purpose | Key Content |
|----------|---------|------------|
| `design-system/MASTER.md` | Complete visual language spec | Colors, typography, themes, animations, layout patterns |
| `design-system/components.md` | Component pattern library | 21 UI & layout components with API specs |
| `design-system/tokens.css` | Design token definitions | CSS variables for colors, spacing, typography, animations |

### Page Specifications

| Document | Route | Sections | Status |
|----------|-------|----------|--------|
| `design-system/pages/home.md` | `/` | 10 sections (Hero → Newsletter) | Current |
| `design-system/pages/despre-noi.md` | `/despre-noi` | 9 sections (Hero → Team) | Phase 3 Complete |
| `design-system/pages/servicii.md` | `/servicii` | Services index page | Documented |
| `design-system/pages/contact.md` | `/contact` | Contact form page | Documented |
| `design-system/moodboard.md` | Reference | Visual direction & inspiration | Design reference |

### Phase Documentation

| Document | Scope | Content |
|----------|-------|---------|
| `docs/PHASE-4-HOMEPAGE-REDESIGN.md` | Phase 4 | Homepage UX redesign, trust-first flow, AdPilot legal pages, rebrand |
| `docs/PHASE-3-WARM-LIGHT-REFRESH.md` | Phase 3 | Warm light visual refresh, new components, theme changes (reference) |

---

## Brand Rebrand: AceAgency → Laboratorul de Conversii (March 16, 2026)

**Status:** Complete across all components, translations, and documentation

### What Changed
- **Brand Name:** AceAgency → Laboratorul de Conversii (RO) / Conversion Lab (EN)
- **Color System:** Burgundy (#56151A, #7A2025) → Electric Violet (#650CBE, #7A1FD8, #4A0A8F)
- **Theme Tokens:** `burgundy` → `violet` across CSS and components
- **Organization Structure:** Removed division structure (AceWeb, AceAds, AceAI, AceMedia) — now single unified brand
- **i18n Messaging:** All service titles and brand language reframed around conversion systems (not generic marketing)
- **Documentation:** All project docs, design system specs, and technical guides updated to reflect new brand

### Updated Files (Primary)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/CLAUDE.md` — Project configuration
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/MASTER.md` — Color tokens, visual language
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/ro.json` — Romanian translations
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/en.json` — English translations
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/llms.txt` — AI crawler guidance

### Theme Mapping
| Old (Burgundy) | New (Violet) | Hex |
|---|---|---|
| [data-theme="burgundy"] | [data-theme="violet"] | #650CBE |
| rgba(86,21,26,...) | rgba(101,12,190,...) | Electric Violet |

---

## What Changed in Phase 4 (Latest Update — March 18, 2026)

### Homepage Redesign v2 — Enhanced Trust Flow with Concrete Proof
Original Phase 4 redesign (trust-first flow) now enhanced with additional conversion-focused components:

1. **Previous Phase 4 Sections (March 16):**
   - Hero → HeroTransition → ClientLogoBar → VideoTestimonials → ConversionProcess → ServicesPreview → StatsSection → CaseStudyPreview → AboutPreview → LeadMagnet → Testimonials → CTASection

2. **New Phase 4 Sections Added (March 18):**
   - **CertificationBadges** (Section 4A — after ClientLogoBar)
   - **BeforeAfterPreview** (Section 6A — after ServicesPreview, before StatsSection)
   - **HomeFAQ** (Section 11A — after Testimonials, before CTASection)
   - **ExitIntentPopup** (Desktop overlay — triggered on exit intent, 30s delay, once per session)

3. **Removed Sections:**
   - VideoTestimonials (REMOVED as of March 18)
   - LeadMagnet (REMOVED as of March 18)
   - Newsletter (removed in Phase 4 initial)

4. **New Components (4):**
   - **CertificationBadges** — Grid of partner certifications (grayscale → color on hover, dark theme)
   - **BeforeAfterPreview** — 3-card grid showing before/after metrics with improvement badges and animated CountUp
   - **HomeFAQ** — Accordion FAQ section with FAQPage JSON-LD schema, links to full FAQ page
   - **ExitIntentPopup** — Premium exit-intent modal with dark card, violet gradient glow, CTA to contact

5. **New Hook (1):**
   - **useExitIntent** — Detects desktop exit intent (mouseleave at top), respects dismiss/localStorage cache, desktop-only

### AdPilot Legal Pages (New)
- **`/adpilot/privacy`** — Privacy policy for Meta app review
- **`/adpilot/terms`** — Terms of service for Meta app review
- Both reuse existing LegalHero + LegalContent components
- LegalContent namespace type extended: `'adpilotPrivacy' | 'adpilotTerms'`

---

## What Changed in Phase 3 (Previous)

### New Design Theme
**`light-warm`** — Warm off-white (#FAF9F7) background with warm greige text (#71706E). Used for customer-facing sections (Services, Testimonials, Values, Story).

### New Components (4)
1. **VideoTestimonialCard** — Click-to-play video testimonial cards
2. **ClientLogoBar** — Infinite CSS marquee of client logos
3. **TeamSection** — Team member photo grid with GSAP animation
4. **ConversionProcess** — 5-step conversion methodology section with animated steps and connectors

### Updated Sections (8 Total)
**Homepage:**
- ServicesPreview: `dark` → `light-warm`
- Testimonials: `dark` → `light-warm`

**About Page:**
- StorySection: `light` → `light-warm`
- ValuesSection: `dark` → `light-warm`
- WhyChooseUs: `dark` → `light-warm`
- MissionVision: `light` → `dark`

**Service Pages:**
- ServiceFeatures: `light` → `light-warm`
- ServiceStats: `dark` → `light-warm`

**Contact Page:**
- ContactForm + ContactFAQ: `dark` → `light-warm`

---

## Core Design Tokens

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Burgundy (Accent) | #56151A | CTAs, links, highlights, brand signature |
| Black | #262523 | Dark backgrounds, primary text on light |
| White | #FFFFFF | Light backgrounds, primary text on dark |
| Grey | #D9D9D9 | Secondary text on dark, borders |
| Warm Greige (Muted) | #71706E | Muted text on light-warm backgrounds |
| Warm Off-white (BG) | #FAF9F7 | light-warm section backgrounds |

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headings | Glacial Indifference | 400, 700 | H1-H3 titles, display text |
| Subheadings | Red Hat Display | 400, 500 | Descriptions, section labels |
| Body | Inter | 400, 500, 600 | Paragraph text, labels |

### Spacing & Layout

| Element | Size | Usage |
|---------|------|-------|
| Container max-width | 1280px | max-w-7xl |
| Section padding | 16-32px | Responsive horizontal |
| Section vertical | 64-96px | py-16 to py-24 |
| Grid gap | 24px | Bento & card grids |

---

## Section Theming Guide

### Dark Theme
- **Background:** #262523
- **Text:** White (#FFFFFF)
- **Muted:** Grey (#D9D9D9)
- **Use:** Dark backgrounds, technical sections, client logos
- **Card BG:** #3a3836 (elevated)

### Light Theme
- **Background:** #FFFFFF
- **Text:** Black (#262523)
- **Muted:** Grey (#666666)
- **Use:** Clean, minimal sections
- **Card BG:** White

### Light-Warm Theme (NEW)
- **Background:** #FAF9F7 (warm off-white)
- **Text:** Black (#262523)
- **Muted:** Warm Greige (#71706E)
- **Use:** Premium, inviting customer sections
- **Card BG:** White
- **Premium feel** with accessible contrast

### Accent/Burgundy Theme
- **Background:** #56151A
- **Text:** White (#FFFFFF)
- **Use:** CTAs, premium statements, brand moments
- **Card BG:** #4a1015

---

## Animation System

All animations built with GSAP. Key patterns:

| Animation | Trigger | Duration | Usage |
|-----------|---------|----------|-------|
| Fade-up | Scroll 85% | 500-600ms | ScrollReveal, card entrance |
| Text stagger | Load/scroll | 0.6s per item | Titles, headlines |
| CountUp | Scroll 80% | 2s | Stats numbers |
| Parallax | Scroll scrub | Continuous | ParallaxLayer |
| Hero exit | Pinned scroll | Varies | Hero sections |

**Accessibility:** All animations respect `prefers-reduced-motion: reduce`

---

## Component API Reference

### SectionWrapper
```tsx
<SectionWrapper
  theme="light-warm" // 'dark' | 'light' | 'light-warm' | 'light-muted' | 'accent' | 'burgundy'
  id="section-id"
  rounded={true}     // Floating panel effect
  hero={false}       // Extra padding for hero sections
>
  {children}
</SectionWrapper>
```

### CertificationBadges
```tsx
<CertificationBadges />
// Renders 5 certification badge logos from i18n
// Dark theme, grayscale → color on hover transition
// Layout: 2-col mobile, 3-col tablet, 5-col desktop
// i18n keys:
//   home.certifications.overline
//   home.certifications.heading
//   home.certifications.badges[0-4].name
//   home.certifications.badges[0-4].src
```

### BeforeAfterPreview
```tsx
<BeforeAfterPreview />
// Renders 3 before/after metric cards with improvement badges
// Light theme, CountUp animations triggered at scroll 80%
// Shows before (muted strikethrough) → after (violet + animated)
// i18n keys:
//   home.beforeAfter.overline
//   home.beforeAfter.heading
//   home.beforeAfter.labelBefore
//   home.beforeAfter.labelAfter
//   home.beforeAfter.items[0-2].client
//   home.beforeAfter.items[0-2].industry
//   home.beforeAfter.items[0-2].metricBefore
//   home.beforeAfter.items[0-2].metricAfter
//   home.beforeAfter.items[0-2].metricSuffix
//   home.beforeAfter.items[0-2].metricLabel
//   home.beforeAfter.items[0-2].improvement
//   home.beforeAfter.items[0-2].summary
//   home.beforeAfter.cta
```

### HomeFAQ
```tsx
<HomeFAQ />
// Accordion FAQ section with FAQPage JSON-LD schema
// Light theme, using shadcn Accordion (Radix UI)
// Links to full FAQ page (/intrebari-frecvente)
// i18n keys:
//   home.faq.overline
//   home.faq.heading
//   home.faq.items[].question
//   home.faq.items[].answer
//   home.faq.cta
```

### ExitIntentPopup
```tsx
<ExitIntentPopup />
// Desktop-only exit-intent modal triggered by mouseleave at viewport top
// Uses useExitIntent hook for state management
// Full-screen backdrop with dark card, violet gradient glow
// Features: 30s delay, once per session, 7-day dismiss cache
// i18n keys:
//   home.exitIntent.overline
//   home.exitIntent.heading
//   home.exitIntent.description
//   home.exitIntent.cta
//   home.exitIntent.dismiss
```

### ClientLogoBar
Auto-renders client logos from i18n. Update:
- `home.clientLogos.heading` — Section overline
- `CLIENT_LOGOS` array in component source

### TeamSection
Auto-renders team members from i18n. Update:
- `about.team.overline` — Section overline
- `about.team.heading` — Section title
- `about.team.members[]` — Array of {name, role, image}

---

## Asset Locations

### Images
- **Team photos:** `/public/images/team/` (3:4 aspect, ~300x400px)
- **Client logos:** `/public/images/clients/` (SVG preferred, ~120x40px)
- **Testimonial thumbnails:** `/public/images/testimonials/` (16:9 aspect)
- **Service icons:** `/public/icons/` (SVG, 48px)

### Fonts
- **Glacial Indifference:** `/public/fonts/` (400, 700 weights)
- **Red Hat Display:** `/public/fonts/` (400, 500 weights)
- **Inter:** Google Fonts (loaded via next/font)

### CSS
- **Global styles:** `src/styles/globals.css`
- **Design tokens:** `design-system/tokens.css`
- **Tailwind config:** `tailwind.config.ts`

---

## i18n Structure

### Translation Files
- `src/messages/ro.json` — Romanian content
- `src/messages/en.json` — English content

### Key Namespaces
- `home` — Homepage sections
- `about` — About page sections
- `services` — Service pages (Google Ads, Facebook Ads, etc.)
- `contact` — Contact form + FAQ
- `navigation` — Header, footer, menu
- `common` — Shared strings

### Adding New Content
1. Add i18n key to both `ro.json` and `en.json`
2. Use `useTranslations(namespace)` in component
3. Access via `t('key.path')`

---

## Development Workflow

### Running Locally
```bash
npm run dev              # Start dev server at localhost:3000
npm run build           # Production build
npm run lint            # Run ESLint
npm run type-check      # TypeScript check
```

### Adding New Sections
1. Create component in `src/components/sections/`
2. Use `SectionWrapper` with appropriate theme
3. Reference design tokens in MASTER.md
4. Add i18n keys
5. Update relevant page spec in `design-system/pages/`

### Updating Design Tokens
1. Edit `design-system/tokens.css` with new values
2. Update MASTER.md color palette section
3. Add theme example to components.md if new theme

---

## Quality Checklist

Before committing:
- [ ] Components use CSS variables for colors (`var(--section-text)`, etc.)
- [ ] Mobile responsive (320px minimum)
- [ ] GSAP animations added for enhanced experience
- [ ] Accessibility: ARIA labels, keyboard nav, focus indicators
- [ ] No hardcoded colors (use theme tokens)
- [ ] i18n keys added to both ro.json and en.json
- [ ] Section specs updated in `design-system/pages/`
- [ ] Type definitions use `readonly` for immutability

---

## Common Issues & Solutions

### Component Not Themed
**Problem:** Text appears wrong color
**Solution:** Ensure SectionWrapper wraps component with correct `theme` prop

### Animation Not Firing
**Problem:** GSAP animation doesn't trigger
**Solution:** Check ScrollTrigger start position, verify component ref forwarding

### i18n Key Missing
**Problem:** "Missing translation" error
**Solution:** Add key to both ro.json and en.json in correct namespace

### Asset Not Loading
**Problem:** Image doesn't display
**Solution:** Check `/public/` path, verify file exists, check Next.js Image config

---

## File Paths (All Absolute)

### Design System
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/MASTER.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/components.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/tokens.css`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/home.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/despre-noi.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/servicii.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/contact.md`

### Components
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/CertificationBadges.tsx` (NEW Mar 18)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/BeforeAfterPreview.tsx` (NEW Mar 18)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/HomeFAQ.tsx` (NEW Mar 18)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ExitIntentPopup.tsx` (NEW Mar 18)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ConversionProcess.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ClientLogoBar.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/about/TeamSection.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/SectionWrapper.tsx`

### Hooks
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/lib/hooks/useExitIntent.ts` (NEW Mar 18)

### Global Styles
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/styles/globals.css`

### i18n
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/ro.json`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/en.json`

### Pages (App Router)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/page.tsx` (Homepage)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/adpilot/privacy/page.tsx` (NEW)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/adpilot/terms/page.tsx` (NEW)

### Documentation
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/PHASE-3-WARM-LIGHT-REFRESH.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/DOCUMENTATION-INDEX.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/home.md` (UPDATED)

---

## Next Steps (Phase 4+ / Post-AdPilot)

### Phase 4 Ongoing
- [ ] Test VideoTestimonials responsive behavior on mobile/tablet
- [ ] Validate CaseStudyPreview CountUp animation performance
- [ ] Wire real case study data (3 concrete client examples)
- [ ] Test LeadMagnet email capture with Resend integration
- [ ] Verify AdPilot legal pages render correctly in all locales

### Phase 5+
- [ ] Replace placeholder assets (team photos, client logos, video thumbnails)
- [ ] Wire real testimonial video URLs
- [ ] Implement ServicePhotoBlock component
- [ ] Add real team member bios
- [ ] Build portfolio page (V2)
- [ ] Build blog functionality (V2)
- [ ] Implement blog RSS/sitemap for AI crawlers
- [ ] Track GEO performance via NotebookLM integration

---

## Support & Questions

For documentation updates or clarifications:
1. Check MASTER.md for design principles
2. Reference components.md for component APIs
3. Look at page specs for section-specific details
4. See PHASE-3-WARM-LIGHT-REFRESH.md for latest changes
