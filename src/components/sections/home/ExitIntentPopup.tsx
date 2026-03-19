'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useExitIntent } from '@/lib/hooks/useExitIntent';

/**
 * Premium exit-intent popup — full-screen overlay with dark card.
 * Desktop only, delays 30s, once per session, skips 7 days after dismiss.
 */
export function ExitIntentPopup(): React.JSX.Element {
  const t = useTranslations('home');
  const { isVisible, dismiss } = useExitIntent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label={t('exitIntent.heading')}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative mx-4 max-w-lg overflow-hidden rounded-3xl bg-[#262523] p-10 shadow-2xl md:p-14"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle violet gradient glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, #650CBE 0%, transparent 70%)',
              }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-full p-2 text-white/40 transition-colors hover:text-white/80"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* Content */}
            <div className="relative">
              <span
                className="mb-4 inline-block text-xs uppercase text-[#650CBE]"
                style={{ letterSpacing: '0.12em' }}
              >
                {t('exitIntent.overline')}
              </span>

              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {t('exitIntent.heading')}
              </h2>

              <p className="mb-8 text-lg text-white/70">
                {t('exitIntent.description')}
              </p>

              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#650CBE] px-8 font-semibold text-white hover:bg-[#7A1FD8]"
                >
                  <Link href="/contact" onClick={dismiss}>
                    {t('exitIntent.cta')}
                  </Link>
                </Button>

                <button
                  type="button"
                  onClick={dismiss}
                  className="text-sm text-white/40 transition-colors hover:text-white/60"
                >
                  {t('exitIntent.dismiss')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
