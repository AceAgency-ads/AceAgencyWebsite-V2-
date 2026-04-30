import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { Breadcrumb, type BreadcrumbItem } from '@/components/sections/Breadcrumb';

export interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  /** i18n namespace path, e.g. `legal.privacy` */
  namespace: string;
  breadcrumbItems: readonly BreadcrumbItem[];
}

/**
 * Shared template for privacy / cookies / terms. Dark hero with title +
 * last-updated, then a light long-form body with a sticky table of contents
 * on the left at lg+ widths.
 *
 * Body text is preserved with paragraph (`\n\n`) and bullet (`\n- `) breaks
 * from the i18n source. Links inside body are not auto-linkified — keep them
 * inline as plain text or upgrade to MDX later.
 */
export function LegalPage({
  namespace,
  breadcrumbItems,
}: LegalPageProps): React.JSX.Element {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as readonly LegalSection[];
  const tocLabel = t('tocLabel');

  return (
    <>
      {/* Dark hero */}
      <section className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-16 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-20">
        <BurgundyGlow style={{ top: -200, right: -180 }} size={680} />

        <div className="relative z-10 mx-auto max-w-[1100px]">
          <Breadcrumb items={breadcrumbItems} />
          <Overline dark className="mt-2 mb-5">
            {t('lastUpdated')}
          </Overline>
          <h1 className="font-heading text-[clamp(2rem,4vw+1rem,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-[60ch] font-subheading text-[16px] leading-[1.55] text-[#D9D9D9] sm:text-[17px]">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Body — sticky TOC + sections */}
      <section className="bg-white px-4 py-16 text-[#262523] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#71706E]">
              {tocLabel}
            </div>
            <ol className="mt-4 space-y-2.5">
              {sections.map((sec, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i + 1}`}
                    className="block font-body text-[13px] leading-[1.45] text-[#71706E] underline-offset-4 transition-colors hover:text-[#56151A] hover:underline"
                  >
                    <span className="mr-2 text-[#56151A]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {sec.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Sections */}
          <div className="prose-style space-y-12">
            {sections.map((sec, i) => (
              <section key={i} id={`section-${i + 1}`} className="scroll-mt-24">
                <div className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#56151A]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h2 className="mt-2 font-heading text-[clamp(1.25rem,2vw+0.5rem,1.875rem)] font-bold leading-[1.2] tracking-[-0.015em]">
                  {sec.heading}
                </h2>
                <div className="mt-4 space-y-4 font-body text-[15px] leading-[1.7] text-[#262523] sm:text-[16px]">
                  {sec.body.split('\n\n').map((para, pi) => {
                    if (para.includes('\n- ')) {
                      const lines = para.split('\n');
                      const intro = lines.find((l) => !l.startsWith('- '));
                      const bullets = lines.filter((l) => l.startsWith('- '));
                      return (
                        <div key={pi}>
                          {intro ? <p>{intro.trim()}</p> : null}
                          <ul className="mt-3 space-y-2 pl-5">
                            {bullets.map((b, bi) => (
                              <li
                                key={bi}
                                className="relative font-body text-[15px] leading-[1.7] text-[#262523] before:absolute before:-left-5 before:top-[0.45em] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#56151A] sm:text-[16px]"
                              >
                                {b.replace(/^- /, '').trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return <p key={pi}>{para.trim()}</p>;
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Footer panel */}
      <section className="bg-[#FAF9F7] px-4 py-12 text-[#71706E] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px] rounded-2xl border border-[#E8E6E3] bg-white p-6 font-body text-[13px] leading-[1.6] text-[#71706E] sm:p-8">
          {t('footer')}
        </div>
      </section>
    </>
  );
}
