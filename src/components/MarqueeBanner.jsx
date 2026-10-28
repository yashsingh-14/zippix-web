import React from 'react';
import {
  Code,
  Globe2,
  FileCode,
  Image,
  FolderArchive,
  Database,
  Film,
  Layers,
  Sparkles,
} from 'lucide-react';

const FORMAT_ITEMS = [
  { name: 'HTML / CSS / JS Engine', icon: Code, color: 'text-blue-400' },
  { name: 'Next.js & React Hydration', icon: Globe2, color: 'text-sky-300' },
  { name: 'Tailwind CSS v4 Tokens', icon: Layers, color: 'text-indigo-400' },
  { name: 'High-Res Asset Inlining', icon: Image, color: 'text-teal-400' },
  { name: 'Offline ZIP Package', icon: FolderArchive, color: 'text-blue-300' },
  { name: 'Interactive Motion Capture', icon: Sparkles, color: 'text-cyan-300' },
  { name: 'DOM Tree Architecture', icon: FileCode, color: 'text-sky-400' },
];

export const MarqueeBanner = () => {
  return (
    <div className="py-6 overflow-hidden border-y border-white/[0.06] bg-[#020408]/60 backdrop-blur-md">
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Subtle Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#020408] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#020408] to-transparent" />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-12">
          {[...FORMAT_ITEMS, ...FORMAT_ITEMS, ...FORMAT_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 shrink-0 opacity-80 hover:opacity-100 transition duration-300"
              >
                <div className="p-2 rounded-xl border border-white/10 bg-[#070d1e]/80 shadow-sm shadow-blue-500/10">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
