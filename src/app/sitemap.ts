import type { MetadataRoute } from 'next';

import { SERVICE_DEFINITIONS } from '@/lib/services';
import { SITE_URL } from '@/lib/seo/constants';
import { getAllSlugs } from '@/lib/content';

const LOCALES = ['ro', 'en'] as const;

const STATIC_PAGES = [
  '',
  '/despre-noi',
  '/servicii',
  '/blog',
  '/studii-de-caz',
  '/contact',
  '/intrebari-frecvente',
  '/politica-confidentialitate',
  '/politica-cookies',
  '/termeni-si-conditii',
] as const;

/**
 * Static last-modified date for stable pages.
 * Updated manually when content actually changes, avoiding false
 * freshness signals from `new Date()` on every build.
 */
const LAST_MODIFIED = new Date('2026-03-03');

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      const isHomepage = page === '';
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: isHomepage ? 'weekly' : 'monthly',
        priority: isHomepage ? 1.0 : 0.8,
      });
    }
  }

  // Service sub-pages
  for (const service of SERVICE_DEFINITIONS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}/servicii/${service.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Blog article pages
  const blogSlugs = getAllSlugs('blog');
  for (const { slug, locale } of blogSlugs) {
    entries.push({
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    });
  }

  // Case study pages
  const caseStudySlugs = getAllSlugs('studii-de-caz');
  for (const { slug, locale } of caseStudySlugs) {
    entries.push({
      url: `${SITE_URL}/${locale}/studii-de-caz/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    });
  }

  return entries;
}
