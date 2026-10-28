import React, { useState } from 'react';
import { Sparkles, Rocket, Menu, X, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export const Header = ({
  isPro,
  freeClonesRemaining,
  onOpenProModal,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020408]/85 backdrop-blur-xl border-b border-white/[0.07] transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-40 blur-sm group-hover:opacity-75 transition duration-300" />
              <img
                src="/logo.svg"
                alt="Zippix Logo"
                className="relative h-10 w-10 object-contain drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-200 transition">
                  Zippix
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  Cloud Engine
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">
                AI Webpage Reconstruction
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 ml-10 text-sm font-medium">
            <button
              onClick={() => scrollToSection('cloner-section')}
              className="text-slate-300 hover:text-white transition duration-200"
            >
              Engine
            </button>
            <button
              onClick={() => scrollToSection('tools-section')}
              className="text-slate-300 hover:text-white transition duration-200"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('dashboard-section')}
              className="text-slate-300 hover:text-white transition duration-200"
            >
              Architecture
            </button>
            <button
              onClick={() => scrollToSection('workflow-section')}
              className="text-slate-300 hover:text-white transition duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="text-slate-300 hover:text-white transition duration-200"
            >
              FAQ
            </button>
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Pro Status Badge */}
          {isPro ? (
            <div
              onClick={onOpenProModal}
              className="cursor-pointer hidden sm:flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md shadow-sm hover:border-blue-500/50 transition"
            >
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
              <span>Developer Pro</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 transition"
            >
              <span>Remaining:</span>
              <strong className="text-blue-400 font-semibold">{freeClonesRemaining}</strong>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => {
              const el = document.getElementById('cloner-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-zippix-primary rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            <span>Launch Cloner</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#020408]/98 backdrop-blur-2xl px-6 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('cloner-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Engine
          </button>
          <button
            onClick={() => scrollToSection('tools-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollToSection('dashboard-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Architecture
          </button>
          <button
            onClick={() => scrollToSection('workflow-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('faq-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            FAQ
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left text-sm text-slate-400 hover:text-slate-200"
            >
              About Zippix
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrivacy();
              }}
              className="text-left text-sm text-slate-400 hover:text-slate-200"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left text-sm text-slate-400 hover:text-slate-200"
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
