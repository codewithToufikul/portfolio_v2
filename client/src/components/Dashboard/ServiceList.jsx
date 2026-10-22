import React, { useRef, useEffect } from 'react';

function Sparkline({ data = [], isWarn = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 84;
    const height = 26;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const lo = Math.min(...data) - 2;
    const hi = Math.max(...data) + 2;

    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const color = isWarn ? getCssVar('--warn') || '#f0a83c' : getCssVar('--accent') || '#5cc8e6';

    ctx.beginPath();
    data.forEach((val, i) => {
      const px = 2 + (i / (data.length - 1)) * (width - 8);
      const py = height - 3 - ((val - lo) / (hi - lo || 1)) * (height - 6);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // End point
    const last = data[data.length - 1];
    const ex = width - 6;
    const ey = height - 3 - ((last - lo) / (hi - lo || 1)) * (height - 6);
    ctx.beginPath();
    ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }, [data, isWarn]);

  return <canvas ref={canvasRef} className="w-[84px] h-[26px] block" />;
}

export function ServiceList({ services = [] }) {
  return (
    <ul className="m-0 p-0 divide-y divide-line text-xs font-mono">
      {services.map((svc) => {
        const lastVal = svc.history ? svc.history[svc.history.length - 1] : svc.baseLatency;
        const isWarn = lastVal > 60;

        return (
          <li
            key={svc.id}
            className="grid grid-cols-[10px_minmax(0,1fr)_84px_50px] items-center gap-3 px-4 py-2.5 hover:bg-surface-2/50 transition-colors"
          >
            {/* Status dot */}
            <span
              className={`w-2 h-2 rounded-full ${
                isWarn ? 'bg-warn' : 'bg-ok pulse-dot'
              }`}
            />

            {/* Service details */}
            <div className="min-w-0">
              <span className="font-semibold text-fg block truncate">{svc.name}</span>
              <span className="text-[11px] text-muted block truncate">{svc.role}</span>
            </div>

            {/* Sparkline canvas */}
            <Sparkline data={svc.history || [20, 22, 21, 24, 23]} isWarn={isWarn} />

            {/* Latency */}
            <span className="text-right text-muted tabular-nums">
              {Math.round(lastVal)}ms
            </span>
          </li>
        );
      })}
    </ul>
  );
}
