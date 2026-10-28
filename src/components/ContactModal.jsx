import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl border border-sky-500/30 bg-[#0c0c14] p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-1.5 text-[#94a3b8] hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-300">
            <Mail className="h-3.5 w-3.5" />
            <span>Developer Support</span>
          </div>
          <h2 className="text-2xl font-black text-white">Contact & Feedback</h2>
          <p className="text-xs text-[#94a3b8]">Have a feature request, bug report, or enterprise licensing inquiry?</p>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
            <p className="text-xs text-[#94a3b8]">Our engineering team will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#cbd5e1]">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full rounded-xl border border-white/[0.1] bg-black/50 px-4 py-2.5 text-xs text-white placeholder-[#64748b] outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#cbd5e1]">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what website you want to clone or how we can improve Zippix..."
                className="w-full rounded-xl border border-white/[0.1] bg-black/50 px-4 py-2.5 text-xs text-white placeholder-[#64748b] outline-none focus:border-sky-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-antigravity w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-lg"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
