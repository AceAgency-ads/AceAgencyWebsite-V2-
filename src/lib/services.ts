/**
 * Service registry for all 6 AceAgency services.
 * Serializable data only -- no React components (icon mapping is in service-icons.ts).
 * Used by generateStaticParams, generateMetadata, and service page routing.
 */

export interface ServiceDefinition {
  readonly slug: string;
  readonly i18nKey: string;
  readonly iconName: string;
}

/**
 * All 6 service definitions.
 * Used by generateStaticParams, services grid, and dynamic sub-page routing.
 */
export const SERVICE_DEFINITIONS: readonly ServiceDefinition[] = [
  { slug: 'google-ads', i18nKey: 'googleAds', iconName: 'Target' },
  { slug: 'facebook-ads', i18nKey: 'facebookAds', iconName: 'Share2' },
  { slug: 'tiktok-ads', i18nKey: 'tiktokAds', iconName: 'Play' },
  { slug: 'seo', i18nKey: 'seo', iconName: 'Search' },
  { slug: 'email-marketing', i18nKey: 'emailMarketing', iconName: 'Mail' },
  { slug: 'consultanta-marketing', i18nKey: 'consultanta', iconName: 'Lightbulb' },
] as const;

/**
 * Look up a service definition by its URL slug.
 * Returns undefined for invalid slugs (caller should notFound()).
 */
export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICE_DEFINITIONS.find((s) => s.slug === slug);
}
