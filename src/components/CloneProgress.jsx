import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Shield, Sparkles, Layers, Cpu } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Launching Cloud Chromium sandbox & viewport...', duration: 2500 },
  { id: 2, label: 'Hydrating React / Next.js DOM & resolving Lenis scroll...', duration: 3500 },
  { id: 3, label: 'Deep section-by-section auto-scroll & triggering reveals...', duration: 4000 },
  { id: 4, label: 'Unblocking clip-paths & capturing sparkling animations...', duration: 3000 },
  { id: 5, label: 'Generating standalone HTML & production ZIP package...', duration: 2000 },
];

export const CloneProgress = ({ url }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeoutId;
    if (currentStep < STEPS.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);
    }
    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl border border-sky-500/25 bg-[#0c0c14]/90 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-5">
      {/* Top Status */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-600/20 border border-sky-500/30 text-sky-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Cloning Webpage</span>
              <span className="rounded bg-sky-500/10 text-sky-400 px-1.5 py-0.5 text-[10px] font-mono border border-sky-500/20">
                v2.0 Cloner
              </span>
            </h3>
            <p className="text-xs text-[#94a3b8] truncate max-w-sm font-mono mt-0.5">{url}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-bold text-sky-400">{seconds}s</span>
          <p className="text-[10px] text-[#64748b]">Real-Time Execution</p>
        </div>
      </div>

      {/* Stepper list */}
      <div className="space-y-2.5">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-xl p-3 transition duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-transparent border border-sky-500/35 text-sky-200'
                  : isDone
                  ? 'bg-white/[0.02] text-white border border-white/[0.04]'
                  : 'opacity-35 text-[#64748b]'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 animate-spin text-sky-400 shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-white/20 shrink-0" />
              )}
              <span className="text-xs font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
