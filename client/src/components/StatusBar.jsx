import React, { useState, useEffect } from 'react';
import { Terminal, Sliders, Search, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

export function StatusBar({
  onOpenThemeSettings,
  onOpenPalette,
  onOpenTerminal,
  lang,
  onToggleLang,
  t,
  isHealthy = true,
}) {
  const [dhakaTime, setDhakaTime] = useState('--:--:--');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function updateClock() {
      try {
        const timeStr = new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Dhaka',
          hour12: false,
        });
        setDhakaTime(timeStr);
      } catch (e) {
        setDhakaTime(new Date().toTimeString().slice(0, 8));
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-line shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-mono">
        {/* Brand & Indicators */}
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <a
            href="#top"
            className="font-medium text-sm text-fg tracking-tight hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span className="text-accent font-bold">toufikul</span>
            <span className="text-muted">.dev</span>
            <span className="text-line">/</span>
            <span className="text-muted text-[11px] uppercase tracking-wider">status</span>
          </a>

          {/* Operational Pill */}
          <span
            className="inline-flex items-center gap-2 px-2.5 py-1 border border-line bg-surface-2 text-fg whitespace-nowrap"
            title="Operational state based on live system diagnostics"
          >
            <span
              className={`w-2 h-2 rounded-full flex-none ${
                isHealthy ? 'bg-ok pulse-dot' : 'bg-warn'
              }`}
            />
            <span className="text-[11px] font-medium hidden sm:inline">
              {isHealthy ? t('nav.operational') : t('nav.partial')}
            </span>
          </span>

          {/* Open to Work Pill */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-line bg-surface-2 text-muted hidden md:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-warn" />
            <span className="text-[11px]">{t('nav.openToWork')}</span>
          </span>

          {/* Dhaka Clock */}
          <span className="text-muted text-[11px] hidden lg:inline-flex items-center gap-1.5">
            <span className="text-line">•</span>
            <span>Dhaka {dhakaTime} (UTC+6)</span>
          </span>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 px-2 py-1 border border-line bg-surface hover:border-accent hover:text-accent text-muted transition-colors text-[11px]"
            title="Open command palette (Ctrl+K / Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1 py-0.2 bg-surface-2 text-[10px] border border-line">⌘K</kbd>
          </button>

          {/* Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1 px-2 py-1 border border-line bg-surface hover:border-accent hover:text-accent text-muted transition-colors text-[11px]"
            title="Open system terminal (`)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
            <kbd className="px-1 bg-surface-2 text-[10px] border border-line">~</kbd>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1 border border-line bg-surface hover:border-accent hover:text-accent text-muted transition-colors text-[11px]"
            title="Switch Language: English / বাংলা"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{lang === 'en' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Theme Settings Trigger */}
          <button
            onClick={onOpenThemeSettings}
            className="flex items-center gap-1 px-2.5 py-1 border border-line bg-surface hover:border-accent hover:text-accent text-muted transition-colors text-[11px]"
            title="Open theme settings & display preferences"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('nav.theme')}</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-bg font-semibold hover:brightness-110 transition-all text-xs"
          >
            <span>{t('nav.hireMe')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenPalette}
            aria-label="Open command search"
            className="p-1.5 border border-line bg-surface text-muted"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 border border-line bg-surface text-fg"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-3 space-y-3 font-mono text-xs animate-in slide-in-from-top duration-150">
          <div className="flex items-center justify-between text-muted border-b border-line pb-2">
            <span>Dhaka {dhakaTime}</span>
            <span className="text-ok font-medium">{t('nav.operational')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 p-2 border border-line bg-surface-2 text-fg"
            >
              <Terminal className="w-4 h-4 text-accent" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenThemeSettings();
              }}
              className="flex items-center justify-center gap-2 p-2 border border-line bg-surface-2 text-fg"
            >
              <Sliders className="w-4 h-4 text-accent" />
              <span>Theme</span>
            </button>
            <button
              onClick={() => {
                onToggleLang();
              }}
              className="flex items-center justify-center gap-2 p-2 border border-line bg-surface-2 text-fg"
            >
              <Globe className="w-4 h-4 text-accent" />
              <span>{lang === 'en' ? 'বাংলা রূপান্তর' : 'Switch to EN'}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 p-2 bg-accent text-bg font-semibold text-center"
            >
              <span>{t('nav.hireMe')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
