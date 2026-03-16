# QA Report: Laboratorul de Conversii (Desktop)

**Target:** http://localhost:3000
**Date:** 2026-03-14
**Viewports:** 1366x768 (Laptop), 1920x1080 (Full HD)
**Pages Tested:** 14
**Branch:** rebrand/laboratorul-de-conversii

---

## Executive Summary

| Suite | Score | Issues |
|-------|-------|--------|
| Visual | 90/100 | Stats counters show "0", large whitespace areas on some sections |
| Navigation | 95/100 | Hamburger menu at all desktop widths (intentional design), all links work |
| Forms | 90/100 | Contact form works, newsletter has validation, checkbox without label id |
| Links | 90/100 | 3 empty-href social links on contact page, footer social links have no text |
| Accessibility | 78/100 | 8+ images missing alt text, some form inputs lack associated labels |
| Performance | 92/100 | Good TTFB (43ms), CLS 0, Cal.com script blocked by CSP |
| Responsive | 100/100 | No horizontal overflow at any viewport, all pages render correctly |
| GDPR | 95/100 | Cookie banner works (accept/reject/settings), persists across pages, 1 pre-consent cookie |
| Security | 98/100 | Excellent headers (HSTS, CSP, X-Frame-Options, etc.), CSP blocks Cal.com |
| Footer | 95/100 | All legal links present and working, social links lack visible text |
| SEO | 85/100 | 5 title tags exceed 60 chars, images without alt, strong schema markup |

**Overall Score: 92/100**

---

## Pages Tested

| # | Page | URL |
|---|------|-----|
| 1 | Home | /ro |
| 2 | About | /ro/despre-noi |
| 3 | Services Index | /ro/servicii |
| 4 | Google Ads | /ro/servicii/google-ads |
| 5 | Facebook Ads | /ro/servicii/facebook-ads |
| 6 | TikTok Ads | /ro/servicii/tiktok-ads |
| 7 | SEO | /ro/servicii/seo |
| 8 | Email Marketing | /ro/servicii/email-marketing |
| 9 | Consultanta | /ro/servicii/consultanta-marketing |
| 10 | Contact | /ro/contact |
| 11 | FAQ | /ro/intrebari-frecvente |
| 12 | Privacy Policy | /ro/politica-confidentialitate |
| 13 | Cookie Policy | /ro/politica-cookies |
| 14 | Terms | /ro/termeni-si-conditii |

---

## Suite 1: Visual Layout (90/100)

### Screenshots
- `home-1366.png` / `home-1920.png` - Homepage at both viewports
- `about-1366.png` / `about-1920.png` - About page
- `services-1366.png` / `services-1920.png` - Services index
- `google-ads-1366.png` / `google-ads-1920.png` - Google Ads service
- `facebook-ads-1366.png` / `facebook-ads-1920.png` - Facebook Ads service
- `tiktok-ads-1366.png` / `tiktok-ads-1920.png` - TikTok Ads service
- `seo-1366.png` / `seo-1920.png` - SEO service
- `email-marketing-1366.png` / `email-marketing-1920.png` - Email Marketing
- `consultanta-1366.png` / `consultanta-1920.png` - Consultanta
- `contact-1366.png` / `contact-1920.png` - Contact page
- `faq-1366.png` / `faq-1920.png` - FAQ page
- `privacy-1366.png` / `privacy-1920.png` - Privacy Policy
- `cookies-1366.png` / `cookies-1920.png` - Cookie Policy
- `terms-1366.png` / `terms-1920.png` - Terms

### Findings

| # | Severity | Finding |
|---|----------|---------|
| V1 | MEDIUM | **Stats counters show "0"** on homepage (0+, 0+, 0%, 0ani). Counter animation likely requires scroll-into-view trigger that did not fire during screenshot capture, but may also fail for real users if IntersectionObserver doesn't trigger. |
| V2 | LOW | **Logo warning:** Console warning "Image with src '/ace-agency-logo.webp' has..." appears on every page - likely missing width/height or priority attributes. |
| V3 | LOW | **Hamburger menu on desktop:** Navigation uses a hamburger (3-bar) icon even at 1366px and 1920px. This appears to be an intentional design choice but may confuse desktop users expecting a visible nav bar. |

### Horizontal Overflow
- **1366x768:** NO overflow on all 14 pages
- **1920x1080:** NO overflow on all 14 pages

---

## Suite 2: Navigation (95/100)

### Findings

| # | Severity | Finding |
|---|----------|---------|
| N1 | LOW | **Desktop navigation is hamburger-only.** No visible nav links at 1366px or 1920px. Users must click the hamburger icon to see nav items. |
| N2 | LOW | **"Vezi Portofoliul" button is disabled** in the CTA section on homepage. The portfolio page is marked as V2 but the disabled button may confuse users. |

### Keyboard Navigation (15 Tab stops tested)
All 15 Tab stops had visible focus indicators (outline/box-shadow). Focus order is logical:
1. Logo link -> Hamburger menu -> Contact CTA -> Hero links -> Service cards -> "See all services" -> About link -> Testimonial buttons

---

## Suite 3: Forms (90/100)

### Contact Page Form
- **Fields found:** name (text), email, phone (tel), service (select), message (textarea), honeypot (hidden)
- **Validation:** Empty submit correctly triggers HTML5 validation ("Please fill in this field")
- **Labels:** Form fields use `label` elements with `for` attributes tied to input IDs
- **Honeypot:** Present for spam protection (positioned off-screen at x:-9999)

### Newsletter Form (Homepage + Footer)
- **Fields:** email (required), checkbox (consent required)
- **Count:** 2 newsletter forms (one in main content, one in footer)

### Findings

| # | Severity | Finding |
|---|----------|---------|
| F1 | MEDIUM | **Consent checkbox lacks `name` and `id` attributes** in newsletter forms - cannot be properly associated with a label for accessibility. |
| F2 | LOW | **Contact form uses Server Actions** (hidden $ACTION_REF fields visible in DOM) - modern Next.js pattern, working correctly. |

---

## Suite 4: Links (90/100)

### Link Summary
- **Homepage:** 38 total (35 internal, 3 external) - no issues
- **About:** 30 total - no issues
- **Services:** 37 total - no issues
- **Contact:** 33 total - 3 issues found

### Findings

| # | Severity | Finding |
|---|----------|---------|
| L1 | MEDIUM | **3 empty-href links on contact page.** Social links in the contact info section have empty hrefs with text "li", "in", "fa" - these appear to be truncated social media link labels (LinkedIn, Instagram, Facebook) with broken hrefs. |
| L2 | LOW | **Footer social links have empty text content.** The LinkedIn, Instagram, and Facebook links in the footer contain only SVG icons with no visible text (screen readers may not announce them properly unless aria-label is set). |
| L3 | LOW | **Phone number uses placeholder:** `tel:+40 XXX XXX XXX` - not a real phone number. |

---

## Suite 5: Accessibility (78/100)

### Findings

| # | Severity | Finding |
|---|----------|---------|
| A1 | HIGH | **8 images without alt text on homepage.** All client logo images (techstart.svg, digitalcommerce.svg, etc.) in the "PARTENERI DE INCREDERE" section lack alt text. |
| A2 | HIGH | **3 images without alt on each service detail page.** Feature images and process images on Google Ads, Facebook Ads, TikTok Ads, SEO, Email Marketing, and Consultanta pages lack alt text. (18 total across 6 pages) |
| A3 | MEDIUM | **3 images without alt on Services index page.** Process overview and "why choose" images lack alt text. |
| A4 | MEDIUM | **Newsletter checkbox inputs lack proper `id` and associated `<label for>`.** Screen readers cannot associate the label text with the checkbox. |
| A5 | LOW | **Focus indicators present on all interactive elements** - all 15 tested Tab stops showed visible focus styles. |

### Keyboard Focus Test Results
All elements receive proper focus with visible indicators. Tab order follows logical document flow.

---

## Suite 6: Performance (92/100)

### Core Web Vitals (Homepage)

| Metric | Value | Rating |
|--------|-------|--------|
| TTFB | 43ms | Good |
| DOM Interactive | 161ms | Good |
| DOM Complete | 240ms | Good |
| Load Complete | 240ms | Good |
| CLS | 0.000 | Good |
| LCP | Not measured (observer not triggered) | Unknown |
| DOM Nodes | 859 | Good (<1500) |
| Resources | 34 | Acceptable |
| Transfer Size | 1,463 KB | Acceptable |

### Console Errors

| Error | Page | Severity |
|-------|------|----------|
| `Loading the script 'https://app.cal.com/embed/embed.js'` blocked by CSP | Contact | MEDIUM |
| `Framing 'https://www.google.com/' violates CSP frame-src` | Contact | MEDIUM |
| `Image with src "/ace-agency-logo.webp"` missing dimensions | All pages | LOW |
| `A tree hydrated but some attributes of the server rendered HTML didn't match` | Occasional | LOW |

### Findings

| # | Severity | Finding |
|---|----------|---------|
| P1 | MEDIUM | **Cal.com embed script blocked by CSP.** The Content-Security-Policy does not include `https://app.cal.com` in the `script-src` directive. Add it to allow the scheduling widget to load. |
| P2 | MEDIUM | **Google Maps iframe blocked by CSP frame-src.** The CSP `frame-src` does not include `https://www.google.com` for the maps embed on the contact page. |
| P3 | LOW | **Hydration mismatch warning** appears occasionally - likely caused by client-side date/time rendering differences. |

---

## Suite 7: Responsive / Overflow (100/100)

### Results

| Page | 1366x768 Overflow | 1920x1080 Overflow |
|------|--------------------|--------------------|
| All 14 pages | None | None |

No horizontal overflow detected on any page at either viewport. All content renders within viewport bounds.

---

## Suite 8: GDPR / Cookie Consent (95/100)

### Cookie Banner
- **Present on first visit:** Yes
- **Accept button:** "Accepta toate"
- **Reject button:** "Doar necesare"
- **Settings button:** "Gestioneaza preferintele"
- **Persistence:** Banner stays dismissed across page navigations
- **Footer settings button:** "Setari cookie-uri" available for re-opening preferences

### Findings

| # | Severity | Finding |
|---|----------|---------|
| G1 | LOW | **1 pre-consent cookie set** (NEXT_LOCALE=ro). This is a functional/necessary cookie for locale routing, not a tracking cookie - acceptable under GDPR. |

---

## Suite 9: Security (98/100)

### Security Headers

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | PASS |
| X-Content-Type-Options | nosniff | PASS |
| X-Frame-Options | SAMEORIGIN | PASS |
| Referrer-Policy | strict-origin-when-cross-origin | PASS |
| Permissions-Policy | camera=(), microphone=(), geolocation=(self), interest-cohort=() | PASS |
| Content-Security-Policy | Comprehensive policy present | PASS (with caveats) |
| X-Powered-By | Next.js | LOW (consider removing) |

### Findings

| # | Severity | Finding |
|---|----------|---------|
| S1 | LOW | **X-Powered-By: Next.js** header exposes framework. Consider removing with `poweredByHeader: false` in next.config. |
| S2 | MEDIUM | **CSP does not include Cal.com or Google Maps domains.** `script-src` needs `https://app.cal.com`; `frame-src` needs `https://www.google.com` and `https://maps.google.com`. |

---

## Suite 10: Footer (95/100)

### Footer Structure
- **Logo:** Present with link to home
- **Contact info:** Address (Bucuresti, Romania), phone, email
- **Page links:** Acasa, Despre noi, Servicii, Contact, Intrebari frecvente (5 links)
- **Service links:** All 6 services linked
- **Newsletter:** Email signup form with consent checkbox
- **Social links:** LinkedIn, Instagram, Facebook (3 links)
- **Legal links:** Privacy Policy, Cookie Policy, Terms (3 links)
- **Copyright:** "(c) 2026 Laboratorul de Conversii. Toate drepturile rezervate."
- **Cookie settings button:** Present

### Legal Link Verification

| Link | Loads? | Correct Title? |
|------|--------|----------------|
| /ro/politica-confidentialitate | Yes | "Politica de Confidentialitate" |
| /ro/politica-cookies | Yes | "Politica de Cookies" |
| /ro/termeni-si-conditii | Yes | "Termeni si Conditii" |

### Findings

| # | Severity | Finding |
|---|----------|---------|
| FT1 | LOW | **Footer social links (LinkedIn, Instagram, Facebook) have empty visible text.** They contain only SVG icons. Should have aria-labels for accessibility (verified they do have aria-labels via snapshot). |
| FT2 | LOW | **Phone number is a placeholder** (+40 XXX XXX XXX). |

---

## Suite 11: SEO (85/100)

### Page-by-Page SEO Audit

| Page | Title (len) | Title OK? | Meta Desc (len) | Desc OK? | H1 Count | H1 OK? | Schema Types |
|------|-------------|-----------|------------------|----------|----------|--------|-------------|
| Home | 59 | PASS | 149 | PASS | 1 | PASS | Organization, ProfessionalService, WebSite |
| About | 70 | FAIL (>60) | 121 | PASS | 1 | PASS | Organization, BreadcrumbList |
| Services | 66 | FAIL (>60) | 162 | FAIL (>160) | 1 | PASS | Organization, BreadcrumbList |
| Google Ads | 60 | PASS | 146 | PASS | 1 | PASS | Service, BreadcrumbList, FAQPage |
| Facebook Ads | 54 | PASS | 145 | PASS | 1 | PASS | Service, BreadcrumbList, FAQPage |
| TikTok Ads | 81 | FAIL (>60) | 151 | PASS | 1 | PASS | Service, BreadcrumbList, FAQPage |
| SEO | 86 | FAIL (>60) | 146 | PASS | 1 | PASS | Service, BreadcrumbList, FAQPage |
| Email Mktg | 73 | FAIL (>60) | 154 | PASS | 1 | PASS | Service, BreadcrumbList, FAQPage |
| Consultanta | 65 | FAIL (>60) | 167 | FAIL (>160) | 1 | PASS | Service, BreadcrumbList, FAQPage |
| Contact | 64 | FAIL (>60) | 159 | PASS | 1 | PASS | Organization, BreadcrumbList, FAQPage |
| FAQ | 46 | PASS | 149 | PASS | 1 | PASS | Organization, BreadcrumbList, FAQPage |
| Privacy | 56 | PASS | 130 | PASS | 1 | PASS | Organization, BreadcrumbList |
| Cookies | 46 | PASS | 137 | PASS | 1 | PASS | Organization, BreadcrumbList |
| Terms | 46 | PASS | 143 | PASS | 1 | PASS | Organization, BreadcrumbList |

### Global SEO Checks

| Check | Status |
|-------|--------|
| Single H1 per page | PASS (all 14 pages) |
| Heading hierarchy (no skipping) | PASS (all 14 pages) |
| Canonical URLs | PASS (all 14 pages) |
| Open Graph tags (title, desc, image, url) | PASS (all 14 pages) |
| Twitter Card | PASS (all 14 pages) |
| JSON-LD Schema | PASS (all 14 pages, 2-3 schemas each) |
| Viewport meta | PASS |
| Lang attribute (ro) | PASS |
| Favicon | PASS |
| robots.txt | PASS (correct allow/disallow for AI crawlers) |
| sitemap.xml | PASS (both RO and EN URLs, proper priorities) |
| hreflang headers | PASS (ro, en, x-default) |
| llms.txt | PASS (structured content present) |

### Images Without Alt Text

| Page | Total Images | Without Alt |
|------|-------------|-------------|
| Home | 28 | 8 (client logos) |
| Services Index | 6 | 3 (feature/process images) |
| Google Ads | 6 | 3 |
| Facebook Ads | 6 | 3 |
| TikTok Ads | 6 | 3 |
| SEO | 6 | 3 |
| Email Marketing | 6 | 3 |
| Consultanta | 6 | 3 |
| About | 8 | 0 |
| Contact | 5 | 0 |
| FAQ | 3 | 0 |
| Privacy | 3 | 0 |
| Cookies | 3 | 0 |
| Terms | 3 | 0 |

### Findings

| # | Severity | Finding |
|---|----------|---------|
| SEO1 | MEDIUM | **7 pages have title tags exceeding 60 characters.** About (70), Services (66), TikTok Ads (81), SEO (86), Email Marketing (73), Consultanta (65), Contact (64). Google will truncate these in SERPs. |
| SEO2 | MEDIUM | **2 meta descriptions exceed 160 characters.** Services (162), Consultanta (167). |
| SEO3 | HIGH | **26 images across the site lack alt text.** 8 client logos on homepage + 3 per service page (6 pages) = 26 total. This impacts both SEO and accessibility. |
| SEO4 | LOW | **Sitemap uses production domain (aceagency.ro)** which is expected for a local dev build. |

---

## Recommendations (Priority Order)

### Critical / High Priority
1. **Add alt text to all images** - 26 images missing alt across the site. Client logos should have brand name alt text. Service page feature/process images need descriptive alt text.
2. **Fix CSP to allow Cal.com and Google Maps** - Add `https://app.cal.com` to `script-src` and `https://www.google.com https://maps.google.com` to `frame-src` in the Content-Security-Policy.

### Medium Priority
3. **Shorten title tags** on 7 pages to under 60 characters for optimal SERP display.
4. **Shorten meta descriptions** on Services and Consultanta pages to under 160 characters.
5. **Fix empty-href social links on contact page** - The 3 social links with text "li", "in", "fa" have empty hrefs.
6. **Add `name` and `id` to newsletter checkbox** inputs for proper form/label association.

### Low Priority
7. **Consider adding visible desktop navigation** alongside the hamburger menu for better desktop UX.
8. **Remove X-Powered-By header** with `poweredByHeader: false` in next.config.
9. **Replace placeholder phone number** (+40 XXX XXX XXX) with actual contact number.
10. **Investigate stats counter animation** - "0+" values suggest the counter animation may not trigger reliably for all users.
11. **Add width/height to logo image** to resolve the console warning on every page.
12. **Remove disabled "Vezi Portofoliul" button** or hide it until the portfolio feature is ready.

---

## Test Environment

- **Server:** Next.js dev server (localhost:3000)
- **Browser:** Chromium (Playwright)
- **Viewports:** 1366x768, 1920x1080
- **Date:** 2026-03-14
- **Total screenshots captured:** 28 (14 pages x 2 viewports)
