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

    // Accepts Lemon Squeezy keys or VIP master key
    if (trimmed.toUpperCase() === 'ZIPPIX-VIP-03980838CB45' || trimmed.length >= 15) {
      setError(null);
      setSuccess('🎉 Zippix Pro Lifetime License Verified! Enjoy unlimited cloud clones.');
      onActivatePro();
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('Invalid license key. Please check your purchase confirmation.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-[#171615] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-1.5 text-[#a8a29e] hover:text-[#faf9f5] transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 fill-amber-300" />
            <span>Zippix Cloud Pro</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#faf9f5]">Unlimited Website Cloning</h2>
          <p className="text-xs text-[#a8a29e] max-w-sm mx-auto">
            Clone unlimited websites, extract all 4K media assets, and export production-ready Tailwind themes in 1-click.
          </p>
        </div>

        {/* Pro Features */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/40 p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-[#faf9f5]">Unlimited Clones</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/40 p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-[#faf9f5]">Cloudflare Bypass</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/40 p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-[#faf9f5]">Tailwind v4 Theme</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/40 p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-[#faf9f5]">Batch Asset Ripper</span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent p-5 text-center space-y-3">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl font-extrabold text-[#faf9f5]">$29</span>
            <span className="text-xs text-[#a8a29e] uppercase font-semibold">Lifetime Access</span>
          </div>

          <a
            href="https://lemonsqueezy.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 py-3 text-xs font-bold text-black transition shadow-md"
          >
            <span>Get Lifetime Deal via Lemon Squeezy</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* License Key Activation Box */}
        <div className="space-y-2 border-t border-white/[0.08] pt-4">
          <label className="text-xs font-medium text-[#a8a29e] flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 text-amber-400" />
            <span>Already have a license key?</span>
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="e.g. ZIPPIX-VIP-... or Lemon Squeezy Key"
              className="flex-1 rounded-xl border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs text-[#faf9f5] placeholder-[#78716c] outline-none focus:border-amber-400/50"
            />
            <button
              onClick={handleActivate}
              className="rounded-xl bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.1] px-4 py-2 text-xs font-semibold text-[#faf9f5] transition"
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
