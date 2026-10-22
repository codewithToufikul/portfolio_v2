import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export function BootScreen({ onComplete }) {
  const [logs, setLogs] = useState([
    'INITIALIZING SYSTEM SUBSYSTEMS...',
  ]);
  const [progress, setProgress] = useState(20);
  const [isSkipped, setIsSkipped] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Check if user prefers reduced motion or already booted in this session
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadyBooted = false;
    try {
      alreadyBooted = sessionStorage.getItem('toufikul_booted') === 'true';
    } catch (e) {}

    if (prefersReducedMotion || alreadyBooted) {
      if (onComplete) onComplete();
      return;
    }

    const steps = [
      { msg: 'MOUNTING V8 RUNTIME & REACT 18 FIBER...', pct: 45, delay: 180 },
      { msg: 'ESTABLISHING TELEMETRY LINK TO DHAKA NODE (23.8103° N, 90.4125° E)...', pct: 70, delay: 420 },
      { msg: 'SERVICES VERIFIED: REACT, NODE, EXPRESS, MONGODB [HEALTHY]', pct: 90, delay: 680 },
      { msg: 'OPERATOR PROFILE TOUFIKUL ISLAM: ALL SYSTEMS OPERATIONAL.', pct: 100, delay: 920 },
    ];

    const timers = steps.map((step) =>
      setTimeout(() => {
        setLogs((prev) => [...prev, step.msg]);
        setProgress(step.pct);
      }, step.delay)
    );

    const finishTimer = setTimeout(() => {
      try {
        sessionStorage.setItem('toufikul_booted', 'true');
      } catch (e) {}
      if (onComplete) onComplete();
    }, 1150);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        try {
          sessionStorage.setItem('toufikul_booted', 'true');
        } catch (err) {}
        setIsSkipped(true);
        if (onComplete) onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Run once on mount!

  const handleSkip = () => {
    try {
      sessionStorage.setItem('toufikul_booted', 'true');
    } catch (e) {}
    setIsSkipped(true);
    if (onComplete) onComplete();
  };

  if (isSkipped) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Boot Sequence"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-bg p-6 text-fg font-mono select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2 text-xs text-accent">
          <Terminal className="w-4 h-4" />
          <span>BIOS_POST_INITIALIZER // TOUFIKUL.DEV</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-xs px-2.5 py-1 border border-line bg-surface hover:border-accent text-muted hover:text-fg transition-colors cursor-pointer"
        >
          SKIP BOOT [ESC]
        </button>
      </div>

      {/* Boot Console Output */}
      <div className="my-auto max-w-2xl mx-auto w-full space-y-2 text-xs md:text-sm">
        <div className="p-4 bg-surface border border-line shadow-hud relative overflow-hidden">
          <div className="text-muted mb-2 text-[11px] uppercase tracking-wider">
            Kernel Boot Log / Telemetry Daemon v2.0
          </div>
          <div className="space-y-1.5 min-h-[140px]">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-ok">›</span>
                <span className={index === logs.length - 1 ? 'text-accent font-medium' : 'text-fg'}>
                  {log}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-3 border-t border-line">
            <div className="flex justify-between text-[11px] text-muted mb-1">
              <span>INITIALIZATION PROGRESS</span>
              <span className="text-accent">{progress}%</span>
            </div>
            <div className="w-full bg-surface-2 h-1.5 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-muted border-t border-line pt-3">
        <span>SECURITY: ENCRYPTED // REGION: ASIA-DHAKA</span>
        <span>PRESS [ESC] TO BYPASS BOOT STREAM</span>
      </div>
    </div>
  );
}
