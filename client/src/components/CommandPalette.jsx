import React, { useState, useEffect, useRef } from 'react';
import { Search, Hash, Terminal, Sparkles, Sliders, Download, Layers, ArrowRight } from 'lucide-react';

export function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenPhotoStudio,
  onOpenThemeSettings,
  onSelectTheme,
  themes = [],
  projects = [],
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const actions = [
    {
      id: 'sec-top',
      title: 'Jump to Top / Overview',
      category: 'Navigation',
      icon: Hash,
      action: () => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'sec-dashboard',
      title: 'Jump to Dashboard & Telemetry',
      category: 'Navigation',
      icon: Hash,
      action: () => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'sec-deployments',
      title: 'Jump to Deployments (Projects)',
      category: 'Navigation',
      icon: Hash,
      action: () => document.getElementById('deployments')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'sec-experience',
      title: 'Jump to Experience & Education',
      category: 'Navigation',
      icon: Hash,
      action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'sec-skills',
      title: 'Jump to Service Registry (Skills)',
      category: 'Navigation',
      icon: Hash,
      action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'sec-contact',
      title: 'Jump to POST /contact (Hire me)',
      category: 'Navigation',
      icon: Hash,
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      id: 'act-terminal',
      title: 'Open System Terminal (~)',
      category: 'Action',
      icon: Terminal,
      action: () => onOpenTerminal(),
    },
    {
      id: 'act-studio',
      title: 'Open Photo Studio Calibration',
      category: 'Action',
      icon: Sparkles,
      action: () => onOpenPhotoStudio(),
    },
    {
      id: 'act-theme',
      title: 'Open Theme Control Center',
      category: 'Action',
      icon: Sliders,
      action: () => onOpenThemeSettings(),
    },
    {
      id: 'act-resume',
      title: 'Download Resume (PDF)',
      category: 'Action',
      icon: Download,
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Toufikul_Islam_Resume.pdf';
        link.click();
      },
    },
    // Theme options
    ...themes.map((t) => ({
      id: `theme-${t.id}`,
      title: `Switch Theme: ${t.name}`,
      category: 'Themes',
      icon: Sliders,
      action: () => onSelectTheme(t.id),
    })),
    // Project options
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `View Project: ${p.name} (${p.category})`,
      category: 'Projects',
      icon: Layers,
      action: () => document.getElementById('deployments')?.scrollIntoView({ behavior: 'smooth' }),
    })),
  ];

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-bg/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface border border-accent shadow-2xl overflow-hidden text-fg font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line bg-surface-2">
          <Search className="w-4 h-4 text-accent flex-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, section name, or project..."
            className="w-full bg-transparent border-0 outline-none text-fg font-mono text-xs focus:ring-0 placeholder:text-muted"
          />
          <kbd className="px-1.5 py-0.5 bg-surface text-[10px] text-muted border border-line">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto divide-y divide-line/40 terminal-scroll">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted">
              No matching commands or destinations found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-xs transition-colors ${
                    isSelected ? 'bg-accent text-bg font-semibold' : 'text-fg hover:bg-surface-2'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 flex-none ${isSelected ? 'text-bg' : 'text-accent'}`} />
                    <span className="truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-none">
                    <span
                      className={`text-[10px] px-1.5 py-0.2 border ${
                        isSelected
                          ? 'border-bg/50 text-bg'
                          : 'border-line text-muted bg-surface'
                      }`}
                    >
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-surface-2 border-t border-line text-[10px] text-muted flex items-center justify-between">
          <span>Navigate: ↑ / ↓</span>
          <span>Execute: ↵</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
}
