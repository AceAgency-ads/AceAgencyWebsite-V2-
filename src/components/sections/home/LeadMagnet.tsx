'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, Download } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { submitNewsletter, type NewsletterState } from '@/lib/actions/newsletter';

const BULLET_KEYS = ['0', '1', '2', '3'] as const;

const initialState: NewsletterState = { success: false };

/**
 * Lead magnet section — ebook download with email capture.
 * Dark outer, light card inner (same pattern as CTASection).
 * Left: ebook cover placeholder, Right: content + form.
 * Reuses submitNewsletter server action.
 */
export function LeadMagnet(): React.JSX.Element {
  const t = useTranslations('home');
  const [state, formAction, isPending] = useActionState(submitNewsletter, initialState);

  return (
    <SectionWrapper theme="dark" id="lead-magnet" rounded={false}>
      <div className="rounded-[36px] bg-[#EBEBEB] p-10 md:p-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
          {/* Left: Ebook cover placeholder */}
          <ScrollReveal className="md:w-[40%]">
            <div className="flex aspect-[3/4] max-h-[420px] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#650CBE] to-[#4500D0] p-8 shadow-xl">
              <div className="text-center text-white">
                <Download className="mx-auto mb-4 size-12 opacity-80" />
                <p className="text-lg font-bold leading-tight md:text-xl">
                  27 Tactici
                </p>
                <p className="mt-1 text-sm opacity-80">
                  Conversion Rate Optimization
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content + Form */}
          <div className="flex-1">
            <ScrollReveal>
              <span className="mb-3 inline-block text-xs uppercase tracking-[0.18em] text-[#666666]">
                {t('leadMagnet.overline')}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-[#262523] md:text-4xl">
                {t('leadMagnet.heading')}
              </h2>
              <p className="mb-6 text-[#262523]">
                {t('leadMagnet.description')}
              </p>
            </ScrollReveal>

            {/* Bullet points */}
            <ScrollReveal>
              <ul className="mb-8 space-y-3">
                {BULLET_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#650CBE]/15">
                      <Check className="size-3 text-[#650CBE]" />
                    </span>
                    <span className="text-sm text-[#262523]">
                      {t(`leadMagnet.bullets.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal>
              {state.success ? (
                <div className="rounded-xl bg-[#650CBE]/10 p-6 text-center">
                  <Check className="mx-auto mb-2 size-8 text-[#650CBE]" />
                  <p className="font-semibold text-[#262523]">
                    {t('leadMagnet.success')}
                  </p>
                </div>
              ) : (
                <form action={formAction} className="flex flex-col gap-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Email input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('leadMagnet.placeholder')}
                      required
                      className="h-12 flex-1 border-b-2 border-[#262523]/30 bg-transparent px-1 text-[#262523] placeholder:text-[#666666] focus:border-[#262523] focus:outline-none"
                      aria-label={t('leadMagnet.placeholder')}
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex h-12 items-center gap-2 rounded-full bg-[#650CBE] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#7A1FD8] disabled:opacity-60"
                    >
                      {t('leadMagnet.submit')}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>

                  {/* GDPR checkbox */}
                  <label className="flex items-start gap-2 text-xs text-[#666666]">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-[#262523]/30 bg-transparent accent-[#650CBE]"
                    />
                    <span>{t('leadMagnet.gdpr')}</span>
                  </label>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
