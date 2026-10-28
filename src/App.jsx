import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { UrlInputBar } from './components/UrlInputBar.jsx';
import { CloneProgress } from './components/CloneProgress.jsx';
import { CloneDashboard } from './components/CloneDashboard.jsx';
import { ProUpgradeModal } from './components/ProUpgradeModal.jsx';
import { Sparkles, Layers, Download, Code2, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloneData, setCloneData] = useState(null);
  const [error, setError] = useState(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  // Check if running in local development (Auto-grant Free Unlimited Access to the creator!)
  const isLocalEnv = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '');

  const [isPro, setIsPro] = useState(() => {
    if (isLocalEnv) return true; // Creator/Dev mode on localhost is always PRO unlimited!
    return localStorage.getItem('zippix_web_is_pro') === 'true';
  });

  const [freeClonesUsed, setFreeClonesUsed] = useState(() => {
    return parseInt(localStorage.getItem('zippix_web_clones_used') || '0', 10);
  });

  const FREE_MAX = 10;
  const freeClonesRemaining = Math.max(0, FREE_MAX - freeClonesUsed);

  const handleActivatePro = () => {
    setIsPro(true);
    localStorage.setItem('zippix_web_is_pro', 'true');
  };

  const handleClone = async (targetUrl) => {
    setError(null);

    // Only block if strictly not Pro and exhausted free quota
    if (!isPro && !isLocalEnv && freeClonesRemaining <= 0) {
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

      if (!isPro && !isLocalEnv) {
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
    <div className="relative min-h-screen flex flex-col bg-[#07070a] text-[#f8fafc] antigravity-bg overflow-x-hidden">
      {/* Antigravity Ambient Glow Spotlights */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-sky-500/20 via-purple-600/10 to-transparent blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-[25%] right-0 w-[500px] h-[500px] bg-purple-600/15 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-[40%] left-0 w-[500px] h-[500px] bg-sky-500/10 blur-[140px] -z-10" />

      {/* Top Header */}
      <Header
        isPro={isPro}
        freeClonesRemaining={freeClonesRemaining}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* If no clone yet and not loading -> Show Antigravity Hero & Input */}
        {!cloneData && !isLoading && (
          <div className="mx-auto max-w-4xl text-center space-y-9 pt-8 sm:pt-14 pb-14">
            {/* Glowing Antigravity Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Full-Stack Cloud Webpage Cloner & Token Ripper</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            </div>

            {/* Antigravity Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none">
                Clone Any Website into{' '}
                <span className="text-logo-gradient">
                  Clean Code
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#94a3b8] leading-relaxed font-normal">
                Instant full-page HTML, Tailwind CSS v4 theme, sparkling animations, and offline media assets. Powered by cloud headless Chromium.
              </p>
            </div>

            {/* URL Input Bar */}
            <UrlInputBar onClone={handleClone} isLoading={isLoading} />

            {/* Error Message */}
            {error && (
              <div className="mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300 text-center backdrop-blur-md">
                {error}
              </div>
            )}

            {/* Antigravity Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 text-left">
              <div className="glass-card rounded-3xl p-6 space-y-3 transition duration-300 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 shadow-sm group-hover:scale-110 transition duration-300">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Full JavaScript Hydration</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Executes all Next.js, React, and Vue scripts. Smoothly triggers lazy images, Lenis scrolls, and section reveals.
                </p>
              </div>

              <div className="glass-card rounded-3xl p-6 space-y-3 transition duration-300 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shadow-sm group-hover:scale-110 transition duration-300">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Tailwind v4 & Sparkles</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Extracts exact brand colors, font families, and preserves sparkling text animations and clip-paths seamlessly.
                </p>
              </div>

              <div className="glass-card rounded-3xl p-6 space-y-3 transition duration-300 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shadow-sm group-hover:scale-110 transition duration-300">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">1-Click Offline ZIP</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Downloads a production-ready package with standalone index.html, extracted SVG icons, and CSS variables.
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

      {/* Modern Minimal Footer */}
      <footer className="border-t border-white/[0.06] bg-[#07070a]/90 py-6 text-center text-xs text-[#64748b]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Zippix Web. Enterprise Webpage Cloner & Token Ripper.</p>
          <div className="flex items-center gap-4">
            <span className="text-sky-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
              Antigravity Engine Active
            </span>
            <span>•</span>
            <button onClick={() => setIsProModalOpen(true)} className="hover:text-sky-300 transition">
              Manage Access
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
