import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Rocket,
  Loader2,
  FileCode,
  Layers,
  Palette,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
} from 'lucide-react';

const POPULAR_EXAMPLES = [
  { label: 'callofjesus.in', url: 'https://callofjesus.in' },
  { label: 'linear.app', url: 'https://linear.app' },
  { label: 'stripe.com', url: 'https://stripe.com' },
  { label: 'github.com', url: 'https://github.com' },
];

export const UrlInputBar = ({ onClone, isLoading }) => {
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState('standard'); // 'single' | 'standard' | 'deep'

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!url.trim() || isLoading) return;
    onClone(url.trim(), depth);
  };

  const handleSelectExample = (exampleUrl) => {
    setUrl(exampleUrl);
    if (!isLoading) {
      onClone(exampleUrl, depth);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Luxury Obsidian Glass Container */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
        {/* Subtle Top Gradient Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main URL Input Row */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-4 rounded-xl border border-white/10 bg-[#030712]/90 focus-within:border-blue-400/80 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all shadow-inner">
              <LinkIcon className="h-5 w-5 shrink-0 text-blue-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to reconstruct (e.g. https://callofjesus.in)"
                disabled={isLoading}
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-medium text-white placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={!url.trim() || isLoading}
              className="w-full md:w-auto btn-zippix-primary rounded-xl h-[58px] px-8 text-base font-semibold flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                  <span>Reconstructing...</span>
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  <span>Start Extraction</span>
                </>
              )}
            </button>
          </div>

          {/* Compliance & Authorization Notice */}
          <div className="text-left text-xs text-slate-400 flex items-start gap-2 bg-white/[0.02] p-3 rounded-lg border border-white/[0.05]">
            <AlertCircle className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Authorized Usage:</strong> Zippix is engineered for developers,
              designers, and agencies backing up, migrating, or reconstructing authorized web experiences.
            </p>
          </div>

          {/* Divider with subtle blue glow */}
          <div className="h-px w-full bg-white/[0.08]" />

          {/* RECONSTRUCTION DEPTH SELECTOR */}
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span>Reconstruction Engine Mode</span>
              </h4>
              <span className="text-[11px] text-blue-400 font-medium">Auto-executes JavaScript hydrations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option 1: Standard Capture */}
              <div
                onClick={() => setDepth('standard')}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  depth === 'standard'
                    ? 'border-blue-500/80 bg-blue-500/10 shadow-[0_0_20px_rgba(37,99,235,0.25)]'
                    : 'border-white/10 bg-[#040816]/60 hover:border-white/20 hover:bg-[#070e24]/70'
                }`}
              >
                <Layers
                  className={`mx-auto h-6 w-6 mb-2 ${
                    depth === 'standard' ? 'text-blue-400' : 'text-slate-400'
                  }`}
                />
                <h5 className="font-bold text-sm text-white">Full Page + Motion</h5>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Headless Chrome scrolls, triggers reveals & captures complete DOM with styles.
                </p>
                {depth === 'standard' && (
                  <div className="mt-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Recommended</span>
                  </div>
                )}
              </div>

              {/* Option 2: Single DOM Snapshot */}
              <div
                onClick={() => setDepth('single')}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  depth === 'single'
                    ? 'border-blue-500/80 bg-blue-500/10 shadow-[0_0_20px_rgba(37,99,235,0.25)]'
                    : 'border-white/10 bg-[#040816]/60 hover:border-white/20 hover:bg-[#070e24]/70'
                }`}
              >
                <FileCode
                  className={`mx-auto h-6 w-6 mb-2 ${
                    depth === 'single' ? 'text-blue-400' : 'text-slate-400'
                  }`}
                />
                <h5 className="font-bold text-sm text-white">Quick Snapshot</h5>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Fast initial DOM render without deep multi-pass asset inline caching.
                </p>
                {depth === 'single' && (
                  <div className="mt-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Active Mode</span>
                  </div>
                )}
              </div>

              {/* Option 3: Deep Token Ripper */}
              <div
                onClick={() => setDepth('deep')}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  depth === 'deep'
                    ? 'border-blue-500/80 bg-blue-500/10 shadow-[0_0_20px_rgba(37,99,235,0.25)]'
                    : 'border-white/10 bg-[#040816]/60 hover:border-white/20 hover:bg-[#070e24]/70'
                }`}
              >
                <Palette
                  className={`mx-auto h-6 w-6 mb-2 ${
                    depth === 'deep' ? 'text-blue-400' : 'text-slate-400'
                  }`}
                />
                <h5 className="font-bold text-sm text-white">Design Token Ripper</h5>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Extracts full Tailwind v4 theme, HSL palette, fonts & media package.
                </p>
                {depth === 'deep' && (
                  <div className="mt-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Deep Mode</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Demo Target Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">Quick Demo Targets:</span>
            {POPULAR_EXAMPLES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSelectExample(item.url)}
                className="btn-zippix-secondary px-3 py-1 rounded-full text-xs hover:border-blue-400 hover:text-white transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
