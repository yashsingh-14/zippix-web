import React, { useState } from 'react';
import { Header } from './components/Header.jsx';
import { AnimatedHeroLogo } from './components/AnimatedHeroLogo.jsx';
import { UrlInputBar } from './components/UrlInputBar.jsx';
import { StudioPlayground } from './components/StudioPlayground.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { CloneProgress } from './components/CloneProgress.jsx';
import { CloneDashboard } from './components/CloneDashboard.jsx';
import { AuthModal } from './components/AuthModal.jsx';
import { ProUpgradeModal } from './components/ProUpgradeModal.jsx';
import { AboutModal } from './components/AboutModal.jsx';
import { PrivacyModal } from './components/PrivacyModal.jsx';
import { TermsModal } from './components/TermsModal.jsx';
import { ContactModal } from './components/ContactModal.jsx';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloneData, setCloneData] = useState(null);
  const [error, setError] = useState(null);

  // Auth state management
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('zippix_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Auto-grant Pro Access on local development
  const isLocalEnv =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '');

  const [isPro, setIsPro] = useState(() => {
    if (isLocalEnv) return true;
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

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('zippix_user');
    setUser(null);
  };

  const handleClone = async (targetUrl, depth = 'standard') => {
    setError(null);

    if (!isPro && !isLocalEnv && freeClonesRemaining <= 0 && !user) {
      setIsAuthOpen(true);
      return;
    }

    setUrl(targetUrl);
    setIsLoading(true);
    setCloneData(null);

    // Automatically smooth scroll directly into the Webpage Cloning section
    setTimeout(() => {
      const progressEl = document.getElementById('cloning-progress-section');
      if (progressEl) {
        progressEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);

    try {
      const response = await fetch('/api/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl, depth }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to reconstruct website. Please verify the URL and try again.');
      }

      setCloneData(data);

      // Smoothly scroll to the results dashboard when cloning finishes
      setTimeout(() => {
        const dashboardEl = document.getElementById('cloned-dashboard-section');
        if (dashboardEl) {
          dashboardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);

      if (!isPro && !isLocalEnv) {
        const nextUsed = freeClonesUsed + 1;
        setFreeClonesUsed(nextUsed);
        localStorage.setItem('zippix_web_clones_used', nextUsed.toString());
      }
    } catch (err) {
      setError(err.message || 'Error occurred while reconstructing website.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col zippix-canvas text-slate-100 overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      {/* Signature Logo-Matched Ambient Light Mesh */}
      <div className="logo-ambient-mesh" />

      {/* Subtle Atmospheric Side Glow Auras matching logo (#38bdf8, #6366f1, #c084fc) */}
      <div className="fixed top-20 -left-48 w-[600px] h-[600px] rounded-full bg-sky-500/15 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-[35%] -right-48 w-[550px] h-[550px] rounded-full bg-indigo-500/15 blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[300px] rounded-full bg-sky-400/10 blur-[140px] pointer-events-none -z-10" />

      {/* Sundown-Inspired Apple Glassmorphism Header */}
      <Header
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        isPro={isPro}
        freeClonesRemaining={freeClonesRemaining}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Experience Body */}
      <main className="flex-1 w-full space-y-24 relative z-10">
        {/* Hero Section with Animated Floating 3D Logo Background */}
        <section id="cloner-section" className="mx-auto max-w-4xl px-4 sm:px-6 text-center pt-8 sm:pt-12 lg:pt-14 space-y-4 sm:space-y-5 relative">
          {/* Animated 3D Floating Isometric Logo Plate System */}
          <AnimatedHeroLogo />

          {/* Subtle Indicator Pill */}
          <div className="inline-flex items-center gap-2 rounded-full apple-glass-pill px-3.5 py-1 text-xs font-medium text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>Instant Website Cloner</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
            Clone Any Website into <br />
            <span className="text-gradient-logo">Clean Code & ZIP</span>
          </h1>

          {/* Minimal 1-Sentence Subtitle */}
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            Enter any URL to extract clean HTML, modern CSS styling, and offline assets in seconds.
          </p>

          {/* Minimal Command Console */}
          <div className="pt-1">
            <UrlInputBar onClone={handleClone} isLoading={isLoading} />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200 text-center backdrop-blur-md">
              {error}
            </div>
          )}
        </section>

        {/* Live Cloning Progress Tracker */}
        {isLoading && (
          <div id="cloning-progress-section" className="mx-auto max-w-4xl px-4 scroll-mt-28">
            <CloneProgress url={url} />
          </div>
        )}

        {/* Cloned Result Dashboard */}
        {cloneData && !isLoading && (
          <div id="cloned-dashboard-section" className="mx-auto max-w-7xl px-4 scroll-mt-24">
            <CloneDashboard cloneData={cloneData} onReset={() => setCloneData(null)} theme="dark" />
          </div>
        )}

        {/* Interactive Studio Playground & Viewport Sandbox */}
        <StudioPlayground />

        {/* Technical FAQ */}
        <FaqSection />
      </main>

      {/* Engineering Footer with Apple Glassmorphism */}
      <footer className="border-t border-white/[0.08] py-12 bg-[#020408]/95 text-slate-400 relative z-10 mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Zippix Logo" className="h-8 w-8 object-contain" />
              <div>
                <span className="font-bold text-white text-base">Zippix</span>
                <span className="text-xs text-slate-500 block">AI Web Reconstruction Engine</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-sky-400 transition">
                Privacy Policy
              </button>
              <button onClick={() => setIsTermsOpen(true)} className="hover:text-sky-400 transition">
                Terms of Use
              </button>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-sky-400 transition">
                Contact Support
              </button>
              <button onClick={() => setIsAboutOpen(true)} className="hover:text-sky-400 transition">
                About Zippix
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Zippix Cloud Technologies. All rights reserved.</span>
            <div className="flex items-center gap-2 text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Legal & Pro Modals */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onActivatePro={handleActivatePro}
      />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
