import React, { useEffect, useRef, useCallback } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { SupportedLanguage } from '../../types';

interface MonacoCodeEditorProps {
  filePath: string;
  language: SupportedLanguage;
  content: string;
  fontSize?: number;
  wordWrap?: 'on' | 'off';
  isReadOnly?: boolean;
  tabSize?: number;
  lineNumbers?: 'on' | 'off';
  bracketPairColorization?: boolean;
  minimap?: boolean;
  onChange: (value: string) => void;
  onRun?: () => void;
  onSaveDraft?: () => void;
  onMountCallback?: (editorInstance: editor.IStandaloneCodeEditor) => void;
}

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  filePath,
  language,
  content,
  fontSize = 13,
  wordWrap = 'off',
  isReadOnly = false,
  tabSize = 4,
  lineNumbers = 'on',
  bracketPairColorization = true,
  minimap = false,
  onChange,
  onRun,
  onSaveDraft,
  onMountCallback,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Configure custom reference theme matching CodeChef assessment light mode
  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('assessment-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0000ff', fontStyle: 'bold' },
        { token: 'string', foreground: 'a31515' },
        { token: 'number', foreground: '098658' },
        { token: 'type', foreground: '267f99' },
        { token: 'delimiter', foreground: '000000' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0f172a',
        'editor.lineHighlightBackground': '#f8fafc',
        'editor.lineHighlightBorder': '#f1f5f9',
        'editorGutter.background': '#ffffff',
        'editorLineNumber.foreground': '#94a3b8',
        'editorLineNumber.activeForeground': '#0f172a',
        'editorIndentGuide.background': '#e5e7eb',
        'editorIndentGuide.activeBackground': '#cbd5e1',
        'editorBracketMatch.background': '#e2e8f0',
        'editorBracketMatch.border': '#94a3b8',
        'editorCursor.foreground': '#0f172a',
        'scrollbarSlider.background': '#cbd5e180',
        'scrollbarSlider.hoverBackground': '#94a3b8b0',
        'scrollbarSlider.activeBackground': '#64748bcc',
      },
    });
  };

  const handleEditorMount: OnMount = (monacoEditor, monaco) => {
    editorRef.current = monacoEditor;
    onMountCallback?.(monacoEditor);

    // Bind Ctrl+Enter inside the editor to execute Run
    if (onRun) {
      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRun();
      });
    }

    // Bind Ctrl+S inside the editor to save local draft
    if (onSaveDraft) {
      monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        onSaveDraft();
      });
    }

    // Explicitly layout to ensure correct geometry
    monacoEditor.layout();
  };

  // Robust container resizing using ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimer: number;
    const observer = new ResizeObserver(() => {
      // Debounce layout call for smooth resizing
      window.cancelAnimationFrame(resizeTimer);
      resizeTimer = window.requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.layout();
        }
      });
    });

    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(resizeTimer);
      observer.disconnect();
    };
  }, []);

  // Update layout when editor settings change
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize,
        wordWrap,
        tabSize,
        lineNumbers,
        bracketPairColorization: { enabled: bracketPairColorization },
        minimap: { enabled: minimap },
      });
      editorRef.current.layout();
    }
  }, [fontSize, wordWrap, tabSize, lineNumbers, bracketPairColorization, minimap]);

  const handleContentChange = useCallback(
    (value: string | undefined) => {
      onChange(value ?? '');
    },
    [onChange]
  );

  // Map application language to Monaco language identifier
  const getMonacoLanguage = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      case 'typescript':
        return 'typescript';
      case 'sql':
        return 'sql';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <Editor
        key={filePath}
        height="100%"
        width="100%"
        language={getMonacoLanguage(language)}
        value={content}
        theme="assessment-light"
        beforeMount={handleBeforeMount}
        onMount={handleEditorMount}
        onChange={handleContentChange}
        options={{
          readOnly: isReadOnly,
          fontSize,
          fontFamily: "Consolas, 'Courier New', monospace",
          fontLigatures: false,
          lineNumbers,
          lineNumbersMinChars: 3,
          lineDecorationsWidth: 10,
          glyphMargin: false,
          folding: true,
          foldingStrategy: 'auto',
          showFoldingControls: 'mouseover',
          matchBrackets: 'always',
          bracketPairColorization: { enabled: bracketPairColorization },
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          renderLineHighlight: 'all',
          renderLineHighlightOnlyWhenFocus: false,
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize,
          insertSpaces: true,
          autoIndent: 'advanced',
          detectIndentation: false,
          wordWrap,
          cursorBlinking: 'blink',
          cursorSmoothCaretAnimation: 'on',
          cursorStyle: 'line',
          cursorWidth: 2,
          minimap: { enabled: minimap }, // Configurable via Settings
          guides: {
            indentation: true,
            bracketPairs: true,
          },
          scrollbar: {
            vertical: 'visible',
            horizontal: 'auto',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
            useShadows: false,
          },
          fixedOverflowWidgets: true,
          accessibilitySupport: 'on',
          contextmenu: false, // Prevents OS/Browser context menu in SEB environment
        }}
      />
    </div>
  );
};
