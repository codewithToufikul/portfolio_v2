import { useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LANG_KEY = 'toufikul_portfolio_lang';

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'bn') return saved;
    } catch (e) {}
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  // Safe nested translation lookup: t('nav.brand')
  const t = useCallback(
    (keyPath) => {
      const parts = keyPath.split('.');
      let current = translations[lang] || translations.en;
      for (const part of parts) {
        if (current && current[part] !== undefined) {
          current = current[part];
        } else {
          // Fallback to English
          let fallback = translations.en;
          for (const fbPart of parts) {
            fallback = fallback?.[fbPart];
          }
          return fallback !== undefined ? fallback : keyPath;
        }
      }
      return current;
    },
    [lang]
  );

  return { lang, setLang, toggleLanguage, t };
}
