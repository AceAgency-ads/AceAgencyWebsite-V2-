import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { Overline } from '@/components/ui/Overline';
import { MetricStat } from '@/components/ui/MetricStat';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { Breadcrumb, type BreadcrumbItem } from '@/components/sections/Breadcrumb';

interface CaseStudyHeroProps {
  /** i18n namespace path, e.g. `caseStudies.amora` */
  namespace: string;
  breadcrumbItems?: readonly BreadcrumbItem[];
}

interface HeroStat {
  value: string;
  label: string;
}

/**
 * Case-study hero — dark background, breadcrumb, overline (industry/channel),
 * h1 with `<muted>before</muted>` and `<accent>after</accent>` markers
 * highlighting the headline result, body, primary CTA, then a 4-stat strip.
 */
export function CaseStudyHero({
  namespace,
  breadcrumbItems,
}: CaseStudyHeroProps): React.JSX.Element {
  const t = useTranslations(`${namespace}.hero`);
  const stats = t.raw('stats') as readonly HeroStat[];

  return (
    <section
      className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-20 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-24"
    >
      <BurgundyGlow style={{ top: -240, right: -180 }} size={780} />
      <BurgundyGlow
        variant="bright"
        style={{ bottom: -200, left: -120 }}
        size={500}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {breadcrumbItems ? <Breadcrumb items={breadcrumbItems} /> : null}

        <Overline dark className="mt-2 mb-6">
          {t('overline')}
        </Overline>

        <h1 className="max-w-[18ch] font-heading text-[clamp(2.25rem,4.5vw+1rem,4.5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-white">
          {t.rich('h1', {
            accent: (chunks: ReactNode) => (
              <span className="text-[#C4394A]">{chunks}</span>
            ),
            muted: (chunks: ReactNode) => (
              <span className="text-[#a0a0a0] line-through decoration-[#a0a0a0]/40 decoration-2">
                {chunks}
              </span>
            ),
          })}
        </h1>

        <p className="mt-7 max-w-[60ch] font-subheading text-[17px] leading-[1.55] text-[#D9D9D9] sm:text-[18px]">
          {t('body')}
        </p>

        <div className="mt-9">
          <CTAButton asChild>
            <Link href="/contact">{t('primaryCta')}</Link>
          </CTAButton>
        </div>

        {/* 4-stat strip */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-[rgba(74,70,67,0.5)] pt-10 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
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
  );
}
