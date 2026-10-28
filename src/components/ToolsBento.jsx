import React from 'react';
import { RefreshCw, Cloud, BarChart3, Bot, Image, Film, FileCode2, Palette, ArrowRight } from 'lucide-react';

export const ToolsBento = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <section id="tools-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Powerful Tools for Website Migration & Backup
        </h2>
        <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Everything you need to capture, migrate, back up, and develop with authorized website content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Website Migration (8 cols) */}
        <div
          className={`md:col-span-8 rounded-2xl border p-7 sm:p-8 flex flex-col md:flex-row gap-6 items-center transition hover:shadow-lg ${
            isDark
              ? 'bg-[#0e0e18] border-white/10 hover:border-blue-500/30'
              : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
          }`}
        >
          <div className="flex-1 space-y-3 text-left">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <RefreshCw className="h-5 w-5" />
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Website Migration
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Capture the structure and accessible assets of a website you own or are authorized to migrate, then use
              the exported files as part of your migration workflow.
            </p>
          </div>

          <div
            className={`w-full md:w-1/2 rounded-xl p-4 font-mono text-xs overflow-hidden border ${
              isDark ? 'bg-[#08080f] border-white/10 text-sky-400' : 'bg-slate-900 border-slate-800 text-sky-300'
            }`}
          >
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800 mb-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] text-slate-500">export-manifest.json</span>
            </div>
            <pre className="text-[11px] leading-relaxed overflow-x-auto text-slate-300">
              <code>{`{
  "project": "migration-v2",
  "html": "index.html",
  "tailwind": "theme.css",
  "status": "ready_for_import"
}`}</code>
            </pre>
          </div>
        </div>

        {/* Card 2: Website Backup (4 cols) */}
        <div
          className={`md:col-span-4 rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition hover:shadow-lg text-left ${
            isDark
              ? 'bg-[#0e0e18] border-white/10 hover:border-blue-500/30'
              : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
          }`}
        >
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Cloud className="h-5 w-5" />
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Website Backup
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Create downloadable archives of websites you own or manage so you can preserve a recoverable copy of your
              work.
            </p>
          </div>

          <div
            className={`mt-6 rounded-lg p-2.5 text-xs font-medium flex items-center justify-between border ${
              isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <span>full-archive.zip</span>
            <span className="text-blue-600 font-bold">100% Offline</span>
          </div>
        </div>

        {/* Card 3: Design Analysis (4 cols) */}
        <div
          className={`md:col-span-4 rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition hover:shadow-lg text-left ${
            isDark
              ? 'bg-[#0e0e18] border-white/10 hover:border-blue-500/30'
              : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
          }`}
        >
          <div className="space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Design Analysis
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Analyze authorized website structures, design tokens, color palettes, and typography for testing.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Token Extraction</span>
              <span className="text-blue-600 font-bold">98% Complete</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[98%]" />
            </div>
          </div>
        </div>

        {/* Card 4: AI Development Workflows (8 cols) */}
        <div
          className={`md:col-span-8 rounded-2xl border p-7 sm:p-8 flex flex-col md:flex-row gap-6 items-center transition hover:shadow-lg ${
            isDark
              ? 'bg-[#0e0e18] border-white/10 hover:border-blue-500/30'
              : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
          }`}
        >
          <div className="w-full md:w-1/3 grid grid-cols-2 gap-2.5">
            <div
              className={`aspect-square rounded-xl flex flex-col items-center justify-center border text-xs font-semibold ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Image className="h-6 w-6 text-blue-500 mb-1" />
              <span>Images</span>
            </div>
            <div
              className={`aspect-square rounded-xl flex flex-col items-center justify-center border text-xs font-semibold ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Film className="h-6 w-6 text-indigo-500 mb-1" />
              <span>Media</span>
            </div>
            <div
              className={`aspect-square rounded-xl flex flex-col items-center justify-center border text-xs font-semibold ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <FileCode2 className="h-6 w-6 text-violet-500 mb-1" />
              <span>React</span>
            </div>
            <div
              className={`aspect-square rounded-xl flex flex-col items-center justify-center border text-xs font-semibold ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Palette className="h-6 w-6 text-sky-500 mb-1" />
              <span>Tailwind</span>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-left">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Development Workflows
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Work with authorized copies of websites in local development environments. Feed clean extracted HTML and
              tokens directly into Cursor, Claude, or ChatGPT to generate new components effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
