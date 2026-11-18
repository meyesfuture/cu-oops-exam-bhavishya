import React from 'react';
import { ChevronRight, FileCode } from 'lucide-react';

interface EditorToolbarProps {
  filePath: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ filePath }) => {
  const segments = filePath.split('/');

  return (
    <div
      aria-label="Breadcrumbs and Editor Metadata"
      style={{
        height: 'var(--breadcrumb-height)',
        minHeight: 'var(--breadcrumb-height)',
        backgroundColor: 'var(--bg-editor)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-4)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--text-muted)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Left: Breadcrumbs Trail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}>
        <FileCode size={13} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          return (
            <React.Fragment key={idx}>
              <span
                style={{
                  color: isLast ? 'var(--text-primary)' : 'inherit',
                  fontWeight: isLast ? 600 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {seg}
              </span>
              {!isLast && <ChevronRight size={11} style={{ opacity: 0.5, flexShrink: 0 }} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right: Encoding and Indentation Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
        <span>UTF-8</span>
        <span>Spaces: 4</span>
        <span>LF</span>
      </div>
    </div>
  );
};
