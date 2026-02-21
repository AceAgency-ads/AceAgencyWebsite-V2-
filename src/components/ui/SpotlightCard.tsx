'use client';

import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly spotlightColor?: string;
}

/**
 * Card with cursor-tracking radial gradient spotlight effect.
 * Default spotlight color: green accent (addifico palette).
 * Disables spotlight on touch devices (no mouse tracking).
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(86, 21, 26, 0.25)',
}: SpotlightCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>): void {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 200px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent)`,
        }}
      />
      {/* Card content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
