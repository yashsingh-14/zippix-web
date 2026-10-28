import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function testWebclonerClone() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  
  // Intercept requests to see their API endpoints
  page.on('request', req => {
    if (req.url().includes('api') || req.method() === 'POST') {
      console.log(`[API REQUEST] ${req.method()} ${req.url()} postData:`, req.postData()?.slice(0, 100));
    }
  });

  page.on('response', async res => {
    if (res.url().includes('api') || res.request().method() === 'POST') {
      console.log(`[API RESPONSE] ${res.status()} ${res.url()}`);
      try {
        const text = await res.text();
        console.log(`[RESPONSE BODY]`, text.slice(0, 300));
      } catch {}
    }
  });

  await page.goto('https://webcloner.tech/', { waitUntil: 'networkidle2' });

  // Type in url input
  const input = await page.$('input[type="url"]');
  if (input) {
    await input.type('https://callofjesus.in');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      console.log('Submitting clone on webcloner.tech...');
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 6000));
    }
  }

  console.log('Current URL after submit:', page.url());
  await browser.close();
}

testWebclonerClone();
