import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { Overline } from '@/components/ui/Overline';
import { MetricStat } from '@/components/ui/MetricStat';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ResultsTable } from '@/components/sections/home/ResultsTable';
import { getOrderedSlugs } from '@/lib/case-studies';
import type { ReactNode } from 'react';

interface CaseStudiesIndexPageProps {
  params: Promise<{ locale: string }>;
}

interface HeroStat {
  value: string;
  label: string;
}

export async function generateMetadata({
  params,
}: CaseStudiesIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudiesIndex' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

interface CaseStudyCard {
  slug: string;
  industry: string;
  channel: string;
  h1: string;
  metric: string;
  metricLabel: string;
}

export default async function CaseStudiesIndexPage({
  params,
}: CaseStudiesIndexPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'caseStudiesIndex' });
  const tHome = await getTranslations({ locale, namespace: 'home.hero' });
  const slugs = getOrderedSlugs();
  const cards: CaseStudyCard[] = await Promise.all(
    slugs.map(async (slug) => {
      const tc = await getTranslations({
        locale,
        namespace: `caseStudies.${slug}`,
      });
      const stats = tc.raw('hero.stats') as readonly HeroStat[];
      return {
        slug,
        industry: tc('hero.overline'),
        channel: tc('breadcrumbLabel'),
        h1: tc('hero.h1').replace(/<\/?(accent|muted)>/g, ''),
        metric: stats[0]?.value ?? '',
        metricLabel: stats[0]?.label ?? '',
      };
    }),
  );

  // Hero metric tiles — pulled from home.hero.stats so the index page lands
  // on the same headline numbers users would have seen on the homepage.
  const summaryStats = tHome.raw('stats') as readonly HeroStat[];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-20 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-24">
        <BurgundyGlow style={{ top: -240, right: -180 }} size={780} />
        <BurgundyGlow
          variant="bright"
          style={{ bottom: -200, left: -120 }}
          size={500}
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Studii de caz' }]}
          />

          <Overline dark className="mt-2 mb-6">
            {t('hero.overline')}
          </Overline>

          <h1 className="max-w-[20ch] font-heading text-[clamp(2rem,4.5vw+1rem,4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            {t.rich('hero.h1', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#C4394A]">{chunks}</span>
              ),
            })}
          </h1>

          <p className="mt-7 max-w-[60ch] font-subheading text-[17px] leading-[1.55] text-[#D9D9D9] sm:text-[18px]">
            {t('hero.body')}
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[rgba(74,70,67,0.5)] pt-10 sm:gap-8 lg:grid-cols-4 lg:gap-12">
            {summaryStats.map((stat, i) => (
              <MetricStat
                key={i}
                dark
                size="lg"
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4-card grid */}
      <section className="bg-[#FAF9F7] px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {cards.map((card) => (
              <li key={card.slug} className="group">
                <Link
                  href={`/studii-de-caz/${card.slug}` as '/'}
                  locale={locale}
                  className="block h-full rounded-2xl border border-[#E8E6E3] bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#56151A]/40 hover:shadow-[0_8px_30px_rgba(86,21,26,0.10)] sm:p-9"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#71706E]">
                      {card.industry}
                    </span>
                    <span className="rounded-full bg-[#56151A]/10 px-2.5 py-1 font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-[#56151A]">
                      {card.channel}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-[#262523] sm:text-[30px]">
                    {card.h1}
                  </h3>
                  <div className="mt-7 flex items-end justify-between border-t border-[#E8E6E3] pt-5">
                    <MetricStat
                      size="md"
                      value={card.metric}
                      label={card.metricLabel}
                    />
                    <span className="font-body text-[13px] font-semibold text-[#56151A] underline-offset-4 group-hover:underline">
                      {t('view')}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Aggregate table — reuse home Results table */}
      <ResultsTable />

      {/* Availability CTA */}
      <section className="relative overflow-hidden bg-[#262523] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <BurgundyGlow style={{ top: '20%', left: '-10%' }} size={700} />

        <div className="relative z-10 mx-auto max-w-[820px] text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#66F3A6]/35 bg-[#66F3A6]/10 px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#66F3A6]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#66F3A6] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#66F3A6]" />
            </span>
            {t('available.badge')}
          </div>
          <h2 className="mt-7 font-heading text-[clamp(1.75rem,3.5vw+0.5rem,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
            {t('available.h2')}
          </h2>
          <p className="mx-auto mt-6 max-w-[55ch] font-subheading text-[17px] leading-[1.55] text-[#D9D9D9]">
            {t('available.body')}
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButton asChild>
              <Link href="/contact">{t('available.primaryCta')}</Link>
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
