import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/multumim'],
      },
      // Allow AI search crawlers (search/retrieval, not training)
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
        ],
        allow: '/',
      },
      // Block AI training crawlers to protect content
      {
        userAgent: [
          'CCBot',
          'Google-Extended',
          'Bytespider',
          'anthropic-ai',
          'Omgilibot',
          'Applebot-Extended',
          'FacebookBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
