'use client';

import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { MenuOverlay } from '@/components/layout/MenuOverlay';

/**
 * Fixed header bar with logo, hamburger toggle, and CTA button.
 * Hides on scroll down, reveals on scroll up via ScrollTrigger.
 * Transparent initially, gains glass-morphism backdrop after 50px scroll.
 */
export function Header(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('header');
  const headerRef = useRef<HTMLElement>(null);
  const hideAnimRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Create the hide/show tween (paused)
      hideAnimRef.current = gsap.to(headerRef.current, {
        yPercent: -100,
        duration: 0.3,
        ease: 'power1.inOut',
        paused: true,
      });

      // ScrollTrigger for scroll direction detection
      ScrollTrigger.create({
        start: 'top -60',
        end: 'max',
        onUpdate(self) {
          // Don't hide when menu overlay is open
          if (!hideAnimRef.current) return;

          if (self.direction === 1) {
            // Scrolling down — hide header
            hideAnimRef.current.play();
          } else {
            // Scrolling up — show header
            hideAnimRef.current.reverse();
          }
        },
      });

      // Glass morphism on scroll past 50px
      ScrollTrigger.create({
        start: 'top -50',
        end: 'max',
        toggleClass: {
          targets: headerRef.current,
          className: 'header-scrolled',
        },
      });
    },
    { scope: headerRef }
  );

  function handleToggle(): void {
    setIsOpen((prev) => {
      const next = !prev;
      // When opening menu, ensure header stays visible
      if (next && hideAnimRef.current) {
        hideAnimRef.current.reverse();
      }
      return next;
    });
  }

  function handleClose(): void {
    setIsOpen(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-30 flex h-16 w-full items-center justify-between px-4 transition-colors duration-300 sm:px-6 lg:h-[72px] lg:px-8"
      >
        {/* Logo — text placeholder (Glacial Indifference Bold) */}
        <Link
          href="/"
          locale={locale}
          className="font-heading text-xl font-bold tracking-tight text-white"
          aria-label="AceAgency"
        >
          ACE
        </Link>

        {/* Right section: hamburger + CTA */}
        <div className="flex items-center gap-3">
          {/* Hamburger button */}
          <button
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? t('menuClose') : t('menuOpen')}
            className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>

          {/* CTA button */}
          <Link
            href="/contact"
            locale={locale}
            className="hidden items-center rounded-md px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 sm:inline-flex"
            style={{ background: 'var(--ds-gradient-brand-primary)' }}
          >
            {t('cta')}
          </Link>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <MenuOverlay isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
