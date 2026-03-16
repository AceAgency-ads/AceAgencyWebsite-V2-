import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema, renderJsonLd } from '@/lib/seo/schemas';
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

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'intrebari-frecvente',
    locale,
  });
}

export default async function FAQPage({
  params,
}: FAQPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />

      {/* Hero section with breadcrumb */}
      <SectionWrapper theme="dark" id="faq-hero" className="py-16 md:py-24">
        <div className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.current') },
            ]}
            locale={locale}
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
