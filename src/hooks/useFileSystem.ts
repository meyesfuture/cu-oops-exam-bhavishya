import { useState, useCallback, useMemo } from 'react';
import { VirtualFile, TabInfo } from '../types';

export function useFileSystem(initialFiles: VirtualFile[]) {
  const [files, setFiles] = useState<VirtualFile[]>(initialFiles);
  const [openTabPaths, setOpenTabPaths] = useState<string[]>(() =>
    initialFiles.map((f) => f.path)
  );
  const [activeFilePath, setActiveFilePath] = useState<string>(
    initialFiles[0]?.path ?? ''
  );

  const activeFile = useMemo(
    () => files.find((f) => f.path === activeFilePath) ?? files[0],
    [files, activeFilePath]
  );

  const tabs: TabInfo[] = useMemo(() => {
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

  const openFile = useCallback((path: string) => {
    setOpenTabPaths((prev) => (prev.includes(path) ? prev : [...prev, path]));
    setActiveFilePath(path);
  }, []);

  const closeTab = useCallback(
    (path: string) => {
      setOpenTabPaths((prev) => {
        const next = prev.filter((p) => p !== path);
        if (activeFilePath === path && next.length > 0) {
          const closedIndex = prev.indexOf(path);
          const nextActiveIndex = Math.min(closedIndex, next.length - 1);
          const nextPath = next[nextActiveIndex];
          if (nextPath) {
            setActiveFilePath(nextPath);
          }
        }
        return next;
      });
    },
    [activeFilePath]
  );

  const updateFileContent = useCallback((path: string, content: string) => {
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

  const resetAll = useCallback(() => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        content: f.initialContent,
        isModified: false,
      }))
    );
  }, []);

  return {
    files,
    activeFile,
    tabs,
    activeFilePath,
    openFile,
    closeTab,
    updateFileContent,
    resetFile,
    resetAll,
  };
}
