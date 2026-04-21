'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface GrowthV2CalendarProps {
  locale: string;
  monthLabel: string;
  confirmPrefix: string;
}

export function GrowthV2Calendar({
  locale,
  monthLabel,
  confirmPrefix,
}: GrowthV2CalendarProps): React.JSX.Element {
  const days = useMemo(
    () => [
      { day: locale === 'ro' ? 'L' : 'M', date: 14 },
      { day: locale === 'ro' ? 'M' : 'T', date: 15 },
      { day: locale === 'ro' ? 'M' : 'W', date: 16 },
      { day: locale === 'ro' ? 'J' : 'T', date: 17 },
      { day: locale === 'ro' ? 'V' : 'F', date: 18 },
      { day: locale === 'ro' ? 'S' : 'S', date: 19 },
      { day: locale === 'ro' ? 'D' : 'S', date: 20 },
    ],
    [locale]
  );
  const times = ['10:00', '11:30', '14:00', '15:30', '17:00'];
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedTime, setSelectedTime] = useState(2);

  return (
    <div className="rounded-[28px] border border-[#E8E6E3] bg-white p-6 shadow-[0_20px_60px_rgba(38,37,35,0.08)] sm:p-7">
      <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#71706E]">
        {monthLabel}
      </p>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {days.map((item, index) => (
          <button
            key={`${item.day}-${item.date}`}
            type="button"
            onClick={() => setSelectedDay(index)}
            className={cn(
              'rounded-xl border px-2 py-3 text-center transition-colors',
              selectedDay === index
                ? 'border-[#262523] bg-[#262523] text-white'
                : 'border-[#E8E6E3] bg-white text-[#262523] hover:border-[#650CBE]'
            )}
          >
            <span className="block font-body text-[11px] opacity-60">{item.day}</span>
            <span className="mt-1 block font-body text-[16px] font-semibold">
              {item.date}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {times.map((time, index) => (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(index)}
            className={cn(
              'rounded-xl border px-3 py-3 font-body text-[13px] font-medium transition-colors',
              selectedTime === index
                ? 'border-[#650CBE] bg-[#650CBE] text-white'
                : 'border-[#E8E6E3] bg-white text-[#262523] hover:border-[#650CBE]'
            )}
          >
            {time}
          </button>
        ))}
      </div>

      <a
        href="#lead-kit"
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#650CBE] px-6 py-4 font-body text-[14px] font-semibold text-white transition-colors hover:bg-[#4500D0]"
      >
        {confirmPrefix} {days[selectedDay]?.date} Nov, {times[selectedTime]} →
      </a>
    </div>
  );
}
