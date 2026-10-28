import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Palette,
  FolderArchive,
  Sparkles,
  CheckCircle2,
  Code2,
  Eye,
  Terminal,
  Zap,
} from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'dom',
    title: 'Virtual DOM Hydration',
    icon: Cpu,
    tag: 'Cloud Chromium Runtime',
    description:
      'Loads complex client-side React, Next.js, Vue, and Angular applications. Waits for API requests to resolve, executes JavaScript hydration, and extracts the fully rendered semantic DOM.',
    metrics: ['Supports Client-Side Hydration', 'Full DOM Tree Traversal', 'Removes Broken Tracking Scripts'],
    codeSnippet: `// Cloud Virtualization Pipeline
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle2' });
await autoScrollToTriggerReveals(page);
const hydratedDOM = await page.evaluate(() => document.documentElement.outerHTML);`,
  },
  {
    id: 'motion',
    title: '60 FPS Motion Preserver',
    icon: Sparkles,
    tag: 'GPU Hardware Accelerated',
    description:
      'Captures interactive reveal animations, keyframe transforms, and GSAP/Lenis scroll behaviors while completely stripping CPU-heavy wheel blockers. The exported output scrolls natively at 60 FPS.',
    metrics: ['Native Smooth Scrolling', 'Unblocks Hidden Reveal Sections', 'Zero Mouse Jitter or Stutter'],
    codeSnippet: `/* Native Smooth Scroll Engine */
html {
  scroll-behavior: smooth;
  scroll-timeline: auto;
}
.reveal-animated {
  opacity: 1 !important;
  transform: none !important;
  animation-fill-mode: forwards;
}`,
  },
  {
    id: 'tokens',
    title: 'Tailwind CSS v4 Compiler',
    icon: Palette,
    tag: 'Design System Engine',
    description:
      'Scans all computed CSS properties, extracts color frequencies, font families, letter spacings, and border radiuses, and automatically formats them into a production-ready Tailwind CSS v4 @theme file.',
    metrics: ['Tailwind v4 @theme Generation', 'CSS Custom Properties Export', 'Machine-Readable tokens.json'],
    codeSnippet: `@import "tailwindcss";

@theme {
  --color-brand-primary: oklch(0.55 0.22 255);
  --color-brand-surface: oklch(0.12 0.02 260);
  --font-sans: 'Plus Jakarta Sans', system-ui;
  --radius-card: 1rem;
}`,
  },
  {
    id: 'bundle',
    title: 'Zero-Dependency Offline ZIP',
    icon: FolderArchive,
    tag: 'Self-Contained Bundle',
    description:
      'Inlines images, SVGs, stylesheets, and custom webfonts directly into the export or packages them locally, ensuring the resulting website runs 100% offline without missing a single icon.',
    metrics: ['100% Offline Runnable', 'No Broken External CDN Links', 'One-Click Downloadable ZIP'],
    codeSnippet: `📁 zippix-export-package/
├── 📄 index.html        (Fully self-contained markup)
├── 🎨 theme.css         (Tailwind CSS v4 theme)
├── ⚙️ tailwind.config.js (Tailwind v3 fallback)
├── 📊 tokens.json       (Computed design tokens)
└── 🖼️ assets/           (Extracted SVG icons & images)`,
  },
];

export const EngineMatrix = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = CAPABILITIES[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section id="engine-matrix" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span>Core Engine Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Engineered for <span className="text-gradient-electric">Absolute Precision</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Beyond a naive scraper — Zippix operates an autonomous cloud runtime to deconstruct, hydrate, and compile
          modern web architectures.
        </p>
      </div>

      {/* Interactive Matrix Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Tab Selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const isActive = activeTab === idx;
            return (
              <div
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`cursor-pointer rounded-2xl p-5 text-left border transition-all duration-200 ${
                  isActive
                    ? 'glass-card border-blue-500/80 shadow-[0_0_25px_rgba(37,99,235,0.25)] bg-[#070e24]/80'
                    : 'bg-[#030712]/50 border-white/5 hover:border-white/15 hover:bg-[#050b1d]/60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {cap.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Dynamic Interactive Engine Visualizer */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden text-left min-h-[420px]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          {/* Top Inspector Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <CurrentIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{current.title}</h3>
                  <span className="text-[11px] font-mono text-blue-400 font-semibold">{current.tag}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">Ready</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {current.description}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              {current.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-xs text-slate-200 flex items-center gap-2"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code/Pipeline Output Box */}
          <div className="mt-6 rounded-xl border border-white/10 bg-[#02050f] p-4 font-mono text-xs overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-3 text-[10px] text-slate-500">
              <span>output-manifest.ts</span>
              <span className="text-blue-400">cloud-compiler: active</span>
            </div>
            <pre className="text-slate-300 text-[11px] leading-relaxed">
              <code>{current.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
