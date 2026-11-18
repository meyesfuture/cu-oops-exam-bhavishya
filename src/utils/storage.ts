/**
 * Safe local storage utility with in-memory fallback and safe schema validation
 * Fully compliant with Safe Exam Browser (SEB 3.x) kiosk sandbox policies
 */

import { SupportedLanguage, VirtualFile } from '../types';

const STORAGE_PREFIX = 'codechef_workspace_';

// In-memory fallback map for environments where localStorage is blocked or restricted
const inMemoryStore = new Map<string, string>();

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = `${STORAGE_PREFIX}__test__`;
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const hasLocalStorage = typeof window !== 'undefined' && isLocalStorageAvailable();

export function getStorageItem<T>(key: string, defaultValue: T, validator?: (val: unknown) => val is T): T {
  const fullKey = `${STORAGE_PREFIX}${key}`;
  try {
    let raw: string | null = null;
    if (hasLocalStorage) {
      raw = window.localStorage.getItem(fullKey);
    } else {
      raw = inMemoryStore.get(fullKey) ?? null;
    }

    if (raw === null) return defaultValue;

    const parsed = JSON.parse(raw);
    if (validator && !validator(parsed)) {
      console.warn(`[Storage] Validation failed for key "${key}", using default.`);
      return defaultValue;
    }
    return parsed as T;
  } catch (error) {
    console.warn(`[Storage] Failed to read key "${key}", falling back to default:`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): boolean {
  const fullKey = `${STORAGE_PREFIX}${key}`;
  try {
    const serialized = JSON.stringify(value);
    if (hasLocalStorage) {
      window.localStorage.setItem(fullKey, serialized);
    }
    inMemoryStore.set(fullKey, serialized);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to write key "${key}":`, error);
    try {
      inMemoryStore.set(fullKey, JSON.stringify(value));
    } catch {
      // Ignore in-memory errors
    }
    return false;
  }
}

export function removeStorageItem(key: string): void {
  const fullKey = `${STORAGE_PREFIX}${key}`;
  try {
    if (hasLocalStorage) {
      window.localStorage.removeItem(fullKey);
    }
    inMemoryStore.delete(fullKey);
  } catch (error) {
    console.warn(`[Storage] Failed to remove key "${key}":`, error);
  }
}

// ---------------------------------------------------------------------------
// Typed Persistence Domain Helpers
// ---------------------------------------------------------------------------

export interface PersistedLanguageDraft {
  files: VirtualFile[];
  activeFilePath: string;
  openTabPaths: string[];
}

export type PersistedDraftsRecord = Partial<Record<SupportedLanguage, PersistedLanguageDraft>>;

/**
 * Validates whether parsed JSON conforms to a valid virtual file structure
 */
function isValidVirtualFile(obj: unknown): obj is VirtualFile {
  if (!obj || typeof obj !== 'object') return false;
  const f = obj as Record<string, unknown>;
  return (
    typeof f.id === 'string' &&
    typeof f.name === 'string' &&
    typeof f.path === 'string' &&
    typeof f.language === 'string' &&
    typeof f.content === 'string'
  );
}

/**
 * Validates language drafts dictionary
 */
export function isValidDraftsRecord(val: unknown): val is PersistedDraftsRecord {
  if (!val || typeof val !== 'object') return false;
  const record = val as Record<string, unknown>;
  for (const [lang, draft] of Object.entries(record)) {
    if (!['java', 'c', 'cpp', 'python', 'javascript'].includes(lang)) continue;
    if (!draft || typeof draft !== 'object') return false;
    const d = draft as Record<string, unknown>;
    if (!Array.isArray(d.files) || !d.files.every(isValidVirtualFile)) return false;
    if (typeof d.activeFilePath !== 'string') return false;
    if (!Array.isArray(d.openTabPaths)) return false;
  }
  return true;
}

/**
 * Save code drafts to storage
 */
export function saveEditorDrafts(drafts: PersistedDraftsRecord): boolean {
  return setStorageItem('code_drafts_v2', drafts);
}

/**
 * Load code drafts from storage with safe recovery
 */
export function loadEditorDrafts(defaultValue: PersistedDraftsRecord): PersistedDraftsRecord {
  return getStorageItem('code_drafts_v2', defaultValue, isValidDraftsRecord);
}

/**
 * Save selected language preference
 */
export function saveSelectedLanguage(lang: SupportedLanguage): boolean {
  return setStorageItem('selected_language_v2', lang);
}

/**
 * Load selected language preference with fallback
 */
export function loadSelectedLanguage(defaultLang: SupportedLanguage): SupportedLanguage {
  const val = getStorageItem<string>('selected_language_v2', defaultLang);
  if (['java', 'c', 'cpp', 'python', 'javascript'].includes(val)) {
    return val as SupportedLanguage;
  }
  return defaultLang;
}

/**
 * Save custom test input
 */
export function saveCustomInput(input: string): boolean {
  return setStorageItem('custom_stdin_v2', input);
}

/**
 * Load custom test input
 */
export function loadCustomInput(defaultInput: string): string {
  return getStorageItem<string>('custom_stdin_v2', defaultInput);
}

/**
 * Save "Use custom input" toggle state
 */
export function saveUseCustomInput(use: boolean): boolean {
  return setStorageItem('use_custom_stdin_v2', use);
}

/**
 * Load "Use custom input" toggle state
 */
export function loadUseCustomInput(defaultValue = false): boolean {
  return getStorageItem<boolean>('use_custom_stdin_v2', defaultValue);
}
