import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface SubBrand {
  name: string;
  title: string;
  desc: string;
}

const ACCENT_BARS: Record<string, string> = {
  AceAds: '#56151A',
  AceAI: '#C4394A',
  AceWeb: '#3F0E12',
  AceMedia: '#6E1A22',
};

/**
 * Sub-brands — 4 specialization cards (AceAds, AceAI, AceWeb, AceMedia).
 * Each card has a colored top accent bar drawn from the burgundy palette
 * + name + one-line description. Light section between team and final CTA.
 */
export function SubBrandsSection(): React.JSX.Element {
  const t = useTranslations('about.subBrands');
  const items = t.raw('items') as readonly SubBrand[];

  return (
    <section
      id="sub-brands"
      className="bg-[#FAF9F7] px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <Overline className="mb-4">{t('overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t('h2')}
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {items.map((sb) => (
            <li
              key={sb.name}
              className="group overflow-hidden rounded-2xl border border-[#E8E6E3] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(86,21,26,0.10)]"
            >
              <div
                aria-hidden="true"
                className="h-1.5 w-full"
                style={{ background: ACCENT_BARS[sb.name] ?? '#56151A' }}
              />
              <div className="p-7">
                <h3 className="font-heading text-[24px] font-bold leading-tight text-[#262523]">
                  {sb.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.6] text-[#71706E]">
                  {sb.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
