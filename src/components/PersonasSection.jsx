import React from 'react';
import { Code2, Users, Rss, Lightbulb, Check } from 'lucide-react';

const PERSONAS = [
  {
    title: 'Developers',
    icon: Code2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-t-blue-500',
    description:
      'Work with authorized website copies to study frontend code, create local development environments, and inspect modern frameworks.',
    points: [
      'Works with React, Next.js, Vue & Angular',
      'Authorized development environments',
      'Inspect production animations & keyframes',
    ],
  },
  {
    title: 'Agencies & Freelancers',
    icon: Users,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-t-emerald-500',
    description:
      'Back up authorized client sites, migrate platforms seamlessly, and deliver clean, editable codebases on tight deadlines.',
    points: [
      'Faster client website migrations',
      'Editable standalone code exports',
      'Streamlined zero-hassle backup pipeline',
    ],
  },
  {
    title: 'Bloggers & Content Creators',
    icon: Rss,
    color: 'text-violet-600',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-t-violet-500',
    description:
      'Export authorized website content as standard archives and migrate your layouts between hosting providers in minutes.',
    points: [
      'WordPress & static export support',
      'Full media & asset preservation',
      'Zero technical knowledge required',
    ],
  },
  {
    title: 'Educators & Students',
    icon: Lightbulb,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-t-amber-500',
    description:
      'Capture authorized websites for educational analysis, inspect modern CSS layouts, and dissect complex responsive patterns.',
    points: [
      'Analyze real-world production architectures',
      'Learn modern Tailwind & CSS variables',
      'Ideal for teaching and research workshops',
    ],
  },
];

export const PersonasSection = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <section id="personas-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Built for <span className="text-webcloner-gradient">Everyone</span> Who Works with Websites
        </h2>
        <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Whether you're migrating a client site, creating an archival backup, or prototyping, WebCloner fits
          seamlessly into authorized workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className={`rounded-2xl border border-t-4 ${p.borderColor} p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-left ${
                isDark ? 'bg-[#0e0e18] border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-xl ${p.bgColor} ${p.color} flex items-center justify-center shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {p.description}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs">
                    {p.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Check className={`h-4 w-4 ${p.color} shrink-0`} />
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
