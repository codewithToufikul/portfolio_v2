import React, { useRef, useEffect } from 'react';

export function PhotoPreview({
  settings,
  className = '',
  showBadge = true,
  interactive = false,
  onOpenStudio = null,
}) {
  const {
    filterPreset,
    brightness,
    contrast,
    glow,
    scanlines,
    backgroundStyle,
    frameStyle,
  } = settings;

  const canvasRef = useRef(null);

  // Background dynamic animations (for Code Rain / Matrix background)
  useEffect(() => {
    if (backgroundStyle !== 'code-rain' && backgroundStyle !== 'circuit') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const width = (canvas.width = canvas.parentElement.clientWidth || 320);
    const height = (canvas.height = canvas.parentElement.clientHeight || 380);

    const columns = Math.floor(width / 16);
    const drops = Array(columns).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテト2489';

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 18, 22, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'var(--accent)';
      ctx.font = '11px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 16, drops[i] * 16);

        if (drops[i] * 16 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [backgroundStyle]);

  // Compute CSS filter string based on preset and sliders
  const getFilterStyle = () => {
    const b = brightness / 100;
    const c = contrast / 100;

    let presetFilter = '';
    switch (filterPreset) {
      case 'cyan-duotone':
        presetFilter = 'sepia(80%) hue-rotate(145deg) saturate(180%)';
        break;
      case 'matrix-green':
        presetFilter = 'sepia(100%) hue-rotate(85deg) saturate(220%)';
        break;
      case 'amber-terminal':
        presetFilter = 'sepia(95%) hue-rotate(10deg) saturate(240%)';
        break;
      case 'black-white':
        presetFilter = 'grayscale(100%) contrast(120%)';
        break;
      case 'cyberpunk':
        presetFilter = 'contrast(130%) hue-rotate(290deg) saturate(170%)';
        break;
      case 'theme-synced':
        presetFilter = 'sepia(60%) saturate(150%)';
        break;
      default:
        presetFilter = 'none';
    }

    const dropShadow = glow > 0 ? `drop-shadow(0 0 ${glow}px var(--accent))` : '';
    return {
      filter: `${presetFilter} brightness(${b}) contrast(${c}) ${dropShadow}`.trim(),
    };
  };

  // Frame shape classes
  const getFrameClasses = () => {
    switch (frameStyle) {
      case 'circle':
        return 'rounded-full aspect-square overflow-hidden border-2 border-accent';
      case 'hexagon':
        return 'aspect-square border border-accent [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]';
      case 'monitor':
        return 'rounded-none border-2 border-line bg-surface shadow-hud p-2';
      case 'id-card':
      default:
        return 'border border-line bg-surface relative';
    }
  };

  return (
    <div
      className={`relative group inline-block select-none ${className}`}
      onClick={interactive ? onOpenStudio : undefined}
    >
      {/* Outer frame container */}
      <div className={`relative overflow-hidden ${getFrameClasses()}`}>
        {/* Backdrop Styles */}
        {backgroundStyle === 'grid' && (
          <div className="absolute inset-0 grid-pattern pointer-events-none" />
        )}

        {backgroundStyle === 'radar' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="absolute w-[200%] h-[200%] rounded-full border border-accent/20" />
            <div className="absolute w-[140%] h-[140%] rounded-full border border-accent/25" />
            <div className="absolute w-[80%] h-[80%] rounded-full border border-accent/30" />
            <div
              className="absolute inset-0 radar-sweep"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--accent) 30%, transparent) 45deg, transparent 50deg)',
              }}
            />
          </div>
        )}

        {backgroundStyle === 'code-rain' && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
        )}

        {backgroundStyle === 'circuit' && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, var(--accent) 1px, transparent 1px), linear-gradient(to right, var(--accent) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {backgroundStyle === 'gradient-mesh' && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%), radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--ok) 30%, transparent), transparent 70%)',
            }}
          />
        )}

        {/* The Cutout Photo */}
        <div className="relative z-10 flex items-center justify-center">
          <img
            src="/toufikul-cutout.png"
            alt="Toufikul Islam - Full Stack Developer"
            width={340}
            height={420}
            className="w-full h-auto max-h-[380px] object-contain transition-all duration-200"
            style={getFilterStyle()}
            onError={(e) => {
              // Fallback to original jpg if cutout is somehow unavailable
              if (e.target.src.indexOf('cutout') !== -1) {
                e.target.src = '/toufikul-original.jpg';
              }
            }}
          />
        </div>

        {/* CRT Scanline Overlay */}
        {scanlines > 0 && (
          <div
            className="absolute inset-0 scanlines pointer-events-none z-20"
            style={{ opacity: scanlines / 100 }}
          />
        )}

        {/* Monitor Frame Bezel Details */}
        {frameStyle === 'monitor' && (
          <div className="absolute top-1 left-2 text-[9px] font-mono text-muted tracking-widest z-30 uppercase">
            CRT_V2 // 60Hz
          </div>
        )}
      </div>

      {/* Operator Metadata Badge */}
      {showBadge && (
        <div className="mt-2 text-left font-mono text-xs flex items-center justify-between border-t border-line pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ok pulse-dot" />
            <span className="text-fg font-medium">Operator: Toufikul</span>
          </div>
          <span className="text-muted text-[11px]">ID: TS-2024</span>
        </div>
      )}
    </div>
  );
}
