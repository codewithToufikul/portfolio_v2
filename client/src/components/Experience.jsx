import React, { useState } from 'react';
import { Award, GraduationCap, Briefcase, Plus, Minus, ExternalLink } from 'lucide-react';

export function Experience({ experience = [], education = [], achievements = [], certifications = [], t }) {
  const [expandedIds, setExpandedIds] = useState({
    seeking: true,
    nexatech: true,
  });

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="py-8 border-b border-line">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-wider">
            {t('experience.tag')}
          </div>
          <h2 className="font-display font-bold text-2xl text-fg">
            {t('experience.title')}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Work Experience (Incident Timeline) */}
        <div className="lg:col-span-7 bg-surface border border-line">
          <header className="flex items-center justify-between px-4 py-3 border-b border-line">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              <span>Production Experience & Roles</span>
            </span>
            <span className="font-mono text-[11px] text-muted">Chronological audit</span>
          </header>

          <ul className="m-0 p-0 divide-y divide-line font-mono text-xs">
            {experience.map((item) => {
              const isExpanded = !!expandedIds[item.id];

              return (
                <li key={item.id} className="p-4 sm:p-5 hover:bg-surface-2/40 transition-colors">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="cursor-pointer select-none"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider border ${
                            item.severity === 'live'
                              ? 'text-warn border-warn bg-warn/10'
                              : 'text-ok border-ok bg-ok/10'
                          }`}
                        >
                          {item.status}
                        </span>
                        <time className="text-muted text-[11px]">{item.period}</time>
                      </div>

                      <span className="text-muted text-[11px] flex items-center gap-1">
                        <span>{item.type}</span>
                        <span className="text-accent ml-1">
                          {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </span>
                    </div>

                    <div className="text-base font-bold text-fg">
                      {item.role} <span className="text-accent font-normal">• {item.company}</span>
                    </div>

                    <p className="text-muted text-xs mt-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Expandable Bullet Points */}
                  {isExpanded && item.details && (
                    <div className="mt-3 pt-3 border-t border-dashed border-line space-y-1.5 animate-in slide-in-from-top-1">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-fg leading-relaxed">
                          <span className="text-accent flex-none">›</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Education, Awards & Certifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Education */}
          <div className="bg-surface border border-line">
            <header className="px-4 py-3 border-b border-line flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span>{t('experience.educationTitle')}</span>
              </span>
              <span className="font-mono text-[11px] text-muted">2023 - 2026</span>
            </header>

            <div className="p-4 space-y-2 font-mono text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1.5">
                  <div className="font-bold text-fg text-sm">{edu.degree}</div>
                  <div className="text-accent text-xs">{edu.institution}</div>
                  <div className="text-muted text-[11px]">{edu.location}</div>
                  <ul className="pt-2 space-y-1 border-t border-dashed border-line text-muted">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-ok">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Hackathons */}
          <div className="bg-surface border border-line">
            <header className="px-4 py-3 border-b border-line flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>{t('experience.achievementsTitle')}</span>
              </span>
            </header>

            <div className="p-4 space-y-3 font-mono text-xs">
              {achievements.map((ach, idx) => (
                <div key={idx} className="space-y-1 pb-2.5 border-b border-dashed border-line last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-fg">{ach.title}</span>
                    <span className="text-[11px] text-accent px-1.5 border border-line">{ach.year}</span>
                  </div>
                  <div className="text-muted text-[11px]">{ach.organization}</div>
                  {ach.subtitle && <div className="text-muted text-[11px] italic">{ach.subtitle}</div>}
                  <p className="text-fg text-xs pt-1">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
