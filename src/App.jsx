import React, { useState, useEffect } from 'react';
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
import { Zap, Rocket, Globe, Shield, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloneData, setCloneData] = useState(null);
  const [error, setError] = useState(null);

  // Theme state: defaults to 'light' to match webcloner.tech clean look
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('webcloner_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('webcloner_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

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
    <div
      className={`relative min-h-screen flex flex-col transition-colors duration-200 overflow-x-hidden ${
        isDark ? 'bg-[#07070a] text-slate-100 webcloner-grid-dark' : 'bg-white text-slate-900 webcloner-grid-light'
      }`}
    >
      {/* Soft Ambient Radial Blur Orbs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/10 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-[25%] right-0 w-[450px] h-[450px] bg-purple-500/10 blur-[140px] -z-10" />

      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isPro={isPro}
        freeClonesRemaining={freeClonesRemaining}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 w-full space-y-16">
        {/* Hero Section */}
        <section id="cloner-section" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-10 sm:pt-16 space-y-6">
          {/* Bolt Pill Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Zap className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
            <span>Website Migration, Backup & Development Tool</span>
          </div>

          {/* Headline matching webcloner.tech */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Clone <span className="text-webcloner-gradient">Websites You Own</span>
            <br className="hidden sm:inline" /> and Download It as ZIP
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Capture and export the HTML, CSS, JavaScript, images, and other publicly accessible assets of websites you
            own or are authorized to reproduce. Use WebCloner for migration, backup, archival, development, testing, and
            other lawful workflows.
          </p>

          {/* Big Input Card */}
          <div className="pt-2">
            <UrlInputBar onClone={handleClone} isLoading={isLoading} theme={theme} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-auto max-w-xl rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/40 p-3.5 text-xs text-red-600 dark:text-red-300 text-center">
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
            <CloneDashboard cloneData={cloneData} onReset={() => setCloneData(null)} theme={theme} />
          </div>
        )}

        {/* Moving Marquee Banner */}
        <MarqueeBanner theme={theme} />

        {/* Bento Tools Grid */}
        <ToolsBento theme={theme} />

        {/* Dashboard Showcase Section with Floating Badges */}
        <DashboardShowcase theme={theme} />

        {/* Personas / Solutions Section */}
        <PersonasSection theme={theme} />

        {/* 3 Simple Steps */}
        <section className={`py-20 border-y ${isDark ? 'bg-[#0a0a14] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Get Started in 3 Simple Steps</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                No complex browser plugins or scrapers needed. Instant full-page reproduction in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`p-8 rounded-2xl border text-center space-y-4 ${
                  isDark ? 'bg-[#0e0e18] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  1
                </div>
                <h3 className="text-lg font-bold">Enter an Authorized URL</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Enter the URL of any website you own or are authorized to reproduce, and choose your recreation depth.
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl border text-center space-y-4 ${
                  isDark ? 'bg-[#0e0e18] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  2
                </div>
                <h3 className="text-lg font-bold">Captures Accessible Resources</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Our cloud Chromium engine executes all JavaScript, mounts React/Next.js hydrations, and extracts
                  assets.
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl border text-center space-y-4 ${
                  isDark ? 'bg-[#0e0e18] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                  3
                </div>
                <h3 className="text-lg font-bold">Export Your Website</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Download the resulting standalone ZIP package containing index.html, Tailwind v4 theme, and all media.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection theme={theme} />

        {/* FAQs */}
        <FaqSection theme={theme} />

        {/* Bottom Call to Action */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div
            className={`rounded-3xl border p-8 sm:p-14 space-y-6 text-center ${
              isDark
                ? 'bg-gradient-to-b from-[#121222] to-[#0a0a14] border-white/10 shadow-2xl'
                : 'bg-gradient-to-b from-blue-50 to-white border-blue-200/80 shadow-xl'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Capture Your First Website?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Join thousands of developers, agencies, and web professionals archiving and migrating websites with
              WebCloner.
            </p>
            <div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-webcloner rounded-xl px-8 py-3.5 text-sm font-bold inline-flex items-center gap-2"
              >
                <Rocket className="h-4 w-4" />
                <span>Start Free Now</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-8 transition-colors ${
          isDark ? 'bg-[#07070a] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6 object-contain" />
            <span className="font-bold text-slate-800 dark:text-white">WebCloner</span>
            <span>© {new Date().getFullYear()} WebCloner by Zippix. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-blue-600 transition">
              Privacy Policy
            </button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-blue-600 transition">
              Terms of Use
            </button>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-blue-600 transition">
              Contact Us
            </button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-blue-600 transition">
              About Us
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
