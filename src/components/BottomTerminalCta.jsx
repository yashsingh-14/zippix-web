import React, { useState } from 'react';
import { Rocket, Terminal, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const BottomTerminalCta = ({ onLaunchUrl }) => {
  const [quickUrl, setQuickUrl] = useState('');

  const handleLaunch = (e) => {
    e?.preventDefault();
    if (!quickUrl.trim()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (onLaunchUrl) {
      onLaunchUrl(quickUrl.trim());
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="glass-card rounded-3xl p-8 sm:p-14 space-y-6 text-center relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/15 via-transparent to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Zap className="h-3.5 w-3.5 text-blue-400" />
          <span>Instant Autonomous Deconstruction</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
          Ready to Deconstruct Your <span className="text-gradient-electric">First Webpage</span>?
        </h2>

        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Join engineers, designers, and studios converting live web experiences into clean production code in seconds.
        </p>

        {/* Quick Launch Input Form */}
        <form onSubmit={handleLaunch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5 pt-2">
          <input
            type="url"
            value={quickUrl}
            onChange={(e) => setQuickUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 bg-[#030712]/90 text-white placeholder:text-slate-500 font-mono text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            type="submit"
            className="btn-zippix-primary rounded-xl px-7 py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xl shrink-0"
          >
            <Rocket className="h-4 w-4" />
            <span>Launch Engine</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            <span>Zero Browser Plugins</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            <span>Instant Standalone ZIP</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            <span>Tailwind v4 Theme</span>
          </span>
        </div>
      </div>
    </section>
  );
};
