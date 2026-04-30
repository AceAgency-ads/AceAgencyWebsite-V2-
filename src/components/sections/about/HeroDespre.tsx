import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';
import { MetricStat } from '@/components/ui/MetricStat';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { Breadcrumb, type BreadcrumbItem } from '@/components/sections/Breadcrumb';

interface HeroDespreProps {
  breadcrumbItems?: readonly BreadcrumbItem[];
}

interface AboutStat {
  value: string;
  label: string;
}

/**
 * About hero — overline + h1 + two body paragraphs (founding story + impact),
 * with a 4-stat strip below. Dark warm-black background with burgundy halo
 * top-right. Inner-page hero, no scroll pinning.
 */
export function HeroDespre({
  breadcrumbItems,
}: HeroDespreProps): React.JSX.Element {
  const t = useTranslations('about.hero');
  const stats = t.raw('stats') as readonly AboutStat[];

  return (
    <section
      id="about-hero"
      className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-20 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-24"
    >
      <BurgundyGlow style={{ top: -200, right: -180 }} size={700} />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {breadcrumbItems ? <Breadcrumb items={breadcrumbItems} /> : null}

        <Overline dark className="mt-2 mb-6">
          {t('overline')}
        </Overline>

        <h1 className="max-w-[20ch] font-heading text-[clamp(2rem,4.5vw+1rem,4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
          {t('h1')}
        </h1>

        <div className="mt-8 grid max-w-[80ch] gap-5 font-subheading text-[17px] leading-[1.6] text-[#D9D9D9] sm:text-[18px]">
          <p>{t('body')}</p>
          <p className="text-[#a0a0a0]">{t('bodySecondary')}</p>
        </div>

        {/* Stat strip */}
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
