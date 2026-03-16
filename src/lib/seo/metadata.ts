import type { Metadata } from 'next';
import { SITE_URL, ORG_NAME, DEFAULT_OG_IMAGE } from './constants';

interface PageMetadataParams {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly locale: string;
  readonly noIndex?: boolean;
  readonly ogImage?: string;
}

/**
 * Factory function that generates a complete Metadata object for any page.
 * Includes: title, description, canonical, hreflang (ro, en, x-default),
 * Open Graph, and Twitter Card tags.
 *
 * @param params - Page-specific metadata parameters
 * @returns Complete Next.js Metadata object
 *
 * @example
 * ```ts
 * export async function generateMetadata({ params }: Props): Promise<Metadata> {
 *   const { locale } = await params;
 *   const t = await getTranslations({ locale, namespace: 'home' });
 *   return generatePageMetadata({
 *     title: t('meta.title'),
 *     description: t('meta.description'),
 *     path: '',
 *     locale,
 *   });
 * }
 * ```
 */
export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  noIndex = false,
  ogImage,
}: PageMetadataParams): Metadata {
  const pagePath = path ? `/${path}` : '';
  const canonicalUrl = `${SITE_URL}/${locale}${pagePath}`;
  const roUrl = `${SITE_URL}/ro${pagePath}`;
  const enUrl = `${SITE_URL}/en${pagePath}`;
  const ogLocale = locale === 'ro' ? 'ro_RO' : 'en_US';

  // Build page-specific OG image URL with title/subtitle params
  const ogImageUrl = ogImage
    ? `${SITE_URL}${ogImage}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ro: roUrl,
        en: enUrl,
        'x-default': roUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: ORG_NAME,
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };

  if (noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}
