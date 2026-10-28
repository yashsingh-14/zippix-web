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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand: Logo + Clean Minimal Wordmark */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.svg"
            alt="Zippix"
            className="h-7 w-7 object-contain transition duration-200 group-hover:scale-105"
          />
          <span className="text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition">
            Zippix
          </span>
        </div>

        {/* Clean, Minimal Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <button
            onClick={() => scrollTo('engine-matrix')}
            className="hover:text-white transition"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('studio-playground')}
            className="hover:text-white transition"
          >
            Studio
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
            className="hover:text-white transition"
          >
            FAQ
          </button>
        </nav>

        {/* Clean Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full py-1 px-2.5 apple-glass-pill hover:border-white/25 transition"
              >
                <img
                  src={user.avatar || '/logo.svg'}
                  alt={user.name}
                  className="h-6 w-6 rounded-full border border-white/15 bg-blue-950 object-cover"
                />
                <span className="text-xs font-semibold text-white hidden sm:inline">{user.name}</span>
                <ChevronDown className="h-3 w-3 text-slate-400 hidden sm:inline" />
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
              className="text-xs font-medium text-slate-300 hover:text-white transition px-2.5 py-1.5"
            >
              Sign In
            </button>
          )}

          {/* Minimal Action Button */}
          <button
            onClick={() => {
              const el = document.getElementById('cloner-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-zippix-primary rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Start Free</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Clean Minimal Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#020408]/95 backdrop-blur-2xl px-6 py-4 space-y-2 text-sm">
          <button
            onClick={() => scrollTo('engine-matrix')}
            className="block w-full text-left py-1.5 text-slate-300 hover:text-white"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('studio-playground')}
            className="block w-full text-left py-1.5 text-slate-300 hover:text-white"
          >
            Studio
          </button>
          <button
            onClick={() => scrollTo('faq-section')}
            className="block w-full text-left py-1.5 text-slate-300 hover:text-white"
          >
            FAQ
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
                Sign In
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
