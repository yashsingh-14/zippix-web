import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function inspectAnkitSite() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://ankitsajwanministries.com', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => console.log('Goto err:', e.message));
  await new Promise(r => setTimeout(r, 2000));

  const styles = await page.evaluate(() => {
    const bg = window.getComputedStyle(document.body).backgroundColor;
    const color = window.getComputedStyle(document.body).color;
    const fonts = Array.from(document.querySelectorAll('h1, h2, p, span')).slice(0, 30).map(el => ({
      tag: el.tagName,
      font: window.getComputedStyle(el).fontFamily,
      color: window.getComputedStyle(el).color,
      text: el.textContent?.trim().slice(0, 40)
    }));

    // Find gradient backgrounds or ambient glows
    const gradients = Array.from(document.querySelectorAll('*')).filter(el => {
      const s = window.getComputedStyle(el);
      return s.backgroundImage.includes('gradient') || s.boxShadow.includes('rgba');
    }).slice(0, 15).map(el => ({
      tag: el.tagName,
      className: el.className,
      bgImage: window.getComputedStyle(el).backgroundImage,
      boxShadow: window.getComputedStyle(el).boxShadow
    }));

    return { bg, color, fonts, gradients };
  });

  console.log('Ankit Sajwan Ministries Design System:');
  console.log(JSON.stringify(styles, null, 2));

  await page.screenshot({ path: 'scripts/debug_output/ankit_site.png', fullPage: false });
  await browser.close();
}

inspectAnkitSite();
