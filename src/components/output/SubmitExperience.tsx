import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  Loader2,
  RefreshCw,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { SubmissionResult, SubmissionVerdict } from '../../types';

interface SubmitExperienceProps {
  isJudging: boolean;
  judgingStage?: string;
  judgingPercent?: number;
  result: SubmissionResult | null;
  onSimulateVerdictChange?: (verdict: 'auto' | SubmissionVerdict) => void;
  currentSimulatedVerdictMode?: 'auto' | SubmissionVerdict;
  onReSubmit?: () => void;
}

export const SubmitExperience: React.FC<SubmitExperienceProps> = ({
  isJudging,
  judgingStage = 'Evaluating code across hidden test suites...',
  judgingPercent = 0,
  result,
  onSimulateVerdictChange,
  currentSimulatedVerdictMode = 'auto',
  onReSubmit,
}) => {
  const getVerdictStyle = (verdict?: SubmissionVerdict) => {
    switch (verdict) {
      case 'Accepted':
        return {
          bg: '#f0fdf4',
          border: '#bbf7d0',
          text: '#15803d',
          badgeBg: '#dcfce7',
          badgeText: '#166534',
          icon: <CheckCircle2 size={24} color="#16a34a" />,
          title: 'Accepted',
          subtext: 'Congratulations! All hidden assessment test cases passed.',
        };
      case 'Wrong Answer':
        return {
          bg: '#fef2f2',
          border: '#fecaca',
          text: '#b91c1c',
          badgeBg: '#fee2e2',
          badgeText: '#991b1b',
          icon: <XCircle size={24} color="#dc2626" />,
          title: 'Wrong Answer',
          subtext: 'Your code produced incorrect output on one or more test cases.',
        };
      case 'Compilation Error':
        return {
          bg: '#fffbeb',
          border: '#fde68a',
          text: '#b45309',
          badgeBg: '#fef3c7',
          badgeText: '#92400e',
          icon: <AlertTriangle size={24} color="#d97706" />,
          title: 'Compilation Error',
          subtext: 'Source code failed to compile with target toolchain.',
        };
      case 'Runtime Error':
        return {
          bg: '#faf5ff',
          border: '#e9d5ff',
          text: '#7e22ce',
          badgeBg: '#f3e8ff',
          badgeText: '#6b21a8',
          icon: <AlertTriangle size={24} color="#9333ea" />,
          title: 'Runtime Error',
          subtext: 'Program encountered an unhandled exception or crash during execution (SIGSEGV / Exception).',
        };
      case 'Time Limit Exceeded':
        return {
          bg: '#fff7ed',
          border: '#fed7aa',
          text: '#c2410c',
          badgeBg: '#ffedd5',
          badgeText: '#9a3412',
          icon: <Clock size={24} color="#ea580c" />,
          title: 'Time Limit Exceeded',
          subtext: 'Execution exceeded the 1.000s CPU threshold on large scale inputs.',
        };
      default:
        return {
          bg: '#f8fafc',
          border: '#e2e8f0',
          text: '#475569',
          badgeBg: '#f1f5f9',
          badgeText: '#334155',
          icon: <Clock size={24} color="#64748b" />,
          title: 'Evaluation Pending',
          subtext: 'Submit your solution to trigger full grading evaluation.',
        };
    }
  };

  const style = getVerdictStyle(result?.verdict);

  return (
    <div
      role="region"
      aria-label="Submission Result Experience"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Header Toolbar with Mode Switcher & Re-submit */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600, color: '#0f172a' }}>PRACTICE SUBMISSION SIMULATION</span>
          <span
            style={{
              fontSize: '11px',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontWeight: 500,
            }}
          >
            Offline Safe Mode
          </span>
        </div>

        {/* Practice Verdict Selector to test all states */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Simulate State:</span>
          {(
            [
              { id: 'auto', label: 'Auto' },
              { id: 'Accepted', label: 'AC' },
              { id: 'Wrong Answer', label: 'WA' },
              { id: 'Compilation Error', label: 'CE' },
              { id: 'Runtime Error', label: 'RE' },
              { id: 'Time Limit Exceeded', label: 'TLE' },
            ] as const
          ).map((opt) => {
            const isSelected = currentSimulatedVerdictMode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSimulateVerdictChange?.(opt.id);
                }}
                title={`Simulate ${opt.label} verdict`}
                style={{
                  padding: '2px 7px',
                  fontSize: '11px',
                  borderRadius: '3px',
                  fontWeight: isSelected ? 600 : 400,
                  backgroundColor: isSelected ? '#0284c7' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #0284c7' : '1px solid #cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                }}
              >
                {opt.label}
              </button>
            );
          })}

          {onReSubmit && (
            <button
              type="button"
              onClick={onReSubmit}
              disabled={isJudging}
              title="Re-run submission evaluation"
              style={{
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                color: '#1e293b',
                cursor: isJudging ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '6px',
              }}
            >
              <RefreshCw size={11} className={isJudging ? 'animate-spin' : ''} />
              <span>Evaluate</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Judging Progress Bar (when evaluation is in flight) */}
      {isJudging && (
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#f0f9ff',
            borderBottom: '1px solid #bae6fd',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'fadeIn 120ms ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Loader2 size={18} color="#0284c7" className="animate-spin" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0369a1' }}>
                  {judgingStage}
                </div>
                <div style={{ fontSize: '11px', color: '#0284c7' }}>
                  Simulating complete assessment evaluation across all test constraints
                </div>
              </div>
            </div>
            <span style={{ fontSize: '13px', color: '#0284c7', fontWeight: 700 }}>
              {Math.round(judgingPercent)}%
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: '#e0f2fe',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${judgingPercent}%`,
                height: '100%',
                backgroundColor: '#0284c7',
                transition: 'width 250ms ease',
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Main Result Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {!result && !isJudging ? (
          <div
            style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: '#64748b',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Terminal size={32} color="#94a3b8" />
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
              Ready for Assessment Submission
            </div>
            <div style={{ fontSize: '12px', maxWidth: '420px', lineHeight: 1.5 }}>
              Click the &ldquo;Submit&rdquo; button in the header or &ldquo;Evaluate&rdquo; above to run the submission simulation against all hidden grading test cases.
            </div>
          </div>
        ) : result ? (
          <>
            {/* Verdict Card Banner */}
            <div
              style={{
                padding: '16px 18px',
                borderRadius: '8px',
                border: `1px solid ${style.border}`,
                backgroundColor: style.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {style.icon}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: style.text }}>
                      {style.title}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: style.badgeBg,
                        color: style.badgeText,
                        fontSize: '11.5px',
                        fontWeight: 700,
                      }}
                    >
                      {result.verdict}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                    {style.subtext}
                  </div>
                </div>
              </div>

              {/* Total Score Display */}
              <div
                style={{
                  textAlign: 'right',
                  paddingLeft: '16px',
                  borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>TOTAL SCORE</div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    color: result.totalScore === result.maxScore ? '#15803d' : result.totalScore > 0 ? '#b45309' : '#b91c1c',
                    lineHeight: 1.1,
                  }}
                >
                  {result.totalScore}
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>
                    {' '}/ {result.maxScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
              }}
            >
              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>SUBMISSION ID</div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                  {result.id}
                </div>
              </div>

              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>TOTAL TIME</div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} color="#64748b" />
                  <span>{result.executionTime}</span>
                </div>
              </div>

              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>PEAK MEMORY</div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Cpu size={12} color="#64748b" />
                  <span>{result.memory}</span>
                </div>
              </div>

              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>LANGUAGE</div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase' }}>
                  {result.language}
                </div>
              </div>
            </div>

            {/* Compiler Output (if Compilation Error) */}
            {result.compilerOutput && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#b45309', marginBottom: '6px' }}>
                  COMPILER DIAGNOSTICS &amp; BUILD LOG
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '12px 14px',
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                    borderRadius: '6px',
                    fontFamily: "Consolas, 'Courier New', monospace",
                    fontSize: '12px',
                    color: '#92400e',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                  }}
                >
                  {result.compilerOutput}
                </pre>
              </div>
            )}

            {/* Runtime Error Details (if Runtime Error) */}
            {result.runtimeErrorDetails && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#7e22ce', marginBottom: '6px' }}>
                  RUNTIME STACK TRACE
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '12px 14px',
                    backgroundColor: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    borderRadius: '6px',
                    fontFamily: "Consolas, 'Courier New', monospace",
                    fontSize: '12px',
                    color: '#6b21a8',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                  }}
                >
                  {result.runtimeErrorDetails}
                </pre>
              </div>
            )}

            {/* Subtasks Grading Table */}
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                SUBTASK &amp; TEST SUITE BREAKDOWN
              </div>
              <div
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '8px 12px', fontWeight: 600 }}>Subtask</th>
                      <th style={{ padding: '8px 12px', fontWeight: 600 }}>Test Cases</th>
                      <th style={{ padding: '8px 12px', fontWeight: 600 }}>Time</th>
                      <th style={{ padding: '8px 12px', fontWeight: 600 }}>Memory</th>
                      <th style={{ padding: '8px 12px', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.subtasks.map((st) => {
                      const isPassed = st.status === 'passed';
                      const isTle = st.status === 'tle';
                      const isRe = st.status === 'runtime_error';

                      const statusColor = isPassed
                        ? '#15803d'
                        : isTle
                        ? '#c2410c'
                        : isRe
                        ? '#7e22ce'
                        : '#b91c1c';

                      const statusBg = isPassed
                        ? '#f0fdf4'
                        : isTle
                        ? '#fff7ed'
                        : isRe
                        ? '#faf5ff'
                        : '#fef2f2';

                      const statusLabel = isPassed
                        ? 'Passed'
                        : isTle
                        ? 'TLE'
                        : isRe
                        ? 'SIGSEGV'
                        : 'Failed';

                      return (
                        <tr key={st.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>
                            {st.name}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#64748b' }}>
                            {st.testCasesCount} cases
                          </td>
                          <td style={{ padding: '8px 12px', color: '#64748b' }}>
                            {st.executionTime}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#64748b' }}>
                            {st.memory}
                          </td>
                          <td style={{ padding: '8px 12px' }}>
                            <span
                              style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 600,
                                backgroundColor: statusBg,
                                color: statusColor,
                              }}
                            >
                              {statusLabel}
                            </span>
                          </td>
                          <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                            {st.score} / {st.maxScore}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Simulation Identity Disclaimer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#64748b',
              }}
            >
              <ShieldCheck size={14} color="#0284c7" />
              <span>
                <strong>Notice:</strong> This is a local practice simulation. Code was evaluated in-browser against deterministic heuristic benchmarks without external server dependencies.
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
