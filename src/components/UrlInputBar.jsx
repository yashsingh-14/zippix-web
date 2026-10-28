import React, { useState } from 'react';
import { Globe, ArrowRight, Loader2, Sparkles, Zap } from 'lucide-react';

const POPULAR_EXAMPLES = [
  { label: 'Linear', url: 'https://linear.app' },
  { label: 'Stripe', url: 'https://stripe.com' },
  { label: 'Apple', url: 'https://apple.com' },
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
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {/* Main Input Box */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#171615]/90 p-2 shadow-2xl backdrop-blur-2xl transition duration-300 focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/20">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-[#a8a29e] shrink-0 ml-1">
            <Globe className="h-5 w-5 text-amber-400" />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter any website URL (e.g. stripe.com, linear.app, apple.com)..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 text-sm md:text-base text-[#faf9f5] placeholder-[#78716c] outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-5 py-3 text-sm font-bold text-black transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>Cloning...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 fill-black" />
                <span>Clone Website</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Example Chips */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-[#78716c]">
        <span className="flex items-center gap-1 font-medium">
          <Zap className="h-3 w-3 text-amber-400" />
          Try live demo:
        </span>
        {POPULAR_EXAMPLES.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSelectExample(item.url)}
            disabled={isLoading}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[#a8a29e] hover:text-[#faf9f5] hover:border-white/20 transition disabled:opacity-40"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
