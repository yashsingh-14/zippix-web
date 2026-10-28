import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';
import path from 'path';

async function testReactHydration() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleMessages.push(`[PAGEERROR] ${err.message}`));

  const filePath = path.resolve('scripts/debug_output/cloned_callofjesus.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 4000));

  const scriptStatus = await page.evaluate(() => {
    return {
      canvases: Array.from(document.querySelectorAll('canvas')).map(c => ({
        w: c.width,
        h: c.height,
        className: c.className
      })),
      lenis: !!window.lenis,
      scriptsCount: document.querySelectorAll('script').length,
      inlineScripts: Array.from(document.querySelectorAll('script:not([src])')).map(s => s.textContent.slice(0, 100)),
      externalScripts: Array.from(document.querySelectorAll('script[src]')).map(s => s.src)
    };
  });

  console.log('Script status:', JSON.stringify(scriptStatus, null, 2));
  console.log('Console logs during execution (' + consoleMessages.length + '):');
  for (const m of consoleMessages) {
    console.log(m);
  }

  await browser.close();
}

testReactHydration();
