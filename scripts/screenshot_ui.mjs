import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function screenshotLocalhost() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: 'scripts/debug_output/our_new_webcloner_ui.png', fullPage: false });
  await browser.close();
  console.log('Saved screenshot to scripts/debug_output/our_new_webcloner_ui.png');
}

screenshotLocalhost();
