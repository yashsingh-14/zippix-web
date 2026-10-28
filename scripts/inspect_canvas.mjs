import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function inspectCanvasAndAnimations() {
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.goto('https://callofjesus.in', { waitUntil: 'networkidle2' });

  // Hook into canvas draw / requestAnimationFrame or inspect canvas
  const canvasDetails = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas')).filter(c => !c.classList.contains('hidden'));
    return canvases.map(c => {
      // Check if canvas has pixels drawn
      const ctx = c.getContext('2d');
      let nonZeroPixels = 0;
      try {
        const imgData = ctx.getImageData(0, 0, Math.min(c.width, 100), Math.min(c.height, 100));
        for (let i = 3; i < imgData.data.length; i += 4) {
          if (imgData.data[i] > 0) nonZeroPixels++;
        }
      } catch (e) {
        return { error: e.message };
      }
      return {
        width: c.width,
        height: c.height,
        nonZeroPixels,
        parentHtml: c.parentElement.outerHTML.slice(0, 300)
      };
    });
  });

  console.log('Live Canvas Details:', JSON.stringify(canvasDetails, null, 2));

  // Now inspect what animations and libraries are on window
  const windowGlobals = await page.evaluate(() => {
    const globals = {};
    for (const key of Object.getOwnPropertyNames(window)) {
      if (key.includes('lenis') || key.includes('gsap') || key.includes('Scroll') || key.includes('motion') || key.includes('framer')) {
        globals[key] = typeof window[key];
      }
    }
    return globals;
  });

  console.log('Window Animation Globals:', windowGlobals);

  // Inspect the exact CSS rules for animation classes on callofjesus.in
  const animationStyles = await page.evaluate(() => {
    const styles = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && (
            rule.selectorText.includes('reveal') ||
            rule.selectorText.includes('sparkle') ||
            rule.selectorText.includes('hero') ||
            rule.selectorText.includes('animate') ||
            rule.selectorText.includes('starfield') ||
            rule.selectorText.includes('nav')
          )) {
            styles.push({ selector: rule.selectorText, css: rule.cssText });
          }
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            styles.push({ keyframeName: rule.name, css: rule.cssText });
          }
        }
      } catch {}
    }
    return styles;
  });

  console.log('Found', animationStyles.length, 'animation styles/keyframes on live site.');
  console.log('Sample keyframes & styles:', JSON.stringify(animationStyles.slice(0, 20), null, 2));

  await browser.close();
}

inspectCanvasAndAnimations();
