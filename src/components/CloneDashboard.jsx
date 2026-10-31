import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
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
  RotateCcw,
  RefreshCw,
  Search,
  Eye,
  Sliders,
  X,
  Layers,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';

export const CloneDashboard = ({ cloneData, onReset, theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [viewport, setViewport] = useState('desktop');
  const [copiedKey, setCopiedKey] = useState(null);
  const [codeType, setCodeType] = useState('tailwind4');
  const [iframeKey, setIframeKey] = useState(0);
  const [isReloading, setIsReloading] = useState(false);
  const [assetFilter, setAssetFilter] = useState('all');
  const [assetSearch, setAssetSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [customFontText, setCustomFontText] = useState('The quick brown fox jumps over the lazy dog 1234567890');

  const {
    cloneId,
    domain,
    title,
    tokens = { colors: [], fonts: [], spacing: [], shadows: [], radii: [] },
    assets = [],
    tailwindV4 = '',
    tailwindV3 = '',
    cssVariables = '',
    html = '',
    previewUrl = '',
    downloadUrl = '',
    filename = 'website-clone.zip',
    elapsedMs = 0,
    isBotChallenge = false,
    challengeNotice = '',
  } = cloneData || {};

  // Formatted JSON tokens string
  const tokensJson = useMemo(() => {
    return JSON.stringify(tokens, null, 2);
  }, [tokens]);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleReloadIframe = () => {
    setIsReloading(true);
    setIframeKey((prev) => prev + 1);
    setTimeout(() => setIsReloading(false), 600);
  };

  const handleCloneAnotherClick = () => {
    if (onReset) {
      onReset();
    }
    const heroEl = document.getElementById('cloner-section') || document.getElementById('reconstructor-console');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      const inputEl = document.querySelector('#reconstructor-console input[type="url"]');
      if (inputEl) {
        inputEl.focus();
        inputEl.select();
      }
    }, 350);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([html || '<!DOCTYPE html><html><body>Empty</body></html>'], {
      type: 'text/html;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(domain || 'website').replace(/[^a-z0-9_-]/gi, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCurrentCodeFile = () => {
    let content = '';
    let ext = 'css';
    let fname = 'theme';

    if (codeType === 'tailwind4') {
      content = tailwindV4;
      fname = 'theme';
      ext = 'css';
    } else if (codeType === 'tailwind3') {
      content = tailwindV3;
      fname = 'tailwind.config';
      ext = 'js';
    } else if (codeType === 'css') {
      content = cssVariables;
      fname = 'variables';
      ext = 'css';
    } else if (codeType === 'html') {
      content = html;
      fname = 'index';
      ext = 'html';
    } else if (codeType === 'tokens') {
      content = tokensJson;
      fname = 'tokens';
      ext = 'json';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fname}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullZip = async () => {
    try {
      const zip = new JSZip();
      zip.file('index.html', html || '<!DOCTYPE html><html><body>Empty</body></html>');
      zip.file('theme.css', tailwindV4 || '/* Tailwind CSS v4 */');
      zip.file('tailwind.config.js', tailwindV3 || '// Tailwind CSS v3');
      zip.file('variables.css', cssVariables || '/* CSS Variables */');
      zip.file(
        'tokens.json',
        JSON.stringify({ domain, title, tokens, assetsCount: (assets || []).length }, null, 2)
      );
      zip.file(
        'README.md',
        `# ${title || domain} - Reconstructed with Zippix Web\nExported on: ${new Date().toUTCString()}\n\n## Included Files:\n- index.html\n- theme.css\n- tailwind.config.js\n- variables.css\n- tokens.json\n- assets/\n`
      );

      const assetsFolder = zip.folder('assets');
      if (assetsFolder) {
        const svgs = (assets || []).filter((a) => a.type === 'svg' && a.content);
        svgs.forEach((svg, idx) => {
          assetsFolder.file(`icon-${idx + 1}.svg`, svg.content);
        });
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const safeDomain = (domain || 'website').replace(/[^a-z0-9_-]/gi, '-');
      const blobUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${safeDomain}.full-page.Zippix.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      if (downloadUrl) {
        window.location.href = downloadUrl;
      }
    }
  };

  const handleOpenPreviewNewTab = () => {
    const blob = new Blob([html || '<!DOCTYPE html><html><body>Empty</body></html>'], {
      type: 'text/html;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownloadSingleAsset = (asset, e) => {
    e?.stopPropagation();
    if (!asset) return;
    if (asset.type === 'svg' && asset.content) {
      const blob = new Blob([asset.content], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = asset.name?.endsWith('.svg') ? asset.name : `${asset.name || 'icon'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (asset.url) {
      const a = document.createElement('a');
      a.href = asset.url;
      a.target = '_blank';
      a.download = asset.name || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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

  const getViewportDimensions = () => {
    switch (viewport) {
      case 'desktop':
        return '1440 × 900 (100%)';
      case 'laptop':
        return '1024 × 768';
      case 'tablet':
        return '768 × 1024';
      case 'mobile':
        return '375 × 667';
      default:
        return '1440 × 900';
    }
  };

  // Filtered assets list
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesType =
        assetFilter === 'all' ? true : asset.type === assetFilter;
      const matchesSearch = assetSearch.trim()
        ? (asset.name || '').toLowerCase().includes(assetSearch.toLowerCase()) ||
          (asset.type || '').toLowerCase().includes(assetSearch.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });
  }, [assets, assetFilter, assetSearch]);

  const svgCount = useMemo(() => assets.filter((a) => a.type === 'svg').length, [assets]);
  const imgCount = useMemo(() => assets.filter((a) => a.type === 'image').length, [assets]);
  const videoCount = useMemo(() => assets.filter((a) => a.type === 'video').length, [assets]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Toast feedback pill */}
      {copiedKey && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-sky-300 shadow-2xl backdrop-blur-xl animate-bounce">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Copied to clipboard!</span>
        </div>
      )}

      {/* Bot Challenge / WAF Notice */}
      {(isBotChallenge || (domain && domain.includes('amazon') && assets.length === 0)) && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3.5 text-amber-200">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-bold text-amber-300">
              AWS WAF Anti-Bot Challenge Encountered ({domain})
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {challengeNotice ||
                'Amazon uses AWS WAF anti-bot challenges to block cloud servers. To clone Amazon with 100% full products, run Zippix locally on your PC (npm run dev) where real desktop Chrome bypasses this shield!'}
            </p>
          </div>
        </div>
      )}

      {/* Overview Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0c0d16]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl text-white relative overflow-hidden">
        {/* Subtle top atmospheric gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-80" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Clone Ready
              </span>
              <span className="font-mono text-xs text-sky-400/90 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                {elapsedMs ? `${(elapsedMs / 1000).toFixed(1)}s execution` : 'Success'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{title || domain}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 font-mono flex items-center gap-1.5">
              <span>{domain}</span>
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition"
                title="Visit original website"
              >
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 px-4 py-2.5 text-xs font-bold transition shadow-sm active:scale-95"
              title="Download standalone single HTML file"
            >
              <Download className="h-4 w-4 text-sky-400" />
              <span>Download HTML</span>
            </button>

            <button
              onClick={handleDownloadFullZip}
              className="btn-zippix-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-lg hover:shadow-sky-500/25 active:scale-95 transition cursor-pointer"
              title="Download full project ZIP archive with offline assets & tokens"
            >
              <Archive className="h-4 w-4 fill-white" />
              <span>Download Full ZIP</span>
            </button>

            {/* Clone Another Button - Smoothly redirects to URL box */}
            <button
              onClick={handleCloneAnotherClick}
              className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 hover:bg-white/10 hover:border-sky-400/40 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white transition shadow-sm active:scale-95 group cursor-pointer"
              title="Click to redirect to URL box and clone another website"
            >
              <RotateCcw className="h-3.5 w-3.5 text-sky-400 group-hover:-rotate-90 transition-transform duration-300" />
              <span>Clone Another</span>
            </button>
          </div>
        </div>

        {/* Interactive Quick Stats Grid - Clicking cards switches to relevant tab! */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/[0.08] pt-5 text-xs">
          {/* Card 1: Assets -> Switches to Assets Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('assets')}
            className={`rounded-2xl p-3 border text-left transition-all duration-200 group cursor-pointer active:scale-95 ${
              activeTab === 'assets'
                ? 'bg-sky-500/15 border-sky-400/60 ring-2 ring-sky-500/20'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-sky-400/40 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-mono mb-1">
              <span>Assets Extracted</span>
              <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <strong className="text-sm font-bold text-white block">{assets.length} items</strong>
            <span className="text-[10px] text-sky-300/80 font-medium mt-1 inline-block">
              {activeTab === 'assets' ? 'Active Tab' : 'Click to inspect gallery'}
            </span>
          </button>

          {/* Card 2: Colors -> Switches to Colors/Tokens Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`rounded-2xl p-3 border text-left transition-all duration-200 group cursor-pointer active:scale-95 ${
              activeTab === 'tokens'
                ? 'bg-blue-500/15 border-blue-400/60 ring-2 ring-blue-500/20'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-blue-400/40 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-mono mb-1">
              <span>Brand Colors</span>
              <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-sm font-bold text-blue-400">{tokens.colors?.length || 0} palettes</strong>
              {/* Mini color swatch dots */}
              <div className="flex -space-x-1 overflow-hidden">
                {(tokens.colors || []).slice(0, 4).map((c, i) => (
                  <span
                    key={i}
                    className="inline-block h-3 w-3 rounded-full border border-slate-900 shadow-xs"
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] text-blue-300/80 font-medium mt-1 inline-block">
              {activeTab === 'tokens' ? 'Active Tab' : 'Click to view palettes'}
            </span>
          </button>

          {/* Card 3: Fonts -> Switches to Tokens/Font Tester Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`rounded-2xl p-3 border text-left transition-all duration-200 group cursor-pointer active:scale-95 ${
              activeTab === 'tokens'
                ? 'bg-purple-500/15 border-purple-400/60 ring-2 ring-purple-500/20'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-purple-400/40 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-mono mb-1">
              <span>Web Fonts</span>
              <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <strong className="text-sm font-bold text-purple-400">{tokens.fonts?.length || 0} families</strong>
            <span className="text-[10px] text-purple-300/80 font-medium mt-1 inline-block">
              Click for interactive tester
            </span>
          </button>

          {/* Card 4: Animations & Code -> Switches to Tailwind & Code Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('tailwind')}
            className={`rounded-2xl p-3 border text-left transition-all duration-200 group cursor-pointer active:scale-95 ${
              activeTab === 'tailwind'
                ? 'bg-emerald-500/15 border-emerald-400/60 ring-2 ring-emerald-500/20'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-emerald-400/40 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-mono mb-1">
              <span>Animations</span>
              <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <strong className="text-sm font-bold text-emerald-400">Active & Smooth</strong>
            <span className="text-[10px] text-emerald-300/80 font-medium mt-1 inline-block">
              {activeTab === 'tailwind' ? 'Active Tab' : 'View generated CSS'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Live Sandbox Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('tailwind')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
              activeTab === 'tailwind'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Tailwind & Code</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Asset Ripper ({assets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
              activeTab === 'tokens'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Colors & Fonts</span>
          </button>
        </div>

        {/* Viewport & Sandbox Controls (Active only in Preview Tab) */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-2 shrink-0">
            {/* Viewport Dimension Pill */}
            <span className="hidden md:inline-block font-mono text-[11px] text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.08]">
              {getViewportDimensions()}
            </span>

            <div className="flex items-center gap-1 rounded-xl border border-white/[0.1] bg-[#0c0d16] p-1 shadow-inner">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop (100% full width)"
                className={`p-1.5 rounded-lg transition active:scale-95 cursor-pointer ${
                  viewport === 'desktop'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/35 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setViewport('laptop')}
                title="Laptop (1024px)"
                className={`p-1.5 rounded-lg transition active:scale-95 cursor-pointer ${
                  viewport === 'laptop'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/35 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Laptop className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setViewport('tablet')}
                title="Tablet (768px)"
                className={`p-1.5 rounded-lg transition active:scale-95 cursor-pointer ${
                  viewport === 'tablet'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/35 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setViewport('mobile')}
                title="Mobile (375px)"
                className={`p-1.5 rounded-lg transition active:scale-95 cursor-pointer ${
                  viewport === 'mobile'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/35 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>

              {/* Reload Iframe Button */}
              <button
                onClick={handleReloadIframe}
                title="Reload live preview"
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-white/5 transition active:scale-95 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isReloading ? 'animate-spin text-sky-400' : ''}`} />
              </button>

              {/* Open in new tab */}
              <button
                onClick={handleOpenPreviewNewTab}
                title="Open full page in new tab"
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-white/5 transition active:scale-95 cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: LIVE INTERACTIVE SANDBOX PREVIEW */}
      {/* ======================================================== */}
      {activeTab === 'preview' && (
        <div className="flex justify-center transition-all duration-300">
          <div className={`transition-all duration-300 ${getViewportWidth()}`}>
            <div className="overflow-hidden rounded-3xl border border-sky-500/25 bg-[#090a12] shadow-2xl">
              {/* Browser chrome header bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#0d0e1a] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 cursor-pointer transition" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 hover:bg-green-400 cursor-pointer transition" />
                </div>

                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 rounded-lg bg-black/60 border border-white/[0.08] px-3.5 py-1 font-mono text-[11px] text-sky-300/90 truncate max-w-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{`https://${domain}`}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReloadIframe}
                    className="p-1 rounded-md text-slate-400 hover:text-white transition"
                    title="Reload Sandbox"
                  >
                    <RefreshCw className={`h-3 w-3 ${isReloading ? 'animate-spin text-sky-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Sandboxed iframe */}
              <iframe
                key={iframeKey}
                srcDoc={html}
                src={!html ? previewUrl : undefined}
                title="Cloned Website Live Preview"
                className="h-[760px] w-full bg-white border-0 transition-opacity duration-300"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: TAILWIND & MULTI-LANGUAGE CODE GENERATOR */}
      {/* ======================================================== */}
      {activeTab === 'tailwind' && (
        <div className="rounded-3xl border border-sky-500/20 bg-[#0c0d16] p-6 sm:p-7 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            {/* Subtabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setCodeType('tailwind4')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 cursor-pointer ${
                  codeType === 'tailwind4'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                Tailwind v4 (theme.css)
              </button>

              <button
                onClick={() => setCodeType('tailwind3')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 cursor-pointer ${
                  codeType === 'tailwind3'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                Tailwind v3 (tailwind.config.js)
              </button>

              <button
                onClick={() => setCodeType('css')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 cursor-pointer ${
                  codeType === 'css'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                CSS Variables (variables.css)
              </button>

              <button
                onClick={() => setCodeType('html')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 cursor-pointer ${
                  codeType === 'html'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                HTML Source (index.html)
              </button>

              <button
                onClick={() => setCodeType('tokens')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 cursor-pointer ${
                  codeType === 'tokens'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                Design Tokens (tokens.json)
              </button>
            </div>

            {/* Action Buttons: Copy & Download Code File */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCurrentCodeFile}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
                title="Download this code file directly"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save File</span>
              </button>

              <button
                onClick={() => {
                  let text = '';
                  if (codeType === 'tailwind4') text = tailwindV4;
                  else if (codeType === 'tailwind3') text = tailwindV3;
                  else if (codeType === 'css') text = cssVariables;
                  else if (codeType === 'html') text = html;
                  else if (codeType === 'tokens') text = tokensJson;
                  handleCopy(text, codeType);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/15 hover:bg-sky-500/25 px-3.5 py-1.5 text-xs font-semibold text-sky-300 transition active:scale-95 cursor-pointer"
              >
                {copiedKey === codeType ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedKey === codeType ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          <div className="relative group">
            <pre className="overflow-x-auto rounded-2xl bg-[#06070d] border border-white/[0.06] p-4 sm:p-5 font-mono text-xs text-slate-200 leading-relaxed max-h-[550px] select-all">
              {codeType === 'tailwind4' && (tailwindV4 || '/* No Tailwind v4 theme generated */')}
              {codeType === 'tailwind3' && (tailwindV3 || '// No Tailwind v3 config generated')}
              {codeType === 'css' && (cssVariables || '/* No CSS variables extracted */')}
              {codeType === 'html' && (html || '<!-- No HTML extracted -->')}
              {codeType === 'tokens' && tokensJson}
            </pre>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ASSET RIPPER GALLERY WITH SEARCH & FILTERS */}
      {/* ======================================================== */}
      {activeTab === 'assets' && (
        <div className="rounded-3xl border border-sky-500/20 bg-[#0c0d16] p-6 sm:p-7 shadow-2xl space-y-5">
          {/* Controls Bar: Search & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setAssetFilter('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                  assetFilter === 'all'
                    ? 'bg-sky-500 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                All ({assets.length})
              </button>

              <button
                onClick={() => setAssetFilter('svg')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                  assetFilter === 'svg'
                    ? 'bg-sky-500 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                SVGs & Icons ({svgCount})
              </button>

              <button
                onClick={() => setAssetFilter('image')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                  assetFilter === 'image'
                    ? 'bg-sky-500 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                Images ({imgCount})
              </button>

              {videoCount > 0 && (
                <button
                  onClick={() => setAssetFilter('video')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                    assetFilter === 'video'
                      ? 'bg-sky-500 text-white'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  Videos ({videoCount})
                </button>
              )}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={assetSearch}
                onChange={(e) => setAssetSearch(e.target.value)}
                placeholder="Search asset filename..."
                className="w-full rounded-xl bg-black/40 border border-white/10 pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-sky-400/60"
              />
            </div>
          </div>

          {/* Asset Grid */}
          {filteredAssets.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              <p>No assets found matching current filter or search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07070d] p-3 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-200 cursor-pointer"
                >
                  {/* Visual Preview Container */}
                  <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-black/60 p-2 relative">
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

                    {/* Hover Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                      <button
                        onClick={(e) => handleDownloadSingleAsset(asset, e)}
                        className="p-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition active:scale-90"
                        title="Download asset"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(asset.content || asset.url, `asset-${asset.id}`);
                        }}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition active:scale-90"
                        title="Copy code/URL"
                      >
                        {copiedKey === `asset-${asset.id}` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="mt-2.5 flex items-center justify-between gap-1">
                    <div className="truncate text-[11px] font-medium text-white" title={asset.name}>
                      {asset.name}
                    </div>
                    <span className="rounded bg-sky-500/10 text-sky-400 px-1.5 py-0.5 text-[9px] uppercase font-mono shrink-0">
                      {asset.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Asset Enlarged Inspection Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d0e1c] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h4 className="text-sm font-bold text-white truncate max-w-xs">{selectedAsset.name}</h4>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1 text-slate-400 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-center p-6 bg-black/60 rounded-2xl min-h-[220px]">
              {selectedAsset.type === 'svg' && selectedAsset.content ? (
                <div
                  className="max-h-56 max-w-full [&>svg]:max-h-52 [&>svg]:max-w-52"
                  dangerouslySetInnerHTML={{ __html: selectedAsset.content }}
                />
              ) : selectedAsset.type === 'video' ? (
                <video src={selectedAsset.url} controls className="max-h-56 max-w-full rounded" />
              ) : (
                <img src={selectedAsset.url} alt={selectedAsset.name} className="max-h-56 max-w-full object-contain" />
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-slate-400 uppercase">{selectedAsset.type} format</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(selectedAsset.content || selectedAsset.url, 'modal-asset')}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition"
                >
                  {copiedKey === 'modal-asset' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === 'modal-asset' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={(e) => handleDownloadSingleAsset(selectedAsset, e)}
                  className="btn-zippix-primary flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: COLORS & INTERACTIVE WEB FONTS PLAYGROUND */}
      {/* ======================================================== */}
      {activeTab === 'tokens' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Extracted Brand Colors */}
          <div className="rounded-3xl border border-sky-500/20 bg-[#0c0d16] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Palette className="h-4 w-4 text-emerald-400" />
                <span>Extracted Brand Colors ({tokens.colors?.length || 0})</span>
              </h3>

              <button
                onClick={() => {
                  const cssVars = (tokens.colors || [])
                    .map((c, i) => `  --color-brand-${i + 1}: ${c.value};`)
                    .join('\n');
                  handleCopy(`:root {\n${cssVars}\n}`, 'all-colors');
                }}
                className="text-xs text-sky-400 hover:text-sky-300 font-medium transition cursor-pointer"
              >
                {copiedKey === 'all-colors' ? '✓ Copied All CSS!' : 'Copy All as CSS'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {(tokens.colors || []).map((col, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(col.value, `col-${idx}`)}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-[#07070d] p-2.5 cursor-pointer hover:border-sky-400/50 hover:bg-white/[0.04] transition group active:scale-95"
                  title="Click to copy Hex code"
                >
                  <div
                    className="h-9 w-9 rounded-xl border border-white/10 shrink-0 shadow-md group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: col.value }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs font-semibold text-white truncate">{col.value}</p>
                    <span className="text-[10px] text-slate-400 block">
                      {copiedKey === `col-${idx}` ? (
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      ) : (
                        `${col.count || 1} elements`
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Web Fonts Tester */}
          <div className="rounded-3xl border border-sky-500/20 bg-[#0c0d16] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Type className="h-4 w-4 text-sky-400" />
                <span>Extracted Web Fonts ({tokens.fonts?.length || 0})</span>
              </h3>

              <span className="text-xs text-purple-400 font-mono">Live Type Tester</span>
            </div>

            {/* Live Interactive Text Input to Test Font */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400 uppercase">
                Type here to test typography live:
              </label>
              <input
                type="text"
                value={customFontText}
                onChange={(e) => setCustomFontText(e.target.value)}
                placeholder="Type your own sentence..."
                className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-sky-400/60 transition"
              />
            </div>

            <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
              {(tokens.fonts || []).map((font, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/[0.06] bg-[#07070d] p-4 space-y-2 hover:border-purple-400/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{font.family}</h4>
                    <button
                      onClick={() => handleCopy(`font-family: '${font.family}', sans-serif;`, `font-${idx}`)}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-mono transition"
                    >
                      {copiedKey === `font-${idx}` ? '✓ Copied' : 'Copy Rule'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(font.weights || ['400']).map((w, wIdx) => (
                      <span
                        key={wIdx}
                        className="rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 text-[10px] font-mono"
                      >
                        weight: {w}
                      </span>
                    ))}
                  </div>

                  {/* Rendered Live Custom Text Preview */}
                  <div
                    className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-slate-100 text-base leading-relaxed break-words"
                    style={{ fontFamily: font.family || 'sans-serif' }}
                  >
                    {customFontText || font.sample || 'The quick brown fox jumps over the lazy dog'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
