import React, { useState } from 'react';
import {
  Terminal,
  Rocket,
  Menu,
  X,
  ShieldCheck,
  Zap,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Key,
} from 'lucide-react';

export const Header = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenProModal,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full apple-glass-nav transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Live System Status */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 opacity-40 blur group-hover:opacity-90 transition duration-300" />
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
                  v2.0
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

        {/* Right Action & Auth Area */}
        <div className="flex items-center gap-3">
          {/* User Logged In State vs Logged Out State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full p-1 sm:pr-3.5 apple-glass-pill hover:border-blue-400/50 transition"
              >
                <img
                  src={user.avatar || '/logo.svg'}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border border-white/20 bg-blue-950 object-cover"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-blue-400 font-mono leading-none">PRO DEV</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 apple-glass-modal rounded-2xl p-2 shadow-2xl border border-white/15 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-white/[0.08] mb-1">
                    <p className="font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenProModal();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition text-left"
                  >
                    <Zap className="h-3.5 w-3.5 text-blue-400" />
                    <span>Unlimited Pro Plan</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      scrollTo('studio-playground');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition text-left"
                  >
                    <Terminal className="h-3.5 w-3.5 text-sky-400" />
                    <span>My Studio Workspace</span>
                  </button>

                  <div className="h-px bg-white/[0.08] my-1" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Sign In
              </button>
              <button
                onClick={onOpenAuth}
                className="btn-zippix-secondary rounded-xl px-4 py-2 text-xs font-semibold hidden sm:inline-flex items-center gap-1.5"
              >
                <span>Create Account</span>
              </button>
            </div>
          )}

          {/* Start Extraction Action Button */}
          <button
            onClick={() => {
              const el = document.getElementById('reconstructor-console');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-zippix-primary rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            <span>Launch Engine</span>
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
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full btn-zippix-primary py-2.5 rounded-xl text-xs font-bold text-center"
              >
                Sign In / Sign Up
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-left text-xs text-red-400 hover:text-red-300 py-1"
              >
                Sign Out ({user.email})
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left text-xs text-slate-400 hover:text-slate-200"
            >
              About Zippix
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrivacy();
              }}
              className="text-left text-xs text-slate-400 hover:text-slate-200"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left text-xs text-slate-400 hover:text-slate-200"
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
