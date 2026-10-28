import { launchHeadlessBrowser } from './browser.js';

/**
 * Zippix Enterprise Cloud Cloner Engine v3.0
 * - Deep JavaScript execution & React/Next.js hydration
 * - Full section auto-scroll triggering all IntersectionObservers
 * - Preserves scroll-triggered reveals, sparkling text sweep, and smooth animations
 * - Bundles embedded Lenis smooth-scroll & IntersectionObserver in the clone
 * - Anti-blank normalizer ensuring zero content is cut off or permanently hidden
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

    // Set standard human desktop User-Agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    );

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    onProgress({ step: 2, message: `Navigating to ${domain} & waiting for network idle...`, progress: 30 });
    
    try {
      await page.goto(validUrl, {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 40000,
      });
    } catch (navErr) {
      console.warn('Navigation warning (proceeding with loaded DOM):', navErr.message);
    }

    onProgress({ step: 3, message: 'Executing deep section auto-scroll & triggering reveal animations...', progress: 50 });

    // Step-by-step auto-scroll to trigger lazy images, videos, and dynamic components
    await page.evaluate(async () => {
      // 1. Scroll through all major sections
      const sections = Array.from(
        document.querySelectorAll('section, header, footer, main, div[class*="section"], div[id], [class*="reveal"]')
      );

      for (const sec of sections) {
        try {
          sec.scrollIntoView({ behavior: 'instant', block: 'center' });
          window.dispatchEvent(new Event('scroll'));
          await new Promise((r) => setTimeout(r, 60));
        } catch {}
      }

      // Scroll to bottom
      window.scrollTo(0, document.body.scrollHeight);
      window.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 800));

      // Scroll smoothly back to top
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll'));
    });

    await new Promise((r) => setTimeout(r, 1000));

    onProgress({ step: 4, message: 'Consolidating stylesheets, sparkles & resolving relative assets...', progress: 75 });

    // Capture complete standalone HTML, styles, and tokens
    const cloneResult = await page.evaluate((baseUrl) => {
      const base = new URL(baseUrl);

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
                let cssText = rule.cssText;
                cssText = cssText.replace(/url\((['"]?)(.*?)\1\)/gi, (match, quote, rel) => {
                  const abs = toAbsoluteUrl(rel.trim());
                  return `url("${abs}")`;
                });
                gatheredCss += cssText + '\n';
              }
            }
          } catch {
            // Cross-origin stylesheet
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

      // Reveal elements:
      // Notice: Only reveal elements that are at the TOP of the page (in view on load).
      // Elements below the fold keep their initial class so they ANIMATE on scroll!
      docClone.querySelectorAll('*').forEach((el) => {
        // Unblock closed clip-paths or zero-opacity inline styles so they aren't stuck closed
        const style = el.getAttribute('style') || '';
        if (style.includes('clip-path: polygon(0px 0px') || (style.includes('opacity: 0') && el.textContent.trim().length > 5)) {
          el.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
          el.style.opacity = '1';
        }
      });

      // Universal Animation & Sparkle CSS Rules
      const animationOverrides = `
/* ========================================================
   Zippix Universal Scroll & Reveal Animation Engine v3.0
   ======================================================== */
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}

/* Base Reveal Class Transitions */
.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle {
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease-out !important;
}
.reveal-on-scroll.is-revealed, .reveal-from-left.is-revealed, .reveal-from-right.is-revealed {
  opacity: 1 !important;
  transform: translate(0px, 0px) rotate(0deg) scale(1) !important;
  visibility: visible !important;
}
.reveal-smoky-wave.is-revealed {
  opacity: 1 !important;
  filter: blur(0px) brightness(1) !important;
  transform: translate(0px, 0px) scale(1) rotate(0deg) !important;
  visibility: visible !important;
}
.reveal-cinematic-sparkle.is-revealed {
  opacity: 1 !important;
  filter: drop-shadow(rgba(245, 158, 11, 0.22) 0px 4px 25px) brightness(1) !important;
  transform: translate(0px, 0px) scale(1) rotate(0deg) !important;
  visibility: visible !important;
}

/* Sparkling golden text sweep animation */
@keyframes sparkleLightSweep { 
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.reveal-cinematic-sparkle.is-revealed .sparkle-text, .sparkle-text {
  -webkit-text-fill-color: transparent !important;
  background: linear-gradient(110deg, rgb(255, 255, 255) 0%, rgb(254, 243, 199) 20%, rgb(255, 255, 255) 38%, rgb(253, 230, 138) 48%, rgb(255, 255, 255) 52%, rgb(245, 158, 11) 68%, rgb(255, 255, 255) 85%, rgb(253, 230, 138) 100%) 0px 0px / 280% 100% text !important;
  animation: 3.2s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards running sparkleLightSweep !important;
}

/* Fallback for closed clip-paths */
[style*="clip-path: polygon(0px 0px"] {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
  opacity: 1 !important;
  visibility: visible !important;
}
`;

      // Inject consolidated CSS into <head>
      const styleTag = document.createElement('style');
      styleTag.setAttribute('id', 'zippix-consolidated-styles');
      styleTag.textContent = gatheredCss + '\n' + animationOverrides;
      const head = docClone.querySelector('head') || docClone.appendChild(document.createElement('head'));
      head.appendChild(styleTag);

      // Inject client-side Lenis Smooth Scroll CDN & Universal Scroll Reveal Engine
      const scriptTag = document.createElement('script');
      scriptTag.setAttribute('id', 'zippix-scroll-runtime');
      scriptTag.textContent = `
(function() {
  // 1. Load Lenis Smooth Scroll dynamically for buttery momentum physics
  function loadLenis() {
    var lenisScript = document.createElement('script');
    lenisScript.src = 'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js';
    lenisScript.onload = function() {
      if (typeof Lenis !== 'undefined') {
        var lenis = new Lenis({
          duration: 1.2,
          easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
          orientation: 'vertical',
          smoothWheel: true
        });
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };
    document.head.appendChild(lenisScript);
  }

  // 2. Intelligent IntersectionObserver for Scroll Reveals & Text Sparkles
  function initScrollReveals() {
    var revealElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle, [class*="reveal-"], [data-aos]'
    );

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed', 'aos-animate');
            entry.target.style.opacity = '1';
            if (entry.target.style.clipPath && entry.target.style.clipPath.includes('0px 0px')) {
              entry.target.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            }
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function(el) {
        // If element is already in the initial viewport on load, reveal it now
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed', 'aos-animate');
          el.style.opacity = '1';
        } else {
          observer.observe(el);
        }
      });
    } else {
      // Fallback: reveal all
      revealElements.forEach(function(el) {
        el.classList.add('is-revealed', 'aos-animate');
        el.style.opacity = '1';
      });
    }

    // Safety fallback: after 2s, ensure no section remains blank
    setTimeout(function() {
      document.querySelectorAll('*').forEach(function(el) {
        var s = window.getComputedStyle(el);
        if ((s.opacity === '0' || s.visibility === 'hidden') && el.textContent.trim().length > 10) {
          el.classList.add('is-revealed');
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
          if (el.style.clipPath && el.style.clipPath.includes('0px 0px')) {
            el.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
          }
        }
      });
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadLenis();
      initScrollReveals();
    });
  } else {
    loadLenis();
    initScrollReveals();
  }
})();
`;
      const body = docClone.querySelector('body') || docClone;
      body.appendChild(scriptTag);

      // Extract Design Tokens (Colors, Fonts, Assets)
      const colorsMap = new Map();
      const fontsMap = new Map();
      const assetsList = [];

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

      const sortedColors = Array.from(colorsMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 24)
        .map(([value, count]) => ({ value, count }));

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
        assets: assetsList.slice(0, 100),
      };
    }, validUrl);

    onProgress({ step: 5, message: 'HTML and Design Tokens successfully captured!', progress: 95 });

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
