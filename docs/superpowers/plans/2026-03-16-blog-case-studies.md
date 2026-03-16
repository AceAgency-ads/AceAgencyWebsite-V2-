# Blog, Case Studies & Service Social Proof — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add MDX-based blog + case studies + service page social proof (portfolio slider, case study results, tagged testimonials) to the Laboratorul de Conversii website.

**Architecture:** MDX files in `content/` parsed at build time via `next-mdx-remote` + `gray-matter`. Shared `lib/content.ts` data access layer. Three new service page components (PortfolioSlider, CaseStudyResults, ServiceTestimonials) using CSS scroll-snap sliders. Blog at `/blog`, case studies at `/studii-de-caz`.

**Tech Stack:** Next.js 16 App Router, next-mdx-remote v5, gray-matter, reading-time, TypeScript, TailwindCSS 4, next-intl

**Spec:** `docs/superpowers/specs/2026-03-16-blog-case-studies-design.md`

---

## File Map

### New Files — Content Infrastructure

| File | Responsibility |
|------|---------------|
| `src/lib/content.ts` | MDX data access layer — read frontmatter, get by slug/section/locale |
| `src/types/content.ts` | TypeScript interfaces for blog articles, case studies, portfolio items |

### New Files — Blog Pages

| File | Responsibility |
|------|---------------|
| `src/app/[locale]/blog/page.tsx` | Blog index — list articles with category filter |
| `src/app/[locale]/blog/[slug]/page.tsx` | Blog article detail — MDX rendering |
| `src/components/sections/blog/BlogHero.tsx` | Blog index hero section |
| `src/components/sections/blog/BlogCard.tsx` | Blog post card for index grid |
| `src/components/sections/blog/BlogCategoryFilter.tsx` | Category pill filter bar (client component) |
| `src/components/sections/blog/ArticleHeader.tsx` | Article detail header (image, title, meta) |
| `src/components/sections/blog/ArticleCTA.tsx` | Bottom CTA banner on articles |
| `src/components/sections/blog/RelatedArticles.tsx` | Related articles (same category, max 3) |
| `src/components/sections/blog/BlogList.tsx` | Client component wrapping category filter + article grid |
| `src/lib/mdx-components.tsx` | Custom MDX component mapping (callouts, images) |

### New Files — Case Study Pages

| File | Responsibility |
|------|---------------|
| `src/app/[locale]/studii-de-caz/page.tsx` | Case studies index — grid of all case studies |
| `src/app/[locale]/studii-de-caz/[slug]/page.tsx` | Case study detail — MDX rendering |
| `src/components/sections/case-studies/CaseStudyHero.tsx` | Case study index hero |
| `src/components/sections/case-studies/CaseStudyCard.tsx` | Case study card for index grid |
| `src/components/sections/case-studies/CaseStudyMetrics.tsx` | Metrics bar with CountUp |
| `src/components/sections/case-studies/CaseStudyDetailCTA.tsx` | Bottom CTA on case study detail |

### New Files — Service Page Components

| File | Responsibility |
|------|---------------|
| `src/components/sections/services/PortfolioSlider.tsx` | Screenshot gallery slider + "Visit site" buttons |
| `src/components/sections/services/CaseStudyResults.tsx` | Case study results slider + 2 CTAs per slide |
| `src/components/sections/services/ServiceTestimonials.tsx` | Testimonials filtered by service slug |

### New Files — Starter Content

| File | Responsibility |
|------|---------------|
| `content/blog/optimizare-rata-conversie-ghid.mdx` | RO article: CRO guide |
| `content/blog/performance-max-ghid-complet-2026.mdx` | RO article: Performance Max guide |
| `content/blog/cum-folosim-ai-pentru-reclame.mdx` | RO article: AI in ads |
| `content/studii-de-caz/client-eshop-romania.mdx` | RO case study: E-Shop Romania |
| `content/studii-de-caz/client-saas-platform.mdx` | RO case study: SaaS Platform |
| `content/studii-de-caz/client-clinica-medicala.mdx` | RO case study: Clinica Medicala |

### Modified Files

| File | Change |
|------|--------|
| `package.json` | Add next-mdx-remote, gray-matter, reading-time |
| `src/messages/ro.json` | Add blog, case-study, portfolio UI strings + testimonial `services` tags + blog categories |
| `src/messages/en.json` | Same as ro.json (English translations) |
| `src/app/[locale]/servicii/[slug]/page.tsx` | Add PortfolioSlider, CaseStudyResults, ServiceTestimonials sections |
| `src/components/sections/home/CaseStudyPreview.tsx` | Change `/portofoliu` link to `/studii-de-caz` |
| `src/components/layout/MenuOverlay.tsx` | Add blog + studii-de-caz nav links |
| `src/app/sitemap.ts` | Add blog + case study dynamic entries |
| `src/lib/seo/schemas.ts` | Add blogPostingSchema, collectionPageSchema |
| `CLAUDE.md` | Update pages table: add `/studii-de-caz`, update `/blog` to Must-have, remove `/portofoliu` |

---

## Chunk 1: Foundation — Dependencies, Types, Content Layer

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install MDX packages**

```bash
npm install next-mdx-remote gray-matter reading-time
```

- [ ] **Step 2: Verify installation**

```bash
npm ls next-mdx-remote gray-matter reading-time
```

Expected: all three packages listed with versions

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add next-mdx-remote, gray-matter, reading-time"
```

---

### Task 2: Content Type Definitions

**Files:**
- Create: `src/types/content.ts`

- [ ] **Step 1: Create types file**

```typescript
// src/types/content.ts

/** Shared frontmatter fields for all MDX content. */
interface BaseContentMeta {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly locale: 'ro' | 'en';
  readonly translationSlug?: string;
}

/** Blog article frontmatter. */
export interface BlogArticleMeta extends BaseContentMeta {
  readonly category: string;
  readonly tags: readonly string[];
  readonly author: string;
  readonly updatedAt: string;
  readonly featuredImage: string;
  readonly featuredImageAlt: string;
  readonly readingTime?: number; // optional override
}

/** Case study metric. */
export interface CaseStudyMetric {
  readonly label: string;
  readonly value: string;
  readonly prefix: string;
  readonly suffix: string;
}

/** Case study screenshot. */
export interface CaseStudyScreenshot {
  readonly src: string;
  readonly alt: string;
  readonly url?: string;
}

/** Case study frontmatter. */
export interface CaseStudyMeta extends BaseContentMeta {
  readonly client: string;
  readonly industry: string;
  readonly services: readonly string[];
  readonly metrics: readonly CaseStudyMetric[];
  readonly heroImage: string;
  readonly heroImageAlt: string;
  readonly screenshots: readonly CaseStudyScreenshot[];
}

/** Portfolio item (stored in translation files). */
export interface PortfolioItem {
  readonly src: string;
  readonly alt: string;
  readonly client: string;
  readonly url?: string;
  readonly services: readonly string[];
}

/** Resolved content with computed readingTime. */
export interface ResolvedContent<T extends BaseContentMeta> {
  readonly meta: T & { readonly readingTime: number };
  readonly content: string;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit src/types/content.ts
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/types/content.ts
git commit -m "feat: add content type definitions for blog and case studies"
```

---

### Task 3: Content Data Access Layer

**Files:**
- Create: `src/lib/content.ts`

- [ ] **Step 1: Create content utility**

```typescript
// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type {
  BlogArticleMeta,
  CaseStudyMeta,
  ResolvedContent,
} from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Read all MDX files from a section directory, filtered by locale.
 * Returns frontmatter sorted by publishedAt descending (newest first).
 */
export function getContentBySection<T extends BlogArticleMeta | CaseStudyMeta>(
  section: 'blog' | 'studii-de-caz',
  locale: string
): (T & { readonly readingTime: number })[] {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const items = files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const meta = data as T;

      if (meta.locale !== locale) return null;

      const computedReadingTime =
        'readingTime' in meta && typeof meta.readingTime === 'number'
          ? meta.readingTime
          : Math.ceil(readingTime(content).minutes);

      return { ...meta, readingTime: computedReadingTime } as T & {
        readonly readingTime: number;
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Read a single MDX file by slug and locale.
 * Returns frontmatter + raw MDX content string for compileMDX().
 */
export function getContentBySlug<T extends BlogArticleMeta | CaseStudyMeta>(
  section: 'blog' | 'studii-de-caz',
  slug: string,
  locale: string
): ResolvedContent<T> | null {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const meta = data as T;

    if (meta.slug === slug && meta.locale === locale) {
      const computedReadingTime =
        'readingTime' in meta && typeof meta.readingTime === 'number'
          ? meta.readingTime
          : Math.ceil(readingTime(content).minutes);

      return {
        meta: { ...meta, readingTime: computedReadingTime } as T & {
          readonly readingTime: number;
        },
        content,
      };
    }
  }

  return null;
}

/**
 * Get all slugs for generateStaticParams.
 * Returns array of { slug, locale } for all MDX files in a section.
 */
export function getAllSlugs(
  section: 'blog' | 'studii-de-caz'
): { slug: string; locale: string }[] {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return { slug: data.slug as string, locale: data.locale as string };
  });
}
```

- [ ] **Step 2: Create content directories**

```bash
mkdir -p content/blog content/studii-de-caz
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: build succeeds (content functions are not imported yet, just defined)

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.ts content/
git commit -m "feat: add MDX content data access layer"
```

---

### Task 4: MDX Component Mapping

**Files:**
- Create: `src/lib/mdx-components.tsx`

- [ ] **Step 1: Create MDX components**

```tsx
// src/lib/mdx-components.tsx
import Image from 'next/image';

/**
 * Custom component mapping for MDX content rendering.
 * Passed to compileMDX() — maps markdown elements to React components.
 */
export const mdxComponents = {
  /** Next.js Image with lazy loading and responsive sizing. */
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={props.src ?? ''}
      alt={props.alt ?? ''}
      width={1200}
      height={675}
      className="my-8 rounded-2xl"
      loading="lazy"
    />
  ),

  /** Callout/highlight block for MDX content. */
  Callout: ({
    children,
    type = 'info',
  }: {
    readonly children: React.ReactNode;
    readonly type?: 'info' | 'warning' | 'tip';
  }) => {
    const colors = {
      info: 'border-[#650CBE]/30 bg-[#650CBE]/5',
      warning: 'border-amber-500/30 bg-amber-500/5',
      tip: 'border-[#66F3A6]/30 bg-[#66F3A6]/5',
    };
    return (
      <div
        className={`my-6 rounded-xl border-l-4 p-6 ${colors[type]}`}
      >
        {children}
      </div>
    );
  },

  /** Stat highlight for case studies — large metric inline. */
  StatHighlight: ({
    value,
    label,
  }: {
    readonly value: string;
    readonly label: string;
  }) => (
    <div className="my-6 flex items-baseline gap-3">
      <span className="text-4xl font-bold text-[#650CBE]">{value}</span>
      <span className="text-lg text-[#D9D9D9]">{label}</span>
    </div>
  ),
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/mdx-components.tsx
git commit -m "feat: add custom MDX component mapping"
```

---

### Task 5: SEO Schema Additions

**Files:**
- Modify: `src/lib/seo/schemas.ts`

- [ ] **Step 1: Add BlogPosting and CollectionPage schemas**

Add these functions after the existing `webSiteSchema()` in `src/lib/seo/schemas.ts`:

```typescript
// ─── BlogPosting ─────────────────────────────────────────────────────────────

interface BlogPostingSchemaParams {
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly datePublished: string;
  readonly dateModified: string;
  readonly image?: string;
  readonly authorName: string;
}

export function blogPostingSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName,
}: BlogPostingSchemaParams): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    image: image ? `${SITE_URL}${image}` : undefined,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
  } as const;
}

// ─── CollectionPage ──────────────────────────────────────────────────────────

interface CollectionPageSchemaParams {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}

export function collectionPageSchema({
  name,
  description,
  url,
}: CollectionPageSchemaParams): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
  } as const;
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo/schemas.ts
git commit -m "feat: add BlogPosting and CollectionPage JSON-LD schemas"
```

---

## Chunk 2: Blog Pages

### Task 6: i18n — Blog UI Strings

**Files:**
- Modify: `src/messages/ro.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add blog namespace to ro.json**

Add to `ro.json` at the top level (sibling to `"home"`, `"services"`, etc.):

```json
"blog": {
  "meta": {
    "title": "Blog | Laboratorul de Conversii",
    "description": "Articole despre marketing digital, optimizare conversii, Google Ads, SEO si AI in marketing. Strategii testate pentru cresterea afacerii tale."
  },
  "hero": {
    "overline": "BLOG",
    "heading": "Strategii de Marketing care Functioneaza",
    "description": "Ghiduri practice, studii de caz si insight-uri din experienta noastra cu peste 50 de clienti."
  },
  "categories": {
    "all": "Toate",
    "optimizare-conversii": "Optimizare Conversii",
    "google-ads": "Google Ads",
    "meta-ads": "Meta Ads",
    "tiktok-ads": "TikTok Ads",
    "seo": "SEO",
    "email-marketing": "Email Marketing",
    "ai-marketing": "AI in Marketing"
  },
  "card": {
    "readingTime": "{minutes} min citire"
  },
  "article": {
    "breadcrumbHome": "Acasa",
    "breadcrumbBlog": "Blog",
    "relatedHeading": "Articole similare",
    "ctaHeading": "Vrei rezultate similare?",
    "ctaDescription": "Programeaza o consultatie gratuita si discutam despre obiectivele tale de crestere.",
    "ctaPrimary": "Programeaza un apel",
    "ctaSecondary": "Contacteaza-ne"
  }
}
```

- [ ] **Step 2: Add blog namespace to en.json**

Same structure with English translations:

```json
"blog": {
  "meta": {
    "title": "Blog | Conversion Lab",
    "description": "Articles about digital marketing, conversion optimization, Google Ads, SEO, and AI in marketing. Tested strategies for growing your business."
  },
  "hero": {
    "overline": "BLOG",
    "heading": "Marketing Strategies that Work",
    "description": "Practical guides, case studies, and insights from our experience with over 50 clients."
  },
  "categories": {
    "all": "All",
    "optimizare-conversii": "Conversion Optimization",
    "google-ads": "Google Ads",
    "meta-ads": "Meta Ads",
    "tiktok-ads": "TikTok Ads",
    "seo": "SEO",
    "email-marketing": "Email Marketing",
    "ai-marketing": "AI in Marketing"
  },
  "card": {
    "readingTime": "{minutes} min read"
  },
  "article": {
    "breadcrumbHome": "Home",
    "breadcrumbBlog": "Blog",
    "relatedHeading": "Related articles",
    "ctaHeading": "Want similar results?",
    "ctaDescription": "Schedule a free consultation and let's discuss your growth goals.",
    "ctaPrimary": "Book a call",
    "ctaSecondary": "Contact us"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/messages/ro.json src/messages/en.json
git commit -m "feat: add blog i18n strings for RO and EN"
```

---

### Task 7: Blog Components

**Files:**
- Create: `src/components/sections/blog/BlogHero.tsx`
- Create: `src/components/sections/blog/BlogCard.tsx`
- Create: `src/components/sections/blog/BlogCategoryFilter.tsx`
- Create: `src/components/sections/blog/ArticleHeader.tsx`
- Create: `src/components/sections/blog/ArticleCTA.tsx`
- Create: `src/components/sections/blog/RelatedArticles.tsx`

- [ ] **Step 1: Create BlogHero**

```tsx
// src/components/sections/blog/BlogHero.tsx
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

export function BlogHero(): React.JSX.Element {
  const t = useTranslations('blog');

  return (
    <SectionWrapper theme="dark" hero>
      <SectionHeader
        overline={t('hero.overline')}
        heading={t('hero.heading')}
        description={t('hero.description')}
        headingAs="h1"
      />
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Create BlogCard**

```tsx
// src/components/sections/blog/BlogCard.tsx
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Calendar, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { BlogArticleMeta } from '@/types/content';

interface BlogCardProps {
  readonly article: BlogArticleMeta & { readonly readingTime: number };
}

export function BlogCard({ article }: BlogCardProps): React.JSX.Element {
  const t = useTranslations('blog');

  return (
    <ScrollReveal>
      <Link href={`/blog/${article.slug}`}>
        <article className="group overflow-hidden rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] transition-shadow duration-300 hover:shadow-lg">
          {/* Featured image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Category badge */}
            <span className="absolute top-4 left-4 rounded-full bg-[#650CBE] px-3 py-1 text-xs font-semibold text-white">
              {t(`categories.${article.category}`)}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h3 className="mb-3 text-xl font-bold text-[var(--section-text)] md:text-2xl">
              {article.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-[var(--section-text-muted)]">
              {article.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-[var(--section-text-muted)]">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date(article.publishedAt).toLocaleDateString('ro-RO', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {t('card.readingTime', { minutes: article.readingTime })}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}
```

- [ ] **Step 3: Create BlogCategoryFilter**

```tsx
// src/components/sections/blog/BlogCategoryFilter.tsx
'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const CATEGORIES = [
  'all',
  'optimizare-conversii',
  'google-ads',
  'meta-ads',
  'tiktok-ads',
  'seo',
  'email-marketing',
  'ai-marketing',
] as const;

interface BlogCategoryFilterProps {
  readonly selected: string;
  readonly onSelect: (category: string) => void;
}

export function BlogCategoryFilter({
  selected,
  onSelect,
}: BlogCategoryFilterProps): React.JSX.Element {
  const t = useTranslations('blog');

  return (
    <ScrollReveal>
      <div
        className="mb-12 flex flex-wrap gap-3"
        role="tablist"
        aria-label="Blog categories"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selected === cat}
            onClick={() => onSelect(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
              selected === cat
                ? 'bg-[#650CBE] text-white'
                : 'border border-[var(--section-border)] text-[var(--section-text-muted)] hover:border-[#650CBE] hover:text-[#650CBE]'
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>
    </ScrollReveal>
  );
}
```

- [ ] **Step 4: Create ArticleHeader**

```tsx
// src/components/sections/blog/ArticleHeader.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, Clock } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import type { BlogArticleMeta } from '@/types/content';

interface ArticleHeaderProps {
  readonly article: BlogArticleMeta & { readonly readingTime: number };
}

export function ArticleHeader({
  article,
}: ArticleHeaderProps): React.JSX.Element {
  const t = useTranslations('blog');

  return (
    <SectionWrapper theme="dark" hero>
      {/* Breadcrumbs */}
      {/* Breadcrumbs — use Link from next-intl for locale-aware routing */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-[var(--section-text-muted)]">
          <li>
            <Link href="/" className="hover:text-white">
              {t('article.breadcrumbHome')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-white">
              {t('article.breadcrumbBlog')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-white">{article.title}</li>
        </ol>
      </nav>

      {/* Category badge */}
      <span className="mb-4 inline-block rounded-full bg-[#650CBE] px-4 py-1.5 text-xs font-semibold text-white">
        {t(`categories.${article.category}`)}
      </span>

      {/* Title */}
      <h1 className="mb-6 max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
        {article.title}
      </h1>

      {/* Meta row */}
      <div className="mb-10 flex items-center gap-6 text-sm text-[var(--section-text-muted)]">
        <span className="flex items-center gap-2">
          <Calendar className="size-4" />
          {new Date(article.publishedAt).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="size-4" />
          {t('card.readingTime', { minutes: article.readingTime })}
        </span>
      </div>

      {/* Featured image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 5: Create ArticleCTA**

```tsx
// src/components/sections/blog/ArticleCTA.tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function ArticleCTA(): React.JSX.Element {
  const t = useTranslations('blog');

  return (
    <SectionWrapper theme="accent">
      <ScrollReveal className="text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          {t('article.ctaHeading')}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-[var(--section-text-muted)]">
          {t('article.ctaDescription')}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#650CBE] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#7A1FD8]"
          >
            {t('article.ctaPrimary')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
```

- [ ] **Step 6: Create RelatedArticles**

```tsx
// src/components/sections/blog/RelatedArticles.tsx
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BlogCard } from '@/components/sections/blog/BlogCard';
import type { BlogArticleMeta } from '@/types/content';

interface RelatedArticlesProps {
  readonly articles: readonly (BlogArticleMeta & {
    readonly readingTime: number;
  })[];
}

export function RelatedArticles({
  articles,
}: RelatedArticlesProps): React.JSX.Element | null {
  const t = useTranslations('blog');

  if (articles.length === 0) return null;

  return (
    <SectionWrapper theme="light">
      <SectionHeader heading={t('article.relatedHeading')} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/blog/
git commit -m "feat: add blog components — hero, card, filter, article header, CTA, related"
```

---

### Task 8: Blog Index Page

**Files:**
- Create: `src/app/[locale]/blog/page.tsx`

- [ ] **Step 1: Create blog index page**

This page is a hybrid: the page itself is a server component that reads MDX at build time, but contains a client component (BlogCategoryFilter) for interactive filtering. The filtering is done client-side by passing all articles as props.

```tsx
// src/app/[locale]/blog/page.tsx
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { getContentBySection } from '@/lib/content';
import { collectionPageSchema, renderJsonLd } from '@/lib/seo/schemas';
import { BlogHero } from '@/components/sections/blog/BlogHero';
import { BlogList } from '@/components/sections/blog/BlogList';
import type { BlogArticleMeta } from '@/types/content';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'blog',
    locale,
  });
}

export default async function BlogPage({
  params,
}: BlogPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const articles = getContentBySection<BlogArticleMeta>('blog', locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            collectionPageSchema({
              name: t('meta.title'),
              description: t('meta.description'),
              url: `${SITE_URL}/${locale}/blog`,
            })
          ),
        }}
      />
      <BlogHero />
      <BlogList articles={articles} />
    </>
  );
}
```

- [ ] **Step 2: Create BlogList client component**

This wraps the filter + grid as a client component since category selection is interactive:

```tsx
// src/components/sections/blog/BlogList.tsx
'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { BlogCategoryFilter } from '@/components/sections/blog/BlogCategoryFilter';
import { BlogCard } from '@/components/sections/blog/BlogCard';
import type { BlogArticleMeta } from '@/types/content';

interface BlogListProps {
  readonly articles: readonly (BlogArticleMeta & {
    readonly readingTime: number;
  })[];
}

export function BlogList({ articles }: BlogListProps): React.JSX.Element {
  const [category, setCategory] = useState('all');

  const filtered =
    category === 'all'
      ? articles
      : articles.filter((a) => a.category === category);

  return (
    <SectionWrapper theme="light">
      <BlogCategoryFilter selected={category} onSelect={setCategory} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-[var(--section-text-muted)]">
          Niciun articol in aceasta categorie.
        </p>
      )}
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Verify build** (will fail until content exists — that's expected, verify no TS errors)

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/blog/page.tsx src/components/sections/blog/BlogList.tsx
git commit -m "feat: add blog index page with category filtering"
```

---

### Task 9: Blog Article Detail Page

**Files:**
- Create: `src/app/[locale]/blog/[slug]/page.tsx`

- [ ] **Step 1: Create article detail page**

```tsx
// src/app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { getContentBySlug, getContentBySection, getAllSlugs } from '@/lib/content';
import { blogPostingSchema, renderJsonLd } from '@/lib/seo/schemas';
import { mdxComponents } from '@/lib/mdx-components';
import { ArticleHeader } from '@/components/sections/blog/ArticleHeader';
import { ArticleCTA } from '@/components/sections/blog/ArticleCTA';
import { RelatedArticles } from '@/components/sections/blog/RelatedArticles';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import type { BlogArticleMeta } from '@/types/content';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string; locale: string }[] {
  return getAllSlugs('blog');
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = getContentBySlug<BlogArticleMeta>('blog', slug, locale);
  if (!result) return {};

  return generatePageMetadata({
    title: result.meta.title,
    description: result.meta.description,
    path: `blog/${slug}`,
    locale,
  });
}

export default async function ArticlePage({
  params,
}: ArticlePageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = getContentBySlug<BlogArticleMeta>('blog', slug, locale);
  if (!result) notFound();

  const { meta, content } = result;

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
  });

  // Related articles: same category, exclude current, max 3
  const allArticles = getContentBySection<BlogArticleMeta>('blog', locale);
  const related = allArticles
    .filter((a) => a.category === meta.category && a.slug !== meta.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            blogPostingSchema({
              title: meta.title,
              description: meta.description,
              url: `${SITE_URL}/${locale}/blog/${slug}`,
              datePublished: meta.publishedAt,
              dateModified: meta.updatedAt,
              image: meta.featuredImage,
              authorName: meta.author,
            })
          ),
        }}
      />
      <ArticleHeader article={meta} />
      <SectionWrapper theme="light">
        <article className="prose prose-lg mx-auto max-w-3xl">
          {mdxContent}
        </article>
      </SectionWrapper>
      <RelatedArticles articles={related} />
      <ArticleCTA />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/[locale]/blog/[slug]/page.tsx
git commit -m "feat: add blog article detail page with MDX rendering"
```

---

## Chunk 3: Case Study Pages

### Task 10: i18n — Case Study UI Strings

**Files:**
- Modify: `src/messages/ro.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add caseStudies namespace to ro.json**

Add at top level:

```json
"caseStudies": {
  "meta": {
    "title": "Studii de Caz | Laboratorul de Conversii",
    "description": "Rezultate concrete obtinute pentru clientii nostri. Studii de caz cu metrici reale din campanii Google Ads, Facebook Ads, SEO si Email Marketing."
  },
  "hero": {
    "overline": "STUDII DE CAZ",
    "heading": "Rezultate care Vorbesc de la Sine",
    "description": "Descoperiti cum am ajutat afaceri din Romania sa creasca prin sisteme de conversie testate si optimizate."
  },
  "detail": {
    "breadcrumbHome": "Acasa",
    "breadcrumbIndex": "Studii de Caz",
    "servicesUsed": "Servicii utilizate",
    "ctaHeading": "Vrei rezultate similare?",
    "ctaPrimary": "Programeaza un apel",
    "ctaSecondary": "Contacteaza-ne",
    "screenshotsHeading": "Rezultate vizuale"
  }
}
```

- [ ] **Step 2: Add caseStudies namespace to en.json**

```json
"caseStudies": {
  "meta": {
    "title": "Case Studies | Conversion Lab",
    "description": "Concrete results achieved for our clients. Case studies with real metrics from Google Ads, Facebook Ads, SEO, and Email Marketing campaigns."
  },
  "hero": {
    "overline": "CASE STUDIES",
    "heading": "Results that Speak for Themselves",
    "description": "Discover how we helped Romanian businesses grow through tested and optimized conversion systems."
  },
  "detail": {
    "breadcrumbHome": "Home",
    "breadcrumbIndex": "Case Studies",
    "servicesUsed": "Services used",
    "ctaHeading": "Want similar results?",
    "ctaPrimary": "Book a call",
    "ctaSecondary": "Contact us",
    "screenshotsHeading": "Visual results"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/messages/ro.json src/messages/en.json
git commit -m "feat: add case studies i18n strings for RO and EN"
```

---

### Task 11: Case Study Components

**Files:**
- Create: `src/components/sections/case-studies/CaseStudyHero.tsx`
- Create: `src/components/sections/case-studies/CaseStudyCard.tsx`
- Create: `src/components/sections/case-studies/CaseStudyMetrics.tsx`
- Create: `src/components/sections/case-studies/CaseStudyDetailCTA.tsx`

- [ ] **Step 1: Create CaseStudyHero**

Same pattern as BlogHero — uses SectionWrapper + SectionHeader with `caseStudies` namespace.

- [ ] **Step 2: Create CaseStudyCard**

Card with: hero image, client name, industry badge, primary metric (CountUp), description. Links to `/studii-de-caz/[slug]`. Uses ScrollReveal wrapper. Pattern matches existing CaseStudyPreview cards.

- [ ] **Step 3: Create CaseStudyMetrics**

Horizontal bar of all metrics with CountUp animation. Each metric: prefix + CountUp(value) + suffix + label below. Uses the existing CountUp component from `src/components/animations/CountUp.tsx`.

- [ ] **Step 4: Create CaseStudyDetailCTA**

Two-button CTA section: "Programeaza un apel" (primary, links to `/contact`) + "Contacteaza-ne" (secondary). Uses SectionWrapper with accent theme.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/case-studies/
git commit -m "feat: add case study components — hero, card, metrics, CTA"
```

---

### Task 12: Case Study Pages

**Files:**
- Create: `src/app/[locale]/studii-de-caz/page.tsx`
- Create: `src/app/[locale]/studii-de-caz/[slug]/page.tsx`

- [ ] **Step 1: Create case studies index page**

Server component. Reads all case study MDX frontmatter via `getContentBySection('studii-de-caz', locale)`. Renders: CaseStudyHero + grid of CaseStudyCards + CollectionPage JSON-LD schema.

- [ ] **Step 2: Create case study detail page**

Server component. Uses `getContentBySlug` + `compileMDX` (same pattern as blog article). Renders: breadcrumbs + hero image + CaseStudyMetrics + service pills linking to `/servicii/[slug]` + MDX content + screenshots (reuses PortfolioSlider — built in next chunk) + CaseStudyDetailCTA + Article JSON-LD schema.

Note: PortfolioSlider import will be added after Task 14. For now, render screenshots as a simple grid.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/studii-de-caz/
git commit -m "feat: add case studies index and detail pages"
```

---

## Chunk 4: Service Page Social Proof Components

### Task 13: i18n — Service Social Proof Strings

**Files:**
- Modify: `src/messages/ro.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add service social proof strings to ro.json**

Add under `"services"` namespace:

```json
"portfolio": {
  "overline": "PORTOFOLIU",
  "heading": "Proiecte Realizate",
  "visitSite": "Viziteaza site-ul",
  "items": {
    "0": { "src": "/images/portfolio/placeholder-1.webp", "alt": "Proiect client 1", "client": "Client Demo 1", "url": "", "services": ["google-ads", "seo"] },
    "1": { "src": "/images/portfolio/placeholder-2.webp", "alt": "Proiect client 2", "client": "Client Demo 2", "url": "", "services": ["facebook-ads", "email-marketing"] },
    "2": { "src": "/images/portfolio/placeholder-3.webp", "alt": "Proiect client 3", "client": "Client Demo 3", "url": "", "services": ["tiktok-ads", "google-ads"] }
  }
},
"caseStudyResults": {
  "overline": "REZULTATE REALE",
  "heading": "Ce am Obtinut pentru Clientii Nostri",
  "viewCaseStudy": "Vezi studiul de caz",
  "bookCall": "Programeaza un apel"
},
"serviceTestimonials": {
  "overline": "CLIENTI MULTUMITI",
  "heading": "Ce Spun Clientii Nostri"
}
```

- [ ] **Step 2: Add `services` tags to existing testimonial items**

In both `ro.json` and `en.json`, add `"services"` array to each testimonial item under `home.testimonials.items`:

```json
"0": { "quote": "...", "author": "...", "company": "...", "rating": "5", "services": ["google-ads", "seo"] },
"1": { "quote": "...", "author": "...", "company": "...", "rating": "5", "services": ["facebook-ads"] },
```

Distribute services across the 6 testimonials so each service has at least 1 testimonial.

- [ ] **Step 3: Add same strings to en.json** (English equivalents)

- [ ] **Step 4: Commit**

```bash
git add src/messages/ro.json src/messages/en.json
git commit -m "feat: add service social proof i18n strings and testimonial service tags"
```

---

### Task 14: PortfolioSlider Component

**Files:**
- Create: `src/components/sections/services/PortfolioSlider.tsx`

- [ ] **Step 1: Create PortfolioSlider**

Client component. Horizontal CSS scroll-snap slider with prev/next buttons (matching existing Testimonials navigation pattern). Each slide: 16:9 screenshot image + client name overlay + "Viziteaza site-ul" button. Receives `serviceSlug` prop to filter portfolio items by service.

Pattern to follow: copy the scroll/navigation pattern from `src/components/sections/home/Testimonials.tsx` (useRef + scrollBy + snap-x). Card width: `w-[85vw] sm:w-[500px] lg:w-[600px]`.

Data source: reads from `services.portfolio.items` via `useTranslations('services')`, filters by checking if `item.services` includes `serviceSlug`.

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/services/PortfolioSlider.tsx
git commit -m "feat: add PortfolioSlider component for service pages"
```

---

### Task 15: CaseStudyResults Component

**Files:**
- Create: `src/components/sections/services/CaseStudyResults.tsx`

- [ ] **Step 1: Create CaseStudyResults**

Client component that receives `caseStudies` array as a prop (loaded by parent server component in Task 17). This is a prop-driven component — it does NOT self-fetch from the filesystem.

Props interface:
```typescript
interface CaseStudyResultsProps {
  readonly caseStudies: readonly (CaseStudyMeta & { readonly readingTime: number })[];
}
```

Each slide: hero image (left) + client name + industry badge + primary metric (CountUp) + two CTAs ("Vezi studiul de caz" → `/studii-de-caz/[slug]`, "Programeaza un apel" → `/contact`).

Same slider navigation pattern as PortfolioSlider (CSS scroll-snap + prev/next buttons).

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/services/CaseStudyResults.tsx
git commit -m "feat: add CaseStudyResults slider component for service pages"
```

---

### Task 16: ServiceTestimonials Component

**Files:**
- Create: `src/components/sections/services/ServiceTestimonials.tsx`

- [ ] **Step 1: Create ServiceTestimonials**

Client component. Same slider pattern as Testimonials. Receives `serviceSlug` prop. Iterates TESTIMONIAL_KEYS (`['0','1','2','3','4','5']`), reads each via `t.raw('home.testimonials.items.{key}')`, filters by `item.services.includes(serviceSlug)`. Falls back to showing all if no matches.

Card rendering: reuse the exact text testimonial card markup from `src/components/sections/home/Testimonials.tsx` (quote + star rating + author + company).

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/services/ServiceTestimonials.tsx
git commit -m "feat: add ServiceTestimonials component filtered by service"
```

---

### Task 17: Integrate New Sections into Service Detail Page

**Files:**
- Modify: `src/app/[locale]/servicii/[slug]/page.tsx`

- [ ] **Step 1: Add imports and new sections**

In `src/app/[locale]/servicii/[slug]/page.tsx`, add imports for the 3 new components and insert them in the interleaved order:

```tsx
import { PortfolioSlider } from '@/components/sections/services/PortfolioSlider';
import { CaseStudyResults } from '@/components/sections/services/CaseStudyResults';
import { ServiceTestimonials } from '@/components/sections/services/ServiceTestimonials';
import { getContentBySection } from '@/lib/content';
import type { CaseStudyMeta } from '@/types/content';
```

In the JSX, insert between existing sections:

```tsx
{/* After ServiceFeatures, before ServiceProcess */}
<PortfolioSlider serviceSlug={service.slug} />

{/* After ServiceProcess, before ServiceStats */}
<CaseStudyResults caseStudies={caseStudies} />

{/* After ServiceStats, before ServiceFAQ */}
<ServiceTestimonials serviceSlug={service.slug} />
```

Load case studies in the server component body:

```tsx
const caseStudies = getContentBySection<CaseStudyMeta>('studii-de-caz', locale);
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/servicii/[slug]/page.tsx
git commit -m "feat: integrate portfolio, case studies, testimonials into service pages"
```

---

## Chunk 5: Starter Content & Existing Page Updates

### Task 18: Starter Blog Articles (3 MDX files)

**Files:**
- Create: `content/blog/optimizare-rata-conversie-ghid.mdx`
- Create: `content/blog/performance-max-ghid-complet-2026.mdx`
- Create: `content/blog/cum-folosim-ai-pentru-reclame.mdx`

- [ ] **Step 1: Write CRO guide article** (2000+ words, Romanian, category: optimizare-conversii)

Full article with proper frontmatter, H2/H3 structure, Callout components, internal links to services.

- [ ] **Step 2: Write Performance Max guide** (1500+ words, Romanian, category: google-ads)

- [ ] **Step 3: Write AI in ads article** (1500+ words, Romanian, category: ai-marketing)

- [ ] **Step 4: Commit**

```bash
git add content/blog/
git commit -m "feat: add 3 starter blog articles (CRO, Performance Max, AI ads)"
```

---

### Task 19: Starter Case Studies (3 MDX files)

**Files:**
- Create: `content/studii-de-caz/client-eshop-romania.mdx`
- Create: `content/studii-de-caz/client-saas-platform.mdx`
- Create: `content/studii-de-caz/client-clinica-medicala.mdx`

- [ ] **Step 1: Write E-Shop Romania case study**

Frontmatter with metrics (+340% ROAS), services: google-ads, facebook-ads, email-marketing. MDX body with challenge/approach/results structure. Placeholder hero image path.

- [ ] **Step 2: Write SaaS Platform case study** (services: seo, google-ads, metric: +180% organic traffic)

- [ ] **Step 3: Write Clinica Medicala case study** (services: facebook-ads, tiktok-ads, metric: +250% programari)

- [ ] **Step 4: Commit**

```bash
git add content/studii-de-caz/
git commit -m "feat: add 3 starter case studies (E-Shop, SaaS, Clinica)"
```

---

### Task 20: Update Existing Pages & Navigation

**Files:**
- Modify: `src/components/sections/home/CaseStudyPreview.tsx:89` — change `/portofoliu` to `/studii-de-caz`
- Modify: `src/components/layout/MenuOverlay.tsx:17-27` — add blog + studii-de-caz nav links
- Modify: `src/messages/ro.json` — add navigation keys
- Modify: `src/messages/en.json` — add navigation keys
- Modify: `src/app/sitemap.ts` — add blog + case study dynamic entries
- Modify: `CLAUDE.md` — update pages table

- [ ] **Step 1: Fix CaseStudyPreview link**

In `src/components/sections/home/CaseStudyPreview.tsx` line 89, change:
```tsx
// Old
href="/portofoliu"
// New
href="/studii-de-caz"
```

- [ ] **Step 2: Add nav links to MenuOverlay**

In `src/components/layout/MenuOverlay.tsx`, update the `NavLink` interface and `NAV_LINKS` array:

```typescript
interface NavLink {
  readonly key: string;
  readonly href: '/' | '/despre-noi' | '/servicii' | '/blog' | '/studii-de-caz' | '/intrebari-frecvente' | '/contact';
}

const NAV_LINKS: readonly NavLink[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/despre-noi' },
  { key: 'services', href: '/servicii' },
  { key: 'blog', href: '/blog' },
  { key: 'caseStudies', href: '/studii-de-caz' },
  { key: 'faq', href: '/intrebari-frecvente' },
  { key: 'contact', href: '/contact' },
] as const;
```

- [ ] **Step 3: Add navigation keys to translation files**

In `ro.json` under `"navigation"`:
```json
"blog": "Blog",
"caseStudies": "Studii de caz"
```

In `en.json` under `"navigation"`:
```json
"blog": "Blog",
"caseStudies": "Case Studies"
```

- [ ] **Step 4: Update sitemap**

In `src/app/sitemap.ts`, add blog and case study entries after the service sub-pages loop. Import `getAllSlugs` from `@/lib/content` and iterate to add dynamic entries.

Add `/blog` and `/studii-de-caz` to `STATIC_PAGES` array. Then add dynamic entries:

```typescript
import { getAllSlugs } from '@/lib/content';

// After static pages and service sub-pages...

// Blog articles
const blogSlugs = getAllSlugs('blog');
for (const { slug, locale } of blogSlugs) {
  entries.push({
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.6,
  });
}

// Case studies
const caseStudySlugs = getAllSlugs('studii-de-caz');
for (const { slug, locale } of caseStudySlugs) {
  entries.push({
    url: `${SITE_URL}/${locale}/studii-de-caz/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.7,
  });
}
```

- [ ] **Step 5: Update CLAUDE.md pages table**

Replace `/portofoliu` row with `/studii-de-caz` (Must-have). Change `/blog` from V2 to Must-have.

- [ ] **Step 6: Verify full build**

```bash
npm run build
```

Expected: build succeeds with all pages generated

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/home/CaseStudyPreview.tsx src/components/layout/MenuOverlay.tsx src/messages/ro.json src/messages/en.json src/app/sitemap.ts CLAUDE.md
git commit -m "feat: update navigation, sitemap, CTA links for blog and case studies"
```

---

### Task 21: Placeholder Images

**Files:**
- Create: `public/images/blog/` directory with placeholder images
- Create: `public/images/studii-de-caz/` directory with placeholder images
- Create: `public/images/portfolio/` directory with placeholder images

- [ ] **Step 1: Create placeholder image directories and generate branded gradient placeholders**

Use CSS-to-image or simple SVG-based placeholder images with the brand gradient (#650CBE → #262523). Dimensions: 1200x675 (16:9) for blog/portfolio, 1920x1080 for case study heroes.

Alternatively, create a reusable `PlaceholderImage` component that renders a gradient div when no image is available.

- [ ] **Step 2: Commit**

```bash
git add public/images/blog/ public/images/studii-de-caz/ public/images/portfolio/
git commit -m "chore: add placeholder images for blog, case studies, portfolio"
```

---

### Task 22: Final Verification

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: all pages build successfully

- [ ] **Step 2: Dev server smoke test**

```bash
npm run dev
```

Manually verify:
- `/ro/blog` — shows 3 articles with category filter
- `/ro/blog/optimizare-rata-conversie-ghid` — renders MDX article
- `/ro/studii-de-caz` — shows 3 case study cards
- `/ro/studii-de-caz/client-eshop-romania` — renders case study with metrics
- `/ro/servicii/google-ads` — shows portfolio slider, case study results, testimonials
- Navigation menu includes Blog and Studii de Caz links
- Homepage CaseStudyPreview links to `/studii-de-caz`

- [ ] **Step 3: Lint**

```bash
npm run lint
```

- [ ] **Step 4: Final commit** (if any lint fixes needed)

```bash
git add -A
git commit -m "fix: lint and build fixes for blog and case studies"
```
