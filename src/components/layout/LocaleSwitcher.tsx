'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher(): React.JSX.Element {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch(nextLocale: string): void {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <nav aria-label="Language switcher" className="flex gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          aria-current={locale === loc ? 'true' : undefined}
          className={`min-h-12 min-w-12 rounded px-3 py-2 text-sm font-medium transition-colors ${
            locale === loc
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
