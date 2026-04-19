import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';
import type { CaseStudyMeta } from '@/types/content';

type CaseStudyCardItem = CaseStudyMeta & { readonly readingTime: number };

interface CaseStudyCardProps {
  readonly caseStudy: CaseStudyCardItem;
}

/**
 * Case study card for the index page.
 * Hero image (16:9), industry badge pill, primary metric with CountUp,
 * client name, description (line-clamp-2). Wrapped in Link to /studii-de-caz/{slug}.
 */
export function CaseStudyCard({ caseStudy }: CaseStudyCardProps): React.JSX.Element {
  const primaryMetric = caseStudy.metrics[0];

  return (
    <ScrollReveal>
      <Link
        href={`/studii-de-caz/${caseStudy.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650CBE]"
      >
        {/* Hero image — 16:9 */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={caseStudy.heroImage}
            alt={caseStudy.heroImageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
{/* Industry badge removed — screenshots serve as visual context */}
        </div>

        {/* Card body */}
        <div className="p-6">
          {/* Primary metric */}
          {primaryMetric && (
            <div className="mb-4">
              <div className="text-3xl font-bold text-[#650CBE] md:text-4xl">
                {primaryMetric.prefix}
                <CountUp
                  end={Number(primaryMetric.value)}
                  suffix={primaryMetric.suffix}
                  className="text-3xl font-bold text-[#650CBE] md:text-4xl"
                />
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--section-text-muted)]">
                {primaryMetric.label}
              </p>
            </div>
          )}

          {/* Client name */}
          <h3 className="mb-2 text-lg font-bold leading-snug text-[var(--section-text)] transition-colors group-hover:text-[#650CBE]">
            {caseStudy.client}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-[var(--section-text-muted)]">
            {caseStudy.description}
          </p>
        </div>
      </Link>
    </ScrollReveal>
  );
}
