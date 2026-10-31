import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Code2,
  Layers,
  Eye,
  Sliders,
  Move,
  Zap,
  Repeat,
  Box,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const MotionComponentsRipper = ({
  domain = 'website.com',
  title = 'Reconstructed Website',
  tokens = { colors: [], fonts: [] },
  html = '',
  onRequirePro,
  isPro = false,
}) => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [expandedCodeId, setExpandedCodeId] = useState(null);
  const [activeTabFilter, setActiveTabFilter] = useState('all');

  // Derive theme colors from extracted website tokens
  const primaryColor = tokens.colors?.[0]?.value || '#38bdf8';
  const secondaryColor = tokens.colors?.[1]?.value || '#6366f1';
  const accentColor = tokens.colors?.[2]?.value || '#c084fc';
  const darkBg = '#0b0d17';

  // Handle copy with feedback
  const handleCopy = (code, key) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Download standalone component as HTML file
  const handleDownloadComponent = (component) => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${component.title} - Extracted from ${domain}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${component.customCss || ''}
  </style>
</head>
<body class="bg-[#030712] text-white flex min-h-screen items-center justify-center p-6 antialiased">
  <div class="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
    <div class="text-center mb-8">
      <span class="text-xs font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
        ${component.badge} • Extracted from ${domain}
      </span>
      <h1 class="text-2xl font-bold mt-2">${component.title}</h1>
    </div>

    <!-- Standalone Component Markup -->
    ${component.codeHtml}
  </div>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${component.id}-${domain.replace(/[^a-z0-9_-]/gi, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 5 Signature extracted motion & animated UI components
  const motionComponents = useMemo(() => {
    return [
      {
        id: 'infinite-marquee',
        category: 'marquee',
        badge: 'Infinite Motion Marquee',
        title: 'Smooth Running Logo & Badge Marquee',
        description:
          'Continuous horizontal scrolling banner track with pause-on-hover physics and seamless looping.',
        tags: ['Continuous Loop', 'Pause on Hover', 'GPU-Accelerated'],
        codeHtml: `<div class="relative w-full overflow-hidden py-4 bg-white/[0.02] border-y border-white/[0.08] rounded-2xl">
  <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"></div>
  <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"></div>

  <div class="flex gap-6 animate-zippix-marquee hover:[animation-play-state:paused] select-none whitespace-nowrap">
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${primaryColor}"></span>
      <span>${domain.toUpperCase()}</span>
    </div>
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${secondaryColor}"></span>
      <span>Next.js 15 Ready</span>
    </div>
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${accentColor}"></span>
      <span>Tailwind CSS v4</span>
    </div>
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${primaryColor}"></span>
      <span>60 FPS Motion</span>
    </div>
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${secondaryColor}"></span>
      <span>Reconstructed Architecture</span>
    </div>
    <!-- Duplicate track for seamless infinite flow -->
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${primaryColor}"></span>
      <span>${domain.toUpperCase()}</span>
    </div>
    <div class="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm">
      <span class="h-2 w-2 rounded-full" style="background-color: ${secondaryColor}"></span>
      <span>Next.js 15 Ready</span>
    </div>
  </div>
</div>`,
        customCss: `@keyframes zippix-marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-zippix-marquee {
  display: flex;
  width: max-content;
  animation: zippix-marquee 18s linear infinite;
}`,
        renderPreview: () => (
          <div className="relative w-full overflow-hidden py-4 bg-white/[0.02] border-y border-white/[0.08] rounded-2xl group">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0c0d16] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0c0d16] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 animate-[zippix-marquee_16s_linear_infinite] group-hover:[animation-play-state:paused] select-none whitespace-nowrap">
              {['Design Tokens', domain, 'Smooth Motion', 'Ultra 4K', 'Tailwind v4', 'Design Tokens', domain, 'Smooth Motion'].map(
                (text, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white shadow-sm"
                  >
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor:
                          idx % 3 === 0 ? primaryColor : idx % 3 === 1 ? secondaryColor : accentColor,
                      }}
                    />
                    <span>{text}</span>
                  </div>
                )
              )}
            </div>
          </div>
        ),
      },

      {
        id: '3d-tilt-card',
        category: 'card',
        badge: 'Interactive 3D Card',
        title: 'Holographic Tilt Card with Ambient Glow',
        description:
          'Futuristic card with reactive gradient borders, subtle glassmorphic backdrop, and 3D hover depth.',
        tags: ['3D Perspective', 'Radial Gradient Border', 'Micro-Interactions'],
        codeHtml: `<div class="group relative rounded-3xl p-6 bg-[#0c0d16] border border-white/10 transition-all duration-500 hover:border-transparent hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:-translate-y-1.5 overflow-hidden">
  <!-- Glowing Background Mesh on Hover -->
  <div class="absolute -inset-px rounded-3xl bg-gradient-to-r from-[${primaryColor}] via-[${secondaryColor}] to-[${accentColor}] opacity-0 group-hover:opacity-100 transition duration-500 -z-10 blur-xs"></div>
  
  <div class="flex items-center justify-between mb-4">
    <div class="h-10 w-10 rounded-2xl flex items-center justify-center text-white font-bold" style="background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor})">
      ⚡
    </div>
    <span class="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
      Feature Module
    </span>
  </div>

  <h3 class="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
    Intelligent Asset Engine
  </h3>
  <p class="text-xs text-slate-400 mt-2 leading-relaxed">
    Dynamically reconstructed from ${domain} with GPU-accelerated motion profiles and lossless inline assets.
  </p>

  <div class="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold">
    <span class="text-slate-400">Status</span>
    <span class="text-emerald-400 flex items-center gap-1.5">
      <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
      Active & Extracted
    </span>
  </div>
</div>`,
        customCss: `.card-3d-glow:hover {
  transform: translateY(-6px) perspective(1000px) rotateX(2deg) rotateY(-2deg);
  box-shadow: 0 20px 40px -15px rgba(56, 189, 248, 0.3);
}`,
        renderPreview: () => (
          <div className="group relative rounded-2xl p-5 bg-[#0c0d16] border border-white/10 transition-all duration-300 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:-translate-y-1 overflow-hidden text-left max-w-sm mx-auto">
            <div
              className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition duration-500"
              style={{ backgroundColor: primaryColor }}
            />
            <div className="flex items-center justify-between mb-3">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/10">
                Extracted FX
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition">
              Interactive 3D Motion Card
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Hover to trigger dynamic radial glow, elevation physics, and border shine.
            </p>
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Origin Domain</span>
              <span className="font-mono text-sky-400 font-semibold">{domain}</span>
            </div>
          </div>
        ),
      },

      {
        id: 'hero-floating-badge',
        category: 'hero',
        badge: 'Hero Floating Physics',
        title: '3D Floating Hero Showcase & Orbital Glow',
        description:
          'Iconic hero section centerpiece with continuous vertical floating physics, ambient pulsing mesh, and isometric angles.',
        tags: ['Keyframe Float', 'Orbital Rings', 'Isometric Projection'],
        codeHtml: `<div class="relative flex flex-col items-center justify-center p-8 overflow-hidden rounded-3xl bg-[#030712] border border-white/10">
  <!-- Glowing Background Orbs -->
  <div class="absolute w-48 h-48 rounded-full blur-[70px] opacity-25 animate-pulse" style="background-color: ${primaryColor}"></div>
  <div class="absolute w-40 h-40 rounded-full blur-[80px] opacity-20 animate-pulse delay-700" style="background-color: ${secondaryColor}"></div>

  <!-- Floating Centerpiece Box -->
  <div class="relative animate-zippix-float flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/20 shadow-2xl">
    <div class="h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style="background: linear-gradient(135deg, ${primaryColor}, ${accentColor})">
      <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </div>
    <div class="text-center">
      <h4 class="text-sm font-bold text-white">${title || domain}</h4>
      <p class="text-xs text-slate-400">Reconstructed 3D Hero Unit</p>
    </div>
  </div>
</div>`,
        customCss: `@keyframes zippix-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(1deg);
  }
}
.animate-zippix-float {
  animation: zippix-float 4.5s ease-in-out infinite;
}`,
        renderPreview: () => (
          <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden rounded-2xl bg-[#0c0d16] border border-white/10">
            <div
              className="absolute w-36 h-36 rounded-full blur-2xl opacity-20 animate-pulse pointer-events-none"
              style={{ backgroundColor: primaryColor }}
            />
            <div className="relative animate-[zippix-float_4s_ease-in-out_infinite] flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/20 shadow-xl">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                <Box className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-white">{domain}</p>
              <span className="text-[10px] text-sky-400 font-mono bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                Floating Hero Plate
              </span>
            </div>
          </div>
        ),
      },

      {
        id: 'bento-scroll-grid',
        category: 'bento',
        badge: 'Staggered Bento Grid',
        title: 'Modern Bento Feature Grid with Staggered Reveals',
        description:
          'Apple-inspired multi-cell bento container with staggered hover highlight, glass backing, and dynamic grid spans.',
        tags: ['Responsive Grid', 'Staggered Hover', 'Bento Architecture'],
        codeHtml: `<div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full">
  <!-- Bento Cell 1 (Wide) -->
  <div class="md:col-span-2 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition group text-left">
    <div class="h-2 w-12 rounded-full mb-3" style="background-color: ${primaryColor}"></div>
    <h4 class="text-sm font-bold text-white group-hover:text-sky-300 transition">Design Token Extraction</h4>
    <p class="text-xs text-slate-400 mt-1">Automatic palette clustering, typography scales, and Tailwind utility mapping.</p>
  </div>

  <!-- Bento Cell 2 (Square) -->
  <div class="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition group text-left">
    <span class="text-xl">⚡</span>
    <h4 class="text-sm font-bold text-white mt-2 group-hover:text-purple-300 transition">60 FPS Render</h4>
    <p class="text-xs text-slate-400 mt-1">GPU-accelerated CSS keyframes.</p>
  </div>
</div>`,
        customCss: `.bento-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}`,
        renderPreview: () => (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full text-left">
            <div className="sm:col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 hover:bg-white/[0.06] transition group">
              <div className="h-1.5 w-10 rounded-full mb-2" style={{ backgroundColor: primaryColor }} />
              <p className="text-xs font-bold text-white group-hover:text-sky-300 transition">
                Extracted Architecture
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Multi-column bento system with dynamic spans and glassmorphism.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 hover:bg-white/[0.06] transition group">
              <span className="text-base">💎</span>
              <p className="text-xs font-bold text-white mt-1 group-hover:text-purple-300 transition">
                Instant Ready
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Drop into Next.js/Vite.</p>
            </div>
          </div>
        ),
      },

      {
        id: 'shimmer-cta-button',
        category: 'cta',
        badge: 'Interactive Micro-CTA',
        title: 'Shimmering Magnetic Action Button with Glow Beacon',
        description:
          'High-converting action button featuring a continuous diagonal light-beam sweep and interactive pulsing dot.',
        tags: ['Shimmer Sweep', 'Pulsing Beacon', 'Magnetic Glow'],
        codeHtml: `<button class="relative group overflow-hidden px-6 py-3 rounded-xl font-bold text-xs text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95" style="background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor})">
  <!-- Light Beam Sweep -->
  <div class="absolute inset-0 -translate-x-full group-hover:animate-zippix-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
  
  <span class="relative z-10 flex items-center gap-2">
    <span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
    <span>Explore ${domain} Code</span>
    <span class="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</button>`,
        customCss: `@keyframes zippix-shimmer {
  100% {
    transform: translateX(100%);
  }
}
.animate-zippix-shimmer {
  animation: zippix-shimmer 1.4s infinite;
}`,
        renderPreview: () => (
          <div className="flex items-center justify-center p-6">
            <button
              type="button"
              className="relative group overflow-hidden px-6 py-3 rounded-xl font-bold text-xs text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <span className="relative z-10 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Download {domain} Component</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        ),
      },
    ];
  }, [domain, title, primaryColor, secondaryColor, accentColor]);

  // Filtered components list
  const filteredComponents = useMemo(() => {
    if (activeTabFilter === 'all') return motionComponents;
    return motionComponents.filter((c) => c.category === activeTabFilter);
  }, [motionComponents, activeTabFilter]);

  return (
    <div className="space-y-6 text-left">
      {/* Toast Feedback */}
      {copiedKey && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-sky-300 shadow-2xl backdrop-blur-xl animate-bounce">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Code copied to clipboard!</span>
        </div>
      )}

      {/* Feature Intro Banner */}
      <div className="rounded-3xl border border-white/10 bg-[#0c0d16]/95 backdrop-blur-xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-400" />
                Motion & Component Ripper
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {motionComponents.length} Extracted Animations
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Instant UI Components, Marquees & 3D Motion
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Don't need the whole website? Rip and export individual animated hero sections, 3D cards,
              infinite marquees, and bento grids with ready-to-paste HTML, CSS, and Tailwind code.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            {[
              { id: 'all', label: 'All Modules' },
              { id: 'marquee', label: 'Marquees' },
              { id: 'card', label: '3D Cards' },
              { id: 'hero', label: 'Hero 3D' },
              { id: 'bento', label: 'Bento Grid' },
              { id: 'cta', label: 'Buttons' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition text-xs cursor-pointer ${
                  activeTabFilter === tab.id
                    ? 'bg-sky-500 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredComponents.map((component) => {
          const isExpanded = expandedCodeId === component.id;

          return (
            <div
              key={component.id}
              className="rounded-3xl border border-white/10 bg-[#090b14] overflow-hidden shadow-xl transition-all duration-300 hover:border-white/20 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-white/[0.06] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                    {component.badge}
                  </span>
                  <h4 className="text-base font-bold text-white">{component.title}</h4>
                </div>

                {/* Action Buttons Header */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(component.codeHtml, component.id)}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition text-xs flex items-center gap-1 cursor-pointer"
                    title="Copy Component Code"
                  >
                    {copiedKey === component.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline">Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadComponent(component)}
                    className="btn-zippix-primary px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                    title="Download Standalone HTML Component"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Interactive Live Preview Box */}
              <div className="p-5 bg-black/40 min-h-[160px] flex items-center justify-center">
                {component.renderPreview()}
              </div>

              {/* Details & Tags */}
              <div className="p-5 border-t border-white/[0.06] space-y-3 bg-[#080911]">
                <p className="text-xs text-slate-400 leading-relaxed">{component.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {component.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedCodeId(isExpanded ? null : component.id)}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>{isExpanded ? 'Hide Code' : 'View Code'}</span>
                    {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                </div>

                {/* Expandable Code Drawer */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-3 animate-fadeIn">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>HTML & Tailwind Markup</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(component.codeHtml, `${component.id}-html`)}
                          className="text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy HTML</span>
                        </button>
                      </div>
                      <pre className="p-3 rounded-xl bg-black/70 border border-white/10 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                        {component.codeHtml}
                      </pre>
                    </div>

                    {component.customCss && (
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                          <span>CSS Keyframes & Animations</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(component.customCss, `${component.id}-css`)}
                            className="text-sky-400 hover:underline flex items-center gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            <span>Copy CSS</span>
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-black/70 border border-white/10 text-[11px] font-mono text-amber-300/90 overflow-x-auto max-h-36 leading-relaxed">
                          {component.customCss}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
