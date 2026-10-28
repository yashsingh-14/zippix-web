import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Shield, Sparkles, Layers, Cpu } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Launching Cloud Chromium sandbox...', duration: 2500 },
  { id: 2, label: 'Hydrating React / JavaScript DOM & Network idle...', duration: 4000 },
  { id: 3, label: 'Auto-scrolling page to trigger lazy images & animations...', duration: 4500 },
  { id: 4, label: 'Consolidating CSS & extracting design system tokens...', duration: 3000 },
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
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/[0.1] bg-[#141413]/90 p-6 shadow-2xl backdrop-blur-xl space-y-5">
      {/* Top Status */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#faf9f5]">Cloning in Progress</h3>
            <p className="text-xs text-[#a8a29e] truncate max-w-sm">{url}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-semibold text-amber-400">{seconds}s</span>
          <p className="text-[10px] text-[#78716c]">Cloud Execution</p>
        </div>
      </div>

      {/* Stepper list */}
      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-xl p-2.5 transition duration-200 ${
                isActive
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                  : isDone
                  ? 'bg-white/[0.02] text-[#faf9f5]'
                  : 'opacity-40 text-[#78716c]'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 animate-spin text-amber-400 shrink-0" />
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
