import React from 'react';
import { Sparkles, Sun, Moon, Rocket, ExternalLink, Menu, X } from 'lucide-react';

export const Header = ({
  theme = 'light',
  onToggleTheme,
  isPro,
  freeClonesRemaining,
  onOpenProModal,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
        isDark
          ? 'bg-[#07070a]/90 border-white/[0.08] backdrop-blur-md text-white'
          : 'bg-white/95 border-slate-200 backdrop-blur-md text-slate-800 shadow-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/logo.svg"
              alt="WebCloner Logo"
              className="h-9 w-9 object-contain drop-shadow-sm"
            />
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                WebCloner
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded">
                Zippix
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 ml-8 text-sm font-medium">
            <button
              onClick={() => scrollToSection('cloner-section')}
              className={`transition ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('tools-section')}
              className={`transition ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Tools
            </button>
            <button
              onClick={() => scrollToSection('dashboard-section')}
              className={`transition ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollToSection('personas-section')}
              className={`transition ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className={`transition ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
            >
              FAQs
            </button>
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-lg border transition ${
              isDark
                ? 'border-white/10 text-yellow-400 hover:bg-white/5'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Pro Status or Remaining Clones */}
          {isPro ? (
            <div
              onClick={onOpenProModal}
              className="cursor-pointer hidden sm:flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Unlimited Pro</span>
            </div>
          ) : (
            <button
              onClick={onOpenProModal}
              className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                isDark
                  ? 'border-white/10 text-slate-300 hover:bg-white/5'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Free:</span>
              <strong className="text-blue-600 font-bold">{freeClonesRemaining} left</strong>
            </button>
          )}

          {/* Sign Up / Upgrade CTA */}
          <button
            onClick={onOpenProModal}
            className="btn-webcloner rounded-lg px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5"
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>{isPro ? 'Pro Active' : 'Start Free'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border ${
              isDark ? 'border-white/10 text-white' : 'border-slate-200 text-slate-700'
            }`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 py-4 space-y-3 ${
            isDark ? 'bg-[#0c0c14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <button
            onClick={() => scrollToSection('cloner-section')}
            className="block w-full text-left py-2 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('tools-section')}
            className="block w-full text-left py-2 font-medium"
          >
            Tools
          </button>
          <button
            onClick={() => scrollToSection('dashboard-section')}
            className="block w-full text-left py-2 font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => scrollToSection('personas-section')}
            className="block w-full text-left py-2 font-medium"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('faq-section')}
            className="block w-full text-left py-2 font-medium"
          >
            FAQs
          </button>
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex gap-4 text-xs text-slate-500">
            <button onClick={onOpenAbout}>About Us</button>
            <button onClick={onOpenPrivacy}>Privacy Policy</button>
            <button onClick={onOpenContact}>Contact</button>
          </div>
        </div>
      )}
    </header>
  );
};
