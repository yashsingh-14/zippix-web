import React from 'react';
import {
  Sparkles,
  Layers,
  Palette,
  Terminal,
  FolderArchive,
  Cpu,
  Eye,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const ToolsBento = () => {
  return (
    <section id="tools-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Engine Architecture</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Engineered for <span className="text-gradient-electric">Absolute Precision</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Beyond a simple scraper — Zippix operates a complete headless browser runtime to render, extract, and
          compile modern web architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Headless DOM Virtualization (8 cols) */}
        <div className="md:col-span-8 glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col md:flex-row gap-6 items-center text-left relative overflow-hidden">
          <div className="flex-1 space-y-3 z-10">
            <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Headless Chromium Virtualization
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every target webpage is loaded in a sandboxed cloud browser. JavaScript hydration, interactive CSS reveal
              animations, and canvas rendering are captured at their exact interactive peak.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-blue-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> 60 FPS Scroll Motion
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" /> Full DOM Hydration
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 rounded-xl p-4 font-mono text-xs border border-white/10 bg-[#02050f]/90 text-blue-300 shadow-inner z-10">
            <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-2">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-[10px] text-slate-400">engine-manifest.json</span>
            </div>
            <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto">
              <code>{`{
  "runtime": "Chromium Headless",
  "scrollSimulation": "60fps-smooth",
  "cssTokens": "extracted",
  "hydration": "complete",
  "assets": "self-contained"
}`}</code>
            </pre>
          </div>
        </div>

        {/* Card 2: Tailwind Token Ripper (4 cols) */}
        <div className="md:col-span-4 glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between text-left">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Design Token Ripper</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Instantly converts the computed styles, color palettes, spacing units, and font stacks into a modern
              Tailwind CSS v4 config.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Token Harmony Scan</span>
              <span className="text-blue-400 font-semibold">100% Extracted</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Card 3: Complete Offline ZIP (4 cols) */}
        <div className="md:col-span-4 glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between text-left">
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <FolderArchive className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Zero Broken Assets</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every image, font, stylesheet, and SVG is resolved and packaged into a self-contained ZIP bundle that runs
              offline without any external dependencies.
            </p>
          </div>

          <div className="mt-6 rounded-lg p-2.5 text-xs font-mono flex items-center justify-between border border-white/10 bg-white/[0.03] text-slate-300">
            <span>zippix-archive.zip</span>
            <span className="text-emerald-400 font-semibold">100% Offline</span>
          </div>
        </div>

        {/* Card 4: Animation & Reveal Preserver (8 cols) */}
        <div className="md:col-span-8 glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col md:flex-row gap-6 items-center text-left">
          <div className="w-full md:w-1/3 grid grid-cols-2 gap-2.5">
            <div className="aspect-square rounded-xl flex flex-col items-center justify-center border border-white/10 bg-white/[0.02] text-xs font-semibold text-slate-200">
              <Eye className="h-5 w-5 text-blue-400 mb-1" />
              <span>Reveals</span>
            </div>
            <div className="aspect-square rounded-xl flex flex-col items-center justify-center border border-white/10 bg-white/[0.02] text-xs font-semibold text-slate-200">
              <Sparkles className="h-5 w-5 text-sky-400 mb-1" />
              <span>Particles</span>
            </div>
            <div className="aspect-square rounded-xl flex flex-col items-center justify-center border border-white/10 bg-white/[0.02] text-xs font-semibold text-slate-200">
              <Terminal className="h-5 w-5 text-indigo-400 mb-1" />
              <span>Scripts</span>
            </div>
            <div className="aspect-square rounded-xl flex flex-col items-center justify-center border border-white/10 bg-white/[0.02] text-xs font-semibold text-slate-200">
              <Layers className="h-5 w-5 text-cyan-400 mb-1" />
              <span>Keyframes</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Native Scroll & Motion Preservation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We eliminated laggy wheel interceptors and excessive shadow filters. The resulting clone scrolls natively
              with full GPU hardware acceleration and buttery 60 FPS fidelity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
