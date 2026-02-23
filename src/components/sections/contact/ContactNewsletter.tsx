'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, CheckCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { submitNewsletter } from '@/lib/actions/newsletter';

/**
 * Dedicated newsletter subscription section for the Contact page.
 * Centered layout with email input, GDPR checkbox, and honeypot.
 */
export function ContactNewsletter(): React.JSX.Element {
  const t = useTranslations('contact.newsletter');
  const tFooter = useTranslations('footer.newsletter');
  const [state, formAction, pending] = useActionState(submitNewsletter, {
    success: false,
  });

  return (
    <SectionWrapper theme="dark" id="newsletter">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeader
          overline={t('overline')}
          heading={t('heading')}
        />

        <ScrollReveal>
          <p className="mb-8 text-base text-[#D9D9D9]/70">
            {t('description')}
          </p>

          {state.success ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#66F3A6]/20 bg-[#66F3A6]/5 px-8 py-10">
              <CheckCircle className="h-10 w-10 text-[#66F3A6]" />
              <p className="text-lg font-medium text-[#66F3A6]">
                {t('success')}
              </p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col items-center gap-4">
              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                name="honeypot"
                autoComplete="off"
                tabIndex={-1}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="flex w-full max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    placeholder={t('placeholder')}
                    required
                    disabled={pending}
                    className="h-14 w-full rounded-l-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#56151A] disabled:opacity-50"
                    aria-label={t('placeholder')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="h-14 rounded-r-xl bg-[#56151A] px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#7A2025] disabled:opacity-50"
                >
                  {pending ? '...' : t('submit')}
                </button>
              </div>

              {state.error && (
                <p className="text-sm text-red-400">{tFooter('error')}</p>
              )}

              <label className="flex items-start gap-2 text-xs text-[#D9D9D9]/60">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-white/10 bg-transparent accent-[#56151A]"
                />
                <span>{tFooter('gdpr')}</span>
              </label>
            </form>
          )}
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
