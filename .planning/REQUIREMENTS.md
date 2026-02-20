# Requirements: AceAgency Website

**Defined:** 2026-02-20
**Core Value:** A visually stunning, design-first website that positions AceAgency as a premium digital agency — the design IS the proof of capability.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FNDN-01**: Project scaffolded with Next.js 16, TailwindCSS 4, shadcn/ui, TypeScript strict mode
- [ ] **FNDN-02**: next-intl configured with [locale] routing (RO primary, EN secondary) with static rendering
- [ ] **FNDN-03**: Custom fonts loaded via next/font/local (Glacial Indifference, Red Hat Display, Inter) with size-adjust fallbacks
- [ ] **FNDN-04**: Design system generated via `/design` skill (tokens, components, pages specs)
- [ ] **FNDN-05**: GSAP + Motion animation infrastructure with SSR-safe patterns (useGSAP hook, LazyMotion, "use client" isolation)
- [ ] **FNDN-06**: Responsive layout system (320px to 2560px, mobile-first, 48x48px tap targets)

### Pages

- [ ] **PAGE-01**: Homepage with hero, services preview, stats/track record, testimonials, CTA sections, newsletter signup — designed via `/frontend-design`, inspired by addifico.com
- [ ] **PAGE-02**: About page (Despre noi) with agency story, values, mission, vision — designed via `/frontend-design`
- [ ] **PAGE-03**: Services index page with overview linking to all 6 service sub-pages — designed via `/frontend-design`
- [ ] **PAGE-04**: Google Ads service page with structured content, benefits, process, FAQ, CTA
- [ ] **PAGE-05**: Facebook Ads service page with structured content, benefits, process, FAQ, CTA
- [ ] **PAGE-06**: TikTok Ads service page with structured content, benefits, process, FAQ, CTA
- [ ] **PAGE-07**: SEO service page with structured content, benefits, process, FAQ, CTA
- [ ] **PAGE-08**: Email Marketing service page with structured content, benefits, process, FAQ, CTA
- [ ] **PAGE-09**: Consultanta Marketing service page with structured content, benefits, process, FAQ, CTA
- [ ] **PAGE-10**: Contact page with form, Google Maps embed, Cal.com booking widget — designed via `/frontend-design`
- [ ] **PAGE-11**: FAQ page (/intrebari-frecvente) with FAQPage schema markup
- [ ] **PAGE-12**: Privacy policy page (/politica-confidentialitate) in RO and EN
- [ ] **PAGE-13**: Cookie policy page (/politica-cookies) in RO and EN
- [ ] **PAGE-14**: Terms of service page (/termeni-si-conditii) in RO and EN

### Design & Animations

- [ ] **DSGN-01**: Component-driven design inspired by addifico.com — bento-grid layouts, large typography as design element, zero stock photos in main sections, line-art icon system
- [ ] **DSGN-02**: Scroll-triggered reveal animations on all content sections (Motion library with LazyMotion)
- [ ] **DSGN-03**: Dark/light alternating section transitions (coordinated background changes on scroll)
- [ ] **DSGN-04**: Parallax depth effects on scroll (GSAP ScrollTrigger, scrub mode)
- [ ] **DSGN-05**: Custom cursor effect on desktop (morphing/blend-mode, disabled on touch devices)
- [ ] **DSGN-06**: Hover micro-interactions on service cards, testimonial cards (scale, shadow, Motion whileHover)
- [ ] **DSGN-07**: Animated stats counters (count-up animation triggered on scroll entry)
- [ ] **DSGN-08**: Kinetic/animated typography on hero headlines (staggered text reveal)
- [ ] **DSGN-09**: Bento-grid testimonial layout (5 visible + pagination, no carousel)
- [ ] **DSGN-10**: Sticky header with smooth hide/show on scroll direction

### Functionality

- [ ] **FUNC-01**: Contact form with Zod validation, honeypot anti-spam, email delivery via Resend (Server Action)
- [ ] **FUNC-02**: Newsletter signup with email collection via Resend and GDPR opt-in checkbox
- [ ] **FUNC-03**: Cal.com booking embed on contact page (with React 19 fallback if needed)
- [ ] **FUNC-04**: Locale switcher (RO/EN) in navigation header
- [ ] **FUNC-05**: Social media links in footer (LinkedIn, Instagram, Facebook)
- [ ] **FUNC-06**: Google Maps embed on contact page

### SEO & Analytics

- [ ] **SEO-01**: Schema markup JSON-LD on all pages (Organization, LocalBusiness, Service, FAQ, BreadcrumbList)
- [ ] **SEO-02**: Title tags (max 60 chars, keyword first), meta descriptions (max 155 chars, CTA), canonical URLs on every page
- [ ] **SEO-03**: Open Graph + Twitter Card tags on every page
- [ ] **SEO-04**: hreflang tags (ro, en, x-default) via generateMetadata alternates
- [ ] **SEO-05**: Breadcrumbs on all pages except homepage
- [ ] **SEO-06**: Core Web Vitals compliance (LCP <2.5s, INP <200ms, CLS <0.1, PageSpeed 90+ mobile)
- [ ] **SEO-07**: Sitemap.xml and robots.txt
- [ ] **SEO-08**: Internal linking (min 3-5 internal links per page)

### Compliance & Infrastructure

- [ ] **CMPL-01**: Cookie consent banner with granular GDPR consent (analytics, marketing, functional)
- [ ] **CMPL-02**: GA4 + GTM loading gated behind cookie consent (GTM Consent Mode v2)
- [ ] **CMPL-03**: Vercel Analytics integration
- [ ] **CMPL-04**: WCAG 2.1 AA accessibility (semantic HTML, heading hierarchy, alt text, keyboard navigation)
- [ ] **CMPL-05**: Security headers (HSTS, X-Content-Type-Options, X-Frame-Options)
- [ ] **CMPL-06**: HTTPS with 301 redirects from HTTP, non-www redirect
- [ ] **CMPL-07**: Custom 404 page
- [ ] **CMPL-08**: GA4 event tracking (generate_lead, click_phone, click_whatsapp, scroll_depth)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Platform

- **BLOG-01**: Blog with CMS integration (Sanity or Contentful)
- **BLOG-02**: Blog index page with pagination
- **BLOG-03**: Individual blog post pages with Article schema
- **PORT-01**: Portfolio / Case studies page with project showcases
- **PORT-02**: Individual case study pages with measurable results
- **TEAM-01**: Team page (Echipa) with member profiles and roles

### Local SEO

- **LSEO-01**: Local SEO landing page /agentie-marketing-bucuresti
- **LSEO-02**: Local SEO landing page /agentie-marketing-cluj

### Advanced Animations

- **ANIM-01**: GSAP page transitions between routes
- **ANIM-02**: GSAP SplitText or alternative for advanced text animations

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / online payments | Not relevant for agency site |
| User authentication / client portal | No need for V1; reporting tools already exist |
| Video background in hero | Destroys LCP, makes PageSpeed 90+ impossible |
| Carousel/slider for testimonials | Hides 95%+ of content; bento grid is superior |
| Chatbot / live chat | Contact form + Cal.com sufficient; auto-open chat is spammy |
| 3D WebGL effects | Crashes mobile, destroys PageSpeed, accessibility nightmare |
| Dark mode toggle | Site uses deliberate dark/light section alternation by design |
| Social proof notification popups | Feels fake; GDPR concerns; spammy perception |
| AceWeb/AceAds/AceAI/AceMedia division branding | Dropped — services presented individually |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (To be populated by roadmapper) | | |

**Coverage:**
- v1 requirements: 48 total
- Mapped to phases: 0
- Unmapped: 48

---
*Requirements defined: 2026-02-20*
*Last updated: 2026-02-20 after initial definition*
