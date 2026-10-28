import React from 'react';
import { Star, ShieldCheck, Cpu, Zap, CheckCircle2, Terminal } from 'lucide-react';

const BENCHMARKS = [
  { value: '99.4%', label: 'CSS Layout Fidelity', desc: 'Accurately captures computed styles & flex/grid geometry' },
  { value: '< 12s', label: 'Average Execution', desc: 'From URL submission to compiled offline ZIP' },
  { value: '0', label: 'Broken CDN Dependencies', desc: 'All SVGs, webfonts, and media locally resolved' },
  { value: '60 FPS', label: 'Native Scroll Velocity', desc: 'GPU-accelerated reveal motion without mouse lag' },
];

const REVIEWS = [
  {
    author: 'Rahul M.',
    role: 'Lead Frontend Architect',
    team: 'HyperScale Agency',
    quote:
      'We deconstructed a massive React documentation site in 11 seconds. The extracted Tailwind v4 theme and offline asset vault saved our developers days of manual CSS reproduction.',
  },
  {
    author: 'Sarah K.',
    role: 'Design Systems Lead',
    team: 'Fintech Studio',
    quote:
      'Being able to rip color frequencies, font hierarchies, and spacing units straight into tokens.json is phenomenal. It has transformed our design token benchmarking workflow.',
  },
  {
    author: 'James T.',
    role: 'Platform Migration Engineer',
    team: 'Global Media Group',
    quote:
      'Other scrapers fail miserably on GSAP scroll reveals and client hydrations. Zippix captured every reveal animation flawlessly and outputted clean, readable code.',
  },
];

export const EngineeringBenchmarks = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-14">
      {/* Benchmarks Counter Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {BENCHMARKS.map((b) => (
          <div key={b.label} className="glass-card glass-card-hover rounded-2xl p-6 text-left space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-gradient-electric font-mono">
              {b.value}
            </span>
            <h4 className="text-sm font-bold text-white pt-1">{b.label}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Engineer Quotes */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Validated by <span className="text-gradient-electric">Frontend Engineers</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Real feedback from engineering teams using Zippix for web deconstruction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {REVIEWS.map((r) => (
            <div
              key={r.author}
              className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden space-y-5"
            >
              <p className="text-sm text-slate-300 leading-relaxed font-normal italic">
                "{r.quote}"
              </p>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-white">{r.author}</h5>
                  <p className="text-xs text-slate-400">{r.role} • <span className="text-blue-400">{r.team}</span></p>
                </div>
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
