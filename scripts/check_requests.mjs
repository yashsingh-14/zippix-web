import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';
import path from 'path';

async function checkFailedRequests() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  
  page.on('response', res => {
    if (res.status() >= 400) {
      console.log(`[HTTP ${res.status()}] ${res.url()}`);
    }
  });

  page.on('requestfailed', req => {
    console.log(`[FAILED] ${req.url()} - ${req.failure()?.errorText}`);
  });

  const filePath = path.resolve('scripts/debug_output/cloned_callofjesus.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  await browser.close();
}

checkFailedRequests();
