import React, { useRef, useEffect } from 'react';

export function ResponseChart({ data = [], height = 230, label = 'Response time, p95' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const h = height;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // CSS variables
    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const lineColor = getCssVar('--line') || '#263340';
    const mutedColor = getCssVar('--muted') || '#8a9aa7';
    const accentColor = getCssVar('--accent') || '#5cc8e6';

    const L = 36, R = 12, T = 12, B = 24;
    const pw = width - L - R;
    const ph = h - T - B;
    const max = 80;

    ctx.clearRect(0, 0, width, h);

    // Draw horizontal grid lines & labels
    ctx.font = '11px var(--font-mono, monospace)';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';

    for (let g = 0; g <= 4; g++) {
      const val = g * 20;
      const y = T + ph - (val / max) * ph;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(L, y + 0.5);
      ctx.lineTo(width - R, y + 0.5);
      ctx.stroke();

      ctx.fillStyle = mutedColor;
      ctx.fillText(String(val), L - 8, y);
    }

    // Time labels
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillStyle = mutedColor;
    ctx.fillText('-60s', L, h - 6);
    ctx.textAlign = 'right';
    ctx.fillText('now', width - R, h - 6);

    // Draw data line & area gradient
    const N = data.length;
    const px = (i) => L + (i / (N - 1)) * pw;
    const py = (val) => T + ph - (Math.min(max, Math.max(0, val)) / max) * ph;

    const grad = ctx.createLinearGradient(0, T, 0, T + ph);
    grad.addColorStop(0, hexToRgba(accentColor, 0.25));
    grad.addColorStop(1, hexToRgba(accentColor, 0.01));

    // Fill area
    ctx.beginPath();
    ctx.moveTo(px(0), py(data[0]));
    data.forEach((val, i) => ctx.lineTo(px(i), py(val)));
    ctx.lineTo(px(N - 1), T + ph);
    ctx.lineTo(px(0), T + ph);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Stroke line
    ctx.beginPath();
    data.forEach((val, i) => {
      if (i === 0) ctx.moveTo(px(i), py(val));
      else ctx.lineTo(px(i), py(val));
    });
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Pulse dot at the latest point
    const lastVal = data[data.length - 1];
    ctx.beginPath();
    ctx.arc(px(N - 1), py(lastVal), 4, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.fill();
  }, [data, height]);

  function hexToRgba(hex, alpha) {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!match) return `rgba(92, 200, 230, ${alpha})`;
    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        aria-label={label}
        className="block w-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
