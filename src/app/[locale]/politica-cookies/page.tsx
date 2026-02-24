import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
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

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'politica-cookies',
    locale,
  });
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
