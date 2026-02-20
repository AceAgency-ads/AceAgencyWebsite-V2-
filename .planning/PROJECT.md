# AceAgency Website

## What This Is

Premium corporate website for AceAgency (aceagency.ro) — a full-service digital marketing agency based in Bucharest, Romania. The site showcases 6 core services (Google Ads, Facebook Ads, TikTok Ads, SEO, Email Marketing, Consultanta Marketing), generates leads through contact forms and Cal.com booking, and serves as the agency's primary brand presence. Bilingual (Romanian primary, English secondary) with design quality at addifico.com level.

## Core Value

A visually stunning, design-first website that positions AceAgency as a premium digital agency — the design IS the proof of capability. Every visitor should think "if they built this for themselves, imagine what they'd build for me."

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage with hero, services preview, stats/track record, testimonials, CTA sections
- [ ] About page (Despre noi) with agency story, values, mission, vision
- [ ] Services index page with overview of all 6 services
- [ ] 6 individual service pages (Google Ads, Facebook Ads, TikTok Ads, SEO, Email Marketing, Consultanta Marketing)
- [ ] Contact page with form (React Hook Form + Zod), Google Maps, Cal.com booking embed
- [ ] Bilingual support (RO/EN) with next-intl and locale switcher
- [ ] Contact form with Zod validation, honeypot anti-spam, email delivery via Resend
- [ ] Newsletter signup with email collection via Resend
- [ ] Advanced scroll-triggered animations, parallax, section transitions (Framer Motion + GSAP)
- [ ] Cookie consent banner with granular GDPR consent
- [ ] Privacy policy, cookie policy, terms of service pages
- [ ] Analytics integration (Vercel Analytics + GA4 + GTM event tracking)
- [ ] Social media links (LinkedIn, Instagram, Facebook)
- [ ] SEO optimization (schema markup, heading hierarchy, meta tags, Core Web Vitals)
- [ ] FAQ page (/intrebari-frecvente)
- [ ] Local SEO landing pages (/agentie-marketing-bucuresti, /agentie-marketing-cluj)
- [ ] Responsive design (320px to 2560px, mobile-first)
- [ ] Component-driven design inspired by addifico.com (bento-grid, icon-based, large typography, zero stock photos in main sections)

### Out of Scope

- E-commerce / online payments — not relevant for agency site
- User authentication / user accounts — no need for client portal in V1
- Blog / CMS — deferred to V2 (requires CMS integration)
- Portfolio / Case studies — deferred to V2 (requires content creation)
- Team page (Echipa) — deferred to V2
- AceWeb/AceAds/AceAI/AceMedia division branding — dropped, services presented individually

## Context

- **Design reference**: addifico.com is the primary inspiration — bento-grid layouts, scroll-triggered animations, dark/light section transitions, service cards with line-art icons, testimonial carousels, zero stock photos in main sections, component-driven design with large typography
- **Secondary reference**: creativelabs.art (AceAgency's own project, quality benchmark)
- **Existing assets**: Logo exists ("As" symbol, Glacial Indifference + Red Hat Display), brand colors defined, domain aceagency.ro active
- **Build strategy**: Design-first approach — build Homepage and About with full visual polish first, then remaining pages, then layer SEO/optimization/functionality
- **Design system**: To be generated via `/design` workflow before implementation begins
- **SEO specs**: Full technical SEO document exists (Specificatii-Tehnice-SEO-AceAgency.md) — implemented after design is locked
- **Content**: Romanian primary language, AI-assisted content creation, all content bilingual

## Constraints

- **Tech stack**: Next.js 16 (App Router), TailwindCSS 4 + shadcn/ui, TypeScript strict — already decided
- **Hosting**: Vercel — already decided
- **i18n**: next-intl (RO primary, EN secondary) — already decided
- **Fonts**: Glacial Indifference (headings), Red Hat Display (subheadings), Inter (body) — brand requirement
- **Colors**: Electric Violet #650CBE, Cobalt Blue #4500D0, Electric Mint #66F3A6, Black #262523, White #FFFFFF — brand requirement
- **Performance**: PageSpeed 90+ mobile, LCP <2.5s, INP <200ms, CLS <0.1
- **Compliance**: GDPR mandatory (Romania/EU), WCAG 2.1 AA accessibility
- **No deadline**: Quality over speed
- **No CMS for V1**: Content hardcoded in translation files, CMS added in V2

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Drop division branding (AceWeb/AceAds/AceAI/AceMedia) | Simpler navigation, each service stands alone | — Pending |
| Cal.com over Calendly | Open-source, more customizable booking widget | — Pending |
| Design-first build order | Visual quality is the core differentiator — prove it early | — Pending |
| Homepage + About first | These pages carry the brand impression, build them to perfection first | — Pending |
| No CMS in V1 | Reduces complexity, content in next-intl JSON files | — Pending |
| SEO layered after design | Get the visuals right first, then optimize for search | — Pending |

---
*Last updated: 2026-02-20 after initialization*
