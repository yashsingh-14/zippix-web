import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function checkAfterSubmit() {
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
      await new Promise(r => setTimeout(r, 4000));
      
      const pageState = await page.evaluate(() => {
        return {
          url: window.location.href,
          text: document.body.innerText.slice(0, 1000),
          modal: document.querySelector('[role="dialog"], .modal, [class*="modal"]')?.innerText
        };
      });
      console.log('Page state after submit:', JSON.stringify(pageState, null, 2));
      await page.screenshot({ path: 'scripts/debug_output/webcloner_after_submit.png' });
    }
  }

  await browser.close();
}

checkAfterSubmit();
