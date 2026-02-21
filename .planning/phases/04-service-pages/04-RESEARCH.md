# Phase 4: Service Pages - Research

**Researched:** 2026-02-21
**Domain:** Service page architecture, SEO-optimized content pages, reusable section components, FAQ schema markup
**Confidence:** HIGH

## Summary

Phase 4 builds all 7 service pages (1 index + 6 sub-pages) as the primary SEO surface for AceAgency's organic traffic. The implementation leverages the established component architecture from Phases 2-3 (SectionWrapper, SectionHeader, ScrollReveal, TextReveal, CountUp, SpotlightCard) and introduces a **template-based sub-page pattern** where 6 service sub-pages share identical section layouts fed by different i18n content.

The design system already defines the complete Services Index Page spec (`design-system/pages/servicii.md`) with 5 sections and a **Service Sub-Page Template** with 6 reusable section components. No individual service sub-page design specs exist in `design-system/pages/` -- the template in `servicii.md` IS the spec for all 6 sub-pages, with content varying per service.

The SEO document (`Specificatii-Tehnice-SEO-AceAgency.md`) provides exact title tags, meta descriptions, URL slugs, heading hierarchy rules, Service schema markup, FAQ schema markup, BreadcrumbList schema, and internal linking requirements that MUST be implemented on every service page.

**Primary recommendation:** Build 6 reusable `Service*` section components (ServiceHero, ServiceFeatures, ServiceProcess, ServiceStats, ServiceFAQ, ServiceCTA) once, then compose each sub-page by feeding service-specific i18n content. Use Next.js dynamic routes (`[slug]/page.tsx`) with `generateStaticParams` for the 6 sub-pages. The services index page is a separate static route.

## User Constraints

### From User Context (Direct Instructions)
- **INCLUDE:** Services index page + 6 sub-pages (google-ads, facebook-ads, tiktok-ads, seo, email-marketing, consultanta-marketing)
- **EXCLUDE:** `/agentie-marketing-bucuresti` and `/agentie-marketing-cluj` pages -- user explicitly does NOT want these (they are V2/LSEO requirements anyway)
- **Design approach:** Adapt the design from existing homepage/about pages built in Phase 3
- **SEO compliance:** Follow `Specificatii-Tehnice-SEO-AceAgency.md` strictly

### Claude's Discretion
- Whether to use dynamic route `[slug]` vs. static routes per service page
- Internal component organization for Service section components
- FAQ accordion implementation details (shadcn Accordion recommended by components.md)

### Deferred Ideas (OUT OF SCOPE)
- Blog cross-linking (no blog exists yet)
- Portfolio cross-linking (V2 feature)
- Local SEO pages (`/agentie-marketing-*`)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-03 | Services index page with overview linking to all 6 service sub-pages | `servicii.md` spec defines 5 sections: Hero, Services Grid, Process, Why Choose Us, CTA. Reuses SectionWrapper, SectionHeader, BentoGrid, CountUp, SpotlightCard, CTASection. Route: `/servicii` |
| PAGE-04 | Google Ads service page with structured content, benefits, process, FAQ, CTA | Service Sub-Page Template in `servicii.md` defines 6 sections: ServiceHero, ServiceFeatures, ServiceProcess, ServiceStats, ServiceFAQ, ServiceCTA. Route: `/servicii/google-ads`. Title tag from SEO doc: "Servicii Google Ads \| Agentie Google Ads Romania - AceAgency" |
| PAGE-05 | Facebook Ads service page with structured content, benefits, process, FAQ, CTA | Same template as PAGE-04. Route: `/servicii/facebook-ads`. Title: "Servicii Facebook Ads \| Agentie Facebook Ads - AceAgency" |
| PAGE-06 | TikTok Ads service page with structured content, benefits, process, FAQ, CTA | Same template as PAGE-04. Route: `/servicii/tiktok-ads`. Title: "Servicii TikTok Ads \| Publicitate TikTok Romania - AceAgency" |
| PAGE-07 | SEO service page with structured content, benefits, process, FAQ, CTA | Same template as PAGE-04. Route: `/servicii/seo`. Title: "Servicii SEO Romania \| Optimizare SEO Profesionala - AceAgency". SEO doc provides a full heading hierarchy example for this page |
| PAGE-08 | Email Marketing service page with structured content, benefits, process, FAQ, CTA | Same template as PAGE-04. Route: `/servicii/email-marketing`. Title: "Servicii Email Marketing \| Campanii Email - AceAgency" |
| PAGE-09 | Consultanta Marketing service page with structured content, benefits, process, FAQ, CTA | Same template as PAGE-04. Route: `/servicii/consultanta-marketing`. Title: "Consultanta Marketing Digital Romania - AceAgency" |
</phase_requirements>

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js 16 | 16.x | App Router, `generateMetadata`, `generateStaticParams` | Project framework |
| next-intl | latest | i18n content via `useTranslations`, `getTranslations` | Established in Phase 1 |
| GSAP + ScrollTrigger | 3.14.2 | Scroll animations, CountUp, stagger reveals | Established in Phase 1 |
| Lucide React | latest | Service icons (Target, Share2, Play, Search, Mail, Lightbulb) | Established in Phase 2 |
| Tailwind CSS 4 | 4.x | Styling with design tokens | Established in Phase 1 |

### New Dependencies Required

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui Accordion | N/A (CLI install) | FAQ section with accessible expand/collapse | Service sub-page FAQ sections (PAGE-04 through PAGE-09) |

**Installation:**
```bash
npx shadcn@latest add accordion
```

This installs `@radix-ui/react-accordion` as a dependency and generates `src/components/ui/accordion.tsx`.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Dynamic `[slug]` route | Static individual page files | Static is simpler but creates 6 near-identical files. Dynamic route with `generateStaticParams` is DRY and idiomatic Next.js. **Recommend dynamic route.** |
| shadcn Accordion | Custom disclosure | shadcn uses Radix primitives with built-in keyboard nav and ARIA. Hand-rolling loses accessibility. **Use shadcn.** |
| Separate i18n namespaces per service | Single `services` namespace | One namespace keeps all service content together and simplifies the translation workflow. Use nested keys: `services.googleAds.hero.headline`. **Recommend single namespace.** |

## Architecture Patterns

### Recommended Project Structure

```
src/
  app/[locale]/
    servicii/
      page.tsx                         # Services index page (PAGE-03)
      [slug]/
        page.tsx                       # Dynamic service sub-page (PAGE-04 to PAGE-09)
  components/sections/
    services/                          # NEW: Service-specific section components
      ServicesHero.tsx                  # Index page hero (inner-page hero pattern)
      ServicesGrid.tsx                  # Service cards grid with links
      ProcessSteps.tsx                 # How-we-work timeline (index page)
      WhyChooseSection.tsx             # Stats + differentiators (index page)
      ServiceHero.tsx                  # Sub-page hero (service-specific)
      ServiceFeatures.tsx              # Benefits/features grid
      ServiceProcess.tsx               # Service-specific process steps
      ServiceStats.tsx                 # Service-specific metrics
      ServiceFAQ.tsx                   # FAQ accordion with schema markup
      ServiceCTA.tsx                   # Service-specific CTA
  lib/
    services.ts                        # Service definitions: slugs, icons, i18n keys
  messages/
    ro.json                            # Add `services` top-level namespace
    en.json                            # Add `services` top-level namespace
```

### Pattern 1: Dynamic Route with Service Registry

**What:** A `services.ts` module defines all service metadata (slug, icon, i18n key prefix) and the dynamic `[slug]/page.tsx` looks up the service definition, validates it, and renders the template.

**When to use:** All 6 service sub-pages.

**Example:**
```typescript
// src/lib/services.ts
import { Target, Share2, Play, Search, Mail, Lightbulb, type LucideIcon } from 'lucide-react';

interface ServiceDefinition {
  readonly slug: string;
  readonly i18nKey: string;        // Prefix in services namespace
  readonly icon: LucideIcon;
}

export const SERVICE_DEFINITIONS: readonly ServiceDefinition[] = [
  { slug: 'google-ads', i18nKey: 'googleAds', icon: Target },
  { slug: 'facebook-ads', i18nKey: 'facebookAds', icon: Share2 },
  { slug: 'tiktok-ads', i18nKey: 'tiktokAds', icon: Play },
  { slug: 'seo', i18nKey: 'seo', icon: Search },
  { slug: 'email-marketing', i18nKey: 'emailMarketing', icon: Mail },
  { slug: 'consultanta-marketing', i18nKey: 'consultanta', icon: Lightbulb },
] as const;

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICE_DEFINITIONS.find(s => s.slug === slug);
}
```

```typescript
// src/app/[locale]/servicii/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { SERVICE_DEFINITIONS, getServiceBySlug } from '@/lib/services';
// ... import service section components

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return SERVICE_DEFINITIONS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  // Generate title, description, openGraph, alternates from i18n + SEO doc
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceHero serviceKey={service.i18nKey} icon={service.icon} />
      <ServiceFeatures serviceKey={service.i18nKey} />
      <ServiceProcess serviceKey={service.i18nKey} />
      <ServiceStats serviceKey={service.i18nKey} />
      <ServiceFAQ serviceKey={service.i18nKey} />
      <ServiceCTA serviceKey={service.i18nKey} />
    </>
  );
}
```

### Pattern 2: Inner-Page Hero (Established in Phase 3)

**What:** The `AboutHero` pattern: shorter padding than homepage hero, overline + TextReveal h1 + subheading, brand glow decorative element.

**When to use:** Services index hero and all 6 sub-page heroes.

**Example:** Follow `AboutHero.tsx` pattern exactly -- `SectionWrapper theme="dark"`, overline with fade, TextReveal h1 with word variant, subheading with fade-up.

### Pattern 3: FAQ Accordion with JSON-LD Schema

**What:** shadcn Accordion rendering FAQ items from i18n, with a `<script type="application/ld+json">` for FAQPage schema embedded in the section.

**When to use:** All 6 service sub-pages (5-8 FAQ items each per `servicii.md` spec).

**Example:**
```typescript
// ServiceFAQ.tsx
'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

interface ServiceFAQProps {
  readonly serviceKey: string;
}

export function ServiceFAQ({ serviceKey }: ServiceFAQProps): React.JSX.Element {
  const t = useTranslations('services');
  const faqItems = t.raw(`${serviceKey}.faq.items`) as Array<{
    question: string;
    answer: string;
  }>;

  // Build FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <SectionWrapper theme="light" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionHeader
        overline={t(`${serviceKey}.faq.overline`)}
        heading={t(`${serviceKey}.faq.heading`)}
      />
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
```

### Pattern 4: Service Schema JSON-LD in generateMetadata

**What:** Each service sub-page includes a Service schema in the page metadata.

**When to use:** All 6 sub-pages.

**Example (in generateMetadata):**
```typescript
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: title, // from i18n
  description: metaDescription, // from i18n
  provider: {
    '@type': 'Organization',
    name: 'AceAgency',
    url: 'https://aceagency.ro',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Romania',
  },
  serviceType: serviceType, // from i18n or service definition
};
```

Note: JSON-LD can be rendered in the `<head>` via `generateMetadata` using the `other` field or via a `<script>` tag in the page component. Since FAQ schema is in a client component, use `dangerouslySetInnerHTML` in the component. For Service + BreadcrumbList schema, render in the page server component or via metadata.

### Pattern 5: i18n Namespace Structure for Services

**What:** All service content lives under a `services` top-level namespace in `ro.json`/`en.json`.

**Structure:**
```json
{
  "services": {
    "index": {
      "hero": { "overline": "...", "headline": "...", "subheading": "..." },
      "grid": { "overline": "...", "heading": "...", "items": [...] },
      "process": { "overline": "...", "heading": "...", "steps": [...] },
      "whyUs": { "overline": "...", "heading": "...", "stats": [...], "differentiators": [...] },
      "cta": { "heading": "...", "description": "...", "primary": "...", "secondary": "..." }
    },
    "googleAds": {
      "meta": { "title": "...", "description": "..." },
      "hero": { "overline": "...", "headline": "...", "description": "..." },
      "features": { "overline": "...", "heading": "...", "items": [...] },
      "process": { "overline": "...", "heading": "...", "steps": [...] },
      "stats": { "overline": "...", "heading": "...", "items": [...] },
      "faq": { "overline": "...", "heading": "...", "items": [...] },
      "cta": { "heading": "...", "description": "...", "primary": "...", "secondary": "..." }
    },
    "facebookAds": { /* same structure */ },
    "tiktokAds": { /* same structure */ },
    "seo": { /* same structure */ },
    "emailMarketing": { /* same structure */ },
    "consultanta": { /* same structure */ }
  }
}
```

### Anti-Patterns to Avoid

- **Duplicating section components per service:** Do NOT create `GoogleAdsHero.tsx`, `FacebookAdsHero.tsx`, etc. Create ONE `ServiceHero` that accepts `serviceKey` prop.
- **Hardcoding content in TSX:** ALL text content must live in i18n JSON files. Components only reference translation keys.
- **Skipping `generateStaticParams`:** Without it, dynamic routes are server-rendered on demand. With it, they are statically generated at build time for optimal performance.
- **FAQ without schema markup:** Every FAQ section MUST include FAQPage JSON-LD. This is a primary SEO value-add for service pages.
- **Missing `generateMetadata`:** Every page MUST have unique title, meta description, canonical URL, Open Graph, and hreflang tags.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible accordion | Custom show/hide with state | shadcn Accordion (Radix) | Keyboard navigation, ARIA attributes, focus management built-in |
| FAQ schema markup | Manual JSON string concatenation | Typed object -> `JSON.stringify` | Type safety, no escaping bugs |
| Static generation of dynamic routes | Manual page files per service | `generateStaticParams` | DRY, single template, automatic ISR support |
| Breadcrumb trail | Hardcoded breadcrumb per page | Shared Breadcrumb component with route data | Reusable across Phase 4-8 pages |
| Meta tag generation | Inline metadata per page | `generateMetadata` with service lookup | Type-safe, consistent pattern, hreflang automatic |

**Key insight:** The entire value of this phase is SEO surface area. Hand-rolling SEO elements (schema, meta tags, headings) is the highest-risk area -- mistakes are invisible to users but visible to search engines.

## Common Pitfalls

### Pitfall 1: Missing or Duplicate H1 Tags
**What goes wrong:** Multiple H1 tags on a page, or H1 missing the primary keyword. SEO doc explicitly requires "UN SINGUR H1 PE PAGINA cu cuvantul cheie principal."
**Why it happens:** SectionHeader defaults to rendering `h2`, but ServiceHero renders `h1`. If any section header accidentally uses `h1`, the page has duplicate H1s.
**How to avoid:** ServiceHero is the ONLY component that renders `<h1>`. All other section headers use `<h2>` (the default). The H1 must contain the service-specific keyword.
**Warning signs:** SEO audit tools reporting multiple H1 tags.

### Pitfall 2: Heading Hierarchy Violations
**What goes wrong:** Jumping from H1 to H3 without an H2, or using H4 before H3.
**Why it happens:** Component composition can accidentally skip levels. E.g., if a section has only an overline + H3 sub-items without an H2 section heading.
**How to avoid:** Follow the SEO doc example for the SEO service page (Section 3.2): H1 > H2 (section headings) > H3 (subsections). Every `SectionHeader` renders H2. Sub-items within sections (feature titles, process step titles) use H3.
**Warning signs:** Accessibility audit warnings about heading hierarchy.

### Pitfall 3: Title Tag Length Violations
**What goes wrong:** Title tags exceed 60 characters and get truncated in Google SERPs.
**Why it happens:** Adding too much detail. SEO doc provides exact title tags for each service page.
**How to avoid:** Use the exact title tags from the SEO document's URL map (Section 2.2). Verify character count.
**Warning signs:** `<title>` content > 60 characters.

### Pitfall 4: Internal Linking Below Minimum
**What goes wrong:** Service pages have fewer than 3-5 internal links, reducing link equity distribution.
**Why it happens:** Service sub-pages focus on their own content and forget cross-linking.
**How to avoid:** Per SEO doc Section 8.2: service pages link to each other ("Servicii Google Ads" links to "publicitate Facebook Ads"), link to relevant blog articles (when blog exists -- skip for now), and include CTA links to `/contact`. The services index page links to all 6 sub-pages (satisfies minimum). Each sub-page should link to: contact (CTA), 1-2 other service pages (in content or "related services"), and the services index (breadcrumb).
**Warning signs:** Running a crawl and finding pages with <3 internal links.

### Pitfall 5: Schema Markup Errors
**What goes wrong:** Invalid JSON-LD breaks rich snippets. FAQ schema with HTML entities in answers, or Service schema missing required fields.
**Why it happens:** Content from i18n may contain special characters that need escaping.
**How to avoid:** Use `JSON.stringify()` which handles escaping automatically. Validate with Google's Rich Results Test before launch.
**Warning signs:** Search Console reporting schema errors.

### Pitfall 6: Missing hreflang on Service Pages
**What goes wrong:** Google sees duplicate content between `/ro/servicii/seo` and `/en/servicii/seo` without hreflang relationship.
**Why it happens:** `generateMetadata` doesn't include `alternates` with locale-specific URLs.
**How to avoid:** Include `alternates.languages` in every `generateMetadata` return. next-intl provides helpers for this via `getPathname`.
**Warning signs:** Search Console reporting duplicate pages.

### Pitfall 7: CLS from Accordion Animation
**What goes wrong:** FAQ accordion expanding causes layout shift if not below the fold.
**Why it happens:** Accordion content changes element height dynamically.
**How to avoid:** FAQ section is positioned below the fold (Section 5 of 6 in sub-page template). If above fold for any reason, set a minimum initial height.
**Warning signs:** CLS score >0.1 on PageSpeed Insights.

## Code Examples

### Existing Component Reuse Map

These components from Phase 2-3 are directly reusable in Phase 4:

| Component | Location | Reuse In |
|-----------|----------|----------|
| `SectionWrapper` | `src/components/sections/SectionWrapper.tsx` | Every section of every service page |
| `SectionHeader` | `src/components/sections/SectionHeader.tsx` | Every section header (overline + h2 + description) |
| `ScrollReveal` | `src/components/animations/ScrollReveal.tsx` | All content entrance animations |
| `TextReveal` | `src/components/animations/TextReveal.tsx` | Hero headlines (word-level stagger) |
| `CountUp` | `src/components/animations/CountUp.tsx` | Stats sections (index + sub-pages) |
| `SpotlightCard` | `src/components/ui/SpotlightCard.tsx` | Feature cards with spotlight hover |
| `CTASection` | `src/components/sections/home/CTASection.tsx` | CTA on services index (with `namespace` prop) |
| `Button` | `src/components/ui/button.tsx` | All CTAs and links |
| `AboutHero` pattern | `src/components/sections/about/AboutHero.tsx` | Pattern reference for inner-page heroes |
| `StatsSection` pattern | `src/components/sections/home/StatsSection.tsx` | Pattern reference for bento stat cards |

### generateMetadata Pattern for Service Sub-Pages

```typescript
import { getTranslations } from 'next-intl/server';
import { getServiceBySlug, SERVICE_DEFINITIONS } from '@/lib/services';

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: 'services' });
  const title = t(`${service.i18nKey}.meta.title`);
  const description = t(`${service.i18nKey}.meta.description`);

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/servicii/${slug}`,
      languages: {
        ro: `https://aceagency.ro/ro/servicii/${slug}`,
        en: `https://aceagency.ro/en/servicii/${slug}`,
        'x-default': `https://aceagency.ro/ro/servicii/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/servicii/${slug}`,
      siteName: 'AceAgency',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
```

### Breadcrumb Component Pattern

```typescript
// src/components/sections/Breadcrumb.tsx
import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

interface BreadcrumbProps {
  readonly items: readonly BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps): React.JSX.Element {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://aceagency.ro${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex items-center gap-2 text-sm text-[var(--section-text-muted)]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="size-3" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--section-text)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--section-text)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate metadata files | `generateMetadata` async function | Next.js 13+ (App Router) | Type-safe, dynamic metadata based on params |
| Client-side FAQ toggle | Radix Accordion with server rendering | 2024 | Better SSR for SEO, accessibility built-in |
| Inline schema strings | `JSON.stringify()` with typed objects | Always best practice | Type safety, no escaping bugs |
| Individual page files per service | Dynamic `[slug]` with `generateStaticParams` | Next.js 13+ | DRY, maintainable, statically generated |

## Key SEO Data from Specificatii-Tehnice-SEO Document

### URL Map and Title Tags (Section 2.2)

| Page | Route | Title Tag (max 60 chars) |
|------|-------|--------------------------|
| Services Index | `/servicii` | Servicii Marketing Digital \| AceAgency Bucuresti (49 chars) |
| Google Ads | `/servicii/google-ads` | Servicii Google Ads \| Agentie Google Ads Romania - AceAgency |
| Facebook Ads | `/servicii/facebook-ads` | Servicii Facebook Ads \| Agentie Facebook Ads - AceAgency |
| TikTok Ads | `/servicii/tiktok-ads` | Servicii TikTok Ads \| Publicitate TikTok Romania - AceAgency |
| SEO | `/servicii/seo` | Servicii SEO Romania \| Optimizare SEO Profesionala - AceAgency |
| Email Marketing | `/servicii/email-marketing` | Servicii Email Marketing \| Campanii Email - AceAgency |
| Consultanta | `/servicii/consultanta-marketing` | Consultanta Marketing Digital Romania - AceAgency |

### Required Schema Markup Per Service Page

1. **Organization** (all pages) -- from SEO doc Section 4.1
2. **Service** (each service sub-page) -- from SEO doc Section 4.3
3. **FAQPage** (each service sub-page with FAQ) -- from SEO doc Section 4.4
4. **BreadcrumbList** (all pages except homepage) -- from SEO doc Section 4.5

### Heading Hierarchy Template (from SEO doc Section 3.2)

```
<h1>Servicii [Serviciu] Romania - [Beneficiu Principal]</h1>
  <h2>Ce Inseamna [Serviciu] si De Ce Ai Nevoie</h2>
  <h2>Serviciile Noastre de [Serviciu]</h2>
    <h3>Sub-serviciu 1</h3>
    <h3>Sub-serviciu 2</h3>
    <h3>Sub-serviciu 3</h3>
  <h2>Procesul Nostru de Lucru</h2>
    <h3>Pasul 1: ...</h3>
    <h3>Pasul 2: ...</h3>
    <h3>Pasul 3: ...</h3>
  <h2>Cat Costa Serviciile de [Serviciu]?</h2>
  <h2>Intrebari Frecvente despre [Serviciu]</h2>
  <h2>Solicita o Consultatie Gratuita</h2>
```

### Internal Linking Requirements (from SEO doc Section 8)

- Min 3-5 internal links per page
- Anchor text must be descriptive (not "click aici")
- Service pages link to each other reciprocally
- Footer already contains links to all main pages (implemented in Phase 2)

## Content Volume Estimate

Each service sub-page requires in i18n (both RO and EN):

| Section | Content Items |
|---------|--------------|
| Hero | overline, headline, description (3 keys) |
| Features | overline, heading, 4-6 feature items (title + description) (10-14 keys) |
| Process | overline, heading, description, 3-5 steps (title + description) (9-13 keys) |
| Stats | overline, heading, 4 stat items (value + suffix + label) (14 keys) |
| FAQ | overline, heading, 5-8 FAQ items (question + answer) (12-18 keys) |
| CTA | heading, description, primary button, secondary button (4 keys) |
| Meta | title, description (2 keys) |
| **Total per service** | **~54-70 translation keys** |
| **Total for 6 services** | **~324-420 keys per language** |
| **Services index page** | **~40-50 keys** |

This is a significant i18n content creation task. The planner should allocate dedicated tasks for content authoring.

## Open Questions

1. **Razvoltare Web (Web Development) service page**
   - What we know: The `servicii.md` spec lists 7 service cards including "Dezvoltare Web" with link `/servicii/dezvoltare-web`, but REQUIREMENTS.md only lists 6 sub-pages (PAGE-04 through PAGE-09) and none mention web development.
   - What's unclear: Should the services index grid include the "Dezvoltare Web" card linking to `/servicii` (itself) or to a sub-page?
   - Recommendation: Include "Dezvoltare Web" in the services grid on the index page, but link it to `/servicii` (the index page itself, or use an anchor like `#web-development`) since there is no dedicated web development sub-page in requirements. Alternatively, skip it from the grid if it creates confusion. **Ask user if unclear.**

2. **Content authoring responsibility**
   - What we know: All content lives in i18n JSON files. The project has no CMS.
   - What's unclear: Whether the planner should generate placeholder Romanian content for all services or use real content from the client brief.
   - Recommendation: Generate realistic Romanian content based on the SEO document's keyword strategy and service descriptions. English translations can follow. Content should be SEO-optimized with the keywords from the SEO document.

3. **Email Marketing service icon**
   - What we know: `servicii.md` spec lists "Mail" icon for Email Marketing. The homepage `ServicesPreview.tsx` currently does not include an Email Marketing card (only 6 items, with consultanta as the 6th).
   - What's unclear: The services index page needs all 7 services including Email Marketing.
   - Recommendation: Use Lucide `Mail` icon for Email Marketing service.

## Sources

### Primary (HIGH confidence)
- `design-system/pages/servicii.md` -- Complete services index page spec + sub-page template
- `design-system/MASTER.md` -- Design system tokens, patterns, animation system
- `design-system/components.md` -- Component patterns (Accordion, Card, SectionHeader)
- `Specificatii-Tehnice-SEO-AceAgency.md` -- SEO specifications (title tags, schema, headings, internal linking)
- `.planning/REQUIREMENTS.md` -- Phase 4 requirement IDs (PAGE-03 through PAGE-09)
- `.planning/STATE.md` -- Project decisions and accumulated context

### Secondary (HIGH confidence -- existing codebase)
- `src/components/sections/about/AboutHero.tsx` -- Inner-page hero pattern
- `src/components/sections/home/StatsSection.tsx` -- Bento stat cards pattern
- `src/components/sections/home/CTASection.tsx` -- Reusable CTA with namespace prop
- `src/components/sections/SectionWrapper.tsx` -- Section theming pattern
- `src/components/sections/SectionHeader.tsx` -- Section header pattern
- `src/components/animations/CountUp.tsx` -- GSAP count-up animation
- `src/components/ui/SpotlightCard.tsx` -- Cursor-tracking spotlight card
- `src/app/[locale]/despre-noi/page.tsx` -- About page composition pattern
- `src/app/[locale]/page.tsx` -- Homepage composition pattern
- `src/messages/ro.json` / `src/messages/en.json` -- Existing i18n structure

### Tertiary (MEDIUM confidence)
- shadcn/ui Accordion documentation -- Based on training data, Radix Accordion primitives. Verify after install.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries already installed except shadcn Accordion (trivial CLI add)
- Architecture: HIGH -- Dynamic route pattern is idiomatic Next.js App Router; component composition mirrors established Phase 3 patterns
- Pitfalls: HIGH -- SEO pitfalls documented from official SEO spec; component pitfalls from codebase analysis
- Content volume: MEDIUM -- Estimated key counts; actual content complexity may vary

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (stable -- no fast-moving dependencies)
