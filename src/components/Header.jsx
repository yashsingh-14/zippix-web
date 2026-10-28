import React from 'react';
import { Sparkles, Globe, DownloadCloud, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export const Header = ({ isPro, freeClonesRemaining, onOpenProModal }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070a]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand with Transparent Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 opacity-30 blur-sm group-hover:opacity-75 transition duration-300" />
            <img
              src="/logo.svg"
              alt="Zippix Logo"
              className="relative h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] transition transform group-hover:scale-105 duration-200"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">Zippix</span>
              <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-sky-300 uppercase shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                Web
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-medium">AI Cloud Cloner & Token Ripper</p>
          </div>
        </div>

        {/* Center Live Status Badge (Antigravity Style) */}
        <div className="hidden md:flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-xs text-[#94a3b8] shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="font-mono text-[11px] text-[#cbd5e1]">Chromium Engine v128 • Online</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Plan Status */}
          {isPro ? (
            <div
              onClick={onOpenProModal}
              className="cursor-pointer flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 px-3.5 py-1.5 text-xs font-bold text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.25)] hover:border-sky-400/50 transition"
            >
              <Sparkles className="h-3.5 w-3.5 fill-sky-300 text-sky-300" />
              <span>Unlimited Access Active</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#94a3b8] hover:text-white hover:bg-white/[0.08] transition"
            >
              <span>Free Plan:</span>
              <strong className="text-sky-400">{freeClonesRemaining} clones</strong>
            </button>
          )}

          {/* Pro Action Button */}
          {!isPro && (
            <button
              onClick={onOpenProModal}
              className="btn-antigravity flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5 fill-white text-white" />
              <span>Upgrade Pro</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
