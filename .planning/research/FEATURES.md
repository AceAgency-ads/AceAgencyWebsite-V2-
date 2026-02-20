# Feature Research

**Domain:** Premium digital agency website (marketing / lead generation)
**Researched:** 2026-02-20
**Confidence:** HIGH (competitor briefs + current 2026 industry sources)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features a premium agency visitor assumes exist. Missing these = site feels amateur and loses the lead.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Responsive design (320px–2560px) | Every site must work on mobile; 94% of users judge credibility by design | LOW | Mobile-first, 48x48px tap targets, 16px min body font |
| Clear navigation with sticky header | Visitors orient quickly or bounce; navigation is the map | LOW | Hamburger on mobile, locale switcher integrated |
| Hero section with headline + CTA | Landing zone — the one chance to hook; absence kills first impression | LOW | Large typography, single primary action, no carousel |
| Services overview | Agencies must communicate what they sell immediately | LOW | Cards or grid layout, each service links to sub-page |
| Individual service pages (6 pages) | SEO requires dedicated pages; visitors researching a specific service expect depth | MEDIUM | Each needs H1, structured content, FAQ schema, CTA |
| Contact form | Primary conversion mechanism; missing = leads go nowhere | MEDIUM | React Hook Form + Zod, honeypot, Resend delivery |
| Social media links | Trust signal; agencies must be findable on social | LOW | LinkedIn, Instagram, Facebook in footer |
| Analytics (GA4 + GTM) | Required for any lead-gen site; no tracking = blind operation | LOW | Vercel Analytics + GA4 + GTM event tracking |
| Cookie consent + GDPR banner | Legally mandatory in Romania/EU; Google penalizes non-compliance | MEDIUM | Granular consent: analytics, marketing, functional |
| Privacy policy / Cookie policy / ToS pages | Legal requirement in EU; also trust signal | LOW | Static pages in both RO and EN |
| Meta tags + Open Graph + Twitter Card | Expected by crawlers and social sharing; missing = broken previews | LOW | Title ≤60 chars, meta description ≤155 chars, OG image |
| Schema markup JSON-LD | Expected for local business ranking; without it, local pack is inaccessible | MEDIUM | Organization, LocalBusiness, Service, FAQ, BreadcrumbList |
| Canonical URLs | SEO hygiene — bilingual site creates duplicate content risk | LOW | Per-page canonical, hreflang for RO/EN |
| About page | Visitors researching the agency; trust requires a face and a story | LOW | Agency story, values, mission, vision |
| FAQ page | Reduces support friction and captures long-tail SEO keywords | LOW | With FAQPage schema markup |
| Footer with key links + contact info | Navigation anchor; Google also uses footer for site structure | LOW | Address, phone, email, social, legal links |
| Mobile-optimized contact information | Tappable phone number, clickable email | LOW | `tel:` and `mailto:` links |
| Bilingual support (RO/EN) | Romanian agency, targeting local market + international clients | MEDIUM | next-intl, locale switcher in nav, hreflang tags |
| Core Web Vitals compliance | Google ranking signal; poor scores = search penalty | HIGH | LCP <2.5s, INP <200ms, CLS <0.1 — ongoing commitment |
| Newsletter signup | Lead capture below transaction threshold; builds re-marketing list | LOW | Single email field, Resend integration, GDPR opt-in |

---

### Differentiators (Competitive Advantage)

Features that separate AceAgency from cookie-cutter agency sites. These are the proof of creative capability — the website IS the portfolio.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-triggered reveal animations | Transforms static page into interactive journey; keeps visitors engaged; perceived professionalism +18% (UXPilot 2026 data) | HIGH | Framer Motion ScrollTimeline; CSS animation-timeline for perf |
| Dark/light section transitions | Addifico.com signature — alternating background zones create rhythm and visual interest without color overload | MEDIUM | Coordinated in Tailwind via section-level class toggling |
| Bento-grid layouts | "Contained clarity" — high information density with premium app-like feel; 23% faster task completion vs linear layouts | MEDIUM | CSS Grid with container queries; tiles self-adapt at breakpoints |
| Zero stock photos in main sections | Instantly differentiates from template sites; forces authentic visual identity; addifico.com inspiration | LOW | Line-art icons, typography, geometric shapes instead |
| Line-art icon system (Lucide + custom) | Consistent visual language; more premium than filled icons; scales without quality loss | LOW | Lucide React base; custom SVG icons per service if needed |
| Large typography as design element | Typography IS the design; bold headlines eliminate need for hero imagery | LOW | Glacial Indifference headlines at 80–120px; kinetic text on hover |
| Stats/track record section with large numbers | Converts "trust us" into "here's proof"; video testimonials +80% conversion | LOW | Animated counters on scroll entry (Framer Motion) |
| Testimonials in bento/stacked card format | Superior to carousels — carousels hide 95%+ of testimonials; bento "5+pagination" shows top social proof at all times | MEDIUM | Overlapping card design (addifico style) or bento 5-tile grid |
| Custom cursor effect | Micro-interaction that immediately signals premium craft; rewards exploration | MEDIUM | Morphing cursor (blend-mode invert or custom SVG); disable on touch devices |
| Parallax background motion | Depth perception on scroll; distinguishes from flat static competitors | MEDIUM | GSAP ScrollTrigger; scrub=true for smooth parallax |
| Section transition animations (GSAP) | Seamless page feel; scroll "locks" briefly per section to control pacing | HIGH | GSAP ScrollTrigger pinning + page transitions |
| Cal.com booking embed | Lower friction than contact form for high-intent visitors; discovery call directly schedulable | MEDIUM | Cal.com over Calendly: open-source, more customizable |
| Local SEO landing pages | Captures "agentie marketing Bucuresti/Cluj" searches; structural advantage over competitors ignoring local intent | MEDIUM | `/agentie-marketing-bucuresti`, `/agentie-marketing-cluj` with LocalBusiness schema |
| Kinetic/animated typography | Headlines that animate in on load or scroll; makes the above-fold experience memorable | MEDIUM | Framer Motion `initial`/`animate` + staggered text reveal |
| Hover micro-interactions on cards | Service cards, testimonial cards feel alive; signals attention to detail that clients associate with design quality | LOW | CSS `transform: scale(1.02)` + box-shadow transition; Framer Motion `whileHover` |
| GSAP page transitions | Cross-page transitions that maintain premium feel between pages | HIGH | GSAP + Next.js App Router; requires layout coordination |
| Performance-first animation strategy | Animations that run at 60fps on mobile; agency proves speed AND beauty together | HIGH | GPU-only transforms, `will-change`, `requestAnimationFrame` discipline |

---

### Anti-Features (Things to Deliberately NOT Build)

Features that seem desirable but create concrete problems for a premium agency site.

| Anti-Feature | Why Requested | Why Problematic | What to Do Instead |
|--------------|---------------|-----------------|-------------------|
| Interstitial / full-screen popup on mobile | "Capture leads immediately" | Google penalizes mobile interstitials since 2017; bad for Core Web Vitals (CLS); degrades user experience; signals spam | Inline newsletter signup in hero or footer; sticky bottom bar after 30s |
| Chatbot / live chat widget (aggressive auto-open) | "Engage visitors proactively" | Auto-opening chat = annoying; adds render-blocking JS; perceived as low-quality; AI chat without real value = theatre | Contact form + Cal.com booking; subtle chat icon that users initiate |
| Video background in hero | "Impressive and immersive" | Destroys LCP; uses massive bandwidth; autoplaying video is bad for accessibility; hard to achieve 90+ PageSpeed | GSAP/Framer Motion scroll animations with static assets; animated gradient or CSS motion |
| Carousel/slider for services or testimonials | "Show more with less space" | Hides 95%+ of content from users; bad for SEO (hidden content); creates interaction confusion; mobile swiping competes with scroll | Bento grid for testimonials; horizontal scrolling service row; paginated grid |
| Agency blog (V1) | "Content marketing for SEO" | Requires CMS, editorial workflow, ongoing content investment; empty blog is worse than no blog (thin content penalty) | Defer to V2; add FAQ page instead for quick SEO wins |
| Portfolio / case studies (V1) | "Social proof from real work" | Requires content creation, client approval, professional photography; incomplete portfolio = weak social proof | Stats section with big numbers; strong testimonial section; defer full portfolio to V2 |
| Heavy 3D WebGL effects | "Premium and memorable" | Crashes mobile browsers; destroys PageSpeed scores; accessibility nightmare; rarely aligns with agency brand | Bento grid + scroll animations with Framer Motion; 2D depth via parallax and layering |
| Social proof notification popups ("John from Bucharest just contacted us") | "Real-time trust" | Fake or scripted feel; distracts from content; spammy perception; GDPR concerns around real data display | Static testimonials in bento layout; logos of clients worked with |
| Excessive font families | "Expressive brand" | Each font family = separate HTTP request; performance hit; visual incoherence; Google penalizes slow sites | Three fonts maximum: Glacial Indifference (headings), Red Hat Display (subheadings), Inter (body) |
| Dark mode toggle (user-controlled) | "Accessibility and preference" | Site design is dark-dominant with section transitions; user toggle creates complex design states; doubles QA surface | Design with deliberate dark/light section alternation; use `prefers-color-scheme` media query only if brand allows full-light variant |
| CMS integration (V1) | "Easy content updates later" | Adds infrastructure complexity, authentication, and API dependency; slows V1 delivery; content rarely changes post-launch for agency sites | Hardcode content in next-intl JSON files; add CMS in V2 when content velocity justifies it |
| User accounts / client portal | "Clients can track their campaigns" | Out of scope for V1; adds auth complexity; reporting tools (Google Ads, Meta Business) already exist | Link directly to relevant platform dashboards from Contact/Servicii pages |

---

## Feature Dependencies

```
Bilingual Support (next-intl)
    └──requires──> All page content in ro.json + en.json
                       └──requires──> Content strategy + copywriting (RO primary)

Contact Form (React Hook Form + Zod)
    └──requires──> Resend API key + email templates
    └──requires──> Honeypot anti-spam field
    └──enhances──> Newsletter signup (shared Resend config)

Cal.com Booking
    └──requires──> Cal.com account + event type setup
    └──enhances──> Contact page (complementary to form)

Analytics (GA4 + GTM)
    └──requires──> Cookie Consent banner (GDPR — analytics requires opt-in)
    └──requires──> GTM container ID + GA4 measurement ID

Schema Markup (JSON-LD)
    └──requires──> Final page URLs (canonical structure locked)
    └──requires──> Service page content (Service schema per page)
    └──requires──> FAQ content (FAQPage schema on FAQ + service pages)

Local SEO Landing Pages
    └──requires──> Schema markup (LocalBusiness with address)
    └──requires──> Bilingual support (locale routing)

Scroll-triggered Animations (Framer Motion + GSAP)
    └──requires──> Performance budget defined (Core Web Vitals targets)
    └──conflicts──> Video background hero (CLS + LCP conflict)

Bento Grid Testimonials
    └──enhances──> Stats Section (combined social proof section)
    └──conflicts──> Testimonial Carousel (design pattern conflict — choose one)

Cookie Consent Banner
    └──blocks──> GA4 / GTM loading (must wait for consent)
    └──requires──> Privacy Policy page (links from banner)
    └──requires──> Cookie Policy page (links from banner)

Core Web Vitals compliance
    └──conflicts──> Video backgrounds, WebGL, heavy 3D (performance budget)
    └──requires──> Image optimization (next/image, WebP, srcset)
    └──requires──> Animation performance discipline (GPU-only transforms)
```

### Dependency Notes

- **Analytics requires Cookie Consent:** GA4 and GTM must not fire until granular consent is given. Implement consent-first loading (GTM consent mode v2).
- **Schema markup requires final URLs:** Do not write canonical or BreadcrumbList schema until URL structure is locked. URL changes after schema = crawl errors.
- **Scroll animations conflict with video backgrounds:** Both target LCP and CLS. Video backgrounds are eliminated; scroll animations are the differentiator.
- **Testimonial carousel conflicts with bento grid:** Pick one pattern per page. Bento grid is recommended (addifico.com inspiration + superior UX).
- **Bilingual support requires all content in both languages:** Every hardcoded string must be in ro.json and en.json before page is complete.

---

## MVP Definition

### Launch With (V1)

Minimum to achieve "premium agency website that generates leads" — the stated core value.

- [x] Homepage (hero, services preview, stats, testimonials, CTA) — brand first impression
- [x] About page (story, values, mission) — trust second
- [x] Services index page — navigation hub
- [x] 6 individual service pages — SEO surface + conversion pages
- [x] Contact page (form + Cal.com booking + Google Maps) — primary conversion point
- [x] Bilingual support (RO/EN) — required for target market
- [x] Contact form (Zod + Resend + honeypot) — lead capture mechanism
- [x] Cookie consent + GDPR pages — legally non-negotiable in Romania/EU
- [x] Analytics (GA4 + GTM + Vercel Analytics) — measure from day one
- [x] Schema markup (Organization, LocalBusiness, Service, FAQ, BreadcrumbList) — local SEO foundation
- [x] Scroll-triggered animations (Framer Motion) — the primary visual differentiator
- [x] Bento-grid / component-driven design — addifico.com inspiration, differentiates from templates
- [x] Core Web Vitals compliance (90+ PageSpeed mobile) — Google ranking signal

### Add After Validation (V1.x)

Features that add value once V1 is live and generating traffic:

- [ ] Local SEO landing pages (/agentie-marketing-bucuresti, /agentie-marketing-cluj) — add when local search traffic becomes a tracked goal
- [ ] FAQ page (/intrebari-frecvente) — add once common sales questions are documented
- [ ] GSAP page transitions — add in polish phase if Framer Motion animations prove insufficient
- [ ] Custom cursor effect — add as finishing touch, low-risk enhancement
- [ ] Newsletter email automation sequences — add once list starts growing

### Future Consideration (V2+)

Features requiring significant additional infrastructure or content investment:

- [ ] Blog + CMS (Sanity/Contentful) — requires editorial workflow, ongoing content strategy
- [ ] Portfolio / Case Studies — requires client content, approvals, professional production
- [ ] Team page (Echipa) — requires team photography and bios
- [ ] Client portal / reporting dashboard — separate product scope

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Homepage (hero + sections) | HIGH | MEDIUM | P1 |
| Contact form + Resend | HIGH | LOW | P1 |
| Bilingual (next-intl) | HIGH | MEDIUM | P1 |
| Cookie consent + GDPR | HIGH | MEDIUM | P1 |
| Schema markup JSON-LD | HIGH | LOW | P1 |
| Service pages (6x) | HIGH | MEDIUM | P1 |
| Scroll-triggered animations | HIGH | HIGH | P1 |
| Bento-grid / component design | HIGH | MEDIUM | P1 |
| Cal.com booking embed | MEDIUM | LOW | P1 |
| Analytics (GA4 + GTM) | HIGH | LOW | P1 |
| Core Web Vitals compliance | HIGH | HIGH | P1 |
| About page | MEDIUM | LOW | P1 |
| Stats section | HIGH | LOW | P1 |
| Testimonials section | HIGH | LOW | P1 |
| Newsletter signup | MEDIUM | LOW | P1 |
| Local SEO landing pages | MEDIUM | LOW | P2 |
| FAQ page | MEDIUM | LOW | P2 |
| Custom cursor | LOW | MEDIUM | P2 |
| GSAP page transitions | LOW | HIGH | P2 |
| Blog + CMS | MEDIUM | HIGH | P3 |
| Portfolio / Case Studies | HIGH | HIGH | P3 |
| Team page | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add after core validation
- P3: Deferred to V2+

---

## Competitor Feature Analysis

| Feature | addifico.com (primary reference) | creativelabs.art (internal benchmark) | AceAgency Approach |
|---------|----------------------------------|--------------------------------------|-------------------|
| Hero design | Large typography, zero stock photos, component-driven | High visual quality | Large type, Electric Violet/Mint palette, zero stock photos |
| Navigation | Sticky, minimal, clean | Clean | Sticky header, locale switcher (RO/EN), hamburger mobile |
| Service presentation | Cards with line-art icons | Service cards | Bento or icon-card grid with hover micro-interactions |
| Animations | Scroll-triggered reveals, smooth dark/light transitions | Custom animations (GSAP) | Framer Motion reveals + GSAP ScrollTrigger + dark/light section transitions |
| Layout | Bento-grid in multiple sections | Custom grid | Bento-grid for services, stats, testimonials |
| Testimonials | Stacked/overlapping card carousel | Testimonial section | Bento-tile layout (5 top + pagination) — no carousel |
| Stats section | Large numbers, bold type | Present | Animated counters (count-up on scroll) |
| Stock photos | None in main sections | Minimal | Zero stock photos in main sections — line-art + typography |
| Contact | Form + possible booking | Contact form | Form + Cal.com booking + Google Maps |
| Footer | Grid of social links as cards + integrated form | Standard footer | Social card grid + newsletter form + legal links |
| SEO | Not publicly evaluated | Not evaluated | Full technical SEO: schema, hreflang, canonical, Core Web Vitals |
| Multilingual | Not evident | Not evident | RO primary + EN secondary (next-intl) |
| Cookie consent | Not evaluated | Not evaluated | Granular GDPR banner (legally required) |

---

## Sources

- addifico.com competitor analysis — `.brief/competitors.md` (project-specific)
- creativelabs.art internal quality benchmark — `.brief/competitors.md`
- Project scope and requirements — `.planning/PROJECT.md`, `.brief/scope.md`
- [Bento Grid Web Design Modular Trend 2026 — Desinance](https://desinance.com/design/bento-grid-web-design/)
- [14 Web Design Trends 2026 — UXPilot](https://uxpilot.ai/blogs/web-design-trends-2026)
- [Bento Grids & Beyond: 7 UI Trends 2026 — WriterDock](https://writerdock.in/blog/bento-grids-and-beyond-7-ui-trends-dominating-web-design-2026)
- [The death of the carousel: animated bento grid for testimonials — Medium](https://medium.com/design-bootcamp/the-death-of-the-carousel-why-i-switched-to-an-animated-bento-grid-for-testimonials-aab96e09a4a9)
- [Premium agency website UX patterns 2026 — WebSearch synthesis]
- [Social Proof Impact on Conversions 2026 — Genesys Growth](https://genesysgrowth.com/blog/social-proof-conversion-stats-for-marketing-leaders)
- [Schema Markup 2026 Critical for SERP Visibility — ALM Corp](https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/)
- [How Pop-ups Affect SEO 2025 — TDMP](https://www.tdmp.co.uk/insights/how-do-pop-ups-affect-seo-2025)
- [8 Best Digital Agency Websites 2026 — Cam Gomersall](https://www.camgomersall.com/blog/best-digital-agency-websites)
- [11 Best Marketing Agency Websites 2026 — Framer Blog](https://www.framer.com/blog/marketing-agency-websites/)
- [Digital Agency Website Design 2026 — Digital Agency Network](https://digitalagencynetwork.com/inspiring-digital-agency-website-design/)

---

*Feature research for: Premium digital agency website (AceAgency)*
*Researched: 2026-02-20*
