'use client';

import { useTranslations } from 'next-intl';

/**
 * Minimal footer for Growth Engine funnel pages.
 * Replaces the main site footer (hidden via conditional layout).
 */
export function GrowthFooter(): React.JSX.Element {
  const t = useTranslations('growth');

  return (
    <footer className="border-t border-[#650CBE]/20 bg-[#262523] px-4 py-8">
      <p className="text-center text-sm text-[#D9D9D9]/60">
        {t('growthFooter.text')}
      </p>
    </footer>
  );
}
