import React from 'react';
import {
  Cpu,
  Layers,
  Palette,
  FileCode,
  FolderArchive,
  Sparkles,
  Zap,
  Globe,
} from 'lucide-react';

const SPEC_ITEMS = [
  { label: 'CHROMIUM HEADLESS RUNTIME', icon: Cpu },
  { label: 'REACT & NEXT.JS DOM HYDRATION', icon: Globe },
  { label: 'TAILWIND CSS v4 THEME COMPILER', icon: Layers },
  { label: 'GPU-ACCELERATED 60FPS MOTION', icon: Sparkles },
  { label: 'SELF-CONTAINED OFFLINE ZIP', icon: FolderArchive },
  { label: 'MACHINE-READABLE DESIGN TOKENS', icon: Palette },
  { label: 'ZERO BROKEN ASSET RESOLUTION', icon: Zap },
];

export const TechStackTicker = () => {
  return (
    <div className="py-5 overflow-hidden border-y border-white/[0.06] bg-[#02050f]/60 backdrop-blur-md">
      <div className="relative w-full overflow-hidden">
        {/* Soft Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#020408] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#020408] to-transparent" />

        {/* Ticker Track */}
        <div className="animate-marquee flex items-center gap-10">
          {[...SPEC_ITEMS, ...SPEC_ITEMS, ...SPEC_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 shrink-0 opacity-70 hover:opacity-100 transition duration-200"
              >
                <div className="h-6 w-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider text-slate-300">
                  {item.label}
                </span>
                <span className="text-slate-600 font-mono select-none">/</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
