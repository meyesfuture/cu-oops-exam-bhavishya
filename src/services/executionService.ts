/**
 * Local Practice Execution & Judge Simulation Service
 * 
 * Provides an extensible architecture for running test cases and submitting solutions.
 * Designed so that an external remote judge (Judge0, Piston, or competitive platform daemon)
 * can be integrated simply by implementing the IExecutionService interface.
 */

import { SupportedLanguage, TestCase, SubmissionVerdict, SubtaskResult, SubmissionResult, ExecutionRunResult } from '../types';

export interface RunCodeRequest {
  language: SupportedLanguage;
  code: string;
  fileName: string;
  customInput?: string;
  useCustomInput?: boolean;
  predefinedTestCases: TestCase[];
  onProgress?: (completedCases: number, totalCases: number, currentCaseName: string) => void;
}

export interface SubmitCodeRequest {
  language: SupportedLanguage;
  code: string;
  fileName: string;
  questionId: string;
  forceVerdict?: SubmissionVerdict;
  onProgress?: (stage: string, percent: number) => void;
}

export interface IExecutionService {
  runCode(req: RunCodeRequest): Promise<ExecutionRunResult>;
  submitCode(req: SubmitCodeRequest): Promise<SubmissionResult>;
  setSimulatedVerdict(verdict: 'auto' | SubmissionVerdict): void;
  getSimulatedVerdict(): 'auto' | SubmissionVerdict;
}

class SimulationExecutionService implements IExecutionService {
  private forcedVerdict: 'auto' | SubmissionVerdict = 'auto';

  public setSimulatedVerdict(verdict: 'auto' | SubmissionVerdict): void {
    this.forcedVerdict = verdict;
  }

  public getSimulatedVerdict(): 'auto' | SubmissionVerdict {
    return this.forcedVerdict;
  }

  /**
   * Run Code against sample test cases or custom input
   */
  public async runCode(req: RunCodeRequest): Promise<ExecutionRunResult> {
    const { language, code, customInput, useCustomInput = false, predefinedTestCases, onProgress } = req;

    // Simulate compilation delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Check for syntax errors in code
    const syntaxError = this.detectSyntaxError(code, language);
    if (syntaxError) {
      return {
        status: 'error',
        testCases: predefinedTestCases.map((tc) => ({ ...tc, status: 'failed' })),
        stdout: '',
        stderr: syntaxError,
        executionTimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        isCustomInput: useCustomInput,
        isSimulated: true,
      };
    }

    if (useCustomInput && customInput !== undefined) {
      // Custom input execution
      onProgress?.(1, 1, 'Custom Input');
      await new Promise((resolve) => setTimeout(resolve, 250));

      const simulatedOutput = this.generateOutputForInput(customInput, language);
      return {
        status: 'completed',
        testCases: [
          {
            id: 'custom-1',
            name: 'Custom Input',
            input: customInput,
            expectedOutput: 'Custom input provided',
            actualOutput: simulatedOutput,
            status: 'passed',
            executionTimeMs: 14 + Math.round(Math.random() * 8),
            memoryMb: 15.8,
          },
        ],
        stdout: simulatedOutput,
        stderr: '',
        executionTimeMs: 14,
        memoryMb: 15.8,
        exitCode: 0,
        isCustomInput: true,
        isSimulated: true,
      };
    }

    // Predefined test cases sequential execution
    const total = predefinedTestCases.length;
    const executedTestCases: TestCase[] = [];
    let combinedStdout = '';

    for (let i = 0; i < total; i++) {
      const tc = predefinedTestCases[i];
      if (!tc) continue;
      onProgress?.(i + 1, total, tc.name);
      await new Promise((resolve) => setTimeout(resolve, 180));

      const actual = tc.expectedOutput;
      const timeMs = 12 + Math.round(Math.random() * 10);
      const memMb = 16.2;

      executedTestCases.push({
        id: tc.id,
        name: tc.name,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: actual,
        status: 'passed',
        executionTimeMs: timeMs,
        memoryMb: memMb,
        isHidden: tc.isHidden,
      });

      combinedStdout += `--- ${tc.name} ---\nOutput:\n${actual}\n\n`;
    }

    return {
      status: 'completed',
      testCases: executedTestCases,
      stdout: combinedStdout.trim(),
      stderr: '',
      executionTimeMs: 26,
      memoryMb: 16.2,
      exitCode: 0,
      isCustomInput: false,
      isSimulated: true,
    };
  }

  /**
   * Submit Code against comprehensive hidden test suites
   */
  public async submitCode(req: SubmitCodeRequest): Promise<SubmissionResult> {
    const { language, code, forceVerdict, onProgress } = req;
    const targetVerdict = forceVerdict || this.forcedVerdict;

    // Progression animation through judge phases
    onProgress?.('Queued for local evaluation...', 10);
    await new Promise((r) => setTimeout(r, 200));

    onProgress?.('Compiling source code with native toolchain...', 30);
    await new Promise((r) => setTimeout(r, 300));

    // Determine verdict
    let verdict: SubmissionVerdict;
    if (targetVerdict !== 'auto') {
      verdict = targetVerdict;
    } else {
      verdict = this.inferVerdictFromCode(code, language);
    }

    onProgress?.('Executing test cases across subtasks...', 65);
    await new Promise((r) => setTimeout(r, 350));

    onProgress?.('Calculating time and memory constraints...', 90);
    await new Promise((r) => setTimeout(r, 200));

    onProgress?.('Evaluation completed.', 100);

    return this.buildSubmissionResult(verdict, language);
  }

  private inferVerdictFromCode(code: string, _language: SupportedLanguage): SubmissionVerdict {
    const trimmed = code.trim();
    if (trimmed.length < 30) return 'Compilation Error';
    if (code.includes('while(true)') || code.includes('while (true)') || code.includes('for(;;)') || code.includes('for (;;)')) {
      return 'Time Limit Exceeded';
    }
    if (code.includes('throw new') || code.includes('NullPointerException') || code.includes('assert(false)') || code.includes('1 / 0')) {
      return 'Runtime Error';
    }
    if (code.includes('TODO') && trimmed.length < 150) {
      return 'Wrong Answer';
    }
    return 'Accepted';
  }

  private detectSyntaxError(code: string, language: SupportedLanguage): string | null {
    // Basic balanced brackets check for realistic simulation
    let braces = 0;
    for (const ch of code) {
      if (ch === '{') braces++;
      if (ch === '}') braces--;
    }

    if (braces !== 0 && (language === 'java' || language === 'cpp' || language === 'c' || language === 'javascript')) {
      return `${language.toUpperCase()} Compilation Error:\nMain.${language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : language}: error: mismatched curly braces '{ }' in class or function scope.\n  --> unmatched opening or closing brace detected (${braces > 0 ? braces + ' unclosed {' : Math.abs(braces) + ' unexpected }'}).\n1 error generated.`;
    }

    return null;
  }

  private generateOutputForInput(input: string, _language: SupportedLanguage): string {
    const lines = input.trim().split('\n');
    if (lines.length === 0) return '0';

    // If input is the tree format (first line N, then parent child dir)
    if (lines.length > 1 && lines[0] && !isNaN(Number(lines[0].trim()))) {
      return '1\n2 3\n4 5\nExecution finished successfully.';
    }

    // Default echo simulation
    return `Output for input (${lines.length} lines):\n` + lines.map((l, i) => `[${i + 1}] ${l}`).join('\n');
  }

  private buildSubmissionResult(verdict: SubmissionVerdict, language: SupportedLanguage): SubmissionResult {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const subtasks = this.generateSubtasksForVerdict(verdict);

    const totalScore = subtasks.reduce((sum, s) => sum + (s?.score ?? 0), 0);

    let compilerOutput: string | undefined;
    let runtimeErrorDetails: string | undefined;
    let failedTestCaseIndex: number | undefined;

    if (verdict === 'Compilation Error') {
      compilerOutput = `${language.toUpperCase()} Compiler (Simulated Diagnostics):\nMain.${language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : 'java'}:24: error: cannot find symbol\n    int result = tree.levelOrderTraversal(root);\n                 ^\n  symbol:   method levelOrderTraversal(TreeNode)\n  location: class TreeUtility\n1 error generated.\nBuild exit code: 1`;
    } else if (verdict === 'Runtime Error') {
      runtimeErrorDetails = `Exception in thread "main" java.lang.NullPointerException: Cannot read field "left" because "current" is null\n\tat Solution.levelOrder(Solution.java:42)\n\tat Solution.main(Solution.java:18)\nCommand exited with non-zero status: 139 (SIGSEGV / Null Pointer Exception)`;
    } else if (verdict === 'Wrong Answer') {
      failedTestCaseIndex = 3;
    } else if (verdict === 'Time Limit Exceeded') {
      failedTestCaseIndex = 5;
    }

    return {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: now,
      language,
      verdict,
      totalScore,
      maxScore: 100,
      executionTime: verdict === 'Time Limit Exceeded' ? '> 1.000s' : verdict === 'Compilation Error' ? '0.00s' : '0.084s',
      memory: verdict === 'Compilation Error' ? '0 MB' : '18.4 MB',
      subtasks,
      compilerOutput,
      runtimeErrorDetails,
      failedTestCaseIndex,
      isSimulated: true,
    };
  }

  private generateSubtasksForVerdict(verdict: SubmissionVerdict): SubtaskResult[] {
    switch (verdict) {
      case 'Accepted':
        return [
          { id: 1, name: 'Subtask 1: N <= 100 (Sample Constraints)', score: 30, maxScore: 30, status: 'passed', testCasesCount: 3, executionTime: '0.012s', memory: '14.2 MB' },
          { id: 2, name: 'Subtask 2: N <= 1000 (Binary Tree Balanced)', score: 30, maxScore: 30, status: 'passed', testCasesCount: 3, executionTime: '0.024s', memory: '16.1 MB' },
          { id: 3, name: 'Subtask 3: N <= 10000 (Full Constraints & Skewed Trees)', score: 40, maxScore: 40, status: 'passed', testCasesCount: 4, executionTime: '0.048s', memory: '18.4 MB' },
        ];
      case 'Wrong Answer':
        return [
          { id: 1, name: 'Subtask 1: N <= 100 (Sample Constraints)', score: 30, maxScore: 30, status: 'passed', testCasesCount: 3, executionTime: '0.014s', memory: '14.5 MB' },
          { id: 2, name: 'Subtask 2: N <= 1000 (Binary Tree Balanced)', score: 0, maxScore: 30, status: 'failed', testCasesCount: 3, executionTime: '0.026s', memory: '16.0 MB' },
          { id: 3, name: 'Subtask 3: N <= 10000 (Full Constraints & Skewed Trees)', score: 0, maxScore: 40, status: 'failed', testCasesCount: 4, executionTime: '0.038s', memory: '17.8 MB' },
        ];
      case 'Time Limit Exceeded':
        return [
          { id: 1, name: 'Subtask 1: N <= 100 (Sample Constraints)', score: 30, maxScore: 30, status: 'passed', testCasesCount: 3, executionTime: '0.016s', memory: '14.8 MB' },
          { id: 2, name: 'Subtask 2: N <= 1000 (Binary Tree Balanced)', score: 30, maxScore: 30, status: 'passed', testCasesCount: 3, executionTime: '0.032s', memory: '16.5 MB' },
          { id: 3, name: 'Subtask 3: N <= 10000 (Full Constraints & Skewed Trees)', score: 0, maxScore: 40, status: 'tle', testCasesCount: 4, executionTime: '> 1.000s', memory: '24.1 MB' },
        ];
      case 'Runtime Error':
        return [
          { id: 1, name: 'Subtask 1: N <= 100 (Sample Constraints)', score: 0, maxScore: 30, status: 'runtime_error', testCasesCount: 3, executionTime: '0.008s', memory: '12.0 MB' },
          { id: 2, name: 'Subtask 2: N <= 1000 (Binary Tree Balanced)', score: 0, maxScore: 30, status: 'runtime_error', testCasesCount: 3, executionTime: '0.010s', memory: '12.0 MB' },
          { id: 3, name: 'Subtask 3: N <= 10000 (Full Constraints & Skewed Trees)', score: 0, maxScore: 40, status: 'runtime_error', testCasesCount: 4, executionTime: '0.010s', memory: '12.0 MB' },
        ];
      case 'Compilation Error':
      default:
        return [
          { id: 1, name: 'Subtask 1: N <= 100 (Sample Constraints)', score: 0, maxScore: 30, status: 'failed', testCasesCount: 3, executionTime: '0.00s', memory: '0 MB' },
          { id: 2, name: 'Subtask 2: N <= 1000 (Binary Tree Balanced)', score: 0, maxScore: 30, status: 'failed', testCasesCount: 3, executionTime: '0.00s', memory: '0 MB' },
          { id: 3, name: 'Subtask 3: N <= 10000 (Full Constraints & Skewed Trees)', score: 0, maxScore: 40, status: 'failed', testCasesCount: 4, executionTime: '0.00s', memory: '0 MB' },
        ];
    }
  }
}

// Export singleton instance conforming to IExecutionService
export const executionService: IExecutionService = new SimulationExecutionService();
