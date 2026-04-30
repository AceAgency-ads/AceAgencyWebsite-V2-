import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { Overline } from '@/components/ui/Overline';

/**
 * About-page closing CTA — burgundy-filled section. Same urgency mechanic as
 * homepage final CTA but no live availability badge (already framed by the
 * about page narrative).
 */
export function AboutFinalCTA(): React.JSX.Element {
  const t = useTranslations('about.finalCta');

  return (
    <section
      id="about-cta"
      className="relative overflow-hidden bg-[#56151A] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Diagonal pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            'repeating-linear-gradient(45deg, transparent 0px, transparent 60px, white 60px, white 61px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <Overline dark className="mb-4 text-white/70">
          {t('overline')}
        </Overline>

        <h2 className="font-heading text-[clamp(2rem,4vw+0.5rem,3.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
          {t('h2')}
        </h2>

        <p className="mx-auto mt-5 max-w-[55ch] font-subheading text-[17px] leading-[1.55] text-white/90 sm:text-[18px]">
          {t('body')}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <CTAButton variant="light" asChild>
            <Link href="/contact">{t('primaryCta')}</Link>
          </CTAButton>
          <a
            href={`mailto:${t('email')}`}
            className="font-body text-[15px] text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {t('secondaryCta')}
          </a>
        </div>
      </div>
    </section>
  );
}
