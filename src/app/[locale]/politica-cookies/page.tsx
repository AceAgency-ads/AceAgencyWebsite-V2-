import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalHero } from '@/components/sections/legal/LegalHero';
import { LegalContent } from '@/components/sections/legal/LegalContent';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

interface CookiePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CookiePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookies' });

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/politica-cookies`,
      languages: {
        ro: 'https://aceagency.ro/ro/politica-cookies',
        en: 'https://aceagency.ro/en/politica-cookies',
        'x-default': 'https://aceagency.ro/ro/politica-cookies',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/politica-cookies`,
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

export default async function CookiePolicyPage({
  params,
}: CookiePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'cookies' });

  return (
    <>
      <LegalHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.current') },
        ]}
        heading={t('hero.heading')}
      />

      <SectionWrapper theme="light" id="cookies-content">
        <LegalContent namespace="cookies" />
      </SectionWrapper>
    </>
  );
}
