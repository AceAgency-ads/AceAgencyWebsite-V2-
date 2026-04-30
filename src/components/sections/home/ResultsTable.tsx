import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Overline } from '@/components/ui/Overline';

interface ResultRow {
  client: string;
  channel: string;
  kpi: string;
  change: string;
  period: string;
}

interface ResultHeaders {
  client: string;
  channel: string;
  kpi: string;
  change: string;
  period: string;
}

const SLUG_MAP: Record<string, string> = {
  Amora: 'amora',
  Trady: 'trady',
  ITMAR: 'itmar',
  doSense: 'dosense',
};

/**
 * Results_Table — burgundy strip section listing every client outcome in a
 * single auditable table. On desktop renders as a real table with header
 * row; on mobile collapses to stacked cards (mobile users can't scan tables).
 *
 * Rows that match a published case study (Amora, Trady, ITMAR, doSense)
 * become links to /studii-de-caz/[slug]; others remain plain rows.
 */
export function ResultsTable(): React.JSX.Element {
  const t = useTranslations('home.results');
  const headers = t.raw('headers') as ResultHeaders;
  const rows = t.raw('rows') as readonly ResultRow[];

  return (
    <section
      id="rezultate"
      className="relative overflow-hidden bg-[#56151A] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Subtle pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background:
            'repeating-linear-gradient(45deg, transparent 0px, transparent 60px, white 60px, white 61px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <Overline dark className="mb-4 text-white/70">
            {t('overline')}
          </Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
            {t('h2')}
          </h2>
        </div>

        {/* Desktop: real table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-white/15 lg:block">
          <table className="w-full text-left font-body text-[15px]">
            <thead className="bg-white/5 font-body text-[12px] uppercase tracking-[0.12em] text-white/60">
              <tr>
                <th className="px-6 py-4 font-semibold">{headers.client}</th>
                <th className="px-6 py-4 font-semibold">{headers.channel}</th>
                <th className="px-6 py-4 font-semibold">{headers.kpi}</th>
                <th className="px-6 py-4 font-semibold">{headers.change}</th>
                <th className="px-6 py-4 font-semibold">{headers.period}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((row) => {
                const slug = SLUG_MAP[row.client];
                const Cell = ({ children }: { children: React.ReactNode }) => (
                  <td className="px-6 py-5 align-middle">{children}</td>
                );
                return (
                  <tr
                    key={row.client}
                    className="transition-colors hover:bg-white/5"
                  >
                    <Cell>
                      <span className="font-subheading text-[17px] font-bold text-white">
                        {slug ? (
                          <Link
                            href={`/studii-de-caz/${slug}` as '/'}
                            className="underline-offset-4 hover:underline"
                          >
                            {row.client}
                          </Link>
                        ) : (
                          row.client
                        )}
                      </span>
                    </Cell>
                    <Cell>
                      <span className="text-white/75">{row.channel}</span>
                    </Cell>
                    <Cell>
                      <span className="font-semibold text-white">
                        {row.kpi}
                      </span>
                    </Cell>
                    <Cell>
                      <span className="rounded-full bg-[#C4394A]/20 px-2.5 py-1 font-medium text-[#fda5b0]">
                        {row.change}
                      </span>
                    </Cell>
                    <Cell>
                      <span className="text-white/60">{row.period}</span>
                    </Cell>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile / tablet: stacked cards */}
        <ul className="mt-12 grid gap-4 lg:hidden">
          {rows.map((row) => {
            const slug = SLUG_MAP[row.client];
            const Wrap = slug
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link
                    href={`/studii-de-caz/${slug}` as '/'}
                    className="block rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:bg-white/10"
                  >
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                    {children}
                  </div>
                );
            return (
              <li key={row.client}>
                <Wrap>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-subheading text-[18px] font-bold text-white">
                      {row.client}
                    </span>
                    <span className="text-[12px] uppercase tracking-[0.12em] text-white/50">
                      {row.period}
                    </span>
                  </div>
                  <div className="mt-2 text-[13px] text-white/60">
                    {row.channel}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{row.kpi}</span>
                    <span className="rounded-full bg-[#C4394A]/20 px-2.5 py-1 text-[13px] font-medium text-[#fda5b0]">
                      {row.change}
                    </span>
                  </div>
                </Wrap>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
