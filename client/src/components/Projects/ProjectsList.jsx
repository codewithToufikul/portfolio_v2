import React, { useState } from 'react';
import { ExternalLink, Github, ChevronRight, Layers, Smartphone, Globe, Plus, Minus } from 'lucide-react';
import { CaseStudyDrawer } from './CaseStudyDrawer';

export function ProjectsList({ projects = [], t }) {
  const [filter, setFilter] = useState('All');
  const [activeDrawerProject, setActiveDrawerProject] = useState(null);
  const [expandedId, setExpandedId] = useState(projects[0]?.id || null);

  const categories = ['All', 'Full Stack', 'Mobile', 'Web'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    return p.category.toLowerCase() === filter.toLowerCase();
  });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="deployments" className="py-8 border-b border-line">
      {/* Header and Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-wider">
            {t('deployments.tag')}
          </div>
          <h2 className="font-display font-bold text-2xl text-fg">
            {t('deployments.title')}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 font-mono text-xs bg-surface border border-line p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 transition-colors ${
                filter === cat
                  ? 'bg-accent text-bg font-semibold'
                  : 'text-muted hover:text-fg hover:bg-surface-2'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion / Card Deployments List matching status.html */}
      <div className="border border-line bg-surface divide-y divide-line">
        {filteredProjects.map((p) => {
          const isExpanded = expandedId === p.id;

          return (
            <div key={p.id} className="transition-colors">
              {/* Header Row */}
              <div
                onClick={() => toggleExpand(p.id)}
                className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-surface-2/60 select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-display font-bold text-lg sm:text-xl text-fg group-hover:text-accent truncate">
                    {p.name}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 border border-line bg-surface-2 text-accent uppercase flex-none">
                    {p.category}
                  </span>
                  <span className="font-mono text-[11px] text-ok hidden sm:inline flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ok pulse-dot" />
                    {p.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-muted ml-auto">
                  <span className="hidden md:inline truncate max-w-xs text-right">
                    {p.subtitle}
                  </span>
                  <span className="p-1 border border-line text-accent">
                    {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>

              {/* Collapsible Detail Panel */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-1 border-t border-dashed border-line bg-surface-2/30 space-y-4 font-mono text-xs animate-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Problem & Approach */}
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold mb-1">
                          Problem
                        </span>
                        <p className="text-fg leading-relaxed bg-surface p-2.5 border border-line">
                          {p.problem}
                        </p>
                      </div>

                      <div>
                        <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold mb-1">
                          Approach
                        </span>
                        <p className="text-fg leading-relaxed bg-surface p-2.5 border border-line">
                          {p.approach}
                        </p>
                      </div>

                      {/* Stack Chips */}
                      <div>
                        <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold mb-1.5">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.stack.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-surface border border-line text-[11px] text-fg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions & Case Study Trigger */}
                    <div className="md:col-span-4 flex flex-col justify-between bg-surface border border-line p-3.5 space-y-3">
                      <div>
                        <span className="text-muted uppercase text-[11px] tracking-wider block font-semibold mb-2">
                          Deployment Links
                        </span>
                        <div className="space-y-1.5">
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 border border-line bg-surface-2 hover:border-accent text-fg hover:text-accent transition-colors"
                            >
                              <span>Launch Deployment</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {p.githubUrl && (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 border border-line bg-surface-2 hover:border-accent text-fg hover:text-accent transition-colors"
                            >
                              <span>Inspect Source</span>
                              <Github className="w-3.5 h-3.5 text-accent" />
                            </a>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveDrawerProject(p)}
                        className="w-full py-2 bg-accent text-bg font-bold text-center hover:brightness-110 flex items-center justify-center gap-1.5"
                      >
                        <span>Deep Case Study</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Case Study Slide-over Drawer */}
      <CaseStudyDrawer
        project={activeDrawerProject}
        onClose={() => setActiveDrawerProject(null)}
        t={t}
      />
    </section>
  );
}
