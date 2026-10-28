import React, { useState } from 'react';
import { Globe, ArrowRight, Loader2, Sparkles, Zap } from 'lucide-react';

const POPULAR_EXAMPLES = [
  { label: 'callofjesus.in', url: 'https://callofjesus.in' },
  { label: 'Linear', url: 'https://linear.app' },
  { label: 'Stripe', url: 'https://stripe.com' },
  { label: 'GitHub', url: 'https://github.com' },
];

export const UrlInputBar = ({ onClone, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!url.trim() || isLoading) return;
    onClone(url.trim());
  };

  const handleSelectExample = (exampleUrl) => {
    setUrl(exampleUrl);
    if (!isLoading) {
      onClone(exampleUrl);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3.5">
      {/* Main Input Box with Antigravity Glow */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500/30 via-indigo-500/25 to-purple-600/30 opacity-60 blur-lg group-hover:opacity-100 transition duration-500" />

        <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#0c0c14]/90 p-2 shadow-2xl backdrop-blur-2xl transition duration-300 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/20">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 shrink-0 ml-1">
            <Globe className="h-5 w-5" />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter any website URL (e.g. callofjesus.in, linear.app, stripe.com)..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 text-sm md:text-base text-white placeholder-[#64748b] outline-none disabled:opacity-50 font-medium"
          />

          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="btn-antigravity flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Cloning...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 fill-white text-white" />
                <span>Clone Website</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Example Chips */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-[#64748b]">
        <span className="flex items-center gap-1 font-semibold text-sky-400">
          <Zap className="h-3.5 w-3.5" />
          Quick test:
        </span>
        {POPULAR_EXAMPLES.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSelectExample(item.url)}
            disabled={isLoading}
            className="rounded-lg border border-white/[0.08] bg-[#0f0f18] px-3 py-1 text-[#94a3b8] hover:text-white hover:border-sky-500/40 hover:bg-sky-500/10 transition disabled:opacity-40 font-mono text-[11px]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
