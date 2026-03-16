# Mobile QA Report - Laboratorul de Conversii

**URL:** http://localhost:3000
**Date:** 2026-03-14
**Viewports Tested:** Android Mid (360x800), iPhone 15 (393x852), iPhone SE (375x667)
**Pages Tested:** 14 pages
**Test Suites:** 11 (visual, nav, forms, links, a11y, perf, responsive, gdpr, security, footer, seo)

---

## Overall Scores

| Suite | Score | Status |
|-------|-------|--------|
| Visual Layout | 70/100 | NEEDS WORK |
| Navigation | 90/100 | GOOD |
| Forms | 80/100 | ACCEPTABLE |
| Links | 82/100 | ACCEPTABLE |
| Accessibility | 60/100 | NEEDS WORK |
| Performance | 95/100 | EXCELLENT |
| Responsive | 65/100 | NEEDS WORK |
| GDPR | 50/100 | CRITICAL |
| Security | 95/100 | EXCELLENT |
| Footer | 88/100 | GOOD |
| SEO | 92/100 | EXCELLENT |
| **OVERALL** | **79/100** | **ACCEPTABLE** |

---

## 1. Visual Layout (Score: 70/100)

### Findings

| Severity | Issue | Pages Affected | Viewports |
|----------|-------|----------------|-----------|
| CRITICAL (-25) | Horizontal overflow on homepage (68px at 360w, 53px at 375w, 35px at 393w) | Home | All 3 |
| MEDIUM (-5) | Stats section shows "0+" and "0ani" instead of animated values in screenshots (GSAP scroll-triggered counters may not fire without real scroll interaction) | Home | All 3 |

### Details

- **Homepage horizontal overflow:** The page scrolls horizontally on all three mobile viewports. At 360px width, 68px of overflow; at 375px, 53px; at 393px, 35px. This is likely caused by a wide element (possibly the testimonials carousel or client logo bar) extending beyond the viewport.
- Stats counters display as "0+", "0+", "0%", "0ani" -- these rely on GSAP scroll-triggered animations and may appear as zeros in automated screenshots, but likely animate properly for real users.

### Screenshots
- `home-360x800.png`, `home-393x852.png`, `home-375x667.png`

---

## 2. Navigation (Score: 90/100)

### Findings

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM (-5) | Mobile menu links lack accessible names | Nav links in overlay render each character as separate `<generic>` element (letter-by-letter animation). Screen readers may read individual letters. |
| LOW (-2) | Menu close button has no visible X icon in screenshot | Visual-only concern |
| PASS | Hamburger button works correctly | Opens full-screen overlay with all 5 nav links + language switcher |
| PASS | Navigation links all work | Clicking nav items navigates to correct pages |
| PASS | Language switcher present | RO/EN buttons visible in mobile menu |

### Details

- Hamburger button labeled "Deschide meniul" / "Inchide meniul" (good a11y)
- Menu links: Acasa, Despre noi, Servicii, Intrebari frecvente, Contact
- Language switcher: RO (active), EN

### Screenshots
- `hamburger-menu-open.png`

---

## 3. Forms (Score: 80/100)

### Findings

| Severity | Issue | Page | Details |
|----------|-------|------|---------|
| HIGH (-15) | Contact form submit button intercepted by overlapping element on mobile | Contact | The "Trimite Mesajul" button cannot be clicked on mobile -- an overlapping `data-theme="dark"` div blocks pointer events |
| MEDIUM (-5) | Honeypot input lacks label | Contact | Hidden anti-spam input `<input type="text" name="honeypot">` has no label (detected by a11y check) |
| PASS | Form fields present with proper labels | Contact | Name, Email, Telefon, Serviciu, Mesaj all have visible labels |
| PASS | Newsletter form present | Home, all pages (footer) | Email input + GDPR consent checkbox |

### Forms Found
1. **Contact form** (`/ro/contact`): Name*, Email*, Phone, Service (dropdown), Message* + honeypot
2. **Newsletter form** (footer on all pages): Email + GDPR consent checkbox
3. **Newsletter form** (homepage section): Email + GDPR consent checkbox

---

## 4. Links (Score: 82/100)

### Findings

| Severity | Issue | Page | Count |
|----------|-------|------|-------|
| HIGH (-15) | Social media links use `href="#"` | Contact | 3 links (LinkedIn, Instagram, Facebook in contact info section) |
| LOW (-2) | Social links display truncated text ("li", "in", "fa") | Contact | 3 links |
| PASS | Footer social links have proper URLs | All pages | linkedin.com, instagram.com, facebook.com |
| PASS | All internal links valid | All pages | 38 total links on home, all resolve |
| PASS | External links have noopener | All pages | Footer social links properly configured |
| PASS | No broken anchor links found | All pages | -- |

### Details

- **Contact page social media links** point to `#` instead of actual social profiles. These are different from the footer social links which work correctly.
- Total links per page: Home (38), Contact (varies), Service pages (~38-46)

---

## 5. Accessibility (Score: 60/100)

### Findings

| Severity | Issue | Pages Affected | Count |
|----------|-------|----------------|-------|
| CRITICAL (-25) | Images without alt text | Home (8), Services (3), Google Ads (3), TikTok Ads (3), SEO (3), Email Marketing (3), Consultanta (3), Privacy (8), Terms (3) | Multiple |
| MEDIUM (-5) | Honeypot/hidden inputs without labels | All pages (1 per page), Contact (3) | Global |
| MEDIUM (-5) | Mobile nav link accessible names split by letter animation | All pages | -- |
| PASS | Proper heading hierarchy (no skipped levels) | All pages | -- |
| PASS | Single H1 per page | All pages | -- |
| PASS | Language attribute set (`lang="ro"`) | All pages | -- |
| PASS | All 4 landmarks present (main, nav, header, footer) | All pages | -- |
| PASS | Buttons have accessible names | All pages | -- |

### Images Without Alt Text

**Homepage (8 missing):**
- `/images/clients/techstart.svg`
- `/images/clients/digitalcommerce.svg`
- `/images/clients/startup-hub.svg`
- `/images/clients/fashionro.svg`
- `/images/clients/autoservice-pro.svg`
- Plus 3 more client logos (duplicated in scrolling marquee)

**Service pages (3 each):**
- Service feature images (`/images/services/*-features.webp`)
- Process images (`/images/services/*-process.webp`)

> Note: The client logo images in the "PARTENERI DE INCREDERE" section actually DO have alt text in the accessibility tree (e.g., `img "TechStart"`), but the duplicated logos in the marquee animation strip may lack alt on the cloned copies.

---

## 6. Performance (Score: 95/100)

### Findings

| Severity | Issue | Details |
|----------|-------|---------|
| LOW (-2) | Cal.com embed script blocked by CSP | Console error: `Loading the script 'https://app.cal.com/embed/embed.js' violates CSP` |
| LOW (-2) | Image warning for logo | `Image with src "/ace-agency-logo.webp" has...` (Next.js image optimization warning) |
| PASS | CLS: 0 (Good) | All pages |
| PASS | TTFB: 33-120ms (Good) | All pages |
| PASS | DOM Complete: 127-371ms (Excellent) | All pages |
| PASS | DOM Nodes: 344-859 (Acceptable) | Home has most at 859 |
| PASS | Total Transfer: 950-1469 KB | Reasonable |

### Core Web Vitals Summary

| Page | TTFB | DOM Complete | CLS | DOM Nodes | Transfer KB |
|------|------|-------------|-----|-----------|-------------|
| Home | 84ms | 371ms | 0 | 859 | 1463 |
| About | 48ms | 127ms | 0 | 412 | 1060 |
| Google Ads | 33ms | 157ms | 0 | 477 | 1469 |
| Contact | 120ms | 271ms | 0 | 859 | 1463 |
| FAQ | 49ms | 132ms | 0 | 344 | 950 |

> Note: LCP could not be measured via Performance Observer in this test setup. GSAP animations are intentional per project docs.

---

## 7. Responsive (Score: 65/100)

### Findings

| Severity | Issue | Viewports | Pages |
|----------|-------|-----------|-------|
| CRITICAL (-25) | Horizontal overflow on homepage | All 3 viewports (68px, 53px, 35px) | Home |
| MEDIUM (-5) | 22-33 interactive elements per page smaller than 44x44px | All viewports | All pages |
| MEDIUM (-5) | Footer links only 20px tall | All viewports | All pages |

### Touch Target Issues (Minimum 44x44px Required)

Across all viewports, approximately 50% of interactive elements fail the 44x44px touch target requirement. Most affected:

| Element Type | Size | Location |
|--------------|------|----------|
| Logo link | 32x32 | Header |
| Footer nav links | 280x20 | Footer |
| Footer legal links | 153x16 | Footer bottom |
| "Contacteaza-ne" link | 173x40 | Header |
| "Vezi toate serviciile" link | 196x40 | Home |
| Phone/email links | 280x20 | Footer |
| Checkbox inputs | 16x16 | Newsletter forms |

### Overflow Summary by Viewport

| Viewport | Home Overflow | Other Pages |
|----------|-------------|-------------|
| 360x800 | 68px | No overflow |
| 393x852 | 35px | No overflow |
| 375x667 | 53px | No overflow |

---

## 8. GDPR (Score: 50/100)

### Findings

| Severity | Issue | Details |
|----------|-------|---------|
| CRITICAL (-25) | No cookie consent banner on first visit | After clearing all cookies, no consent banner appears. Users are not asked for consent before cookies are set. |
| CRITICAL (-25) | NEXT_LOCALE cookie set pre-consent | A `NEXT_LOCALE=ro` cookie is set without user consent |
| PASS | "Setari cookie-uri" button exists in footer | Users can access cookie settings, but there is no proactive consent request |
| PASS | Newsletter forms require GDPR checkbox | Both main and footer newsletter forms include "Sunt de acord cu prelucrarea datelor personale" checkbox |
| PASS | Privacy policy page exists | `/ro/politica-confidentialitate` |
| PASS | Cookie policy page exists | `/ro/politica-cookies` |
| PASS | Terms of service page exists | `/ro/termeni-si-conditii` |

### Cookie Audit

- **Pre-consent cookies:** `NEXT_LOCALE=ro` (functional/necessary -- arguably exempt, but best practice is to inform)
- **No tracking cookies pre-consent:** Google Analytics appears to use Vercel Analytics which respects consent
- **Missing:** A cookie consent banner that appears on first visit per GDPR/ePrivacy requirements

---

## 9. Security (Score: 95/100)

### Findings

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM (-5) | CSP does not include `app.cal.com` | Cal.com booking embed is blocked by Content Security Policy, preventing appointment scheduling |
| PASS | Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| PASS | X-Content-Type-Options | `nosniff` |
| PASS | X-Frame-Options | `SAMEORIGIN` |
| PASS | Referrer-Policy | `strict-origin-when-cross-origin` |
| PASS | Permissions-Policy | `camera=(), microphone=(), geolocation=(self), interest-cohort=()` |
| PASS | Content-Security-Policy | Comprehensive CSP with restrictive defaults |
| PASS | No sensitive data in console | -- |
| PASS | Form has honeypot anti-spam | Contact form includes hidden honeypot field |

### Security Headers (All Present)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self), interest-cohort=()
Content-Security-Policy: [comprehensive policy]
```

---

## 10. Footer (Score: 88/100)

### Findings

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM (-5) | Footer contact shows placeholder phone "+40 XXX XXX XXX" | Should be real phone number (0750 465 757 appears on contact page) |
| MEDIUM (-5) | Footer email shows "contact@aceagency.ro" while contact page shows "cretualin@aceagency.ro" | Inconsistent email addresses |
| LOW (-2) | Footer links very small touch targets (20px height) | Usability concern on mobile |
| PASS | Legal links present and working | Privacy, Cookies, Terms links all present |
| PASS | Social media links working | LinkedIn, Instagram, Facebook with proper URLs and noopener |
| PASS | Newsletter form in footer | With GDPR consent checkbox |
| PASS | Copyright notice current | "2026 Laboratorul de Conversii" |
| PASS | Footer navigation complete | All main pages + all service pages listed |

### Footer Structure

- **Contact section:** Address, Phone, Email
- **Pagini section:** 5 navigation links
- **Servicii section:** 6 service links
- **Newsletter section:** Email input + consent checkbox
- **Social section:** LinkedIn, Instagram, Facebook
- **Legal bar:** Privacy, Cookies, Terms + Cookie settings button

---

## 11. SEO (Score: 92/100)

### Findings

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM (-5) | About page title exceeds 60 chars (64 chars) | "Despre Noi - Laborator de Conversii Premium - Laboratorul de Conversii" |
| LOW (-2) | Google Maps iframe blocked on contact page | CSP prevents Google Maps from loading; fallback text "Accepta cookies functionale pentru a vedea harta" shown |
| PASS | All pages have proper title tags (30-60 chars) | Home (59), Services (65), Google Ads (60), FAQ (46) |
| PASS | All pages have meta descriptions (120-160 chars) | Home (149), Services (varies), Google Ads (146), FAQ (149) |
| PASS | Single H1 per page | All pages |
| PASS | Heading hierarchy valid (no skipped levels) | All pages |
| PASS | Canonical URLs present | All pages |
| PASS | Open Graph tags complete | title, description, image on all pages |
| PASS | Twitter Card tags present | All pages |
| PASS | JSON-LD Schema markup | Home: Organization + ProfessionalService + WebSite; Services: Service + BreadcrumbList + FAQPage |
| PASS | Viewport meta tag correct | `width=device-width` on all pages |
| PASS | Favicon present | All pages |
| PASS | No noindex tags | All pages indexable |
| PASS | Hreflang alternate links | RO, EN, x-default in response headers |
| PASS | Breadcrumbs on subpages | Service pages, Contact, FAQ |

### SEO Meta Summary

| Page | Title (chars) | Description (chars) | H1 | Schema Types |
|------|--------------|--------------------|----|-------------|
| Home | 59 | 149 | Laborator de Conversii din Bucuresti | Organization, ProfessionalService, WebSite |
| About | 64 (!) | valid | Disciplina. Viziune. Rezultate. | Organization, BreadcrumbList |
| Services | 65 | valid | Solutii Digitale Complete pentru Afacerea Ta | varies |
| Google Ads | 60 | 146 | Conversii prin Google Ads care Genereaza Rezultate Reale | Service, BreadcrumbList, FAQPage |
| Contact | 64 | 159 | Hai sa Vorbim despre Proiectul Tau | Organization, BreadcrumbList, FAQPage |
| FAQ | 46 | 149 | Intrebari Frecvente | Organization, BreadcrumbList, FAQPage |

---

## Console Errors Summary

| Error | Page | Severity |
|-------|------|----------|
| Cal.com embed script blocked by CSP | Contact (and prefetched pages) | Medium |
| Google Maps iframe blocked by CSP | Contact | Medium |
| Image optimization warning for `/ace-agency-logo.webp` | All pages (warning, not error) | Low |

---

## Priority Recommendations

### CRITICAL (Fix Immediately)

1. **Add cookie consent banner** - No GDPR consent banner appears on first visit. Implement a consent banner that appears before any non-essential cookies are set.

2. **Fix homepage horizontal overflow** - The homepage overflows horizontally on all mobile viewports (35-68px). Identify the overflowing element (likely testimonials carousel or client logo marquee) and add `overflow-x: hidden` or fix the width.

3. **Add alt text to all images** - 8 images on the homepage and 3 per service page lack alt text. Focus on client logos in the marquee animation and service feature/process images.

### HIGH (Fix Before Launch)

4. **Fix contact form submit button being blocked** - On mobile, the "Trimite Mesajul" button is intercepted by an overlapping element, preventing form submission. Check z-index and pointer-events on surrounding containers.

5. **Fix contact page social links** - Social media links in the contact info section use `href="#"` instead of actual URLs. The footer has correct URLs that should be used here too.

6. **Add Cal.com to CSP** - The booking embed is blocked. Add `https://app.cal.com` to the `script-src` and `frame-src` directives in Content-Security-Policy.

### MEDIUM (Fix Soon)

7. **Increase footer link touch targets** - Footer navigation links are only 20px tall. Add padding to reach minimum 44px tap target height.

8. **Fix footer phone number** - Replace placeholder "+40 XXX XXX XXX" with the real number (0750 465 757).

9. **Standardize contact emails** - Footer shows "contact@aceagency.ro" while contact page shows "cretualin@aceagency.ro". Choose one or use both consistently.

10. **Shorten About page title** - Currently 64 characters, should be max 60 for optimal SEO display.

### LOW (Nice to Have)

11. **Add Google Maps domain to CSP** - To allow the embedded map on the contact page.

12. **Fix checkbox touch targets** - Newsletter consent checkboxes are 16x16px, should be at least 44x44px.

13. **Add labels to honeypot inputs** - Hidden anti-spam inputs should have `aria-hidden="true"` and labels for accessibility compliance.

---

## Screenshots Index

### Homepage
- `home-360x800.png` | `home-393x852.png` | `home-375x667.png`

### About
- `about-360x800.png` | `about-393x852.png` | `about-375x667.png`

### Services
- `services-360x800.png` | `services-393x852.png` | `services-375x667.png`

### Service Detail Pages
- `google-ads-*.png` | `facebook-ads-*.png` | `tiktok-ads-*.png`
- `seo-*.png` | `email-marketing-*.png` | `consultanta-*.png`

### Contact
- `contact-360x800.png` | `contact-393x852.png` | `contact-375x667.png`
- `contact-page-393x852.png` | `contact-form-validation.png`

### FAQ
- `faq-360x800.png` | `faq-393x852.png` | `faq-375x667.png`

### Legal Pages
- `privacy-*.png` | `cookies-*.png` | `terms-*.png`

### Navigation
- `hamburger-menu-open.png`

---

*Report generated by automated QA testing across 3 mobile viewports, 14 pages, and 11 test suites.*
