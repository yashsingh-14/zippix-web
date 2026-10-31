import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, Zap, ArrowRight, Crown, ShieldCheck } from 'lucide-react';

export const Header = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenProModal,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
  isPro,
  freeClonesRemaining,
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
                className={`flex items-center gap-2 rounded-full py-1.5 px-3.5 apple-glass-pill transition text-sm ${
                  user.isAdmin
                    ? 'border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'hover:border-white/30'
                }`}
              >
                <img
                  src={user.avatar || '/logo.svg'}
                  alt={user.name}
                  className={`h-6 w-6 rounded-full object-cover border ${
                    user.isAdmin ? 'border-amber-400' : 'border-white/20 bg-blue-950'
                  }`}
                />
                <span className="font-semibold text-white flex items-center gap-1.5">
                  {user.name}
                  {user.isAdmin && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/25 text-amber-300 border border-amber-500/50 flex items-center gap-0.5 shadow-sm">
                      <Crown className="h-3 w-3 text-amber-400" />
                      Admin
                    </span>
                  )}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 apple-glass-modal rounded-2xl p-2.5 shadow-2xl border border-white/10 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-white/[0.08] mb-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-white truncate text-sm">{user.name}</p>
                      {user.isAdmin && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>

                    {/* Role / Access Level Badge */}
                    {user.isAdmin ? (
                      <div className="mt-2 p-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30">
                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                          <span className="flex items-center gap-1">
                            <Crown className="h-3 w-3 text-amber-400" />
                            Lifetime Admin Access
                          </span>
                          <span className="font-mono text-amber-200">∞ Free</span>
                        </div>
                        <p className="text-[10px] text-amber-300/70 mt-0.5">
                          Uncapped extractions • Priority bypass
                        </p>
                      </div>
                    ) : (
                      <div className="mt-2 p-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between text-[11px] text-sky-300">
                        <span>{isPro ? 'Pro Developer' : 'Free Tier'}</span>
                        <span className="font-mono">{isPro ? 'Unlimited' : `${freeClonesRemaining} left`}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenProModal();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-left transition"
                  >
                    <Zap className="h-4 w-4 text-sky-400" />
                    <span>{user.isAdmin ? 'Admin VIP Privileges' : 'Pro Account Features'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-left transition"
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
