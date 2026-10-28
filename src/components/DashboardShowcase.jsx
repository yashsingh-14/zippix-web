import React from 'react';
import { Download, Rocket, BarChart2, Activity, CheckCircle, Sparkles, Layers, Terminal } from 'lucide-react';

export const DashboardShowcase = () => {
  return (
    <section id="dashboard-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span>Interactive Workspace</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Inspection & <span className="text-gradient-electric">Code Extraction</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Inspect extracted DOM components, switch viewports, explore design tokens, and download clean production code
          in real time.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Floating Badge 1 (Top Left) */}
        <div className="hidden lg:block absolute -left-16 top-12 z-20 float-badge" style={{ animationDelay: '0s' }}>
          <div className="glass-card rounded-xl p-3 shadow-2xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Download className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Multi-Export</p>
              <p className="text-[11px] text-slate-400">Standalone ZIP & HTML</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 2 (Top Right) */}
        <div className="hidden lg:block absolute -right-12 top-16 z-20 float-badge" style={{ animationDelay: '0.8s' }}>
          <div className="glass-card rounded-xl p-3 shadow-2xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <Layers className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Token Extraction</p>
              <p className="text-[11px] text-slate-400">Tailwind v4 & CSS Vars</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 3 (Bottom Left) */}
        <div className="hidden lg:block absolute -left-12 bottom-16 z-20 float-badge" style={{ animationDelay: '1.6s' }}>
          <div className="glass-card rounded-xl p-3 shadow-2xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <BarChart2 className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Asset Resolver</p>
              <p className="text-[11px] text-slate-400">100% Inlined SVGs & Media</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 4 (Bottom Right) */}
        <div className="hidden lg:block absolute -right-16 bottom-12 z-20 float-badge" style={{ animationDelay: '2.4s' }}>
          <div className="glass-card rounded-xl p-3 shadow-2xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Activity className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">60 FPS Motion</p>
              <p className="text-[11px] text-slate-400">Zero Lag Scroll Capture</p>
            </div>
          </div>
        </div>

        {/* Dashboard Frame Window */}
        <div className="glass-card rounded-2xl shadow-2xl overflow-hidden border border-white/10 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* Window Chrome Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#02050f]/90">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <span className="text-xs font-mono text-slate-400 font-medium">zippix-cloud-workspace</span>
            <div className="w-12" />
          </div>

          {/* Inner Mock Dashboard Content */}
          <div className="p-6 sm:p-8 space-y-6 text-left bg-[#02040a]/60">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Reconstructed Workspace
                </span>
                <h3 className="text-xl font-bold mt-0.5 text-white">callofjesus.in — Full Architecture</h3>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Production Ready</span>
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[11px] text-slate-400 uppercase font-mono">HTML Document</p>
                <p className="text-base font-bold mt-1 text-white">1.07 MB</p>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Design Tokens</p>
                <p className="text-base font-bold text-blue-400 mt-1">20 Palettes</p>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Animation Layers</p>
                <p className="text-base font-bold text-emerald-400 mt-1">GPU Accelerated</p>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Export Bundle</p>
                <p className="text-base font-bold text-indigo-400 mt-1">ZIP Package</p>
              </div>
            </div>

            {/* Visual Code Preview Mock */}
            <div className="rounded-xl border border-white/10 bg-[#010308] p-4 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-white/[0.06]">
                <span>theme.css — Tailwind v4 Engine Tokens</span>
                <span className="text-blue-400 font-semibold">@import "tailwindcss";</span>
              </div>
              <p className="text-slate-400">@theme &#123;</p>
              <p className="pl-4 text-blue-300">--color-primary: #020408;</p>
              <p className="pl-4 text-blue-300">--color-accent: #2563eb;</p>
              <p className="pl-4 text-blue-300">--color-celestial: #60a5fa;</p>
              <p className="pl-4 text-slate-400">--font-serif-italic: "Instrument Serif", serif;</p>
              <p className="text-slate-400">&#125;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
