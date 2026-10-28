import React, { useState } from 'react';
import { Terminal, Rocket, Menu, X, ShieldCheck, Zap } from 'lucide-react';

export const Header = ({
  isPro,
  freeClonesRemaining,
  onOpenProModal,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020408]/85 backdrop-blur-2xl border-b border-white/[0.07] transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Live System Status */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 opacity-40 blur group-hover:opacity-80 transition duration-300" />
              <img
                src="/logo.svg"
                alt="Zippix"
                className="relative h-9 w-9 object-contain drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-300 transition">
                  Zippix
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                  Engine v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Engine Live Status Dot */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cloud Sandbox Active</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => scrollTo('reconstructor-console')}
            className="text-slate-300 hover:text-white transition duration-200"
          >
            Console
          </button>
          <button
            onClick={() => scrollTo('engine-matrix')}
            className="text-slate-300 hover:text-white transition duration-200"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo('studio-playground')}
            className="text-slate-300 hover:text-white transition duration-200"
          >
            Studio
          </button>
          <button
            onClick={() => scrollTo('workflow-pipelines')}
            className="text-slate-300 hover:text-white transition duration-200"
          >
            Pipelines
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
            className="text-slate-300 hover:text-white transition duration-200"
          >
            FAQ
          </button>
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-3">
          {/* Pro Pill Badge */}
          {isPro ? (
            <div
              onClick={onOpenProModal}
              className="cursor-pointer hidden sm:flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md shadow-sm hover:border-blue-400 transition"
            >
              <Zap className="h-3 w-3 text-blue-400" />
              <span>Unlimited Access</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 transition"
            >
              <span>Free Runs:</span>
              <strong className="text-blue-400 font-bold">{freeClonesRemaining}</strong>
            </button>
          )}

          {/* Launch Button */}
          <button
            onClick={() => {
              const el = document.getElementById('reconstructor-console');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-zippix-primary rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            <span>Start Extraction</span>
          </button>

          {/* Mobile Menu */}
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
            onClick={() => scrollTo('reconstructor-console')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Console
          </button>
          <button
            onClick={() => scrollTo('engine-matrix')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo('studio-playground')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Studio
          </button>
          <button
            onClick={() => scrollTo('workflow-pipelines')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-blue-400"
          >
            Pipelines
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
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
