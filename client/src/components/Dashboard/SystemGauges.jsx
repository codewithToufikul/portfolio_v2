import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, CheckCircle2 } from 'lucide-react';

export function SystemGauges() {
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memoryUsage, setMemoryUsage] = useState(48);
  const [netBandwidth, setNetBandwidth] = useState(1.4);

  // Moving telemetry update
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => Math.min(85, Math.max(12, Math.round(prev + (Math.random() * 8 - 4)))));
      setMemoryUsage((prev) => Math.min(80, Math.max(38, Math.round(prev + (Math.random() * 4 - 2)))));
      setNetBandwidth((prev) => +(Math.max(0.4, prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate 90-day uptime squares
  const days = Array.from({ length: 90 }, (_, i) => {
    // 90 days, 1 day had minor 99.4% maintenance, others 100%
    const isDegraded = i === 42;
    return {
      day: i + 1,
      status: isDegraded ? 'degraded' : 'operational',
      uptime: isDegraded ? '99.2%' : '100%',
    };
  });

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* 3 Metric Gauges */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 bg-surface-2 border border-line">
          <div className="flex items-center justify-center gap-1 text-muted text-[11px] mb-1">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span>CPU</span>
          </div>
          <div className="text-base font-bold text-fg tabular-nums">{cpuUsage}%</div>
          <div className="w-full bg-line h-1 mt-1.5 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 bg-surface-2 border border-line">
          <div className="flex items-center justify-center gap-1 text-muted text-[11px] mb-1">
            <HardDrive className="w-3.5 h-3.5 text-accent" />
            <span>RAM</span>
          </div>
          <div className="text-base font-bold text-fg tabular-nums">{memoryUsage}%</div>
          <div className="w-full bg-line h-1 mt-1.5 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${memoryUsage}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 bg-surface-2 border border-line">
          <div className="flex items-center justify-center gap-1 text-muted text-[11px] mb-1">
            <Wifi className="w-3.5 h-3.5 text-accent" />
            <span>NET</span>
          </div>
          <div className="text-base font-bold text-fg tabular-nums">{netBandwidth}MB/s</div>
          <div className="w-full bg-line h-1 mt-1.5 overflow-hidden">
            <div
              className="bg-ok h-full transition-all duration-300"
              style={{ width: `${Math.min(100, netBandwidth * 30)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 90-Day Uptime Calendar */}
      <div className="pt-2 border-t border-line">
        <div className="flex items-center justify-between text-muted text-[11px] mb-2">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-ok" />
            <span>90-Day Availability</span>
          </span>
          <span className="text-ok font-semibold">99.98% (simulated)</span>
        </div>

        {/* 90 Squares Grid */}
        <div
          className="grid grid-flow-col grid-rows-3 gap-1 overflow-x-auto py-1"
          role="img"
          aria-label="90-Day Uptime History"
        >
          {days.map((d) => (
            <div
              key={d.day}
              title={`Day -${90 - d.day}: ${d.uptime} uptime`}
              className={`w-2.5 h-2.5 transition-transform hover:scale-125 cursor-pointer ${
                d.status === 'operational' ? 'bg-ok/90' : 'bg-warn'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted mt-1.5">
          <span>90 days ago</span>
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-ok inline-block" /> 100%
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-warn inline-block" /> degraded
            </span>
          </span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
