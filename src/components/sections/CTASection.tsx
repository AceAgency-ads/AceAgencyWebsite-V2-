import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';

interface CTASectionProps {
  /** i18n namespace path. Reads `${namespace}.cta.{heading,description,primary,secondary}`. */
  namespace: string;
  /** Where the secondary button links to. Primary always goes to /contact. */
  secondaryHref?: string;
}

/**
 * Generic closing CTA on a dark burgundy-glow background. Used by inner
 * pages (services, sub-services) that don't need the homepage's "3 clienti
 * pe luna" urgency mechanic. Primary CTA goes to /contact, secondary
 * defaults to /servicii.
 *
 * For the home/about/case-study pages, prefer the typed FinalCTA*
 * components — they unlock the urgency badge and accept richer copy.
 */
export function CTASection({
  namespace,
  secondaryHref = '/servicii',
}: CTASectionProps): React.JSX.Element {
  const t = useTranslations(namespace);

  return (
    <section className="relative overflow-hidden bg-[#262523] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <BurgundyGlow style={{ top: '15%', right: '-12%' }} size={620} />
      <BurgundyGlow
        variant="bright"
        style={{ bottom: '-15%', left: '-10%' }}
        size={460}
      />

      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <h2 className="font-heading text-[clamp(1.75rem,3.5vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
          {t('cta.heading')}
        </h2>
        <p className="mx-auto mt-5 max-w-[55ch] font-subheading text-[16px] leading-[1.55] text-[#D9D9D9] sm:text-[17px]">
          {t('cta.description')}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <CTAButton asChild>
            <Link href="/contact">{t('cta.primary')}</Link>
          </CTAButton>
          <CTAButton variant="ghost" asChild>
            <Link href={secondaryHref as '/'}>{t('cta.secondary')}</Link>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
