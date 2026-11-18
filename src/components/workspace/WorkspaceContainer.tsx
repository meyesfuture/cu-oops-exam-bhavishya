import React, { useState, useRef, useCallback } from 'react';
import {
  RotateCcw,
  X,
  Maximize2,
  Minimize2,
  WrapText,
  AlignLeft,
  Settings,
  AlertTriangle,
  Columns2,
  MoreHorizontal,
} from 'lucide-react';
import { MonacoCodeEditor } from '../editor/MonacoCodeEditor';
import { BottomWorkspace } from '../output/BottomWorkspace';
import { VirtualFile, TabInfo, TestCase, ConsoleLogEntry, SupportedLanguage, UserPreferences } from '../../types';
import { getLanguageOption } from '../../utils/languageTemplates';
import type { editor } from 'monaco-editor';

interface WorkspaceContainerProps {
  activeFile: VirtualFile;
  tabs: TabInfo[];
  currentLanguage: SupportedLanguage;
  fontSize?: number;
  wordWrap?: 'on' | 'off';
  tabSize?: number;
  lineNumbers?: 'on' | 'off';
  bracketPairColorization?: boolean;
  minimap?: boolean;
  isConsoleOpen: boolean;
  consoleHeight: number;
  testCases: TestCase[];
  logs: ConsoleLogEntry[];
  isRunning?: boolean;
  onSelectTab: (path: string) => void;
  onCloseTab?: (path: string) => void;
  onCreateFile?: (name?: string) => void;
  onSwitchLanguage?: (lang: SupportedLanguage) => void;
  onContentChange: (path: string, content: string) => void;
  onResetCode?: () => void;
  onToggleConsole: () => void;
  onHeightChange?: (h: number) => void;
  onToggleWordWrap?: () => void;
  onFontSizeChange?: (size: number) => void;
  onPreferencesChange?: (prefs: Partial<UserPreferences>) => void;
  onRun?: () => void;
  onSubmit?: () => void;
  onSaveDraft?: () => void;
  onClearLogs?: () => void;
}

export const WorkspaceContainer: React.FC<WorkspaceContainerProps> = ({
  activeFile,
  tabs,
  currentLanguage,
  fontSize = 13,
  wordWrap = 'off',
  tabSize = 4,
  lineNumbers = 'on',
  bracketPairColorization = true,
  minimap = false,
  isConsoleOpen,
  consoleHeight,
  testCases,
  logs,
  isRunning = false,
  onSelectTab,
  onCloseTab,
  onCreateFile,
  onContentChange,
  onResetCode,
  onToggleConsole,
  onHeightChange,
  onToggleWordWrap,
  onFontSizeChange,
  onPreferencesChange,
  onRun,
  onSubmit,
  onSaveDraft,
  onClearLogs,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [tabToClose, setTabToClose] = useState<TabInfo | null>(null);
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState<boolean>(false);
  const [newFileNameInput, setNewFileNameInput] = useState<string>('');
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const breadcrumbSegments = activeFile.path.split('/');
  const activeLangOption = getLanguageOption(currentLanguage);

  const handleFormatCode = useCallback(() => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.getAction('editor.action.formatDocument')?.run();
    }
  }, []);

  const handleCreateFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileNameInput.trim()) {
      onCreateFile?.(newFileNameInput.trim());
      setNewFileNameInput('');
      setIsNewFileDialogOpen(false);
    }
  };

  const handleTabCloseClick = (tab: TabInfo) => {
    if (tab.isModified) {
      setTabToClose(tab);
    } else {
      onCloseTab?.(tab.path);
    }
  };

  const getLanguageBadge = (lang: SupportedLanguage) => {
    const opt = getLanguageOption(lang);
    return (
      <span
        style={{
          color: opt.badgeColor,
          fontWeight: 800,
          fontSize: '11px',
          marginRight: '2px',
        }}
      >
        {opt.badge}
      </span>
    );
  };

  return (
    <div
      role="region"
      aria-label="Code Workspace"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 9999 : 'auto',
      }}
    >
      {/* 1. File Tab Strip (Exact Reference media_1794958805937_26296933.png & media_1794958805889_44a3110b.png) */}
      <div
        role="tablist"
        aria-label="File Buffers"
        style={{
          height: '34px',
          minHeight: '34px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 0',
          overflow: 'visible',
          flexShrink: 0,
          userSelect: 'none',
          position: 'relative',
          zIndex: 30,
        }}
      >
        {/* Left Side: Open Tabs List Starting Flush on Left */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', overflowX: 'auto', flex: 1, minWidth: 0 }}>
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
                  fontSize: '12.5px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#111827' : '#6b7280',
                  backgroundColor: isActive ? '#ffffff' : '#f8fafc',
                  borderTop: isActive ? '2px solid transparent' : '2px solid transparent',
                  borderRight: '1px solid #e5e7eb',
                  borderLeft: isActive ? '1px solid #e5e7eb' : 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  position: 'relative',
                  top: '0px',
                }}
              >
                {/* Red J Badge */}
                <span
                  style={{
                    color: '#ef4444',
                    fontWeight: 700,
                    fontSize: '12px',
                    marginRight: '2px',
                  }}
                >
                  J
                </span>
                <span>{tab.title}</span>

                {/* Unsaved changes indicator */}
                {tab.isModified && (
                  <span
                    title="Unsaved changes"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#f59e0b',
                    }}
                  />
                )}

                {/* Close Tab button */}
                {onCloseTab && (
                  <button
                    type="button"
                    title={`Close ${tab.title}`}
                    aria-label={`Close tab ${tab.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabCloseClick(tab);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2px',
                      background: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      marginLeft: '6px',
                      borderRadius: '2px',
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Tab Strip Right Controls: EXACT Reference Columns2 [ | ] & MoreHorizontal (...) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0, overflow: 'visible', zIndex: 60 }}>
          {/* Split Editor Button [ | ] */}
          <button
            type="button"
            title="Split Editor Right"
            aria-label="Split Editor"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              background: 'transparent',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              borderRadius: '3px',
            }}
          >
            <Columns2 size={16} />
          </button>

          {/* More Options Dropdown (...) */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              title="More Actions"
              aria-label="More Actions"
              onClick={() => setIsMoreMenuOpen((p) => !p)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                background: isMoreMenuOpen ? '#e5e7eb' : 'transparent',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              <MoreHorizontal size={16} />
            </button>

            {isMoreMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '32px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  width: '210px',
                  padding: '4px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                {/* Format */}
                <button
                  type="button"
                  onClick={() => {
                    handleFormatCode();
                    setIsMoreMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    border: 'none',
                    background: 'transparent',
                    color: '#1e293b',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textAlign: 'left',
                  }}
                >
                  <AlignLeft size={14} />
                  <span>Format Document</span>
                </button>

                {/* Word Wrap */}
                <button
                  type="button"
                  onClick={() => {
                    onToggleWordWrap?.();
                    setIsMoreMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    border: 'none',
                    background: 'transparent',
                    color: '#1e293b',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textAlign: 'left',
                  }}
                >
                  <WrapText size={14} />
                  <span>Toggle Wrap ({wordWrap})</span>
                </button>

                {/* Font Size controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    fontSize: '12px',
                    color: '#1e293b',
                  }}
                >
                  <span>Font Size</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => onFontSizeChange?.(Math.max(12, fontSize - 1))}
                      disabled={fontSize <= 12}
                      style={{
                        padding: '2px 6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid #cbd5e1',
                        background: '#f8fafc',
                        borderRadius: '3px',
                        cursor: fontSize <= 12 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      A-
                    </button>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>{fontSize}px</span>
                    <button
                      type="button"
                      onClick={() => onFontSizeChange?.(Math.min(18, fontSize + 1))}
                      disabled={fontSize >= 18}
                      style={{
                        padding: '2px 6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid #cbd5e1',
                        background: '#f8fafc',
                        borderRadius: '3px',
                        cursor: fontSize >= 18 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      A+
                    </button>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2px 0' }} />

                {/* Editor Settings */}
                <button
                  type="button"
                  onClick={() => {
                    setIsSettingsModalOpen(true);
                    setIsMoreMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    border: 'none',
                    background: 'transparent',
                    color: '#1e293b',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textAlign: 'left',
                  }}
                >
                  <Settings size={14} />
                  <span>Editor Settings</span>
                </button>

                {/* Reset Code */}
                <button
                  type="button"
                  onClick={() => {
                    setIsResetConfirmOpen(true);
                    setIsMoreMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    border: 'none',
                    background: 'transparent',
                    color: '#dc2626',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textAlign: 'left',
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Revert to Starter Code</span>
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={() => {
                    setIsFullscreen((p) => !p);
                    setIsMoreMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    border: 'none',
                    background: 'transparent',
                    color: '#1e293b',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textAlign: 'left',
                  }}
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline Modal for Creating a New File */}
      {isNewFileDialogOpen && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '120px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '12px 14px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>Create New File</div>
          <form onSubmit={handleCreateFileSubmit} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              autoFocus
              value={newFileNameInput}
              onChange={(e) => setNewFileNameInput(e.target.value)}
              placeholder={`e.g. Solution${activeLangOption.defaultFileName.substring(activeLangOption.defaultFileName.lastIndexOf('.'))}`}
              style={{
                height: '26px',
                padding: '2px 8px',
                fontSize: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                height: '26px',
                padding: '0 10px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '3px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsNewFileDialogOpen(false)}
              style={{
                height: '26px',
                padding: '0 8px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* In-DOM Revert File Confirmation Modal */}
      {isResetConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsResetConfirmOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={22} color="#dc2626" />
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Revert Current File?
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
              Are you sure you want to revert <strong>{activeFile.name}</strong> to the starter template? All unsaved modifications in this file will be permanently discarded.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetCode?.();
                  setIsResetConfirmOpen(false);
                }}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#dc2626',
                  border: '1px solid #dc2626',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Confirm Revert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-DOM Tab Close Confirmation Modal */}
      {tabToClose && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTabToClose(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={22} color="#d97706" />
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Discard Unsaved Changes?
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
              File <strong>{tabToClose.title}</strong> has unsaved modifications. Closing this tab will discard those changes.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => setTabToClose(null)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                Keep Open
              </button>
              <button
                type="button"
                onClick={() => {
                  onCloseTab?.(tabToClose.path);
                  setTabToClose(null);
                }}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#dc2626',
                  border: '1px solid #dc2626',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Discard &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-DOM Editor Settings Modal */}
      {isSettingsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Editor Settings"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSettingsModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={18} color="#0284c7" />
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                  Editor Configuration
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                title="Close"
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Tab Size */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Indentation (Tab Size)</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Number of spaces per indentation level</div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[2, 4].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onPreferencesChange?.({ tabSize: size })}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: tabSize === size ? '1px solid #0284c7' : '1px solid #cbd5e1',
                        backgroundColor: tabSize === size ? '#e0f2fe' : '#ffffff',
                        color: tabSize === size ? '#0284c7' : '#475569',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {size} spaces
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Numbers */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Line Numbers</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Display gutter line numbers</div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {(['on', 'off'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onPreferencesChange?.({ lineNumbers: opt })}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: lineNumbers === opt ? '1px solid #0284c7' : '1px solid #cbd5e1',
                        backgroundColor: lineNumbers === opt ? '#e0f2fe' : '#ffffff',
                        color: lineNumbers === opt ? '#0284c7' : '#475569',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bracket Pair Colorization */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Bracket Pair Colorization</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Color-match nested braces and brackets</div>
                </div>
                <button
                  type="button"
                  onClick={() => onPreferencesChange?.({ bracketPairColorization: !bracketPairColorization })}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '4px',
                    border: bracketPairColorization ? '1px solid #0284c7' : '1px solid #cbd5e1',
                    backgroundColor: bracketPairColorization ? '#e0f2fe' : '#ffffff',
                    color: bracketPairColorization ? '#0284c7' : '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {bracketPairColorization ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* Minimap */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Code Minimap</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Right-side code outline overview</div>
                </div>
                <button
                  type="button"
                  onClick={() => onPreferencesChange?.({ minimap: !minimap })}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '4px',
                    border: minimap ? '1px solid #0284c7' : '1px solid #cbd5e1',
                    backgroundColor: minimap ? '#e0f2fe' : '#ffffff',
                    color: minimap ? '#0284c7' : '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {minimap ? 'Enabled' : 'Disabled (Default)'}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '12px 18px',
                borderTop: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Breadcrumbs Bar (Exact Reference 00.44.31.jpeg / 00.44.36 (2).jpeg) */}
      <div
        aria-label="Breadcrumb Trail"
        style={{
          height: '28px',
          minHeight: '28px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '6px',
          fontSize: '11.5px',
          color: '#64748b',
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        {breadcrumbSegments.map((seg, idx) => {
          const isLast = idx === breadcrumbSegments.length - 1;
          return (
            <React.Fragment key={idx}>
              {isLast && getLanguageBadge(activeFile.language)}
              <span
                style={{
                  color: isLast ? '#0f172a' : '#64748b',
                  fontWeight: isLast ? 600 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {seg}
              </span>
              {!isLast && <span style={{ opacity: 0.6 }}>&gt;</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* 3. Real Monaco Code Editor Canvas (Full Experience) */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <MonacoCodeEditor
          filePath={activeFile.path}
          language={activeFile.language}
          content={activeFile.content}
          fontSize={fontSize}
          wordWrap={wordWrap}
          tabSize={tabSize}
          lineNumbers={lineNumbers}
          bracketPairColorization={bracketPairColorization}
          minimap={minimap}
          onChange={(newVal) => onContentChange(activeFile.path, newVal)}
          onRun={onRun}
          onSaveDraft={onSaveDraft}
          onMountCallback={(inst) => {
            editorInstanceRef.current = inst;
          }}
        />
      </div>

      {/* 4. Modular Bottom Workspace (Input, Output, Run, and Submit Experiences) */}
      <BottomWorkspace
        isOpen={isConsoleOpen}
        height={consoleHeight}
        currentLanguage={currentLanguage}
        code={activeFile.content}
        activeFileName={activeFile.name}
        testCases={testCases}
        logs={logs}
        isRunning={isRunning}
        onToggleOpen={onToggleConsole}
        onHeightChange={onHeightChange}
        onRunCode={onRun ? onRun : () => {}}
        onSubmitCode={onSubmit ? onSubmit : () => {}}
        onClearLogs={onClearLogs}
      />
    </div>
  );
};
