import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface PainItem {
  n: string;
  title: string;
  desc: string;
}

/**
 * Problem_Pain — 4 numbered pain points on a light background. Frames "why
 * most agencies fail" before the solution sections (services / results) hit.
 *
 * Each card: large burgundy number, title, body. First card gets a slight
 * burgundy left-border accent so the eye anchors there.
 */
export function ProblemSection(): React.JSX.Element {
  const t = useTranslations('home.problem');
  const items = t.raw('items') as readonly PainItem[];

  return (
    <section
      id="problem"
      className="bg-[#FAF9F7] px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <Overline className="mb-4">{t('overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t.rich('h2', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#56151A]">{chunks}</span>
              ),
            })}
          </h2>
          <p className="mt-5 max-w-[55ch] font-body text-[16px] leading-[1.65] text-[#71706E] sm:text-[17px]">
            {t('body')}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item, i) => (
            <li
              key={item.n}
              className={`group rounded-2xl border border-[#E8E6E3] bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#56151A]/40 hover:shadow-[0_4px_20px_rgba(86,21,26,0.08)] sm:p-8 ${
                i === 0 ? 'border-l-2 border-l-[#56151A]' : ''
              }`}
            >
              <div className="font-heading text-[42px] font-bold leading-none text-[#56151A]/85">
                {item.n}
              </div>
              <h3 className="mt-5 font-subheading text-[20px] font-bold leading-tight text-[#262523]">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-[15px] leading-[1.6] text-[#71706E]">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
