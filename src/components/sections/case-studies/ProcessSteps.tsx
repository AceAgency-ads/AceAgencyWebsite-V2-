import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface ProcessStep {
  n: string;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  namespace: string;
}

/**
 * 4-step process timeline. Numbers in burgundy at the left, each step has a
 * title and 1-2 sentence description. Vertical layout on mobile, single
 * column on desktop too — the prose density rewards reading, not scanning.
 */
export function ProcessSteps({
  namespace,
}: ProcessStepsProps): React.JSX.Element {
  const t = useTranslations(`${namespace}.process`);
  const steps = t.raw('steps') as readonly ProcessStep[];

  return (
    <section
      id="process"
      className="bg-[#FAF9F7] px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[920px]">
        <div className="max-w-3xl">
          <Overline className="mb-4">{t('overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t('h2')}
          </h2>
        </div>

        <ol className="mt-12 space-y-8">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className="grid gap-6 sm:grid-cols-[100px_1fr] sm:gap-10"
            >
              <div className="flex items-baseline gap-3 sm:flex-col sm:items-end sm:gap-1">
                <span className="font-heading text-[56px] font-bold leading-none text-[#56151A]/85 sm:text-[64px]">
                  {step.n}
                </span>
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-[2px] w-12 bg-[#56151A]/20 sm:block"
                  />
                ) : null}
              </div>
              <div>
                <h3 className="font-subheading text-[22px] font-bold leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[60ch] font-body text-[15px] leading-[1.7] text-[#71706E] sm:text-[16px]">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
