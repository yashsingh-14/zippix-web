import React, { useState } from 'react';
import { Loader2, ArrowRight, Globe } from 'lucide-react';

const PRESETS = [
  { name: 'callofjesus.in', url: 'https://callofjesus.in' },
  { name: 'linear.app', url: 'https://linear.app' },
  { name: 'stripe.com', url: 'https://stripe.com' },
];

export const UrlInputBar = ({ onClone, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!url.trim() || isLoading) return;
    onClone(url.trim(), 'standard');
  };

  const handleSelectPreset = (presetUrl) => {
    setUrl(presetUrl);
    if (!isLoading) {
      onClone(presetUrl, 'standard');
    }
  };

  return (
    <div id="reconstructor-console" className="w-full max-w-2xl mx-auto space-y-3">
      {/* Sleek Floating Apple-Glass Input Capsule */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full apple-glass border border-white/12 shadow-2xl focus-within:border-sky-400/50 focus-within:ring-4 focus-within:ring-sky-500/15 transition-all duration-300">
          {/* Subtle Accent Glow on Focus */}
          <div className="hidden sm:flex items-center justify-center pl-3.5 pr-1 text-sky-400">
            <Globe className="h-4 w-4" />
          </div>

          {/* Minimal URL Input Field */}
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any website URL (e.g. https://callofjesus.in)"
            disabled={isLoading}
            className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder:text-slate-500 px-3 py-2 font-normal"
          />

          {/* Clean Action Button */}
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="w-full sm:w-auto btn-zippix-primary rounded-xl sm:rounded-full px-6 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Cloning...</span>
              </>
            ) : (
              <>
                <span>Clone Website</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Minimal Presets Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs text-slate-400">
          <span className="text-slate-500">Try:</span>
          {PRESETS.map((p, idx) => (
            <React.Fragment key={p.name}>
              <button
                type="button"
                onClick={() => handleSelectPreset(p.url)}
                className="text-slate-400 hover:text-sky-300 transition underline underline-offset-4 decoration-white/15 hover:decoration-sky-400 font-medium"
              >
                {p.name}
              </button>
              {idx < PRESETS.length - 1 && <span className="text-slate-600">·</span>}
            </React.Fragment>
          ))}
        </div>
      </form>
    </div>
  );
};
