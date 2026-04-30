import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';
import { MetricStat } from '@/components/ui/MetricStat';

interface ServiceItem {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

/**
 * Services_ROI — 6 services in a 3×2 grid. Each card has title, body, and a
 * burgundy metric badge in the top-right showing the best result we've
 * achieved on that channel (e.g. "13.34× ROAS ITMAR"). Anchors trust by
 * tying each service to a real client outcome.
 */
export function ServicesROI(): React.JSX.Element {
  const t = useTranslations('home.services');
  const items = t.raw('items') as readonly ServiceItem[];

  return (
    <section
      id="servicii"
      className="bg-white px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <Overline className="mb-4">{t('overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t('h2')}
          </h2>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item) => (
            <li
              key={item.title}
              className="group relative rounded-2xl border border-[#E8E6E3] bg-[#FAF9F7] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#56151A]/40 hover:bg-white hover:shadow-[0_8px_30px_rgba(86,21,26,0.10)] sm:p-8"
            >
              <h3 className="font-subheading text-[22px] font-bold leading-tight text-[#262523]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[40ch] font-body text-[15px] leading-[1.6] text-[#71706E]">
                {item.description}
              </p>
              <div className="mt-7 border-t border-[#E8E6E3] pt-5">
                <MetricStat
                  size="sm"
                  value={item.metric}
                  label={item.metricLabel}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
