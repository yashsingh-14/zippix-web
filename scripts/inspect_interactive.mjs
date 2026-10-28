import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function inspectInteractiveComponents() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.goto('https://callofjesus.in', { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    // 1. Hero text element
    const heroH1 = document.querySelector('h1');
    const heroH1Html = heroH1 ? heroH1.outerHTML : '';

    // 2. Testimonial images container
    const testImg = document.querySelector('.testimonial-image');
    const testContainer = testImg ? testImg.parentElement.outerHTML.slice(0, 500) : '';

    // 3. Check for any canvas scripts or particle configs
    const scripts = Array.from(document.querySelectorAll('script:not([src])')).map(s => s.textContent);
    const canvasScript = scripts.find(s => s.includes('canvas') || s.includes('particles') || s.includes('sparkle') || s.includes('Math.random'));

    return {
      heroH1Html,
      testContainer,
      hasCanvasScript: !!canvasScript,
      canvasScriptSample: canvasScript ? canvasScript.slice(0, 300) : ''
    };
  });

  console.log('Interactive components data:', JSON.stringify(data, null, 2));

  // Wait 4 seconds to observe hero text changes
  const initialText = await page.evaluate(() => document.querySelector('h1')?.textContent);
  await new Promise(r => setTimeout(r, 4500));
  const textAfter4s = await page.evaluate(() => document.querySelector('h1')?.textContent);

  console.log('Hero text initially:', initialText);
  console.log('Hero text after 4.5s:', textAfter4s);

  await browser.close();
}

inspectInteractiveComponents();
