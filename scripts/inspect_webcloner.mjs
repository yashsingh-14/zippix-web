import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function inspectWebcloner() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.goto('https://webcloner.tech/', { waitUntil: 'networkidle2' });

  const info = await page.evaluate(() => {
    return {
      title: document.title,
      heroH1: document.querySelector('h1')?.innerText,
      formHtml: document.querySelector('form')?.outerHTML.slice(0, 500),
      features: Array.from(document.querySelectorAll('h3, h2')).map(h => h.innerText),
      pricing: Array.from(document.querySelectorAll('[class*="pricing"], [class*="plan"]')).map(p => p.innerText.slice(0, 150))
    };
  });

  console.log('WebCloner Info:', JSON.stringify(info, null, 2));

  // Screenshot of webcloner.tech
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: 'scripts/debug_output/webcloner_home.png', fullPage: true });

  await browser.close();
}

inspectWebcloner();
