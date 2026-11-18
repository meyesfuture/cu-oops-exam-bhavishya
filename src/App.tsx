import { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { ActivityRail } from './components/layout/ActivityRail';
import { WorkspaceLayout } from './components/layout/WorkspaceLayout';
import { ProblemPane } from './components/problem/ProblemPane';
import { WorkspaceContainer } from './components/workspace/WorkspaceContainer';
import { OpeningScreen } from './components/opening/OpeningScreen';
import { CompletionScreen } from './components/completion/CompletionScreen';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { usePreferences } from './hooks/usePreferences';
import { useCountdown } from './hooks/useCountdown';
import { useEditorStateManager } from './hooks/useEditorStateManager';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import {
  REFERENCE_EXAM_SESSION,
  REFERENCE_QUESTION_1,
  REFERENCE_VIVA_STATEMENT,
  REFERENCE_FILES,
  REFERENCE_TEST_CASES_Q1,
} from './utils/sampleData';
import { AppScreenState, ExamSection, TestCase, ConsoleLogEntry, SupportedLanguage, ExamStatus } from './types';

export function App() {
  const { preferences, updatePreferences } = usePreferences();

  // Screen state: 'opening' | 'exam' | 'completion'
  const [screenState, setScreenState] = useState<AppScreenState>(() => {
    if (typeof window !== 'undefined') {
      const screenParam = new URLSearchParams(window.location.search).get('screen');
      if (screenParam === 'opening') return 'opening';
      if (screenParam === 'completion') return 'completion';
      if (screenParam === 'exam') return 'exam';
    }
    return 'opening';
  });

  const [examStatus, setExamStatus] = useState<ExamStatus>(REFERENCE_EXAM_SESSION.status);

  const [currentSection, setCurrentSection] = useState<ExamSection>(() => {
    if (typeof window !== 'undefined') {
      const sectionParam = new URLSearchParams(window.location.search).get('section');
      if (sectionParam === 'viva') return 'viva';
    }
    return 'coding';
  });

  const questionIndex = 1;
  const activeTask = REFERENCE_QUESTION_1;

  const { secondsRemaining } = useCountdown({ initialSeconds: REFERENCE_EXAM_SESSION.remainingSeconds });

  // Fixed to Java environment (language switching disabled)
  const initialLang: SupportedLanguage = 'java';

  // Toast notifications manager
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = String(Date.now() + Math.random());
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Full Editor State Manager with independent drafts per language (Java, C, C++, Python, JavaScript)
  const {
    currentLanguage,
    switchLanguage,
    activeFile,
    tabs,
    selectFile,
    closeTab,
    createFile,
    updateContent,
    resetFile,
    resetAllInCurrentLanguage,
    persistCurrentDraft,
  } = useEditorStateManager({
    initialLanguage: initialLang,
    initialJavaFiles: REFERENCE_FILES,
  });

  const [testCases, setTestCases] = useState<TestCase[]>(() => REFERENCE_TEST_CASES_Q1);
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(preferences.isConsoleOpen);
  const [consoleHeight, setConsoleHeight] = useState<number>(preferences.consoleHeight);

  const handleConsoleHeightChange = useCallback((height: number) => {
    setConsoleHeight(height);
    updatePreferences({ consoleHeight: height });
  }, [updatePreferences]);

  const toggleConsole = useCallback(() => {
    setIsConsoleOpen((prev) => {
      const next = !prev;
      updatePreferences({ isConsoleOpen: next });
      return next;
    });
  }, [updatePreferences]);

  const handleContentChange = useCallback(
    (path: string, content: string) => {
      updateContent(path, content);
      if (examStatus === 'not_attempted') {
        setExamStatus('in_progress');
      }
    },
    [updateContent, examStatus]
  );

  const handleRunCode = useCallback(() => {
    setIsRunning(true);
    setIsConsoleOpen(true);
    if (examStatus === 'not_attempted') {
      setExamStatus('in_progress');
    }
    setLogs((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        type: 'info',
        message: `Compiling ${currentLanguage.toUpperCase()} code for ${activeFile.name}...`,
        timestamp: Date.now(),
      },
    ]);

    setTimeout(() => {
      setTestCases((prev) =>
        prev.map((tc) => ({
          ...tc,
          status: 'passed',
          executionTimeMs: 12 + Math.random() * 18,
          memoryMb: 16.2,
        }))
      );
      setLogs((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          type: 'stdout',
          message: `Compilation finished successfully (0 warnings, 0 errors).\nRunning test assertions...\nTest Case 1: PASSED (14ms)\nTest Case 2: PASSED (18ms)\nAll sample test cases executed successfully.`,
          timestamp: Date.now(),
        },
      ]);
      setIsRunning(false);
      showToast('All sample test assertions PASSED', 'success');
    }, 450);
  }, [currentLanguage, activeFile.name, examStatus, showToast]);

  const handleFinalSubmitAssessment = useCallback(() => {
    setExamStatus('submitted');
    setScreenState('completion');
  }, []);

  const handlePracticeSubmit = useCallback(() => {
    setExamStatus('in_progress');
    showToast('Solution submitted to local practice judge', 'info');
  }, [showToast]);

  const handleSaveDraft = useCallback(() => {
    persistCurrentDraft();
    showToast('Draft saved to local storage', 'success');
  }, [persistCurrentDraft, showToast]);

  // Bind application keyboard shortcuts:
  // Ctrl+Enter -> Run
  // Ctrl+S -> Save Draft
  // Ctrl++ / Ctrl+= -> Increase Font Size
  // Ctrl+- -> Decrease Font Size
  // Escape -> Handled per modal or fullscreen
  useKeyboardShortcuts({
    onRun: () => {
      handleRunCode();
    },
    onSaveDraft: () => {
      handleSaveDraft();
    },
    onIncreaseFontSize: () => {
      const next = Math.min(18, preferences.fontSize + 1);
      updatePreferences({ fontSize: next });
      showToast(`Font size: ${next}px`, 'info');
    },
    onDecreaseFontSize: () => {
      const next = Math.max(12, preferences.fontSize - 1);
      updatePreferences({ fontSize: next });
      showToast(`Font size: ${next}px`, 'info');
    },
  });

  // 1. If Opening Screen is requested (media_1794947728942_829c0ee8.jpg)
  if (screenState === 'opening') {
    return (
      <OpeningScreen
        session={REFERENCE_EXAM_SESSION}
        onStartExam={() => setScreenState('exam')}
      />
    );
  }

  // 2. If Completion Screen is requested (01.56.27.jpeg)
  if (screenState === 'completion') {
    return <CompletionScreen onReturnToReview={() => setScreenState('exam')} />;
  }

  // 3. Active Assessment IDE (00.44.31.jpeg - 00.44.43.jpeg & media_1794949151206_b2eac9f2.jpg)
  return (
    <ErrorBoundary>
      <div
        className="app-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          color: '#1f2937',
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          userSelect: 'none',
        }}
      >
        {/* Top Examination Header (Screenshot 00.44.31.jpeg / 00.44.36 (2).jpeg) */}
        <Header
          candidateName={REFERENCE_EXAM_SESSION.candidateName}
          candidateId={REFERENCE_EXAM_SESSION.candidateId}
          username={REFERENCE_EXAM_SESSION.username}
          status={examStatus}
          remainingSeconds={secondsRemaining}
          currentSection={currentSection}
          currentQuestionIndex={questionIndex}
          onSectionChange={setCurrentSection}
          onQuestionSelect={() => {}}
          onRun={handleRunCode}
          onSubmit={handleFinalSubmitAssessment}
          isRunning={isRunning}
        />

        {/* Main Work Area: Left Activity Rail + Dual-Pane Splitter */}
        <div
          className="app-main"
          style={{
            display: 'flex',
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Left Dock: Activity Rail (Screenshot 00.44.32 (1).jpeg) */}
          <ActivityRail
            activeTab={currentSection === 'coding' ? 'problem' : 'info'}
            onSelectTab={(tab) => {
              if (tab === 'terminal') toggleConsole();
              if (tab === 'problem') {
                setCurrentSection('coding');
                showToast('Switched to Task Statement', 'info');
              }
            }}
            onResetWorkspace={() => {
              resetAllInCurrentLanguage();
              showToast('All workspace files reverted to templates', 'warning');
            }}
            task={activeTask}
            tabs={tabs}
            activeFilePath={activeFile.path}
            currentLanguage={currentLanguage}
            candidateName={REFERENCE_EXAM_SESSION.candidateName}
            username={REFERENCE_EXAM_SESSION.username}
            ipAddress={REFERENCE_EXAM_SESSION.ipAddress}
            onSelectFile={(path) => {
              selectFile(path);
              showToast(`Switched to ${path.split('/').pop()}`, 'info');
            }}
            onCreateFile={() => {
              createFile();
              showToast('Created new file buffer', 'success');
            }}
            onRestoreStarter={() => {
              resetFile(activeFile.path);
              showToast(`Reverted ${activeFile.name} to template`, 'warning');
            }}
            onSendNotice={(msg) => {
              showToast(`Invigilator notice sent: "${msg}"`, 'info');
            }}
          />

          {/* Dual-Pane Splitter Layout */}
          <WorkspaceLayout
            leftPaneRatio={preferences.leftPaneRatio}
            onLeftPaneRatioChange={(ratio) => updatePreferences({ leftPaneRatio: ratio })}
            leftPane={
              <ProblemPane
                currentSection={currentSection}
                task={activeTask}
                viva={REFERENCE_VIVA_STATEMENT}
              />
            }
            rightPane={
              activeFile ? (
                <WorkspaceContainer
                  activeFile={activeFile}
                  tabs={tabs}
                  currentLanguage={currentLanguage}
                  fontSize={preferences.fontSize}
                  wordWrap={preferences.wordWrap}
                  tabSize={preferences.tabSize}
                  lineNumbers={preferences.lineNumbers}
                  bracketPairColorization={preferences.bracketPairColorization}
                  minimap={preferences.minimap}
                  isConsoleOpen={isConsoleOpen}
                  consoleHeight={consoleHeight}
                  testCases={testCases}
                  logs={logs}
                  onSelectTab={(path) => {
                    selectFile(path);
                  }}
                  onCloseTab={(path) => {
                    closeTab(path);
                    showToast(`Closed ${path.split('/').pop()}`, 'info');
                  }}
                  onCreateFile={(name) => {
                    createFile(name);
                    showToast(`Created ${name || 'new file'}`, 'success');
                  }}
                  onSwitchLanguage={(lang) => {
                    switchLanguage(lang);
                    showToast(`Switched language to ${lang.toUpperCase()}`, 'info');
                  }}
                  onContentChange={handleContentChange}
                  onResetCode={() => {
                    resetFile(activeFile.path);
                    showToast(`Reverted ${activeFile.name} to starter code`, 'warning');
                  }}
                  onToggleConsole={toggleConsole}
                  onHeightChange={handleConsoleHeightChange}
                  onToggleWordWrap={() => {
                    const next = preferences.wordWrap === 'on' ? 'off' : 'on';
                    updatePreferences({ wordWrap: next });
                    showToast(`Word wrap ${next}`, 'info');
                  }}
                  onFontSizeChange={(size) => {
                    updatePreferences({ fontSize: size });
                    showToast(`Font size: ${size}px`, 'info');
                  }}
                  onPreferencesChange={updatePreferences}
                  onRun={handleRunCode}
                  onSubmit={handlePracticeSubmit}
                  isRunning={isRunning}
                  onSaveDraft={handleSaveDraft}
                  onClearLogs={() => setLogs([])}
                />
              ) : null
            }
          />
        </div>

        {/* System Toast Notifications */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
