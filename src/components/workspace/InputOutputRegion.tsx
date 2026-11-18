import React, { useState } from 'react';
import { ChevronUp, ChevronDown, CheckCircle2, Terminal, Sliders, Columns } from 'lucide-react';
import { ConsoleTab, TestCase, ConsoleLogEntry } from '../../types';

interface InputOutputRegionProps {
  isOpen: boolean;
  height: number;
  testCases: TestCase[];
  customInput: string;
  logs: ConsoleLogEntry[];
  onToggleOpen: () => void;
  onHeightChange?: (h: number) => void;
  onCustomInputChange: (val: string) => void;
}

export const InputOutputRegion: React.FC<InputOutputRegionProps> = ({
  isOpen,
  height,
  testCases,
  customInput,
  logs,
  onToggleOpen,
  onHeightChange,
  onCustomInputChange,
}) => {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('testcases');
  const [selectedTestCaseId, setSelectedTestCaseId] = useState<string>(testCases[0]?.id || 'tc-1');

  const selectedTestCase = testCases.find((tc) => tc.id === selectedTestCaseId) || testCases[0];

  const handleResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = startY - moveEvent.clientY;
      const newHeight = Math.max(120, Math.min(500, startHeight + deltaY));
      onHeightChange?.(newHeight);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div
      role="region"
      aria-label="Test Runner and Output Console"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        backgroundColor: 'var(--bg-drawer)',
        borderTop: '1px solid var(--border-subtle)',
        userSelect: 'none',
      }}
    >
      {/* Drawer Title Bar / Collapsed Bar */}
      <div
        onClick={onToggleOpen}
        style={{
          height: '28px',
          minHeight: '28px',
          backgroundColor: 'var(--bg-chrome)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--space-3)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          borderBottom: isOpen ? '1px solid var(--border-subtle)' : 'none',
          transition: 'background-color var(--duration-fast) ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-chrome)')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <Terminal size={13} style={{ color: 'var(--brand-primary)' }} />
          <span>Console & Test Runner</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {isOpen ? 'Click to collapse' : 'Click to expand'}
          </span>
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>

      {/* Expanded Region Body */}
      {isOpen && (
        <>
          {/* Horizontal Resizer Handle */}
          <div
            onPointerDown={handleResizeStart}
            role="separator"
            aria-orientation="horizontal"
            aria-label="Resize console drawer"
            title="Drag to resize console height"
            style={{
              height: '4px',
              backgroundColor: 'var(--border-subtle)',
              cursor: 'row-resize',
              transition: 'background-color var(--duration-fast) ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-subtle)')}
          />

          <div
            style={{
              height: `${height}px`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
          {/* Tabs Bar */}
          <div
            role="tablist"
            style={{
              height: '32px',
              minHeight: '32px',
              backgroundColor: 'var(--bg-chrome)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 var(--space-2)',
              gap: '4px',
            }}
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'testcases'}
              onClick={() => setActiveTab('testcases')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeTab === 'testcases' ? 600 : 500,
                color: activeTab === 'testcases' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'testcases' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              <CheckCircle2 size={12} />
              <span>Test Cases</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'custom_input'}
              onClick={() => setActiveTab('custom_input')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeTab === 'custom_input' ? 600 : 500,
                color: activeTab === 'custom_input' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'custom_input' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              <Sliders size={12} />
              <span>Custom Input</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'console'}
              onClick={() => setActiveTab('console')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeTab === 'console' ? 600 : 500,
                color: activeTab === 'console' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'console' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              <Terminal size={12} />
              <span>Execution Output</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'diff'}
              onClick={() => setActiveTab('diff')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeTab === 'diff' ? 600 : 500,
                color: activeTab === 'diff' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'diff' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              <Columns size={12} />
              <span>Diff Viewer</span>
            </button>
          </div>

          {/* Tab Panels */}
          <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: 'var(--space-3)' }}>
            {/* Test Cases Panel */}
            {activeTab === 'testcases' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {/* Horizontal Test Case Selection Pills */}
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {testCases.map((tc) => {
                    const isSelected = tc.id === selectedTestCase?.id;
                    const isPassed = tc.status === 'passed';
                    const isFailed = tc.status === 'failed';

                    return (
                      <button
                        key={tc.id}
                        type="button"
                        onClick={() => setSelectedTestCaseId(tc.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: isSelected ? 600 : 500,
                          backgroundColor: isSelected ? 'var(--bg-hover)' : 'var(--bg-chrome)',
                          border: isSelected ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: isPassed
                              ? 'var(--status-submitted)'
                              : isFailed
                              ? 'var(--status-error)'
                              : 'var(--status-not-attempted)',
                          }}
                        />
                        <span>{tc.name}</span>
                        {tc.executionTimeMs && (
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            ({tc.executionTimeMs.toFixed(0)}ms)
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Test Case Details */}
                {selectedTestCase && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-3)',
                      userSelect: 'text',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Input
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          padding: '8px',
                          backgroundColor: 'var(--bg-code-box)',
                          color: 'var(--text-code-box)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '11.5px',
                          fontFamily: 'var(--font-mono)',
                          overflowX: 'auto',
                          maxHeight: '120px',
                        }}
                      >
                        <code>{selectedTestCase.input}</code>
                      </pre>
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Expected Output
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          padding: '8px',
                          backgroundColor: 'var(--bg-code-box)',
                          color: 'var(--text-code-box)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '11.5px',
                          fontFamily: 'var(--font-mono)',
                          overflowX: 'auto',
                          maxHeight: '120px',
                        }}
                      >
                        <code>{selectedTestCase.expectedOutput}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Custom Input Panel */}
            {activeTab === 'custom_input' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '6px' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  Provide custom test inputs for the compiler (passed via stdin):
                </span>
                <textarea
                  value={customInput}
                  onChange={(e) => onCustomInputChange(e.target.value)}
                  placeholder="Enter custom test cases here..."
                  style={{
                    flex: 1,
                    width: '100%',
                    minHeight: '100px',
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>
            )}

            {/* Console Output Panel */}
            {activeTab === 'console' && (
              <div
                style={{
                  height: '100%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  userSelect: 'text',
                  color: 'var(--text-secondary)',
                }}
              >
                {logs.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px' }}>
                    No compilation or runtime logs yet. Click "▶ Run" to execute code.
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      style={{
                        color:
                          log.type === 'stderr'
                            ? 'var(--status-error)'
                            : log.type === 'info'
                            ? 'var(--brand-primary)'
                            : 'var(--text-primary)',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {log.message}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Diff Viewer Panel */}
            {activeTab === 'diff' && (
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                <div style={{ padding: '8px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Diff comparison will display side-by-side assertion discrepancies after test execution.
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </div>
);
};
