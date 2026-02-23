import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

interface ThankYouPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ThankYouPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });

  return {
    title: t('heading') + ' | AceAgency',
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({
  params,
}: ThankYouPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'thankYou' });

  return (
    <SectionWrapper theme="dark" hero rounded={false}>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <CheckCircle
          className="mb-6 size-16 text-[var(--ds-color-accent)]"
          strokeWidth={1.5}
        />
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          {t('heading')}
        </h1>
        <p className="mb-8 max-w-lg text-lg text-[var(--section-text-muted)]">
          {t('description')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          {t('backHome')}
        </Link>
      </div>
    </SectionWrapper>
  );
}
