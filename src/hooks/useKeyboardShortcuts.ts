import { useEffect, useRef } from 'react';

interface KeyboardShortcutHandlers {
  onRun?: () => void;
  onSaveDraft?: () => void;
  onIncreaseFontSize?: () => void;
  onDecreaseFontSize?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Never intercept OS / SEB restricted keys
      if (
        e.key === 'F5' ||
        e.key === 'F11' ||
        e.altKey || // Alt+Tab, Alt+F4 etc
        (e.ctrlKey && (e.key === 'w' || e.key === 'W' || e.key === 'q' || e.key === 'Q' || e.key === 't' || e.key === 'T' || e.key === 'n' || e.key === 'N'))
      ) {
        return;
      }

      // 2. Escape key -> Close modals / Exit fullscreen
      if (e.key === 'Escape') {
        handlersRef.current.onEscape?.();
        return;
      }

      // 3. Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        // Ctrl + Enter: Run
        if (e.key === 'Enter') {
          e.preventDefault();
          handlersRef.current.onRun?.();
          return;
        }

        // Ctrl + S: Save local draft
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          handlersRef.current.onSaveDraft?.();
          return;
        }

        // Ctrl + = or Ctrl + +: Increase font size
        if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd' || e.code === 'Equal') {
          e.preventDefault();
          handlersRef.current.onIncreaseFontSize?.();
          return;
        }

        // Ctrl + -: Decrease font size
        if (e.key === '-' || e.key === '_' || e.code === 'NumpadSubtract' || e.code === 'Minus') {
          e.preventDefault();
          handlersRef.current.onDecreaseFontSize?.();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
