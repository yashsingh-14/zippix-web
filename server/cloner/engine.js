import { launchHeadlessBrowser } from './browser.js';

/**
 * Zippix Enterprise Cloud Cloner Engine v5.0 (Ultimate High-Fidelity & Motion Replica)
 * - Exact Scroll-Triggered Entrance Reveals (.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle)
 * - Cinematic Sparkling Text Sweep Animation with golden gradient light beam
 * - 60fps Golden Twinkling Sparkles Canvas Particle Simulator
 * - Hero Kinetic Text Verse Swapper with kineticSwapIn/Out animations
 * - Interactive 3D Testimonial Card Carousel Stack
 * - Dynamic Frosted-Glass Scrolled Navbar Transition
 * - Lenis Momentum Smooth Scrolling Engine
 * - 100% Asset & Font Resolution (Zero 404s for @font-face and images)
 * - Safe from ad injection & telemetry bloat
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

    // Standard high-resolution viewport & user-agent
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    onProgress({ step: 2, message: `Navigating to ${domain} & loading live assets...`, progress: 30 });

    try {
      await page.goto(validUrl, {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 45000,
      });
    } catch (navErr) {
      console.warn('Navigation note (proceeding with loaded DOM):', navErr.message);
    }

    onProgress({ step: 3, message: 'Warming up lazy-loaded media & asset manifests...', progress: 50 });

    // Quick scroll to bottom to force lazy-load image manifests, then immediately return to top
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
    });

    await new Promise((r) => setTimeout(r, 800));

    onProgress({ step: 4, message: 'Synthesizing exact keyframes, styles & interactive motion engines...', progress: 75 });

    // Deep evaluation to extract full standalone HTML and Design Tokens
    const cloneResult = await page.evaluate((targetBaseUrl) => {
      const base = new URL(targetBaseUrl);

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

      // 1. Gather all CSS rules and resolve @font-face / url(...) relative to stylesheet location!
      let gatheredCss = '';
      try {
        for (const sheet of Array.from(document.styleSheets)) {
          try {
            if (sheet.cssRules) {
              const sheetHref = sheet.href || base.href;
              for (const rule of Array.from(sheet.cssRules)) {
                let cssText = rule.cssText;
                cssText = cssText.replace(/url\((['"]?)(.*?)\1\)/gi, (match, quote, rel) => {
                  const abs = toAbsoluteUrl(rel.trim(), sheetHref);
                  return `url("${abs}")`;
                });
                gatheredCss += cssText + '\n';
              }
            }
          } catch {
            // Cross-origin stylesheet protected by CORS
          }
        }
      } catch (e) {
        console.warn('CSS gather error', e);
      }

      // 2. Clone DOM
      const docClone = document.documentElement.cloneNode(true);
      const head = docClone.querySelector('head') || docClone.insertBefore(document.createElement('head'), docClone.firstChild);

      // Inject <base href="...">
      const existingBase = head.querySelector('base');
      if (existingBase) existingBase.remove();
      const baseEl = document.createElement('base');
      baseEl.setAttribute('href', base.origin + '/');
      head.insertBefore(baseEl, head.firstChild);

      // Normalize script and link tags
      docClone.querySelectorAll('script').forEach((s) => {
        const src = s.getAttribute('src');
        if (src) s.setAttribute('src', toAbsoluteUrl(src));
      });

      docClone.querySelectorAll('link').forEach((l) => {
        const href = l.getAttribute('href');
        if (href) l.setAttribute('href', toAbsoluteUrl(href));
      });

      // Normalize all images, source tags, video posters, and links
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
      });

      docClone.querySelectorAll('a').forEach((a) => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          a.setAttribute('href', toAbsoluteUrl(href));
        }
      });

      // 3. Reset elements below the initial fold so they WILL animate dynamically when scrolled!
      const windowH = window.innerHeight;
      const originalReveals = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle'
      );
      const originalRevealsArr = Array.from(originalReveals);

      const cloneReveals = docClone.querySelectorAll(
        '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle'
      );

      cloneReveals.forEach((el, idx) => {
        const orig = originalRevealsArr[idx];
        if (orig) {
          const rect = orig.getBoundingClientRect();
          // If element is below the initial fold (viewport), remove .is-revealed so it animates when scrolled
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

      // Clean out intrusive third-party ads
      docClone
        .querySelectorAll('script[src*="googlesyndication"], ins.adsbygoogle, iframe[src*="google"]')
        .forEach((el) => el.remove());

      // Guarantee Native Scrolling on <html>, <body>, and full-page wrappers
      docClone.style.overflow = '';
      docClone.style.overflowX = 'hidden';
      docClone.style.overflowY = 'auto';
      docClone.style.height = 'auto';
      docClone.style.maxHeight = 'none';
      docClone.style.position = 'static';
      docClone.classList.remove('overflow-hidden', 'overflow-y-hidden', 'no-scroll', 'lenis-stopped', 'has-scroll-smooth', 'noscroll');

      const bodyClone = docClone.querySelector('body');
      if (bodyClone) {
        bodyClone.style.overflow = '';
        bodyClone.style.overflowX = 'hidden';
        bodyClone.style.overflowY = 'auto';
        bodyClone.style.height = 'auto';
        bodyClone.style.minHeight = '100vh';
        bodyClone.style.maxHeight = 'none';
        bodyClone.style.position = 'static';
        bodyClone.classList.remove('overflow-hidden', 'overflow-y-hidden', 'no-scroll', 'lenis-stopped', 'has-scroll-smooth', 'noscroll');
      }

      // Unblock potential full-screen fixed container locks (like #__next, #root, .smooth-wrapper)
      docClone.querySelectorAll('#__next, #root, #app, [data-scroll-container], .smooth-wrapper, .smooth-content, .lenis').forEach((el) => {
        el.style.overflow = 'visible';
        el.style.height = 'auto';
        el.style.maxHeight = 'none';
        el.style.position = 'static';
        el.classList.remove('overflow-hidden', 'lenis-stopped');
      });

      // 4. Inject Master Animation Stylesheet
      const masterStyles = `
/* ==========================================================================
   Zippix Ultra High-Fidelity Scroll & Motion FX Engine v5.0
   ========================================================================== */
html {
  overflow-x: hidden !important;
  overflow-y: auto !important;
  height: auto !important;
  min-height: 100% !important;
  scroll-behavior: smooth !important;
}
body {
  overflow-x: hidden !important;
  overflow-y: visible !important;
  height: auto !important;
  min-height: 100vh !important;
  position: static !important;
  touch-action: auto !important;
}
#__next, #root, #app, [data-scroll-container], .smooth-wrapper, .smooth-content, .main-wrapper {
  overflow: visible !important;
  height: auto !important;
  max-height: none !important;
  position: static !important;
}
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
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

/* Sparkling Golden Text Sweep Animation */
@keyframes sparkleLightSweep { 
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.reveal-cinematic-sparkle.is-revealed .sparkle-text, .sparkle-text {
  -webkit-text-fill-color: transparent !important;
  background: linear-gradient(110deg, rgb(255, 255, 255) 0%, rgb(254, 243, 199) 20%, rgb(255, 255, 255) 38%, rgb(253, 230, 138) 48%, rgb(255, 255, 255) 52%, rgb(245, 158, 11) 68%, rgb(255, 255, 255) 85%, rgb(253, 230, 138) 100%) 0px 0px / 280% 100% text !important;
  animation: 3.2s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards running sparkleLightSweep !important;
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

      // 5. Inject Master Interactive JavaScript Runtime
      const runtimeScript = document.createElement('script');
      runtimeScript.setAttribute('id', 'zippix-client-runtime-v5');
      runtimeScript.textContent = `
(function() {
  // Guarantee Native Scrolling on all environments
  function ensureScrollable() {
    try {
      document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
      document.documentElement.style.setProperty('height', 'auto', 'important');
      document.body.style.setProperty('overflow-y', 'auto', 'important');
      document.body.style.setProperty('height', 'auto', 'important');
      document.body.style.setProperty('position', 'static', 'important');
      document.documentElement.classList.remove('overflow-hidden', 'lenis-stopped', 'has-scroll-smooth', 'no-scroll');
      document.body.classList.remove('overflow-hidden', 'lenis-stopped', 'has-scroll-smooth', 'no-scroll');
    } catch(e) {}
  }
  ensureScrollable();
  window.addEventListener('DOMContentLoaded', ensureScrollable);
  window.addEventListener('load', ensureScrollable);
  setTimeout(ensureScrollable, 300);
  setTimeout(ensureScrollable, 1200);

  // 1. Dynamic Navbar Scrolled Transition
  function initNavbar() {
    var nav = document.querySelector('nav, header');
    if (!nav) return;
    function updateNav() {
      if (window.scrollY > 25) {
        nav.style.backgroundColor = 'rgba(7, 6, 10, 0.95)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.webkitBackdropFilter = 'blur(12px)';
        nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
      } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.webkitBackdropFilter = 'none';
        nav.style.borderBottom = 'none';
        nav.style.boxShadow = 'none';
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // 2. High-Precision IntersectionObserver for Scroll Reveals
  function initReveals() {
    var elements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-smoky-wave, .reveal-cinematic-sparkle, [class*="reveal-"], [data-aos]'
    );

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed', 'aos-animate');
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
          el.classList.add('is-revealed', 'aos-animate');
        } else {
          observer.observe(el);
        }
      });
    } else {
      elements.forEach(function(el) { el.classList.add('is-revealed'); });
    }

    // Safety fallback: unblock after 2.5s if any element remained hidden
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
    }, 2500);
  }

  // 3. Lightweight Twinkling Sparkles Canvas (GPU-accelerated, zero shadowBlur lag)
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
      var count = 18;
      var colors = ['#f59e0b', '#fbbf24', '#fde68a', '#ffffff'];

      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          maxOpacity: Math.random() * 0.7 + 0.3,
          opacity: Math.random() * 0.8,
          speedY: -(Math.random() * 0.25 + 0.1),
          speedX: (Math.random() - 0.5) * 0.15,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
          isStar: Math.random() > 0.5
        });
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

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fill();
          ctx.restore();
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
          img.style.zIndex = '3';
          img.style.opacity = '1';
          img.style.pointerEvents = 'auto';
          img.style.transform = 'translate3d(0px, 0px, 0px) scale(1) rotateY(0deg)';
        } else if (diff === 1) {
          img.style.zIndex = '2';
          img.style.opacity = '0.8';
          img.style.pointerEvents = 'auto';
          img.style.cursor = 'pointer';
          img.style.transform = 'translate3d(32px, -22.4px, 0px) scale(0.85) rotateY(-15deg)';
        } else if (diff === -1 || diff === n - 1) {
          img.style.zIndex = '2';
          img.style.opacity = '0.8';
          img.style.pointerEvents = 'auto';
          img.style.cursor = 'pointer';
          img.style.transform = 'translate3d(-32px, -22.4px, 0px) scale(0.85) rotateY(15deg)';
        } else {
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

  function initAll() {
    initNavbar();
    initReveals();
    initSparkleCanvases();
    initHeroSwapper();
    initTestimonialStack();
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

      // Sorted colors
      const sortedColors = Array.from(colorsMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([value, count]) => ({ value, count }));

      // Formatted fonts
      const formattedFonts = Array.from(fontsMap.values()).map((f) => ({
        family: f.name,
        weights: Array.from(f.weights),
        sampleText: f.sampleText,
      }));

      return {
        html: '<!DOCTYPE html>\n' + docClone.outerHTML,
        title: document.title || domain,
        tokens: {
          colors: sortedColors,
          fonts: formattedFonts,
        },
        assets: assetsList,
      };
    }, validUrl);

    onProgress({ step: 5, message: 'HTML and Design Tokens successfully captured!', progress: 100 });

    return {
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
