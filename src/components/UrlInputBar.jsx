import React, { useState } from 'react';
import {
  Terminal,
  Rocket,
  Loader2,
  Sparkles,
  CheckCircle2,
  Sliders,
  Globe2,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Palette,
} from 'lucide-react';

const PRESETS = [
  { name: 'callofjesus.in', url: 'https://callofjesus.in', time: '~11s' },
  { name: 'linear.app', url: 'https://linear.app', time: '~14s' },
  { name: 'stripe.com', url: 'https://stripe.com', time: '~15s' },
  { name: 'github.com', url: 'https://github.com', time: '~12s' },
];

export const UrlInputBar = ({ onClone, isLoading }) => {
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState('standard'); // 'standard' | 'single' | 'deep'
  const [inlineAssets, setInlineAssets] = useState(true);
  const [captureMotion, setCaptureMotion] = useState(true);
  const [extractTailwind, setExtractTailwind] = useState(true);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!url.trim() || isLoading) return;
    onClone(url.trim(), depth);
  };

  const handleSelectPreset = (presetUrl) => {
    setUrl(presetUrl);
    if (!isLoading) {
      onClone(presetUrl, depth);
    }
  };

  return (
    <div id="reconstructor-console" className="w-full max-w-4xl mx-auto space-y-4">
      {/* Console Frame */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
        {/* Subtle Ambient Top Border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main URL Bar with Console Styling */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-4 rounded-xl border border-white/10 bg-[#030612]/95 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all shadow-inner">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-bold text-blue-400 select-none">
                <Globe2 className="h-3 w-3" />
                <span>URL</span>
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter target URL (e.g. https://callofjesus.in)"
                disabled={isLoading}
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-medium text-white placeholder:text-slate-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={!url.trim() || isLoading}
              className="w-full sm:w-auto btn-zippix-primary rounded-xl h-[56px] px-8 text-base font-bold flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                  <span>Reconstructing...</span>
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  <span>Reconstruct</span>
                </>
              )}
            </button>
          </div>

          {/* Engine Parameters & Real-Time Options Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/[0.06] text-xs">
            {/* Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setDepth('standard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  depth === 'standard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Architecture
              </button>
              <button
                type="button"
                onClick={() => setDepth('single')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  depth === 'single'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Quick Snapshot
              </button>
              <button
                type="button"
                onClick={() => setDepth('deep')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  depth === 'deep'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Token Ripper
              </button>
            </div>

            {/* Pipeline Feature Badges */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                <span>60 FPS Motion</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Tailwind v4 Theme</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Offline ZIP</span>
              </span>
            </div>
          </div>

          {/* Instant Presets Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-500 font-medium">Verified Targets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleSelectPreset(p.url)}
                className="btn-zippix-secondary px-3 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:border-blue-400/80 transition flex items-center gap-1.5"
              >
                <span>{p.name}</span>
                <span className="text-[10px] text-blue-400 font-sans opacity-75">{p.time}</span>
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
