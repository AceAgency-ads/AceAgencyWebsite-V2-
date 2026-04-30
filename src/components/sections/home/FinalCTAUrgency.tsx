import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';

/**
 * FinalCTA_Urgency — closing CTA on dark background. Pulsing green status
 * dot signals "we're actively accepting" (vs. "always available" which kills
 * urgency). Cap is real: 3 clients per month per i18n badge.
 *
 * Layout: badge top, h2 center, body, then primary CTA + email link.
 */
export function FinalCTAUrgency(): React.JSX.Element {
  const t = useTranslations('home.finalCta');

  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-[#262523] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <BurgundyGlow style={{ top: '20%', left: '-10%' }} size={700} />
      <BurgundyGlow
        variant="bright"
        style={{ bottom: '-10%', right: '-15%' }}
        size={500}
      />

      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        {/* Live availability badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#66F3A6]/35 bg-[#66F3A6]/10 px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#66F3A6]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#66F3A6] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#66F3A6]" />
          </span>
          {t('badge')}
        </div>

        <h2 className="mt-7 font-heading text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
          {t('h2')}
        </h2>

        <p className="mx-auto mt-6 max-w-[55ch] font-subheading text-[18px] leading-[1.55] text-[#D9D9D9]">
          {t('body')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <CTAButton asChild>
            <Link href="/contact">{t('primaryCta')}</Link>
          </CTAButton>
          <a
            href={`mailto:${t('email')}`}
            className="font-body text-[15px] text-[#a0a0a0] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {t('secondaryCta')}
          </a>
        </div>
      </div>
    </section>
  );
}
