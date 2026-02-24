import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
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

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'termeni-si-conditii',
    locale,
  });
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
