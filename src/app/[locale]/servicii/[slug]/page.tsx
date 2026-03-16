import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';
import { SERVICE_DEFINITIONS, getServiceBySlug } from '@/lib/services';
import { ServiceHero } from '@/components/sections/services/ServiceHero';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ServiceFeatures } from '@/components/sections/services/ServiceFeatures';
import { ServiceProcess } from '@/components/sections/services/ServiceProcess';
import { ServiceStats } from '@/components/sections/services/ServiceStats';
import { ServiceFAQ } from '@/components/sections/services/ServiceFAQ';
import { ServiceCTA } from '@/components/sections/services/ServiceCTA';
import { serviceSchema, renderJsonLd } from '@/lib/seo/schemas';

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
 * Includes title, description, canonical, hreflang, OG, Twitter Card.
 * JSON-LD schema is rendered via JSX script tags in the page component.
 */
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: 'services' });

  return generatePageMetadata({
    title: t(`${service.i18nKey}.meta.title`),
    description: t(`${service.i18nKey}.meta.description`),
    path: `servicii/${slug}`,
    locale,
  });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            serviceSchema({
              name: t(`${service.i18nKey}.meta.title`),
              description: t(`${service.i18nKey}.meta.description`),
              url: `${SITE_URL}/${locale}/servicii/${slug}`,
            }),
          ),
        }}
      />
      <ServiceHero
        serviceKey={service.i18nKey}
        iconName={service.iconName}
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.services'), href: '/servicii' },
          { label: t(`${service.i18nKey}.hero.overline`) },
        ]}
      />
      <HeroTransition namespace="services" i18nPrefix={`${service.i18nKey}.heroTransition`} />
      <ServiceFeatures serviceKey={service.i18nKey} featureImage={service.featureImage} />
      <ServiceProcess serviceKey={service.i18nKey} processImage={service.processImage} />
      <ServiceStats serviceKey={service.i18nKey} />
      <ServiceFAQ serviceKey={service.i18nKey} />
      <ServiceCTA serviceKey={service.i18nKey} />
    </>
  );
}
