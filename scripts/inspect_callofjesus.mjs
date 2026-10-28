import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';
import { cloneWebsiteUrl } from '../server/cloner/engine.js';

const OUTPUT_DIR = path.resolve('scripts/debug_output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function inspectLive() {
  console.log('=== Step 1: Inspecting LIVE https://callofjesus.in ===');
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  // Track console and network
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(`[LIVE CONSOLE] ${msg.type()}: ${msg.text()}`));
  
  await page.goto('https://callofjesus.in', { waitUntil: ['domcontentloaded', 'networkidle2'], timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

  // Inspect page details
  const liveInfo = await page.evaluate(() => {
    return {
      title: document.title,
      scripts: Array.from(document.querySelectorAll('script')).map(s => s.src || '[inline]'),
      styles: Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href),
      animationElements: Array.from(document.querySelectorAll('[class*="animate"], [class*="reveal"], [class*="motion"], [style*="animation"], [style*="transition"]')).map(el => ({
        tag: el.tagName,
        className: el.className,
        style: el.getAttribute('style') || ''
      })).slice(0, 30),
      hasLenis: !!window.lenis || document.documentElement.classList.contains('lenis'),
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className,
      scrollHeight: document.body.scrollHeight,
      hasCanvas: !!document.querySelector('canvas')
    };
  });

  console.log('Live site info:', JSON.stringify(liveInfo, null, 2));

  // Screenshot at scroll 0
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'live_scroll_0.png') });

  // Scroll down in increments of 800px and screenshot
  const scrollPositions = [800, 1600, 2400, 3200, 4000];
  for (const y of scrollPositions) {
    await page.evaluate((targetY) => {
      window.scrollTo({ top: targetY, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    }, y);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `live_scroll_${y}.png`) });
  }

  await browser.close();
  return liveInfo;
}

async function testCloneAndInspect() {
  console.log('\n=== Step 2: Running cloner engine on https://callofjesus.in ===');
  const result = await cloneWebsiteUrl('https://callofjesus.in', (p) => {
    console.log(`[CLONER PROGRESS] ${p.progress}%: ${p.message}`);
  });

  const cloneHtmlPath = path.join(OUTPUT_DIR, 'cloned_callofjesus.html');
  fs.writeFileSync(cloneHtmlPath, result.html, 'utf-8');
  console.log(`Saved clone HTML to ${cloneHtmlPath} (${(result.html.length / 1024).toFixed(1)} KB)`);

  console.log('\n=== Step 3: Loading Cloned HTML in Chromium & Inspecting ===');
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--allow-file-access-from-files', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  const cloneErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warn') {
      cloneErrors.push(`[CLONE CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    cloneErrors.push(`[CLONE PAGE ERROR] ${err.toString()}`);
  });

  // Navigate to file URL
  const fileUrl = 'file:///' + cloneHtmlPath.replace(/\\/g, '/');
  console.log(`Navigating to ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: ['domcontentloaded', 'networkidle2'], timeout: 30000 }).catch(e => console.log('Goto catch:', e.message));

  await new Promise(r => setTimeout(r, 2000));

  const cloneInfo = await page.evaluate(() => {
    return {
      title: document.title,
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className,
      scrollHeight: document.body.scrollHeight,
      revealedCount: document.querySelectorAll('.is-revealed').length,
      clipPathElements: Array.from(document.querySelectorAll('[style*="clip-path"]')).map(el => el.getAttribute('style')),
      hiddenCount: Array.from(document.querySelectorAll('*')).filter(el => {
        const s = window.getComputedStyle(el);
        return (s.opacity === '0' || s.visibility === 'hidden') && el.textContent.trim().length > 10;
      }).length
    };
  });

  console.log('Cloned page info in browser:', JSON.stringify(cloneInfo, null, 2));
  console.log('Cloned page console errors:', cloneErrors.slice(0, 15));

  // Screenshot clone at 0
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'clone_scroll_0.png') });

  // Scroll down in same increments and screenshot
  const scrollPositions = [800, 1600, 2400, 3200, 4000];
  for (const y of scrollPositions) {
    await page.evaluate((targetY) => {
      window.scrollTo({ top: targetY, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    }, y);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `clone_scroll_${y}.png`) });
  }

  await browser.close();
  console.log('\n=== Investigation Complete! Screenshots saved in scripts/debug_output ===');
}

async function run() {
  try {
    await inspectLive();
    await testCloneAndInspect();
  } catch (err) {
    console.error('Fatal error during inspection:', err);
  }
}

run();
