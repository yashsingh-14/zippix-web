import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rahul M.',
    role: 'Freelance Web Developer',
    initials: 'RM',
    color: 'bg-blue-500/10 text-blue-600',
    quote:
      'WebCloner saved me hours on a client migration. I cloned their old static site and had the full clean HTML and assets ready in under 5 minutes.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Frontend Engineer',
    initials: 'SK',
    color: 'bg-emerald-500/10 text-emerald-600',
    quote:
      'Finally a tool that actually handles complex React and Next.js sites. Other scrapers miss half the styles — WebCloner captured everything flawlessly.',
    stars: 5,
  },
  {
    name: 'James T.',
    role: 'Agency Owner',
    initials: 'JT',
    color: 'bg-purple-500/10 text-purple-600',
    quote:
      'We use WebCloner for every client backup before making major changes. It has become a standard, indispensable part of our agency workflow.',
    stars: 5,
  },
];

export const TestimonialsSection = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Trusted by Developers and Agencies Worldwide
        </h2>
        <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Here is what engineers and creators say about exporting clean, standalone web code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition hover:shadow-lg text-left ${
              isDark ? 'bg-[#0e0e18] border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`h-11 w-11 rounded-full ${t.color} flex items-center justify-center font-bold text-sm shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              <p className={`text-sm italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-1 pt-6 border-t border-slate-100 dark:border-white/10 mt-6">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
