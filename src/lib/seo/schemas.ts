/**
 * Centralized JSON-LD schema builder functions for structured data.
 * All functions return plain objects suitable for JSON.stringify.
 * Used across all pages via <script type="application/ld+json"> tags.
 */

import { SITE_URL } from '@/lib/seo/constants';

// ─── Organization ────────────────────────────────────────────────────────────

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Laboratorul de Conversii',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    email: 'cretualin@aceagency.ro',
    telephone: '+40750465757',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bulevardul Aviatorilor 106',
      addressLocality: 'Bucuresti',
      addressCountry: 'RO',
    },
    sameAs: [
      'https://linkedin.com/company/aceagency',
      'https://instagram.com/aceagency.ro',
      'https://facebook.com/aceagency.ro',
    ],
  } as const;
}

// ─── LocalBusiness ───────────────────────────────────────────────────────────

export function localBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Laboratorul de Conversii',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    email: 'cretualin@aceagency.ro',
    telephone: '+40750465757',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bulevardul Aviatorilor 106',
      addressLocality: 'Bucuresti',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.4664,
      longitude: 26.0841,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    sameAs: [
      'https://linkedin.com/company/aceagency',
      'https://instagram.com/aceagency.ro',
      'https://facebook.com/aceagency.ro',
    ],
  } as const;
}

// ─── Service ─────────────────────────────────────────────────────────────────

interface ServiceSchemaParams {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}

export function serviceSchema({ name, description, url }: ServiceSchemaParams): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Laboratorul de Conversii',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: name,
  } as const;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

export function faqSchema(items: readonly FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/<[^>]*>/g, ''),
      },
    })),
  } as const;
}

// ─── WebSite ────────────────────────────────────────────────────────────────

export function webSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Laboratorul de Conversii',
    url: SITE_URL,
    description:
      'Laboratorul de Conversii — growth lab din Bucuresti specializat in sisteme de conversie. Google Ads, Facebook Ads, TikTok Ads, SEO, Email Marketing si Consultanta.',
    inLanguage: ['ro', 'en'],
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
  } as const;
}

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
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
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

// ─── Render Helper ───────────────────────────────────────────────────────────

/**
 * Safely serialize a JSON-LD schema for injection into <script> tags.
 * Escapes `<` to prevent XSS via closing </script> injection.
 */
export function renderJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
