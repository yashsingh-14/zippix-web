import React from 'react';
import { Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react';

export const Header = ({
  isPro,
  freeClonesRemaining,
  onOpenProModal,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070a]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand with Transparent Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 opacity-30 blur-sm group-hover:opacity-75 transition duration-300" />
            <img
              src="/logo.svg"
              alt="Zippix Logo"
              className="relative h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] transition transform group-hover:scale-105 duration-200"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">Zippix</span>
              <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-sky-300 uppercase shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                Web
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-medium hidden sm:block">AI Cloud Cloner & Token Ripper</p>
          </div>
        </div>

        {/* Center Nav Links (Professional SaaS Structure) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#94a3b8]">
          <button onClick={() => scrollToSection('cloner-section')} className="hover:text-white transition">
            Cloner
          </button>
          <button onClick={() => scrollToSection('features-section')} className="hover:text-white transition">
            Features
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition">
            How It Works
          </button>
          <button onClick={() => scrollToSection('pricing-section')} className="hover:text-white transition">
            Pricing
          </button>
          <button onClick={onOpenAbout} className="hover:text-white transition">
            About Us
          </button>
          <button onClick={onOpenContact} className="hover:text-white transition">
            Contact
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {isPro ? (
            <div
              onClick={onOpenProModal}
              className="cursor-pointer flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 px-3.5 py-1.5 text-xs font-bold text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.25)] hover:border-sky-400/50 transition"
            >
              <Sparkles className="h-3.5 w-3.5 fill-sky-300 text-sky-300" />
              <span>Unlimited Access</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#94a3b8] hover:text-white hover:bg-white/[0.08] transition"
            >
              <span>Free Plan:</span>
              <strong className="text-sky-400">{freeClonesRemaining} clones</strong>
            </button>
          )}

          {!isPro && (
            <button
              onClick={onOpenProModal}
              className="btn-antigravity flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5 fill-white text-white" />
              <span>Upgrade Pro</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
