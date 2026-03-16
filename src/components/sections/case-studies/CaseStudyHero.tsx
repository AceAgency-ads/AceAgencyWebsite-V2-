import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

/**
 * Case studies index hero section.
 * Dark theme with hero padding. H1 heading from caseStudies namespace.
 */
export function CaseStudyHero(): React.JSX.Element {
  const t = useTranslations('caseStudies');

  return (
    <SectionWrapper theme="dark" hero rounded={false}>
      <SectionHeader
        overline={t('hero.overline')}
        heading={t('hero.heading')}
        description={t('hero.description')}
        headingAs="h1"
        align="left"
        className="mb-0"
      />
    </SectionWrapper>
  );
}
