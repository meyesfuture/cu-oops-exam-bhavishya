import { useState, useEffect, useCallback } from 'react';
import { UserPreferences } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  leftPaneRatio: 42,
  consoleHeight: 200,
  fontSize: 13,
  isConsoleOpen: false,
  isSidebarOpen: true,
  wordWrap: 'off',
  isEditorFullscreen: false,
  tabSize: 4,
  lineNumbers: 'on',
  bracketPairColorization: true,
  minimap: false,
};

function isValidPreferences(val: unknown): val is UserPreferences {
  if (!val || typeof val !== 'object') return false;
  const p = val as Record<string, unknown>;
  return (
    typeof p.fontSize === 'number' &&
    p.fontSize >= 10 &&
    p.fontSize <= 32 &&
    typeof p.leftPaneRatio === 'number' &&
    p.leftPaneRatio >= 0 &&
    p.leftPaneRatio <= 100 &&
    typeof p.consoleHeight === 'number' &&
    ['on', 'off'].includes(p.wordWrap as string) &&
    ['on', 'off'].includes(p.lineNumbers as string)
  );
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = getStorageItem<UserPreferences>('preferences_v3', DEFAULT_PREFERENCES, isValidPreferences);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('drawer') === 'open') {
        return { ...saved, isConsoleOpen: true };
      }
    }
    return saved;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
    setStorageItem('preferences_v3', preferences);
  }, [preferences]);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      // Clamp numeric values safely
      if (typeof next.fontSize === 'number') {
        next.fontSize = Math.min(24, Math.max(11, next.fontSize));
      }
      if (typeof next.leftPaneRatio === 'number') {
        next.leftPaneRatio = Math.min(80, Math.max(0, next.leftPaneRatio));
      }
      if (typeof next.consoleHeight === 'number') {
        next.consoleHeight = Math.min(600, Math.max(100, next.consoleHeight));
      }
      return next;
    });
  }, []);

  return {
    preferences,
    updatePreferences,
  };
}
