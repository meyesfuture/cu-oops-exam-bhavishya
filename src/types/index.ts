/**
 * Core Domain Types for Coding Practice Workspace
 */

export type AppScreenState = 'opening' | 'exam' | 'completion';

export type ExamStatus = 'not_attempted' | 'in_progress' | 'submitted';

export type ExamSection = 'coding' | 'viva';

export type WifiStatus = 'connected' | 'unstable' | 'disconnected';

export interface ExamSession {
  candidateName: string;
  candidateId: string;
  username: string;
  ipAddress: string;
  status: ExamStatus;
  currentSection: ExamSection;
  totalDurationSeconds: number;
  remainingSeconds: number;
  isTimerRunning: boolean;
  wifiStatus: WifiStatus;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export type SupportedLanguage = 'c' | 'cpp' | 'java' | 'python' | 'javascript' | 'sql' | 'typescript' | 'json';

export interface VirtualFile {
  id: string;
  path: string;
  name: string;
  content: string;
  initialContent: string;
  language: SupportedLanguage;
  isModified: boolean;
  isReadOnly?: boolean;
}

export interface TabInfo {
  path: string;
  title: string;
  language: SupportedLanguage;
  isModified: boolean;
}

export type SubmissionVerdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compilation Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded';

export interface SubtaskResult {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  status: 'passed' | 'failed' | 'tle' | 'runtime_error';
  testCasesCount: number;
  executionTime: string;
  memory: string;
}

export interface SubmissionResult {
  id: string;
  submittedAt: string;
  language: SupportedLanguage;
  verdict: SubmissionVerdict;
  totalScore: number;
  maxScore: number;
  executionTime: string;
  memory: string;
  subtasks: SubtaskResult[];
  compilerOutput?: string;
  runtimeErrorDetails?: string;
  failedTestCaseIndex?: number;
  isSimulated: boolean;
}

export interface ExecutionRunResult {
  status: 'idle' | 'running' | 'completed' | 'error';
  testCases: TestCase[];
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  memoryMb: number;
  exitCode: number;
  isCustomInput: boolean;
  isSimulated: boolean;
}

export type ConsoleTab = 'testcases' | 'custom_input' | 'console' | 'submission' | 'diff';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface SampleTestCase {
  id: number;
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status: 'idle' | 'passed' | 'failed' | 'running';
  executionTimeMs?: number;
  memoryMb?: number;
  isHidden?: boolean;
}

export interface ConsoleLogEntry {
  id: string;
  type: 'stdout' | 'stderr' | 'system' | 'info';
  message: string;
  timestamp: number;
}

export interface UserPreferences {
  theme: 'light';
  leftPaneRatio: number;
  consoleHeight: number;
  fontSize: number;
  isConsoleOpen: boolean;
  isSidebarOpen: boolean;
  wordWrap: 'on' | 'off';
  isEditorFullscreen: boolean;
  tabSize?: number;
  lineNumbers?: 'on' | 'off';
  bracketPairColorization?: boolean;
  minimap?: boolean;
}

export interface ReferenceTaskSpec {
  id: string;
  questionNumber: number;
  title: string;
  subtitle: string;
  requirementsHeader: string;
  requirements: string[];
  dbConnectionString?: string;
  inputFormatHeader?: string;
  inputFormatBullets?: string[];
  outputFormatHeader?: string;
  outputFormatText?: string;
  outputFormatBox?: string;
  outputFormatNote?: string;
  constraints?: string[];
  moreInfo?: {
    timeLimit: string;
    memoryLimit: string;
    sourceLimit: string;
  };
  sampleInput: string;
  sampleOutput: string;
  samples?: Array<{
    label: string;
    input: string;
    output: string;
  }>;
  filesSummary?: Array<{
    fileName: string;
    instructions: string[];
  }>;
}

export interface VivaStatementSpec {
  title: string;
  paragraphs: string[];
  bulletPoints: string[];
  questionsToAnswer: string[];
}
