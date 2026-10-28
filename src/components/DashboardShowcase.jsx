import React from 'react';
import { Download, Rocket, BarChart2, Activity, CheckCircle, Sparkles } from 'lucide-react';

export const DashboardShowcase = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <section id="dashboard-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Your Dashboard, Built for Speed
        </h2>
        <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Everything you need to manage authorized website captures, inspect design tokens, and export clean code — all
          in one place.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Floating Badge 1 (Top Left) */}
        <div className="hidden lg:block absolute -left-20 top-12 z-20 float-badge" style={{ animationDelay: '0s' }}>
          <div
            className={`rounded-xl border p-3 shadow-lg flex items-center gap-3 backdrop-blur-md ${
              isDark ? 'bg-[#0e0e18]/90 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <Download className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold">Export Options</p>
              <p className="text-[11px] text-slate-400">ZIP, HTML, & Tailwind</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 2 (Top Right) */}
        <div className="hidden lg:block absolute -right-16 top-16 z-20 float-badge" style={{ animationDelay: '0.8s' }}>
          <div
            className={`rounded-xl border p-3 shadow-lg flex items-center gap-3 backdrop-blur-md ${
              isDark ? 'bg-[#0e0e18]/90 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center shrink-0">
              <Rocket className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold">Clone Form</p>
              <p className="text-[11px] text-slate-400">Paste URL, pick depth, start</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 3 (Bottom Left) */}
        <div className="hidden lg:block absolute -left-12 bottom-16 z-20 float-badge" style={{ animationDelay: '1.6s' }}>
          <div
            className={`rounded-xl border p-3 shadow-lg flex items-center gap-3 backdrop-blur-md ${
              isDark ? 'bg-[#0e0e18]/90 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <BarChart2 className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold">Token Ripper</p>
              <p className="text-[11px] text-slate-400">Colors, fonts, & styles</p>
            </div>
          </div>
        </div>

        {/* Floating Badge 4 (Bottom Right) */}
        <div className="hidden lg:block absolute -right-20 bottom-12 z-20 float-badge" style={{ animationDelay: '2.4s' }}>
          <div
            className={`rounded-xl border p-3 shadow-lg flex items-center gap-3 backdrop-blur-md ${
              isDark ? 'bg-[#0e0e18]/90 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Activity className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold">Live Progress</p>
              <p className="text-[11px] text-slate-400">Real-time clone tracking</p>
            </div>
          </div>
        </div>

        {/* Dashboard Frame Window */}
        <div
          className={`rounded-2xl border shadow-2xl overflow-hidden transition ${
            isDark ? 'bg-[#0e0e18] border-white/10' : 'bg-white border-slate-200 shadow-blue-500/10'
          }`}
        >
          {/* Window Chrome Header */}
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${
              isDark ? 'bg-[#080811] border-white/10' : 'bg-slate-100/80 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <span className="text-xs font-mono text-slate-400 font-medium">zippix-web-dashboard</span>
            <div className="w-12" />
          </div>

          {/* Inner Mock Dashboard Content */}
          <div className="p-6 sm:p-8 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Active Workspace</span>
                <h3 className={`text-xl font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  callofjesus.in — Full Page Replica
                </h3>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Clone Ready
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className="text-[11px] text-slate-400 uppercase font-mono">HTML Document</p>
                <p className={`text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>1.07 MB</p>
              </div>
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className="text-[11px] text-slate-400 uppercase font-mono">Design Tokens</p>
                <p className="text-base font-bold text-blue-600 mt-1">20 Palettes</p>
              </div>
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className="text-[11px] text-slate-400 uppercase font-mono">Animations</p>
                <p className="text-base font-bold text-emerald-600 mt-1">Preserved</p>
              </div>
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className="text-[11px] text-slate-400 uppercase font-mono">Export Format</p>
                <p className="text-base font-bold text-purple-600 mt-1">Standalone ZIP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
