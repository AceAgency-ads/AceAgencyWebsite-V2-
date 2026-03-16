'use client';

/**
 * Branded gradient placeholder for images that don't exist yet.
 * Displays a gradient background with optional label text.
 * Used throughout blog, case studies, and portfolio sections.
 */
export function PlaceholderImage({
  alt,
  className = '',
}: {
  readonly alt: string;
  readonly className?: string;
}): React.JSX.Element {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#650CBE] to-[#262523] ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="px-4 text-center text-sm text-white/40">{alt}</span>
    </div>
  );
}
