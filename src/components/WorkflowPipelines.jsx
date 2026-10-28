import React from 'react';
import {
  Code2,
  RefreshCw,
  Palette,
  Archive,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

const PIPELINES = [
  {
    title: 'Legacy Site Modernization',
    category: 'Architecture Migration',
    icon: RefreshCw,
    description:
      'Reconstruct outdated WordPress, Webflow, or PHP sites directly into pristine HTML5 and Tailwind CSS v4 in seconds. Cut days of manual frontend rebuilding.',
    points: ['Auto-generates clean semantic HTML5', 'Extracts production Tailwind variables', 'Runs standalone without legacy CMS baggage'],
    badge: '10x Faster Rebuilds',
  },
  {
    title: 'Design System Token Ingestion',
    category: 'Design Systems',
    icon: Palette,
    description:
      'Instantly extract color palettes, typography hierarchies, letter spacings, and border radiuses from reference websites straight into your team’s Figma or CSS tokens.',
    points: ['Machine-readable tokens.json output', 'Computes real typography scales', 'Direct CSS variables ready for import'],
    badge: 'Zero Manual Extraction',
  },
  {
    title: 'Client Pre-Migration Archival',
    category: 'Disaster Recovery',
    icon: Archive,
    description:
      'Agencies and studios use Zippix to generate immutable, self-contained offline backups of client websites before executing high-risk domain or CMS migrations.',
    points: ['100% offline runnable ZIP bundle', 'Zero broken CDN or external links', 'Permanent historical snapshot archive'],
    badge: 'Zero Data Loss',
  },
  {
    title: 'Interactive Animation Dissection',
    category: 'Frontend Engineering',
    icon: Sparkles,
    description:
      'Reverse-engineer complex scroll reveals, IntersectionObserver triggers, and keyframe animations from award-winning websites with pure GPU 60 FPS accuracy.',
    points: ['Captures keyframe reveal states', 'Extracts crisp vector SVG paths', 'Eliminates laggy scroll interceptors'],
    badge: '60 FPS Fidelity',
  },
];

export const WorkflowPipelines = () => {
  return (
    <section id="workflow-pipelines" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Layers className="h-3.5 w-3.5 text-blue-400" />
          <span>Real-World Engineering Pipelines</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Built for <span className="text-gradient-electric">Modern Engineering Workflows</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Whether you are modernizing legacy web architecture, ripping design tokens, or preparing client backups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {PIPELINES.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full font-bold">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{p.title}</h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed font-normal">{p.description}</p>

                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  {p.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
