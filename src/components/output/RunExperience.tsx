import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  AlertTriangle,
  Play,
  Copy,
  Check,
} from 'lucide-react';
import { TestCase } from '../../types';
import { copyToClipboard } from '../../utils/clipboard';

interface RunExperienceProps {
  isRunning: boolean;
  progressText?: string;
  progressPercent?: number;
  testCases: TestCase[];
  stdout?: string;
  stderr?: string;
  onRunAgain?: () => void;
}

export const RunExperience: React.FC<RunExperienceProps> = ({
  isRunning,
  progressText = 'Compiling and executing test assertions...',
  progressPercent = 0,
  testCases,
  stdout,
  stderr,
  onRunAgain,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(testCases[0]?.id ?? '');
  const [copiedInput, setCopiedInput] = useState(false);

  const activeCase = testCases.find((tc) => tc.id === selectedCaseId) ?? testCases[0];

  const handleCopyInput = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    }
  };

  const allPassed = testCases.length > 0 && testCases.every((tc) => tc.status === 'passed');
  const anyFailed = testCases.some((tc) => tc.status === 'failed');

  return (
    <div
      role="region"
      aria-label="Run Test Cases Experience"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Running Progress Banner */}
      {isRunning && (
        <div
          style={{
            padding: '8px 14px',
            backgroundColor: '#f0f9ff',
            borderBottom: '1px solid #bae6fd',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            animation: 'fadeIn 120ms ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Loader2 size={15} color="#0284c7" className="animate-spin" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0369a1' }}>
                {progressText}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600 }}>
              {Math.round(progressPercent)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e0f2fe',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#0284c7',
                transition: 'width 200ms ease',
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Run Status Bar */}
      {!isRunning && testCases.length > 0 && testCases.some((t) => t.status !== 'idle') && (
        <div
          style={{
            padding: '8px 14px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: allPassed ? '#f0fdf4' : anyFailed ? '#fef2f2' : '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {allPassed ? (
              <CheckCircle2 size={16} color="#16a34a" />
            ) : (
              <XCircle size={16} color="#dc2626" />
            )}
            <span
              style={{
                fontWeight: 700,
                color: allPassed ? '#15803d' : '#b91c1c',
              }}
            >
              {allPassed
                ? 'All Sample Test Cases Passed!'
                : 'Sample Test Assertion Mismatch'}
            </span>
            <span style={{ color: '#64748b', fontSize: '11px' }}>
              ({testCases.filter((t) => t.status === 'passed').length}/{testCases.length} assertions passed)
            </span>
          </div>

          {onRunAgain && (
            <button
              type="button"
              onClick={onRunAgain}
              style={{
                padding: '3px 10px',
                fontSize: '11px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                color: '#1e293b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
              }}
            >
              <Play size={10} fill="#0284c7" color="#0284c7" />
              <span>Run Again</span>
            </button>
          )}
        </div>
      )}

      {/* 3. Error Banner (if compilation or runtime error happened) */}
      {stderr && (
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: '#fef2f2',
            borderBottom: '1px solid #fecaca',
            color: '#b91c1c',
            fontSize: '12px',
            fontFamily: "Consolas, 'Courier New', monospace",
            whiteSpace: 'pre-wrap',
            display: 'flex',
            gap: '8px',
          }}
        >
          <AlertTriangle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>{stderr}</div>
        </div>
      )}

      {/* 4. Test Cases Split View */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
        {/* Left Side: Test Case Pills List */}
        <div
          style={{
            width: '180px',
            minWidth: '180px',
            borderRight: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto',
            userSelect: 'none',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', padding: '2px 4px' }}>
            TEST CASES
          </div>
          {testCases.map((tc, idx) => {
            const isSelected = tc.id === (activeCase?.id ?? '');
            const isPassed = tc.status === 'passed';
            const isFailed = tc.status === 'failed';
            return (
              <button
                key={tc.id}
                type="button"
                onClick={() => setSelectedCaseId(tc.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '4px',
                  border: isSelected ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#ffffff' : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: isPassed ? '#16a34a' : isFailed ? '#dc2626' : '#94a3b8',
                    }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: isSelected ? 600 : 500, color: '#1e293b' }}>
                    {tc.name || `Case ${idx + 1}`}
                  </span>
                </div>
                {tc.executionTimeMs !== undefined && (
                  <span style={{ fontSize: '10px', color: '#64748b' }}>
                    {tc.executionTimeMs.toFixed(0)}ms
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Selected Case Details (Input, Expected, Actual Output) */}
        {activeCase ? (
          <div
            style={{
              flex: 1,
              padding: '12px 16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Input Box */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#475569',
                  marginBottom: '4px',
                }}
              >
                <span>INPUT</span>
                <button
                  type="button"
                  onClick={() => handleCopyInput(activeCase.input)}
                  title="Copy test case input"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#64748b',
                    fontSize: '11px',
                  }}
                >
                  {copiedInput ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                  <span>{copiedInput ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontFamily: "Consolas, 'Courier New', monospace",
                  fontSize: '12px',
                  color: '#0f172a',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {activeCase.input || '<empty input>'}
              </pre>
            </div>

            {/* Expected Output vs Actual Output */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  EXPECTED OUTPUT
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '8px 12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    fontFamily: "Consolas, 'Courier New', monospace",
                    fontSize: '12px',
                    color: '#0f172a',
                    whiteSpace: 'pre-wrap',
                    minHeight: '60px',
                  }}
                >
                  {activeCase.expectedOutput || '<empty>'}
                </pre>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: activeCase.status === 'passed' ? '#15803d' : '#b91c1c',
                    marginBottom: '4px',
                  }}
                >
                  ACTUAL OUTPUT {activeCase.status === 'passed' ? '(MATCH)' : activeCase.status === 'failed' ? '(MISMATCH)' : ''}
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '8px 12px',
                    backgroundColor: activeCase.status === 'passed' ? '#f0fdf4' : activeCase.status === 'failed' ? '#fef2f2' : '#f8fafc',
                    border: activeCase.status === 'passed' ? '1px solid #bbf7d0' : activeCase.status === 'failed' ? '1px solid #fecaca' : '1px solid #e2e8f0',
                    borderRadius: '4px',
                    fontFamily: "Consolas, 'Courier New', monospace",
                    fontSize: '12px',
                    color: activeCase.status === 'passed' ? '#15803d' : activeCase.status === 'failed' ? '#b91c1c' : '#64748b',
                    whiteSpace: 'pre-wrap',
                    minHeight: '60px',
                  }}
                >
                  {activeCase.actualOutput ?? stdout ?? '<run code to produce output>'}
                </pre>
              </div>
            </div>

            {/* Execution Metadata Pill */}
            {activeCase.executionTimeMs !== undefined && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '11px',
                  color: '#64748b',
                  backgroundColor: '#f8fafc',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>Execution Time: {activeCase.executionTimeMs.toFixed(0)} ms</span>
                </div>
                <div>•</div>
                <div>Memory: {activeCase.memoryMb?.toFixed(1) ?? 16.2} MB</div>
                <div>•</div>
                <div style={{ color: '#0284c7' }}>⚡ Simulated practice execution</div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '24px', color: '#94a3b8' }}>No test cases loaded.</div>
        )}
      </div>
    </div>
  );
};
