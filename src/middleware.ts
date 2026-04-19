import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  // Pass pathname to layout for conditional rendering (e.g. hide Header on /growth)
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export const config = {
  // Match all pathnames except Next.js internals and static files
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
