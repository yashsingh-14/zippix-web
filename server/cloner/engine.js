import { launchHeadlessBrowser } from './browser.js';

/**
 * Zippix Enterprise Cloud Cloner Engine
 * - Full JS execution & hydration
 * - Smooth auto-scrolling to trigger lazy images, videos, and animations
 * - Full CSS stylesheet consolidation and URL resolution
 * - Design token & asset ripper extraction
 */
export async function cloneWebsiteUrl(targetUrl, onProgress = () => {}) {
  // Normalize URL
  let validUrl = targetUrl.trim();
  if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
    validUrl = 'https://' + validUrl;
  }

  const parsedUrl = new URL(validUrl);
  const domain = parsedUrl.hostname;

  onProgress({ step: 1, message: 'Launching Cloud Chromium engine...', progress: 15 });
  const browser = await launchHeadlessBrowser();

  try {
    const page = await browser.newPage();

    // Set standard human User-Agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    );

    // Set standard headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    onProgress({ step: 2, message: `Navigating to ${domain} & waiting for network idle...`, progress: 30 });
    
    // Navigate with graceful timeout
    try {
      await page.goto(validUrl, {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 35000,
      });
    } catch (navErr) {
      // If networkidle2 timed out, verify if DOMContentLoaded loaded
      console.warn('Navigation warning (proceeding with loaded DOM):', navErr.message);
    }

    onProgress({ step: 3, message: 'Executing smooth auto-scroll to trigger lazy images & animations...', progress: 50 });

    // Smooth auto-scroll the entire webpage from top to bottom
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 350;
        const maxScrolls = 40; // Prevent infinite loops on infinite scroll sites
        let scrollCount = 0;

        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          scrollCount++;

          if (totalHeight >= scrollHeight || scrollCount >= maxScrolls) {
            clearInterval(timer);
            // Scroll back to top
            window.scrollTo(0, 0);
            resolve();
          }
        }, 120);
      });
    });

    // Short pause for any CSS animations or remaining image loads
    await new Promise((r) => setTimeout(r, 1200));

    onProgress({ step: 4, message: 'Consolidating stylesheets & resolving relative assets...', progress: 70 });

    // Run in-page cloner to capture complete standalone HTML & design tokens
    const cloneResult = await page.evaluate((baseUrl) => {
      const base = new URL(baseUrl);

      // Helper to resolve absolute URL
      function toAbsoluteUrl(relUrl) {
        if (!relUrl || relUrl.startsWith('data:') || relUrl.startsWith('blob:') || relUrl.startsWith('javascript:')) {
          return relUrl;
        }
        try {
          return new URL(relUrl, base.href).href;
        } catch {
          return relUrl;
        }
      }

      // Collect all stylesheets and inline them
      let gatheredCss = '';
      try {
        for (const sheet of Array.from(document.styleSheets)) {
          try {
            if (sheet.cssRules) {
              for (const rule of Array.from(sheet.cssRules)) {
                // Rewrite any url(...) inside css
                let cssText = rule.cssText;
                cssText = cssText.replace(/url\((['"]?)(.*?)\1\)/gi, (match, quote, rel) => {
                  const abs = toAbsoluteUrl(rel.trim());
                  return `url("${abs}")`;
                });
                gatheredCss += cssText + '\n';
              }
            }
          } catch {
            // Cross-origin stylesheet: preserve link tag with absolute href
          }
        }
      } catch (e) {
        console.warn('CSS gather error', e);
      }

      // Clone document DOM
      const docClone = document.documentElement.cloneNode(true);

      // Normalize all <img>, <source>, <video>, <a> links to absolute URLs
      docClone.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src');
        if (src) img.setAttribute('src', toAbsoluteUrl(src));
        const srcset = img.getAttribute('srcset');
        if (srcset) {
          const newSrcset = srcset
            .split(',')
            .map((item) => {
              const parts = item.trim().split(/\s+/);
              if (parts[0]) parts[0] = toAbsoluteUrl(parts[0]);
              return parts.join(' ');
            })
            .join(', ');
          img.setAttribute('srcset', newSrcset);
        }
      });

      docClone.querySelectorAll('source').forEach((s) => {
        const src = s.getAttribute('src');
        if (src) s.setAttribute('src', toAbsoluteUrl(src));
      });

      docClone.querySelectorAll('video').forEach((v) => {
        const src = v.getAttribute('src');
        if (src) v.setAttribute('src', toAbsoluteUrl(src));
        const poster = v.getAttribute('poster');
        if (poster) v.setAttribute('poster', toAbsoluteUrl(poster));
        v.setAttribute('autoplay', 'true');
        v.setAttribute('muted', 'true');
        v.setAttribute('loop', 'true');
        v.setAttribute('playsinline', 'true');
      });

      docClone.querySelectorAll('a').forEach((a) => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#')) a.setAttribute('href', toAbsoluteUrl(href));
      });

      docClone.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        const href = link.getAttribute('href');
        if (href) link.setAttribute('href', toAbsoluteUrl(href));
      });

      // Inject consolidated CSS into <head>
      const styleTag = document.createElement('style');
      styleTag.setAttribute('id', 'zippix-consolidated-styles');
      styleTag.textContent = gatheredCss;
      const head = docClone.querySelector('head') || docClone.appendChild(document.createElement('head'));
      head.appendChild(styleTag);

      // Extract Design Tokens (Colors, Fonts, Assets)
      const colorsMap = new Map();
      const fontsMap = new Map();
      const assetsList = [];

      // Color extraction helper
      function addColor(col) {
        if (!col || col === 'transparent' || col === 'inherit' || col.startsWith('rgba(0, 0, 0, 0)')) return;
        colorsMap.set(col, (colorsMap.get(col) || 0) + 1);
      }

      const allElements = Array.from(document.querySelectorAll('*')).slice(0, 500);
      for (const el of allElements) {
        try {
          const comp = window.getComputedStyle(el);
          addColor(comp.color);
          addColor(comp.backgroundColor);
          addColor(comp.borderColor);

          const ff = comp.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
          if (ff) {
            if (!fontsMap.has(ff)) {
              fontsMap.set(ff, { name: ff, weights: new Set(), sampleText: el.textContent?.trim().slice(0, 30) || 'The quick brown fox' });
            }
            fontsMap.get(ff).weights.add(comp.fontWeight);
          }
        } catch {}
      }

      // Assets extraction (Images, SVGs, Videos)
      document.querySelectorAll('img').forEach((img, idx) => {
        const src = img.currentSrc || img.src;
        if (src && !src.startsWith('data:image/svg+xml')) {
          assetsList.push({
            id: `img-${idx}`,
            type: 'image',
            name: img.alt || `image-${idx + 1}`,
            url: toAbsoluteUrl(src),
            width: img.naturalWidth || img.width || 0,
            height: img.naturalHeight || img.height || 0,
          });
        }
      });

      document.querySelectorAll('svg').forEach((svg, idx) => {
        if (svg.clientWidth > 8 || svg.clientHeight > 8) {
          assetsList.push({
            id: `svg-${idx}`,
            type: 'svg',
            name: `icon-${idx + 1}`,
            content: svg.outerHTML,
            url: '',
            width: svg.clientWidth || 24,
            height: svg.clientHeight || 24,
          });
        }
      });

      document.querySelectorAll('video').forEach((v, idx) => {
        const src = v.currentSrc || v.src;
        if (src) {
          assetsList.push({
            id: `vid-${idx}`,
            type: 'video',
            name: `video-${idx + 1}`,
            url: toAbsoluteUrl(src),
            width: v.videoWidth || v.clientWidth || 0,
            height: v.videoHeight || v.clientHeight || 0,
          });
        }
      });

      // Format sorted colors
      const sortedColors = Array.from(colorsMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 24)
        .map(([value, count]) => ({ value, count }));

      // Format sorted fonts
      const sortedFonts = Array.from(fontsMap.entries()).map(([name, info]) => ({
        family: name,
        weights: Array.from(info.weights),
        sample: info.sampleText,
      }));

      return {
        title: document.title || 'Cloned Webpage',
        html: '<!DOCTYPE html>\n' + docClone.outerHTML,
        tokens: {
          domain: base.hostname,
          title: document.title || 'Cloned Webpage',
          colors: sortedColors,
          fonts: sortedFonts,
        },
        assets: assetsList.slice(0, 100), // Cap at 100 top assets for performance
      };
    }, validUrl);

    onProgress({ step: 5, message: 'HTML and Design Tokens successfully captured!', progress: 90 });

    return {
      success: true,
      domain,
      url: validUrl,
      title: cloneResult.title,
      html: cloneResult.html,
      tokens: cloneResult.tokens,
      assets: cloneResult.assets,
    };
  } finally {
    await browser.close();
  }
}
