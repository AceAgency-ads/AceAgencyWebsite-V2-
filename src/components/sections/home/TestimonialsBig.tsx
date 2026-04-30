import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

/**
 * Testimonials_Big — 6 quotes in a 3-column masonry-ish grid (CSS columns
 * for variable card height). Dark warm-black background, burgundy metric
 * badges anchor each quote with the actual outcome it claims.
 *
 * Quotes are pulled from i18n `home.testimonials.items[]` and are real
 * client testimonials from Amora, Trady, doSense, ITMAR, Tutti, Leonor.
 */
export function TestimonialsBig(): React.JSX.Element {
  const t = useTranslations('home.testimonials');
  const items = t.raw('items') as readonly TestimonialItem[];

  return (
    <section
      id="testimoniale"
      className="bg-[#262523] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <Overline dark className="mb-4">
            {t('overline')}
          </Overline>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex flex-col rounded-2xl border border-[rgba(74,70,67,0.5)] bg-[#1a1918] p-7 transition-all duration-300 hover:border-[#56151A]/60 sm:p-8"
            >
              {/* Burgundy quote mark */}
              <div
                aria-hidden="true"
                className="font-heading text-[56px] leading-none text-[#C4394A]/60"
              >
                &ldquo;
              </div>
              <p className="mt-2 font-subheading text-[17px] leading-[1.55] text-[#D9D9D9]">
                {item.quote}
              </p>
              <div className="mt-6 flex-1" />
              <div className="border-t border-[rgba(74,70,67,0.5)] pt-5">
                <div className="font-subheading text-[15px] font-bold text-white">
                  {item.author}
                </div>
                <div className="mt-0.5 font-body text-[13px] text-[#a0a0a0]">
                  {item.role}
                  {item.company ? ` · ${item.company}` : ''}
                </div>
                <div className="mt-3 inline-block rounded-full bg-[#56151A]/30 px-3 py-1 font-body text-[12px] font-medium text-[#fda5b0]">
                  {item.metric}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
