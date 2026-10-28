import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, Zap, ArrowRight } from 'lucide-react';

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
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
        {/* Brand: Logo + Clean Wordmark (Expanded to Left) */}
        <div
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.svg"
            alt="Zippix"
            className="h-8 w-8 object-contain transition duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(56,189,248,0.4)]"
          />
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition">
            Zippix
          </span>
        </div>

        {/* Desktop Nav Items: Expanded Sundown Studio Inspired Pills (Spread to Right) */}
        <div className="hidden md:flex items-center gap-3.5">
          <button
            onClick={() => scrollTo('studio-playground')}
            className="sundown-nav-pill px-5 py-2 text-sm"
          >
            <span>Studio</span>
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
            className="sundown-nav-pill px-5 py-2 text-sm"
          >
            <span>FAQ</span>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full py-2 px-4 apple-glass-pill hover:border-white/30 transition text-sm"
              >
                <img
                  src={user.avatar || '/logo.svg'}
                  alt={user.name}
                  className="h-6 w-6 rounded-full border border-white/20 bg-blue-950 object-cover"
                />
                <span className="font-semibold text-white">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 apple-glass-modal rounded-2xl p-2 shadow-2xl border border-white/10 z-50 text-xs">
                  <div className="px-3.5 py-2.5 border-b border-white/[0.06] mb-1">
                    <p className="font-bold text-white truncate text-sm">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenProModal();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-left transition"
                  >
                    <Zap className="h-4 w-4 text-sky-400" />
                    <span>Pro Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-left transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="sundown-nav-pill px-5 py-2 text-sm"
            >
              <span>Sign In</span>
            </button>
          )}

          {/* Primary Expanded CTA Pill */}
          <button
            onClick={() => {
              const el = document.getElementById('cloner-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="sundown-nav-pill-primary px-6 py-2.5 text-sm ml-1"
          >
            <span>Start Free</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Nav Right: Start Free + Menu Pill */}
        <div className="flex md:hidden items-center gap-2.5">
          <button
            onClick={() => {
              const el = document.getElementById('cloner-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="sundown-nav-pill-primary px-4 py-1.5 text-xs"
          >
            <span>Start Free</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sundown-nav-pill px-3.5 py-1.5 text-xs flex items-center gap-1.5"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#020408]/98 backdrop-blur-3xl px-6 py-5 space-y-3.5 text-base shadow-2xl">
          <button
            onClick={() => scrollTo('studio-playground')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Studio Sandbox
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
            className="block w-full text-left py-2 text-slate-300 hover:text-white"
          >
            Frequently Asked Questions
          </button>
          <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="text-sm font-semibold text-sky-400"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-sm text-red-400"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-sm text-slate-400"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
