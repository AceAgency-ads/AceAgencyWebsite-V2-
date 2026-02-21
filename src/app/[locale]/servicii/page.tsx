import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { ServicesGrid } from '@/components/sections/services/ServicesGrid';
import { ProcessSteps } from '@/components/sections/services/ProcessSteps';
import { WhyChooseSection } from '@/components/sections/services/WhyChooseSection';
import { CTASection } from '@/components/sections/home/CTASection';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  const title = t('index.meta.title');
  const description = t('index.meta.description');

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/servicii`,
      languages: {
        ro: 'https://aceagency.ro/ro/servicii',
        en: 'https://aceagency.ro/en/servicii',
        'x-default': 'https://aceagency.ro/ro/servicii',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/servicii`,
      siteName: 'AceAgency',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ServicesPage({
  params,
}: ServicesPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.services') },
        ]}
      />
      <ServicesHero />
      <ServicesGrid />
      <ProcessSteps />
      <WhyChooseSection />
      <CTASection namespace="services" secondaryHref="/contact" />
    </>
  );
}
