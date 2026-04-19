import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Link } from '@/i18n/navigation';
import { GrowthFooter } from '@/components/sections/growth/GrowthFooter';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Download, ArrowRight } from 'lucide-react';

interface ThankYouPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ThankYouPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'growth' });

  return generatePageMetadata({
    title: t('thankYou.meta.title'),
    description: '',
    path: 'growth/multumesc',
    locale,
    noIndex: true,
  });
}

export default async function ThankYouPage({
  params,
}: ThankYouPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'growth' });

  return (
    <>
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#262523] px-4 py-20 text-center">
        <ScrollReveal className="mx-auto max-w-2xl">
          {/* Success icon */}
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-[#66F3A6]/10">
            <span className="text-4xl" role="img" aria-label="success">
              🎉
            </span>
          </div>

          <h1 className="mb-4 font-[family-name:var(--font-glacial)] text-4xl font-bold text-white md:text-5xl">
            {t('thankYou.heading')}
          </h1>

          <p className="mb-8 font-[family-name:var(--font-red-hat)] text-lg text-[#D9D9D9]">
            {t('thankYou.description')}
          </p>

          {/* Lead magnet title */}
          <p className="mb-6 text-base font-medium text-white">
            {t('thankYou.downloadTitle')}
          </p>

          {/* Direct PDF download — no form needed */}
          <a
            href="/growth/checklist.pdf"
            className="mb-10 inline-flex items-center gap-2 rounded-full bg-[#650CBE] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#7A1FD8]"
            download
          >
            <Download className="size-5" />
            {t('thankYou.downloadCta')}
          </a>

          {/* Divider */}
          <div className="my-10 h-px w-full max-w-xs mx-auto bg-white/10" />

          {/* Case study CTA */}
          <p className="mb-4 text-sm text-[#D9D9D9]/80">
            {t('thankYou.caseStudyCta')}
          </p>
          <Link
            href="/studii-de-caz/itmar-calculatoare-refurbished"
            className="inline-flex items-center gap-2 font-semibold text-[#66F3A6] transition-colors hover:text-[#66F3A6]/80"
          >
            {t('thankYou.caseStudyLink')}
            <ArrowRight className="size-4" />
          </Link>
        </ScrollReveal>
      </section>

      <GrowthFooter />
    </>
  );
}
