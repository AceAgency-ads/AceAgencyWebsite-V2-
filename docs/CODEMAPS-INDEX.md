# Laboratorul de Conversii Codemaps Index

**Last Updated:** March 16, 2026
**Status:** Phase 4 Documentation Complete + Rebrand to Laboratorul de Conversii
**Scope:** Homepage UX redesign + AdPilot legal pages + Brand repositioning

---

## Quick Navigation

### Primary Codemaps (Source of Truth)

| Document | Scope | Purpose | Last Updated |
|----------|-------|---------|--------------|
| `design-system/pages/home.md` | Homepage | Complete page structure, sections, animations, i18n | Mar 16, 2026 |
| `design-system/MASTER.md` | Design System | Visual language, colors, typography, themes, components | Reference |
| `docs/DOCUMENTATION-INDEX.md` | Full Project | Master index with all documentation links and APIs | Mar 16, 2026 |

### Phase Documentation

| Document | Phase | Focus | Status |
|----------|-------|-------|--------|
| `docs/PHASE-4-HOMEPAGE-REDESIGN.md` | 4 | Trust-first flow + AdPilot legal pages | Complete |
| `docs/PHASE-3-WARM-LIGHT-REFRESH.md` | 3 | Warm light theme + new components | Reference |

### GEO & SEO Documentation

| Document | Scope | Purpose |
|----------|-------|---------|
| `docs/GEO-INDEX.md` | GEO Strategy | AI crawler optimization framework |
| `docs/GEO-IMPLEMENTATION.md` | GEO Rules | Citability, passage-level facts, stat labeling |
| `docs/GEO-CHANGELOG.md` | GEO History | Phase-by-phase GEO updates |

---

## Homepage Architecture (Phase 4)

```
┌─────────────────────────────────────────────────┐
│ Hero (dark)                                     │
│ └─ Headline animation + 2 CTAs                  │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ HeroTransition (dark)                           │
│ └─ Definition + ScrubReveal paragraph           │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ ClientLogoBar (dark) [MOVED UP - Phase 4]       │
│ └─ Infinite marquee of client logos             │
└─────────────────────────────────────────────────┘
        ↓ [TRUST FOUNDATION]
┌─────────────────────────────────────────────────┐
│ VideoTestimonials (dark) [NEW - Phase 4]        │
│ ├─ Desktop: 3-col grid layout                   │
│ └─ Mobile: Carousel with nav arrows             │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ ConversionProcess / "Metoda LAB" (dark)         │
│ └─ 5-step methodology with animations           │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ ServicesPreview (light-warm)                    │
│ └─ 6-card horizontal scroll carousel            │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ StatsSection (dark)                             │
│ └─ 4 stats with CountUp animations              │
└─────────────────────────────────────────────────┘
        ↓ [SOCIAL PROOF CRESCENDO]
┌─────────────────────────────────────────────────┐
│ CaseStudyPreview (light) [NEW - Phase 4]        │
│ ├─ 3-card grid with industry pills              │
│ ├─ CountUp animated metrics                     │
│ └─ Link to portfolio (/portofoliu)              │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ AboutPreview (dark)                             │
│ └─ Brand mission + visual element               │
└─────────────────────────────────────────────────┘
        ↓ [ENGAGEMENT HOOK]
┌─────────────────────────────────────────────────┐
│ LeadMagnet (dark outer + light inner) [NEW 4]   │
│ ├─ Left: Ebook cover placeholder (violet)      │
│ ├─ Right: Content + email form                  │
│ ├─ GDPR consent + honeypot spam prevention      │
│ └─ Reuses submitNewsletter server action        │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ Testimonials (light-warm)                       │
│ └─ Text testimonial cards, snap-scroll          │
└─────────────────────────────────────────────────┘
        ↓ [FINAL CONVERSION]
┌─────────────────────────────────────────────────┐
│ CTASection (violet)                             │
│ └─ "Gata sa Cresti Digital?" + 2 CTAs           │
└─────────────────────────────────────────────────┘
```

**Design Principle:** Trust-first flow positions social proof (logos, videos, stats, case studies) before asking for engagement or lead capture.

---

## Component Registry

### Home Sections

| Component | File Path | Theme | Responsive | Animations |
|-----------|-----------|-------|-----------|------------|
| HeroSection | `src/components/sections/home/HeroSection.tsx` | dark | Yes | Character stagger + fade-up |
| HeroTransition | `src/components/sections/HeroTransition.tsx` | dark | Yes | ScrubReveal paragraph |
| ClientLogoBar | `src/components/sections/home/ClientLogoBar.tsx` | dark | Yes | Marquee 20s infinite |
| VideoTestimonials | `src/components/sections/home/VideoTestimonials.tsx` | dark | Yes | Carousel + fade-up |
| ConversionProcess | `src/components/sections/home/ConversionProcess.tsx` | dark | Yes | Step stagger + hover |
| ServicesPreview | `src/components/sections/home/ServicesPreview.tsx` | light-warm | Yes | Pin + scrub scroll |
| StatsSection | `src/components/sections/home/StatsSection.tsx` | dark | Yes | CountUp 2s |
| CaseStudyPreview | `src/components/sections/home/CaseStudyPreview.tsx` | light | Yes | CountUp + fade-up |
| AboutPreview | `src/components/sections/home/AboutPreview.tsx` | dark | Yes | Fade-up directional |
| LeadMagnet | `src/components/sections/home/LeadMagnet.tsx` | dark+light | Yes | Fade-up staggered |
| Testimonials | `src/components/sections/home/Testimonials.tsx` | light-warm | Yes | Snap-scroll carousel |
| CTASection | `src/components/sections/home/CTASection.tsx` | violet | Yes | TextReveal + buttons |

### Shared Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| SectionWrapper | `src/components/sections/SectionWrapper.tsx` | Theme container (dark/light/light-warm/violet) |
| SectionHeader | `src/components/sections/SectionHeader.tsx` | Overline + heading + optional description |
| VideoTestimonialCard | `src/components/sections/home/VideoTestimonialCard.tsx` | Single video testimonial (play overlay, gradient fallback) |
| ScrollReveal | `src/components/animations/ScrollReveal.tsx` | Fade-up on scroll trigger (85%/80%) |
| CountUp | `src/components/animations/CountUp.tsx` | Animated number counter |
| LegalHero | `src/components/sections/legal/LegalHero.tsx` | Legal page header with breadcrumbs |
| LegalContent | `src/components/sections/legal/LegalContent.tsx` | Legal page content renderer |

---

## i18n Structure

### Home Namespace
- `home.meta.*` — SEO metadata
- `home.hero.*` — Hero section content
- `home.heroTransition.*` — HeroTransition section
- `home.clientLogos.*` — ClientLogoBar section
- `home.videoTestimonials.*` — VideoTestimonials section (NEW Phase 4)
- `home.conversionProcess.*` — ConversionProcess / "Metoda LAB"
- `home.services.*` — ServicesPreview section
- `home.stats.*` — StatsSection
- `home.caseStudies.*` — CaseStudyPreview section (NEW Phase 4)
- `home.about.*` — AboutPreview section
- `home.leadMagnet.*` — LeadMagnet section (NEW Phase 4)
- `home.testimonials.*` — Testimonials section
- `home.cta.*` — CTASection

### AdPilot Namespaces (NEW Phase 4)
- `adpilotPrivacy.*` — Privacy policy page
- `adpilotTerms.*` — Terms of service page

### Layout Namespaces
- `header.*` — Header navigation
- `footer.*` — Footer content
- `navigation.*` — Menu items
- `social.*` — Social media links

---

## Data Flow

### Page Load
```
HomePage
├─ generateMetadata() → SEO title/description
├─ Schema scripts → Organization + LocalBusiness + WebSite JSON-LD
└─ Section composition
   ├─ HeroSection
   ├─ HeroTransition
   ├─ ClientLogoBar (from i18n)
   ├─ VideoTestimonials (from i18n)
   ├─ ConversionProcess (from i18n)
   ├─ ServicesPreview (from i18n)
   ├─ StatsSection (from i18n + CountUp animations)
   ├─ CaseStudyPreview (from i18n + CountUp animations)
   ├─ AboutPreview (from i18n)
   ├─ LeadMagnet (form action → submitNewsletter)
   ├─ Testimonials (from i18n, snap-scroll)
   └─ CTASection
```

### Form Submission (LeadMagnet)
```
LeadMagnet form (client-side)
├─ Email input (required)
├─ Honeypot field (spam prevention)
├─ GDPR checkbox (required)
└─ submitNewsletter server action
   ├─ Validation (email format, honeypot empty, GDPR checked)
   ├─ Email delivery (Resend integration)
   └─ Success/error state response
```

### Video Playback (VideoTestimonials)
```
VideoTestimonialCard (client-side)
├─ Thumbnail + play button overlay
├─ Click handler → play video inline
├─ Gradient fallback if thumbnail missing
└─ Video controls (play, pause, volume, fullscreen)
```

---

## Animation Timeline

### Page Entry
```
T=0ms: Page load
│
├─ Hero headline: Character/word stagger (800ms)
├─ Hero subheading: Fade up (500ms, 200ms delay)
├─ Hero CTAs: Fade up (500ms, 400ms delay)
│
└─ Rest of page: Progressive scroll-triggered animations
   ├─ Scroll 80%: CaseStudyPreview CountUp, LeadMagnet fade-up
   ├─ Scroll 85%: VideoTestimonials fade-up, Stats CountUp, Testimonials fade-up
   └─ Scroll 85%: ConversionProcess steps stagger
```

### Continuous
```
ClientLogoBar: Marquee infinite (20s loop)
```

---

## GEO Compliance Strategy

### Citability (134-167 words)

**CaseStudyPreview cards** include:
- Client name and industry
- Specific ROI/metric with prefix/suffix
- Time period (e.g., "3 months", "2024-2025")
- Methodology (where applicable)
- Sample context (e.g., "50+ clients")

Example:
```
"Calculat pe baza a 50+ clienti din 2024-2025.
Metodologie: Google Ads optimization + landing page CRO.
Sample size: 15 e-commerce businesses.
Timeline: 3-6 months per project engagement.
Average ROI: 340% (range 250-480%), based on ad spend vs attributed revenue."
```

### Passage-Level Facts
- All stats include temporal context
- No standalone numbers without explanation
- Statistic labels reference data scope

### WebSite Schema
- `inLanguage: ['ro', 'en']`
- `SearchAction` for sitelinks search box
- Included on homepage

---

## File Locations (All Absolute)

### Primary Documentation
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/home.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/DOCUMENTATION-INDEX.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/docs/PHASE-4-HOMEPAGE-REDESIGN.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/CLAUDE.md`

### Design System
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/MASTER.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/components.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/tokens.css`

### Homepage Components
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/HeroSection.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ConversionProcess.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/VideoTestimonials.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/VideoTestimonialCard.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ClientLogoBar.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/CaseStudyPreview.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/LeadMagnet.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ServicesPreview.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/StatsSection.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/AboutPreview.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/Testimonials.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/CTASection.tsx`

### Shared Components
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/SectionWrapper.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/SectionHeader.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/animations/ScrollReveal.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/animations/CountUp.tsx`

### Legal Components
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/legal/LegalHero.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/legal/LegalContent.tsx`

### Pages
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/page.tsx` (Homepage)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/adpilot/privacy/page.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/app/[locale]/adpilot/terms/page.tsx`

### i18n Files
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/ro.json`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/en.json`

### Configuration
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/CLAUDE.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/next.config.ts`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/tailwind.config.ts`

---

## Documentation Update History

| Date | Phase | Changes | Files Modified |
|------|-------|---------|-----------------|
| Mar 16, 2026 | 4 | Homepage redesign + AdPilot legal | 4 doc files |
| Mar 6, 2026 | 3 | Warm light theme + new components | Phase-3 doc |
| Earlier | 1-2 | Initial architecture + pages | Master + index |

---

## Related Resources

- **Vercel Deployment:** See CI/CD pipeline in `.github/workflows/`
- **TypeScript Config:** `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/tsconfig.json`
- **Tailwind Config:** `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/tailwind.config.ts`
- **Next.js Config:** `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/next.config.ts`
- **Environment:** See `.env.example` for required variables
- **Testing:** E2E tests in `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/e2e/` (Playwright)

---

## How to Use This Codemap

1. **Understanding Architecture:** Start with homepage ASCII diagram above
2. **Component Details:** Reference Component Registry table for file paths
3. **Design Specs:** See `design-system/pages/home.md` for section-by-section specs
4. **Implementation:** Check `docs/PHASE-4-HOMEPAGE-REDESIGN.md` for detailed guides
5. **Troubleshooting:** See DOCUMENTATION-INDEX.md Common Issues section

---

## Next Documentation Updates

- [ ] Portfolio page spec (`design-system/pages/portofoliu.md`) — Referenced by CaseStudyPreview
- [ ] Blog page spec (`design-system/pages/blog.md`) — V2 feature
- [ ] Team page spec (`design-system/pages/echipa.md`) — V2 feature
- [ ] Service page architecture — Cross-reference with homepage
- [ ] Email template documentation — For LeadMagnet + Newsletter
- [ ] Analytics tracking plan — GEO performance monitoring

---

**Last Updated:** March 16, 2026
**Maintained By:** Documentation & Codemap Specialist
**Status:** Phase 4 Documentation Complete — Ready for Phase 5 Planning
