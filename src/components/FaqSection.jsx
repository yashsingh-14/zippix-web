import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'How does Zippix reconstruct complete websites?',
    a: 'Zippix launches a high-performance cloud Chromium runtime that executes client-side JavaScript, mounts React/Next.js hydration layers, triggers scrolling reveal animations, and converts external CSS assets into unified standalone source code with zero broken links.',
  },
  {
    q: 'Does Zippix capture animations and scroll effects smoothly?',
    a: 'Yes. Unlike naive HTML downloaders, Zippix simulates natural scroll interactions to trigger IntersectionObservers and keyframe reveals, then preserves them with GPU-accelerated CSS and native smooth scrolling without mouse-wheel stuttering.',
  },
  {
    q: 'What is included in the exported standalone ZIP package?',
    a: 'You receive index.html (with preserved inline SVG assets and component styling), theme.css (Tailwind v4 tokens ready for production), tailwind.config.js (Tailwind v3 compatible theme), variables.css (CSS custom properties), tokens.json (machine-readable tokens), and an assets/ directory.',
  },
  {
    q: 'Can I import the generated code into Next.js or Vite?',
    a: 'Absolutely. The output is clean, standard HTML5 with modern Tailwind CSS tokens. You can immediately copy JSX structures or drop the assets into any Next.js, Vite, Astro, or React codebase.',
  },
  {
    q: 'Is Zippix compliant with authorized usage guidelines?',
    a: 'Yes. Zippix is built for developers, agencies, and businesses migrating their own properties, backing up authorized client sites, or conducting frontend research. You are responsible for ensuring that you have proper authorization for any target URL processed.',
  },
  {
    q: 'Does Zippix bypass authentication, login walls, or paywalls?',
    a: 'No. Zippix only reconstructs publicly accessible web pages. It does not bypass paywalls, private authentication portals, CAPTCHAs, or restricted administrative sessions.',
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
          <span>Knowledge Base</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Frequently <span className="font-serif-italic text-ankit-gradient">Asked Questions</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-normal">
          Clear answers about Zippix cloud architecture, extraction depths, and export formats.
        </p>
      </div>

      <div className="space-y-3 text-left">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-xl transition-all overflow-hidden border border-white/10"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white transition hover:text-blue-300"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t border-white/[0.06] pt-4 text-slate-400">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
