import * as React from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Brand CTA button. Burgundy-first variants used across hero, sections, and
 * navigation. Wraps shadcn-style API but with explicit AceAgency variants
 * (primary / ghost / light / dark / outline) and pill rounding by default.
 *
 * For neutral semantic buttons (forms, dialogs), keep using `<Button>`.
 */
const ctaVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[#C4394A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#262523]',
  {
    variants: {
      variant: {
        // Primary burgundy fill — light or dark backgrounds. Hover deepens to #6E1A22.
        primary:
          'bg-[#56151A] text-white border-0 hover:bg-[#6E1A22] hover:shadow-[0_10px_40px_rgba(196,57,74,0.35)]',
        // Transparent w/ light border — used as secondary on dark hero backgrounds.
        ghost:
          'bg-transparent text-white border border-white/25 hover:bg-white/10',
        // Outline-on-dark, fills white on hover. Used inside burgundy strips.
        light:
          'bg-transparent text-white border border-white hover:bg-white hover:text-[#56151A]',
        // Warm-black filled, used as tertiary on light backgrounds.
        dark: 'bg-[#262523] text-white border-0 hover:bg-[#1a1918]',
        // Outline-on-light. Used in light sections as secondary CTA.
        outline:
          'bg-transparent text-[#262523] border border-[#262523] hover:bg-[#262523] hover:text-white',
      },
      size: {
        sm: 'h-[38px] px-[18px] text-[13px] rounded-full',
        md: 'h-[46px] px-[22px] text-[14px] rounded-full',
        lg: 'h-[54px] px-[30px] text-[15px] rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaVariants> {
  /** When true, renders children as the root element (Radix Slot). Use for `<Link>` wrapping. */
  asChild?: boolean;
}

export function CTAButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: CTAButtonProps): React.JSX.Element {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="cta-button"
      data-variant={variant ?? 'primary'}
      data-size={size ?? 'lg'}
      className={cn(ctaVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { ctaVariants };
