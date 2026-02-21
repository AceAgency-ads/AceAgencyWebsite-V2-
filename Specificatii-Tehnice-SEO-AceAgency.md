

**SPECIFICATII TEHNICE SEO**

AceAgency.ro

Document tehnic pentru developer / coder  
Site codat manual (fara CMS)

Februarie 2026 | Versiunea 1.0

# **Cuprins**

*Nota: Click dreapta \> Update Field dupa deschidere pentru cuprins complet.*

# **1\. Structura HTML de Baza \- Fiecare Pagina**

Fiecare pagina a site-ului TREBUIE sa respecte aceasta structura HTML5 semantica. Codul de mai jos este template-ul de baza pe care se construieste orice pagina.

## **1.1 Template HTML complet (obligatoriu)**

| \<\!DOCTYPE html\> \<html lang="ro"\> \<head\>   \<\!-- META TAGS ESENTIALE \--\>   \<meta charset="UTF-8"\>   \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>   \<meta http-equiv="X-UA-Compatible" content="IE=edge"\>     \<\!-- TITLE TAG \- Max 60 caractere, keyword la inceput \--\>   \<title\>Agentie Marketing Digital | Google Ads, SEO, AI \- AceAgency\</title\>     \<\!-- META DESCRIPTION \- Max 155 caractere, include CTA \--\>   \<meta name="description" content="Agentie de marketing digital din     Romania. Servicii Google Ads, Facebook Ads, TikTok Ads, SEO si     strategie completa. Rezultate masurabile. Solicita oferta gratuita."\>     \<\!-- CANONICAL URL \- OBLIGATORIU pe fiecare pagina \--\>   \<link rel="canonical" href="https://aceagency.ro/pagina-curenta"\>     \<\!-- OPEN GRAPH (Facebook/LinkedIn sharing) \--\>   \<meta property="og:type" content="website"\>   \<meta property="og:title" content="Agentie Marketing Digital \- AceAgency"\>   \<meta property="og:description" content="Aceeasi descriere ca meta description"\>   \<meta property="og:image" content="https://aceagency.ro/images/og-image.jpg"\>   \<meta property="og:url" content="https://aceagency.ro/pagina-curenta"\>   \<meta property="og:site\_name" content="AceAgency"\>   \<meta property="og:locale" content="ro\_RO"\>     \<\!-- TWITTER CARD \--\>   \<meta name="twitter:card" content="summary\_large\_image"\>   \<meta name="twitter:title" content="Agentie Marketing Digital \- AceAgency"\>   \<meta name="twitter:description" content="Aceeasi descriere"\>   \<meta name="twitter:image" content="https://aceagency.ro/images/og-image.jpg"\>     \<\!-- FAVICON \--\>   \<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"\>   \<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"\>   \<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"\>   \<link rel="manifest" href="/site.webmanifest"\>     \<\!-- HREFLANG (daca ai versiune EN in viitor) \--\>   \<link rel="alternate" hreflang="ro" href="https://aceagency.ro/pagina"\>     \<\!-- PRELOAD FONTURI CRITICE (daca folosesti fonturi custom) \--\>   \<link rel="preload" href="/fonts/font-name.woff2" as="font"     type="font/woff2" crossorigin\>     \<\!-- CSS \- inline critical, async restul \--\>   \<style\>/\* Critical CSS inline \- above the fold \*/\</style\>   \<link rel="preload" href="/css/style.css" as="style"     onload="this.onload=null;this.rel='stylesheet'"\>   \<noscript\>\<link rel="stylesheet" href="/css/style.css"\>\</noscript\>     \<\!-- SCHEMA MARKUP (JSON-LD) \- INAINTE DE \</head\> \--\>   \<script type="application/ld+json"\>   {     "@context": "https://schema.org",     "@type": "Organization",     ...schema specific paginii...   }   \</script\>     \<\!-- Google Tag Manager \--\>   \<script\>(function(w,d,s,l,i){...})(window,document,'script',     'dataLayer','GTM-XXXXXX');\</script\> \</head\>   \<body\>   \<\!-- Google Tag Manager (noscript) \--\>   \<noscript\>\<iframe src="https://www.googletagmanager.com/ns.html?     id=GTM-XXXXXX"\>\</iframe\>\</noscript\>     \<\!-- HEADER SEMANTIC \--\>   \<header\>     \<nav aria-label="Navigatie principala"\>       \<\!-- Logo ca link catre homepage \--\>       \<a href="/" aria-label="AceAgency \- Pagina principala"\>         \<img src="/images/logo.svg" alt="AceAgency Logo"           width="180" height="50" loading="eager"\>       \</a\>       \<\!-- Meniu navigare \--\>       \<ul\>         \<li\>\<a href="/servicii/google-ads"\>Google Ads\</a\>\</li\>         \<li\>\<a href="/servicii/facebook-ads"\>Facebook Ads\</a\>\</li\>         \<li\>\<a href="/servicii/tiktok-ads"\>TikTok Ads\</a\>\</li\>         \<li\>\<a href="/servicii/seo"\>SEO\</a\>\</li\>         \<li\>\<a href="/blog"\>Blog\</a\>\</li\>         \<li\>\<a href="/contact"\>Contact\</a\>\</li\>       \</ul\>     \</nav\>   \</header\>     \<\!-- MAIN CONTENT \--\>   \<main\>     \<\!-- BREADCRUMBS (pe toate paginile, nu pe homepage) \--\>     \<nav aria-label="Breadcrumb"\>       \<ol itemscope itemtype="https://schema.org/BreadcrumbList"\>         \<li itemprop="itemListElement" itemscope           itemtype="https://schema.org/ListItem"\>           \<a itemprop="item" href="/"\>             \<span itemprop="name"\>Acasa\</span\>           \</a\>           \<meta itemprop="position" content="1"\>         \</li\>         \<li itemprop="itemListElement" itemscope           itemtype="https://schema.org/ListItem"\>           \<span itemprop="name"\>Pagina Curenta\</span\>           \<meta itemprop="position" content="2"\>         \</li\>       \</ol\>     \</nav\>       \<\!-- UN SINGUR H1 PE PAGINA \- cu keyword principal \--\>     \<h1\>Titlul Paginii cu Cuvantul Cheie\</h1\>       \<\!-- Content organizat cu H2, H3 \--\>     \<section\>       \<h2\>Subtitlu cu keyword secundar\</h2\>       \<p\>Paragraf cu content relevant...\</p\>     \</section\>       \<section\>       \<h2\>Alt subtitlu\</h2\>       \<h3\>Sub-subtitlu\</h3\>       \<p\>Content...\</p\>     \</section\>   \</main\>     \<\!-- FOOTER SEMANTIC \--\>   \<footer\>     \<div\>       \<\!-- Link-uri interne importante \--\>       \<nav aria-label="Link-uri servicii"\>         \<h4\>Servicii\</h4\>         \<ul\>           \<li\>\<a href="/servicii/google-ads"\>Google Ads\</a\>\</li\>           \<li\>\<a href="/servicii/facebook-ads"\>Facebook Ads\</a\>\</li\>           \<\!-- ... \--\>         \</ul\>       \</nav\>       \<\!-- Date contact \--\>       \<div\>         \<h4\>Contact\</h4\>         \<address\>           \<a href="tel:+40XXXXXXXXX"\>+40 XXX XXX XXX\</a\>           \<a href="mailto:contact@aceagency.ro"\>contact@aceagency.ro\</a\>         \</address\>       \</div\>     \</div\>     \<p\>\&copy; 2026 AceAgency. Toate drepturile rezervate.\</p\>   \</footer\>     \<\!-- JS la sfarsit, cu defer/async \--\>   \<script src="/js/main.js" defer\>\</script\> \</body\> \</html\> |
| :---- |

# **2\. Structura URL-urilor**

## **2.1 Reguli obligatorii URL-uri**

* **Doar lowercase:** /servicii/google-ads NU /Servicii/Google-Ads

* **Separator cratima:** /email-marketing NU /email\_marketing sau /emailmarketing

* **Fara extensii:** /servicii/seo NU /servicii/seo.html

* **Fara parametri in URL-uri de content:** /blog/titlu-articol NU /blog?id=123

* **Fara diacritice:** /servicii NU /servicii (cu cedila)

* **Fara trailing slash:** /servicii/seo NU /servicii/seo/

* **Scurte si descriptive:** max 3-4 cuvinte dupa domeniu pe segment

* **HTTPS obligatoriu:** redirect 301 de la http la https

* **www redirect:** alege www SAU non-www si fa redirect 301 (recomand non-www)

## **2.2 Harta completa URL-uri**

| Pagina | URL | Title Tag |
| :---- | :---- | :---- |
| Homepage | / | Agentie Marketing Digital Romania | Google Ads, SEO, AI \- AceAgency |
| Google Ads | /servicii/google-ads | Servicii Google Ads | Agentie Google Ads Romania \- AceAgency |
| Facebook Ads | /servicii/facebook-ads | Servicii Facebook Ads | Agentie Facebook Ads \- AceAgency |
| TikTok Ads | /servicii/tiktok-ads | Servicii TikTok Ads | Publicitate TikTok Romania \- AceAgency |
| SEO | /servicii/seo | Servicii SEO Romania | Optimizare SEO Profesionala \- AceAgency |
| Email Marketing | /servicii/email-marketing | Servicii Email Marketing | Campanii Email \- AceAgency |
| Consultanta | /servicii/consultanta-marketing | Consultanta Marketing Digital Romania \- AceAgency |
| Blog (index) | /blog | Blog Marketing Digital | Ghiduri si Strategii \- AceAgency |
| Blog articol | /blog/titlu-articol-seo | \[Titlu Articol\] \- AceAgency Blog |
| Portofoliu | /portofoliu | Portofoliu si Studii de Caz | Rezultate \- AceAgency |
| Despre noi | /despre-noi | Despre AceAgency | Echipa de Marketing Digital |
| Contact | /contact | Contact AceAgency | Solicita Oferta Gratuita |
| FAQ | /intrebari-frecvente | Intrebari Frecvente Marketing Digital \- AceAgency |
| Local Bucuresti | /agentie-marketing-bucuresti | Agentie Marketing Digital Bucuresti \- AceAgency |
| Local Cluj | /agentie-marketing-cluj | Agentie Marketing Digital Cluj \- AceAgency |
| Politica cookie | /politica-cookies | Politica Cookie-uri \- AceAgency |
| Politica confidentialitate | /politica-confidentialitate | Politica de Confidentialitate \- AceAgency |
| Termeni | /termeni-si-conditii | Termeni si Conditii \- AceAgency |

## **2.3 Redirect-uri .htaccess / server config**

Configureaza pe server (Apache .htaccess, Nginx conf, sau Node.js middleware):

| \# FORTA HTTPS RewriteEngine On RewriteCond %{HTTPS} off RewriteRule ^(.\*)$ https://%{HTTP\_HOST}%{REQUEST\_URI} \[L,R=301\]   \# REDIRECT www \-\> non-www RewriteCond %{HTTP\_HOST} ^www\\.aceagency\\.ro \[NC\] RewriteRule ^(.\*)$ https://aceagency.ro/$1 \[L,R=301\]   \# ELIMINA trailing slash RewriteCond %{REQUEST\_FILENAME} \!-d RewriteRule ^(.\*)/$ /$1 \[L,R=301\]   \# ELIMINA .html din URL-uri RewriteCond %{REQUEST\_FILENAME} \!-d RewriteRule ^(.+)\\.html$ /$1 \[L,R=301\] |
| :---- |

# **3\. Ierarhia Heading-urilor (H1-H6)**

## **3.1 Reguli stricte**

* **UN SINGUR H1 pe pagina** \- acesta este titlul principal al paginii

* **H1 TREBUIE sa contina cuvantul cheie principal** al paginii respective

* **Ordine ierarhica:** H1 \> H2 \> H3 \> H4. NU sari de la H1 la H3 fara H2

* **NU folosi heading-uri pentru stilizare.** Daca ai nevoie de text mare, foloseste CSS, nu H2

* **Fiecare H2 \= o sectiune majora** a paginii, cu keyword secundar

* **H3 \= subsectiuni** in cadrul unui H2

## **3.2 Exemplu corect \- Pagina Servicii SEO**

| \<h1\>Servicii SEO Romania \- Optimizare Profesionala pentru Afacerea Ta\</h1\>     \<h2\>Ce Inseamna SEO si De Ce Ai Nevoie\</h2\>     \<p\>Content despre SEO...\</p\>     \<h2\>Serviciile Noastre de SEO\</h2\>     \<h3\>SEO Tehnic (Technical SEO)\</h3\>       \<p\>Content...\</p\>     \<h3\>Optimizare On-Page\</h3\>       \<p\>Content...\</p\>     \<h3\>Optimizare Off-Page si Link Building\</h3\>       \<p\>Content...\</p\>     \<h2\>Procesul Nostru de Lucru\</h2\>     \<h3\>Pasul 1: Audit SEO Initial\</h3\>     \<h3\>Pasul 2: Strategie si Implementare\</h3\>     \<h3\>Pasul 3: Monitorizare si Raportare\</h3\>     \<h2\>Cat Costa Serviciile SEO?\</h2\>     \<p\>Content despre preturi...\</p\>     \<h2\>Intrebari Frecvente despre SEO\</h2\>     \<\!-- FAQ Schema aici \--\>     \<h2\>Solicita o Consultatie SEO Gratuita\</h2\>     \<\!-- CTA \+ formular \--\> |
| :---- |

## **3.3 Title Tags si Meta Descriptions per pagina**

| REGULI TITLE TAG: Max 60 caractere. Keyword principal la INCEPUT. Include brand la sfarsit dupa | sau \-. Unic pe fiecare pagina (nu repeta acelasi title). Format recomandat: Keyword Principal | Detaliu \- AceAgency |
| :---- |

| REGULI META DESCRIPTION: Max 155 caractere. Include keyword-ul principal natural. Include un CTA (Solicita oferta, Afla mai mult). Unica pe fiecare pagina. NU va fi folosita direct ca factor de ranking, dar influenteaza CTR-ul din Google. |
| :---- |

# **4\. Schema Markup (JSON-LD) \- Obligatoriu**

Schema Markup ajuta Google sa inteleaga continutul paginilor si sa afiseze rich snippets (rating, FAQ, breadcrumbs, etc.). Se pune in \<head\> ca script JSON-LD.

## **4.1 Organization Schema (pe TOATE paginile)**

| \<script type="application/ld+json"\> {   "@context": "https://schema.org",   "@type": "Organization",   "name": "AceAgency",   "url": "https://aceagency.ro",   "logo": "https://aceagency.ro/images/logo.png",   "description": "Agentie de marketing digital din Romania...",   "address": {     "@type": "PostalAddress",     "addressLocality": "Bucuresti",     "addressCountry": "RO"   },   "contactPoint": {     "@type": "ContactPoint",     "telephone": "+40-XXX-XXX-XXX",     "contactType": "customer service",     "areaServed": "RO",     "availableLanguage": "Romanian"   },   "sameAs": \[     "https://www.facebook.com/aceagency",     "https://www.linkedin.com/company/aceagency",     "https://www.instagram.com/aceagency"   \] } \</script\> |
| :---- |

## **4.2 LocalBusiness Schema (Homepage \+ pagini locale)**

| \<script type="application/ld+json"\> {   "@context": "https://schema.org",   "@type": "ProfessionalService",   "name": "AceAgency \- Agentie Marketing Digital",   "image": "https://aceagency.ro/images/office.jpg",   "url": "https://aceagency.ro",   "telephone": "+40-XXX-XXX-XXX",   "email": "contact@aceagency.ro",   "address": {     "@type": "PostalAddress",     "streetAddress": "Strada Exemplu nr. X",     "addressLocality": "Bucuresti",     "postalCode": "XXXXXX",     "addressCountry": "RO"   },   "geo": {     "@type": "GeoCoordinates",     "latitude": 44.4268,     "longitude": 26.1025   },   "openingHoursSpecification": {     "@type": "OpeningHoursSpecification",     "dayOfWeek": \["Monday","Tuesday","Wednesday","Thursday","Friday"\],     "opens": "09:00",     "closes": "18:00"   },   "priceRange": "$$",   "areaServed": {     "@type": "Country",     "name": "Romania"   } } \</script\> |
| :---- |

## **4.3 Service Schema (pe paginile de servicii)**

| \<script type="application/ld+json"\> {   "@context": "https://schema.org",   "@type": "Service",   "name": "Servicii Google Ads",   "description": "Management profesional campanii Google Ads...",   "provider": {     "@type": "Organization",     "name": "AceAgency",     "url": "https://aceagency.ro"   },   "areaServed": {     "@type": "Country",     "name": "Romania"   },   "serviceType": "Google Ads Management" } \</script\> |
| :---- |

## **4.4 FAQ Schema (pe paginile cu intrebari frecvente)**

| \<script type="application/ld+json"\> {   "@context": "https://schema.org",   "@type": "FAQPage",   "mainEntity": \[     {       "@type": "Question",       "name": "Cat costa serviciile de marketing digital?",       "acceptedAnswer": {         "@type": "Answer",         "text": "Preturile variaza in functie de complexitate..."       }     },     {       "@type": "Question",       "name": "In cat timp vad rezultate din SEO?",       "acceptedAnswer": {         "@type": "Answer",         "text": "Rezultatele SEO apar de obicei in 3-6 luni..."       }     }   \] } \</script\> |
| :---- |

## **4.5 BreadcrumbList Schema (pe TOATE paginile, nu homepage)**

| \<script type="application/ld+json"\> {   "@context": "https://schema.org",   "@type": "BreadcrumbList",   "itemListElement": \[     {       "@type": "ListItem",       "position": 1,       "name": "Acasa",       "item": "https://aceagency.ro"     },     {       "@type": "ListItem",       "position": 2,       "name": "Servicii SEO",       "item": "https://aceagency.ro/servicii/seo"     }   \] } \</script\> |
| :---- |

## **4.6 Article Schema (pe articolele de blog)**

| \<script type="application/ld+json"\> {   "@context": "https://schema.org",   "@type": "Article",   "headline": "Titlul Articolului",   "description": "Descriere scurta a articolului...",   "image": "https://aceagency.ro/images/blog/articol.jpg",   "author": {     "@type": "Person",     "name": "Alin",     "url": "https://aceagency.ro/despre-noi"   },   "publisher": {     "@type": "Organization",     "name": "AceAgency",     "logo": {       "@type": "ImageObject",       "url": "https://aceagency.ro/images/logo.png"     }   },   "datePublished": "2026-02-09",   "dateModified": "2026-02-09",   "mainEntityOfPage": {     "@type": "WebPage",     "@id": "https://aceagency.ro/blog/titlu-articol"   } } \</script\> |
| :---- |

# **5\. Sitemap XML si Robots.txt**

## **5.1 Sitemap.xml**

Fisierul sitemap.xml trebuie generat automat si actualizat la fiecare adaugare de pagina/articol. Se pune la https://aceagency.ro/sitemap.xml

| \<?xml version="1.0" encoding="UTF-8"?\> \<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\>     \<\!-- HOMEPAGE \- prioritate maxima \--\>   \<url\>     \<loc\>https://aceagency.ro/\</loc\>     \<lastmod\>2026-02-09\</lastmod\>     \<changefreq\>weekly\</changefreq\>     \<priority\>1.0\</priority\>   \</url\>     \<\!-- PAGINI SERVICII \- prioritate ridicata \--\>   \<url\>     \<loc\>https://aceagency.ro/servicii/google-ads\</loc\>     \<lastmod\>2026-02-09\</lastmod\>     \<changefreq\>monthly\</changefreq\>     \<priority\>0.9\</priority\>   \</url\>     \<url\>     \<loc\>https://aceagency.ro/servicii/facebook-ads\</loc\>     \<lastmod\>2026-02-09\</lastmod\>     \<changefreq\>monthly\</changefreq\>     \<priority\>0.9\</priority\>   \</url\>     \<\!-- ... restul paginilor de servicii ... \--\>     \<\!-- BLOG INDEX \--\>   \<url\>     \<loc\>https://aceagency.ro/blog\</loc\>     \<lastmod\>2026-02-09\</lastmod\>     \<changefreq\>weekly\</changefreq\>     \<priority\>0.8\</priority\>   \</url\>     \<\!-- ARTICOLE BLOG \- adaugate automat \--\>   \<url\>     \<loc\>https://aceagency.ro/blog/titlu-articol\</loc\>     \<lastmod\>2026-02-09\</lastmod\>     \<changefreq\>monthly\</changefreq\>     \<priority\>0.7\</priority\>   \</url\>     \<\!-- PAGINI SECUNDARE \--\>   \<url\>     \<loc\>https://aceagency.ro/contact\</loc\>     \<lastmod\>2026-02-09\</lastmod\>     \<changefreq\>monthly\</changefreq\>     \<priority\>0.6\</priority\>   \</url\>   \</urlset\> |
| :---- |

## **5.2 Robots.txt**

Se pune la https://aceagency.ro/robots.txt

| User-agent: \* Allow: /   \# Blocheaza directoare care nu trebuie indexate Disallow: /admin/ Disallow: /api/ Disallow: /private/ Disallow: /tmp/ Disallow: /\*.json$   \# Sitemap location Sitemap: https://aceagency.ro/sitemap.xml |
| :---- |

| IMPORTANT: Niciodata NU pune Disallow: / (blocheaza TOT site-ul). Niciodata NU bloca /css/ sau /js/ \- Google are nevoie de ele pentru rendering. Dupa configurare, verifica in Google Search Console \> Robots.txt Tester. |
| :---- |

# **6\. Optimizare Imagini**

## **6.1 Reguli obligatorii imagini**

* **Format:** WebP ca format principal (cu fallback JPG). PNG doar pentru logo/icoane cu transparenta.

* **Compresie:** Max 100KB pentru imagini decorative, max 200KB pentru hero images. Foloseste TinyPNG sau Squoosh.

* **Dimensiuni:** Nu incarca imagini 4000px daca le afisezi la 800px. Resize la dimensiunea maxima de afisare.

* **Responsive:** Foloseste srcset si sizes pentru a servi imagini potrivite device-ului.

* **Lazy loading:** loading="lazy" pe TOATE imaginile EXCEPTAND prima imagine vizibila (hero/logo).

* **Width si height:** OBLIGATORIU pe fiecare \<img\> pentru a preveni CLS (Cumulative Layout Shift).

* **Alt text:** Descriptiv, include keyword NATURAL (nu keyword stuffing). Max 125 caractere.

* **Naming:** Foloseste nume descriptive: servicii-google-ads.webp NU IMG\_20240101.jpg

## **6.2 Exemplu cod imagine corect**

| \<\!-- IMAGINE HERO (above the fold) \- NU lazy load \--\> \<img   src="/images/hero-marketing-digital.webp"   alt="Echipa AceAgency lucrand la strategie marketing digital"   width="1200"   height="600"   loading="eager"   fetchpriority="high"   decoding="async" \>   \<\!-- IMAGINE IN CONTENT \- CU lazy load si srcset \--\> \<picture\>   \<source     srcset="/images/seo-audit-400.webp 400w,            /images/seo-audit-800.webp 800w,            /images/seo-audit-1200.webp 1200w"     sizes="(max-width: 600px) 400px,            (max-width: 900px) 800px,            1200px"     type="image/webp"   \>   \<img     src="/images/seo-audit-800.jpg"     alt="Raport audit SEO AceAgency cu analiza cuvinte cheie"     width="800"     height="450"     loading="lazy"     decoding="async"   \> \</picture\> |
| :---- |

## **6.3 Structura folder imagini**

| /images/   /logo.svg              \<- Logo vectorial   /logo.png              \<- Logo raster (pentru schema)   /og-image.jpg          \<- Open Graph default (1200x630px)   /favicon-32x32.png   /favicon-16x16.png   /apple-touch-icon.png  \<- 180x180px   /hero-\*.webp           \<- Hero images   /servicii/             \<- Imagini pagini servicii   /blog/                 \<- Imagini articole blog   /portofoliu/           \<- Imagini studii de caz   /team/                 \<- Poze echipa |
| :---- |

# **7\. Performanta si Core Web Vitals**

Google masoara 3 metrici principale numite Core Web Vitals. Site-ul TREBUIE sa le respecte pe toate pentru a nu fi penalizat in ranking.

| Metrica | Ce masoara | Target | Cum se obtine |
| :---- | :---- | :---- | :---- |
| LCP (Largest Contentful Paint) | Timpul pana se incarca cel mai mare element vizibil | Sub 2.5 secunde | Optimizeaza hero image, preload fonts, server rapid |
| FID / INP (Interaction to Next Paint) | Timpul de raspuns la prima interactiune | Sub 200ms | Minimizeaza JS, defer non-critical, nu bloca main thread |
| CLS (Cumulative Layout Shift) | Cat de mult se misca elementele pe ecran | Sub 0.1 | Width/height pe imagini, font-display swap, no injected content |

## **7.1 Checklist tehnic performanta**

* **Minifica CSS si JS:** Foloseste build tools (PostCSS, Terser, esbuild). Serveste .min.css / .min.js

* **Gzip / Brotli:** Activeaza compresie pe server. Brotli e mai eficient.

* **Cache headers:** Seteaza Cache-Control cu max-age lung pe assets statice (images, CSS, JS).

* **Critical CSS inline:** CSS-ul necesar pentru above-the-fold trebuie inline in \<head\>.

* **JS defer/async:** TOATE scripturile cu defer sau async. Niciodata JS blocant in \<head\>.

* **Preload resurse critice:** Fonturi, hero image, CSS principal.

* **Font-display: swap:** In CSS @font-face, adauga font-display: swap; pentru a evita FOIT.

* **Limiteaza fonturile:** Max 2 familii de fonturi, max 3-4 weights total.

* **CDN:** Serveste assets statice prin CDN (Cloudflare gratuit).

* **HTTP/2 sau HTTP/3:** Activeaza pe server pentru multiplexing.

## **7.2 Exemplu Cache Headers (server config)**

| \# Apache .htaccess \<IfModule mod\_expires.c\>   ExpiresActive On   ExpiresByType image/webp "access plus 1 year"   ExpiresByType image/jpeg "access plus 1 year"   ExpiresByType image/png "access plus 1 year"   ExpiresByType image/svg+xml "access plus 1 year"   ExpiresByType text/css "access plus 1 month"   ExpiresByType application/javascript "access plus 1 month"   ExpiresByType font/woff2 "access plus 1 year" \</IfModule\>   \# Brotli compression \<IfModule mod\_brotli.c\>   AddOutputFilterByType BROTLI\_COMPRESS text/html text/css   AddOutputFilterByType BROTLI\_COMPRESS application/javascript   AddOutputFilterByType BROTLI\_COMPRESS application/json   AddOutputFilterByType BROTLI\_COMPRESS image/svg+xml \</IfModule\> |
| :---- |

| TEST OBLIGATORIU: Dupa lansare, testeaza FIECARE pagina pe: Google PageSpeed Insights (target: 90+ pe mobile), GTmetrix.com, si Google Search Console \> Core Web Vitals. Rezolva toate issue-urile rosu/portocaliu. |
| :---- |

# **8\. Internal Linking (Legaturi Interne)**

Internal linking ajuta Google sa descopere si sa inteleaga structura site-ului, si distribuie "link juice" (autoritate) intre pagini. Este unul dintre cele mai subestimate dar puternice instrumente SEO.

## **8.1 Reguli internal linking**

* **Fiecare pagina trebuie sa aiba minim 3-5 link-uri interne** catre alte pagini relevante.

* **Anchor text descriptiv:** "servicii SEO profesionale" NU "click aici" sau "afla mai mult".

* **Link-uri contextuale:** Integreaza link-urile natural in text, nu le pune izolate.

* **Homepage linkuieste catre TOATE paginile de servicii** din meniu si din content.

* **Fiecare articol de blog linkuieste catre** 1-2 pagini de servicii relevante si 1-2 alte articole.

* **Paginile de servicii linkuiesc reciproc** catre articolele de blog relevante.

* **Footer contine link-uri catre** TOATE paginile principale.

* **NU folosi nofollow** pe link-uri interne (niciodata).

## **8.2 Harta internal linking**

| De pe pagina | Linkuieste catre | Anchor text exemplu |
| :---- | :---- | :---- |
| Homepage | Toate paginile de servicii | servicii Google Ads, optimizare SEO, etc. |
| Homepage | Ultimele 3 articole blog | Titlul articolului |
| Servicii Google Ads | Blog: Cat costa Google Ads | cat costa promovarea pe Google |
| Servicii Google Ads | Servicii Facebook Ads | publicitate Facebook Ads |
| Servicii SEO | Blog: Ce inseamna SEO | afla ce inseamna SEO |
| Servicii SEO | Portofoliu / Studii de caz | vezi rezultatele noastre SEO |
| Blog articol | 1-2 pagini servicii relevante | serviciile noastre de \[serviciu\] |
| Blog articol | 1-2 alte articole blog | citeste si: \[titlu articol\] |
| Pagina Contact | Paginile de servicii | servicii de marketing digital |
| FAQ | Paginile de servicii relevante | link catre serviciul mentionat |

# **9\. Mobile-First Design**

Google foloseste Mobile-First Indexing \- adica evalueaza VERSIUNEA MOBILE a site-ului, nu desktop-ul. Site-ul TREBUIE sa fie perfect pe mobil.

## **9.1 Reguli mobile obligatorii**

* **Viewport meta tag:** \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>

* **Responsive design:** Layout-ul se adapteaza la ORICE dimensiune de ecran (320px \- 2560px).

* **Font size minim 16px:** Text-ul body trebuie sa fie lizibil fara zoom.

* **Tap targets minim 48x48px:** Butoane si link-uri trebuie sa fie usor de apasat cu degetul.

* **Spatiu intre tap targets:** Minim 8px intre elemente clickabile.

* **NU folosi popup-uri intrusive pe mobil:** Google penalizeaza interstitials pe mobil.

* **Menu hamburger:** Meniu colapsabil pe mobil, cu animatie smooth.

* **Imagini responsive:** srcset \+ sizes (vezi sectiunea 6).

* **Formular-uri simple:** Campuri mari, label-uri vizibile, autocomplete attributes.

* **Testeaza cu Chrome DevTools:** Device Mode pe iPhone SE, iPhone 14, Pixel 7, iPad.

## **9.2 Media queries minime recomandate**

| /\* MOBILE FIRST \- stilurile de baza sunt pentru mobil \*/   /\* Telefoane mici \*/ /\* Default: 320px+ (stilul de baza) \*/   /\* Telefoane mari \*/ @media (min-width: 480px) { }   /\* Tablete portrait \*/ @media (min-width: 768px) { }   /\* Tablete landscape / laptop mic \*/ @media (min-width: 1024px) { }   /\* Desktop \*/ @media (min-width: 1280px) { }   /\* Desktop mare \*/ @media (min-width: 1536px) { } |
| :---- |

# **10\. Securitate si Elemente Tehnice**

## **10.1 SSL / HTTPS**

* **Certificat SSL obligatoriu:** Let's Encrypt (gratuit) sau certificat platit.

* **TOATE resursele prin HTTPS:** Imagini, CSS, JS, fonturi \- totul pe HTTPS. Niciun mixed content.

* **HSTS header:** Strict-Transport-Security: max-age=31536000; includeSubDomains

## **10.2 Security headers recomandate**

| \# Apache .htaccess sau Nginx conf Header set X-Content-Type-Options "nosniff" Header set X-Frame-Options "SAMEORIGIN" Header set X-XSS-Protection "1; mode=block" Header set Referrer-Policy "strict-origin-when-cross-origin" Header set Permissions-Policy "camera=(), microphone=(), geolocation=()" Header set Strict-Transport-Security "max-age=31536000; includeSubDomains" |
| :---- |

## **10.3 Pagina 404 custom**

Creeaza o pagina 404 personalizata care ajuta utilizatorul sa gaseasca ce cauta. NU redirecta 404 catre homepage (Google penalizeaza asta).

| \<\!-- /404.html \- Status code 404 (NU 200\!) \--\> \<main\>   \<h1\>Pagina nu a fost gasita\</h1\>   \<p\>Ne pare rau, pagina pe care o cauti nu exista sau a fost mutata.\</p\>     \<h2\>Poate te intereseaza:\</h2\>   \<ul\>     \<li\>\<a href="/"\>Pagina principala\</a\>\</li\>     \<li\>\<a href="/servicii/google-ads"\>Servicii Google Ads\</a\>\</li\>     \<li\>\<a href="/servicii/seo"\>Servicii SEO\</a\>\</li\>     \<li\>\<a href="/blog"\>Blog\</a\>\</li\>     \<li\>\<a href="/contact"\>Contact\</a\>\</li\>   \</ul\>     \<\!-- Formular cautare optional \--\>   \<form action="/search" method="GET"\>     \<input type="search" name="q" placeholder="Cauta pe site..."\>     \<button type="submit"\>Cauta\</button\>   \</form\> \</main\> |
| :---- |

## **10.4 Redirecturi 301 (daca schimbi URL-uri)**

Daca un URL se schimba vreodata, OBLIGATORIU seteaza redirect 301 de la vechiul URL la noul URL. Niciodata nu lasa un URL vechi sa duca la 404\.

| \# Exemplu redirect 301 Redirect 301 /pagina-veche https://aceagency.ro/pagina-noua   \# Sau cu RewriteRule RewriteRule ^servicii-marketing$ /servicii/consultanta-marketing \[R=301,L\] |
| :---- |

# **11\. Formulare, CTA-uri si Tracking Conversii**

## **11.1 Formular de contact SEO-friendly**

| \<form action="/api/contact" method="POST" id="contact-form"\>   \<\!-- Honeypot anti-spam (ascuns cu CSS) \--\>   \<div style="display:none" aria-hidden="true"\>     \<input type="text" name="website" tabindex="-1" autocomplete="off"\>   \</div\>     \<div\>     \<label for="name"\>Nume complet \*\</label\>     \<input type="text" id="name" name="name" required       autocomplete="name" placeholder="Numele tau"\>   \</div\>     \<div\>     \<label for="email"\>Email \*\</label\>     \<input type="email" id="email" name="email" required       autocomplete="email" placeholder="email@exemplu.ro"\>   \</div\>     \<div\>     \<label for="phone"\>Telefon\</label\>     \<input type="tel" id="phone" name="phone"       autocomplete="tel" placeholder="+40 XXX XXX XXX"\>   \</div\>     \<div\>     \<label for="service"\>Serviciul care te intereseaza\</label\>     \<select id="service" name="service"\>       \<option value=""\>Selecteaza...\</option\>       \<option value="google-ads"\>Google Ads\</option\>       \<option value="facebook-ads"\>Facebook Ads\</option\>       \<option value="tiktok-ads"\>TikTok Ads\</option\>       \<option value="seo"\>SEO\</option\>       \<option value="email-marketing"\>Email Marketing\</option\>       \<option value="consultanta"\>Consultanta completa\</option\>     \</select\>   \</div\>     \<div\>     \<label for="message"\>Mesaj \*\</label\>     \<textarea id="message" name="message" rows="5" required       placeholder="Spune-ne despre proiectul tau..."\>\</textarea\>   \</div\>     \<button type="submit"\>Trimite mesajul\</button\> \</form\> |
| :---- |

## **11.2 Event tracking GA4 (Google Analytics)**

Configureaza aceste evenimente in Google Tag Manager sau direct in cod:

| // Trimite formular contact gtag("event", "generate\_lead", {   event\_category: "Contact",   event\_label: "Formular Contact",   value: 1 });   // Click pe buton telefon gtag("event", "click\_phone", {   event\_category: "Contact",   event\_label: "Click Telefon Header" });   // Click pe buton WhatsApp gtag("event", "click\_whatsapp", {   event\_category: "Contact",   event\_label: "Click WhatsApp" });   // Scroll 50% pe pagina serviciu // (configureaza in GTM cu Scroll Depth trigger) |
| :---- |

# **12\. Checklist Final \- Inainte de Lansare**

Coderul trebuie sa verifice FIECARE punct din aceasta lista inainte de a lansa site-ul live.

## **12.1 HTML & SEO On-Page**

| \# | Verificare | Status |
| :---- | :---- | :---- |
| 1 | Fiecare pagina are DOCTYPE html si lang="ro" | \[ \] |
| 2 | Fiecare pagina are un SINGUR H1 unic cu keyword | \[ \] |
| 3 | Ierarhia heading-urilor e corecta (H1\>H2\>H3, fara sarituri) | \[ \] |
| 4 | Title tag unic pe fiecare pagina (max 60 char) | \[ \] |
| 5 | Meta description unica pe fiecare pagina (max 155 char) | \[ \] |
| 6 | Canonical URL pe fiecare pagina | \[ \] |
| 7 | Open Graph tags pe fiecare pagina | \[ \] |
| 8 | Breadcrumbs pe toate paginile (nu homepage) | \[ \] |
| 9 | Internal links (min 3-5 per pagina) | \[ \] |
| 10 | Anchor text descriptiv (nu "click aici") | \[ \] |
| 11 | Alt text pe TOATE imaginile | \[ \] |
| 12 | Width si height pe TOATE imaginile | \[ \] |

## **12.2 Technical SEO**

| \# | Verificare | Status |
| :---- | :---- | :---- |
| 1 | HTTPS activ, redirect de la HTTP | \[ \] |
| 2 | Redirect www \-\> non-www (sau invers) cu 301 | \[ \] |
| 3 | Sitemap.xml generat si valid | \[ \] |
| 4 | Robots.txt corect (nu blocheaza nimic important) | \[ \] |
| 5 | Pagina 404 custom (cu status code 404, nu 200\) | \[ \] |
| 6 | URL-uri curate (lowercase, cratima, fara extensii) | \[ \] |
| 7 | Trailing slash eliminat cu redirect 301 | \[ \] |
| 8 | Google Search Console configurat | \[ \] |
| 9 | Google Analytics (GA4) instalat si functional | \[ \] |
| 10 | Google Tag Manager instalat | \[ \] |
| 11 | Sitemap submis in Search Console | \[ \] |
| 12 | Schema markup valid (testat cu Rich Results Test) | \[ \] |

## **12.3 Performanta**

| \# | Verificare | Status |
| :---- | :---- | :---- |
| 1 | PageSpeed Insights: 90+ pe mobile | \[ \] |
| 2 | LCP sub 2.5 secunde | \[ \] |
| 3 | CLS sub 0.1 | \[ \] |
| 4 | INP sub 200ms | \[ \] |
| 5 | CSS si JS minificate | \[ \] |
| 6 | Gzip/Brotli compression activa | \[ \] |
| 7 | Cache headers setate pe assets statice | \[ \] |
| 8 | Imagini optimizate (WebP, comprimate, responsive) | \[ \] |
| 9 | Fonturi preloaded cu font-display: swap | \[ \] |
| 10 | JS defer/async, niciun script blocant | \[ \] |

## **12.4 Mobile**

| \# | Verificare | Status |
| :---- | :---- | :---- |
| 1 | Viewport meta tag prezent | \[ \] |
| 2 | Design responsive pe toate device-urile | \[ \] |
| 3 | Font size min 16px pe body text | \[ \] |
| 4 | Tap targets min 48x48px | \[ \] |
| 5 | Fara horizontal scroll pe mobil | \[ \] |
| 6 | Meniu hamburger functional | \[ \] |
| 7 | Testat pe Chrome DevTools (min 3 device-uri) | \[ \] |
| 8 | Mobile-Friendly Test Google: PASS | \[ \] |

## **12.5 Securitate**

| \# | Verificare | Status |
| :---- | :---- | :---- |
| 1 | SSL certificat valid | \[ \] |
| 2 | Zero mixed content (totul pe HTTPS) | \[ \] |
| 3 | Security headers setate | \[ \] |
| 4 | Honeypot anti-spam pe formulare | \[ \] |
| 5 | HSTS activat | \[ \] |
| 6 | Cookie banner GDPR functional | \[ \] |

# **13\. Tool-uri de Testare (Gratuite)**

| Tool | URL | Ce testeaza |
| :---- | :---- | :---- |
| PageSpeed Insights | pagespeed.web.dev | Core Web Vitals \+ performanta |
| Rich Results Test | search.google.com/test/rich-results | Schema markup validity |
| Mobile-Friendly Test | search.google.com/test/mobile-friendly | Compatibilitate mobil |
| Google Search Console | search.google.com/search-console | Indexare, erori, performanta SEO |
| Schema Validator | validator.schema.org | Validare JSON-LD |
| GTmetrix | gtmetrix.com | Performanta detaliata |
| Screaming Frog | screamingfrog.co.uk (free: 500 URL) | Audit SEO complet (crawl site) |
| Ahrefs Webmaster Tools | ahrefs.com/webmaster-tools | Backlinks \+ audit gratuit |
| W3C Validator | validator.w3.org | Validare HTML |
| WAVE | wave.webaim.org | Accesibilitate |

*Document creat pentru AceAgency.ro | Februarie 2026*

*Da acest document coderului impreuna cu strategia SEO pentru context complet.*