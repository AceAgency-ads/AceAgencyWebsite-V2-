import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { FAQPageContent } from '@/components/sections/faq/FAQPageContent';

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    alternates: {
      canonical: `https://aceagency.ro/${locale}/intrebari-frecvente`,
      languages: {
        ro: 'https://aceagency.ro/ro/intrebari-frecvente',
        en: 'https://aceagency.ro/en/intrebari-frecvente',
        'x-default': 'https://aceagency.ro/ro/intrebari-frecvente',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://aceagency.ro/${locale}/intrebari-frecvente`,
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

export default async function FAQPage({
  params,
}: FAQPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });

  return (
    <>
      {/* Hero section with breadcrumb */}
      <SectionWrapper theme="dark" id="faq-hero" className="py-16 md:py-24">
        <div className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.current') },
            ]}
          />

          <span
            className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
            style={{ letterSpacing: '0.12em' }}
          >
            {t('hero.overline')}
          </span>

          <h1 className="mb-6 text-[2.25rem] font-bold leading-[1.05] md:text-[3rem] lg:text-[4rem]">
            {t('hero.heading')}
          </h1>

          <p
            className="max-w-2xl text-lg text-[var(--section-text-muted)] md:text-xl"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            {t('hero.description')}
          </p>
        </div>
      </SectionWrapper>

      <FAQPageContent />
    </>
  );
}
