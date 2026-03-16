// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type {
  BlogArticleMeta,
  CaseStudyMeta,
  ResolvedContent,
} from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Read all MDX files from a section directory, filtered by locale.
 * Returns frontmatter sorted by publishedAt descending (newest first).
 */
export function getContentBySection<T extends BlogArticleMeta | CaseStudyMeta>(
  section: 'blog' | 'studii-de-caz',
  locale: string
): (T & { readonly readingTime: number })[] {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const items = files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const meta = data as T;

      if (meta.locale !== locale) return null;

      const computedReadingTime =
        'readingTime' in meta && typeof meta.readingTime === 'number'
          ? meta.readingTime
          : Math.ceil(readingTime(content).minutes);

      return { ...meta, readingTime: computedReadingTime } as T & {
        readonly readingTime: number;
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Read a single MDX file by slug and locale.
 * Returns frontmatter + raw MDX content string for compileMDX().
 */
export function getContentBySlug<T extends BlogArticleMeta | CaseStudyMeta>(
  section: 'blog' | 'studii-de-caz',
  slug: string,
  locale: string
): ResolvedContent<T> | null {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const meta = data as T;

    if (meta.slug === slug && meta.locale === locale) {
      const computedReadingTime =
        'readingTime' in meta && typeof meta.readingTime === 'number'
          ? meta.readingTime
          : Math.ceil(readingTime(content).minutes);

      return {
        meta: { ...meta, readingTime: computedReadingTime } as T & {
          readonly readingTime: number;
        },
        content,
      };
    }
  }

  return null;
}

/**
 * Get all slugs for generateStaticParams.
 * Returns array of { slug, locale } for all MDX files in a section.
 */
export function getAllSlugs(
  section: 'blog' | 'studii-de-caz'
): { slug: string; locale: string }[] {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return { slug: data.slug as string, locale: data.locale as string };
  });
}
