import React, { useState } from 'react';
import { Header } from './components/Header.jsx';
import { UrlInputBar } from './components/UrlInputBar.jsx';
import { MarqueeBanner } from './components/MarqueeBanner.jsx';
import { ToolsBento } from './components/ToolsBento.jsx';
import { DashboardShowcase } from './components/DashboardShowcase.jsx';
import { PersonasSection } from './components/PersonasSection.jsx';
import { TestimonialsSection } from './components/TestimonialsSection.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { CloneProgress } from './components/CloneProgress.jsx';
import { CloneDashboard } from './components/CloneDashboard.jsx';
import { ProUpgradeModal } from './components/ProUpgradeModal.jsx';
import { AboutModal } from './components/AboutModal.jsx';
import { PrivacyModal } from './components/PrivacyModal.jsx';
import { TermsModal } from './components/TermsModal.jsx';
import { ContactModal } from './components/ContactModal.jsx';
import {
  Sparkles,
  Rocket,
  Zap,
  Palette,
  FolderArchive,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloneData, setCloneData] = useState(null);
  const [error, setError] = useState(null);

  // Modals state
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

  const handleClone = async (targetUrl, depth = 'standard') => {
    setError(null);

    if (!isPro && !isLocalEnv && freeClonesRemaining <= 0) {
      setIsProModalOpen(true);
      return;
    }

    setUrl(targetUrl);
    setIsLoading(true);
    setCloneData(null);

    // Smooth scroll up to top when cloner starts
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
    <div className="relative min-h-screen flex flex-col zippix-canvas text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Signature Atmospheric Side Glow Auras */}
      <div className="fixed top-24 -left-48 w-[650px] h-[650px] rounded-full bg-blue-600/20 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-[40%] -right-48 w-[550px] h-[550px] rounded-full bg-indigo-600/20 blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <Header
        isPro={isPro}
        freeClonesRemaining={freeClonesRemaining}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 w-full space-y-20">
        {/* Hero Section */}
        <section id="cloner-section" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-12 sm:pt-20 space-y-7">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Zippix Cloud Engine v2.0 • Headless Web Reconstructor</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Turn Any Webpage into{' '}
            <br className="hidden sm:inline" />
            <span className="text-gradient-electric">Production-Ready Code</span> & Offline ZIP
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            Extract pixel-perfect HTML, production-ready Tailwind CSS design tokens, dynamic 60 FPS animation layers,
            and self-contained offline media in single-click headless execution.
          </p>

          {/* Input Capsule Card */}
          <div className="pt-2">
            <UrlInputBar onClone={handleClone} isLoading={isLoading} />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mx-auto max-w-xl rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-200 text-center backdrop-blur-md">
              {error}
            </div>
          )}
        </section>

        {/* Cloning Progress Tracker */}
        {isLoading && (
          <div className="mx-auto max-w-4xl px-4">
            <CloneProgress url={url} />
          </div>
        )}

        {/* Cloned Result Dashboard */}
        {cloneData && !isLoading && (
          <div className="mx-auto max-w-7xl px-4">
            <CloneDashboard cloneData={cloneData} onReset={() => setCloneData(null)} theme="dark" />
          </div>
        )}

        {/* Zippix Architecture Highlights & Performance Metrics */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card glass-card-hover p-6 rounded-2xl text-left space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-white">Sub-12s Cloud Virtualization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Headless Chromium runtime parses full React/Next.js hydration trees and CSS layouts in seconds.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-6 rounded-2xl text-left space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Palette className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-white">Auto Tailwind Config</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly extracts colors, typography stacks, and layout spacing into modern Tailwind v4 & v3 files.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-6 rounded-2xl text-left space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <FolderArchive className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-white">100% Offline Asset Inliner</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Resolves images, vector SVGs, and web fonts into a standalone ZIP package that runs without internet.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-6 rounded-2xl text-left space-y-2.5">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-white">Native 60 FPS Motion</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eliminates laggy wheel interceptors so all scrolling reveals and keyframe animations run buttery smooth.
              </p>
            </div>
          </div>
        </section>

        {/* Moving Marquee Banner */}
        <MarqueeBanner />

        {/* Bento Capabilities Grid */}
        <ToolsBento />

        {/* Dashboard Showcase Section with Floating Badges */}
        <DashboardShowcase />

        {/* Personas / Solutions Section */}
        <PersonasSection />

        {/* 3 Simple Steps Workflow */}
        <section id="workflow-section" className="py-20 border-y border-white/[0.06] bg-[#030612]/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
                <span>Fast & Frictionless</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Reconstruct Any Page in <span className="text-gradient-electric">3 Simple Steps</span>
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto font-normal">
                No complex browser plugins or scrapers needed. Instant full-page reproduction in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card glass-card-hover p-8 rounded-2xl text-center space-y-4">
                <div className="h-12 w-12 rounded-xl btn-zippix-primary text-white font-bold text-lg flex items-center justify-center mx-auto">
                  1
                </div>
                <h3 className="text-lg font-bold text-white">Provide Target URL</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Enter the URL of any authorized webpage you wish to reconstruct, and choose your preferred
                  extraction depth.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-8 rounded-2xl text-center space-y-4">
                <div className="h-12 w-12 rounded-xl btn-zippix-primary text-white font-bold text-lg flex items-center justify-center mx-auto">
                  2
                </div>
                <h3 className="text-lg font-bold text-white">Headless Virtualization</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Our cloud Chromium engine executes JavaScript, resolves React hydrations, and preserves interactive
                  motion layers.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-8 rounded-2xl text-center space-y-4">
                <div className="h-12 w-12 rounded-xl btn-zippix-primary text-white font-bold text-lg flex items-center justify-center mx-auto">
                  3
                </div>
                <h3 className="text-lg font-bold text-white">Export Code & ZIP</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Instantly download your standalone ZIP bundle containing index.html, Tailwind v4 theme, and all media
                  assets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQs */}
        <FaqSection />

        {/* Bottom Call to Action */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="glass-card rounded-3xl p-8 sm:p-14 space-y-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Ready to Reconstruct Your <span className="text-gradient-electric">First Webpage</span>?
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Join thousands of developers, designers, and web creators deconstructing and migrating websites with
              Zippix.
            </p>
            <div className="pt-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-zippix-primary rounded-xl px-8 py-4 text-sm font-semibold inline-flex items-center gap-2.5 shadow-xl"
              >
                <Rocket className="h-4 w-4" />
                <span>Launch Cloner Free</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-10 bg-[#020408]/90 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Zippix Logo" className="h-7 w-7 object-contain" />
            <span className="font-bold text-white text-sm">Zippix</span>
            <span className="text-slate-500">
              © {new Date().getFullYear()} Zippix Cloud Technologies. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-blue-400 transition">
              Privacy Policy
            </button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-blue-400 transition">
              Terms of Use
            </button>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-blue-400 transition">
              Contact Support
            </button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-blue-400 transition">
              About Zippix
            </button>
          </div>
        </div>
      </footer>

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
