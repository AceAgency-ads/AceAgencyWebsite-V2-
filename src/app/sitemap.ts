import type { MetadataRoute } from 'next';

import { SERVICE_DEFINITIONS } from '@/lib/services';
import { SITE_URL } from '@/lib/seo/constants';

const LOCALES = ['ro', 'en'] as const;

const STATIC_PAGES = [
  '',
  '/despre-noi',
  '/servicii',
  '/contact',
  '/intrebari-frecvente',
  '/politica-confidentialitate',
  '/politica-cookies',
  '/termeni-si-conditii',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      const isHomepage = page === '';
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
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
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
