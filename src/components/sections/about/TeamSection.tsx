import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';
import { MetricStat } from '@/components/ui/MetricStat';

interface TeamStat {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  stats?: readonly TeamStat[];
}

const INITIALS_BG = ['#56151A', '#3F0E12', '#6E1A22', '#262523', '#56151A'] as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Team — 5 members on a dark background. The CEO/founder gets a wider
 * featured card with stats; the rest sit in a 2×2 grid below.
 *
 * Avatars are typographic (initials) since aceads source has no real photos.
 * Easy swap to <Image> later.
 */
export function TeamSection(): React.JSX.Element {
  const t = useTranslations('about.team');
  const members = t.raw('members') as readonly TeamMember[];
  const [lead, ...rest] = members;

  return (
    <section
      id="team"
      className="bg-[#262523] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <Overline dark className="mb-4">
            {t('overline')}
          </Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
            {t('h2')}
          </h2>
        </div>

        {/* Lead member featured card */}
        {lead ? (
          <div className="mt-12 grid gap-8 rounded-3xl border border-[rgba(74,70,67,0.5)] bg-[#1a1918] p-7 sm:p-10 lg:grid-cols-[280px_1fr] lg:gap-12">
            <div className="flex items-center justify-center lg:justify-start">
              <div
                aria-hidden="true"
                className="flex h-[200px] w-[200px] items-center justify-center rounded-full font-heading text-[64px] font-bold leading-none text-white shadow-[0_8px_30px_rgba(86,21,26,0.30)]"
                style={{ background: INITIALS_BG[0] }}
              >
                {getInitials(lead.name)}
              </div>
            </div>
            <div>
              <div className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C4394A]">
                {lead.role}
              </div>
              <h3 className="mt-2 font-heading text-[28px] font-bold leading-tight text-white sm:text-[32px]">
                {lead.name}
              </h3>
              <p className="mt-4 max-w-[60ch] font-body text-[15px] leading-[1.65] text-[#D9D9D9] sm:text-[16px]">
                {lead.bio}
              </p>
              {lead.stats && lead.stats.length > 0 ? (
                <div className="mt-7 grid grid-cols-3 gap-6 border-t border-[rgba(74,70,67,0.5)] pt-6">
                  {lead.stats.map((s, i) => (
                    <MetricStat
                      key={i}
                      dark
                      size="sm"
                      value={s.value}
                      label={s.label}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Remaining members — 2×2 grid */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {rest.map((m, i) => (
            <li
              key={m.name}
              className="flex gap-5 rounded-2xl border border-[rgba(74,70,67,0.5)] bg-[#1a1918] p-6 transition-all duration-300 hover:border-[#56151A]/60 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full font-heading text-[24px] font-bold leading-none text-white"
                style={{ background: INITIALS_BG[(i + 1) % INITIALS_BG.length] }}
              >
                {getInitials(m.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C4394A]">
                  {m.role}
                </div>
                <div className="mt-1 font-subheading text-[18px] font-bold leading-tight text-white">
                  {m.name}
                </div>
                <p className="mt-2 font-body text-[14px] leading-[1.6] text-[#a0a0a0]">
                  {m.bio}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
