/**
 * Service registry for all 6 Laboratorul de Conversii services.
 * Serializable data only -- no React components (icon mapping is in service-icons.ts).
 * Used by generateStaticParams, generateMetadata, and service page routing.
 */

export interface ServiceDefinition {
  readonly slug: string;
  readonly i18nKey: string;
  readonly iconName: string;
  readonly featureImage: string;
  readonly processImage: string;
}

/**
 * All 6 service definitions.
 * Used by generateStaticParams, services grid, and dynamic sub-page routing.
 */
export const SERVICE_DEFINITIONS: readonly ServiceDefinition[] = [
  { slug: 'google-ads', i18nKey: 'googleAds', iconName: 'FaGoogle', featureImage: '/images/services/google-ads-features.webp', processImage: '/images/services/google-ads-process.webp' },
  { slug: 'facebook-ads', i18nKey: 'facebookAds', iconName: 'FaFacebookF', featureImage: '/images/services/facebook-ads-features.webp', processImage: '/images/services/facebook-ads-process.webp' },
  { slug: 'tiktok-ads', i18nKey: 'tiktokAds', iconName: 'FaTiktok', featureImage: '/images/services/tiktok-ads-features.webp', processImage: '/images/services/tiktok-ads-process.webp' },
  { slug: 'seo', i18nKey: 'seo', iconName: 'Search', featureImage: '/images/services/seo-features.webp', processImage: '/images/services/seo-process.webp' },
  { slug: 'email-marketing', i18nKey: 'emailMarketing', iconName: 'Mail', featureImage: '/images/services/email-features.webp', processImage: '/images/services/email-process.webp' },
  { slug: 'consultanta-marketing', i18nKey: 'consultanta', iconName: 'Lightbulb', featureImage: '/images/services/consultanta-features.webp', processImage: '/images/services/consultanta-process.webp' },
] as const;

/**
 * Look up a service definition by its URL slug.
 * Returns undefined for invalid slugs (caller should notFound()).
 */
export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICE_DEFINITIONS.find((s) => s.slug === slug);
}
