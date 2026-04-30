import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface ContextCard {
  label?: string;
  value: string;
  note: string;
}

interface ContextSplitProps {
  namespace: string;
}

/**
 * Two-column problem/solution split. Left = problem (light surface, neutral),
 * right = solution (burgundy accent surface). Each side has overline, h2,
 * body, and a small stat card pinned to the bottom.
 *
 * Each body string supports `\n\n` paragraph breaks from the i18n source.
 */
export function ContextSplit({
  namespace,
}: ContextSplitProps): React.JSX.Element {
  const t = useTranslations(`${namespace}.context`);
  const problemCard = t.raw('problem.card') as ContextCard;
  const solutionCard = t.raw('solution.card') as ContextCard;

  const problemBody = t('problem.body');
  const solutionBody = t('solution.body');

  return (
    <section
      id="context"
      className="bg-[#FAF9F7] px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Problem column */}
          <div className="flex flex-col rounded-2xl border border-[#E8E6E3] bg-white p-7 sm:p-10">
            <Overline className="mb-4">{t('problem.overline')}</Overline>
            <h2 className="font-heading text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              {t('problem.h2')}
            </h2>
            <div className="mt-5 space-y-4 font-body text-[15px] leading-[1.7] text-[#71706E] sm:text-[16px]">
              {problemBody.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex-1" />
            <div className="rounded-xl border border-[#E8E6E3] bg-[#FAF9F7] p-5">
              <div className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#71706E]">
                {problemCard.label ?? t('problem.overline')}
              </div>
              <div className="mt-2 font-heading text-[40px] font-bold leading-none text-[#262523]/85">
                {problemCard.value}
              </div>
              <div className="mt-2 font-body text-[13px] text-[#71706E]">
                {problemCard.note}
              </div>
            </div>
          </div>

          {/* Solution column */}
          <div className="flex flex-col rounded-2xl bg-[#56151A] p-7 text-white sm:p-10">
            <Overline dark className="mb-4 text-white/70">
              {t('solution.overline')}
            </Overline>
            <h2 className="font-heading text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {t('solution.h2')}
            </h2>
            <div className="mt-5 space-y-4 font-body text-[15px] leading-[1.7] text-white/90 sm:text-[16px]">
              {solutionBody.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex-1" />
            <div className="rounded-xl border border-white/15 bg-[#3F0E12] p-5">
              <div className="font-heading text-[40px] font-bold leading-none text-white">
                {solutionCard.value}
              </div>
              <div className="mt-2 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {solutionCard.label}
              </div>
              <div className="mt-2 font-body text-[13px] text-white/65">
                {solutionCard.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
