---
status: testing
phase: 07-seo-and-analytics
source: 07-01-SUMMARY.md, 07-02-SUMMARY.md, 07-03-SUMMARY.md
started: 2026-02-24T12:00:00Z
updated: 2026-02-24T12:00:00Z
---

## Current Test

number: 1
name: Page Title and Meta Description
expected: |
  Open any page (e.g. homepage at /ro) in Chrome DevTools. Inspect the `<head>`:
  - `<title>` is present and under 60 characters
  - `<meta name="description">` is present and under 155 characters
  Check at least homepage, a service page, and the contact page.
awaiting: user response

## Tests

### 1. Page Title and Meta Description
expected: Every page has a `<title>` under 60 chars and `<meta name="description">` under 155 chars. Check homepage (/ro), a service page (/ro/servicii/google-ads), and contact (/ro/contact).
result: [pending]

### 2. Canonical and Hreflang Tags
expected: View page source on any page. You should see `<link rel="canonical" href="https://aceagency.ro/ro/...">` and three `<link rel="alternate" hreflang>` tags for `ro`, `en`, and `x-default`.
result: [pending]

### 3. Open Graph and Twitter Card Tags
expected: View page source. You should see `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:url">`, `<meta property="og:site_name">`, `<meta property="og:locale">`, and `<meta name="twitter:card">` tags.
result: [pending]

### 4. Homepage JSON-LD (Organization + LocalBusiness)
expected: View page source on homepage (/ro). You should see two `<script type="application/ld+json">` blocks — one with `"@type": "Organization"` and one with `"@type": "LocalBusiness"` containing address, phone, and geo coordinates.
result: [pending]

### 5. Service Page JSON-LD (Service + FAQ + BreadcrumbList)
expected: View page source on a service page (e.g. /ro/servicii/google-ads). You should see `<script type="application/ld+json">` blocks for Service schema, FAQ schema (with questions/answers), and BreadcrumbList schema.
result: [pending]

### 6. Breadcrumbs on Inner Pages
expected: Visit any inner page (e.g. /ro/despre-noi or /ro/servicii). A breadcrumb trail should be visible (e.g. "Acasa > Despre Noi"). The homepage should NOT show breadcrumbs.
result: [pending]

### 7. Sitemap.xml
expected: Visit /sitemap.xml in the browser. It should return a valid XML document listing all pages in both /ro/ and /en/ locales (around 28 URLs). The /multumim (thank you) page should NOT be listed.
result: [pending]

### 8. Robots.txt
expected: Visit /robots.txt in the browser. It should show `User-agent: *`, `Allow: /`, `Disallow: /multumim`, and a `Sitemap:` reference pointing to the sitemap URL.
result: [pending]

### 9. Vercel Analytics Component
expected: View page source or React DevTools on any page. The `<Analytics />` component from `@vercel/analytics` should be rendered in the layout (visible in the HTML or component tree). Note: actual tracking only works on Vercel deployment.
result: [pending]

### 10. GA4 generate_lead Event on Contact Form
expected: Open browser DevTools Network tab or Console. Submit the contact form successfully. Before the redirect to /multumim, a `dataLayer.push` call with event `generate_lead` should fire. You can verify by typing `window.dataLayer` in console after form submission.
result: [pending]

## Summary

total: 10
passed: 0
issues: 0
pending: 10
skipped: 0

## Gaps

[none yet]
