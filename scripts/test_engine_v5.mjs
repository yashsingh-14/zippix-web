import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { getAvailableBrowserPath } from '../server/cloner/browser.js';

const OUTPUT_DIR = path.resolve('scripts/debug_output_v5');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testV5Engine() {
  console.log('=== Step 1: Navigating to https://callofjesus.in with Puppeteer ===');
  const executablePath = getAvailableBrowserPath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('https://callofjesus.in', { waitUntil: ['domcontentloaded', 'networkidle2'], timeout: 45000 });

  // Scroll quickly to trigger lazy-loaded images only, then jump back to top
  console.log('Pre-loading images...');
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 800));

  console.log('Capturing DOM and styles...');
  const cloneData = await page.evaluate((targetUrl) => {
    const base = new URL(targetUrl);

    function toAbsoluteUrl(relUrl, contextUrl) {
      if (!relUrl || relUrl.startsWith('data:') || relUrl.startsWith('blob:') || relUrl.startsWith('javascript:')) {
        return relUrl;
      }
      try {
        const root = contextUrl ? new URL(contextUrl, base.href) : base;
        return new URL(relUrl, root.href).href;
      } catch {
        return relUrl;
      }
    }

    // Collect all stylesheets with proper context resolution
    let gatheredCss = '';
    try {
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          if (sheet.cssRules) {
            const sheetHref = sheet.href || base.href;
            for (const rule of Array.from(sheet.cssRules)) {
              let cssText = rule.cssText;
              // Fix relative URLs in CSS (fonts, background images) relative to sheet.href
              cssText = cssText.replace(/url\((['"]?)(.*?)\1\)/gi, (match, quote, rel) => {
                const abs = toAbsoluteUrl(rel.trim(), sheetHref);
                return `url("${abs}")`;
              });
              gatheredCss += cssText + '\n';
            }
          }
        } catch {
          // Cross-origin sheet
        }
      }
    } catch (e) {
      console.warn('CSS gather error', e);
    }

    // Clone DOM
    const docClone = document.documentElement.cloneNode(true);
    const head = docClone.querySelector('head') || docClone.insertBefore(document.createElement('head'), docClone.firstChild);

    // Normalize links
    docClone.querySelectorAll('link').forEach(l => {
      const href = l.getAttribute('href');
      if (href) l.setAttribute('href', toAbsoluteUrl(href));
    });

    // Normalize images, videos, audio
    docClone.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src) img.setAttribute('src', toAbsoluteUrl(src));
      const srcset = img.getAttribute('srcset');
      if (srcset) {
        const newSrcset = srcset.split(',').map(item => {
          const parts = item.trim().split(/\s+/);
          if (parts[0]) parts[0] = toAbsoluteUrl(parts[0]);
          return parts.join(' ');
        }).join(', ');
        img.setAttribute('srcset', newSrcset);
      }
    });

    docClone.querySelectorAll('source').forEach(s => {
      const src = s.getAttribute('src');
      if (src) s.setAttribute('src', toAbsoluteUrl(src));
    });

    docClone.querySelectorAll('video').forEach(v => {
      const src = v.getAttribute('src');
      if (src) v.setAttribute('src', toAbsoluteUrl(src));
      const poster = v.getAttribute('poster');
      if (poster) v.setAttribute('poster', toAbsoluteUrl(poster));
    });

    docClone.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        a.setAttribute('href', toAbsoluteUrl(href));
      }
    });

    // Reset elements below the fold so they WILL animate on scroll!
    const windowH = window.innerHeight;
    const originalReveals = document.querySelectorAll('.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle');
    const originalRevealsArr = Array.from(originalReveals);

    const cloneReveals = docClone.querySelectorAll('.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle');
    cloneReveals.forEach((el, idx) => {
      const orig = originalRevealsArr[idx];
      if (orig) {
        const rect = orig.getBoundingClientRect();
        // If element is below the initial fold, remove .is-revealed so user sees it animate when scrolling!
        if (rect.top > windowH * 0.8) {
          el.classList.remove('is-revealed', 'aos-animate');
          el.style.opacity = '';
          el.style.transform = '';
          el.style.filter = '';
        } else {
          el.classList.add('is-revealed');
        }
      }
    });

    // Remove third-party intrusive ads / telemetry from clone
    docClone.querySelectorAll('script[src*="googlesyndication"], ins.adsbygoogle, iframe[src*="google"]').forEach(el => el.remove());

    // Inject Master Animation Stylesheet
    const masterStyles = `
/* ==========================================================================
   Zippix Ultra High-Fidelity Scroll & Motion FX Engine v5.0
   ========================================================================== */
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
.lenis.lenis-smooth iframe {
  pointer-events: none;
}

/* Base Reveal Classes in Unrevealed (Pre-Scroll) State */
.reveal-on-scroll:not(.is-revealed) {
  opacity: 0 !important;
  transform: translateY(48px) !important;
  will-change: opacity, transform;
}
.reveal-from-left:not(.is-revealed) {
  opacity: 0 !important;
  transform: translate(-90px, 18px) rotate(-1.5deg) !important;
  will-change: opacity, transform;
}
.reveal-from-right:not(.is-revealed) {
  opacity: 0 !important;
  transform: translate(90px, 18px) rotate(1.5deg) !important;
  will-change: opacity, transform;
}
.reveal-smoky-wave:not(.is-revealed) {
  opacity: 0 !important;
  filter: blur(18px) brightness(1.35) !important;
  transform: translate(-70px, 16px) scale(0.97) rotate(-1.2deg) !important;
  will-change: opacity, filter, transform;
}
.reveal-cinematic-sparkle:not(.is-revealed) {
  opacity: 0 !important;
  filter: drop-shadow(rgba(251, 191, 36, 0.75) 0px 0px 35px) brightness(1.5) !important;
  transform: translate(-70px, 16px) scale(0.97) rotate(-1.2deg) !important;
  will-change: opacity, transform, filter;
}

/* Revealed State (When Scrolled Into View) */
.reveal-on-scroll.is-revealed, .reveal-from-left.is-revealed, .reveal-from-right.is-revealed {
  opacity: 1 !important;
  transform: translate(0px, 0px) rotate(0deg) scale(1) !important;
  visibility: visible !important;
  transition: opacity 1.25s cubic-bezier(0.16, 1, 0.3, 1), transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.reveal-smoky-wave.is-revealed {
  opacity: 1 !important;
  filter: blur(0px) brightness(1) !important;
  transform: translate(0px, 0px) scale(1) rotate(0deg) !important;
  visibility: visible !important;
  transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.reveal-cinematic-sparkle.is-revealed {
  opacity: 1 !important;
  filter: drop-shadow(rgba(245, 158, 11, 0.22) 0px 4px 25px) brightness(1) !important;
  transform: translate(0px, 0px) scale(1) rotate(0deg) !important;
  visibility: visible !important;
  transition: opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1), transform 1.35s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.reveal-delay-1.is-revealed { transition-delay: 0.15s !important; }
.reveal-delay-2.is-revealed { transition-delay: 0.3s !important; }
.reveal-delay-3.is-revealed { transition-delay: 0.45s !important; }

/* Sparkling Text Sweep Animation */
@keyframes sparkleLightSweep { 
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.reveal-cinematic-sparkle.is-revealed .sparkle-text, .sparkle-text {
  -webkit-text-fill-color: transparent !important;
  background: linear-gradient(110deg, rgb(255, 255, 255) 0%, rgb(254, 243, 199) 20%, rgb(255, 255, 255) 38%, rgb(253, 230, 138) 48%, rgb(255, 255, 255) 52%, rgb(245, 158, 11) 68%, rgb(255, 255, 255) 85%, rgb(253, 230, 138) 100%) 0px 0px / 280% 100% text !important;
  animation: 3.2s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards running sparkleLightSweep !important;
}

/* Clip-Path Reveal Animations */
.clip-reveal {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
  transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease !important;
}

/* Fixed Scrolled Navbar Blur Transition */
nav.nav-scrolled, header.nav-scrolled {
  background-color: rgba(7, 6, 10, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
}

/* Kinetic Hero Swapper Animations */
@keyframes kineticSwapIn { 
  0% { opacity: 0; transform: translateY(115%); }
  100% { opacity: 1; transform: translateY(0%); }
}
@keyframes kineticSwapOut { 
  0% { opacity: 1; transform: translateY(0%); }
  100% { opacity: 0; transform: translateY(-115%); }
}
.kinetic-swap-in {
  animation: 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards running kineticSwapIn !important;
}
.kinetic-swap-out {
  animation: 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards running kineticSwapOut !important;
}
`;

    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'zippix-motion-engine-v5');
    styleEl.textContent = gatheredCss + '\n' + masterStyles;
    head.appendChild(styleEl);

    // Inject Master Interactive JavaScript Runtime
    const runtimeScript = document.createElement('script');
    runtimeScript.setAttribute('id', 'zippix-client-runtime-v5');
    runtimeScript.textContent = `
(function() {
  // 1. Dynamic Navbar Scroll Handler
  function initNavbar() {
    var nav = document.querySelector('nav, header');
    if (!nav) return;
    function updateNav() {
      if (window.scrollY > 25) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // 2. High-Precision IntersectionObserver for Scroll Reveals
  function initReveals() {
    var elements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle, [class*="reveal-"]'
    );

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unblock any inline clip-paths
            if (entry.target.style.clipPath && entry.target.style.clipPath.includes('0px 0px')) {
              entry.target.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            }
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      elements.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    } else {
      // Fallback
      elements.forEach(function(el) { el.classList.add('is-revealed'); });
    }
  }

  // 3. Golden Twinkling Sparkles 60fps Canvas Simulator
  function initSparkleCanvases() {
    var canvases = document.querySelectorAll('canvas.pointer-events-none');
    canvases.forEach(function(canvas) {
      var parent = canvas.parentElement;
      if (!parent) return;

      var ctx = canvas.getContext('2d');
      if (!ctx) return;

      function resize() {
        canvas.width = parent.offsetWidth + 80;
        canvas.height = parent.offsetHeight + 120;
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      var particles = [];
      var count = 35;
      var colors = ['#f59e0b', '#fbbf24', '#fde68a', '#ffffff', '#ffd700'];

      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.8 + 1,
          maxOpacity: Math.random() * 0.7 + 0.3,
          opacity: Math.random() * 0.8,
          speedY: -(Math.random() * 0.3 + 0.1),
          speedX: (Math.random() - 0.5) * 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
          isStar: Math.random() > 0.45
        });
      }

      function drawStar4(cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
        var rot = Math.PI / 2 * 3;
        var step = Math.PI / spikes;
        ctx.save();
        ctx.beginPath();
        ctx.translate(cx, cy);
        ctx.moveTo(0, 0 - outerRadius);
        for (var i = 0; i < spikes; i++) {
          var x = Math.cos(rot) * outerRadius;
          var y = Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;
          x = Math.cos(rot) * innerRadius;
          y = Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(0, 0 - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = color;
        ctx.shadowBlur = outerRadius * 2.5;
        ctx.fill();
        ctx.restore();
      }

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.opacity += p.pulseSpeed;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }
          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;

          if (p.isStar) {
            drawStar4(p.x, p.y, 4, p.size * 2.2, p.size * 0.7, p.color, Math.max(0, p.opacity));
          } else {
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.shadowColor = p.color;
            ctx.shadowBlur = p.size * 3;
            ctx.fill();
            ctx.restore();
          }
        }
        requestAnimationFrame(render);
      }
      render();
    });
  }

  // 4. Hero Kinetic Swapper
  function initHeroSwapper() {
    var heroH1 = document.querySelector('h1');
    if (!heroH1) return;
    var swapContainer = heroH1.querySelector('div span');
    if (!swapContainer) return;

    var phrases = [
      'All Who Are Weary',
      'I Will Give You Rest',
      'All Heavy Laden',
      'And I Will Comfort You'
    ];
    var currentIdx = phrases.indexOf(swapContainer.textContent.trim());
    if (currentIdx === -1) currentIdx = 0;

    setInterval(function() {
      swapContainer.classList.remove('kinetic-swap-in');
      swapContainer.classList.add('kinetic-swap-out');

      setTimeout(function() {
        currentIdx = (currentIdx + 1) % phrases.length;
        swapContainer.textContent = phrases[currentIdx];
        swapContainer.classList.remove('kinetic-swap-out');
        swapContainer.classList.add('kinetic-swap-in');
      }, 550);
    }, 4000);
  }

  // 5. Testimonial 3D Stack Click Rotator
  function initTestimonialStack() {
    var container = document.querySelector('.image-container');
    if (!container) return;
    var images = Array.from(container.querySelectorAll('.testimonial-image'));
    if (!images.length) return;

    var activeIdx = 0;

    function updateStack() {
      var n = images.length;
      images.forEach(function(img, i) {
        var diff = (i - activeIdx + n) % n;
        if (diff > n / 2) diff -= n;

        if (diff === 0) {
          // Center front card
          img.style.zIndex = '3';
          img.style.opacity = '1';
          img.style.pointerEvents = 'auto';
          img.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotateY(0deg)';
          img.className = img.className.replace(/border-white\\/10/g, 'border-amber-400/40');
        } else if (diff === 1) {
          // Right card
          img.style.zIndex = '2';
          img.style.opacity = '0.8';
          img.style.pointerEvents = 'auto';
          img.style.cursor = 'pointer';
          img.style.transform = 'translate3d(32px, -22.4px, 0px) scale(0.85) rotateY(-15deg)';
        } else if (diff === -1 || diff === n - 1) {
          // Left card
          img.style.zIndex = '2';
          img.style.opacity = '0.8';
          img.style.pointerEvents = 'auto';
          img.style.cursor = 'pointer';
          img.style.transform = 'translate3d(-32px, -22.4px, 0px) scale(0.85) rotateY(15deg)';
        } else {
          // Hidden back cards
          img.style.zIndex = '1';
          img.style.opacity = '0';
          img.style.pointerEvents = 'none';
          img.style.transform = 'translate3d(0px, -22.4px, 0px) scale(0.7) rotateY(0deg)';
        }
      });
    }

    images.forEach(function(img, i) {
      img.addEventListener('click', function() {
        if (activeIdx !== i) {
          activeIdx = i;
          updateStack();
        }
      });
    });

    updateStack();
  }

  // 6. Lenis Smooth Momentum Scrolling Integration
  function initSmoothScroll() {
    // If user has wheel, add buttery smooth momentum scroll
    var currentY = window.scrollY;
    var targetY = window.scrollY;
    var isScrolling = false;

    window.addEventListener('wheel', function(e) {
      // Don't override if inside modal
      if (e.target.closest('[role="dialog"], .modal, pre, code')) return;
      targetY += e.deltaY * 0.95;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothUpdate);
      }
    }, { passive: true });

    function smoothUpdate() {
      currentY += (targetY - currentY) * 0.12;
      window.scrollTo(0, Math.round(currentY));
      if (Math.abs(targetY - currentY) > 0.5) {
        requestAnimationFrame(smoothUpdate);
      } else {
        isScrolling = false;
      }
    }
  }

  function initAll() {
    initNavbar();
    initReveals();
    initSparkleCanvases();
    initHeroSwapper();
    initTestimonialStack();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
`;
    const body = docClone.querySelector('body') || docClone;
    body.appendChild(runtimeScript);

    return '<!DOCTYPE html>\n' + docClone.outerHTML;
  }, 'https://callofjesus.in');

  await browser.close();

  const outHtmlPath = path.join(OUTPUT_DIR, 'cloned_callofjesus_v5.html');
  fs.writeFileSync(outHtmlPath, cloneData, 'utf-8');
  console.log(`Saved V5 clone HTML to ${outHtmlPath} (${(cloneData.length / 1024).toFixed(1)} KB)`);

  // Step 2: Test in Puppeteer and take screenshots while scrolling
  console.log('Testing V5 clone in Puppeteer and capturing scroll screenshots...');
  const testBrowser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--allow-file-access-from-files', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const testPage = await testBrowser.newPage();
  await testPage.goto('file:///' + outHtmlPath.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));

  await testPage.screenshot({ path: path.join(OUTPUT_DIR, 'v5_scroll_0.png') });

  const scrollPositions = [800, 1600, 2400, 3200, 4000];
  for (const y of scrollPositions) {
    await testPage.evaluate((targetY) => {
      window.scrollTo({ top: targetY, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    }, y);
    // Allow animation transition to play
    await new Promise(r => setTimeout(r, 1200));
    await testPage.screenshot({ path: path.join(OUTPUT_DIR, `v5_scroll_${y}.png`) });
  }

  await testBrowser.close();
  console.log('=== V5 Test Completed! Screenshots saved in scripts/debug_output_v5 ===');
}

testV5Engine().catch(console.error);
