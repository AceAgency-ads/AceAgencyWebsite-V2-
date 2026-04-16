'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { LightboxTrigger } from '@/components/ui/ImageLightbox';

/** Shape of a single case study item from i18n. */
interface CaseStudyItem {
  readonly client: string;
  readonly metric: string;
  readonly period: string;
  readonly description: string;
  readonly slug: string;
}

const ITEM_KEYS = ['0', '1', '2'] as const;

/** Map slugs to image folder names. */
const SLUG_TO_FOLDER: Record<string, string> = {
  'itmar-calculatoare-refurbished': 'itmar',
  'amora-extensii-par': 'amora',
  'trady-mobilier-scule': 'trady',
};

/**
 * Before/after and screenshot images per case study.
 */
const CASE_STUDY_IMAGES: Record<string, { before: string; after: string; screenshots: string[] }> = {
  itmar: {
    before: '/images/studii-de-caz/itmar/before.webp',
    after: '/images/studii-de-caz/itmar/after.webp',
    screenshots: [
      '/images/studii-de-caz/itmar/screenshot-1.webp',
      '/images/studii-de-caz/itmar/screenshot-2.webp',
      '/images/studii-de-caz/itmar/screenshot-3.webp',
    ],
  },
  amora: {
    before: '/images/studii-de-caz/amora/before.webp',
    after: '/images/studii-de-caz/amora/after.webp',
    screenshots: [
      '/images/studii-de-caz/amora/screenshot-1.webp',
      '/images/studii-de-caz/amora/screenshot-2.webp',
    ],
  },
  trady: {
    before: '/images/studii-de-caz/trady/before.webp',
    after: '/images/studii-de-caz/trady/after.webp',
    screenshots: [
      '/images/studii-de-caz/trady/screenshot-b2b.webp',
    ],
  },
};

/**
 * ACE Growth Engine — Case Studies section.
 * Full-width blocks with large before/after images and bold metrics.
 * Alternating layout for visual variety.
 */
export function GrowthCaseStudies(): React.JSX.Element {
  const t = useTranslations('growth');

  const ctaText = t.has('caseStudies.cta')
    ? t('caseStudies.cta')
    : 'Aplica pentru audit gratuit \u2192';

  const handleScrollToCTA = (): void => {
    const el = document.getElementById('audit-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#262523] py-16 md:py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650CBE]/8 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center md:mb-20">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#66F3A6]/80">
              {t.has('caseStudies.overline') ? t('caseStudies.overline') : 'REZULTATE REALE'}
            </p>
            <h2 className="mb-4 font-[family-name:var(--font-glacial)] text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t('caseStudies.heading')}
            </h2>
            <p className="mx-auto max-w-2xl font-[family-name:var(--font-red-hat)] text-lg text-[#D9D9D9]">
              {t('caseStudies.subheading')}
            </p>
          </div>
        </ScrollReveal>

        {/* Case studies — full width blocks */}
        <div className="space-y-20 md:space-y-28">
          {ITEM_KEYS.map((key, index) => {
            const item = t.raw(`caseStudies.items.${key}`) as CaseStudyItem;
            const folder = SLUG_TO_FOLDER[item.slug] ?? item.slug;
            const images = CASE_STUDY_IMAGES[folder]!;
            const isReversed = index % 2 === 1;

            // Build gallery array for lightbox navigation
            const allImages = [
              { src: images.before, alt: `${item.client} — rezultate inainte de ACE Agency` },
              { src: images.after, alt: `${item.client} — rezultate cu ACE Agency` },
              ...images.screenshots.map((src, i) => ({
                src,
                alt: `${item.client} — rezultate detaliate ${i + 1}`,
              })),
            ];

            return (
              <ScrollReveal key={key}>
                <div className="space-y-8">
                  {/* Top row: Metric + Client info */}
                  <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${isReversed ? 'md:flex-row-reverse md:text-right' : ''}`}>
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#650CBE]">
                        {item.period}
                      </p>
                      <h3 className="mb-2 font-[family-name:var(--font-glacial)] text-2xl font-bold text-white md:text-3xl">
                        {item.client}
                      </h3>
                      <p className="max-w-lg text-base text-[#D9D9D9]/80">
                        {item.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div className="inline-block rounded-2xl border border-[#650CBE]/40 bg-[#650CBE]/10 px-6 py-4 shadow-[0_0_40px_rgba(101,12,190,0.15)]">
                        <p className="font-[family-name:var(--font-glacial)] text-4xl font-bold text-[#66F3A6] md:text-5xl lg:text-6xl">
                          {item.metric}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Before / After — LARGE, side by side, clickable */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <LightboxTrigger src={images.before} alt={`${item.client} — rezultate inainte de ACE Agency`} allImages={allImages}>
                      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a1918]">
                        <div className="absolute left-4 top-4 z-10 rounded-lg bg-red-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                          Inainte de ACE
                        </div>
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={images.before}
                            alt={`${item.client} — rezultate inainte de ACE Agency`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </LightboxTrigger>

                    <LightboxTrigger src={images.after} alt={`${item.client} — rezultate cu ACE Agency`} allImages={allImages}>
                      <div className="group relative overflow-hidden rounded-2xl border border-[#66F3A6]/20 bg-[#1a1918]">
                        <div className="absolute right-4 top-4 z-10 rounded-lg bg-[#66F3A6]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#262523] shadow-lg">
                          Cu ACE Agency
                        </div>
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={images.after}
                            alt={`${item.client} — rezultate cu ACE Agency`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </LightboxTrigger>
                  </div>

                  {/* Screenshots gallery — full width row */}
                  {images.screenshots.length > 0 && (
                    <div className={`grid gap-4 ${images.screenshots.length === 1 ? 'grid-cols-1 max-w-2xl' : images.screenshots.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                      {images.screenshots.map((src, i) => (
                        <LightboxTrigger key={i} src={src} alt={`${item.client} — rezultate detaliate ${i + 1}`} allImages={allImages}>
                          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#1a1918]">
                            <div className="relative aspect-[16/10]">
                              <Image
                                src={src}
                                alt={`${item.client} — rezultate detaliate ${i + 1}`}
                                fill
                                sizes={images.screenshots.length === 1 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                          </div>
                        </LightboxTrigger>
                      ))}
                    </div>
                  )}

                  {/* Link to full case study */}
                  <div className={isReversed ? 'md:text-right' : ''}>
                    <Link
                      href={`/studii-de-caz/${item.slug}`}
                      className="group/link inline-flex items-center gap-2 text-base font-semibold text-[#66F3A6] transition-colors hover:text-[#7fffb5]"
                    >
                      Vezi studiul de caz complet
                      <ArrowRight className="size-5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  {/* Divider between case studies */}
                  {index < ITEM_KEYS.length - 1 && (
                    <div className="mx-auto h-px w-1/3 bg-gradient-to-r from-transparent via-[#650CBE]/30 to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-20 text-center">
          <button
            type="button"
            onClick={handleScrollToCTA}
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#650CBE] px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#7A1FD8] hover:shadow-[0_0_40px_rgba(101,12,190,0.4)]"
          >
            {ctaText}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <span
                className="absolute inset-0 -translate-x-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  animation: 'shine 3s ease-in-out infinite',
                }}
              />
            </span>
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
