'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, onClose }: ImageLightboxProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const hasMultiple = images.length > 1;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMultiple) goNext();
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, goNext, goPrev, hasMultiple]);

  const current = images[currentIndex]!;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Inchide"
      >
        <X className="size-6" />
      </button>

      {/* Previous */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Imaginea anterioara"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative mx-16 max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1920}
          height={1080}
          className="max-h-[90vh] w-auto rounded-lg object-contain"
          sizes="90vw"
          priority
        />
        {/* Counter */}
        {hasMultiple && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Next */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Imaginea urmatoare"
        >
          <ChevronRight className="size-6" />
        </button>
      )}
    </div>
  );
}

interface LightboxTriggerProps {
  src: string;
  alt: string;
  allImages?: { src: string; alt: string }[];
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps any content (e.g. an Image card) and opens a lightbox on click.
 * Pass `allImages` to enable gallery navigation across all images in the set.
 */
export function LightboxTrigger({ src, alt, allImages, className, children }: LightboxTriggerProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const images = allImages ?? [{ src, alt }];
  const initialIndex = images.findIndex((img) => img.src === src);

  return (
    <>
      <div
        className={`cursor-zoom-in ${className ?? ''}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true); }}
      >
        {children}
      </div>
      {isOpen && (
        <ImageLightbox
          images={images}
          initialIndex={initialIndex >= 0 ? initialIndex : 0}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
