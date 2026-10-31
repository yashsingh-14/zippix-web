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
  Crown,
  ArrowLeft,
  Check,
  AlertCircle,
  KeyRound,
} from 'lucide-react';

/**
 * Checks if a given user credential qualifies for System Admin / Founder privileges.
 * Matches: 'yash', 'admin', 'yashsingh-14', 'yashsingh14@gmail.com', etc.
 */
export function checkIsAdmin(email = '', username = '', name = '') {
  const e = (email || '').toLowerCase().trim();
  const u = (username || '').toLowerCase().trim();
  const n = (name || '').toLowerCase().trim();
  return (
    e === 'yashsingh14@gmail.com' ||
    u === 'yashsingh-14' ||
    e.includes('yash') ||
    e.includes('admin') ||
    u.includes('yash') ||
    u.includes('admin') ||
    n.includes('yash') ||
    n.includes('admin')
  );
}

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  // Mode: 'signin' | 'signup' | 'forgot' | 'google-chooser' | 'github-oauth'
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Custom social input states
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGithubUser, setCustomGithubUser] = useState('');

  if (!isOpen) return null;

  // Password strength calculation for sign up
  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const passwordStrength = calculateStrength(password);

  const handleCompleteLogin = (userData) => {
    const isAdmin = checkIsAdmin(userData.email, userData.username, userData.name);

    const user = {
      ...userData,
      isAdmin,
      role: isAdmin ? 'Founder & System Admin' : userData.role || 'Pro Developer',
      plan: isAdmin ? 'Lifetime Unlimited Admin VIP' : 'Pro Developer',
      avatar:
        userData.avatar ||
        (isAdmin
          ? 'https://github.com/yashsingh-14.png'
          : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.email || 'user')}`),
      isLoggedIn: true,
      loginTimestamp: new Date().toISOString(),
    };

    localStorage.setItem('zippix_user', JSON.stringify(user));
    if (isAdmin) {
      localStorage.setItem('zippix_web_is_pro', 'true');
    }

    if (onAuthSuccess) onAuthSuccess(user);

    setSuccessMsg(
      isAdmin
        ? '👑 Welcome Yash Singh! Admin VIP Unlimited Access Granted.'
        : `Welcome back, ${user.name}!`
    );

    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setSuccessMsg('');
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMsg(`Password reset instructions have been sent to ${email.trim()}.`);
      }, 600);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isAdmin = checkIsAdmin(email, '', name);
      handleCompleteLogin({
        name: mode === 'signup' ? name.trim() : (isAdmin ? 'Yash Singh' : email.split('@')[0]),
        email: email.trim(),
        username: email.split('@')[0],
      });
    }, 550);
  };

  // Quick autofill helper for Yash Singh / Admin
  const handleAutofillAdmin = () => {
    setEmail('yashsingh14@gmail.com');
    setPassword('admin_unlimited_pass');
    setName('Yash Singh');
    setError('');
  };

  // Google OAuth flow simulation
  const handleSelectGoogleAccount = (type, customEmailVal) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === 'admin') {
        handleCompleteLogin({
          name: 'Yash Singh',
          email: 'yashsingh14@gmail.com',
          username: 'yashsingh-14',
          avatar: 'https://github.com/yashsingh-14.png',
        });
      } else {
        const mail = customEmailVal || 'developer@gmail.com';
        handleCompleteLogin({
          name: mail.split('@')[0],
          email: mail,
          username: mail.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(mail)}`,
        });
      }
    }, 500);
  };

  // GitHub OAuth flow simulation
  const handleSelectGithubAccount = (type, customUserVal) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === 'admin') {
        handleCompleteLogin({
          name: 'Yash Singh',
          email: 'yashsingh14@gmail.com',
          username: 'yashsingh-14',
          avatar: 'https://github.com/yashsingh-14.png',
        });
      } else {
        const ghUser = customUserVal || 'github-engineer';
        handleCompleteLogin({
          name: ghUser,
          email: `${ghUser}@users.noreply.github.com`,
          username: ghUser,
          avatar: `https://github.com/${ghUser}.png`,
        });
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md apple-glass-modal rounded-3xl p-6 sm:p-8 text-left shadow-2xl border border-white/15 overflow-hidden">
        {/* Top Radial Glow Bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ======================================================== */}
        {/* VIEW 1: GOOGLE ACCOUNT CHOOSER                           */}
        {/* ======================================================== */}
        {mode === 'google-chooser' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('signin')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </button>

            <div className="flex items-center gap-2.5">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
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
              <div>
                <h3 className="text-lg font-bold text-white">Sign in with Google</h3>
                <p className="text-xs text-slate-400">Choose an account to continue to Zippix</p>
              </div>
            </div>

            {/* Quick Admin Option (Yash Singh) */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleSelectGoogleAccount('admin')}
                disabled={isLoading}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-400/60 transition flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://github.com/yashsingh-14.png"
                    alt="Yash Singh"
                    className="h-10 w-10 rounded-full border-2 border-amber-400/50 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=yash';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        Yash Singh
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-0.5">
                        <Crown className="h-3 w-3" />
                        Admin
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">yashsingh14@gmail.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-amber-300 group-hover:underline">
                    Unlimited Access →
                  </span>
                </div>
              </button>

              {/* Or enter another Google email */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-[11px] text-slate-400 block font-medium">
                  Use another Google account:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="your-name@gmail.com"
                    className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleSelectGoogleAccount('custom', customGoogleEmail)}
                    disabled={isLoading || !customGoogleEmail.trim()}
                    className="btn-zippix-primary px-3.5 py-2 rounded-xl text-xs font-semibold disabled:opacity-40"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: GITHUB OAUTH CHOOSER                             */}
        {/* ======================================================== */}
        {mode === 'github-oauth' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('signin')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </button>

            <div className="flex items-center gap-2.5">
              <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-white">Authorize with GitHub</h3>
                <p className="text-xs text-slate-400">OAuth instant developer authorization</p>
              </div>
            </div>

            {/* Quick Founder / Admin Option (yashsingh-14) */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleSelectGithubAccount('admin')}
                disabled={isLoading}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-400/60 transition flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://github.com/yashsingh-14.png"
                    alt="yashsingh-14"
                    className="h-10 w-10 rounded-full border-2 border-amber-400/50 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://api.dicebear.com/7.x/bottts/svg?seed=yash';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        yashsingh-14
                      </p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-0.5">
                        <Crown className="h-3 w-3" />
                        Founder
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Yash Singh (System Admin)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-amber-300 group-hover:underline">
                    Superuser Login →
                  </span>
                </div>
              </button>

              {/* Or enter another GitHub username */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-[11px] text-slate-400 block font-medium">
                  Authorize another GitHub username:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customGithubUser}
                    onChange={(e) => setCustomGithubUser(e.target.value)}
                    placeholder="github-username"
                    className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleSelectGithubAccount('custom', customGithubUser)}
                    disabled={isLoading || !customGithubUser.trim()}
                    className="btn-zippix-primary px-3.5 py-2 rounded-xl text-xs font-semibold disabled:opacity-40"
                  >
                    Authorize
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: FORGOT PASSWORD                                  */}
        {/* ======================================================== */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setMode('signin');
                setError('');
                setSuccessMsg('');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </button>

            <div className="space-y-1">
              <div className="h-9 w-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
                <KeyRound className="h-4 w-4" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Reset Password</h3>
              <p className="text-xs text-slate-400">
                Enter your work or developer email and we'll send a secure password reset link.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {!successMsg && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Your Email Address</label>
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-zippix-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <Rocket className="h-3.5 w-3.5" />
                  <span>{isLoading ? 'Sending Reset Instructions...' : 'Send Password Reset Link'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: MAIN SIGN IN & SIGN UP FORM                      */}
        {/* ======================================================== */}
        {(mode === 'signin' || mode === 'signup') && (
          <>
            {/* Modal Branding & Header */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-[11px] text-sky-400 font-bold uppercase tracking-wider">
                    Zippix Cloud Auth
                  </span>
                </div>

                {/* 1-Click Admin Quickfill Pill */}
                <button
                  type="button"
                  onClick={handleAutofillAdmin}
                  title="Autofill Yash Singh Admin Credentials"
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition flex items-center gap-1 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                >
                  <Crown className="h-3 w-3 text-amber-400" />
                  <span>Autofill Admin</span>
                </button>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {mode === 'signin' ? 'Welcome Back' : 'Create Developer Account'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {mode === 'signin'
                  ? 'Sign in to access unlimited cloud webpage extractions and clean code export.'
                  : 'Join engineers and studios reconstructing live web experiences into clean production code.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                  setSuccessMsg('');
                }}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'signin'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
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
                  setSuccessMsg('');
                }}
                className={`flex-1 py-2 rounded-lg transition ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Success Notification */}
            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setMode('google-chooser')}
                className="btn-zippix-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:border-white/30"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                onClick={() => setMode('github-oauth')}
                className="btn-zippix-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:border-white/30"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3.5">
              <div className="w-full border-t border-white/[0.08]" />
              <span className="absolute bg-[#030712] px-3 text-[10px] uppercase font-mono text-slate-500">
                Or continue with email
              </span>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Full Name</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl apple-glass-input">
                    <User className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Yash Singh"
                      className="w-full bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-medium text-slate-400">Work / Personal Email</label>
                  {checkIsAdmin(email) && (
                    <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1 animate-pulse">
                      <Crown className="h-3 w-3" />
                      Admin Email Detected
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl apple-glass-input">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com or yashsingh14@gmail.com"
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
                      onClick={() => {
                        setMode('forgot');
                        setError('');
                      }}
                      className="text-[10px] text-sky-400 hover:text-sky-300 transition"
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

                {/* Password Strength Meter on Sign Up */}
                {mode === 'signup' && password && (
                  <div className="pt-1.5 space-y-1">
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength >= step
                              ? step <= 1
                                ? 'bg-red-400'
                                : step <= 2
                                ? 'bg-amber-400'
                                : step <= 3
                                ? 'bg-sky-400'
                                : 'bg-emerald-400'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 text-right">
                      {passwordStrength <= 1
                        ? 'Weak password'
                        : passwordStrength <= 2
                        ? 'Moderate'
                        : passwordStrength <= 3
                        ? 'Strong'
                        : 'Very secure!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Remember Me & Terms Checks */}
              {mode === 'signin' ? (
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/20 bg-white/5 text-sky-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[11px]">Remember this device</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Cloud Sync Active</span>
                </div>
              ) : (
                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="rounded border-white/20 bg-white/5 text-sky-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[11px]">
                      I agree to the Terms of Service & Privacy Policy
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
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
          </>
        )}

        {/* Security Reassurance Footer */}
        <div className="mt-5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
          <span>256-Bit Encrypted Cloud Session • Yash Singh Certified Engine</span>
        </div>
      </div>
    </div>
  );
};
