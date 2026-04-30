/**
 * Case study registry.
 *
 * Content lives in i18n at `caseStudies.<slug>.*`. This file is the slug
 * source-of-truth and provides typed metadata used by:
 *   - generateStaticParams() in /studii-de-caz/[slug]/page.tsx
 *   - the /studii-de-caz index page table
 *   - any other surface that needs to enumerate published cases
 */

export const CASE_STUDY_SLUGS = ['amora', 'itmar', 'trady', 'dosense'] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export interface CaseStudyMeta {
  slug: CaseStudySlug;
  /** Order in the index table — Amora first because it's the strongest case. */
  order: number;
  /** Lucide icon name fallback for category badge. Currently unused but reserved. */
  industry: 'beauty' | 'it' | 'home' | 'wellness';
}

export const CASE_STUDIES: Readonly<Record<CaseStudySlug, CaseStudyMeta>> = {
  amora: { slug: 'amora', order: 1, industry: 'beauty' },
  itmar: { slug: 'itmar', order: 2, industry: 'it' },
  trady: { slug: 'trady', order: 3, industry: 'home' },
  dosense: { slug: 'dosense', order: 4, industry: 'wellness' },
} as const;

export function getOrderedSlugs(): readonly CaseStudySlug[] {
  return [...CASE_STUDY_SLUGS].sort(
    (a, b) => CASE_STUDIES[a].order - CASE_STUDIES[b].order,
  );
}

export function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return (CASE_STUDY_SLUGS as readonly string[]).includes(slug);
}
