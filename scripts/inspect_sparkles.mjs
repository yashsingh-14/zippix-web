import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function inspectSparkles() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.goto('https://callofjesus.in', { waitUntil: 'networkidle2' });

  const details = await page.evaluate(() => {
    // Check canvas
    const canvases = Array.from(document.querySelectorAll('canvas')).map(c => ({
      width: c.width,
      height: c.height,
      className: c.className,
      style: c.getAttribute('style'),
      parentTag: c.parentElement?.tagName,
      parentClass: c.parentElement?.className
    }));

    // Check navbar
    const nav = document.querySelector('nav, header');
    const navInfo = nav ? {
      tag: nav.tagName,
      className: nav.className,
      style: nav.getAttribute('style')
    } : null;

    // Check rotating texts or sparkle elements
    const sparkles = Array.from(document.querySelectorAll('[class*="sparkle"], [class*="star"], [class*="particle"], [class*="Daily"], [class*="promise"]')).map(el => ({
      tag: el.tagName,
      className: el.className,
      style: el.getAttribute('style'),
      outerHtmlSample: el.outerHTML.slice(0, 200)
    }));

    // Check what happens on scroll - window scroll listeners
    return {
      canvases,
      navInfo,
      sparkles: sparkles.slice(0, 10),
      bodyChildren: Array.from(document.body.children).map(c => ({ tag: c.tagName, id: c.id, className: c.className.slice(0, 60) }))
    };
  });

  console.log('DOM Details:', JSON.stringify(details, null, 2));

  // Now scroll 800px and check nav classes
  await page.evaluate(() => {
    window.scrollTo(0, 800);
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 500));

  const scrolledNav = await page.evaluate(() => {
    const nav = document.querySelector('nav, header');
    return {
      tag: nav?.tagName,
      className: nav?.className,
      style: nav?.getAttribute('style'),
      computedBg: nav ? window.getComputedStyle(nav).backgroundColor : '',
      computedBackdrop: nav ? window.getComputedStyle(nav).backdropFilter : ''
    };
  });

  console.log('Scrolled Nav Details:', JSON.stringify(scrolledNav, null, 2));

  await browser.close();
}

inspectSparkles();
