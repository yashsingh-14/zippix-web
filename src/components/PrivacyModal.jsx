import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

export const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-500/30 bg-[#0c0c14] p-6 sm:p-8 shadow-2xl space-y-6 text-[#cbd5e1] text-xs sm:text-sm leading-relaxed">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-1.5 text-[#94a3b8] hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Privacy & Data Protection</span>
          </div>
          <h2 className="text-2xl font-black text-white">Privacy Policy</h2>
          <p className="text-xs text-[#94a3b8]">Last Updated: October 2026 • Compliant with GDPR, CCPA & Google AdSense</p>
        </div>

        <div className="space-y-4 border-t border-white/[0.08] pt-4">
          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <EyeOff className="h-4 w-4 text-sky-400" />
              <span>1. Information We Do Not Collect</span>
            </h3>
            <p>
              Zippix Web operates on a strict zero-knowledge architecture. We do <strong>not</strong> collect personal browsing histories, passwords, private credentials, or cookies from target websites submitted for cloning.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Server className="h-4 w-4 text-purple-400" />
              <span>2. URL Processing & Ephemeral Cloud Cache</span>
            </h3>
            <p>
              When you submit a publicly accessible URL for cloning, our headless Chromium cluster opens the URL ephemerally in a temporary sandbox container. Generated ZIP packages and preview files are stored temporarily in memory and automatically permanently pruned within 2 hours.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>3. Google AdSense & Third-Party Cookies</span>
            </h3>
            <p>
              We may partner with third-party advertising networks like Google AdSense to serve non-intrusive developer advertisements. Google AdSense uses cookies (such as the DoubleClick cookie) to serve relevant ads based on prior visits. Users may opt out of personalized advertising by visiting Google's Ads Settings.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white">4. User Rights & Contact</h3>
            <p>
              Under the GDPR and CCPA, you have the right to request deletion of any temporary diagnostic logs. To exercise your rights, please reach out to our privacy officer at <strong>privacy@zippix.dev</strong>.
            </p>
          </section>
        </div>

        <div className="border-t border-white/[0.08] pt-4 flex justify-end">
          <button onClick={onClose} className="rounded-xl btn-antigravity px-5 py-2 font-bold text-white">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
