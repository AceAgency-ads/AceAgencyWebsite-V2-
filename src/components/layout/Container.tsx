import { cn } from '@/lib/utils';

interface ContainerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * Responsive page container.
 * Scales from 320px (xs) to 2560px (3xl) with mobile-first padding.
 * Max content width: 1280px (xl breakpoint).
 */
export function Container({ children, className }: ContainerProps): React.JSX.Element {
  return (
    <div className={cn('mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
