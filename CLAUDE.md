# Laboratorul de Conversii

Conversion-focused growth lab website for Laboratorul de Conversii (aceagency.ro) - specialized in conversion systems and measurable growth from Bucharest, Romania. Single unified brand (no divisions).

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
| `/adpilot/privacy` | AdPilot Privacy Policy | Must-have |
| `/adpilot/terms` | AdPilot Terms of Service | Must-have |
| `/blog` | Blog index | Must-have |
| `/blog/[slug]` | Blog article detail | Must-have |
| `/studii-de-caz` | Case Studies index | Must-have |
| `/studii-de-caz/[slug]` | Case study detail | Must-have |
| `/echipa` | Team | V2 |

## Brand & Design

- Primary: Electric Violet #650CBE
- Secondary: Cobalt Blue #4500D0
- Accent: Electric Mint #66F3A6
- Background Dark: Black #262523
- Background Light: White #FFFFFF
- Text Secondary: Grey #D9D9D9
- Highlight: Electric Violet #650CBE
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

1. Use `<Image>` from Next.js for all images (WebP, lazy loading)
2. Semantic HTML - proper heading hierarchy (single H1), landmarks, alt text
3. Mobile-first responsive design - 320px minimum, tap targets 48x48px
4. Font size min 16px on body text
5. No popup interstitials on mobile (Google penalizes)

## SEO Rules (from Specificatii-Tehnice-SEO.md)

1. Single H1 per page with primary keyword
2. Heading hierarchy: H1 > H2 > H3 (no skipping levels)
3. Title tag: max 60 chars, keyword first, brand last
4. Meta description: max 155 chars, include CTA
5. Canonical URL on every page
6. Open Graph + Twitter Card tags on every page
7. Schema markup JSON-LD: Organization (all pages), LocalBusiness (homepage), Service, FAQ, BreadcrumbList, WebSite (homepage), Article
8. Internal linking: min 3-5 per page, descriptive anchor text
9. Breadcrumbs on all pages except homepage
10. Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
11. PageSpeed target: 90+ on mobile

## GEO Rules (Generative Engine Optimization)

**AI Crawler Access:** Allow search crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot) in robots.txt while blocking training crawlers (CCBot, Google-Extended, anthropic-ai, etc.)

**llms.txt:** Provide structured guidance at `/public/llms.txt` for AI crawlers with service descriptions, key facts, and links.

**Citability (134-167 words):** FAQ answers, service definitions, and comparison data must reach 134-167 word minimum for AI citation eligibility.

**Passage-level facts:** Include methodology, time period, and sample size for all statistics. Example: "ROI mediu de 340% calculat pe baza a 50+ clienti din 2024-2025" not just "340% ROI".

**Definitional paragraphs:** Service pages (and HeroTransition via `definition` i18n key) include self-contained definitions with factual context.

**Stat labels with context:** Add temporal context ("2024-2025", "din 2020", "in Portofoliu") to statistic displays.

**WebSite schema:** Added on homepage with `inLanguage: ['ro', 'en']` and `SearchAction` support for sitelinks search box.

## Compliance

- Privacy policy: /politica-confidentialitate
- Cookie policy: /politica-cookies
- Terms of service: /termeni-si-conditii
- WCAG 2.1 AA accessibility

