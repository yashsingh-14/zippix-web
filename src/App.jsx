import React, { useState } from 'react';
import { Header } from './components/Header.jsx';
import { UrlInputBar } from './components/UrlInputBar.jsx';
import { CloneProgress } from './components/CloneProgress.jsx';
import { CloneDashboard } from './components/CloneDashboard.jsx';
import { ProUpgradeModal } from './components/ProUpgradeModal.jsx';
import { AboutModal } from './components/AboutModal.jsx';
import { PrivacyModal } from './components/PrivacyModal.jsx';
import { TermsModal } from './components/TermsModal.jsx';
import { ContactModal } from './components/ContactModal.jsx';
import {
  Sparkles,
  Layers,
  Download,
  Code2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Globe,
  Monitor,
  Flame,
  FileCode,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does Zippix clone animations and scrolling effects accurately?',
    a: 'Unlike naive static scrapers that only download raw HTML, Zippix runs a cloud-based headless Chromium instance. It executes all JavaScript, mounts React/Next.js/Vue hydrations, executes deep section auto-scrolling to trigger IntersectionObservers, and bundles an embedded Lenis physics engine and animation runtime directly inside the cloned output.',
  },
  {
    q: 'Can I export the design system directly into Tailwind CSS v4 or v3?',
    a: 'Yes! Zippix automatically analyzes computed color palettes and font families from the target webpage and generates a ready-to-use theme.css (for Tailwind v4) and tailwind.config.js (for Tailwind v3), along with standard CSS custom properties in variables.css.',
  },
  {
    q: 'Is the downloaded ZIP package completely offline ready?',
    a: 'Absolutely. Every exported bundle contains standalone HTML, extracted SVG icons, normalized image and video paths, styles, and design token JSON files that you can double-click and view locally in any browser without needing an internet connection.',
  },
  {
    q: 'Is cloning publicly accessible websites legal?',
    a: 'Zippix is designed for frontend developers, UI/UX designers, and researchers inspecting publicly accessible layouts, color systems, and responsive architectures. Users must adhere to fair use, respect intellectual property, and comply with target website terms.',
  },
];

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
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

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

  const handleClone = async (targetUrl) => {
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
    <div className="relative min-h-screen flex flex-col bg-[#07070a] text-[#f8fafc] antigravity-bg overflow-x-hidden selection:bg-sky-500/25 selection:text-sky-300">
      {/* Ambient Lighting Background Accents */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-sky-500/20 via-purple-600/10 to-transparent blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-[30%] right-0 w-[550px] h-[550px] bg-purple-600/15 blur-[150px] -z-10" />
      <div className="pointer-events-none absolute top-[60%] left-0 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] -z-10" />

      {/* Top Header */}
      <Header
        isPro={isPro}
        freeClonesRemaining={freeClonesRemaining}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-24">
        {/* Section 1: Hero & URL Input Box */}
        <section id="cloner-section" className="mx-auto max-w-4xl text-center space-y-9 pt-6 sm:pt-12">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Zippix Cloud 2.0 • High-Fidelity Website Cloner</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none">
              Capture Any Website into{' '}
              <span className="text-logo-gradient">Clean Code</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#94a3b8] leading-relaxed font-normal">
              Instant full-page HTML, Tailwind CSS v4 design systems, Lenis scroll animations, and offline media assets. Powered by cloud headless Chromium.
            </p>
          </div>

          {/* URL Input Bar */}
          <UrlInputBar onClone={handleClone} isLoading={isLoading} />

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs text-[#64748b] flex-wrap pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
              Lenis Scroll Preserved
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
              Tailwind CSS v4 & v3
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
              100% Offline Standalone ZIP
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
              Zero Phishing Risk (Client Sandboxed)
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300 text-center backdrop-blur-md">
              {error}
            </div>
          )}
        </section>

        {/* Progress Display */}
        {isLoading && (
          <div className="pt-4">
            <CloneProgress url={url} />
          </div>
        )}

        {/* Cloned Result Dashboard */}
        {cloneData && !isLoading && (
          <CloneDashboard cloneData={cloneData} onReset={() => setCloneData(null)} />
        )}

        {/* Section 2: How It Works Workflow */}
        <section id="how-it-works" className="mx-auto max-w-6xl space-y-12 border-t border-white/[0.08] pt-20">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-300">
              <Zap className="h-3.5 w-3.5" />
              <span>Engine Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How Zippix Clones in 3 Precision Steps</h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl mx-auto">
              Our cloud cluster handles complex JavaScript, CSS keyframes, and scroll observers automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 font-mono font-bold text-lg">
                01
              </div>
              <h3 className="text-base font-bold text-white">Cloud Chromium Hydration</h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                When you input a URL, a dedicated Chromium browser sandbox navigates to the webpage, executing all React, Vue, and Next.js scripts in the cloud.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-lg">
                02
              </div>
              <h3 className="text-base font-bold text-white">Deep Scroll & Reveal Observer</h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                The engine automatically glides through every section, triggering IntersectionObservers, lazy-loaded 4K imagery, Lenis physics, and sparkling text sweeps.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 font-mono font-bold text-lg">
                03
              </div>
              <h3 className="text-base font-bold text-white">1-Click Production Packaging</h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Consolidates styles, generates Tailwind CSS v4 & v3 configurations, rips all SVG and video assets, and packs everything into a single offline ZIP.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Deep Feature Grid */}
        <section id="features-section" className="mx-auto max-w-6xl space-y-12 border-t border-white/[0.08] pt-20">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engineered for Perfectionists</h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl mx-auto">
              Everything you need to clone, study, and rebuild modern web interfaces effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Pixel-Perfect DOM Capture</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Captures the exact visual computed styles, layouts, Flexbox/Grid structures, and pseudo-elements without layout shifts.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Lenis Scroll & Sparkle Text</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Clones embedded Lenis smooth-scrolling physics and preserves dynamic golden light sweeps on reveal headers seamlessly.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Tailwind CSS v4 Architect</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Extracts complete brand color palettes and typography families, writing clean @theme tokens in modern theme.css.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
                <Download className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Batch Asset Ripper</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Separates SVG vector icons, 4K WebP/PNG images, background videos, and audio files with individual or bulk download.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Anti-Blank Clip-Path Shield</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Automatically unblocks closed polygon clip-paths and inline opacity zeroes so no section is ever rendered blank.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                <FileCode className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Interactive Sandbox Preview</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Test your cloned webpage live right on the dashboard with 4 responsive device viewports: Desktop, Laptop, Tablet, and Mobile.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Transparent Pricing */}
        <section id="pricing-section" className="mx-auto max-w-5xl space-y-12 border-t border-white/[0.08] pt-20">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Simple Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Invest Once, Clone Forever</h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl mx-auto">
              Choose the plan that fits your workflow. 100% money-back guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="glass-card rounded-3xl p-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Community Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$0</span>
                  <span className="text-xs text-[#94a3b8]">/ forever</span>
                </div>
                <p className="text-xs text-[#94a3b8]">Perfect for testing out Zippix Web on individual websites.</p>

                <div className="space-y-2.5 pt-2 text-xs text-[#cbd5e1]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>10 Webpage Clones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Standalone HTML Export</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Standard Speed Cloud Chromium</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] py-2.5 text-xs font-bold text-white transition"
              >
                Start Free
              </button>
            </div>

            {/* Pro Tier (Featured) */}
            <div className="relative rounded-3xl border border-sky-500/40 bg-gradient-to-b from-[#121124] to-[#0c0c14] p-7 space-y-6 flex flex-col justify-between shadow-[0_0_40px_rgba(56,189,248,0.2)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full btn-antigravity px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wide">
                Most Popular
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Pro Lifetime Deal</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-xs text-[#94a3b8]">/ one-time pay</span>
                </div>
                <p className="text-xs text-[#94a3b8]">Unlimited access for professional developers and freelancers.</p>

                <div className="space-y-2.5 pt-2 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                    <span>Unlimited Website Clones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                    <span>Full Lenis Scroll & Motion Preservation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                    <span>Tailwind CSS v4 & v3 Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                    <span>Full Offline ZIP Bundler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                    <span>Priority Cloud Execution</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsProModalOpen(true)}
                className="btn-antigravity w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg"
              >
                Get Lifetime Access ($29)
              </button>
            </div>

            {/* Agency Tier */}
            <div className="glass-card rounded-3xl p-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Agency License</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$79</span>
                  <span className="text-xs text-[#94a3b8]">/ one-time</span>
                </div>
                <p className="text-xs text-[#94a3b8]">For design teams, dev studios, and high-volume agencies.</p>

                <div className="space-y-2.5 pt-2 text-xs text-[#cbd5e1]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Everything in Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Commercial Client Resale License</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Batch Multi-Page Cloner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Direct Developer Support</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] py-2.5 text-xs font-bold text-white transition"
              >
                Contact Agency Sales
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: FAQs */}
        <section className="mx-auto max-w-4xl space-y-8 border-t border-white/[0.08] pt-20">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-[#94a3b8]">Everything you need to know about Zippix Web.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/[0.08] bg-[#0c0c14]/90 p-5 transition cursor-pointer hover:border-sky-500/30"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-sky-400 shrink-0" />
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-[#94a3b8] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </div>
                  {isOpen && <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed pl-6">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Modern Comprehensive Footer (AdSense Compliant) */}
      <footer className="border-t border-white/[0.08] bg-[#050508] py-14 text-xs text-[#94a3b8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Bio */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <img src="/logo.svg" alt="Zippix" className="h-8 w-8 object-contain" />
                <span className="text-base font-black text-white">Zippix Web</span>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed">
                The AI-powered cloud webpage cloner and token ripper. Extract HTML, CSS, Tailwind v4 design tokens, and offline assets in seconds.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Cloud Systems Operational</span>
              </div>
            </div>

            {/* Col 2: Product */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition">
                    Live Web Cloner
                  </button>
                </li>
                <li>
                  <a href="#features-section" className="hover:text-white transition">
                    Feature Capabilities
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing-section" className="hover:text-white transition">
                    Pricing & Licenses
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Company</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition">
                    About Zippix
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition">
                    Contact Engineering
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsProModalOpen(true)} className="hover:text-white transition">
                    Pro Lifetime Deal
                  </button>
                </li>
                <li>
                  <a href="https://callofjesus.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                    <span>Showcase Site</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & AdSense Compliance */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Trust & Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition">
                    Privacy Policy (GDPR)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition">
                    Cookie Preferences
                  </button>
                </li>
                <li>
                  <span className="text-[#475569] text-[11px] block pt-1">
                    Google AdSense & Web Store Verified Partner
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#475569]">
            <p>© 2026 Zippix Technologies. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-[#94a3b8] transition">
                Privacy
              </button>
              <span>•</span>
              <button onClick={() => setIsTermsOpen(true)} className="hover:text-[#94a3b8] transition">
                Terms
              </button>
              <span>•</span>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-[#94a3b8] transition">
                Security
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        isPro={isPro}
        onActivatePro={handleActivatePro}
      />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
