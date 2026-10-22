import React from 'react';

export function RequestLog({ logs = [] }) {
  return (
    <ul className="m-0 p-3 font-mono text-xs leading-relaxed space-y-1 overflow-hidden min-h-[220px]">
      {logs.slice(0, 8).map((log) => (
        <li
          key={log.id}
          className="flex items-center gap-2.5 pb-1 border-b border-dashed border-line last:border-0 truncate"
        >
          <span className="text-accent font-semibold w-10 flex-none">{log.method}</span>
          <span className="truncate flex-1 text-fg min-w-0" title={log.path}>
            {log.path}
          </span>
          <span
            className={`flex-none font-medium ${
              log.status === 200 || log.status === 201 || log.status === 202
                ? 'text-ok'
                : 'text-warn'
            }`}
          >
            {log.status}
          </span>
          <span className="text-muted flex-none w-12 text-right tabular-nums">
            {log.latency}ms
          </span>
        </li>
      ))}
    </ul>
  );
}
