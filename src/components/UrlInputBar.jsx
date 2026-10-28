import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Rocket,
  Loader2,
  FileText,
  Copy,
  GitFork,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';

const POPULAR_EXAMPLES = [
  { label: 'callofjesus.in', url: 'https://callofjesus.in' },
  { label: 'Linear', url: 'https://linear.app' },
  { label: 'Stripe', url: 'https://stripe.com' },
  { label: 'GitHub', url: 'https://github.com' },
];

export const UrlInputBar = ({ onClone, isLoading, theme = 'light' }) => {
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState('standard'); // 'single' | 'standard' | 'deep'
  const isDark = theme === 'dark';

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
      {/* WebCloner Elevation Card */}
      <div
        className={`rounded-2xl border p-6 sm:p-8 transition-all shadow-xl ${
          isDark
            ? 'bg-[#0e0e18] border-white/10 shadow-2xl shadow-blue-950/20'
            : 'bg-white border-slate-200/80 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/5'
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Input Row */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div
              className={`flex-1 w-full flex items-center gap-3 px-4 py-4 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#151522] border-white/10 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/15 focus-within:bg-white'
              }`}
            >
              <LinkIcon
                className={`h-5 w-5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}
              />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a website URL you own or are authorized to copy"
                disabled={isLoading}
                className={`w-full bg-transparent border-none outline-none text-base sm:text-lg font-medium p-0 ${
                  isDark
                    ? 'text-white placeholder:text-slate-500'
                    : 'text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={!url.trim() || isLoading}
              className="w-full md:w-auto btn-webcloner rounded-xl h-[58px] px-8 text-base font-bold flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  <span>Start Free</span>
                </>
              )}
            </button>
          </div>

          {/* Legal Compliance Notice */}
          <div
            className={`text-left text-xs leading-relaxed flex items-start gap-2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
            <p>
              <strong>Note:</strong> Only clone websites and content that you own or have permission to reproduce.
              You are responsible for ensuring that your use complies with applicable law and third-party rights.
            </p>
          </div>

          {/* Horizontal Divider */}
          <div className={`h-px w-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />

          {/* RECREATION DEPTH (3 Cards from webcloner.tech) */}
          <div className="space-y-3 text-left">
            <h4
              className={`text-[11px] font-bold tracking-wider uppercase ${
                isDark ? 'text-slate-400' : 'text-slate-400'
              }`}
            >
              Recreation Depth
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Depth Option 1: Single Page */}
              <div
                onClick={() => setDepth('single')}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  depth === 'single'
                    ? isDark
                      ? 'border-2 border-blue-500 bg-blue-500/10 shadow-sm'
                      : 'border-2 border-blue-600 bg-blue-50/50 shadow-sm'
                    : isDark
                    ? 'border-white/10 bg-[#141420] hover:border-white/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <FileText
                  className={`mx-auto h-6 w-6 mb-2 ${
                    depth === 'single' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}
                />
                <h5 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  Single Page
                </h5>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Capture only the current URL
                </p>
              </div>

              {/* Depth Option 2: Standard (Recommended) */}
              <div
                onClick={() => setDepth('standard')}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all relative ${
                  depth === 'standard'
                    ? isDark
                      ? 'border-2 border-blue-500 bg-blue-500/10 shadow-sm'
                      : 'border-2 border-blue-600 bg-blue-50/50 shadow-sm'
                    : isDark
                    ? 'border-white/10 bg-[#141420] hover:border-white/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Popular</span>
                </div>
                <Copy
                  className={`mx-auto h-6 w-6 mb-2 ${
                    depth === 'standard' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}
                />
                <h5 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  Standard
                </h5>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  1 level deep internal assets
                </p>
              </div>

              {/* Depth Option 3: Deep */}
              <div
                onClick={() => setDepth('deep')}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  depth === 'deep'
                    ? isDark
                      ? 'border-2 border-blue-500 bg-blue-500/10 shadow-sm'
                      : 'border-2 border-blue-600 bg-blue-50/50 shadow-sm'
                    : isDark
                    ? 'border-white/10 bg-[#141420] hover:border-white/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <GitFork
                  className={`mx-auto h-6 w-6 mb-2 ${
                    depth === 'deep' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}
                />
                <h5 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  Deep
                </h5>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Full standalone code package
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Quick Test Chips */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500 pt-1">
        <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
          <Zap className="h-3.5 w-3.5" />
          Quick test:
        </span>
        {POPULAR_EXAMPLES.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSelectExample(item.url)}
            disabled={isLoading}
            className={`rounded-lg border px-3 py-1 font-mono text-[11px] transition ${
              isDark
                ? 'border-white/10 bg-[#12121e] text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/10'
                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
