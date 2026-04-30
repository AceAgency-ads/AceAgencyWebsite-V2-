/**
 * Schema.org JSON-LD generators for ACE Agency.
 *
 * Each helper returns a plain object that should be serialized into a
 * <script type="application/ld+json"> tag. We don't render the tags here
 * — that happens in JsonLd component / generateMetadata.other.
 *
 * Source of truth for entity facts: i18n `legal._entity` and CLAUDE.md.
 * Hard-coded here intentionally so SEO doesn't depend on locale at build.
 */

const SITE_URL = 'https://aceads.co';

export const ORG = {
  name: 'ACE Agency',
  legalName: 'INNOSERV SRL',
  cui: '47715516',
  email: 'office@aceads.co',
  city: 'Bucharest',
  country: 'RO',
  founded: '2020',
  url: SITE_URL,
  logo: `${SITE_URL}/ace-agency-logo.webp`,
  sameAs: [
    'https://www.linkedin.com/company/aceagency',
    'https://www.instagram.com/aceagency',
    'https://www.facebook.com/aceagency',
  ],
} as const;

export interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': readonly Record<string, unknown>[];
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: ORG.logo,
    email: ORG.email,
    foundingDate: ORG.founded,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG.city,
      addressCountry: ORG.country,
    },
    identifier: { '@type': 'PropertyValue', name: 'CUI', value: ORG.cui },
    sameAs: ORG.sameAs,
  };
}

export function localBusinessSchema(): Record<string, unknown> {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: ORG.name,
    url: SITE_URL,
    image: ORG.logo,
    email: ORG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG.city,
      addressCountry: ORG.country,
    },
    priceRange: '€€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: { '@type': 'Country', name: 'Romania' },
  };
}

export function webSiteSchema(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: ORG.name,
    inLanguage: ['ro', 'en'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
}

export function serviceSchema(svc: ServiceSchemaInput): Record<string, unknown> {
  return {
    '@type': 'Service',
    name: svc.name,
    description: svc.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: svc.name,
    areaServed: { '@type': 'Country', name: 'Romania' },
    url: svc.url,
  };
}

interface FAQItem {
  q: string;
  a: string;
}

export function faqPageSchema(items: readonly FAQItem[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export interface CaseStudySchemaInput {
  slug: string;
  name: string;
  description: string;
  datePublished: string;
  about: string;
}

export function caseStudySchema(
  cs: CaseStudySchemaInput,
): Record<string, unknown> {
  return {
    '@type': 'Article',
    '@id': `${SITE_URL}/studii-de-caz/${cs.slug}#article`,
    headline: cs.name,
    description: cs.description,
    datePublished: cs.datePublished,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: cs.about,
    inLanguage: 'ro',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/studii-de-caz/${cs.slug}`,
    },
  };
}

export interface BreadcrumbItemInput {
  name: string;
  url?: string;
}

export function breadcrumbListSchema(
  items: readonly BreadcrumbItemInput[],
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

/**
 * Wrap one or more schemas in a single @graph payload. Prefer this over
 * emitting multiple <script> tags per page — Google docs recommend a single
 * graph for related entities.
 */
export function graph(
  ...nodes: readonly Record<string, unknown>[]
): JsonLdGraph {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
