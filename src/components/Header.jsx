import React from 'react';
import { Sparkles, Globe, DownloadCloud, ExternalLink, ShieldCheck } from 'lucide-react';

export const Header = ({ freeClonesRemaining, isPro, onOpenProModal }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0c0c0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-sky-500/20 to-purple-500/20 border border-white/[0.12] shadow-sm">
            <svg viewBox="0 0 128 128" className="h-6 w-6">
              <defs>
                <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <polygon points="64,28 94,45 64,62 34,45" fill="url(#navLogoGrad)" />
              <polygon points="64,49 94,66 64,83 34,66" fill="#38bdf8" opacity="0.85" />
              <polygon points="64,70 94,87 64,104 34,87" fill="#818cf8" />
              <circle cx="64" cy="45" r="3.5" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-[#faf9f5]">Zippix</span>
              <span className="rounded-md bg-white/[0.08] border border-white/[0.1] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-300 uppercase">
                Cloud Web
              </span>
            </div>
            <p className="text-[11px] text-[#78716c]">AI Webpage Cloner & Token Ripper</p>
          </div>
        </div>

        {/* Center Badge / Status */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-[#a8a29e]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Cloud Chromium v128 Engine Active</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Plan Status */}
          {isPro ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5 fill-amber-300" />
              <span>Unlimited Pro Active</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-[#a8a29e] hover:text-[#faf9f5] hover:bg-white/[0.08] transition"
            >
              <span>Free Plan:</span>
              <strong className="text-amber-400">{freeClonesRemaining} free clones</strong>
            </button>
          )}

          {/* Pro Button */}
          {!isPro && (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-3.5 py-1.5 text-xs font-bold text-black shadow-sm transition transform active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 fill-black" />
              <span>Upgrade PRO</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
