/* probe.js <url> <selector> — report box + key computed styles for matching nodes */
const { chromium } = require('playwright-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const [url, selector] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const out = await page.evaluate((sel) => {
    return [...document.querySelectorAll(sel)].slice(0, 8).map((el) => {
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      return {
        text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 34),
        h: +r.height.toFixed(1),
        w: +r.width.toFixed(1),
        top: +(r.top + window.scrollY).toFixed(1),
        font: c.fontFamily.slice(0, 40),
        size: c.fontSize,
        weight: c.fontWeight,
        lh: c.lineHeight,
        pad: c.padding,
        margin: c.margin,
      };
    });
  }, selector);

  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
