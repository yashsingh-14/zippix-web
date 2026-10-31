import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [googleNotice, setGoogleNotice] = useState(false);

  // Initialize Google Identity Services when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
        });
      } catch (err) {
        console.warn('Google Identity initialization notice:', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Real Google Credential Callback from Google's official popup
  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Google authentication failed.');
      }

      // Store verified token & session
      localStorage.setItem('zippix_token', data.token);
      localStorage.setItem('zippix_user', JSON.stringify(data.user));

      if (onAuthSuccess) onAuthSuccess(data.user);

      setSuccessMsg(
        data.user.isAdmin
          ? '👑 Welcome Yash Singh! Admin VIP Unlimited Access Granted.'
          : `Signed in successfully as ${data.user.name}.`
      );

      setTimeout(() => {
        setIsLoading(false);
        onClose();
        setSuccessMsg('');
      }, 700);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Google sign-in failed. Please try again.');
    }
  };

  // Trigger Google Login
  const handleGoogleClick = () => {
    setError('');
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      setGoogleNotice(true);
      return;
    }

    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
      } catch (err) {
        setError('Could not open Google sign in. Please verify your connection or use Email.');
      }
    } else {
      setGoogleNotice(true);
    }
  };

  // Trigger GitHub Login
  const handleGithubClick = () => {
    setError('');
    const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    if (!githubClientId) {
      setError(
        'GitHub OAuth Client ID not configured. Please use Email & Password or set VITE_GITHUB_CLIENT_ID.'
      );
      return;
    }
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/github/callback`);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`;
  };

  // Calculate password strength
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

  // Submit real authentication to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Flow 1: Forgot Password
    if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
        const data = await res.json();
        setSuccessMsg(data.message || 'Password reset link sent to your email.');
      } catch (err) {
        setError(err.message || 'Failed to submit reset request.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const body =
        mode === 'signup'
          ? { name: name.trim(), email: email.trim(), password }
          : { email: email.trim(), password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      // Store real signed token & verified user profile
      localStorage.setItem('zippix_token', data.token);
      localStorage.setItem('zippix_user', JSON.stringify(data.user));

      if (onAuthSuccess) onAuthSuccess(data.user);

      setSuccessMsg(
        data.user.isAdmin
          ? '👑 Welcome Yash Singh! Admin VIP Unlimited Access Granted.'
          : mode === 'signup'
          ? 'Account successfully created!'
          : `Welcome back, ${data.user.name}!`
      );

      setTimeout(() => {
        setIsLoading(false);
        onClose();
        setSuccessMsg('');
      }, 700);
    } catch (err) {
      setError(err.message || 'Failed to connect to authentication server.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md apple-glass-modal rounded-3xl p-6 sm:p-8 text-left shadow-2xl border border-white/15 overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ======================================================== */}
        {/* VIEW: FORGOT PASSWORD                                    */}
        {/* ======================================================== */}
        {mode === 'forgot' ? (
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
                Enter your registered email address and our server will send secure password reset instructions.
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
                      required
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
                  <span>{isLoading ? 'Sending Instructions...' : 'Send Password Reset Link'}</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW: REAL SIGN IN & SIGN UP FORM                        */
          /* ======================================================== */
          <>
            {/* Modal Header */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-[11px] text-sky-400 font-bold uppercase tracking-wider">
                  Zippix Cloud Auth
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {mode === 'signin' ? 'Welcome Back' : 'Create Developer Account'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {mode === 'signin'
                  ? 'Sign in to access your cloud webpage extractions, tokens, and code export.'
                  : 'Join developers and studios reconstructing live web experiences into clean production code.'}
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
                  setGoogleNotice(false);
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
                  setGoogleNotice(false);
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

            {/* Error Notification */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Notice / Config helper */}
            {googleNotice && (
              <div className="mb-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Google Cloud OAuth Setup</span>
                  <button
                    onClick={() => setGoogleNotice(false)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-[11px] text-blue-300/90 leading-relaxed">
                  To enable real 1-click Google Sign-in on Google Cloud / Vercel, set your{' '}
                  <code className="text-white bg-blue-900/60 px-1 py-0.5 rounded font-mono">
                    VITE_GOOGLE_CLIENT_ID
                  </code>{' '}
                  in your project <code className="text-white">.env</code>. You can also sign in or register with Email & Password below!
                </p>
              </div>
            )}

            {/* Official OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={handleGoogleClick}
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
                onClick={handleGithubClick}
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
                      required
                      className="w-full bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-400">Email Address</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl apple-glass-input">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    required
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
                        setSuccessMsg('');
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
                    required
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

                {/* Password Strength Indicator on Sign Up */}
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

              {/* Remember Me / Terms */}
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
                  <span className="text-[11px] text-slate-500">Encrypted JWT Session</span>
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

        {/* Security Reassurance */}
        <div className="mt-5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
          <span>256-Bit Cryptographic Salt • Server-Verified Permissions</span>
        </div>
      </div>
    </div>
  );
};
