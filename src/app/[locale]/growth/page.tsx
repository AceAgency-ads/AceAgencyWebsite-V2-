import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema, faqSchema, renderJsonLd } from '@/lib/seo/schemas';
import { SITE_URL } from '@/lib/seo/constants';
import { GrowthHero } from '@/components/sections/growth/GrowthHero';
import { GrowthServices } from '@/components/sections/growth/GrowthServices';
import { GrowthCaseStudies } from '@/components/sections/growth/GrowthCaseStudies';
import { GrowthProcess } from '@/components/sections/growth/GrowthProcess';
import { GrowthGuarantee } from '@/components/sections/growth/GrowthGuarantee';
import { GrowthFAQ } from '@/components/sections/growth/GrowthFAQ';
import { GrowthAuditForm } from '@/components/sections/growth/GrowthAuditForm';
import { GrowthLeadMagnetCTA } from '@/components/sections/growth/GrowthLeadMagnetCTA';
import { GrowthClientLogos } from '@/components/sections/growth/GrowthClientLogos';
import { GrowthFooter } from '@/components/sections/growth/GrowthFooter';

interface GrowthPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: GrowthPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'growth' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'growth',
    locale,
    ogImage: '/images/growth/og-image.webp',
  });
}

export default async function GrowthPage({
  params,
}: GrowthPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'growth' });

  // Build FAQ items for JSON-LD schema
  const faqRaw = t.raw('faq.items') as Record<
    string,
    { question: string; answer: string }
  >;
  const faqItems = Object.values(faqRaw);

  // Service schema for the Growth Engine offering
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ACE Growth Engine',
    description: t('meta.description'),
    provider: {
      '@type': 'Organization',
      name: 'Laboratorul de Conversii',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: 'Digital Marketing',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(faqSchema(faqItems)),
        }}
      />

      <GrowthHero />
      <GrowthClientLogos />
      <GrowthServices />
      <GrowthCaseStudies />
      <GrowthProcess />
      <GrowthGuarantee />
      <GrowthFAQ />
      <GrowthAuditForm />
      <GrowthLeadMagnetCTA />
      <GrowthFooter />
    </>
  );
}
