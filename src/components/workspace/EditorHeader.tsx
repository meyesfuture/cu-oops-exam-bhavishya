import React from 'react';
import { RotateCcw, Keyboard, Settings2, Code2, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '../../types';

interface EditorHeaderProps {
  language: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onResetCode?: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  language,
  onLanguageChange,
  onResetCode,
}) => {
  return (
    <div
      style={{
        height: '42px',
        minHeight: '42px',
        backgroundColor: 'var(--bg-chrome)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-3)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Left: Language Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            padding: '4px 10px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Code2 size={14} style={{ color: 'var(--brand-primary)' }} />
          <select
            value={language}
            onChange={(e) => onLanguageChange?.(e.target.value as SupportedLanguage)}
            aria-label="Programming Language Selector"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
              paddingRight: '4px',
            }}
          >
            <option value="java">Java (OpenJDK 17)</option>
            <option value="cpp">C++ 20 (GCC 12)</option>
            <option value="python">Python 3.11</option>
            <option value="typescript">TypeScript 5.x</option>
          </select>
          <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
        </div>

        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-hover)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          JDK 17.0.8
        </span>
      </div>

      {/* Right: Quick Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {/* Keyboard shortcut hint */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-hover)',
            border: '1px solid var(--border-subtle)',
          }}
          title="Press Ctrl+Enter to Run"
        >
          <Keyboard size={12} />
          <span>Ctrl+Enter</span>
        </div>

        {/* Reset Code Action Button */}
        <button
          type="button"
          onClick={onResetCode}
          title="Revert to boilerplate solution"
          aria-label="Reset code to starter template"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            backgroundColor: 'transparent',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all var(--duration-fast) ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <RotateCcw size={12} />
          <span>Reset Code</span>
        </button>

        {/* Settings button */}
        <button
          type="button"
          title="Editor Settings"
          aria-label="Editor Settings"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            background: 'transparent',
            border: '1px solid transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <Settings2 size={14} />
        </button>
      </div>
    </div>
  );
};
