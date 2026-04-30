import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { Overline } from '@/components/ui/Overline';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';

interface CaseStudyFinalCTAProps {
  namespace: string;
}

/**
 * Case-study closing CTA. Same urgency framing as homepage but pivots from
 * "see what we did" to "want this for your brand". Primary CTA goes to
 * contact, secondary goes back to the case-studies index.
 */
export function CaseStudyFinalCTA({
  namespace,
}: CaseStudyFinalCTAProps): React.JSX.Element {
  const t = useTranslations(`${namespace}.finalCta`);

  return (
    <section
      id="case-cta"
      className="relative overflow-hidden bg-[#262523] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <BurgundyGlow style={{ top: '15%', right: '-15%' }} size={680} />
      <BurgundyGlow
        variant="bright"
        style={{ bottom: '-10%', left: '-12%' }}
        size={520}
      />

      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <Overline dark className="mb-4">
          {t('overline')}
        </Overline>

        <h2 className="font-heading text-[clamp(1.75rem,3.5vw+0.5rem,3.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
          {t('h2')}
        </h2>

        <p className="mx-auto mt-6 max-w-[55ch] font-subheading text-[17px] leading-[1.55] text-[#D9D9D9] sm:text-[18px]">
          {t('body')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <CTAButton asChild>
            <Link href="/contact">{t('primaryCta')}</Link>
          </CTAButton>
          <CTAButton variant="ghost" asChild>
            <Link href="/studii-de-caz">{t('secondaryCta')}</Link>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
