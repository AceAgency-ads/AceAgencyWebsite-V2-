# QA Report - Tablet Viewport (iPad 768x1024)

**URL:** http://localhost:3000
**Date:** 2026-03-14
**Viewport:** 768x1024 (iPad)
**Pages Tested:** 14 pages

---

## Overall Scores

| Suite | Score | Status |
|-------|-------|--------|
| Visual | 90/100 | PASS |
| Navigation | 85/100 | PASS |
| Forms | 90/100 | PASS |
| Links | 82/100 | NEEDS WORK |
| Accessibility | 75/100 | NEEDS WORK |
| Performance | 95/100 | PASS |
| Responsive | 70/100 | NEEDS WORK |
| GDPR | 60/100 | FAIL |
| Security | 98/100 | PASS |
| Footer | 88/100 | PASS |
| SEO | 82/100 | NEEDS WORK |

**Overall Score: 83/100**

---

## 1. Visual Testing (Score: 90/100)

### Findings

- **PASS** No horizontal overflow detected on any page at 768px
- **PASS** All pages render readable text content
- **PASS** Images load correctly across pages
- **MEDIUM (-5)** Hero section on homepage has awkward layout at 768px - the CTA buttons and descriptive text overlap with the right-side video/image area (see `01-home-full-768.png`)
- **MEDIUM (-5)** Service cards on homepage show only 2 per row at tablet, with some truncation in the grid layout

### Screenshots
- `01-home-full-768.png` - Homepage full page
- `02-about-full.png` - About page
- `03-services-full.png` - Services index
- `04-contact-full.png` - Contact page
- `05-faq-full.png` - FAQ page
- `06-hamburger-open.png` - Hamburger menu open state
- `07-contact-form.png` - Contact form
- `10-facebook-ads.png` through `16-terms.png` - Service and legal pages

---

## 2. Navigation Testing (Score: 85/100)

### Findings

- **PASS** Hamburger menu is correctly displayed at 768px (tablet uses mobile nav)
- **PASS** Hamburger menu opens with overlay, showing 5 navigation links: Acasa, Despre noi, Servicii, Intrebari frecvente, Contact
- **PASS** Language switcher (RO/EN) available in mobile menu
- **HIGH (-15)** Mobile menu close button is intercepted by an overlay element with class `invisible` despite being visible -- the `<div aria-hidden="false" class="invisible fixed inset-0 z-40">` intercepts pointer events on the close button. Users may be unable to close the menu by tapping the X button. Escape key works.

### Evidence
The Playwright error log shows:
> `<div aria-hidden="false" class="invisible fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#262523]">` intercepts pointer events

---

## 3. Forms Testing (Score: 90/100)

### Findings

- **PASS** Contact form has proper required fields: Name (required), Email (required), Message (required), Service (optional)
- **PASS** Contact form uses honeypot anti-spam field
- **PASS** Submit button is type="submit" within a form element
- **PASS** Newsletter forms present in footer and homepage with email validation and GDPR checkbox
- **MEDIUM (-5)** Phone field on contact form is not marked as required but has no format validation hint
- **MEDIUM (-5)** Newsletter form checkbox label ("Sunt de acord cu prelucrarea datelor personale") does not link to the privacy policy

---

## 4. Links Testing (Score: 82/100)

### Findings

- **PASS** No external links missing `rel="noopener"`
- **PASS** No empty link text found on any page
- **PASS** All internal navigation links resolve correctly
- **HIGH (-15)** Contact page has 3 social media links (LinkedIn, Instagram, Facebook) with `href="#"` -- these are non-functional placeholder links
- **LOW (-2)** Footer phone number `tel:+40 XXX XXX XXX` contains spaces and is a placeholder, not a real number (separate from contact page which shows `tel:0750465757`)
- **LOW (-1)** "Dezvoltare Web" service card links to `/ro/servicii` (index) instead of a dedicated service page

### Per-Page Link Issues
| Page | Empty Hrefs | External No-opener | Empty Links |
|------|------------|-------------------|-------------|
| Home | 0 | 0 | 0 |
| About | 0 | 0 | 0 |
| Services | 0 | 0 | 0 |
| Contact | 3 | 0 | 0 |
| FAQ | 0 | 0 | 0 |

---

## 5. Accessibility Testing (Score: 75/100)

### axe-core Results (WCAG 2.1 AA)

| Page | Critical | Serious | Moderate | Minor | Total |
|------|----------|---------|----------|-------|-------|
| Home | 0 | 1 | 0 | 0 | 1 |
| About | 0 | 1 | 0 | 0 | 1 |
| Services | 0 | 1 | 0 | 0 | 1 |
| Contact | 0 | 0 | 0 | 0 | 0 |
| FAQ | 0 | 0 | 0 | 0 | 0 |
| Google Ads | 0 | 1 | 0 | 0 | 1 |
| Privacy | 0 | 1 | 0 | 0 | 1 |

### Violation Details

- **SERIOUS (-15)** `color-contrast` - Elements fail minimum color contrast ratio (WCAG 2.1 AA). Affects 26-28 elements per page. The animated "split-text-word" elements with `aria-hidden="true"` have low opacity (0.15) during/before animation, triggering contrast failures. While these are decorative animation states, axe flags them because they are still in the DOM.
  - Example: `<div class="split-text-word" aria-hidden="true" style="opacity: 0.15">Suntem</div>`
  - Also affects service cards on Google Ads page: `<span class="text-xs text-[#650CBE]">Dezvoltare Web</span>` - purple text on dark background

- **MEDIUM (-5)** 8 images without alt text on homepage (decorative icons in service cards and process section)
- **MEDIUM (-5)** Keyboard focus trap not tested (unable to simulate Tab in Playwright MCP), but focus indicators are present via Tailwind `focus-visible` classes

---

## 6. Performance Testing (Score: 95/100)

### Core Web Vitals (Homepage)

| Metric | Value | Rating |
|--------|-------|--------|
| TTFB | 49ms | Good |
| DOM Complete | 132ms | Good |
| Load Complete | 132ms | Good |
| CLS | 0.000 | Good |
| DOM Nodes | 344 (initial) / 874 (hydrated) | Good |
| Resources | 31 | Good |
| Total Transfer | 950 KB | Good |

### Console Errors

- **MEDIUM (-5)** Contact page: `Loading the script 'https://app.cal.com/embed...'` - Cal.com embed blocked by CSP
- **INFO** Contact page: `Framing 'https://www.google.com/' violates CSP` - Google Maps iframe blocked by CSP `frame-src` directive

### Notes
- Dev server performance; production will differ
- GSAP animations are intentional and documented as accepted PageSpeed trade-off

---

## 7. Responsive Testing (Score: 70/100)

### Findings

- **PASS** No horizontal overflow on any page at 768px
- **PASS** Text is readable across all pages (body text >= 16px)
- **CRITICAL (-25)** Touch targets too small: 22-29 elements per page fail the 44x44px minimum for tablet touch devices

### Touch Target Details (Homepage)

| Element | Size | Issue |
|---------|------|-------|
| Logo link | 32x32px | Below 44px min |
| "Contacteaza-ne" header button | 173x40px | Height below 44px |
| "Vezi toate serviciile" link | 196x40px | Height below 44px |
| Checkbox inputs | 16x16px | Far below 44px min |
| Footer nav links (all) | 280x20px | Height far below 44px |
| Footer legal links | 153x16px | Height far below 44px |
| Phone/email footer links | 280x20px | Height far below 44px |

**Impact:** 23 of 52 interactive elements (44%) on homepage are below the 44px minimum touch target size. This is a significant usability issue on tablet.

---

## 8. GDPR Testing (Score: 60/100)

### Findings

- **CRITICAL (-25)** No cookie consent banner shown on first visit. Cookie consent buttons ("Accepta toate", "Setari cookie-uri") exist only in the footer -- users must scroll to the bottom of the page to consent. GDPR requires prominent, accessible consent before processing.
- **HIGH (-15)** Vercel Analytics script (`va.vercel-scripts.com`) loads before any cookie consent is granted. Analytics data is collected pre-consent, violating GDPR.
- **PASS** Consent state persisted in localStorage (`cookie-consent` key)
- **PASS** Privacy policy page exists at `/ro/politica-confidentialitate`
- **PASS** Cookie policy page exists at `/ro/politica-cookies`
- **PASS** Terms page exists at `/ro/termeni-si-conditii`
- **PASS** Legal links present in footer navigation

### Cookie State on Fresh Visit
- Only `NEXT_LOCALE=ro` cookie set (functional, exempt from consent)

---

## 9. Security Testing (Score: 98/100)

### Security Headers

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | PASS |
| X-Content-Type-Options | nosniff | PASS |
| X-Frame-Options | SAMEORIGIN | PASS |
| Referrer-Policy | strict-origin-when-cross-origin | PASS |
| Permissions-Policy | camera=(), microphone=(), geolocation=(self), interest-cohort=() | PASS |
| Content-Security-Policy | Comprehensive policy with script-src, style-src, img-src, etc. | PASS |

### Notes
- **LOW (-2)** CSP blocks Cal.com embed and Google Maps iframe on contact page (functional issue, not security flaw -- but CSP frame-src should include `https://app.cal.com` and `https://www.google.com/maps`)
- **PASS** No sensitive data exposed in HTML source
- **PASS** Honeypot field present on contact form

---

## 10. Footer Testing (Score: 88/100)

### Findings

- **PASS** Footer contains company info: "Laboratorul tau de conversii din Bucuresti"
- **PASS** Contact section with address (Bucuresti, Romania), phone, email
- **PASS** Navigation links: Acasa, Despre noi, Servicii, Contact, Intrebari frecvente
- **PASS** Service links: All 6 services linked
- **PASS** Newsletter signup form with email + GDPR checkbox
- **PASS** Social media links: LinkedIn, Instagram, Facebook (with icons)
- **PASS** Legal links: Politica de confidentialitate, Politica de cookie-uri, Termeni si conditii
- **PASS** Copyright notice: "2026 Laboratorul de Conversii"
- **PASS** "Setari cookie-uri" button present
- **MEDIUM (-5)** Phone number in footer is placeholder: "+40 XXX XXX XXX" (different from contact page: "0750 465 757")
- **MEDIUM (-5)** Email in footer is "contact@aceagency.ro" but contact page shows "cretualin@aceagency.ro" -- inconsistent
- **LOW (-2)** Footer links have very small touch targets (20px height) on tablet

---

## 11. SEO Testing (Score: 82/100)

### Per-Page SEO Audit

| Page | Title Len | Title OK | Desc Len | Desc OK | H1 | H1 OK | Canonical | OG | Twitter | Schema |
|------|-----------|----------|----------|---------|----|----|-----------|----|---------|----|
| Home | 59 | YES | 149 | YES | 1 | YES | YES | YES | YES | Org, Prof, Web |
| About | 70 | NO | 121 | YES | 1 | YES | YES | YES | YES | Org, Breadcrumb |
| Services | 66 | NO | 162 | NO | 1 | YES | YES | YES | YES | Org, Breadcrumb |
| Contact | 64 | NO | 159 | YES | 1 | YES | YES | YES | YES | Org, Breadcrumb, FAQ |
| FAQ | 46 | YES | 149 | YES | 1 | YES | YES | YES | YES | Org, Breadcrumb, FAQ |
| Google Ads | 60 | YES | 146 | YES | 1 | YES | YES | YES | YES | Service, Breadcrumb, FAQ |
| SEO | 86 | NO | 146 | YES | 1 | YES | YES | YES | YES | Service, Breadcrumb, FAQ |
| Privacy | 56 | YES | 130 | YES | 1 | YES | YES | YES | YES | Org, Breadcrumb |
| Cookies | 46 | YES | 137 | YES | 1 | YES | YES | YES | YES | Org, Breadcrumb |
| Terms | 46 | YES | 143 | YES | 1 | YES | YES | YES | YES | Org, Breadcrumb |

### Issues

- **MEDIUM (-5)** 4 pages have title tags exceeding 60 characters (About: 70, Services: 66, Contact: 64, SEO: 86)
- **MEDIUM (-5)** Services page meta description exceeds 160 chars (162)
- **MEDIUM (-5)** Images without alt text: Home (8), Services (3), Google Ads (3), SEO (3) -- mostly decorative icons
- **LOW (-2)** No `Service` schema on services index page (only on individual service pages)
- **LOW (-1)** Heading hierarchy is clean across all pages (no skipped levels)
- **PASS** All pages have correct lang="ro" attribute
- **PASS** All pages have canonical URLs
- **PASS** All pages have Open Graph and Twitter Card meta
- **PASS** Hreflang alternate links present in HTTP headers

---

## Critical Issues Summary

| Priority | Issue | Suite | Impact |
|----------|-------|-------|--------|
| CRITICAL | No visible cookie consent banner on page load | GDPR | GDPR non-compliance |
| CRITICAL | 44% of interactive elements below 44px touch target | Responsive | Poor tablet usability |
| HIGH | Analytics loaded before consent | GDPR | GDPR violation |
| HIGH | Mobile menu close button intercepted by overlay | Navigation | Users stuck in menu |
| HIGH | Contact page social links are `href="#"` placeholders | Links | Broken functionality |
| MEDIUM | Color contrast failures on animated elements (26+ nodes) | A11y | WCAG 2.1 AA |
| MEDIUM | 8-14 images missing alt text across pages | A11y/SEO | Accessibility gap |
| MEDIUM | Title tags too long on 4 pages | SEO | May truncate in SERPs |
| MEDIUM | Inconsistent phone/email between footer and contact | Footer | User confusion |
| MEDIUM | Cal.com and Google Maps blocked by CSP | Performance | Missing contact features |
| LOW | Footer link touch targets very small (20px) | Responsive | Minor usability |
| LOW | Placeholder phone in footer | Footer | Not production-ready |

---

## Recommendations

### P0 - Must Fix Before Launch
1. **Add visible cookie consent banner** (fixed position, appears on first visit, blocks analytics until consent)
2. **Fix mobile menu close button z-index** - the overlay with class `invisible` intercepts clicks
3. **Increase footer link touch targets** to minimum 44px height with padding
4. **Replace contact page social link placeholders** (`href="#"`) with real URLs or remove

### P1 - Should Fix
5. **Add alt text** to all decorative icons (use `alt=""` for purely decorative, descriptive alt for meaningful icons)
6. **Update CSP** to allow Cal.com embed (`frame-src`) and Google Maps
7. **Fix inconsistent contact info** - standardize phone and email across footer and contact page
8. **Shorten title tags** on About, Services, Contact, and SEO pages to under 60 chars

### P2 - Nice to Have
9. Add `Service` schema to services index page
10. Increase header CTA button height from 40px to 48px for better touch targets
11. Add focus-visible styles audit for keyboard navigation
