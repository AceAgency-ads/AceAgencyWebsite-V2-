'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const CLIENT_LOGOS = [
  { src: '/images/clients/itmar.webp', alt: 'IT Mar', width: 120, height: 40 },
  { src: '/images/clients/amora.png', alt: 'Amora', width: 120, height: 40 },
  { src: '/images/clients/trady.png', alt: 'Trady', width: 120, height: 40 },
  { src: '/images/clients/dosense.svg', alt: 'DoSense', width: 120, height: 40 },
  { src: '/images/clients/tutti.svg', alt: 'Tutti', width: 120, height: 40 },
  { src: '/images/clients/leonor.png', alt: 'Leonor', width: 120, height: 40 },
] as const;

/**
 * ACE Growth Engine — Client logo strip.
 * Horizontal row of client logos for social proof.
 */
export function GrowthClientLogos(): React.JSX.Element {
  const t = useTranslations('growth');

  return (
    <section className="relative bg-[#262523] px-6 py-8 md:py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#650CBE]/30 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-[#D9D9D9]/50">
          {t('clientLogos.label')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="relative h-8 w-24 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10 md:w-28"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
