import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rahul M.',
    role: 'Senior Frontend Architect',
    initials: 'RM',
    quote:
      'Zippix deconstructed a massive React site in 10 seconds. The extracted Tailwind v4 theme and offline asset packaging saved our agency at least 3 days of manual rebuilding.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Lead UI/UX Engineer',
    initials: 'SK',
    quote:
      'Unlike old scrapers that choke on CSS keyframes and Lenis smooth scrolls, Zippix captured every reveal animation smoothly without stuttering or breaking layout flow.',
    stars: 5,
  },
  {
    name: 'James T.',
    role: 'Product Director',
    initials: 'JT',
    quote:
      'The design token ripper alone is worth gold. Being able to extract live website palettes and font hierarchies directly into Tailwind config is pure magic.',
    stars: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Industry Validation</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Loved by <span className="font-serif-italic text-ankit-gradient">Engineers & Creators</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Real feedback from engineers using Zippix to analyze, migrate, and reconstruct web architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-1 pt-6 border-t border-white/10 mt-6">
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
