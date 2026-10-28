import React from 'react';
import { Code2, Users, Palette, Sparkles, Check } from 'lucide-react';

const PERSONAS = [
  {
    title: 'Frontend Developers',
    icon: Code2,
    badge: 'Code Architecture',
    description:
      'Deconstruct complex React, Next.js, and static websites into pristine HTML, Tailwind design tokens, and clean asset structures.',
    points: [
      'Extract production Tailwind CSS variables',
      'Study real-world animations & responsive layouts',
      'Zero-config local development setups',
    ],
  },
  {
    title: 'Agencies & Studios',
    icon: Users,
    badge: 'Fast Delivery',
    description:
      'Migrate client web properties, archive legacy deployments, and deliver editable prototypes in minutes rather than days.',
    points: [
      'Automated client platform migrations',
      'Standalone 100% offline client archives',
      'Guaranteed asset & typography preservation',
    ],
  },
  {
    title: 'Designers & Prototypers',
    icon: Palette,
    badge: 'Design Systems',
    description:
      'Capture color palettes, typography scales, spacing tokens, and component hierarchies for immediate Figma or code prototyping.',
    points: [
      'Tailwind v4 config generated on the fly',
      'Direct SVG vector & image extraction',
      'Pixel-perfect multi-device preview',
    ],
  },
  {
    title: 'Innovators & Founders',
    icon: Sparkles,
    badge: 'Rapid Prototyping',
    description:
      'Turn design inspiration into live editable code. Benchmark competitor layouts and build modern web applications faster.',
    points: [
      'Dissect cutting-edge web experiences',
      'Self-contained deployable ZIP packages',
      'Seamless deployment to Vercel, Netlify, or Cloudflare',
    ],
  },
];

export const PersonasSection = () => {
  return (
    <section id="personas-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Users className="h-3.5 w-3.5 text-blue-400" />
          <span>Tailored Workflows</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Built for <span className="font-serif-italic text-ankit-gradient">Visionary Creators</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Whether you are modernizing a legacy web experience, archiving vital assets, or learning from production
          codebases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="glass-card glass-card-hover rounded-2xl p-7 sm:p-8 text-left relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>

                  <ul className="space-y-2 pt-2 text-xs">
                    {p.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <Check className="h-4 w-4 text-blue-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
