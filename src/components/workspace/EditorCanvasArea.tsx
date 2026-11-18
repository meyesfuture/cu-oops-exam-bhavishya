import React from 'react';
import { VirtualFile } from '../../types';

interface EditorCanvasAreaProps {
  activeFile: VirtualFile;
  fontSize?: number;
}

export const EditorCanvasArea: React.FC<EditorCanvasAreaProps> = ({
  activeFile,
  fontSize = 13.5,
}) => {
  const lines = activeFile.content.split('\n');

  return (
    <div
      role="region"
      aria-label="Code Editor Region"
      style={{
        flex: 1,
        minHeight: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'var(--bg-editor)',
        display: 'flex',
        overflow: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: `${fontSize}px`,
        lineHeight: 1.55,
        userSelect: 'text',
        position: 'relative',
      }}
    >
      {/* Line Numbers Gutter */}
      <div
        aria-hidden="true"
        style={{
          width: '46px',
          minWidth: '46px',
          backgroundColor: 'var(--bg-editor)',
          borderRight: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)',
          textAlign: 'right',
          paddingRight: '10px',
          paddingTop: '8px',
          paddingBottom: '24px',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {lines.map((_, i) => (
          <div
            key={i}
            style={{
              height: '21px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              fontSize: '12px',
              opacity: 0.7,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Code Buffer Content Area */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          paddingLeft: '12px',
          paddingRight: '24px',
          paddingTop: '8px',
          paddingBottom: '24px',
          whiteSpace: 'pre',
          tabSize: 4,
          color: 'var(--text-primary)',
        }}
      >
        {lines.map((line, idx) => {
          // Highlight current active line (e.g. line 6)
          const isCursorLine = idx === 5;

          return (
            <div
              key={idx}
              style={{
                height: '21px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isCursorLine ? 'var(--bg-hover)' : 'transparent',
                borderRadius: '2px',
                paddingRight: '8px',
                position: 'relative',
              }}
            >
              <code style={{ fontFamily: 'inherit' }}>
                {renderSyntaxTokenizedLine(line)}
              </code>
              {isCursorLine && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '16px',
                    backgroundColor: 'var(--brand-primary)',
                    marginLeft: '2px',
                    animation: 'blink 1s step-start infinite',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Lightweight syntax colorizer for the placeholder preview
 */
function renderSyntaxTokenizedLine(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span style={{ color: '#6a737d', fontStyle: 'italic' }}>{line}</span>;
  }

  // Keywords colorizer
  const keywords = [
    'package', 'import', 'public', 'private', 'class', 'static', 'final',
    'void', 'int', 'long', 'boolean', 'return', 'if', 'else', 'while', 'for',
    'new', 'null', 'throws', 'throw', 'try', 'catch', 'def', 'const', 'let',
  ];

  const words = line.split(/(\s+|[();,.<>{}\[\]=+\-*\/])/);

  return words.map((chunk, i) => {
    if (keywords.includes(chunk)) {
      return (
        <span key={i} style={{ color: '#0969da', fontWeight: 600 }}>
          {chunk}
        </span>
      );
    }
    if (chunk.startsWith('"') || chunk.endsWith('"')) {
      return (
        <span key={i} style={{ color: '#0a3069' }}>
          {chunk}
        </span>
      );
    }
    if (/^\d+$/.test(chunk)) {
      return (
        <span key={i} style={{ color: '#0550ae' }}>
          {chunk}
        </span>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}
