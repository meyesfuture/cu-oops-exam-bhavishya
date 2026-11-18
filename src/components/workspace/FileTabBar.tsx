import React from 'react';
import { X, Columns, MoreHorizontal } from 'lucide-react';
import { TabInfo, SupportedLanguage } from '../../types';

interface FileTabBarProps {
  tabs: TabInfo[];
  activePath: string;
  onSelectTab: (path: string) => void;
  onCloseTab?: (path: string) => void;
}

export const FileTabBar: React.FC<FileTabBarProps> = ({
  tabs,
  activePath,
  onSelectTab,
  onCloseTab,
}) => {
  const getLanguageBadge = (lang: SupportedLanguage) => {
    switch (lang) {
      case 'java':
        return <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '11px' }}>J</span>;
      case 'python':
        return <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '11px' }}>PY</span>;
      case 'cpp':
        return <span style={{ color: '#6366f1', fontWeight: 800, fontSize: '11px' }}>C++</span>;
      case 'typescript':
        return <span style={{ color: '#3b82f6', fontWeight: 800, fontSize: '11px' }}>TS</span>;
      default:
        return <span style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: '11px' }}>F</span>;
    }
  };

  return (
    <div
      role="tablist"
      aria-label="File buffers"
      style={{
        height: 'var(--tab-bar-height)',
        minHeight: 'var(--tab-bar-height)',
        backgroundColor: 'var(--bg-chrome)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-2)',
        overflowX: 'auto',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* File Tabs List */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
        {tabs.map((tab) => {
          const isActive = tab.path === activePath;
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
                padding: '0 14px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-tab-active)' : 'transparent',
                borderTop: isActive ? '2px solid var(--border-active-tab)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all var(--duration-fast) ease',
              }}
            >
              {getLanguageBadge(tab.language)}
              <span>{tab.title}</span>

              {tab.isModified && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--status-in-progress)',
                  }}
                  title="Unsaved changes"
                />
              )}

              {tabs.length > 1 && onCloseTab && (
                <button
                  type="button"
                  title={`Close ${tab.title}`}
                  aria-label={`Close tab ${tab.title}`}
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
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '2px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Tab Strip Right Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          type="button"
          title="Split Editor"
          aria-label="Split Editor View"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '26px',
            height: '26px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Columns size={13} />
        </button>

        <button
          type="button"
          title="More Tab Options"
          aria-label="More Tab Options"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '26px',
            height: '26px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <MoreHorizontal size={13} />
        </button>
      </div>
    </div>
  );
};
