import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema, renderJsonLd } from '@/lib/seo/schemas';
import { LegalHero } from '@/components/sections/legal/LegalHero';
import { LegalContent } from '@/components/sections/legal/LegalContent';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'politica-confidentialitate',
    locale,
  });
}

export default async function PrivacyPolicyPage({
  params,
}: PrivacyPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />

      <LegalHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.current') },
        ]}
        heading={t('hero.heading')}
        locale={locale}
      />

      <SectionWrapper theme="light" id="privacy-content">
        <LegalContent namespace="privacy" />
      </SectionWrapper>
    </>
  );
}
