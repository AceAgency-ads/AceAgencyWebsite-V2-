import type { JsonLdGraph } from '@/lib/seo/schemas';

interface JsonLdProps {
  data: JsonLdGraph | Record<string, unknown>;
}

/**
 * Inline <script type="application/ld+json"> tag. Emits the data as-is
 * with `dangerouslySetInnerHTML` (safe — JSON.stringify escapes correctly).
 *
 * Render at the top of any page. Avoid duplicating @id values across the
 * page — use the graph() helper to bundle related schemas if you need
 * multiple types on one page (Organization + LocalBusiness + WebSite is the
 * common homepage trio).
 */
export function JsonLd({ data }: JsonLdProps): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
