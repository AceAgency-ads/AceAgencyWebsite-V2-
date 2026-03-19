import { chromium } from 'playwright';
import { execSync } from 'child_process';
import path from 'path';

const sites = [
  { url: 'https://amora.ro', output: 'amora' },
  { url: 'https://trady.ro', output: 'trady' },
  { url: 'https://itmar.ro', output: 'itmar' },
  { url: 'https://tuttiresto.ro', output: 'tutti' },
  { url: 'https://leonorinstitute.ro', output: 'leonor' },
];

const BASE_DIR = '/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/images/studii-de-caz';

async function acceptCookies(page) {
  // Try various cookie consent selectors
  const selectors = [
    // Cookie-script.com specific (used by many Romanian sites)
    '#cookiescript_accept',
    '#cookiescript_accept_all',
    // Text-based button matching
    'text=/ACCEPT/i',
    'button:text-matches("accept|accepta|agree|permite|consent", "i")',
    'a:text-matches("accept|accepta|agree|permite|consent", "i")',
    '[role="button"]:has-text("accept")',
    // Class/id based
    '[class*="cookie"] button',
    '[id*="cookie"] button',
    '[class*="consent"] button',
    '[id*="consent"] button',
    '.cookie-consent button',
    '#cookie-banner button',
    '[data-cookieconsent="accept"]',
    // Common cookie plugin selectors
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
    '.cc-accept',
    '.cc-allow',
    '.cc-btn.cc-dismiss',
    '#accept-cookies',
    '.accept-cookies',
    '[aria-label*="cookie" i] button',
    '[aria-label*="accept" i]',
    // Generic OK button in dialogs
    '.modal button:text-matches("ok|accept|da|agree", "i")',
  ];

  for (const selector of selectors) {
    try {
      const el = await page.locator(selector).first();
      if (await el.isVisible({ timeout: 500 })) {
        await el.click();
        console.log(`  Clicked cookie consent: ${selector}`);
        await page.waitForTimeout(1000);
        return true;
      }
    } catch {
      // selector not found, try next
    }
  }
  console.log('  No cookie banner found');
  return false;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const site of sites) {
    console.log(`\nProcessing: ${site.url}`);
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();

    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      console.log('  Page loaded');
    } catch (e) {
      console.log(`  Page load timeout, continuing anyway...`);
    }

    // Wait a bit for cookie banners to appear
    await page.waitForTimeout(2000);

    // Try to accept cookies
    await acceptCookies(page);

    // Wait for any animations/transitions after cookie dismiss
    await page.waitForTimeout(1000);

    // Take screenshot as PNG to /tmp/
    const pngPath = `/tmp/hero-${site.output}.png`;
    await page.screenshot({ path: pngPath, fullPage: false });
    console.log(`  Screenshot saved: ${pngPath}`);

    // Convert to WebP
    const webpPath = path.join(BASE_DIR, site.output, 'hero.webp');
    try {
      execSync(`cwebp -q 85 "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });
      console.log(`  Converted to WebP: ${webpPath}`);
    } catch (e) {
      console.error(`  WebP conversion failed: ${e.message}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone!');
}

main().catch(console.error);
