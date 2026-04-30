'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CTAButton } from '@/components/ui/CTAButton';

interface VSLCardProps {
  className?: string;
  /** Optional aspect ratio override. Defaults to 16/9. */
  aspectRatio?: string;
}

/**
 * Video sales letter card. 16:9 frame with pulsing burgundy play button,
 * client-name badge, duration badge, and headline overlay. Click opens a
 * "video coming soon" modal — placeholder until real VSL is recorded.
 *
 * All copy comes from i18n namespace `home.vsl.*` so translations stay in one
 * place. Modal closes on backdrop click or close button.
 */
export function VSLCard({
  className,
  aspectRatio = '16 / 9',
}: VSLCardProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const t = useTranslations('home.vsl');

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('playLabel')}
        className={`hero-vsl group relative block w-full overflow-hidden rounded-2xl border border-[rgba(74,70,67,0.5)] bg-[#1a1918] text-left ${className ?? ''}`}
        style={{ aspectRatio }}
      >
        {/* Diagonal burgundy gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(38,37,35,0.55) 0%, rgba(64,14,18,0.75) 100%)',
          }}
        />

        {/* Top metadata row: duration · client name */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6">
          <span className="rounded-full bg-black/40 px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
            ▶ {t('duration')}
          </span>
          <span className="font-body text-[10px] text-white/55">
            {t('badge')}
          </span>
        </div>

        {/* Pulsing burgundy play button — center */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="vsl-play flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#C4394A] transition-transform duration-200 group-hover:scale-105">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        {/* Headline + supporting line — bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <div className="font-subheading text-[18px] font-bold leading-tight text-white">
            {t('headline')}
          </div>
          <div className="mt-1.5 font-body text-[12px] text-white/65">
            {t('subline')}
          </div>
        </div>

        {/* Subtle scanline texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 81px)',
          }}
        />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="vsl-modal-title"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[min(520px,90vw)] rounded-3xl border border-[rgba(74,70,67,0.5)] bg-[#1a1918] p-12 text-center"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('closeLabel')}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(74,70,67,0.5)] text-lg leading-none text-white"
            >
              ×
            </button>
            <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#56151A]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <h3
              id="vsl-modal-title"
              className="mt-6 font-heading text-[26px] font-bold leading-tight text-white"
            >
              {t('modalTitle')}
            </h3>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-[#a0a0a0]">
              {t('modalBody')}
            </p>
            <div className="mt-7">
              <CTAButton variant="ghost" size="md" onClick={() => setOpen(false)}>
                {t('modalClose')}
              </CTAButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
