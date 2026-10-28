import puppeteer from 'puppeteer-core';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

async function screenshotAllSections() {
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

  // 1. Hero
  await page.screenshot({ path: 'scripts/debug_output/section_1_hero.png', fullPage: false });

  // 2. Engine Matrix
  await page.evaluate(() => {
    const el = document.getElementById('engine-matrix');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: 'scripts/debug_output/section_2_matrix.png', fullPage: false });

  // 3. Studio Playground
  await page.evaluate(() => {
    const el = document.getElementById('studio-playground');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: 'scripts/debug_output/section_3_studio.png', fullPage: false });

  // 4. Workflow Pipelines
  await page.evaluate(() => {
    const el = document.getElementById('workflow-pipelines');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: 'scripts/debug_output/section_4_pipelines.png', fullPage: false });

  // 5. 3-Phase Lifecycle
  await page.evaluate(() => {
    const el = document.getElementById('pipeline-stages');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: 'scripts/debug_output/section_5_lifecycle.png', fullPage: false });

  await browser.close();
  console.log('All sections captured successfully');
}

screenshotAllSections();
