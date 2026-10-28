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
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand: Logo + Clean Wordmark */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.svg"
            alt="Zippix"
            className="h-7 w-7 object-contain transition duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.35)]"
          />
          <span className="text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition">
            Zippix
          </span>
        </div>

        {/* Desktop Nav Items: Slim Sundown Studio Inspired Pills */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollTo('studio-playground')}
            className="sundown-nav-pill py-1.5 px-3.5 text-xs"
          >
            <span>Studio</span>
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
            className="sundown-nav-pill py-1.5 px-3.5 text-xs"
          >
            <span>FAQ</span>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full py-1 px-3 apple-glass-pill hover:border-white/30 transition text-xs"
              >
                <img
                  src={user.avatar || '/logo.svg'}
                  alt={user.name}
                  className="h-5 w-5 rounded-full border border-white/20 bg-blue-950 object-cover"
                />
                <span className="font-semibold text-white">{user.name}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 apple-glass-modal rounded-2xl p-1.5 shadow-2xl border border-white/10 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                    <p className="font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenProModal();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-left transition"
                  >
                    <Zap className="h-3.5 w-3.5 text-sky-400" />
                    <span>Pro Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-left transition"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="sundown-nav-pill py-1.5 px-3.5 text-xs"
            >
              <span>Sign In</span>
            </button>
          )}

          {/* Primary CTA Pill with Sundown White Bubble Roll */}
          <button
            onClick={() => {
              const el = document.getElementById('cloner-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="sundown-nav-pill-primary py-1.5 px-4 text-xs ml-1"
          >
            <span>Start Free</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Mobile Nav Right: Start Free + Menu Pill */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById('cloner-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="sundown-nav-pill-primary px-3 py-1 text-xs"
          >
            <span>Start Free</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sundown-nav-pill px-3 py-1 text-xs flex items-center gap-1.5"
          >
            {mobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#020408]/98 backdrop-blur-2xl px-6 py-4 space-y-3 text-sm">
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
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="text-xs font-semibold text-sky-400"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs text-red-400"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-xs text-slate-400"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
