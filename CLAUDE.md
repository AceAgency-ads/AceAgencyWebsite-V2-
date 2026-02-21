# AceAgency

Premium digital agency website for AceAgency (aceagency.ro) - full-service marketing agency from Bucharest, Romania. Divisions: AceWeb, AceAds, AceAI, AceMedia.

## Tech Stack

- Next.js 16 (App Router)
- TailwindCSS 4 + shadcn/ui
- TypeScript 5.x (strict mode)
- Vercel (hosting)
- next-intl (RO primary, EN secondary)
- React Hook Form + Zod (forms)
- Resend (email)
- Framer Motion + GSAP (animations)

## Project Structure

```
src/
  app/
    [locale]/               # next-intl locale routing
      page.tsx              # Home
      despre-noi/           # About
      servicii/             # Services index + sub-pages
      contact/              # Contact
      portofoliu/           # Portfolio (V2)
      blog/                 # Blog (V2)
      echipa/               # Team (V2)
  components/
    ui/                     # Base UI components (Button, Card, Input, etc.)
    layout/                 # Layout components (Header, Footer, Navigation)
    sections/               # Page sections (Hero, Services, Stats, Testimonials, CTA)
    animations/             # Animation wrappers (ScrollReveal, Parallax, etc.)
  lib/                      # Utilities, helpers, constants
  styles/                   # Global styles, CSS tokens
  types/                    # TypeScript type definitions
  messages/                 # next-intl translation files (ro.json, en.json)
public/
  images/                   # Static images (WebP + fallback)
  fonts/                    # Custom fonts (Glacial Indifference, Red Hat Display)
.brief/                     # Project brief documentation
```

## Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Pages

| Route | Page | Status |
|-------|------|--------|
| `/` | Home | Must-have |
| `/despre-noi` | About | Must-have |
| `/servicii` | Services (index) | Must-have |
| `/servicii/google-ads` | Google Ads | Must-have |
| `/servicii/facebook-ads` | Facebook Ads | Must-have |
| `/servicii/tiktok-ads` | TikTok Ads | Must-have |
| `/servicii/seo` | SEO | Must-have |
| `/servicii/email-marketing` | Email Marketing | Must-have |
| `/servicii/consultanta-marketing` | Consultanta | Must-have |
| `/contact` | Contact | Must-have |
| `/portofoliu` | Portfolio | V2 |
| `/blog` | Blog | V2 |
| `/echipa` | Team | V2 |

## Key Features

- Multi-language (RO/EN): next-intl with locale switcher
- Contact form: React Hook Form + Zod + Resend email
- Newsletter signup: Email collection via Resend
- Advanced animations: Scroll-triggered reveals, parallax, section transitions (Framer Motion + GSAP)
- Analytics: Vercel Analytics + GA4 + GTM event tracking
- Cookie consent + GDPR: Granular consent banner
- Calendly integration: Booking meetings from site

## Brand & Design

- Primary: Electric Violet #650CBE
- Secondary: Cobalt Blue #4500D0
- Accent: Electric Mint #66F3A6
- Background Dark: Black #262523
- Background Light: White #FFFFFF
- Text Secondary: Grey #D9D9D9
- Highlight: Burgundy #56151A
- Headings: Glacial Indifference (Bold, Regular)
- Subheadings: Red Hat Display (Regular)
- Body: Inter (web alternative for Canva Sans)
- Tone: Professional & Corporate + Elegant & Premium
- Style: Component-driven design, icon-based, large typography, zero stock photos in main sections (inspired by addifico.com)
- See `.brief/brand.md` for full brand guide

## Content Rules

- Content language: Romanian (primary), English (secondary)
- URL slugs: lowercase, hyphens, no diacritics (transliterate ă→a, â→a, î→i, ș→s, ț→t)
- Bilingual: All content available in both RO and EN via next-intl
- Images: WebP format, lazy loading (except hero), srcset for responsive, width/height always specified
- Alt text: Descriptive, max 125 characters, includes keyword naturally

## Coding Rules

1. TypeScript strict mode - no `any`, explicit return types on exports
2. Immutable data patterns - never mutate, always return new objects
3. Small files (200-400 lines, 800 max), functions under 50 lines
4. Error handling at every level - never silently swallow errors
5. All user input validated with Zod schemas
6. Use `<Image>` from Next.js for all images (WebP, lazy loading)
7. Semantic HTML - proper heading hierarchy (single H1), landmarks, alt text
8. Mobile-first responsive design - 320px minimum, tap targets 48x48px
9. Font size min 16px on body text
10. No popup interstitials on mobile (Google penalizes)

## SEO Rules (from Specificatii-Tehnice-SEO-AceAgency.md)

1. Single H1 per page with primary keyword
2. Heading hierarchy: H1 > H2 > H3 (no skipping levels)
3. Title tag: max 60 chars, keyword first, brand last
4. Meta description: max 155 chars, include CTA
5. Canonical URL on every page
6. Open Graph + Twitter Card tags on every page
7. Schema markup JSON-LD: Organization (all pages), LocalBusiness (homepage), Service, FAQ, BreadcrumbList, Article
8. Internal linking: min 3-5 per page, descriptive anchor text
9. Breadcrumbs on all pages except homepage
10. Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
11. PageSpeed target: 90+ on mobile

## Compliance

- GDPR (EU data protection - mandatory in Romania)
- Cookie consent banner with granular consent
- Privacy policy page (/politica-confidentialitate)
- Cookie policy page (/politica-cookies)
- Terms of service page (/termeni-si-conditii)
- WCAG 2.1 AA accessibility

## Success Metrics

- Monthly visitors: 5000+
- Lead conversion rate: 8%
- Page speed: <1 second
- SEO ranking: Top 5 on main keywords
- SMART Goal: Launch premium corporate website for AceAgency on aceagency.ro with addifico.com-level design, bilingual (RO/EN), generating 5000+ monthly visitors through advanced SEO, 8% conversion rate, sub-1-second page speed, and top 5 keyword positioning.

## Related Skills

- `/design` - Design system from brief (reads `.brief/brand.md`, `.brief/audience.md`)
- `/gsd:new-project` - Project roadmap and phases (reads `.brief/scope.md`, `.brief/overview.md`)
- `/frontend-design` - Page implementation (reads `.brief/technical.md`)
- `/client-brief --update` - Fill remaining [TBD] fields
