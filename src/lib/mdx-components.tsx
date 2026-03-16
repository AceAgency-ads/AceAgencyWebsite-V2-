// src/lib/mdx-components.tsx
import Image from 'next/image';

/**
 * Custom component mapping for MDX content rendering.
 * Passed to compileMDX() — maps markdown elements to React components.
 */
export const mdxComponents = {
  /** Next.js Image with lazy loading and responsive sizing. */
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={(props.src as string) ?? ''}
      alt={props.alt ?? ''}
      width={1200}
      height={675}
      className="my-8 rounded-2xl"
      loading="lazy"
    />
  ),

  /** Callout/highlight block for MDX content. */
  Callout: ({
    children,
    type = 'info',
  }: {
    readonly children: React.ReactNode;
    readonly type?: 'info' | 'warning' | 'tip';
  }) => {
    const colors = {
      info: 'border-[#650CBE]/30 bg-[#650CBE]/5',
      warning: 'border-amber-500/30 bg-amber-500/5',
      tip: 'border-[#66F3A6]/30 bg-[#66F3A6]/5',
    };
    return (
      <div className={`my-6 rounded-xl border-l-4 p-6 ${colors[type]}`}>
        {children}
      </div>
    );
  },

  /** Stat highlight for case studies — large metric inline. */
  StatHighlight: ({
    value,
    label,
  }: {
    readonly value: string;
    readonly label: string;
  }) => (
    <div className="my-6 flex items-baseline gap-3">
      <span className="text-4xl font-bold text-[#650CBE]">{value}</span>
      <span className="text-lg text-[#D9D9D9]">{label}</span>
    </div>
  ),
};
