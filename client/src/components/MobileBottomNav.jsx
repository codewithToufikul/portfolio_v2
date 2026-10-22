import React from 'react';
import { Home, Layers, Wrench, Terminal, Mail } from 'lucide-react';

export function MobileBottomNav({ onOpenTerminal, activeSection = 'top' }) {
  const navItems = [
    { id: 'top', label: 'Home', href: '#top', icon: Home },
    { id: 'deployments', label: 'Work', href: '#deployments', icon: Layers },
    { id: 'skills', label: 'Stack', href: '#skills', icon: Wrench },
    { id: 'terminal', label: 'Term', onClick: onOpenTerminal, icon: Terminal },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line px-2 py-1 flex items-center justify-around font-mono text-[10px]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        if (item.onClick) {
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex flex-col items-center py-1 px-2 text-muted hover:text-accent transition-colors"
            >
              <Icon className="w-4 h-4 text-accent mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        }

        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center py-1 px-2 transition-colors ${
              isActive ? 'text-accent font-bold' : 'text-muted hover:text-fg'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
