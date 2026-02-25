'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-glacial text-[8rem] font-bold leading-none text-[#56151A] sm:text-[12rem]">
        {t('title')}
      </h1>
      <h2 className="mt-4 font-glacial text-2xl font-bold text-white sm:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-4 max-w-md text-lg text-[#D9D9D9]">
        {t('description')}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-[#56151A] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#56151A]/80"
      >
        {t('backHome')}
      </Link>
    </section>
  );
}
