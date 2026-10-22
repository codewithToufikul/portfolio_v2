import { useEffect } from 'react';

export function useKeyboardShortcut({ onToggleTerminal, onTogglePalette, onCloseAll }) {
  useEffect(() => {
    function handleKeyDown(event) {
      // Ignore if user is currently typing in an input, textarea, or contentEditable element
      const target = event.target;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Escape key closes modals / drawers
      if (event.key === 'Escape') {
        if (onCloseAll) onCloseAll();
        return;
      }

      // Backtick (` or ~) toggles terminal drawer (only if not inside an input)
      if ((event.key === '`' || event.key === '~') && !isInput && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        if (onToggleTerminal) onToggleTerminal();
        return;
      }

      // Ctrl+K or Cmd+K toggles Command Palette
      if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        if (onTogglePalette) onTogglePalette();
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleTerminal, onTogglePalette, onCloseAll]);
}
