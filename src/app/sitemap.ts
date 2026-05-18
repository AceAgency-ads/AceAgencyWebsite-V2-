import type { MetadataRoute } from 'next';
import { SERVICE_DEFINITIONS } from '@/lib/services';

const BASE_URL = 'https://aceagency.ro';
const LOCALES = ['ro', 'en'] as const;
type Locale = (typeof LOCALES)[number];

function pageUrl(locale: Locale, path: string): string {
  return `${BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const staticPages: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }[] = [
    { path: '/', changeFrequency: 'monthly', priority: 1.0 },
    { path: '/despre-noi', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/servicii', changeFrequency: 'monthly', priority: 0.9 },
  ];

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      entries.push({
        url: pageUrl(locale, page.path),
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            ro: pageUrl('ro', page.path),
            en: pageUrl('en', page.path),
            'x-default': pageUrl('ro', page.path),
          },
        },
      });
    }
  }

  for (const service of SERVICE_DEFINITIONS) {
    const path = `/servicii/${service.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: pageUrl(locale, path),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            ro: pageUrl('ro', path),
            en: pageUrl('en', path),
            'x-default': pageUrl('ro', path),
          },
        },
      });
    }
  }

  return entries;
}
