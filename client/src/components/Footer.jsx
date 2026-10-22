import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export function Footer({ t, onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-line bg-surface py-8 text-xs font-mono text-muted">
      <div className="max-w-[1240px] mx-auto px-4 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-fg font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ok pulse-dot" />
              <span>toufikul.dev • System Operational</span>
            </div>
            <p className="text-[11px] text-muted max-w-md">
              {t('footer.builtWith')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="px-2.5 py-1 border border-line bg-surface-2 hover:border-accent text-fg hover:text-accent transition-colors flex items-center gap-1.5 text-[11px]"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Open Terminal (~)</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 border border-line bg-surface-2 hover:border-accent text-fg hover:text-accent transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dashed border-line text-[11px]">
          <div>
            <span>{t('footer.uptimeJoke')}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-fg">Top</a>
            <a href="#deployments" className="hover:text-fg">Deployments</a>
            <a href="#skills" className="hover:text-fg">Skills</a>
            <a href="#contact" className="hover:text-fg">Contact</a>
            <span>{t('footer.copyright')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
