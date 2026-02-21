import {
  Target,
  Share2,
  Play,
  Search,
  Mail,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceDefinition {
  readonly slug: string;
  readonly i18nKey: string;
  readonly icon: LucideIcon;
}

/**
 * All 6 service definitions.
 * Used by generateStaticParams, services grid, and dynamic sub-page routing.
 */
export const SERVICE_DEFINITIONS: readonly ServiceDefinition[] = [
  { slug: 'google-ads', i18nKey: 'googleAds', icon: Target },
  { slug: 'facebook-ads', i18nKey: 'facebookAds', icon: Share2 },
  { slug: 'tiktok-ads', i18nKey: 'tiktokAds', icon: Play },
  { slug: 'seo', i18nKey: 'seo', icon: Search },
  { slug: 'email-marketing', i18nKey: 'emailMarketing', icon: Mail },
  { slug: 'consultanta-marketing', i18nKey: 'consultanta', icon: Lightbulb },
] as const;

/**
 * Look up a service definition by its URL slug.
 * Returns undefined for invalid slugs (caller should notFound()).
 */
export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICE_DEFINITIONS.find((s) => s.slug === slug);
}
