import React from 'react';
import { Cpu, Eye, FolderArchive, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const STAGES = [
  {
    phase: 'PHASE 01',
    title: 'Cloud Ingestion & Sandbox Isolation',
    icon: Cpu,
    description:
      'Ephemeral headless Chromium sandbox launches, loads the target URL, resolves network idle, and waits for React/Next.js client-side data hydration.',
    badge: 'Sandboxed Chromium',
    codeDetail: 'browser.newPage() → networkidle2 → DOM hydrated',
  },
  {
    phase: 'PHASE 02',
    title: 'Scroll Simulation & Motion Harvesting',
    icon: Eye,
    description:
      'Simulated multi-pass scrolling triggers IntersectionObservers and keyframe reveals, while removing CPU-heavy wheel blockers to preserve native 60 FPS motion.',
    badge: '60 FPS Unblocked',
    codeDetail: 'triggerReveals() → removeWheelBlockers() → captureComputedCSS()',
  },
  {
    phase: 'PHASE 03',
    title: 'Compiler, Token Ripper & ZIP Packaging',
    icon: FolderArchive,
    description:
      'Inlines images and vector SVGs, extracts color palettes into Tailwind CSS v4 @theme, and bundles everything into an offline standalone ZIP archive.',
    badge: '100% Offline Bundle',
    codeDetail: 'compileTailwindV4() → inlineAssets() → zipArchive.export()',
  },
];

export const CloudPipelineSteps = () => {
  return (
    <section id="pipeline-stages" className="py-20 border-y border-white/[0.06] bg-[#02050f]/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span>Autonomous Execution Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            The 3-Phase <span className="text-gradient-electric">Reconstruction Engine</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-normal">
            How Zippix transforms any live URL into clean code, design tokens, and self-contained assets in seconds.
          </p>
        </div>

        {/* 3 Interactive Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.phase}
                className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                      {s.phase}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {s.badge}
                    </span>
                  </div>

                  <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{s.description}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-blue-300/80 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  <code>{s.codeDetail}</code>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
