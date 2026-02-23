import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalHero } from '@/components/sections/legal/LegalHero';
import { LegalContent } from '@/components/sections/legal/LegalContent';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/termeni-si-conditii`,
      languages: {
        ro: 'https://aceagency.ro/ro/termeni-si-conditii',
        en: 'https://aceagency.ro/en/termeni-si-conditii',
        'x-default': 'https://aceagency.ro/ro/termeni-si-conditii',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/termeni-si-conditii`,
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

export default async function TermsPage({
  params,
}: TermsPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <>
      <LegalHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.current') },
        ]}
        heading={t('hero.heading')}
      />

      <SectionWrapper theme="light" id="terms-content">
        <LegalContent namespace="terms" />
      </SectionWrapper>
    </>
  );
}
