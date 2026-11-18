import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { X, Columns, MoreHorizontal, RotateCcw } from 'lucide-react';
import { TabInfo, VirtualFile } from '../../types';
import { IconButton } from '../common/IconButton';

interface EditorPaneProps {
  activeFile: VirtualFile;
  tabs: TabInfo[];
  theme: 'light' | 'dark';
  fontSize?: number;
  onSelectTab: (path: string) => void;
  onCloseTab: (path: string) => void;
  onContentChange: (path: string, content: string) => void;
  onResetFile?: (path: string) => void;
}

export const EditorPane: React.FC<EditorPaneProps> = ({
  activeFile,
  tabs,
  theme,
  fontSize = 14,
  onSelectTab,
  onCloseTab,
  onContentChange,
  onResetFile,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount: OnMount = (monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.focus();
  };

  // Convert file path into breadcrumb items
  const breadcrumbSegments = activeFile.path.split('/');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'var(--bg-editor)',
        overflow: 'hidden',
      }}
    >
      {/* File Tabs Strip */}
      <div
        role="tablist"
        aria-label="Editor tabs"
        style={{
          height: 'var(--tab-bar-height)',
          backgroundColor: 'var(--bg-chrome)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
          {tabs.map((tab) => {
            const isActive = tab.path === activeFile.path;
            return (
              <div
                key={tab.path}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => onSelectTab(tab.path)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectTab(tab.path);
                }}
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 12px',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-tab-active)' : 'transparent',
                  borderTop: isActive ? '2px solid var(--border-active-tab)' : '2px solid transparent',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    color: '#ef4444',
                    fontWeight: 700,
                    fontSize: '11px',
                  }}
                >
                  J
                </span>
                <span>{tab.title}</span>
                {tab.isModified && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--status-in-progress)',
                    }}
                  />
                )}
                {tabs.length > 1 && (
                  <button
                    type="button"
                    title={`Close ${tab.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.path);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2px',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Tab Strip Toolbar Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <IconButton icon={<Columns size={14} />} label="Split Editor" size="sm" />
          <IconButton
            icon={<RotateCcw size={14} />}
            label="Revert Current File"
            size="sm"
            onClick={() => onResetFile?.(activeFile.path)}
          />
          <IconButton icon={<MoreHorizontal size={14} />} label="Editor Options" size="sm" />
        </div>
      </div>

      {/* Breadcrumb Path Bar */}
      <div
        aria-label="File Breadcrumb"
        style={{
          height: 'var(--breadcrumb-height)',
          backgroundColor: 'var(--bg-editor)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '6px',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-muted)',
          flexShrink: 0,
        }}
      >
        {breadcrumbSegments.map((seg, i) => (
          <React.Fragment key={i}>
            <span
              style={{
                color: i === breadcrumbSegments.length - 1 ? 'var(--text-primary)' : 'inherit',
                fontWeight: i === breadcrumbSegments.length - 1 ? 500 : 400,
              }}
            >
              {seg}
            </span>
            {i < breadcrumbSegments.length - 1 && <span>&gt;</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Monaco Code Canvas */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <Editor
          height="100%"
          language={activeFile.language}
          value={activeFile.content}
          theme={theme === 'dark' ? 'vs-dark' : 'vs'}
          onMount={handleEditorMount}
          onChange={(value) => onContentChange(activeFile.path, value ?? '')}
          options={{
            fontSize,
            fontFamily: 'var(--font-mono)',
            minimap: { enabled: false },
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            lineDecorationsWidth: 10,
            glyphMargin: false,
            folding: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            wordWrap: 'off',
            renderLineHighlight: 'line',
          }}
        />
      </div>
    </div>
  );
};
