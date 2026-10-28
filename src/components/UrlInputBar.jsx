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
    <div id="reconstructor-console" className="w-full max-w-4xl mx-auto">
      {/* Expanded Floating Apple-Glass Input Capsule */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="flex flex-col sm:flex-row items-center gap-3 p-2.5 sm:p-3 rounded-2xl sm:rounded-full apple-glass border border-white/14 shadow-2xl focus-within:border-sky-400/60 focus-within:ring-4 focus-within:ring-sky-500/15 transition-all duration-300">
          {/* Accent Glow Icon */}
          <div className="hidden sm:flex items-center justify-center pl-4 pr-1 text-sky-400">
            <Globe className="h-5 w-5" />
          </div>

          {/* Expanded URL Input Field */}
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any website URL (e.g. https://callofjesus.in)"
            disabled={isLoading}
            className="w-full bg-transparent border-none outline-none text-base sm:text-lg text-white placeholder:text-slate-500 px-4 py-3 sm:py-3.5 font-normal tracking-wide"
          />

          {/* Expanded Action Button */}
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="w-full sm:w-auto btn-zippix-primary rounded-xl sm:rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-base font-semibold flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 transition shadow-lg hover:shadow-sky-500/25"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-white" />
                <span>Cloning...</span>
              </>
            ) : (
              <>
                <span>Clone Website</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Expanded Presets Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm text-slate-400">
          <span className="text-slate-500 font-medium">Try:</span>
          {PRESETS.map((p, idx) => (
            <React.Fragment key={p.name}>
              <button
                type="button"
                onClick={() => handleSelectPreset(p.url)}
                className="text-slate-300 hover:text-sky-300 transition underline underline-offset-4 decoration-white/20 hover:decoration-sky-400 font-medium"
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
