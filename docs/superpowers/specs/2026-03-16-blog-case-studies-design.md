# Blog, Case Studies & Service Social Proof Integration

**Date:** 2026-03-16
**Status:** Approved

## Overview

Add a content ecosystem to the Laboratorul de Conversii website: MDX-based blog for articles, dedicated case studies section, and service page integration with portfolio sliders, case study results, and tagged testimonials. Launch with 3 articles + 3 case studies as starter content.

## Architecture

### Content System: MDX

All blog and case study content lives as MDX files in the repo:

```
content/
  blog/
    cum-sa-folosesti-ai-in-marketing.mdx
    performance-max-ghid-complet-2026.mdx
    optimizare-rata-conversie-ghid.mdx
  studii-de-caz/
    client-eshop-romania.mdx
    client-saas-platform.mdx
    client-clinica-medicala.mdx
```

MDX provides: static generation (SSG), proper SEO, markdown authoring, embedded React components, and git-based workflow. Future automation pipeline writes MDX files directly.

### Dependencies

Install:
```bash
npm install next-mdx-remote gray-matter reading-time
```

- `next-mdx-remote` (v5+) — MDX rendering in App Router Server Components via `compileMDX()`
- `gray-matter` — frontmatter parsing for index pages and `generateStaticParams`
- `reading-time` — auto-calculate reading time from word count

No `next.config.ts` changes required. `next-mdx-remote` v5 uses `compileMDX()` (async, no webpack plugin). Import pattern: `import { compileMDX } from 'next-mdx-remote/rsc'`.

### Data Access Layer: `lib/content.ts`

Shared utility for reading MDX content at build time:

```typescript
// lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content');

interface ContentMeta {
  slug: string;
  readingTime: number; // minutes, auto-calculated from word count
  [key: string]: unknown; // frontmatter fields
}

// Get all content items for a section (blog | studii-de-caz) and locale
function getContentBySection(section: string, locale: string): ContentMeta[];

// Get single content item by slug and locale
function getContentBySlug(section: string, slug: string, locale: string): { meta: ContentMeta; content: string };

// Used by generateStaticParams — returns all slugs for a section across locales
function getAllSlugs(section: string): { slug: string; locale: string }[];
```

`readingTime` is always computed at read time from word count (~200 wpm). The frontmatter `readingTime` field is optional and only used to override the calculated value.

### URL Structure

| Route | Purpose |
|-------|---------|
| `/blog` | Articles index with category filtering |
| `/blog/[slug]` | Individual article |
| `/studii-de-caz` | Case studies index |
| `/studii-de-caz/[slug]` | Individual case study |

Flat URL structure (no `/blog/category/slug`) — shorter URLs, no thin category index pages.

**i18n routing:** Both locales use the same path segments (`/ro/blog`, `/en/blog`, `/ro/studii-de-caz`, `/en/studii-de-caz`). No `pathnames` config needed in `routing.ts`. Content is locale-separated by the `locale` field in MDX frontmatter, with `translationSlug` linking corresponding translations.

### MDX Frontmatter Schemas

**Blog article:**
```yaml
---
title: "Performance Max in 2026: ghid complet"
slug: "performance-max-ghid-complet-2026"
description: "Meta description, max 155 chars with CTA"
category: "google-ads"  # single primary category
tags: ["google-ads", "performance-max", "e-commerce"]
author: "Laboratorul de Conversii"
publishedAt: "2026-03-16"
updatedAt: "2026-03-16"
featuredImage: "/images/blog/performance-max-2026.webp"
featuredImageAlt: "Dashboard Google Ads cu campanie Performance Max"
locale: "ro"  # ro | en
translationSlug: "performance-max-complete-guide-2026"  # slug of translated version
readingTime: 8  # optional override; auto-calculated from word count if omitted
---
```

**Case study:**
```yaml
---
title: "E-Shop Romania: +340% ROAS in 6 luni"
slug: "client-eshop-romania"
description: "Meta description with CTA"
client: "E-Shop Romania"
industry: "E-commerce"
services: ["google-ads", "facebook-ads", "email-marketing"]
metrics:
  - label: "ROAS"
    value: "340"
    prefix: "+"
    suffix: "%"
  - label: "Conversii lunare"
    value: "1200"
    prefix: "+"
    suffix: ""
  - label: "Cost per achizitie"
    value: "45"
    prefix: "-"
    suffix: "%"
heroImage: "/images/studii-de-caz/eshop-hero.webp"
heroImageAlt: "Dashboard e-commerce cu metrici de crestere"
screenshots:
  - src: "/images/studii-de-caz/eshop-screenshot-1.webp"
    alt: "Landing page E-Shop Romania redesignat"
    url: "https://eshop-example.ro"  # optional live site link
  - src: "/images/studii-de-caz/eshop-screenshot-2.webp"
    alt: "Campanie Google Ads Performance Max"
publishedAt: "2026-03-16"
locale: "ro"
translationSlug: "client-eshop-romania-en"
---
```

### Blog Categories

7 categories, stored as frontmatter tags (not URL routes):

| Key | Romanian Name | SEO Tier |
|-----|---------------|----------|
| `optimizare-conversii` | Optimizare Conversii | Tier 1 |
| `google-ads` | Google Ads & Performance | Tier 1 |
| `meta-ads` | Meta Ads & Social Media | Tier 1 |
| `tiktok-ads` | TikTok Ads & Creative | Tier 2 |
| `seo` | SEO & Vizibilitate Organica | Tier 1 |
| `email-marketing` | Email Marketing & Automatizari | Tier 2 |
| `ai-marketing` | AI in Marketing | Tier 1 |

Category display names and descriptions stored in `ro.json` / `en.json` translation files.

## Service Page Integration

### New Section Order (Interleaved Layout)

```
1.  ServiceHero          — breadcrumbs, icon, title
2.  HeroTransition       — definition paragraph
3.  ServiceFeatures      — benefits grid
4.  PortfolioSlider      — NEW: screenshot gallery + "Visit site"
5.  ServiceProcess       — methodology steps
6.  CaseStudyResults     — NEW: case study cards slider + 2 CTAs
7.  ServiceStats         — key metrics (CountUp)
8.  ServiceTestimonials  — NEW: tagged testimonials slider
9.  ServiceFAQ           — accordion
10. ServiceCTA           — call to action
```

### New Component: PortfolioSlider

- Horizontal slider with prev/next navigation
- Each slide: full-width screenshot image (16:9 or browser-frame mockup)
- Overlay or below: client name + service tag + "Viziteaza site-ul" button (opens in new tab)
- Placeholder images for initial launch across all 6 services
- Data source: `portfolioItems` array in translation files, keyed by service

```typescript
interface PortfolioItem {
  readonly src: string;        // screenshot image path
  readonly alt: string;        // descriptive alt text
  readonly client: string;     // client name
  readonly url?: string;       // live website URL (optional)
  readonly services: string[]; // tagged services
}
```

### New Component: CaseStudyResults

- Horizontal slider (same navigation pattern as PortfolioSlider)
- Each slide: hero image (left or top) + primary metric with CountUp animation + client name + industry badge
- Two CTAs per slide:
  - "Vezi studiul de caz" → links to `/studii-de-caz/[slug]`
  - "Programeaza un apel" → links to `/contact`
- Shows all case studies on every service page (cross-service)
- Data source: calls `getContentBySection('studii-de-caz', locale)` from `lib/content.ts` to load all case study frontmatter at build time. No filtering by service — all case studies shown. Slider auto-grows as new case studies are added (no cap).

### New Component: ServiceTestimonials

- Horizontal slider matching existing Testimonials pattern
- Filters testimonials by current service slug
- Falls back to showing all testimonials if none tagged for this service
- Data source: existing testimonial data in translation files, with added `services` field

### Testimonial Data Enhancement

Add `services` array to existing testimonial items in `ro.json` / `en.json`:

```json
{
  "home": {
    "testimonials": {
      "items": {
        "0": {
          "quote": "...",
          "author": "...",
          "company": "...",
          "rating": "5",
          "services": ["google-ads", "seo"]
        }
      }
    }
  }
}
```

Existing homepage Testimonials component continues to show all (ignores the `services` field).

**Filtering pattern for ServiceTestimonials:** Since testimonials are keyed by string index (`"0"`, `"1"`, etc.), the component iterates over `TESTIMONIAL_KEYS` array, reads each item via `t.raw()`, and filters by checking if `item.services` includes the current service slug. Falls back to showing all if no matches. This avoids refactoring the existing i18n structure.

## Pages

### `/blog` — Articles Index

- Hero section with title + description
- Category filter bar (horizontal pills, "Toate" selected by default)
- Blog post grid (2 columns desktop, 1 mobile)
- Each card: featured image + category badge + title + excerpt + date + reading time
- Pagination: 6 posts per page. Hidden when `totalPages === 1` (at launch with 3 articles, no pagination controls rendered)
- SEO: `Blog` breadcrumb, Article list schema

### `/blog/[slug]` — Article Detail

- Breadcrumbs: Acasa > Blog > [Article Title]
- Hero: featured image + title + meta (date, reading time, category)
- MDX content rendered with custom components (callouts, code blocks, images)
- Sidebar or bottom: related articles (same category, max 3)
- Bottom: CTA banner ("Vrei rezultate similare? Contacteaza-ne")
- SEO: Article schema, Open Graph, canonical

### `/studii-de-caz` — Case Studies Index

- Hero section with title + description
- Case study cards (all 3, grid layout)
- Each card: hero image + client name + industry badge + primary metric + excerpt
- Click → `/studii-de-caz/[slug]`
- SEO: BreadcrumbList schema

### `/studii-de-caz/[slug]` — Case Study Detail

- Breadcrumbs: Acasa > Studii de Caz > [Client Name]
- Hero: full-width hero image + client name + industry
- Metrics bar: all key metrics with CountUp animation
- Services used: pills/badges linking to service pages
- MDX content: the full story (challenge, approach, results)
- Screenshots gallery (reuses PortfolioSlider component)
- Bottom CTA: "Vrei rezultate similare?" + "Programeaza un apel"
- SEO: Article schema with Organization, metrics as structured data

## Existing Page Updates

### Homepage

- `CaseStudyPreview`: change CTA link from `/portofoliu` to `/studii-de-caz`

### Header Navigation

- Add `blog` and `studii-de-caz` entries to `navigation` keys in `ro.json` / `en.json`
- Update Header component to render the new nav items

### CLAUDE.md Pages Table

- Add `/studii-de-caz` (Must-have) and update `/blog` status from V2 to Must-have
- Remove `/portofoliu` row (replaced by `/studii-de-caz`)

### Sitemap & Robots

- Add `/blog/[slug]` and `/studii-de-caz/[slug]` to sitemap generation
- Blog and case study pages included in `sitemap.ts`

## SEO Implementation

### Schema Markup

- **Blog articles:** `BlogPosting` schema — field mapping: `publishedAt` → `datePublished`, `updatedAt` → `dateModified`, `featuredImage` → `image`, `author` → `author.name`, `description` → `description`
- **Case studies:** `Article` schema + `Organization` mention — same field mapping as above, plus metrics included in `description`
- **Blog index:** `CollectionPage` schema
- **Case studies index:** `CollectionPage` schema
- **Service pages:** existing schemas unchanged, new sections are presentational

### GEO Compliance

- Blog articles and case studies follow existing GEO rules from CLAUDE.md
- Case study metrics include methodology and time period (e.g., "calculat pe 6 luni, ian-iun 2025")
- FAQ answers and definitions maintain 134-167 word minimum for AI citability
- All content accessible to allowed AI crawlers per existing robots.txt configuration

## i18n

All new content is bilingual (RO primary, EN secondary):

- MDX files: separate files per locale, linked via `translationSlug` frontmatter
- UI strings (buttons, labels, section headers): added to `ro.json` and `en.json`
- URL slugs: Romanian for `/ro/`, English for `/en/` (transliterated, no diacritics)

## Starter Content

### 3 Blog Articles (to be generated)

1. **"Optimizare Rata de Conversie: Ghid Complet 2026"** — category: `optimizare-conversii`
   - Pillar content, 2000+ words, defines CRO for Romanian market
2. **"Performance Max in 2026: Cum Functioneaza si Cand Il Folosesti"** — category: `google-ads`
   - Tactical guide, 1500+ words, step-by-step setup
3. **"Cum Folosim AI pentru a Crea Reclame Care Vand"** — category: `ai-marketing`
   - Thought leadership, 1500+ words, tools + workflow

### 3 Case Studies (to be generated with placeholder data)

1. **E-Shop Romania** — services: google-ads, facebook-ads, email-marketing — metric: +340% ROAS
2. **SaaS Platform** — services: seo, google-ads — metric: +180% organic traffic
3. **Clinica Medicala** — services: facebook-ads, tiktok-ads — metric: +250% programari online

Content will be realistic and publication-ready, with placeholder images.

## Technical Decisions

### MDX Processing

Use `next-mdx-remote` for MDX rendering:
- Supports dynamic MDX loading without webpack config changes
- Server-side rendering compatible
- Custom component mapping for callouts, images, code blocks

### Slider Component

Reuse a consistent slider pattern across PortfolioSlider, CaseStudyResults, and ServiceTestimonials:
- Shared navigation (prev/next buttons) matching existing Testimonials pattern
- Touch/swipe support for mobile
- CSS scroll-snap for smooth sliding
- No heavy carousel library — keep bundle size small

### Image Handling

- All images: WebP format, lazy loading (except hero/above-fold)
- Screenshots: 16:9 aspect ratio, max 1200px wide
- Case study hero images: full-width, max 1920px wide
- Placeholder images: branded gradient backgrounds (matching brand colors)

## Out of Scope

- Content automation pipeline (cron + Claude + LinkedIn) — separate milestone
- CMS admin dashboard — MDX is the authoring interface
- Comments on blog posts
- Blog search functionality (can add later)
- RSS feed (can add later)

## Future Considerations

- As content grows past 20+ articles, add pagination to blog index
- Category index pages become viable at 10+ articles per category
- Content automation pipeline will write MDX files and create PRs
- LinkedIn cross-posting via API integration in automation milestone
