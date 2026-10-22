import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { portfolioData } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';

import { BootScreen } from './components/BootScreen';
import { StatusBar } from './components/StatusBar';
import { Hero } from './components/Hero';
import { DashboardGrid } from './components/Dashboard/DashboardGrid';
import { GitHubActivity } from './components/GitHubActivity';
import { ProjectsList } from './components/Projects/ProjectsList';
import { Experience } from './components/Experience';
import { TechRegistry } from './components/TechRegistry';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { CommandPalette } from './components/CommandPalette';
import { TerminalDrawer } from './components/TerminalDrawer';
import { ThemeSettings } from './components/ThemeSettings';
import { PhotoStudioModal } from './components/PhotoStudio/PhotoStudioModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CustomCursor } from './components/CustomCursor';

const PHOTO_STORAGE_KEY = 'toufikul_photo_studio_v2';

const DEFAULT_PHOTO_SETTINGS = {
  filterPreset: 'original',
  brightness: 100,
  contrast: 100,
  glow: 4,
  scanlines: 20,
  backgroundStyle: 'radar',
  frameStyle: 'id-card',
};

export function App() {
  const {
    themeId,
    activeTheme,
    themes,
    accentColor,
    setAccentColor,
    fontMode,
    setFontMode,
    density,
    setDensity,
    animationIntensity,
    setAnimationIntensity,
    selectTheme,
    resetTheme,
  } = useTheme();

  const { lang, toggleLanguage, t } = useLanguage();

  // Modal / Drawer states
  const [bootCompleted, setBootCompleted] = useState(() => {
    try {
      return sessionStorage.getItem('toufikul_booted') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Photo studio customization
  const [photoSettings, setPhotoSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(PHOTO_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_PHOTO_SETTINGS;
  });

  const handlePhotoSettingsChange = (newSettings) => {
    setPhotoSettings(newSettings);
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {}
  };

  const handleResetPhotoSettings = () => {
    setPhotoSettings(DEFAULT_PHOTO_SETTINGS);
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(DEFAULT_PHOTO_SETTINGS));
    } catch (e) {}
  };

  // Keyboard shortcut listener: backtick for terminal, Ctrl+K for palette, Esc to close
  const closeAllOverlays = useCallback(() => {
    setIsPhotoStudioOpen(false);
    setIsThemeSettingsOpen(false);
    setIsPaletteOpen(false);
    setIsTerminalOpen(false);
  }, []);

  useKeyboardShortcut({
    onToggleTerminal: () => setIsTerminalOpen((prev) => !prev),
    onTogglePalette: () => setIsPaletteOpen((prev) => !prev),
    onCloseAll: closeAllOverlays,
  });

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let keyPointer = 0;

    const handleKonami = (e) => {
      if (e.key === konamiSequence[keyPointer] || e.key.toLowerCase() === konamiSequence[keyPointer]) {
        keyPointer++;
        if (keyPointer === konamiSequence.length) {
          keyPointer = 0;
          try {
            confetti({
              particleCount: 160,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#00ff66', '#5cc8e6', '#f42a41', '#ffb000'],
            });
          } catch (err) {}
          selectTheme('matrix-green');
          setIsTerminalOpen(true);
        }
      } else {
        keyPointer = 0;
      }
    };

    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, [selectTheme]);

  // Scroll Progress Bar & Active Section Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Identify active section
      const sections = ['top', 'dashboard', 'deployments', 'experience', 'skills', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Chart & Services Telemetry simulation
  const [chartData, setChartData] = useState(() => {
    const pts = [];
    let v = 34;
    for (let i = 0; i < 60; i++) {
      v = Math.max(22, Math.min(65, v + (Math.random() * 8 - 4)));
      pts.push(v);
    }
    return pts;
  });

  const [servicesData, setServicesData] = useState(() =>
    portfolioData.services.map((s) => ({
      ...s,
      history: Array.from({ length: 30 }, () => s.baseLatency + (Math.random() * 6 - 3)),
    }))
  );

  const [requestLogs, setRequestLogs] = useState([
    { id: 1, method: 'GET', path: '/api/projects', status: 200, latency: 18 },
    { id: 2, method: 'GET', path: '/api/skills', status: 200, latency: 14 },
    { id: 3, method: 'GET', path: '/api/about', status: 200, latency: 22 },
    { id: 4, method: 'POST', path: '/api/contact', status: 201, latency: 38 },
    { id: 5, method: 'GET', path: '/api/experience', status: 200, latency: 16 },
    { id: 6, method: 'GET', path: '/api/health', status: 200, latency: 9 },
  ]);

  // Telemetry tick
  useEffect(() => {
    const chartInterval = setInterval(() => {
      setChartData((prev) => {
        const last = prev[prev.length - 1];
        const spike = Math.random() < 0.05 ? Math.random() * 20 + 10 : 0;
        const nextVal = Math.max(20, Math.min(76, Math.round(last + (Math.random() * 8 - 4) + spike)));
        return [...prev.slice(1), nextVal];
      });

      setServicesData((prev) =>
        prev.map((svc) => {
          const lastVal = svc.history[svc.history.length - 1];
          const nextVal = Math.max(5, Math.min(65, Math.round(svc.baseLatency + (Math.random() * 8 - 4))));
          return {
            ...svc,
            history: [...svc.history.slice(1), nextVal],
          };
        })
      );
    }, 1000);

    const logRoutes = [
      ['GET', '/api/projects', 200],
      ['GET', '/api/skills', 200],
      ['GET', '/api/telemetry', 200],
      ['POST', '/api/contact', 201],
      ['GET', '/api/experience', 200],
      ['GET', '/api/health', 200],
      ['GET', '/api/github-stats', 200],
    ];

    const logInterval = setInterval(() => {
      const sample = logRoutes[Math.floor(Math.random() * logRoutes.length)];
      const latency = Math.round(Math.random() * 38 + 8);
      setRequestLogs((prev) => [
        {
          id: Date.now() + Math.random(),
          method: sample[0],
          path: sample[1],
          status: sample[2],
          latency,
        },
        ...prev.slice(0, 15),
      ]);
    }, 1400);

    return () => {
      clearInterval(chartInterval);
      clearInterval(logInterval);
    };
  }, []);

  const latestLatency = Math.round(chartData[chartData.length - 1] || 32);

  return (
    <div className="min-h-screen bg-bg text-fg relative flex flex-col font-body selection:bg-accent selection:text-bg">
      {/* Scroll Progress Bar under header */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Status Bar */}
      <StatusBar
        onOpenThemeSettings={() => setIsThemeSettingsOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
        t={t}
        isHealthy={true}
      />

      {/* Main Page Wrap */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 pb-24 md:pb-16 space-y-2">
        <Hero
          personal={portfolioData.personal}
          kpis={portfolioData.kpis}
          photoSettings={photoSettings}
          onOpenPhotoStudio={() => setIsPhotoStudioOpen(true)}
          liveLatency={latestLatency}
          healthyCount={6}
          t={t}
        />

        <DashboardGrid
          chartData={chartData}
          requestLogs={requestLogs}
          services={servicesData}
          t={t}
        />

        <GitHubActivity t={t} />

        <ProjectsList
          projects={portfolioData.projects}
          t={t}
        />

        <Experience
          experience={portfolioData.experience}
          education={portfolioData.education}
          achievements={portfolioData.achievements}
          certifications={portfolioData.certifications}
          t={t}
        />

        <TechRegistry
          skillsMatrix={portfolioData.skillsMatrix}
          t={t}
        />

        <ContactSection
          personal={portfolioData.personal}
          t={t}
        />
      </main>

      {/* Footer */}
      <Footer t={t} onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeSection={activeSection}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Boot Screen Sequence */}
      {!bootCompleted && (
        <BootScreen onComplete={() => setBootCompleted(true)} />
      )}

      {/* Photo Studio Drawer Modal */}
      <PhotoStudioModal
        isOpen={isPhotoStudioOpen}
        onClose={() => setIsPhotoStudioOpen(false)}
        settings={photoSettings}
        onChange={handlePhotoSettingsChange}
        onReset={handleResetPhotoSettings}
      />

      {/* Theme Settings Drawer */}
      <ThemeSettings
        isOpen={isThemeSettingsOpen}
        onClose={() => setIsThemeSettingsOpen(false)}
        themes={themes}
        themeId={themeId}
        selectTheme={selectTheme}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        fontMode={fontMode}
        setFontMode={setFontMode}
        density={density}
        setDensity={setDensity}
        animationIntensity={animationIntensity}
        setAnimationIntensity={setAnimationIntensity}
        resetTheme={resetTheme}
      />

      {/* Command Palette Modal (Ctrl/Cmd + K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenPhotoStudio={() => setIsPhotoStudioOpen(true)}
        onOpenThemeSettings={() => setIsThemeSettingsOpen(true)}
        onSelectTheme={selectTheme}
        themes={themes}
        projects={portfolioData.projects}
      />

      {/* Terminal Drawer (Backtick `) */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        themes={themes}
        onSelectTheme={selectTheme}
        portfolioData={portfolioData}
      />
      {/* Custom Theme-matched Cursor */}
      <CustomCursor />
    </div>
  );
}
