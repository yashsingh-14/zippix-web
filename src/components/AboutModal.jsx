import React from 'react';
import { X, Sparkles, Shield, Cpu, Layers, Heart, Globe } from 'lucide-react';

export const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-500/30 bg-[#0c0c14] p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-1.5 text-[#94a3b8] hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-300">
            <Sparkles className="h-3 w-3" />
            <span>About Zippix Cloud</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Engineering the Future of Webpage Archiving</h2>
          <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            Zippix was built to eliminate the gap between live web experiences and static design assets.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed border-t border-white/[0.08] pt-4">
          <p>
            Traditional webpage scrapers only capture static HTML text, leaving behind CSS variables, dynamic animations, WebGL canvases, and JavaScript hydration. Zippix changes this completely.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="rounded-2xl border border-white/[0.06] bg-[#07070d] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Cpu className="h-4 w-4" />
                <span>Headless Cloud Chromium</span>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Runs real browser instances in the cloud, allowing modern frameworks like Next.js, React, and Vue to fully execute before capture.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-[#07070d] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Layers className="h-4 w-4" />
                <span>Lenis & Motion Engine</span>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Preserves scroll-triggered reveals, physics-based momentum scrolling, and keyframe animations in standalone offline bundles.
              </p>
            </div>
          </div>

          <h3 className="text-base font-bold text-white pt-2">Our Mission</h3>
          <p>
            To provide UI/UX designers, frontend developers, and digital archivists with the world's most precise tool for inspecting, archiving, and generating production-ready Tailwind CSS design tokens from any public website.
          </p>
        </div>

        <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between text-xs text-[#64748b]">
          <span>Zippix Technologies © 2026</span>
          <button onClick={onClose} className="rounded-xl btn-antigravity px-4 py-2 font-bold text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
