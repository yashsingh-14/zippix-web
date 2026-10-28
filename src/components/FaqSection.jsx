import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Is website cloning legal?',
    a: 'Yes, when used for legitimate purposes such as backing up websites you own, migrating authorized client platforms, educational code analysis, or archiving publicly accessible resources. You must always ensure you have the appropriate rights or permissions before reproducing copyrighted assets.',
  },
  {
    q: 'Can I clone any public website?',
    a: 'WebCloner processes publicly accessible web pages and assets through a headless Chromium engine. However, you are solely responsible for ensuring your use complies with applicable intellectual property laws, terms of service, and third-party rights.',
  },
  {
    q: 'Who is responsible for the content I process with WebCloner?',
    a: 'You are. WebCloner is a software utility tool for developers, agencies, and website owners. As with any web archiver, scraper, or backup tool, the user is responsible for ensuring lawful use and authorized data handling.',
  },
  {
    q: 'Does WebCloner bypass login pages, paywalls, or access controls?',
    a: 'No. WebCloner strictly processes publicly accessible frontend content. It does not bypass authentication, paywalls, CAPTCHAs, or restricted administrative portals.',
  },
  {
    q: 'Can agencies use WebCloner for client websites?',
    a: 'Absolutely. WebCloner is widely used by agencies and freelancers to create offline snapshot backups of client sites before redesigns, platform migrations, or hosting transfers.',
  },
  {
    q: 'What does WebCloner export in the ZIP package?',
    a: 'You receive a complete standalone package: index.html with preserved inline styles and scroll animations, theme.css (Tailwind v4 tokens), tailwind.config.js (Tailwind v3 configuration), variables.css (CSS custom properties), tokens.json (machine-readable design tokens), and an assets/ folder containing extracted SVG icons and images.',
  },
];

export const FaqSection = ({ theme = 'light' }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const isDark = theme === 'dark';

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Everything you need to know about WebCloner, legal compliance, and export formats.
        </p>
      </div>

      <div className="space-y-3 text-left">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all overflow-hidden ${
                isDark
                  ? 'bg-[#0e0e18] border-white/10'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base transition"
              >
                <span className={isDark ? 'text-white' : 'text-slate-900'}>{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  className={`px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                    isDark
                      ? 'border-white/5 text-slate-400'
                      : 'border-slate-100 text-slate-600'
                  }`}
                >
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
