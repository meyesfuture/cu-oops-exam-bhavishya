import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, XCircle, Terminal as TerminalIcon } from 'lucide-react';
import { ConsoleTab, TestCase, ConsoleLogEntry } from '../../types';
import { IconButton } from '../common/IconButton';
import { formatExecutionTime, formatMemory } from '../../utils/formatters';

interface ConsoleDrawerProps {
  isOpen: boolean;
  height: number;
  testCases: TestCase[];
  customInput: string;
  logs: ConsoleLogEntry[];
  onToggleOpen: () => void;
  onCustomInputChange: (input: string) => void;
  onHeightChange?: (height: number) => void;
}

export const ConsoleDrawer: React.FC<ConsoleDrawerProps> = ({
  isOpen,
  height,
  testCases,
  customInput,
  logs,
  onToggleOpen,
  onCustomInputChange,
}) => {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('testcases');

  if (!isOpen) {
    return (
      <div
        style={{
          height: '28px',
          backgroundColor: 'var(--bg-chrome)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={onToggleOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TerminalIcon size={14} />
          <span>Console &amp; Test Cases</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--brand-primary)' }}>Click to open</span>
      </div>
    );
  }

  return (
    <div
      style={{
        height: `${height}px`,
        backgroundColor: 'var(--bg-drawer)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Drawer Tab Header */}
      <div
        style={{
          height: '32px',
          backgroundColor: 'var(--bg-chrome)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          fontSize: 'var(--font-size-xs)',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {(
            [
              { id: 'testcases', label: 'Test Cases' },
              { id: 'custom_input', label: 'Custom Input' },
              { id: 'console', label: 'Output Log' },
              { id: 'diff', label: 'Diff View' },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '4px 10px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--brand-primary)' : 'none',
                  backgroundColor: 'transparent',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <IconButton
          icon={<ChevronDown size={14} />}
          label="Collapse Console Drawer"
          size="sm"
          onClick={onToggleOpen}
        />
      </div>

      {/* Drawer Tab Content Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        {activeTab === 'testcases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {testCases.map((tc) => (
              <div
                key={tc.id}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-xs)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {tc.status === 'passed' && (
                    <CheckCircle2 size={16} color="var(--status-submitted)" />
                  )}
                  {tc.status === 'failed' && <XCircle size={16} color="var(--status-error)" />}
                  {tc.status === 'idle' && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--status-not-attempted)',
                      }}
                    />
                  )}
                  <span style={{ fontWeight: 600 }}>{tc.name}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                  <span>Time: {formatExecutionTime(tc.executionTimeMs)}</span>
                  <span>Memory: {formatMemory(tc.memoryMb)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'custom_input' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <label
              htmlFor="custom-stdin-input"
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
              }}
            >
              Enter standard input (stdin) for test execution:
            </label>
            <textarea
              id="custom-stdin-input"
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="e.g. 5\nADD 101 Laptop 55000.00 5\n..."
              style={{
                flex: 1,
                minHeight: '80px',
                padding: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12.5px',
                backgroundColor: 'var(--bg-chrome)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                resize: 'none',
              }}
            />
          </div>
        )}

        {activeTab === 'console' && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-code-box)',
              backgroundColor: 'var(--bg-code-box)',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              minHeight: '80px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {logs.length === 0 ? (
              <span style={{ color: 'var(--text-muted)' }}>No execution logs yet. Click Run to execute code.</span>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    color: log.type === 'stderr' ? 'var(--status-error)' : 'inherit',
                  }}
                >
                  {log.message}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'diff' && (
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
            Diff viewer will compare actual compiler output with test case expected outputs.
          </div>
        )}
      </div>
    </div>
  );
};
