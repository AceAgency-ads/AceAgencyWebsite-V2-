'use client';

import { useState, useMemo, type ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Overline } from '@/components/ui/Overline';
import { CTAButton } from '@/components/ui/CTAButton';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { Breadcrumb } from '@/components/sections/Breadcrumb';

interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  date: string;
  featured?: boolean;
}

/**
 * Blog index — placeholder grid with category filter pills. No detail pages
 * yet (aceads source has no blog detail HTML), so cards are non-clickable
 * and labeled `comingSoon`. When detail pages ship, swap divs for Links.
 */
export default function BlogIndexPage(): React.JSX.Element {
  const locale = useLocale();
  void locale;
  const t = useTranslations('blogIndex');
  const tBlog = useTranslations('blog');
  const tCommon = useTranslations('common');

  const categories = tBlog.raw('categories') as readonly string[];
  const posts = tBlog.raw('posts') as readonly BlogPost[];
  const [active, setActive] = useState(categories[0] ?? '');

  const filtered = useMemo(() => {
    if (!active || active === categories[0]) return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts, categories]);

  const featuredPost = posts.find((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-16 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-20">
        <BurgundyGlow style={{ top: -200, right: -180 }} size={700} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          <Overline dark className="mt-2 mb-6">
            {t('hero.overline')}
          </Overline>
          <h1 className="max-w-[20ch] font-heading text-[clamp(2rem,4.5vw+1rem,4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            {t.rich('hero.h1', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#C4394A]">{chunks}</span>
              ),
            })}
          </h1>
          <p className="mt-7 max-w-[60ch] font-subheading text-[17px] leading-[1.55] text-[#D9D9D9] sm:text-[18px]">
            {t('hero.body')}
          </p>
        </div>
      </section>

      {/* Filter pills + posts grid */}
      <section className="bg-[#FAF9F7] px-4 py-16 text-[#262523] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`min-h-[36px] rounded-full px-4 font-body text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  active === cat
                    ? 'bg-[#56151A] text-white'
                    : 'bg-white text-[#71706E] hover:bg-[#56151A]/10 hover:text-[#56151A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featuredPost && active === categories[0] ? (
            <article className="mt-10 grid gap-8 rounded-3xl border border-[#E8E6E3] bg-white p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#71706E]">
                  <span className="rounded-full bg-[#56151A]/10 px-3 py-1 text-[#56151A]">
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>
                    {tCommon('minRead', { minutes: featuredPost.readMinutes })}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-[clamp(1.5rem,2.5vw+0.5rem,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#262523]">
                  {featuredPost.title}
                </h2>
                <p className="mt-5 max-w-[60ch] font-body text-[16px] leading-[1.65] text-[#71706E]">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-7 inline-flex items-center gap-2 font-body text-[13px] font-semibold text-[#56151A]/70">
                  {tCommon('soon')}
                </div>
              </div>
              <div
                aria-hidden="true"
                className="relative min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#56151A] to-[#3F0E12]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(196,57,74,0.55), transparent 60%)',
                  }}
                />
              </div>
            </article>
          ) : null}

          {/* Grid */}
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered
              .filter((p) => !p.featured || active !== categories[0])
              .map((post) => (
                <li key={post.slug}>
                  <article className="flex h-full cursor-not-allowed flex-col rounded-2xl border border-[#E8E6E3] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#56151A]/40">
                    <div className="flex flex-wrap items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#71706E]">
                      <span className="rounded-full bg-[#56151A]/10 px-2.5 py-0.5 text-[#56151A]">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="mt-4 font-subheading text-[18px] font-bold leading-snug text-[#262523]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 font-body text-[14px] leading-[1.6] text-[#71706E]">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#E8E6E3] pt-4 text-[12px]">
                      <span className="font-body uppercase tracking-[0.14em] text-[#71706E]">
                        {tCommon('minRead', { minutes: post.readMinutes })}
                      </span>
                      <span className="font-body font-semibold text-[#56151A]/60">
                        {tCommon('soon')}
                      </span>
                    </div>
                  </article>
                </li>
              ))}
          </ul>

          {filtered.length === 0 ? (
            <p className="mt-12 text-center font-body text-[15px] text-[#71706E]">
              {t('emptyState')}
            </p>
          ) : null}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#262523] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[820px] rounded-3xl border border-[rgba(74,70,67,0.5)] bg-[#1a1918] p-8 text-center sm:p-12">
          <h2 className="font-heading text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-bold leading-tight text-white">
            {t('newsletter.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-[50ch] font-body text-[15px] leading-[1.6] text-[#a0a0a0]">
            {t('newsletter.body')}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-7 flex max-w-[460px] flex-col gap-3 sm:flex-row"
          >
            <label className="flex-1">
              <span className="sr-only">Email</span>
              <input
                type="email"
                required
                placeholder={t('newsletter.placeholder')}
                className="h-12 w-full rounded-full border border-[rgba(74,70,67,0.5)] bg-[#262523] px-5 font-body text-[14px] text-white placeholder:text-[#a0a0a0]/60 focus:border-[#C4394A] focus:outline-none"
              />
            </label>
            <CTAButton type="submit" size="md">
              {t('newsletter.submit')}
            </CTAButton>
          </form>
        </div>
      </section>
    </>
  );
}
