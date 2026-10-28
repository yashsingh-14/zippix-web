import React, { useState } from 'react';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Code2,
  Palette,
  FolderArchive,
  Eye,
  Terminal,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const StudioPlayground = () => {
  const [activeTab, setActiveTab] = useState('viewport'); // 'viewport' | 'tailwind' | 'tokens' | 'assets'
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TAILWIND_CODE = `@import "tailwindcss";

@theme {
  /* Extracted Design Tokens from Target Webpage */
  --color-primary: #020408;
  --color-accent-blue: #2563eb;
  --color-sky-glow: #60a5fa;
  --color-surface-glass: rgba(7, 12, 26, 0.7);
  
  --font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --shadow-glow: 0 0 35px rgba(59, 130, 246, 0.35);
  --radius-capsule: 9999px;
  --radius-card: 1.25rem;
}`;

  const TOKENS = [
    { name: '--color-primary', hex: '#020408', type: 'Background Obsidian' },
    { name: '--color-accent-blue', hex: '#2563eb', type: 'Royal Sapphire' },
    { name: '--color-sky-glow', hex: '#60a5fa', type: 'Celestial Cyan' },
    { name: '--color-surface-glass', hex: '#070c1a', type: 'Translucent Glass' },
    { name: '--color-emerald-ready', hex: '#10b981', type: 'Success Status' },
  ];

  const ASSETS = [
    { name: 'logo.svg', type: 'Vector SVG', size: '2.4 KB' },
    { name: 'banner-hero.webp', type: 'Optimized Image', size: '84 KB' },
    { name: 'icon-sparkle.svg', type: 'Vector SVG', size: '1.1 KB' },
    { name: 'font-heading.woff2', type: 'Web Font', size: '32 KB' },
  ];

  return (
    <section id="studio-playground" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span>Interactive Output Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Inspect, Test & <span className="text-gradient-electric">Export Live Assets</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Preview the extracted experience across multiple viewports, inspect compiled Tailwind variables, and explore
          the asset vault.
        </p>
      </div>

      {/* Main Studio Frame */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden border border-white/10 relative text-left">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Studio Window Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10 bg-[#02050f]/95">
          {/* Window Buttons & Tabs */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>

            {/* Studio Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium">
              <button
                onClick={() => setActiveTab('viewport')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'viewport' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Responsive Sandbox</span>
              </button>

              <button
                onClick={() => setActiveTab('tailwind')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'tailwind' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>theme.css (Tailwind v4)</span>
              </button>

              <button
                onClick={() => setActiveTab('tokens')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'tokens' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                <span>Color Swatches</span>
              </button>

              <button
                onClick={() => setActiveTab('assets')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'assets' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderArchive className="h-3.5 w-3.5" />
                <span>Asset Vault</span>
              </button>
            </div>
          </div>

          {/* Right Controls: Viewport Resizer */}
          {activeTab === 'viewport' && (
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop View (100%)"
                className={`p-1.5 rounded-lg transition ${
                  viewport === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet View (768px)"
                className={`p-1.5 rounded-lg transition ${
                  viewport === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile View (375px)"
                className={`p-1.5 rounded-lg transition ${
                  viewport === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          )}

          {activeTab === 'tailwind' && (
            <button
              onClick={() => handleCopy(TAILWIND_CODE)}
              className="btn-zippix-secondary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          )}
        </div>

        {/* Tab 1: Live Responsive Sandbox */}
        {activeTab === 'viewport' && (
          <div className="p-6 sm:p-10 bg-[#010308]/90 flex justify-center items-center min-h-[460px]">
            <div
              className={`transition-all duration-300 w-full mx-auto rounded-xl border border-white/10 bg-[#030612] p-6 shadow-2xl ${
                viewport === 'desktop' ? 'max-w-4xl' : viewport === 'tablet' ? 'max-w-md' : 'max-w-xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4 text-xs font-mono text-slate-400">
                <span className="text-blue-400 font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  stripe.com (Sandboxed Demo)
                </span>
                <span>{viewport === 'desktop' ? '1440 × 900' : viewport === 'tablet' ? '768 × 1024' : '375 × 667'}</span>
              </div>

              {/* Rendered Mock Target Page */}
              <div className="space-y-4 py-4 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
                  ✦ Fully Reconstructed Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Experience The True Identity
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  All styles, color palettes, typography scales, and interactive CSS keyframes have been extracted
                  without broken scripts.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <div className="h-8 px-4 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center">
                    Explore
                  </div>
                  <div className="h-8 px-4 rounded-lg border border-white/10 text-slate-300 text-xs font-bold flex items-center">
                    Documentation
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: theme.css Tailwind v4 */}
        {activeTab === 'tailwind' && (
          <div className="p-6 bg-[#010308] font-mono text-xs text-slate-300 overflow-x-auto min-h-[400px]">
            <pre className="leading-relaxed">
              <code>{TAILWIND_CODE}</code>
            </pre>
          </div>
        )}

        {/* Tab 3: Extracted Color Swatches */}
        {activeTab === 'tokens' && (
          <div className="p-6 sm:p-8 bg-[#010308] min-h-[400px] space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Extracted Color Palette</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-3"
                >
                  <div
                    className="h-10 w-10 rounded-lg shrink-0 border border-white/20 shadow-sm"
                    style={{ backgroundColor: token.hex }}
                  />
                  <div>
                    <h5 className="font-mono text-xs font-bold text-white">{token.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono">{token.hex} • {token.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Asset Vault */}
        {activeTab === 'assets' && (
          <div className="p-6 sm:p-8 bg-[#010308] min-h-[400px] space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Offline Inlined Asset Bundle</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ASSETS.map((asset) => (
                <div
                  key={asset.name}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono text-xs">
                      📁
                    </div>
                    <div>
                      <h5 className="font-mono text-xs font-bold text-white">{asset.name}</h5>
                      <p className="text-[11px] text-slate-400">{asset.type} • {asset.size}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Local Resolved
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
