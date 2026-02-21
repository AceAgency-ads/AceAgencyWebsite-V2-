# Cerinte Tehnice

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS 4 + shadcn/ui
- **Language**: TypeScript 5.x (strict mode)
- **Hosting**: Vercel
- **CMS**: Fara deocamdata (se adauga ulterior)
- **i18n**: next-intl (RO primary, EN secondary)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend
- **Animations**: Framer Motion (primary) + GSAP (advanced scroll effects)

## Integratii

| Integrare | Serviciu | Prioritate |
|-----------|---------|-----------|
| Email service | Resend | Must-have |
| Maps | Google Maps | Must-have |
| Analytics | Google Analytics 4 + Vercel Analytics | Must-have |
| Tag Manager | Google Tag Manager | Must-have |
| Calendar | Calendly / Cal.com | Must-have |

## Complianta

- GDPR (protectia datelor EU - obligatoriu in Romania)
- Cookie consent banner (cu granular consent)
- Accesibilitate (WCAG 2.1 AA)
- Privacy Policy page
- Terms of Service page
- Politica cookies page

## SEO Tehnic (din Specificatii-Tehnice-SEO-AceAgency.md)

Document SEO complet disponibil - se implementeaza dupa finalizarea design-ului. Include:
- Template HTML5 semantic complet
- Reguli URL-uri (lowercase, cratima, fara diacritice, fara trailing slash)
- Harta completa URL-uri cu title tags si meta descriptions
- Schema markup JSON-LD: Organization, LocalBusiness, Service, FAQ, BreadcrumbList, Article
- Sitemap.xml si Robots.txt
- Optimizare imagini (WebP, lazy loading, srcset, width/height obligatoriu)
- Core Web Vitals targets: LCP <2.5s, INP <200ms, CLS <0.1
- Internal linking strategy (min 3-5 link-uri interne per pagina)
- Mobile-first design (320px - 2560px)
- Security headers (HSTS, X-Content-Type-Options, X-Frame-Options)
- Pagina 404 custom
- Event tracking GA4 (generate_lead, click_phone, click_whatsapp, scroll_depth)
- Checklist pre-lansare complet (HTML/SEO, Technical, Performance, Mobile, Security)

## Note Infrastructura

- Hosting pe Vercel (edge functions, ISR, analytics)
- CDN integrat Vercel
- HTTPS obligatoriu cu redirect 301 de la HTTP
- non-www redirect (aceagency.ro, nu www.aceagency.ro)
- Brotli compression activata
- Cache headers pe assets statice
