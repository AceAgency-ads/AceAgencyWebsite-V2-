'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';

interface VideoTestimonialCardProps {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly rating: number;
  readonly thumbnailSrc: string;
  readonly videoSrc: string;
}

/** Gradient placeholder when no thumbnail image exists. */
function ThumbnailPlaceholder(): React.JSX.Element {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#650CBE] to-[#262523]" />
  );
}

/**
 * Video testimonial card with click-to-play functionality.
 * Top 60%: Video thumbnail with play button overlay.
 * Bottom 40%: Star rating + pull-quote + author info.
 * On click, thumbnail swaps to <video autoplay>.
 * Falls back to gradient placeholder when thumbnailSrc is missing.
 */
export function VideoTestimonialCard({
  quote,
  author,
  company,
  rating,
  thumbnailSrc,
  videoSrc,
}: VideoTestimonialCardProps): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasThumbnail = thumbnailSrc && !imgError;

  const handlePlay = useCallback(() => {
    if (!videoSrc) return;
    setIsPlaying(true);
  }, [videoSrc]);

  return (
    <article className="group w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] shadow-sm transition-shadow duration-300 hover:shadow-lg sm:w-[400px] lg:w-[468px]">
      {/* Video / Thumbnail area — 16:9 aspect ratio */}
      <div className="relative aspect-video overflow-hidden">
        {isPlaying && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            controls
            playsInline
            preload="none"
            poster={thumbnailSrc}
            className="h-full w-full object-cover"
          >
            <track kind="captions" />
          </video>
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            className="relative block h-full w-full"
            aria-label={`Play video testimonial from ${author}`}
            disabled={!videoSrc}
          >
            {hasThumbnail ? (
              <Image
                src={thumbnailSrc}
                alt={`Video testimonial by ${author}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 400px, 468px"
                onError={() => setImgError(true)}
              />
            ) : (
              <ThumbnailPlaceholder />
            )}
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--section-accent)] transition-transform group-hover:scale-110">
                <Play className="ml-1 size-7 fill-white text-white" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Content area */}
      <div className="p-6 md:p-8">
        {/* Star rating */}
        <div className="mb-3 flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'fill-[var(--section-accent)] text-[var(--section-accent)]' : 'text-[var(--section-text)]/30'}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="mb-4 text-sm text-[var(--section-text-muted)]">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author */}
        <span className="block text-sm font-semibold text-[var(--section-text)]">
          {author}
        </span>
        <span className="text-xs text-[var(--section-text-muted)]">
          {company}
        </span>
      </div>
    </article>
  );
}
