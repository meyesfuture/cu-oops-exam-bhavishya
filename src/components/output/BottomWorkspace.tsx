import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Terminal,
  Play,
  Send,
} from 'lucide-react';
import { TestCase, ConsoleLogEntry, SupportedLanguage, SubmissionVerdict, SubmissionResult, ExecutionRunResult } from '../../types';
import { InputPanel } from './InputPanel';
import { OutputPanel } from './OutputPanel';
import { RunExperience } from './RunExperience';
import { SubmitExperience } from './SubmitExperience';
import { executionService } from '../../services/executionService';
import {
  loadCustomInput,
  saveCustomInput,
  loadUseCustomInput,
  saveUseCustomInput,
} from '../../utils/storage';

interface BottomWorkspaceProps {
  isOpen: boolean;
  height: number;
  currentLanguage: SupportedLanguage;
  code: string;
  activeFileName: string;
  testCases: TestCase[];
  logs: ConsoleLogEntry[];
  isRunning: boolean;
  onToggleOpen: () => void;
  onHeightChange?: (h: number) => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  onClearLogs?: () => void;
}

export const BottomWorkspace: React.FC<BottomWorkspaceProps> = ({
  isOpen,
  height,
  currentLanguage,
  code,
  activeFileName,
  testCases,
  logs,
  isRunning,
  onToggleOpen,
  onHeightChange,
  onRunCode,
  onSubmitCode,
  onClearLogs,
}) => {
  const [activeTab, setActiveTab] = useState<'testcases' | 'custom_input' | 'console' | 'submission'>('testcases');
  const [customInput, setCustomInput] = useState<string>(() => loadCustomInput('5\n1 2 L\n1 3 R\n3 4 L\n3 5 R'));
  const [useCustomInput, setUseCustomInput] = useState<boolean>(() => loadUseCustomInput(false));

  const handleCustomInputChange = (val: string) => {
    setCustomInput(val);
    saveCustomInput(val);
  };

  const handleToggleUseCustomInput = (use: boolean) => {
    setUseCustomInput(use);
    saveUseCustomInput(use);
  };

  // Run progress state
  const [runProgressText, setRunProgressText] = useState<string>('Compiling source code...');
  const [runProgressPercent, setRunProgressPercent] = useState<number>(0);

  // Submit experience state
  const [isJudging, setIsJudging] = useState<boolean>(false);
  const [judgingStage, setJudgingStage] = useState<string>('Queued for evaluation...');
  const [judgingPercent, setJudgingPercent] = useState<number>(0);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [simulatedVerdictMode, setSimulatedVerdictMode] = useState<'auto' | SubmissionVerdict>('auto');

  // Execution run result cache
  const [latestRunResult, setLatestRunResult] = useState<ExecutionRunResult | null>(null);

  const handleResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = startY - moveEvent.clientY;
      const newHeight = Math.max(120, Math.min(520, startHeight + deltaY));
      onHeightChange?.(newHeight);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Perform Local Practice Submission
  const handlePerformSubmission = async () => {
    if (isJudging) return;
    setIsJudging(true);
    setActiveTab('submission');
    onSubmitCode();

    try {
      const res = await executionService.submitCode({
        language: currentLanguage,
        code,
        fileName: activeFileName,
        questionId: 'q3-binary-tree',
        forceVerdict: simulatedVerdictMode !== 'auto' ? simulatedVerdictMode : undefined,
        onProgress: (stage, pct) => {
          setJudgingStage(stage);
          setJudgingPercent(pct);
        },
      });

      setSubmissionResult(res);
    } finally {
      setIsJudging(false);
    }
  };

  // Run with custom input or test cases through executionService
  const handleRunExecution = async () => {
    setActiveTab(useCustomInput ? 'console' : 'testcases');
    setRunProgressPercent(15);
    setRunProgressText(`Compiling ${currentLanguage.toUpperCase()} code...`);

    try {
      const res = await executionService.runCode({
        language: currentLanguage,
        code,
        fileName: activeFileName,
        customInput,
        useCustomInput,
        predefinedTestCases: testCases,
        onProgress: (done, total, name) => {
          setRunProgressText(`Running ${name} (${done}/${total})...`);
          setRunProgressPercent((done / total) * 100);
        },
      });

      setLatestRunResult(res);
    } finally {
      onRunCode();
    }
  };

  const getVerdictPill = (verdict?: SubmissionVerdict) => {
    if (!verdict) return null;
    const isAc = verdict === 'Accepted';
    const isWa = verdict === 'Wrong Answer';
    const isTle = verdict === 'Time Limit Exceeded';
    const isRe = verdict === 'Runtime Error';

    const bg = isAc ? '#dcfce7' : isWa ? '#fee2e2' : isTle ? '#ffedd5' : isRe ? '#f3e8ff' : '#fef3c7';
    const text = isAc ? '#166534' : isWa ? '#991b1b' : isTle ? '#9a3412' : isRe ? '#6b21a8' : '#92400e';

    return (
      <span
        style={{
          fontSize: '10px',
          padding: '1px 6px',
          borderRadius: '4px',
          backgroundColor: bg,
          color: text,
          fontWeight: 700,
        }}
      >
        {verdict}
      </span>
    );
  };

  return (
    <div
      role="region"
      aria-label="Bottom Workspace"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        userSelect: 'none',
      }}
    >
      {/* 1. Collapsible Bottom Bar */}
      <div
        onClick={onToggleOpen}
        title={isOpen ? 'Click to collapse console' : 'Click to open console'}
        aria-label={isOpen ? 'Collapse console drawer' : 'Open console drawer'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onToggleOpen();
        }}
        style={{
          height: '30px',
          minHeight: '30px',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '12px',
          color: '#475569',
          cursor: 'pointer',
          borderBottom: isOpen ? '1px solid #e2e8f0' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <Terminal size={14} color="#0284c7" />
          <span>&gt;_ Console &amp; Practice Runner</span>
          {submissionResult && getVerdictPill(submissionResult.verdict)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            {isOpen ? 'Click to collapse' : 'Click to open'}
          </span>
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>

      {/* 2. Expanded Workspace Container */}
      {isOpen && (
        <div
          style={{
            height: `${height}px`,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Draggable Resizer Handle */}
          <div
            onPointerDown={handleResizeStart}
            title="Drag to resize bottom workspace"
            style={{
              height: '5px',
              cursor: 'row-resize',
              backgroundColor: 'transparent',
            }}
          />

          {/* Sub-Tabs Navigation Bar */}
          <div
            style={{
              height: '32px',
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              fontSize: '12px',
            }}
          >
            {/* Left: Tab Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
              <button
                type="button"
                onClick={() => setActiveTab('testcases')}
                style={{
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: activeTab === 'testcases' ? 600 : 500,
                  color: activeTab === 'testcases' ? '#0284c7' : '#64748b',
                  cursor: 'pointer',
                  padding: '0 4px',
                  borderBottom: activeTab === 'testcases' ? '2px solid #0284c7' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Test Cases ({testCases.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom_input')}
                style={{
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: activeTab === 'custom_input' ? 600 : 500,
                  color: activeTab === 'custom_input' ? '#0284c7' : '#64748b',
                  cursor: 'pointer',
                  padding: '0 4px',
                  borderBottom: activeTab === 'custom_input' ? '2px solid #0284c7' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Custom Input</span>
                {useCustomInput && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#0284c7',
                    }}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('console')}
                style={{
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: activeTab === 'console' ? 600 : 500,
                  color: activeTab === 'console' ? '#0284c7' : '#64748b',
                  cursor: 'pointer',
                  padding: '0 4px',
                  borderBottom: activeTab === 'console' ? '2px solid #0284c7' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Output Log ({logs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('submission')}
                style={{
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: activeTab === 'submission' ? 600 : 500,
                  color: activeTab === 'submission' ? '#0284c7' : '#64748b',
                  cursor: 'pointer',
                  padding: '0 4px',
                  borderBottom: activeTab === 'submission' ? '2px solid #0284c7' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Submission (Judge)</span>
                {submissionResult && getVerdictPill(submissionResult.verdict)}
              </button>
            </div>

            {/* Right: Quick Run & Submit Action Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleRunExecution}
                disabled={isRunning}
                title="Run test cases (Ctrl + Enter)"
                style={{
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '3px',
                  color: '#0f172a',
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Play size={10} fill="#0284c7" color="#0284c7" />
                <span>Run</span>
              </button>

              <button
                type="button"
                onClick={handlePerformSubmission}
                disabled={isJudging}
                title="Evaluate full practice submission"
                style={{
                  padding: '3px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: '#0284c7',
                  border: '1px solid #0284c7',
                  borderRadius: '3px',
                  color: '#ffffff',
                  cursor: isJudging ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Send size={10} />
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Sub-Tab Viewport Content */}
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex' }}>
            {activeTab === 'testcases' && (
              <RunExperience
                isRunning={isRunning}
                progressText={runProgressText}
                progressPercent={runProgressPercent}
                testCases={testCases}
                stdout={latestRunResult?.stdout || logs.map((l) => l.message).join('\n')}
                stderr={latestRunResult?.stderr}
                onRunAgain={handleRunExecution}
              />
            )}

            {activeTab === 'custom_input' && (
              <InputPanel
                customInput={customInput}
                useCustomInput={useCustomInput}
                onCustomInputChange={handleCustomInputChange}
                onToggleUseCustomInput={handleToggleUseCustomInput}
                onClearInput={() => handleCustomInputChange('')}
              />
            )}

            {activeTab === 'console' && (
              <OutputPanel
                stdout={latestRunResult?.stdout || logs.filter((l) => l.type === 'stdout' || l.type === 'info').map((l) => l.message).join('\n')}
                stderr={latestRunResult?.stderr || logs.filter((l) => l.type === 'stderr').map((l) => l.message).join('\n')}
                executionTimeMs={latestRunResult?.executionTimeMs ?? 26}
                memoryMb={latestRunResult?.memoryMb ?? 16.2}
                exitCode={latestRunResult?.exitCode ?? 0}
                isSimulated={true}
                onClearOutput={() => {
                  setLatestRunResult(null);
                  onClearLogs?.();
                }}
              />
            )}

            {activeTab === 'submission' && (
              <SubmitExperience
                isJudging={isJudging}
                judgingStage={judgingStage}
                judgingPercent={judgingPercent}
                result={submissionResult}
                currentSimulatedVerdictMode={simulatedVerdictMode}
                onSimulateVerdictChange={(verdict) => {
                  setSimulatedVerdictMode(verdict);
                  executionService.setSimulatedVerdict(verdict);
                }}
                onReSubmit={handlePerformSubmission}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
