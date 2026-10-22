import React from 'react';
import { X, RotateCcw, Palette, Type, LayoutGrid, Zap, Sun, Moon } from 'lucide-react';

export function ThemeSettings({
  isOpen,
  onClose,
  themes,
  themeId,
  selectTheme,
  accentColor,
  setAccentColor,
  fontMode,
  setFontMode,
  density,
  setDensity,
  animationIntensity,
  setAnimationIntensity,
  resetTheme,
}) {
  if (!isOpen) return null;

  const currentTheme = themes.find((t) => t.id === themeId) || themes[0];

  const customAccentPresets = [
    '#5cc8e6', // Cyan Ops
    '#00ff66', // Matrix
    '#ffb000', // Amber
    '#c084fc', // Neon Violet
    '#f42a41', // Red
    '#5fd38d', // Emerald
    '#38bdf8', // Sky
    '#f97316', // Orange
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-settings-title"
      className="fixed inset-0 z-50 flex justify-end bg-bg/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface border-l border-line h-full overflow-y-auto p-6 text-fg font-mono shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent" />
              <h2 id="theme-settings-title" className="text-sm font-semibold uppercase tracking-wider">
                Theme Control Center
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close theme settings"
              className="p-1 border border-line hover:border-accent text-muted hover:text-fg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Presets */}
          <div className="space-y-2">
            <div className="text-[11px] text-muted uppercase tracking-wider font-semibold">
              Select Palette
            </div>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => {
                const isActive = themeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectTheme(t.id)}
                    className={`p-2.5 border text-left text-xs transition-all flex flex-col justify-between ${
                      isActive
                        ? 'border-accent bg-surface-2 text-accent font-bold shadow-sm'
                        : 'border-line bg-surface hover:border-accent text-fg'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span>{t.name}</span>
                      <span
                        className="w-3 h-3 rounded-full border border-line"
                        style={{ backgroundColor: t.previewColor }}
                      />
                    </div>
                    <span className="text-[10px] text-muted truncate">
                      {t.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Accent Picker */}
          <div className="space-y-2 pt-2 border-t border-line">
            <div className="text-[11px] text-muted uppercase tracking-wider font-semibold flex items-center justify-between">
              <span>Accent Override</span>
              {accentColor && (
                <button
                  onClick={() => setAccentColor(null)}
                  className="text-[10px] text-muted hover:text-accent underline"
                >
                  Reset to theme default
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {customAccentPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  aria-label={`Select accent color ${color}`}
                  className="w-6 h-6 rounded-none border border-line transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    outline: accentColor === color ? '2px solid var(--fg)' : 'none',
                  }}
                />
              ))}
              <input
                type="color"
                value={accentColor || currentTheme.colors['--accent']}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-7 h-7 p-0 bg-transparent border border-line cursor-pointer"
                title="Custom hex color picker"
              />
            </div>
          </div>

          {/* Typography Engine */}
          <div className="space-y-2 pt-2 border-t border-line">
            <div className="text-[11px] text-muted uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-accent" />
              <span>Typography Pairing</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: 'grotesk', name: 'Grotesk (Default)' },
                { id: 'mono', name: 'Mono Console' },
                { id: 'retro', name: 'Retro Typewriter' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontMode(f.id)}
                  className={`py-2 px-1 text-center border transition-all text-[11px] ${
                    fontMode === f.id
                      ? 'border-accent bg-surface-2 text-accent font-semibold'
                      : 'border-line bg-surface text-muted hover:text-fg'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spacing Density */}
          <div className="space-y-2 pt-2 border-t border-line">
            <div className="text-[11px] text-muted uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-accent" />
              <span>Display Density</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'comfortable', name: 'Comfortable' },
                { id: 'compact', name: 'Compact (Ops)' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDensity(d.id)}
                  className={`py-2 border text-center transition-all text-xs ${
                    density === d.id
                      ? 'border-accent bg-surface-2 text-accent font-semibold'
                      : 'border-line bg-surface text-muted hover:text-fg'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Animation Intensity */}
          <div className="space-y-2 pt-2 border-t border-line">
            <div className="text-[11px] text-muted uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span>Motion & Scanlines</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: 'full', name: 'Full (4s radar)' },
                { id: 'low', name: 'Low (Subtle)' },
                { id: 'off', name: 'Off (Static)' },
              ].map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAnimationIntensity(a.id)}
                  className={`py-2 text-center border transition-all text-[11px] ${
                    animationIntensity === a.id
                      ? 'border-accent bg-surface-2 text-accent font-semibold'
                      : 'border-line bg-surface text-muted hover:text-fg'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-line mt-6 flex items-center justify-between text-xs">
          <button
            onClick={resetTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-line bg-surface hover:border-warn text-muted hover:text-warn transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-accent text-bg font-semibold hover:brightness-110"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
