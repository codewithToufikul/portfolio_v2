import React, { useState } from 'react';
import { Layers, Server, Database, Smartphone, Wrench, CheckCircle2 } from 'lucide-react';

export function TechRegistry({ skillsMatrix, t }) {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Services', icon: Layers },
    { id: 'frontend', label: 'Frontend', icon: Layers },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'tools', label: 'Tools & Cloud', icon: Wrench },
  ];

  const getSkillsToDisplay = () => {
    if (activeTab === 'all') {
      return [
        ...skillsMatrix.frontend.map((s) => ({ ...s, group: 'Frontend' })),
        ...skillsMatrix.backend.map((s) => ({ ...s, group: 'Backend' })),
        ...skillsMatrix.databases.map((s) => ({ ...s, group: 'Databases' })),
        ...skillsMatrix.mobile.map((s) => ({ ...s, group: 'Mobile' })),
        ...skillsMatrix.tools.map((s) => ({ ...s, group: 'Tools' })),
      ];
    }
    return (skillsMatrix[activeTab] || []).map((s) => ({
      ...s,
      group: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
    }));
  };

  const skills = getSkillsToDisplay();

  return (
    <section id="skills" className="py-8 border-b border-line">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-wider">
            {t('techStack.tag')}
          </div>
          <h2 className="font-display font-bold text-2xl text-fg">
            {t('techStack.title')}
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1 font-mono text-xs bg-surface border border-line p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent text-bg font-semibold'
                    : 'text-muted hover:text-fg hover:bg-surface-2'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Service/Tech Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 font-mono text-xs">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="p-3 bg-surface border border-line hover:border-accent group transition-all flex flex-col justify-between space-y-2 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] text-muted mb-1">
                <span className="uppercase">{skill.group}</span>
                <span className="text-accent">{skill.tag}</span>
              </div>
              <div className="font-semibold text-fg text-sm group-hover:text-accent transition-colors truncate">
                {skill.name}
              </div>
            </div>

            {/* Proficiency Bar */}
            <div className="w-full bg-surface-2 h-1 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-300 group-hover:bg-ok"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills & Languages Strip */}
      <div className="mt-4 pt-4 border-t border-line grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-3 bg-surface border border-line flex flex-wrap items-center gap-2">
          <span className="text-muted text-[11px] uppercase mr-2">Core Soft Skills:</span>
          {skillsMatrix.softSkills.map((soft, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-surface-2 border border-line text-fg text-[11px]"
            >
              {soft}
            </span>
          ))}
        </div>

        <div className="p-3 bg-surface border border-line flex flex-wrap items-center gap-2">
          <span className="text-muted text-[11px] uppercase mr-2">Languages:</span>
          {skillsMatrix.languages.map((l, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-surface-2 border border-line text-fg text-[11px]"
            >
              {l.name} <span className="text-muted">({l.proficiency})</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
