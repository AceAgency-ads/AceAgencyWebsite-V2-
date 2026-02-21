import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SERVICE_DEFINITIONS, getServiceBySlug } from '@/lib/services';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ServiceHero } from '@/components/sections/services/ServiceHero';
import { ServiceFeatures } from '@/components/sections/services/ServiceFeatures';
import { ServiceProcess } from '@/components/sections/services/ServiceProcess';
import { ServiceStats } from '@/components/sections/services/ServiceStats';
import { ServiceFAQ } from '@/components/sections/services/ServiceFAQ';
import { ServiceCTA } from '@/components/sections/services/ServiceCTA';

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * Generate static params for all 6 service slugs.
 * Ensures pages are pre-rendered at build time (SSG).
 */
export function generateStaticParams(): { slug: string }[] {
  return SERVICE_DEFINITIONS.map((s) => ({ slug: s.slug }));
}

/**
 * Generate SEO metadata for each service sub-page.
 * Includes title, description, canonical, hreflang, OG, Twitter Card,
 * and Service JSON-LD schema.
 */
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: 'services' });
  const title = t(`${service.i18nKey}.meta.title`);
  const description = t(`${service.i18nKey}.meta.description`);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    provider: {
      '@type': 'Organization',
      name: 'AceAgency',
      url: 'https://aceagency.ro',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
  };

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/servicii/${slug}`,
      languages: {
        ro: `https://aceagency.ro/ro/servicii/${slug}`,
        en: `https://aceagency.ro/en/servicii/${slug}`,
        'x-default': `https://aceagency.ro/ro/servicii/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/servicii/${slug}`,
      siteName: 'AceAgency',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'script:ld+json': JSON.stringify(serviceSchema),
    },
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.services'), href: '/servicii' },
          { label: t(`${service.i18nKey}.hero.overline`) },
        ]}
      />
      <ServiceHero serviceKey={service.i18nKey} iconName={service.iconName} />
      <ServiceFeatures serviceKey={service.i18nKey} />
      <ServiceProcess serviceKey={service.i18nKey} />
      <ServiceStats serviceKey={service.i18nKey} />
      <ServiceFAQ serviceKey={service.i18nKey} />
      <ServiceCTA serviceKey={service.i18nKey} />
    </>
  );
}
