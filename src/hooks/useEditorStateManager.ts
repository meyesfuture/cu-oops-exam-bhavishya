import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { SupportedLanguage, VirtualFile, TabInfo } from '../types';
import {
  createInitialFileForLanguage,
  inferLanguageFromFileName,
  getDefaultExtensionForLanguage,
} from '../utils/languageTemplates';
import {
  loadEditorDrafts,
  saveEditorDrafts,
  loadSelectedLanguage,
  saveSelectedLanguage,
  PersistedDraftsRecord,
  PersistedLanguageDraft,
} from '../utils/storage';

export interface UseEditorStateManagerOptions {
  initialLanguage?: SupportedLanguage;
  initialJavaFiles: VirtualFile[];
}

export function useEditorStateManager({
  initialLanguage = 'java',
  initialJavaFiles,
}: UseEditorStateManagerOptions) {
  // Restore selected language from localStorage or initial fallback
  const resolvedInitialLang = useMemo(() => {
    return loadSelectedLanguage(initialLanguage);
  }, [initialLanguage]);

  // Current active language
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(resolvedInitialLang);

  // Initialize drafts dictionary from localStorage or seed with defaults
  const draftsRef = useRef<PersistedDraftsRecord>((() => {
    const defaultSeed: PersistedDraftsRecord = {
      java: {
        files: initialJavaFiles,
        activeFilePath: initialJavaFiles[0]?.path ?? '',
        openTabPaths: initialJavaFiles.map((f) => f.path),
      },
    };

    if (resolvedInitialLang !== 'java') {
      const initialFile = createInitialFileForLanguage(resolvedInitialLang);
      defaultSeed[resolvedInitialLang] = {
        files: [initialFile],
        activeFilePath: initialFile.path,
        openTabPaths: [initialFile.path],
      };
    }

    const loaded = loadEditorDrafts(defaultSeed);
    // Ensure Java has strictly the single required file Main.java at ProductInventoryManager/src/main/java/Main.java
    const isSingleMainJava =
      loaded.java?.files?.length === 1 &&
      loaded.java?.files[0]?.name === 'Main.java' &&
      loaded.java?.files[0]?.path === 'ProductInventoryManager/src/main/java/Main.java';
    if (!loaded.java || loaded.java.files.length === 0 || !isSingleMainJava) {
      loaded.java = defaultSeed.java;
    }
    return loaded;
  })());

  // Current working set of files, active path, and tabs for active language
  const [files, setFiles] = useState<VirtualFile[]>(() => {
    const currentDraft = draftsRef.current[resolvedInitialLang];
    return currentDraft?.files && currentDraft.files.length > 0
      ? currentDraft.files
      : draftsRef.current.java?.files ?? initialJavaFiles;
  });

  const [activeFilePath, setActiveFilePath] = useState<string>(() => {
    return initialJavaFiles[0]?.path ?? files[0]?.path ?? '';
  });

  const [openTabPaths, setOpenTabPaths] = useState<string[]>(() => {
    return [initialJavaFiles[0]?.path ?? files[0]?.path ?? ''];
  });

  // Automatically save drafts and current language to localStorage whenever files or tabs change
  useEffect(() => {
    const currentDraft: PersistedLanguageDraft = {
      files,
      activeFilePath,
      openTabPaths,
    };
    draftsRef.current[currentLanguage] = currentDraft;
    saveEditorDrafts(draftsRef.current);
    saveSelectedLanguage(currentLanguage);
  }, [currentLanguage, files, activeFilePath, openTabPaths]);

  // Current active file object
  const activeFile = useMemo<VirtualFile>(() => {
    return (
      files.find((f) => f.path === activeFilePath) ??
      files[0] ?? {
        id: 'fallback-file',
        name: 'solution',
        path: 'solution',
        language: currentLanguage,
        content: '',
        initialContent: '',
        isModified: false,
      }
    );
  }, [files, activeFilePath, currentLanguage]);

  // Tabs for the tab bar
  const tabs = useMemo<TabInfo[]>(() => {
    const list: TabInfo[] = [];
    for (const path of openTabPaths) {
      const file = files.find((f) => f.path === path);
      if (file) {
        list.push({
          path: file.path,
          title: file.name,
          language: file.language,
          isModified: file.isModified,
        });
      }
    }
    return list;
  }, [openTabPaths, files]);

  // Manual draft persistence
  const persistCurrentDraft = useCallback(() => {
    draftsRef.current[currentLanguage] = {
      files,
      activeFilePath,
      openTabPaths,
    };
    saveEditorDrafts(draftsRef.current);
    saveSelectedLanguage(currentLanguage);
  }, [currentLanguage, files, activeFilePath, openTabPaths]);

  // Language switching without destroying existing drafts
  const switchLanguage = useCallback(
    (newLang: SupportedLanguage) => {
      if (newLang === currentLanguage) return;

      // 1. Save current state into draft storage
      draftsRef.current[currentLanguage] = {
        files,
        activeFilePath,
        openTabPaths,
      };

      // 2. Fetch or create draft for the target language
      let targetDraft = draftsRef.current[newLang];
      if (!targetDraft || targetDraft.files.length === 0) {
        const initialFile = createInitialFileForLanguage(newLang);
        targetDraft = {
          files: [initialFile],
          activeFilePath: initialFile.path,
          openTabPaths: [initialFile.path],
        };
        draftsRef.current[newLang] = targetDraft;
      }

      // 3. Switch active state
      setCurrentLanguage(newLang);
      setFiles(targetDraft.files);
      setActiveFilePath(targetDraft.activeFilePath);
      setOpenTabPaths(targetDraft.openTabPaths);

      // 4. Save to persistent storage
      saveEditorDrafts(draftsRef.current);
      saveSelectedLanguage(newLang);
    },
    [currentLanguage, files, activeFilePath, openTabPaths]
  );

  // Switch active tab/file
  const selectFile = useCallback((path: string) => {
    setOpenTabPaths((prev) => (prev.includes(path) ? prev : [...prev, path]));
    setActiveFilePath(path);
  }, []);

  // Close tab
  const closeTab = useCallback(
    (path: string) => {
      setOpenTabPaths((prev) => {
        const next = prev.filter((p) => p !== path);
        if (activeFilePath === path) {
          if (next.length > 0) {
            const closedIdx = prev.indexOf(path);
            const nextActiveIdx = Math.min(closedIdx, next.length - 1);
            const nextActivePath = next[nextActiveIdx];
            if (nextActivePath) {
              setActiveFilePath(nextActivePath);
            }
          } else if (files.length > 0 && files[0]) {
            const fallbackPath = files[0].path;
            setActiveFilePath(fallbackPath);
            return [fallbackPath];
          }
        }
        return next;
      });
    },
    [activeFilePath, files]
  );

  // Create a new file in the current language
  const createFile = useCallback(
    (suggestedName?: string) => {
      const ext = getDefaultExtensionForLanguage(currentLanguage);
      let fileName = suggestedName?.trim();

      if (!fileName) {
        const existingCount = files.length + 1;
        fileName = `File${existingCount}${ext}`;
      } else if (!fileName.includes('.')) {
        fileName = `${fileName}${ext}`;
      }

      const fileLang = inferLanguageFromFileName(fileName, currentLanguage);
      const filePath = `src/${fileName}`;

      // Avoid collision
      const finalPath = files.some((f) => f.path === filePath)
        ? `src/${Date.now()}_${fileName}`
        : filePath;

      const template = createInitialFileForLanguage(fileLang).content;

      const newFile: VirtualFile = {
        id: `file-${Date.now()}`,
        name: fileName,
        path: finalPath,
        language: fileLang,
        content: template,
        initialContent: template,
        isModified: false,
      };

      setFiles((prev) => [...prev, newFile]);
      setOpenTabPaths((prev) => [...prev, finalPath]);
      setActiveFilePath(finalPath);

      return newFile;
    },
    [currentLanguage, files]
  );

  // Update content of a file
  const updateContent = useCallback((path: string, content: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === path) {
          return {
            ...f,
            content,
            isModified: content !== f.initialContent,
          };
        }
        return f;
      })
    );
  }, []);

  // Revert single file to initial content
  const resetFile = useCallback((path: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === path) {
          return {
            ...f,
            content: f.initialContent,
            isModified: false,
          };
        }
        return f;
      })
    );
  }, []);

  // Revert all files in current language
  const resetAllInCurrentLanguage = useCallback(() => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        content: f.initialContent,
        isModified: false,
      }))
    );
  }, []);

  return {
    currentLanguage,
    switchLanguage,
    files,
    activeFile,
    activeFilePath,
    tabs,
    selectFile,
    closeTab,
    createFile,
    updateContent,
    resetFile,
    resetAllInCurrentLanguage,
    persistCurrentDraft,
  };
}
