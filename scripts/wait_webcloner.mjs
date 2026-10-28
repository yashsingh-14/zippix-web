import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function waitWebcloner() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.goto('https://webcloner.tech/', { waitUntil: 'networkidle2' });

  const input = await page.$('input[type="url"]');
  if (input) {
    await input.type('https://callofjesus.in');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      console.log('Clicked Start Free, waiting 20s...');
      await new Promise(r => setTimeout(r, 20000));
      
      console.log('URL now:', page.url());
      const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 1500));
      console.log('Body snippet:\n', bodyText);
      await page.screenshot({ path: 'scripts/debug_output/webcloner_result.png' });
    }
  }

  await browser.close();
}

waitWebcloner();
