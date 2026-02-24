import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ServicesGrid } from '@/components/sections/services/ServicesGrid';
import { ProcessSteps } from '@/components/sections/services/ProcessSteps';
import { WhyChooseSection } from '@/components/sections/services/WhyChooseSection';
import { CTASection } from '@/components/sections/home/CTASection';
import { organizationSchema, renderJsonLd } from '@/lib/seo/schemas';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return generatePageMetadata({
    title: t('index.meta.title'),
    description: t('index.meta.description'),
    path: 'servicii',
    locale,
  });
}

export default async function ServicesPage({
  params,
}: ServicesPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />
      <ServicesHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.services') },
        ]}
      />
      <HeroTransition namespace="services" i18nPrefix="index.heroTransition" />
      <ServicesGrid />
      <ProcessSteps />
      <WhyChooseSection />
      <CTASection namespace="services" secondaryHref="/contact" />
    </>
  );
}
