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
} from 'lucide-react';

const FORMAT_ITEMS = [
  { name: 'HTML / CSS / JS', icon: Code, color: 'text-amber-500' },
  { name: 'WordPress', icon: Globe2, color: 'text-blue-500' },
  { name: 'Blogger', icon: FileCode, color: 'text-orange-500' },
  { name: 'Images & Assets', icon: Image, color: 'text-emerald-500' },
  { name: 'ZIP Export', icon: FolderArchive, color: 'text-indigo-500' },
  { name: 'Databases', icon: Database, color: 'text-cyan-500' },
  { name: 'Video & Media', icon: Film, color: 'text-red-500' },
  { name: 'Tailwind CSS v4', icon: Layers, color: 'text-sky-500' },
];

export const MarqueeBanner = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`py-6 overflow-hidden border-y transition-colors duration-200 ${
        isDark ? 'bg-[#0a0a14] border-white/[0.06]' : 'bg-slate-100/70 border-slate-200/80'
      }`}
    >
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r ${
            isDark ? 'from-[#0a0a14] to-transparent' : 'from-slate-100/70 to-transparent'
          }`}
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l ${
            isDark ? 'from-[#0a0a14] to-transparent' : 'from-slate-100/70 to-transparent'
          }`}
        />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-12">
          {[...FORMAT_ITEMS, ...FORMAT_ITEMS, ...FORMAT_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 shrink-0 opacity-80 hover:opacity-100 transition duration-300"
              >
                <div
                  className={`p-2 rounded-lg border ${
                    isDark ? 'bg-[#151522] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <span
                  className={`text-sm font-semibold tracking-wide ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
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
