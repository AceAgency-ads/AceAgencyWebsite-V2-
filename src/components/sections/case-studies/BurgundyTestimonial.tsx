import { useTranslations } from 'next-intl';

interface BurgundyTestimonialProps {
  namespace: string;
}

/**
 * Single-quote testimonial section, burgundy fill. Used inside case study
 * pages to put the client's voice between the process steps and the final
 * CTA. Inline metric pills under the quote anchor the impact in numbers.
 */
export function BurgundyTestimonial({
  namespace,
}: BurgundyTestimonialProps): React.JSX.Element {
  const t = useTranslations(`${namespace}.testimonial`);
  const metrics = t.raw('metrics') as readonly string[];

  return (
    <section className="relative overflow-hidden bg-[#56151A] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            'repeating-linear-gradient(45deg, transparent 0px, transparent 60px, white 60px, white 61px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[860px] text-center">
        <div
          aria-hidden="true"
          className="mx-auto font-heading text-[80px] leading-[0.5] text-white/20"
        >
          &ldquo;
        </div>

        <blockquote className="mt-2 font-subheading text-[clamp(1.25rem,2vw+0.5rem,2rem)] font-bold leading-[1.4] text-white">
          {t('quote')}
        </blockquote>

        <figcaption className="mt-7 font-body text-[14px] text-white/85">
          <span className="font-semibold">{t('author')}</span>
          <span className="mx-2 text-white/50">·</span>
          <span className="text-white/70">{t('role')}</span>
        </figcaption>

        {metrics.length > 0 ? (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {metrics.map((m, i) => (
              <span
                key={i}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90"
              >
                {m}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
