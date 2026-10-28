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

export const CloneDashboard = ({ cloneData, onReset, theme = 'light' }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [viewport, setViewport] = useState('desktop');
  const [copiedKey, setCopiedKey] = useState(null);
  const [codeType, setCodeType] = useState('tailwind4');

  const isDark = theme === 'dark';

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
      <div
        className={`rounded-3xl border p-6 shadow-xl transition ${
          isDark
            ? 'bg-[#0e0e18] border-white/10 text-white'
            : 'bg-white border-slate-200 shadow-blue-500/5 text-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Clone Ready
              </span>
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
                {elapsedMs ? `${(elapsedMs / 1000).toFixed(1)}s execution` : 'Success'}
              </span>
            </div>
            <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title || domain}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{domain}</p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleDownloadHtml}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                isDark
                  ? 'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Download className="h-4 w-4 text-blue-600" />
              <span>Download HTML</span>
            </button>

            <a
              href={downloadUrl}
              download={filename}
              className="btn-webcloner flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-md"
            >
              <Archive className="h-4 w-4 fill-white" />
              <span>Download Full ZIP</span>
            </a>

            <button
              onClick={onReset}
              className={`rounded-xl border px-3.5 py-2.5 text-xs transition ${
                isDark
                  ? 'border-white/10 hover:bg-white/5 text-slate-400 hover:text-white'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800'
              }`}
            >
              Clone Another
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className={`mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t pt-4 text-xs ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className={`rounded-xl p-2.5 border text-left ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Assets Extracted</span>
            <strong className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{assets.length} items</strong>
          </div>
          <div className={`rounded-xl p-2.5 border text-left ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Brand Colors</span>
            <strong className="text-blue-600 text-sm">{tokens.colors?.length || 0} palettes</strong>
          </div>
          <div className={`rounded-xl p-2.5 border text-left ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Web Fonts</span>
            <strong className="text-purple-600 text-sm">{tokens.fonts?.length || 0} families</strong>
          </div>
          <div className={`rounded-xl p-2.5 border text-left ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Animations</span>
            <strong className="text-emerald-600 text-sm">Active & Smooth</strong>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className={`flex items-center justify-between border-b pb-1 overflow-x-auto ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Live Sandbox Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('tailwind')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'tailwind'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Tailwind & Code</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'assets'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Asset Ripper ({assets.length})</span>
          </button>


          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'tokens'
                ? 'bg-gradient-to-r from-sky-500/20 to-purple-600/20 text-sky-300 border border-sky-500/35 shadow-sm'
                : 'text-[#94a3b8] hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-emerald-400" />
            <span>Colors & Fonts</span>
          </button>
        </div>

        {/* Viewport Controls */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-[#0c0c14] p-1">
            <button
              onClick={() => setViewport('desktop')}
              title="Desktop (100%)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'desktop' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('laptop')}
              title="Laptop (1024px)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'laptop' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Laptop className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              title="Tablet (768px)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'tablet' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              title="Mobile (375px)"
              className={`p-1.5 rounded-lg transition ${
                viewport === 'mobile' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              title="Open full page in new tab"
              className="p-1.5 rounded-lg text-[#64748b] hover:text-sky-300 transition"
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
            <div className="overflow-hidden rounded-3xl border border-sky-500/25 bg-[#0a0a12] shadow-2xl">
              {/* Browser chrome header bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#0e0e18] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="rounded-lg bg-black/60 border border-white/[0.08] px-3.5 py-1 font-mono text-[11px] text-sky-300/80 truncate max-w-sm">
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
        <div className="rounded-3xl border border-sky-500/20 bg-[#0c0c14] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeType('tailwind4')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  codeType === 'tailwind4'
                    ? 'btn-antigravity shadow-sm'
                    : 'bg-white/[0.04] text-[#94a3b8] hover:text-white'
                }`}
              >
                Tailwind CSS v4 (theme.css)
              </button>
              <button
                onClick={() => setCodeType('tailwind3')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  codeType === 'tailwind3'
                    ? 'btn-antigravity shadow-sm'
                    : 'bg-white/[0.04] text-[#94a3b8] hover:text-white'
                }`}
              >
                Tailwind CSS v3 (tailwind.config.js)
              </button>
              <button
                onClick={() => setCodeType('css')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  codeType === 'css'
                    ? 'btn-antigravity shadow-sm'
                    : 'bg-white/[0.04] text-[#94a3b8] hover:text-white'
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
              className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 px-3.5 py-1.5 text-xs font-semibold text-sky-300 transition"
            >
              {copiedKey === codeType ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === codeType ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="overflow-x-auto rounded-2xl bg-[#07070c] border border-white/[0.06] p-4 font-mono text-xs text-[#e2e8f0] leading-relaxed max-h-[500px]">
            {codeType === 'tailwind4' ? tailwindV4 : codeType === 'tailwind3' ? tailwindV3 : cssVariables}
          </pre>
        </div>
      )}

      {/* Tab 3: Asset Ripper Gallery */}
      {activeTab === 'assets' && (
        <div className="rounded-3xl border border-sky-500/20 bg-[#0c0c14] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-white">Extracted Images, Icons & Media</h3>
            <span className="text-xs text-sky-400 font-mono">{assets.length} items ripper ready</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07070d] p-3 hover:border-sky-500/30 transition"
              >
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-black/60 p-2">
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

                <div className="mt-2.5 flex items-center justify-between">
                  <div className="truncate text-[11px] font-medium text-white">{asset.name}</div>
                  <span className="rounded bg-sky-500/10 text-sky-400 px-1 text-[9px] uppercase font-mono">
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
          <div className="rounded-3xl border border-sky-500/20 bg-[#0c0c14] p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="h-4 w-4 text-emerald-400" />
              <span>Extracted Brand Colors</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(tokens.colors || []).map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(col.value, `col-${idx}`)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-[#07070c] p-2 cursor-pointer hover:border-sky-500/30 transition"
                >
                  <div
                    className="h-8 w-8 rounded-lg border border-white/10 shrink-0 shadow-xs"
                    style={{ backgroundColor: col.value }}
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-white truncate">{col.value}</p>
                    <span className="text-[10px] text-[#64748b]">
                      {copiedKey === `col-${idx}` ? 'Copied!' : `${col.count} elements`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div className="rounded-3xl border border-sky-500/20 bg-[#0c0c14] p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Type className="h-4 w-4 text-sky-400" />
              <span>Extracted Web Fonts</span>
            </h3>

            <div className="space-y-3">
              {(tokens.fonts || []).map((font, idx) => (
                <div key={idx} className="rounded-2xl border border-white/[0.06] bg-[#07070c] p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{font.family}</h4>
                    <span className="text-[10px] font-mono text-purple-300">
                      {font.weights.join(', ') || 'Regular'}
                    </span>
                  </div>
                  <p className="text-xs text-[#94a3b8] italic truncate">{font.sample}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
