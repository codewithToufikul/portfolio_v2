import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Smartphone, Layers, CheckCircle2 } from 'lucide-react';

export function CaseStudyDrawer({ project, onClose, t }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex justify-end bg-bg/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface border-l border-line h-full overflow-y-auto p-6 text-fg font-mono shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-line pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] px-2 py-0.5 border border-line bg-surface-2 text-accent font-semibold uppercase">
                  {project.category}
                </span>
                <span className="text-[11px] text-ok flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-ok pulse-dot" />
                  {project.status}
                </span>
              </div>
              <h2 id="case-study-title" className="font-display font-bold text-2xl text-fg">
                {project.name}
              </h2>
              <p className="text-muted text-xs mt-1">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Case Study"
              className="p-1 border border-line hover:border-accent text-muted hover:text-fg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Problem */}
          <div className="space-y-1.5 text-xs">
            <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold">
              Problem Statement
            </span>
            <div className="p-3 bg-surface-2 border-l-2 border-warn text-fg leading-relaxed">
              {project.problem}
            </div>
          </div>

          {/* Approach */}
          <div className="space-y-1.5 text-xs">
            <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold">
              Architectural Approach
            </span>
            <div className="p-3 bg-surface-2 border-l-2 border-accent text-fg leading-relaxed">
              {project.approach}
            </div>
          </div>

          {/* Stack Chips */}
          <div className="space-y-2 text-xs">
            <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold">
              Technologies & Infrastructure
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-surface-2 border border-line text-[11px] text-fg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Features / Capabilities */}
          {project.features && (
            <div className="space-y-2 text-xs">
              <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold">
                Core Shipped Capabilities
              </span>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-ok flex-none mt-0.5" />
                    <span className="text-fg">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Result */}
          <div className="space-y-1.5 text-xs">
            <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold">
              Verified Result / Impact
            </span>
            <div className="p-3 bg-surface-2 border-l-2 border-ok text-fg leading-relaxed">
              {project.result}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-line mt-6 flex flex-wrap gap-2 text-xs">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] px-3 py-2 bg-accent text-bg font-semibold flex items-center justify-center gap-1.5 hover:brightness-110 text-center"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] px-3 py-2 border border-line bg-surface hover:border-accent flex items-center justify-center gap-1.5 text-fg text-center"
            >
              <Github className="w-3.5 h-3.5 text-accent" />
              <span>Source Code</span>
            </a>
          )}

          {project.playStoreUrl && (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 border border-line bg-surface hover:border-ok flex items-center justify-center gap-1 text-fg"
            >
              <Smartphone className="w-3.5 h-3.5 text-ok" />
              <span>Play Store</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
