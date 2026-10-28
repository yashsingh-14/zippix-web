import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function testWebclonerResponse() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  
  page.on('response', async res => {
    if (res.url().includes('clone') || res.url().includes('project') || res.url().includes('task')) {
      console.log(`[CLONE API RESPONSE] ${res.status()} ${res.url()}`);
      try {
        const text = await res.text();
        console.log(`[CLONE API BODY]`, text);
      } catch (e) {
        console.log('[ERROR READING RES]', e.message);
      }
    }
  });

  await page.goto('https://webcloner.tech/', { waitUntil: 'networkidle2' });

  const input = await page.$('input[type="url"]');
  if (input) {
    await input.type('https://callofjesus.in');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      console.log('Submitting clone form on webcloner.tech...');
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  await browser.close();
}

testWebclonerResponse();
