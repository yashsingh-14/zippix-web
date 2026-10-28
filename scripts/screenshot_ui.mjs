import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function screenshotZippix() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Hero Screenshot
  await page.screenshot({ path: 'scripts/debug_output/zippix_hero.png', fullPage: false });

  // Scroll to Tools section
  await page.evaluate(() => {
    const el = document.getElementById('tools-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/debug_output/zippix_tools.png', fullPage: false });

  // Full Page Screenshot
  await page.screenshot({ path: 'scripts/debug_output/zippix_full.png', fullPage: true });

  await browser.close();
  console.log('Zippix screenshots saved successfully');
}

screenshotZippix();
