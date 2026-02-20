'use client';

import { useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '@/lib/gsap';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';

interface MenuOverlayProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/** Navigation link definition */
interface NavLink {
  readonly key: string;
  readonly href: '/' | '/despre-noi' | '/servicii' | '/contact';
}

const NAV_LINKS: readonly NavLink[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/despre-noi' },
  { key: 'services', href: '/servicii' },
  { key: 'contact', href: '/contact' },
] as const;

/**
 * Fullscreen overlay menu with SplitText character stagger animation.
 * Opens with clipPath animation + SplitText nav links.
 * Closes menu on locale switch or nav link click.
 */
export function MenuOverlay({
  isOpen,
  onClose,
}: MenuOverlayProps): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const splitInstancesRef = useRef<SplitText[]>([]);

  // Close menu when pathname or locale changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // Intentionally only react to pathname/locale changes, not isOpen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, locale]);

  useGSAP(
    () => {
      if (!overlayRef.current || !navLinksRef.current) return;

      const navItems =
        navLinksRef.current.querySelectorAll<HTMLElement>('.nav-link');

      // Build timeline (paused — controlled by isOpen)
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete() {
          // Refresh ScrollTrigger positions after overlay closes (Pitfall 4)
          ScrollTrigger.refresh();
          // Revert SplitText instances to clean DOM
          splitInstancesRef.current.forEach((s) => s.revert());
          splitInstancesRef.current = [];
        },
      });

      // Step 1: Overlay slides in via clipPath
      tl.fromTo(
        overlayRef.current,
        { clipPath: 'inset(100% 0 0 0)', visibility: 'visible' },
        {
          clipPath: 'inset(0%)',
          duration: 0.5,
          ease: 'power2.inOut',
        }
      );

      // Step 2: Nav links appear with SplitText character stagger
      navItems.forEach((item) => {
        const split = SplitText.create(item, {
          type: 'chars',
        });
        splitInstancesRef.current.push(split);

        tl.from(
          split.chars,
          {
            y: '100%',
            opacity: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power1.out',
          },
          '-=0.25'
        );
      });

      timelineRef.current = tl;
    },
    { scope: overlayRef, dependencies: [] }
  );

  // Control timeline play/reverse based on isOpen
  useEffect(() => {
    if (!timelineRef.current) return;

    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleLinkClick(): void {
    onClose();
  }

  return (
    <div
      ref={overlayRef}
      className="invisible fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#262523]"
      aria-hidden={!isOpen}
    >
      {/* Navigation links */}
      <nav ref={navLinksRef} className="flex flex-col items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            locale={locale}
            onClick={handleLinkClick}
            className="nav-link font-heading text-4xl font-bold text-white transition-colors duration-200 hover:text-grey md:text-6xl"
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>

      {/* Locale switcher */}
      <div className="mt-12">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
