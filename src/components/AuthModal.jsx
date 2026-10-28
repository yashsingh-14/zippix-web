import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Rocket,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: mode === 'signup' ? name.trim() : email.split('@')[0],
        email: email.trim(),
        role: 'Pro Developer',
        isLoggedIn: true,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      };

      localStorage.setItem('zippix_user', JSON.stringify(user));
      if (onAuthSuccess) onAuthSuccess(user);
      onClose();
    }, 600);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: provider === 'Google' ? 'Google Developer' : 'GitHub Engineer',
        email: `dev@${provider.toLowerCase()}.com`,
        role: 'Pro Developer',
        isLoggedIn: true,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${provider}`,
      };

      localStorage.setItem('zippix_user', JSON.stringify(user));
      if (onAuthSuccess) onAuthSuccess(user);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md apple-glass-modal rounded-3xl p-6 sm:p-8 text-left shadow-2xl border border-white/15 overflow-hidden">
        {/* Top Glow Ray */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Branding & Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              Zippix Cloud Auth
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Developer Account'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {mode === 'signin'
              ? 'Sign in to access unlimited cloud extractions, saved design tokens, and offline ZIP packages.'
              : 'Join engineers and studios reconstructing live web experiences into clean production code.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'signin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'signup'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Social Authentication */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleSocialAuth('Google')}
            className="btn-zippix-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:border-white/25"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth('GitHub')}
            className="btn-zippix-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:border-white/25"
          >
            <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-white/[0.08]" />
          <span className="absolute bg-[#080e1c] px-3 text-[10px] uppercase font-mono text-slate-500">
            Or continue with email
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">Full Name</label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl apple-glass-input">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-400">Work Email</label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl apple-glass-input">
              <Mail className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-medium text-slate-400">Password</label>
              {mode === 'signin' && (
                <button
                  type="button"
                  className="text-[10px] text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl apple-glass-input">
              <Lock className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-zippix-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-2 shadow-lg disabled:opacity-50"
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>
              {isLoading
                ? 'Authenticating...'
                : mode === 'signin'
                ? 'Sign In to Zippix'
                : 'Create Account & Continue'}
            </span>
          </button>
        </form>

        {/* Security Reassurance */}
        <div className="mt-5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
          <span>256-Bit Encrypted Cloud Session</span>
        </div>
      </div>
    </div>
  );
};
