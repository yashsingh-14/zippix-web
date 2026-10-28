import React, { useState } from 'react';
import {
  Download,
  Archive,
  ExternalLink,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Code2,
  Image as ImageIcon,
  Palette,
  Type,
  FileCode2,
  Sparkles,
} from 'lucide-react';

export const CloneDashboard = ({ cloneData, onReset }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [viewport, setViewport] = useState('desktop');
  const [copiedKey, setCopiedKey] = useState(null);
  const [codeType, setCodeType] = useState('tailwind4');

  const {
    cloneId,
    domain,
    title,
    tokens,
    assets,
    tailwindV4,
    tailwindV3,
    cssVariables,
    previewUrl,
    downloadUrl,
    filename,
    elapsedMs,
  } = cloneData;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([cloneData.html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(domain || 'website').replace(/[^a-z0-9_-]/gi, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'desktop':
        return 'w-full';
      case 'laptop':
        return 'max-w-[1024px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'mobile':
        return 'max-w-[375px]';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#141413]/90 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Clone Ready
              </span>
              <span className="font-mono text-xs text-[#a8a29e]">
                {elapsedMs ? `${(elapsedMs / 1000).toFixed(1)}s` : 'Fast'}
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#faf9f5]">{title || domain}</h2>
            <p className="text-xs text-[#78716c] font-mono mt-0.5">{domain}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-[#faf9f5] transition"
            >
              <Download className="h-4 w-4 text-sky-400" />
              <span>Download HTML</span>
            </button>

            <a
              href={downloadUrl}
              download={filename}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-5 py-2.5 text-xs font-bold text-black shadow-lg transition transform active:scale-95"
            >
              <Archive className="h-4 w-4 fill-black" />
              <span>Download Full ZIP</span>
            </a>

            <button
              onClick={onReset}
              className="rounded-xl border border-white/[0.08] bg-transparent hover:bg-white/[0.04] px-3.5 py-2.5 text-xs text-[#a8a29e] hover:text-[#faf9f5] transition"
            >
              Clone Another
            </button>
          </div>
        </div>

        {/* Quick Stats Pill Bar */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-white/[0.06] pt-3 text-xs text-[#a8a29e]">
          <div>
            <span className="text-[#78716c]">Extracted Assets: </span>
            <strong className="text-[#faf9f5]">{assets.length}</strong>
          </div>
          <div>
            <span className="text-[#78716c]">Brand Colors: </span>
            <strong className="text-[#faf9f5]">{tokens.colors?.length || 0}</strong>
          </div>
          <div>
            <span className="text-[#78716c]">Web Fonts: </span>
            <strong className="text-[#faf9f5]">{tokens.fonts?.length || 0}</strong>
          </div>
          <div>
            <span className="text-[#78716c]">Output: </span>
            <strong className="text-emerald-400">Offline Standalone</strong>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-1 overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'preview'
                ? 'bg-white/[0.1] text-[#faf9f5] border border-white/[0.12]'
                : 'text-[#a8a29e] hover:text-[#faf9f5] hover:bg-white/[0.04]'
            }`}
          >
            <Monitor className="h-3.5 w-3.5 text-sky-400" />
            <span>Live Sandbox Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('tailwind')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'tailwind'
                ? 'bg-white/[0.1] text-[#faf9f5] border border-white/[0.12]'
                : 'text-[#a8a29e] hover:text-[#faf9f5] hover:bg-white/[0.04]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-amber-400" />
            <span>Tailwind & Code</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'assets'
                ? 'bg-white/[0.1] text-[#faf9f5] border border-white/[0.12]'
                : 'text-[#a8a29e] hover:text-[#faf9f5] hover:bg-white/[0.04]'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5 text-purple-400" />
            <span>Asset Ripper ({assets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'tokens'
                ? 'bg-white/[0.1] text-[#faf9f5] border border-white/[0.12]'
                : 'text-[#a8a29e] hover:text-[#faf9f5] hover:bg-white/[0.04]'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-emerald-400" />
            <span>Colors & Fonts</span>
          </button>
        </div>

        {/* Viewport switchers for preview tab */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-[#141413] p-1">
            <button
              onClick={() => setViewport('desktop')}
              title="Desktop 100%"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'desktop' ? 'bg-white/[0.15] text-[#faf9f5]' : 'text-[#78716c] hover:text-[#faf9f5]'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('laptop')}
              title="Laptop (1024px)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'laptop' ? 'bg-white/[0.15] text-[#faf9f5]' : 'text-[#78716c] hover:text-[#faf9f5]'
              }`}
            >
              <Laptop className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              title="Tablet (768px)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'tablet' ? 'bg-white/[0.15] text-[#faf9f5]' : 'text-[#78716c] hover:text-[#faf9f5]'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              title="Mobile (375px)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'mobile' ? 'bg-white/[0.15] text-[#faf9f5]' : 'text-[#78716c] hover:text-[#faf9f5]'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              title="Open full page in new tab"
              className="p-1.5 rounded-lg text-[#78716c] hover:text-[#faf9f5] transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Tab 1: Live Interactive Preview */}
      {activeTab === 'preview' && (
        <div className="flex justify-center transition-all duration-300">
          <div className={`transition-all duration-300 ${getViewportWidth()}`}>
            <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-black shadow-2xl">
              {/* Browser chrome header bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#1a1918] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="rounded-md bg-black/40 border border-white/[0.06] px-3 py-0.5 font-mono text-[11px] text-[#a8a29e] truncate max-w-sm">
                    {previewUrl}
                  </div>
                </div>
              </div>

              {/* Sandboxed iframe */}
              <iframe
                src={previewUrl}
                title="Cloned Website Live Preview"
                className="h-[750px] w-full bg-white border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tailwind & Code Generator */}
      {activeTab === 'tailwind' && (
        <div className="rounded-2xl border border-white/[0.1] bg-[#141413] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeType('tailwind4')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  codeType === 'tailwind4' ? 'bg-amber-500 text-black' : 'bg-white/[0.05] text-[#a8a29e]'
                }`}
              >
                Tailwind CSS v4 (theme.css)
              </button>
              <button
                onClick={() => setCodeType('tailwind3')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  codeType === 'tailwind3' ? 'bg-amber-500 text-black' : 'bg-white/[0.05] text-[#a8a29e]'
                }`}
              >
                Tailwind CSS v3 (tailwind.config.js)
              </button>
              <button
                onClick={() => setCodeType('css')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  codeType === 'css' ? 'bg-amber-500 text-black' : 'bg-white/[0.05] text-[#a8a29e]'
                }`}
              >
                CSS Variables (variables.css)
              </button>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  codeType === 'tailwind4' ? tailwindV4 : codeType === 'tailwind3' ? tailwindV3 : cssVariables,
                  codeType
                )
              }
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1.5 text-xs font-medium text-[#faf9f5] transition"
            >
              {copiedKey === codeType ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === codeType ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="overflow-x-auto rounded-xl bg-black/50 p-4 font-mono text-xs text-[#faf9f5] leading-relaxed max-h-[500px]">
            {codeType === 'tailwind4' ? tailwindV4 : codeType === 'tailwind3' ? tailwindV3 : cssVariables}
          </pre>
        </div>
      )}

      {/* Tab 3: Asset Ripper Gallery */}
      {activeTab === 'assets' && (
        <div className="rounded-2xl border border-white/[0.1] bg-[#141413] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-semibold text-[#faf9f5]">Extracted Images, Icons & Media</h3>
            <span className="text-xs text-[#a8a29e]">{assets.length} total assets detected</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 p-2.5 hover:border-white/20 transition"
              >
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-black/60 p-2">
                  {asset.type === 'svg' && asset.content ? (
                    <div
                      className="max-h-full max-w-full [&>svg]:max-h-20 [&>svg]:max-w-20"
                      dangerouslySetInnerHTML={{ __html: asset.content }}
                    />
                  ) : asset.type === 'video' ? (
                    <video src={asset.url} className="max-h-full max-w-full rounded object-contain" muted />
                  ) : (
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="max-h-full max-w-full rounded object-contain"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="truncate text-[11px] font-medium text-[#faf9f5]">{asset.name}</div>
                  <span className="rounded bg-white/[0.06] px-1 text-[9px] uppercase font-mono text-[#a8a29e]">
                    {asset.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Colors & Fonts */}
      {activeTab === 'tokens' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colors */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#141413] p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-semibold text-[#faf9f5] flex items-center gap-2">
              <Palette className="h-4 w-4 text-emerald-400" />
              <span>Extracted Brand Colors</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(tokens.colors || []).map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(col.value, `col-${idx}`)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-black/30 p-2 cursor-pointer hover:border-white/20 transition"
                >
                  <div
                    className="h-8 w-8 rounded-lg border border-white/10 shrink-0 shadow-xs"
                    style={{ backgroundColor: col.value }}
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-[#faf9f5] truncate">{col.value}</p>
                    <span className="text-[10px] text-[#78716c]">
                      {copiedKey === `col-${idx}` ? 'Copied!' : `${col.count} elements`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#141413] p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-semibold text-[#faf9f5] flex items-center gap-2">
              <Type className="h-4 w-4 text-sky-400" />
              <span>Extracted Web Fonts</span>
            </h3>

            <div className="space-y-3">
              {(tokens.fonts || []).map((font, idx) => (
                <div key={idx} className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-[#faf9f5]">{font.family}</h4>
                    <span className="text-[10px] font-mono text-[#78716c]">
                      Weights: {font.weights.join(', ') || 'Regular'}
                    </span>
                  </div>
                  <p className="text-xs text-[#a8a29e] italic truncate">{font.sample}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
