import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { UrlInputBar } from './components/UrlInputBar.jsx';
import { CloneProgress } from './components/CloneProgress.jsx';
import { CloneDashboard } from './components/CloneDashboard.jsx';
import { ProUpgradeModal } from './components/ProUpgradeModal.jsx';
import { Sparkles, Layers, Download, Code2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloneData, setCloneData] = useState(null);
  const [error, setError] = useState(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  // License & quota state from localStorage
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('zippix_web_is_pro') === 'true';
  });

  const [freeClonesUsed, setFreeClonesUsed] = useState(() => {
    return parseInt(localStorage.getItem('zippix_web_clones_used') || '0', 10);
  });

  const FREE_MAX = 2;
  const freeClonesRemaining = Math.max(0, FREE_MAX - freeClonesUsed);

  const handleActivatePro = () => {
    setIsPro(true);
    localStorage.setItem('zippix_web_is_pro', 'true');
  };

  const handleClone = async (targetUrl) => {
    setError(null);

    // Check quota
    if (!isPro && freeClonesRemaining <= 0) {
      setIsProModalOpen(true);
      return;
    }

    setUrl(targetUrl);
    setIsLoading(true);
    setCloneData(null);

    try {
      const response = await fetch('/api/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to clone website. Please try another URL.');
      }

      setCloneData(data);

      // Decrement free quota if not pro
      if (!isPro) {
        const nextUsed = freeClonesUsed + 1;
        setFreeClonesUsed(nextUsed);
        localStorage.setItem('zippix_web_clones_used', nextUsed.toString());
      }
    } catch (err) {
      setError(err.message || 'Error occurred while cloning website.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0c0c0b] text-[#faf9f5]">
      {/* Top Header */}
      <Header
        freeClonesRemaining={freeClonesRemaining}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* If no clone yet and not loading -> Show Hero & Input */}
        {!cloneData && !isLoading && (
          <div className="mx-auto max-w-4xl text-center space-y-8 pt-8 sm:pt-14 pb-12">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-xs text-[#a8a29e] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Full-Stack Cloud Webpage Cloner & Token Ripper</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#faf9f5]">
                Clone Any Website in{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-sky-400 bg-clip-text text-transparent">
                  1-Click
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#a8a29e] leading-relaxed">
                Enter any URL to extract the complete DOM, unified inline styles, Tailwind CSS v4 theme, and all media assets. Zero setup required.
              </p>
            </div>

            {/* URL Input */}
            <UrlInputBar onClone={handleClone} isLoading={isLoading} />

            {/* Error Message */}
            {error && (
              <div className="mx-auto max-w-xl rounded-xl border border-red-500/20 bg-red-950/30 p-3 text-xs text-red-300 text-center">
                {error}
              </div>
            )}

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 text-left">
              <div className="rounded-2xl border border-white/[0.08] bg-[#141413]/70 p-5 space-y-2 backdrop-blur-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#faf9f5]">Full JavaScript Hydration</h3>
                <p className="text-xs text-[#a8a29e] leading-relaxed">
                  Executes all React/Next.js/Vue scripts and auto-scrolls the entire page to trigger lazy loaded images and videos.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#141413]/70 p-5 space-y-2 backdrop-blur-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Code2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#faf9f5]">Tailwind v4 & Tokens</h3>
                <p className="text-xs text-[#a8a29e] leading-relaxed">
                  Automatically extracts the exact color palette, typography font families, and generates ready-to-use Tailwind config.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#141413]/70 p-5 space-y-2 backdrop-blur-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Download className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[#faf9f5]">1-Click Offline ZIP</h3>
                <p className="text-xs text-[#a8a29e] leading-relaxed">
                  Downloads a production-ready package with standalone index.html, extracted icons/SVGs, and CSS variables.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cloning in Progress */}
        {isLoading && (
          <div className="pt-12">
            <CloneProgress url={url} />
          </div>
        )}

        {/* Clone Dashboard */}
        {cloneData && !isLoading && (
          <CloneDashboard cloneData={cloneData} onReset={() => setCloneData(null)} />
        )}
      </main>

      {/* Pro Upgrade Modal */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        isPro={isPro}
        onActivatePro={handleActivatePro}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0c0c0b] py-6 text-center text-xs text-[#78716c]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Zippix Web. Enterprise Webpage Cloner & Token Ripper.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">Cloud Engine Ready</span>
            <span>•</span>
            <button onClick={() => setIsProModalOpen(true)} className="hover:text-amber-400 transition">
              Upgrade Pro
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
