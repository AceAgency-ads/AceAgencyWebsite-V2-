import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { Breadcrumb, type BreadcrumbItem } from '@/components/sections/Breadcrumb';

interface LegalHeroProps {
  readonly breadcrumbItems: readonly BreadcrumbItem[];
  readonly heading: string;
}

/**
 * Compact hero section for legal pages.
 * Server component -- no animations needed, just breadcrumb + heading.
 * Renders the single H1 with page title.
 */
export function LegalHero({ breadcrumbItems, heading }: LegalHeroProps): React.JSX.Element {
  return (
    <SectionWrapper theme="dark" className="py-16 md:py-24">
      <div className="max-w-3xl">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-[2rem] font-bold leading-[1.1] md:text-[2.75rem] lg:text-[3.5rem]">
          {heading}
        </h1>
      </div>
    </SectionWrapper>
  );
}
