import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalPage } from '@/components/sections/legal/LegalPage';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  return {
    title: `${t('title')} | ACE Agency`,
    description: t('intro'),
  };
}

export default async function TermsPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  return (
    <LegalPage
      namespace="legal.terms"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: t('title') },
      ]}
    />
  );
}
