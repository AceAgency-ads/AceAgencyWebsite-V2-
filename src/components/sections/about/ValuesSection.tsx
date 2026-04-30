import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface ValueItem {
  n: string;
  title: string;
  desc: string;
}

/**
 * Values — 4 numbered cards. First card has a solid burgundy background to
 * anchor the eye on the most important value (per aceads brand spec).
 * Light section between hero and team.
 */
export function ValuesSection(): React.JSX.Element {
  const t = useTranslations('about.values');
  const items = t.raw('items') as readonly ValueItem[];

  return (
    <section
      id="values"
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
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item, i) => {
            const isFirst = i === 0;
            return (
              <li
                key={item.n}
                className={`group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 sm:p-9 ${
                  isFirst
                    ? 'bg-[#56151A] text-white shadow-[0_8px_30px_rgba(86,21,26,0.20)]'
                    : 'border border-[#E8E6E3] bg-white text-[#262523] hover:border-[#56151A]/40 hover:shadow-[0_4px_20px_rgba(86,21,26,0.08)]'
                }`}
              >
                <div
                  className={`font-heading text-[42px] font-bold leading-none ${
                    isFirst ? 'text-white/90' : 'text-[#56151A]/85'
                  }`}
                >
                  {item.n}
                </div>
                <h3
                  className={`mt-5 font-subheading text-[20px] font-bold leading-tight ${
                    isFirst ? 'text-white' : 'text-[#262523]'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 font-body text-[15px] leading-[1.6] ${
                    isFirst ? 'text-white/85' : 'text-[#71706E]'
                  }`}
                >
                  {item.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
