'use client';

import { useTranslations } from 'next-intl';
import { CountUp } from '@/components/animations/CountUp';

/** Shape of a single proof-bar stat from i18n. */
interface ProofBarItem {
  readonly value: string;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: string;
}

const ITEM_KEYS = ['0', '1', '2', '3'] as const;

/**
 * ACE Growth Engine — Proof Bar.
 * Horizontal violet gradient band with 4 animated stats,
 * thin gradient border lines, and hover glow effects.
 * 2x2 grid on mobile, single row on desktop.
 */
export function GrowthProofBar(): React.JSX.Element {
  const t = useTranslations('growth');

  return (
    <section className="relative bg-gradient-to-r from-[#4500D0] via-[#650CBE] to-[#4500D0] px-6 py-10 md:py-12">
      {/* Top gradient border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#66F3A6]/40 to-transparent" />
      {/* Bottom gradient border line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#66F3A6]/40 to-transparent" />

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
        {ITEM_KEYS.map((key) => {
          const item = t.raw(`proofBar.items.${key}`) as ProofBarItem;
          const numericValue = Number(item.value);

          return (
            <div
              key={key}
              className="group relative text-center transition-all duration-300"
            >
              {/* Hover glow behind stat value */}
              <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[#650CBE]/0 blur-xl transition-all duration-500 group-hover:bg-[#650CBE]/30" />

              <p className="relative text-4xl font-bold text-white md:text-5xl">
                {item.prefix ?? ''}
                <CountUp
                  end={numericValue}
                  suffix={item.suffix ?? ''}
                  className="text-4xl font-bold text-white md:text-5xl"
                />
              </p>
              <p className="relative mt-2 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/90">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
