'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { MenuOverlay } from '@/components/layout/MenuOverlay';

/**
 * Fixed header — addifico style.
 * Logo left, "Get in touch" pill button right with burgundy accent.
 * 2-line hamburger. Transparent initially, backdrop blur on scroll.
 * Hides on scroll down, reveals on scroll up.
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

      hideAnimRef.current = gsap.to(headerRef.current, {
        yPercent: -100,
        duration: 0.3,
        ease: 'power1.inOut',
        paused: true,
      });

      ScrollTrigger.create({
        start: 'top -60',
        end: 'max',
        onUpdate(self) {
          if (!hideAnimRef.current) return;

          if (self.direction === 1) {
            hideAnimRef.current.play();
          } else {
            hideAnimRef.current.reverse();
          }
        },
      });

      ScrollTrigger.create({
        start: 'top -50',
        end: 'max',
        toggleClass: {
          targets: headerRef.current,
          className: 'header-scrolled',
        },
      });

      // Theme switching for light/accent sections
      const themeSections = document.querySelectorAll(
        '[data-theme="light"], [data-theme="light-muted"], [data-theme="accent"], [data-theme="burgundy"]'
      );

      themeSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 64px',
          end: 'bottom 64px',
          toggleClass: {
            targets: headerRef.current!,
            className: 'header-over-light',
          },
        });
      });
    },
    { scope: headerRef }
  );

  const handleToggle = useCallback((): void => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && hideAnimRef.current) {
        hideAnimRef.current.reverse();
      }
      return next;
    });
  }, []);

  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-30 flex h-16 w-full items-center justify-between px-4 transition-colors duration-300 sm:px-6 lg:h-[72px] lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          locale={locale}
          className="relative block"
          aria-label="AceAgency"
        >
          <Image
            src="/ace-agency-logo.webp"
            alt="AceAgency"
            width={100}
            height={32}
            priority
            className="h-8 w-auto transition-all duration-300 [.header-over-light_&]:brightness-0"
          />
        </Link>

        {/* Right section: hamburger + CTA */}
        <div className="flex items-center gap-3">
          {/* 2-line hamburger */}
          <button
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? t('menuClose') : t('menuOpen')}
            className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-2"
          >
            <span
              className={`block h-0.5 w-6 bg-[#D9D9D9] transition-all duration-300 [.header-over-light_&]:bg-[#262523] ${
                isOpen ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#D9D9D9] transition-all duration-300 [.header-over-light_&]:bg-[#262523] ${
                isOpen ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </button>

          {/* CTA pill button — burgundy accent with dot indicator */}
          <Link
            href="/contact"
            locale={locale}
            className="hidden items-center gap-2 rounded-full bg-[#56151A] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#7A2025] sm:inline-flex"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            {t('cta')}
          </Link>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <MenuOverlay isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
