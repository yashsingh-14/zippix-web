import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';
import path from 'path';

async function checkConsole() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  
  const allLogs = [];
  page.on('console', msg => {
    allLogs.push({ type: msg.type(), text: msg.text() });
  });
  page.on('pageerror', err => {
    allLogs.push({ type: 'pageerror', text: err.toString() });
  });

  const filePath = path.resolve('scripts/debug_output/cloned_callofjesus.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  console.log('All Console Logs (' + allLogs.length + ' total):');
  for (const log of allLogs) {
    console.log(`[${log.type}] ${log.text}`);
  }

  await browser.close();
}

checkConsole();
