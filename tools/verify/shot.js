/* shot.js — screenshot a page at several widths.
   usage: node shot.js <url> <outPrefix> [widths...] */
const { chromium } = require('playwright-core');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const [url, prefix, ...widthArgs] = process.argv.slice(2);
  const widths = (widthArgs.length ? widthArgs : ['1440', '900', '375']).map(Number);

  const browser = await chromium.launch({ executablePath: CHROME });
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    // freeze the announcement-bar cross-fade and any other looping animation so
    // the two sides are captured at the same point in their cycle
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-play-state: paused !important;
        animation-delay: -1ms !important;
        transition: none !important;
      }`,
    });
    await page.waitForTimeout(2500); // let the chat thread finish playing
    await page.screenshot({ path: `${prefix}-${width}.png`, fullPage: true });
    console.log(`${prefix}-${width}.png`);
    await page.close();
  }
  await browser.close();
})();
