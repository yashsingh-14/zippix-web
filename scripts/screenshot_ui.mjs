import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function screenshotNewFeatures() {
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

  // 1. Hero with Skilluno Ferrofluid & Apple Glass
  await page.screenshot({ path: 'scripts/debug_output/hero_with_ferrofluid.png', fullPage: false });

  // 2. Open Auth Modal by clicking Sign In button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const signInBtn = buttons.find(b => b.textContent.includes('Sign In'));
    if (signInBtn) signInBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/debug_output/auth_modal_login.png', fullPage: false });

  await browser.close();
  console.log('Ferrofluid and Auth screenshots saved successfully');
}

screenshotNewFeatures();
