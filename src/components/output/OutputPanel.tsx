import React, { useState } from 'react';
import { Copy, Check, Trash2, Clock, Cpu, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

interface OutputPanelProps {
  stdout: string;
  stderr: string;
  executionTimeMs?: number;
  memoryMb?: number;
  exitCode?: number;
  isSimulated?: boolean;
  onClearOutput?: () => void;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  stdout,
  stderr,
  executionTimeMs = 0,
  memoryMb = 0,
  exitCode = 0,
  isSimulated = true,
  onClearOutput,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'all' | 'stdout' | 'stderr'>('all');

  const fullOutput = [
    stdout ? stdout : '',
    stderr ? `[STDERR / ERRORS]\n${stderr}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const handleCopy = async () => {
    const textToCopy =
      activeView === 'stdout' ? stdout : activeView === 'stderr' ? stderr : fullOutput;
    if (!textToCopy) return;

    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasOutput = stdout.length > 0 || stderr.length > 0;

  return (
    <div
      role="region"
      aria-label="Execution Output Panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Output Toolbar & Stream Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 12px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        {/* Left: Stream Filters */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={() => setActiveView('all')}
            style={{
              padding: '3px 8px',
              fontSize: '11px',
              fontWeight: activeView === 'all' ? 600 : 500,
              backgroundColor: activeView === 'all' ? '#e0f2fe' : 'transparent',
              color: activeView === 'all' ? '#0284c7' : '#64748b',
              border: activeView === 'all' ? '1px solid #bfdbfe' : '1px solid transparent',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            All Output
          </button>
          <button
            type="button"
            onClick={() => setActiveView('stdout')}
            style={{
              padding: '3px 8px',
              fontSize: '11px',
              fontWeight: activeView === 'stdout' ? 600 : 500,
              backgroundColor: activeView === 'stdout' ? '#f0fdf4' : 'transparent',
              color: activeView === 'stdout' ? '#15803d' : '#64748b',
              border: activeView === 'stdout' ? '1px solid #bbf7d0' : '1px solid transparent',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            stdout
          </button>
          <button
            type="button"
            onClick={() => setActiveView('stderr')}
            style={{
              padding: '3px 8px',
              fontSize: '11px',
              fontWeight: activeView === 'stderr' ? 600 : 500,
              backgroundColor: activeView === 'stderr' ? '#fef2f2' : 'transparent',
              color: activeView === 'stderr' ? '#b91c1c' : '#64748b',
              border: activeView === 'stderr' ? '1px solid #fecaca' : '1px solid transparent',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {stderr ? <AlertTriangle size={11} color="#b91c1c" /> : null}
            <span>stderr {stderr ? '(Errors)' : ''}</span>
          </button>
        </div>

        {/* Right: Copy & Clear Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!hasOutput}
            title="Copy output text to clipboard"
            aria-label="Copy output"
            style={{
              padding: '3px 8px',
              fontSize: '11px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '3px',
              color: '#334155',
              cursor: hasOutput ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {copied ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy Output'}</span>
          </button>

          <button
            type="button"
            onClick={onClearOutput}
            disabled={!hasOutput}
            title="Clear output console"
            aria-label="Clear output"
            style={{
              padding: '3px 8px',
              fontSize: '11px',
              backgroundColor: '#ffffff',
              border: '1px solid #fecaca',
              borderRadius: '3px',
              color: '#dc2626',
              cursor: hasOutput ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Trash2 size={12} color="#dc2626" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Output Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px',
          backgroundColor: '#ffffff',
          fontFamily: "Consolas, 'Courier New', monospace",
          fontSize: '12.5px',
          lineHeight: 1.5,
          color: '#0f172a',
          whiteSpace: 'pre-wrap',
        }}
      >
        {!hasOutput ? (
          <div style={{ color: '#94a3b8', fontStyle: 'italic', padding: '16px 0' }}>
            No execution output available. Click &ldquo;Run&rdquo; to execute sample assertions or custom input.
          </div>
        ) : (
          <>
            {(activeView === 'all' || activeView === 'stdout') && stdout && (
              <div style={{ color: '#0f172a', marginBottom: stderr ? '16px' : 0 }}>
                {stdout}
              </div>
            )}

            {(activeView === 'all' || activeView === 'stderr') && stderr && (
              <div
                style={{
                  color: '#b91c1c',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {stderr}
              </div>
            )}
          </>
        )}
      </div>

      {/* Execution Information Bar */}
      <div
        style={{
          height: '28px',
          minHeight: '28px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '11px',
          color: '#475569',
          userSelect: 'none',
        }}
      >
        {/* Left: Execution Status & Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {hasOutput && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: exitCode === 0 ? '#15803d' : '#b91c1c',
                fontWeight: 600,
              }}
            >
              {exitCode === 0 ? (
                <CheckCircle2 size={13} color="#16a34a" />
              ) : (
                <AlertTriangle size={13} color="#dc2626" />
              )}
              <span>Exit Code: {exitCode}</span>
            </div>
          )}

          {executionTimeMs > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} color="#64748b" />
              <span>Time: {executionTimeMs} ms</span>
            </div>
          )}

          {memoryMb > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Cpu size={12} color="#64748b" />
              <span>Memory: {memoryMb.toFixed(1)} MB</span>
            </div>
          )}
        </div>

        {/* Right: Simulation Notice */}
        {isSimulated && (
          <div
            title="Simulated client execution runtime for offline practice"
            style={{
              fontSize: '10.5px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              padding: '2px 8px',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
            }}
          >
            ⚡ Client Simulation Runner
          </div>
        )}
      </div>
    </div>
  );
};
