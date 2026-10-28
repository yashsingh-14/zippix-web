import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const TermsModal = ({ isOpen, onClose }) => {
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
            <FileText className="h-3.5 w-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h2 className="text-2xl font-black text-white">Terms of Service</h2>
          <p className="text-xs text-[#94a3b8]">Effective Date: October 2026</p>
        </div>

        <div className="space-y-4 border-t border-white/[0.08] pt-4">
          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white">1. Permitted Use & Purpose</h3>
            <p>
              Zippix Web is designed for developers, UI/UX engineers, and researchers to archive publicly accessible websites, extract design tokens, and analyze frontend layouts for educational and prototyping purposes.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>2. Intellectual Property & Copyright</span>
            </h3>
            <p>
              Users agree not to use Zippix to infringe upon the intellectual property, copyrighted imagery, or trademarks of target website owners. You are solely responsible for ensuring you have lawful authorization to inspect and extract public resources.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white">3. Prohibited Activities</h3>
            <p>
              You may not use Zippix Web to scrape websites behind paywalls, password-protected portals, or bypass explicit CAPTCHA verifications. Denial of Service (DoS) attacks or automated high-frequency abuse against external servers is strictly barred.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-bold text-white">4. Disclaimer of Warranties</h3>
            <p>
              The service is provided "as is" and "as available". Zippix Technologies makes no guarantees regarding 100% clone accuracy across proprietary, DRM-protected, or closed-source web architectures.
            </p>
          </section>
        </div>

        <div className="border-t border-white/[0.08] pt-4 flex justify-end">
          <button onClick={onClose} className="rounded-xl btn-antigravity px-5 py-2 font-bold text-white">
            Agree & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
