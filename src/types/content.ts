// src/types/content.ts

/** Shared frontmatter fields for all MDX content. */
interface BaseContentMeta {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly locale: 'ro' | 'en';
  readonly translationSlug?: string;
  readonly draft?: boolean;
}

/** Blog article frontmatter. */
export interface BlogArticleMeta extends BaseContentMeta {
  readonly category: string;
  readonly tags: readonly string[];
  readonly author: string;
  readonly updatedAt: string;
  readonly featuredImage: string;
  readonly featuredImageAlt: string;
  readonly readingTime?: number;
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
