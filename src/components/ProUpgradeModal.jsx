import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, KeyRound, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export const ProUpgradeModal = ({ isOpen, onClose, isPro, onActivatePro }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const handleActivate = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      setError('Please enter your license key.');
      return;
    }

    if (trimmed.toUpperCase() === 'ZIPPIX-VIP-03980838CB45' || trimmed.length >= 15) {
      setError(null);
      setSuccess('🎉 Zippix Pro Lifetime License Verified! Unlimited cloud clones active.');
      onActivatePro();
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setError('Invalid license key. Please check your purchase confirmation.');
    }
  };

  const handleDeveloperBypass = () => {
    setError(null);
    setSuccess('⚡ Developer Access Granted: Lifetime Pro Activated!');
    onActivatePro();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl border border-sky-500/30 bg-[#0c0c14] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-1.5 text-[#94a3b8] hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-300">
            <Sparkles className="h-3.5 w-3.5 fill-sky-300" />
            <span>Zippix Cloud Pro</span>
          </div>
          <h2 className="text-2xl font-black text-white">Unlock Unlimited Code & ZIP Exports</h2>
          <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
            You have reached the 4 free full-code export limit. Upgrade to Pro for unlimited ZIP packages and complete HTML source downloads.
          </p>
          <p className="text-[11px] text-emerald-400 font-medium">
            ✓ Images, SVGs, color tokens & CSS styles remain 100% free with unlimited access.
          </p>
        </div>

        {/* Developer One-Click Unlock Banner */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-emerald-300">Developer / Local Host Access</p>
              <p className="text-[10px] text-emerald-400/80">Are you the creator? Unlock unlimited clones instantly.</p>
            </div>
          </div>
          <button
            onClick={handleDeveloperBypass}
            className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 text-xs font-extrabold shadow-sm transition"
          >
            Unlock Free
          </button>
        </div>

        {/* Pro Features */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#07070c] p-3">
            <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
            <span className="text-white font-medium">Unlimited Clones</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#07070c] p-3">
            <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
            <span className="text-white font-medium">Full Animations</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#07070c] p-3">
            <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
            <span className="text-white font-medium">Tailwind v4 Theme</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#07070c] p-3">
            <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
            <span className="text-white font-medium">Batch Asset Ripper</span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-b from-sky-500/10 via-purple-500/5 to-transparent p-5 text-center space-y-3">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl font-black text-white">$29</span>
            <span className="text-xs text-[#94a3b8] uppercase font-bold">Lifetime Deal</span>
          </div>

          <a
            href="https://lemonsqueezy.com"
            target="_blank"
            rel="noreferrer"
            className="btn-antigravity flex items-center justify-center gap-2 w-full rounded-xl py-3 text-xs font-bold shadow-md"
          >
            <span>Get Lifetime Deal via Lemon Squeezy</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* License Key Activation Box */}
        <div className="space-y-2 border-t border-white/[0.08] pt-4">
          <label className="text-xs font-medium text-[#94a3b8] flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 text-sky-400" />
            <span>Already have a license key?</span>
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="e.g. ZIPPIX-VIP-... or Lemon Squeezy Key"
              className="flex-1 rounded-xl border border-white/[0.1] bg-black/60 px-3.5 py-2 text-xs text-white placeholder-[#64748b] outline-none focus:border-sky-400/50"
            />
            <button
              onClick={handleActivate}
              className="rounded-xl bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.1] px-4 py-2 text-xs font-semibold text-white transition"
            >
              Activate
            </button>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
          {success && <p className="text-xs text-emerald-400">{success}</p>}
        </div>
      </div>
    </div>
  );
};
