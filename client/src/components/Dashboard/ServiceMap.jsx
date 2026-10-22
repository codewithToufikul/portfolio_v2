import React from 'react';
import { Layers, Server, Database, Smartphone, Globe, Radio } from 'lucide-react';

export function ServiceMap() {
  return (
    <div className="font-mono text-xs p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Layer 1: Client Ingress */}
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
            Client Ingress (Edge)
          </div>
          <div className="p-2.5 bg-surface-2 border border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span>Web (React/Vite)</span>
            </div>
            <span className="text-[10px] text-ok px-1.5 py-0.5 bg-surface border border-line">200 OK</span>
          </div>
          <div className="p-2.5 bg-surface-2 border border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-accent" />
              <span>Mobile (React Native)</span>
            </div>
            <span className="text-[10px] text-ok px-1.5 py-0.5 bg-surface border border-line">200 OK</span>
          </div>
        </div>

        {/* Layer 2: Core Gateway & Sockets */}
        <div className="space-y-2 relative">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
            API Gateway & Services
          </div>
          <div className="p-3 bg-surface-2 border-2 border-accent shadow-hud flex flex-col gap-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-accent" />
                <span className="font-bold text-accent">Express REST API</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-ok pulse-dot" />
            </div>
            <span className="text-[11px] text-muted">V8 Node.js Runtime • port: 5001</span>
          </div>
          <div className="p-2.5 bg-surface-2 border border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-warn" />
              <span>Socket.io WebSocket</span>
            </div>
            <span className="text-[10px] text-muted">Real-time bi-dir</span>
          </div>
        </div>

        {/* Layer 3: Persistence & Cache */}
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
            Persistence & Cache
          </div>
          <div className="p-2.5 bg-surface-2 border border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-accent" />
              <span>MongoDB Atlas</span>
            </div>
            <span className="text-[10px] text-ok">Primary</span>
          </div>
          <div className="p-2.5 bg-surface-2 border border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted" />
              <span>Redis Cluster</span>
            </div>
            <span className="text-[10px] text-muted">Cache/MQ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
