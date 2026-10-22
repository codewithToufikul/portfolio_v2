import React from 'react';
import { X, RotateCcw, Sparkles, Sliders, Image, Frame } from 'lucide-react';
import { PhotoPreview } from './PhotoPreview';

const PRESETS = [
  { id: 'original', name: 'Original', color: '#e4eaee' },
  { id: 'cyan-duotone', name: 'Cyan Duotone', color: '#5cc8e6' },
  { id: 'matrix-green', name: 'Matrix Green', color: '#00ff66' },
  { id: 'amber-terminal', name: 'Amber Terminal', color: '#ffb000' },
  { id: 'black-white', name: 'Black & White', color: '#aaaaaa' },
  { id: 'cyberpunk', name: 'Cyberpunk', color: '#c084fc' },
];

const BACKGROUNDS = [
  { id: 'radar', name: 'Radar Sweep' },
  { id: 'grid', name: 'Ops Grid' },
  { id: 'code-rain', name: 'Code Rain' },
  { id: 'circuit', name: 'Circuit Lines' },
  { id: 'gradient-mesh', name: 'Gradient Mesh' },
  { id: 'transparent', name: 'Transparent' },
];

const FRAMES = [
  { id: 'id-card', name: 'ID Card (Sharp)' },
  { id: 'monitor', name: 'Monitor Bezel' },
  { id: 'circle', name: 'Circle' },
  { id: 'hexagon', name: 'Hexagon' },
];

export function PhotoStudioModal({ isOpen, onClose, settings, onChange, onReset }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-studio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-surface border border-line shadow-2xl p-5 md:p-6 text-fg font-mono max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 id="photo-studio-title" className="text-sm font-semibold uppercase tracking-wider">
              Photo Studio / Operator Hologram Calibration
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Photo Studio"
            className="p-1 border border-line hover:border-accent text-muted hover:text-fg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Live Preview */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-surface-2 border border-line">
            <div className="w-full max-w-[240px]">
              <PhotoPreview settings={settings} showBadge={true} />
            </div>
            <div className="mt-3 text-[11px] text-muted text-center">
              Target: <span className="text-accent font-semibold">client/public/toufikul-cutout.png</span>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="md:col-span-7 space-y-5 text-xs">
            {/* Filter Presets */}
            <div>
              <div className="flex items-center gap-1.5 font-medium text-muted uppercase tracking-wider mb-2 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Filter Presets</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onChange({ ...settings, filterPreset: p.id })}
                    className={`flex items-center gap-2 px-2.5 py-1.5 border text-left transition-all ${
                      settings.filterPreset === p.id
                        ? 'border-accent bg-surface-2 text-accent font-bold'
                        : 'border-line bg-surface hover:border-line/80 text-fg'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-none"
                      style={{ background: p.color }}
                    />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Backdrop Styles */}
            <div>
              <div className="flex items-center gap-1.5 font-medium text-muted uppercase tracking-wider mb-2 text-[11px]">
                <Image className="w-3.5 h-3.5 text-accent" />
                <span>Backdrop Style</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => onChange({ ...settings, backgroundStyle: bg.id })}
                    className={`px-2 py-1.5 border text-center transition-all ${
                      settings.backgroundStyle === bg.id
                        ? 'border-accent bg-surface-2 text-accent font-bold'
                        : 'border-line bg-surface hover:border-line/80 text-fg'
                    }`}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Styles */}
            <div>
              <div className="flex items-center gap-1.5 font-medium text-muted uppercase tracking-wider mb-2 text-[11px]">
                <Frame className="w-3.5 h-3.5 text-accent" />
                <span>Frame Geometry</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {FRAMES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange({ ...settings, frameStyle: f.id })}
                    className={`px-2 py-1.5 border text-center transition-all ${
                      settings.frameStyle === f.id
                        ? 'border-accent bg-surface-2 text-accent font-bold'
                        : 'border-line bg-surface hover:border-line/80 text-fg'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 pt-1 border-t border-line">
              <div className="flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase">Brightness</span>
                <span className="text-accent">{settings.brightness}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                value={settings.brightness}
                onChange={(e) =>
                  onChange({ ...settings, brightness: Number(e.target.value) })
                }
                className="w-full accent-accent h-1 bg-surface-2 cursor-pointer"
              />

              <div className="flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase">Contrast</span>
                <span className="text-accent">{settings.contrast}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                value={settings.contrast}
                onChange={(e) =>
                  onChange({ ...settings, contrast: Number(e.target.value) })
                }
                className="w-full accent-accent h-1 bg-surface-2 cursor-pointer"
              />

              <div className="flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase">Neon Glow</span>
                <span className="text-accent">{settings.glow}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                value={settings.glow}
                onChange={(e) =>
                  onChange({ ...settings, glow: Number(e.target.value) })
                }
                className="w-full accent-accent h-1 bg-surface-2 cursor-pointer"
              />

              <div className="flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase">CRT Scanlines</span>
                <span className="text-accent">{settings.scanlines}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.scanlines}
                onChange={(e) =>
                  onChange({ ...settings, scanlines: Number(e.target.value) })
                }
                className="w-full accent-accent h-1 bg-surface-2 cursor-pointer"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-line">
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-line bg-surface hover:border-warn text-muted hover:text-warn transition-colors text-[11px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-accent text-bg font-semibold hover:brightness-110 text-xs"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
