# Phase 7: SEO and Analytics - Research

**Researched:** 2026-02-24
**Domain:** SEO metadata, JSON-LD structured data, analytics integration (Next.js 16 App Router)
**Confidence:** HIGH

## Summary

Phase 7 brings complete SEO metadata, JSON-LD schema markup, sitemap/robots, and analytics tracking to all pages. The codebase already has partial implementations: 8 of 10 pages have `generateMetadata` with alternates/hreflang/OG/Twitter (servicii index, 6 service sub-pages, contact, FAQ, 3 legal pages, multumim). Two pages (home and about) are missing `generateMetadata` entirely. The i18n files also lack `meta` keys for home and about namespaces.

JSON-LD is partially present: service sub-pages use `other: { 'script:ld+json': ... }` in metadata (non-standard, may not render), contact page has Organization schema the same way, and Breadcrumb component renders BreadcrumbList JSON-LD via `<script type="application/ld+json">` in JSX (correct pattern). The official Next.js approach is to render JSON-LD as `<script>` tags in component JSX, not via the metadata object.

GTM Consent Mode v2 is fully wired (Phase 6). GA4 loads via GTM when `NEXT_PUBLIC_GTM_ID` is set. Vercel Analytics (`@vercel/analytics`) is not yet installed. The contact form server action returns `{ success: true }` but does not fire any client-side GA4 events.

**Primary recommendation:** Create a centralized `lib/seo/metadata.ts` factory and `lib/seo/schemas.ts` JSON-LD builders, then apply them to all pages. Install `@vercel/analytics`. Add `generate_lead` GA4 event to contact form success flow.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Schema markup JSON-LD on all pages (Organization, LocalBusiness, Service, FAQ, BreadcrumbList) | JSON-LD builders in `lib/seo/schemas.ts`; render via `<script type="application/ld+json">` in page JSX (official Next.js pattern). Fix existing `other: { 'script:ld+json' }` metadata approach. |
| SEO-02 | Title tags (max 60 chars), meta descriptions (max 155 chars, CTA), canonical URLs on every page | Centralized `generatePageMetadata()` factory in `lib/seo/metadata.ts`. Add missing `meta` i18n keys for home and about. |
| SEO-03 | Open Graph + Twitter Card tags on every page | Already present on 8 pages via `generateMetadata`. Factory will standardize and add to home/about. |
| SEO-04 | hreflang tags (ro, en, x-default) via generateMetadata alternates | Already present on 8 pages. Factory will standardize the pattern for all pages including home/about. |
| SEO-05 | Breadcrumbs on all pages except homepage | Breadcrumb component exists with BreadcrumbList JSON-LD. Already used on service pages, about, contact, FAQ, legal. Verify coverage. |
| SEO-07 | Sitemap.xml and robots.txt | Create `src/app/sitemap.ts` and `src/app/robots.ts` using Next.js MetadataRoute types. |
| SEO-08 | Internal linking (min 3-5 internal links per page) | Content audit per page; add contextual links in page sections and CTAs. |
| CMPL-03 | Vercel Analytics integration | Install `@vercel/analytics`, add `<Analytics />` component to locale layout. |
| CMPL-08 | GA4 event tracking (generate_lead, click_phone, click_whatsapp, scroll_depth) | Push `generate_lead` event to dataLayer on contact form success. Add click event tracking utility. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 16.1.6 | `generateMetadata`, `sitemap.ts`, `robots.ts` | Built-in, zero dependencies, type-safe via `Metadata` and `MetadataRoute` types |
| @vercel/analytics | latest | Pageview tracking on Vercel | Official Vercel package; `<Analytics />` component with Next.js route support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | latest (optional) | TypeScript types for schema.org | Only if type safety for JSON-LD is wanted; can use plain objects instead |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-written JSON-LD | next-seo | next-seo is Pages Router oriented; App Router metadata API is superior. Do not use. |
| schema-dts types | Plain objects | Plain objects are simpler and sufficient for 5 schema types. Recommended for this scope. |

**Installation:**
```bash
npm install @vercel/analytics
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/seo/
│   ├── metadata.ts        # generatePageMetadata() factory
│   ├── schemas.ts         # JSON-LD builder functions
│   └── constants.ts       # SITE_URL, ORG_NAME, etc.
├── app/
│   ├── sitemap.ts         # MetadataRoute.Sitemap
│   ├── robots.ts          # MetadataRoute.Robots
│   └── [locale]/
│       └── */page.tsx     # Each page uses factory + renders JSON-LD in JSX
```

### Pattern 1: Metadata Factory
**What:** A single `generatePageMetadata()` function that takes page-specific params (title, description, path, locale) and returns a complete `Metadata` object with canonical, hreflang, OG, and Twitter Card — eliminating 40+ lines of boilerplate per page.
**When to use:** Every page's `generateMetadata` export.
**Example:**
```typescript
// Source: Next.js v16.1.6 generateMetadata docs
// lib/seo/metadata.ts
import type { Metadata } from 'next';

const SITE_URL = 'https://aceagency.ro';

interface PageMetadataParams {
  readonly title: string;
  readonly description: string;
  readonly path: string;       // e.g. '/servicii/seo'
  readonly locale: string;     // 'ro' | 'en'
  readonly noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  noIndex = false,
}: PageMetadataParams): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        ro: `${SITE_URL}/ro${path}`,
        en: `${SITE_URL}/en${path}`,
        'x-default': `${SITE_URL}/ro${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: 'AceAgency',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
```

### Pattern 2: JSON-LD as JSX Script Tags (NOT metadata.other)
**What:** Render JSON-LD structured data as `<script type="application/ld+json">` in the page component's JSX return, not via `metadata.other`.
**When to use:** Every page that needs JSON-LD schema.
**Why:** The `other` field in metadata is for arbitrary `<meta>` tags, not `<script>` tags. Using `other: { 'script:ld+json': ... }` is undocumented and may not render. The official Next.js guide uses JSX.
**Example:**
```typescript
// Source: Next.js v16.1.6 JSON-LD docs
export default async function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AceAgency',
    url: 'https://aceagency.ro',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* page content */}
    </>
  );
}
```

### Pattern 3: JSON-LD Builder Functions
**What:** Pure functions that return schema.org objects, composable and testable.
**When to use:** Building Organization, LocalBusiness, Service, FAQ, BreadcrumbList schemas.
**Example:**
```typescript
// lib/seo/schemas.ts
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AceAgency',
    url: 'https://aceagency.ro',
    logo: 'https://aceagency.ro/images/logo.png',
    email: 'cretualin@aceagency.ro',
    telephone: '+40750465757',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bulevardul Aviatorilor 106',
      addressLocality: 'Bucuresti',
      addressCountry: 'RO',
    },
    sameAs: [
      // social media URLs
    ],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://aceagency.ro/#localbusiness',
    name: 'AceAgency',
    // ... extends Organization with geo, openingHours, priceRange
  };
}

export function serviceSchema(params: { name: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: { '@type': 'Organization', name: 'AceAgency', url: 'https://aceagency.ro' },
    areaServed: { '@type': 'Country', name: 'Romania' },
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
```

### Pattern 4: GA4 Event Helper
**What:** A type-safe utility to push events to GTM dataLayer, respecting cookie consent.
**When to use:** Contact form success, phone clicks, WhatsApp clicks.
**Example:**
```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  if (!window.dataLayer) return;
  window.dataLayer.push({ event: eventName, ...params });
}
```

### Anti-Patterns to Avoid
- **JSON-LD via metadata.other:** The `other: { 'script:ld+json': ... }` pattern in existing service/contact pages is undocumented. Move to JSX `<script>` tags.
- **Hardcoded site URL in every page:** Currently `https://aceagency.ro` is repeated in every page's metadata. Extract to a constant.
- **Missing XSS protection in JSON-LD:** Always use `.replace(/</g, '\\u003c')` when rendering JSON-LD with `dangerouslySetInnerHTML` (per Next.js docs).
- **Duplicate schema per page:** Don't put Organization schema on every page. Use Organization on homepage (layout level or homepage only), LocalBusiness on homepage, Service on service pages, etc.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | `src/app/sitemap.ts` with `MetadataRoute.Sitemap` | Next.js generates valid XML, handles caching, serves at /sitemap.xml automatically |
| Robots.txt | Static file in public/ | `src/app/robots.ts` with `MetadataRoute.Robots` | Dynamic, type-safe, can reference sitemap URL |
| Pageview tracking | Custom script | `@vercel/analytics` `<Analytics />` component | Handles SPA navigation, route changes, Vercel dashboard integration |
| Metadata boilerplate | Copy-paste per page | `generatePageMetadata()` factory | 10 pages x 40 lines = 400 lines of duplication eliminated |

**Key insight:** Next.js 16 App Router has first-class APIs for sitemap, robots, and metadata. Using file conventions is always better than manual implementations.

## Common Pitfalls

### Pitfall 1: JSON-LD in metadata.other Does Not Render as Script Tags
**What goes wrong:** Putting JSON-LD in `metadata.other` generates `<meta name="script:ld+json" content="...">` instead of `<script type="application/ld+json">`.
**Why it happens:** `metadata.other` maps to arbitrary `<meta>` tags. There's no special handling for `script:ld+json`.
**How to avoid:** Render JSON-LD as `<script type="application/ld+json">` in component JSX using `dangerouslySetInnerHTML`.
**Warning signs:** JSON-LD not appearing in Google Rich Results Test.

### Pitfall 2: Sitemap/Robots Files Placed Inside [locale] Directory
**What goes wrong:** Files inside `src/app/[locale]/sitemap.ts` would generate per-locale sitemaps at `/ro/sitemap.xml` and `/en/sitemap.xml`, which is non-standard.
**Why it happens:** Developers follow the locale pattern for all files.
**How to avoid:** Place `sitemap.ts` and `robots.ts` in `src/app/` (root of app directory), not inside `[locale]/`.
**Warning signs:** Sitemap not found at `/sitemap.xml`.

### Pitfall 3: Missing Meta Keys in i18n Files for Home and About
**What goes wrong:** `generateMetadata` calls `t('meta.title')` but the translation keys don't exist, causing runtime errors.
**Why it happens:** Home and About pages were built before metadata was standardized.
**How to avoid:** Add `meta.title` and `meta.description` keys to both `home` and `about` namespaces in `ro.json` and `en.json` before adding `generateMetadata` to those pages.
**Warning signs:** Build errors or empty titles.

### Pitfall 4: Canonical URL Path Mismatch with Locale Prefix
**What goes wrong:** Homepage canonical is `/ro` but actual URL is `/ro/` (trailing slash), causing duplicate content signals.
**Why it happens:** `localePrefix: 'always'` means root URL redirects to `/ro/`.
**How to avoid:** Ensure canonical for homepage is `https://aceagency.ro/ro` (consistent, no trailing slash), matching Next.js default behavior.
**Warning signs:** Google Search Console duplicate page warnings.

### Pitfall 5: GA4 Events Blocked When Analytics Consent Not Granted
**What goes wrong:** `generate_lead` event fires but GA4 ignores it because `analytics_storage` is `denied`.
**Why it happens:** GTM Consent Mode v2 blocks GA4 from processing events when consent is denied.
**How to avoid:** Events should push to dataLayer regardless; GTM Consent Mode handles gating. The `dataLayer.push` always works; it's GA4's processing that's gated.
**Warning signs:** Events not appearing in GA4 DebugView.

### Pitfall 6: Vercel Analytics and GA4 Double-Counting
**What goes wrong:** Both Vercel Analytics and GA4 track pageviews, leading to confusion about which is authoritative.
**Why it happens:** They're independent systems.
**How to avoid:** Use Vercel Analytics for Vercel dashboard metrics (simple, always-on). Use GA4 for detailed marketing analytics (consent-gated). Document this distinction.
**Warning signs:** Different pageview numbers in different dashboards.

## Code Examples

### Sitemap.ts
```typescript
// Source: Next.js v16.1.6 sitemap.ts docs
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SERVICE_DEFINITIONS } from '@/lib/services';

const SITE_URL = 'https://aceagency.ro';

const STATIC_PAGES = [
  '',                              // homepage
  '/despre-noi',
  '/servicii',
  '/contact',
  '/intrebari-frecvente',
  '/politica-confidentialitate',
  '/politica-cookies',
  '/termeni-si-conditii',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ro', 'en'];
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // Service sub-pages
  for (const service of SERVICE_DEFINITIONS) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/servicii/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
```

### Robots.ts
```typescript
// Source: Next.js v16.1.6 robots.ts docs
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/multumim'],
    },
    sitemap: 'https://aceagency.ro/sitemap.xml',
  };
}
```

### Vercel Analytics Integration
```typescript
// Source: @vercel/analytics docs
// In src/app/[locale]/layout.tsx
import { Analytics } from '@vercel/analytics/next';

// Inside <body>:
<Analytics />
```

### GA4 generate_lead Event on Form Success
```typescript
// In ContactForm.tsx, inside the useEffect that watches state.success:
useEffect(() => {
  if (state.success) {
    // Fire GA4 event via dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'generate_lead',
        event_category: 'contact',
        event_label: 'contact_form',
      });
    }
    router.push('/multumim');
  }
}, [state.success, router]);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-seo package | Built-in Metadata API | Next.js 13.2+ (App Router) | No external dependency needed |
| Static sitemap.xml in public/ | `app/sitemap.ts` file convention | Next.js 13.3+ | Dynamic, type-safe, auto-served |
| Static robots.txt in public/ | `app/robots.ts` file convention | Next.js 13.3+ | Dynamic, type-safe |
| JSON-LD via next-seo | `<script type="application/ld+json">` in JSX | Next.js 13+ App Router | Simpler, no dependency |
| gtag.js script tags | GTM Consent Mode v2 | 2024 | GDPR-compliant, consent-gated |

**Deprecated/outdated:**
- `next-seo`: Designed for Pages Router. App Router metadata API is superior.
- `metadata.other` for JSON-LD: Never officially supported; use JSX script tags.

## Codebase Audit

### Pages Missing generateMetadata
| Page | Path | Missing |
|------|------|---------|
| Home | `/[locale]/page.tsx` | No generateMetadata, no meta i18n keys |
| About | `/[locale]/despre-noi/page.tsx` | No generateMetadata, no meta i18n keys |

### Pages with Incomplete Metadata
| Page | Has title/desc | Has canonical | Has hreflang | Has OG | Has Twitter | Has JSON-LD |
|------|---------------|--------------|-------------|--------|-------------|-------------|
| Home | Layout default only | No | No | No | No | No |
| About | No | No | No | No | No | No |
| Services index | Yes | Yes | Yes | Yes | Yes | No |
| Service sub-pages (x6) | Yes | Yes | Yes | Yes | Yes | Yes (via metadata.other - broken) |
| Contact | Yes | Yes | Yes | Yes | Yes | Yes (via metadata.other - broken) |
| FAQ | Yes | Yes | Yes | Yes | Yes | No |
| Privacy | Yes | Yes | Yes | Yes | Yes | No |
| Cookies | Yes | Yes | Yes | Yes | Yes | No |
| Terms | Yes | Yes | Yes | Yes | Yes | No |
| Thank You | Yes | No | No | No | No | No (noindex is correct) |

### JSON-LD Schema Needed Per Page
| Page | Schemas Required |
|------|-----------------|
| Home | Organization + LocalBusiness |
| About | Organization + BreadcrumbList |
| Services index | Organization + BreadcrumbList |
| Service sub-pages | Service + BreadcrumbList + FAQ |
| Contact | Organization + BreadcrumbList |
| FAQ | FAQPage + BreadcrumbList |
| Legal pages | BreadcrumbList only |

### Breadcrumb Coverage
Breadcrumb component already used on: About, Services index, Service sub-pages, Contact, FAQ, Legal pages. NOT on homepage (correct -- homepage should not have breadcrumbs per SEO-05).

## Open Questions

1. **OG Image**
   - What we know: OG tags include title/description/url but no `og:image`. Google recommends 1200x630px.
   - What's unclear: Whether an OG image exists or needs to be created.
   - Recommendation: Create a default OG image at `/public/images/og-default.jpg` (1200x630, brand logo + tagline). Set in metadata factory as default. Can be per-page later.

2. **Internal Linking Audit (SEO-08)**
   - What we know: Pages have CTA sections with links, but no systematic audit of internal link counts.
   - What's unclear: Exact current count per page.
   - Recommendation: During implementation, audit each page and add contextual internal links in content sections to meet the 3-5 minimum.

3. **Service FAQ JSON-LD**
   - What we know: Service pages have FAQ sections with Q&A content in i18n files.
   - What's unclear: Whether FAQ answers are plain text or contain HTML that needs stripping for schema.
   - Recommendation: Strip HTML from FAQ answers when building FAQPage schema. Build a utility for this.

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js/v16.1.6` - generateMetadata API, sitemap.ts, robots.ts, JSON-LD guide
- Context7 `/websites/vercel` - @vercel/analytics integration, Analytics component usage
- Codebase analysis - all 10 page files, layout, gtm.ts, services.ts, Breadcrumb.tsx, ContactForm.tsx

### Secondary (MEDIUM confidence)
- Google Search Central - JSON-LD schema types (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList) are well-documented standard types

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js built-in APIs, verified via Context7 for v16.1.6
- Architecture: HIGH - Patterns based on official Next.js docs and existing codebase conventions
- Pitfalls: HIGH - Based on direct codebase audit revealing actual issues (metadata.other, missing meta keys)

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable domain, no fast-moving dependencies)
