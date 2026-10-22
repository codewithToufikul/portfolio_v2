import { useState, useEffect } from 'react';
import { themes } from '../data/themeConfig';

const STORAGE_KEY = 'toufikul_portfolio_theme_v2';

export function useTheme() {
  const [themeId, setThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (themes.some((t) => t.id === parsed.themeId)) {
          return parsed.themeId;
        }
      }
    } catch (e) {
      // Ignore storage errors
    }
    // Default to Cyan Ops
    return 'cyan-ops';
  });

  const [accentColor, setAccentColor] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.accentColor || null;
      }
    } catch (e) {}
    return null;
  });

  const [fontMode, setFontMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).fontMode || 'grotesk';
    } catch (e) {}
    return 'grotesk';
  });

  const [density, setDensity] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).density || 'comfortable';
    } catch (e) {}
    return 'comfortable';
  });

  const [animationIntensity, setAnimationIntensity] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).animationIntensity || 'full';
    } catch (e) {}
    return 'full';
  });

  // Apply theme variables to root document
  useEffect(() => {
    const activeTheme = themes.find((t) => t.id === themeId) || themes[0];
    const root = document.documentElement;

    // Set data attributes
    root.setAttribute('data-theme', activeTheme.type);
    root.setAttribute('data-theme-name', activeTheme.id);
    root.setAttribute('data-density', density);
    root.setAttribute('data-animation', animationIntensity);
    root.setAttribute('data-font', fontMode);

    // Apply color CSS variables
    Object.entries(activeTheme.colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Custom accent override if user chose one
    if (accentColor) {
      root.style.setProperty('--accent', accentColor);
    }

    // Font family override
    if (fontMode === 'mono') {
      root.style.setProperty('--font-display', '"IBM Plex Mono", monospace');
      root.style.setProperty('--font-body', '"IBM Plex Mono", monospace');
    } else if (fontMode === 'retro') {
      root.style.setProperty('--font-display', '"Courier New", Courier, monospace');
      root.style.setProperty('--font-body', '"IBM Plex Mono", monospace');
    } else {
      root.style.setProperty('--font-display', '"Familjen Grotesk", sans-serif');
      root.style.setProperty('--font-body', '"IBM Plex Sans", sans-serif');
    }

    // Persist to localStorage
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          themeId,
          accentColor,
          fontMode,
          density,
          animationIntensity,
        })
      );
    } catch (e) {}
  }, [themeId, accentColor, fontMode, density, animationIntensity]);

  const selectTheme = (id) => {
    if (themes.some((t) => t.id === id)) {
      setThemeId(id);
      setAccentColor(null); // Reset custom accent on theme switch
    }
  };

  const resetTheme = () => {
    setThemeId('cyan-ops');
    setAccentColor(null);
    setFontMode('grotesk');
    setDensity('comfortable');
    setAnimationIntensity('full');
  };

  return {
    themeId,
    activeTheme: themes.find((t) => t.id === themeId) || themes[0],
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
  };
}
