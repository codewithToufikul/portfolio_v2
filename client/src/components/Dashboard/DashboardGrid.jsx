import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Eye, EyeOff, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { ResponseChart } from './ResponseChart';
import { RequestLog } from './RequestLog';
import { ServiceList } from './ServiceList';
import { SystemGauges } from './SystemGauges';
import { ServiceMap } from './ServiceMap';

const STORAGE_KEY = 'toufikul_dashboard_layout_v2';

const DEFAULT_PANELS = [
  { id: 'chart', title: 'Response time, p95', tag: 'simulated / last 60s', colSpan: 'lg:col-span-8', visible: true },
  { id: 'request-log', title: 'Request log', tag: 'simulated stream', colSpan: 'lg:col-span-4', visible: true },
  { id: 'services', title: 'Services', tag: 'core stack', colSpan: 'lg:col-span-5', visible: true },
  { id: 'gauges', title: 'System gauges & Uptime', tag: 'simulated / 90 days', colSpan: 'lg:col-span-7', visible: true },
  { id: 'service-map', title: 'Service Map & Architecture', tag: 'topology', colSpan: 'lg:col-span-12', visible: true },
];

export function DashboardGrid({
  chartData = [],
  requestLogs = [],
  services = [],
  t,
}) {
  const [panels, setPanels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {}
    return DEFAULT_PANELS;
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(panels));
    } catch (e) {}
  }, [panels]);

  const movePanel = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= panels.length) return;
    const updated = [...panels];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setPanels(updated);
  };

  const toggleVisibility = (id) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
  };

  const resetLayout = () => {
    setPanels(DEFAULT_PANELS);
  };

  const renderPanelContent = (id) => {
    switch (id) {
      case 'chart':
        return (
          <div className="p-3">
            <ResponseChart data={chartData} />
          </div>
        );
      case 'request-log':
        return <RequestLog logs={requestLogs} />;
      case 'services':
        return <ServiceList services={services} />;
      case 'gauges':
        return (
          <div className="p-4">
            <SystemGauges />
          </div>
        );
      case 'service-map':
        return (
          <div className="p-3">
            <ServiceMap />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="dashboard" className="py-8 border-b border-line">
      {/* Header with customize layout button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-wider">
            {t('dashboard.subtitle')}
          </div>
          <h2 className="font-display font-bold text-2xl text-fg">
            {t('dashboard.title')}
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line bg-surface hover:border-accent text-muted hover:text-fg transition-colors"
            title="Reorder and customize dashboard panels"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
            <span>{isConfigOpen ? 'Close Customizer' : t('dashboard.customizeLayout')}</span>
          </button>

          {isConfigOpen && (
            <button
              onClick={resetLayout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line bg-surface hover:border-warn text-muted hover:text-warn transition-colors"
              title="Reset to default dashboard layout"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('dashboard.resetLayout')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Reorder / Visibility drawer if opened */}
      {isConfigOpen && (
        <div className="mb-6 p-4 bg-surface border border-accent shadow-hud font-mono text-xs space-y-3">
          <div className="text-muted text-[11px] uppercase tracking-wider">
            Dashboard Panel Manager (Keyboard Accessible Reordering)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {panels.map((p, idx) => (
              <div
                key={p.id}
                className="p-2 border border-line bg-surface-2 flex items-center justify-between gap-2"
              >
                <span className="truncate font-medium">{p.title}</span>
                <div className="flex items-center gap-1 flex-none">
                  <button
                    onClick={() => movePanel(idx, -1)}
                    disabled={idx === 0}
                    aria-label={`Move ${p.title} up`}
                    className="p-1 border border-line disabled:opacity-30 hover:border-accent text-fg"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => movePanel(idx, 1)}
                    disabled={idx === panels.length - 1}
                    aria-label={`Move ${p.title} down`}
                    className="p-1 border border-line disabled:opacity-30 hover:border-accent text-fg"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggleVisibility(p.id)}
                    aria-label={`Toggle visibility of ${p.title}`}
                    className="p-1 border border-line hover:border-accent text-accent"
                  >
                    {p.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-muted" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {panels
          .filter((p) => p.visible)
          .map((p) => (
            <div
              key={p.id}
              className={`bg-surface border border-line flex flex-col min-w-0 ${p.colSpan}`}
            >
              {/* Panel Header matching status.html */}
              <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-line bg-surface select-none">
                <h3 className="m-0 font-mono text-xs font-semibold tracking-wider uppercase text-muted truncate">
                  {p.title}
                </h3>
                <span className="font-mono text-[11px] text-muted flex-none">
                  {p.tag}
                </span>
              </header>

              {/* Panel Body */}
              <div className="flex-1 bg-surface min-w-0">
                {renderPanelContent(p.id)}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
