# Component Inventory: Coding Practice Workspace

This inventory catalogs all frontend components, sub-components, modals, and reactive state stores required to build the high-fidelity workspace inspired by the CodeChef assessment references.

---

## 1. Component Hierarchy Overview

```
App
├── GlobalShortcutsProvider
├── ExamHeader
│   ├── LeftHeaderSection
│   │   ├── SidebarToggleBtn
│   │   ├── StatusDotPill (Not Attempted / In Progress / Submitted)
│   │   ├── ThemeToggleBtn (Light / Dark)
│   │   ├── WifiIndicator
│   │   └── CandidateBadge ("BHAVISHYA PAL")
│   ├── CenterHeaderSection
│   │   ├── SectionModePill ("Coding Section" / "Viva Section")
│   │   └── CountdownTimer (HH : MM : SS)
│   └── RightHeaderSection
│       ├── RunActionBtn ("▶ Run")
│       ├── SubmitActionBtn ("Submit")
│       ├── ContestEndsBadge
│       └── FullscreenToggleBtn
└── WorkspaceShell (Full Viewport Height)
    ├── ActivityRail (Vertical Slim Dock - 48px)
    │   ├── RailTopGroup (Menu, Problem, Explorer, Tests, Reset)
    │   └── RailBottomGroup (Language, Terminal, Feedback, Avatar)
    └── ResizableWorkspace (Horizontal Splitter)
        ├── LeftWorkspacePanel (Task / Viva Statement - 42%)
        │   ├── CodingTaskViewer
        │   │   ├── TaskHeader ("Task")
        │   │   ├── ProblemMarkdownRenderer
        │   │   ├── CodeSchemaBox (Dark styled SQL/Java samples)
        │   │   ├── SampleIOContainer (Sample Input & Sample Output)
        │   │   ├── ProblemFeedbackWidget (Thumbs Up/Down, Review)
        │   │   └── FloatingScrollTopBtn (Circular Blue FAB)
        │   └── VivaStatementViewer (Viva Mode)
        │       ├── VivaEssayPrompts
        │       └── VivaSearchDock (Case-sensitive Search, Match Arrows)
        ├── SplitterHandle (Vertical Resizer - 4px)
        └── RightWorkspacePanel (IDE & Runner - 58%)
            └── ResizableEditorLayout (Vertical Splitter)
                ├── EditorTopSection
                │   ├── FileTabBar
                │   │   ├── FileTabList (Tabs with Language Badges)
                │   │   └── EditorToolbarActions (Split, Settings, Reset)
                │   ├── BreadcrumbTrail (Hierarchical path navigation)
                │   └── MonacoEditorContainer (VS Code Engine)
                ├── SplitterHandle (Horizontal Resizer - 4px)
                └── BottomConsoleDrawer (Collapsible Test Runner)
                    ├── DrawerTabBar (Test Cases, Custom Input, Console, Diff)
                    ├── TestCasesTab (Pass/Fail Cards, Exec Time, Memory)
                    ├── CustomInputTab (Interactive Stdin Box)
                    ├── TerminalConsoleTab (Stdout/Stderr Logs)
                    └── DiffViewerTab (Expected vs Actual Output)
```

---

## 2. Exhaustive Component Inventory

### 2.1. Top Navigation & Header Components

| Component | Path / Location | Description & Capabilities | Reference Evidence |
|:---|:---|:---|:---|
| **`ExamHeader`** | `src/components/header/ExamHeader.tsx` | Main top navigation bar (50px height). Orchestrates left status, center countdown timer, and right action buttons. | Visible in all reference screenshots (`00.44.31` through `00.44.44`). |
| **`StatusDotPill`** | `src/components/header/StatusDotPill.tsx` | Rounded pill with 8px status indicator circle. Displays "Not Attempted" (grey), "In Progress" (amber), or "Submitted" (green). | `00.44.31.jpeg`, `00.44.32.jpeg` |
| **`ThemeToggleBtn`**| `src/components/header/ThemeToggleBtn.tsx` | Crescent moon / sun icon toggle switch for dark and light theme switching. | `00.44.31.jpeg`, `00.44.32.jpeg` |
| **`WifiIndicator`** | `src/components/header/WifiIndicator.tsx` | 4-bar radio wave signal SVG indicating live proctored connectivity status. | `00.44.31.jpeg`, `00.44.32.jpeg` |
| **`CandidateBadge`**| `src/components/header/CandidateBadge.tsx` | Monospace/sans uppercase text displaying candidate identity ("BHAVISHYA PAL"). | `00.44.31.jpeg`, `00.44.32.jpeg` |
| **`CountdownTimer`**| `src/components/header/CountdownTimer.tsx` | Real-time countdown timer with distinct numerical badges (`01 Hrs : 17 Min : 43 Sec`). Flashes amber/rose when time is low. | `00.44.31.jpeg`, `00.44.36 (2).jpeg`, `00.44.44.jpeg` |
| **`SectionModePill`**| `src/components/header/SectionModePill.tsx`| Dropdown pill displaying `"Coding Section"` or `"Viva Section"` with switch capability. | `00.44.31.jpeg`, `00.44.44.jpeg` |
| **`RunActionBtn`**  | `src/components/header/RunActionBtn.tsx`  | Secondary outline button with play icon (`▶ Run`) to compile and run against test cases. | `00.44.36 (2).jpeg`, `00.44.40 (1).jpeg` |
| **`SubmitActionBtn`**| `src/components/header/SubmitActionBtn.tsx`| Primary solid blue CTA button (`Submit`) to evaluate all test cases and submit assessment. | `00.44.36 (2).jpeg`, `00.44.40 (1).jpeg` |
| **`ContestEndsBadge`**| `src/components/header/ContestEndsBadge.tsx`| Metadata label indicating overall contest closure timeline ("Contest ends in..."). | `00.44.36 (2).jpeg`, `00.44.37.jpeg` |

### 2.2. Left Activity Rail Components

| Component | Path / Location | Description & Capabilities | Reference Evidence |
|:---|:---|:---|:---|
| **`ActivityRail`**  | `src/components/rail/ActivityRail.tsx`   | Vertical dock (48px width) hosting quick action tool icons on far left edge. | `00.44.32 (1).jpeg`, `00.44.36 (1).jpeg`, `00.44.39.jpeg` |
| **`RailIconButton`**| `src/components/rail/RailIconButton.tsx` | Icon button with active indicator bar, hover tooltip, and keyboard focus states. | `00.44.32 (1).jpeg` |
| **`SectionsDrawer`**| `src/components/rail/SectionsDrawer.tsx` | Collapsible drawer listing test questions (Q1: Inventory Manager, Q2: Quiz Lab, Viva). | `00.44.32 (1).jpeg` |
| **`FileTreeDrawer`**| `src/components/rail/FileTreeDrawer.tsx` | Virtual directory tree allowing browsing and creating files in the project. | `00.44.31.jpeg`, `00.44.36 (1).jpeg` |

### 2.3. Left Problem Pane (Task & Viva) Components

| Component | Path / Location | Description & Capabilities | Reference Evidence |
|:---|:---|:---|:---|
| **`TaskPane`**      | `src/components/task/TaskPane.tsx`       | Scrollable left container holding problem specification or viva conceptual questions. | `00.44.31.jpeg`, `00.44.34 (1).jpeg` |
| **`TaskHeader`**    | `src/components/task/TaskHeader.tsx`     | Section title header ("Task" or "Statement") with semantic typography. | `00.44.31.jpeg`, `00.44.44.jpeg` |
| **`ProblemMarkdown`**| `src/components/task/ProblemMarkdown.tsx`| Formatted prose, requirements checklist, bullet points, and inline code tags. | `00.44.31 (1).jpeg`, `00.44.39.jpeg` |
| **`CodeSchemaBox`** | `src/components/task/CodeSchemaBox.tsx`  | Dark syntax container (`#1e1e1e`) for database schemas (`CREATE TABLE products ...`). | `00.44.31 (1).jpeg`, `00.44.32.jpeg` |
| **`SampleIOBox`**   | `src/components/task/SampleIOBox.tsx`    | High-contrast dark boxes displaying Sample Input and Sample Output with copy button. | `00.44.34 (1).jpeg` |
| **`ProblemRatingWidget`**| `src/components/task/ProblemRatingWidget.tsx`| "Did you like the problem?" thumbs up, thumbs down, comment icon, and count. | `00.44.38.jpeg` |
| **`ScrollTopBtn`**  | `src/components/task/ScrollTopBtn.tsx`   | Floating circular blue action button (`↑`) fixed bottom-left, auto-hidden at top. | `00.44.32 (1).jpeg`, `00.44.34 (1).jpeg` |
| **`VivaSearchDock`**| `src/components/task/VivaSearchDock.tsx` | Docked bottom search bar for Viva mode with case-sensitive toggle and `▲ ▼` buttons. | `00.44.44.jpeg` |

### 2.4. Right IDE & Monaco Editor Components

| Component | Path / Location | Description & Capabilities | Reference Evidence |
|:---|:---|:---|:---|
| **`EditorPane`**    | `src/components/editor/EditorPane.tsx`   | Main container for tab strip, breadcrumb path, Monaco editor canvas, and console. | `00.44.31.jpeg`, `00.44.34.jpeg` |
| **`FileTabBar`**    | `src/components/editor/FileTabBar.tsx`   | Horizontal tab strip (36px height) supporting multiple open buffers. | `00.44.37.jpeg`, `00.44.40 (1).jpeg` |
| **`FileTabItem`**   | `src/components/editor/FileTabItem.tsx`  | Tab item with file type icon (`J` for Java), file name, close button `×`, and active line. | `00.44.37.jpeg`, `00.44.42 (1).jpeg` |
| **`EditorToolbar`** | `src/components/editor/EditorToolbar.tsx`| Right-side actions on tab strip: split editor icon `[ \| ]`, settings `...`, reload `↻`. | `00.44.34.jpeg`, `00.44.40 (1).jpeg` |
| **`BreadcrumbTrail`**| `src/components/editor/BreadcrumbTrail.tsx`| Breadcrumb navigation bar showing active file location in directory hierarchy. | `00.44.34.jpeg`, `00.44.37.jpeg` |
| **`MonacoEditor`**  | `src/components/editor/MonacoEditor.tsx` | Monaco editor integration (`@monaco-editor/react`) with syntax themes and resize layout. | `00.44.33.jpeg`, `00.44.35.jpeg`, `00.44.41.jpeg` |
| **`BlankPlaceholderGuide`**| `src/components/editor/BlankPlaceholderGuide.tsx`| Assessment blank helper allowing navigation between `// TODO:` and `________;` blanks. | `00.44.33 (1).jpeg`, `00.44.36.jpeg` |

### 2.5. Bottom Test Runner & Console Drawer Components

| Component | Path / Location | Description & Capabilities | Reference Evidence |
|:---|:---|:---|:---|
| **`ConsoleDrawer`** | `src/components/console/ConsoleDrawer.tsx`| Resizable and collapsible bottom drawer housing runner output and test results. | Public CodeChef layout & IDE specs |
| **`ConsoleTabBar`** | `src/components/console/ConsoleTabBar.tsx`| Tab header switching between Test Cases, Custom Input, Output Console, and Diff. | Public CodeChef layout & IDE specs |
| **`TestCaseList`**  | `src/components/console/TestCaseList.tsx` | List of test case cards (Test 1, Test 2, Hidden Test) with Passed/Failed badges. | Public CodeChef layout & IDE specs |
| **`CustomInputBox`**| `src/components/console/CustomInputBox.tsx`| Multiline textarea for passing custom test inputs to the compiler. | Public CodeChef layout & IDE specs |
| **`TerminalOutput`**| `src/components/console/TerminalOutput.tsx`| Monospace dark terminal output for stdout, compilation warnings, and error stacks. | Public CodeChef layout & IDE specs |
| **`DiffViewer`**    | `src/components/console/DiffViewer.tsx`   | Side-by-side / inline diff viewer comparing Expected Output vs Actual Output. | Public CodeChef layout & IDE specs |

### 2.6. Dialogs & Modals

| Component | Path / Location | Description & Capabilities |
|:---|:---|:---|
| **`ResetConfirmModal`**| `src/components/modals/ResetConfirmModal.tsx` | Confirmation dialog before reverting code to the initial starter boilerplate. |
| **`SubmitVerdictModal`**| `src/components/modals/SubmitVerdictModal.tsx`| Assessment submission summary modal showing score, passed test count, and verdict. |
| **`ProctorChatModal`** | `src/components/modals/ProctorChatModal.tsx`  | Exam proctor messaging window triggered from the Activity Rail chat icon. |

---

## 3. Reactive State Stores (Zustand)

### 3.1. `useExamStore`
- **Purpose:** Manages exam countdown, candidate identity, section mode, and overall assessment submission state.
- **State Properties:**
  - `status`: `'not_attempted' | 'in_progress' | 'submitted'`
  - `candidateName`: string (default: `"BHAVISHYA PAL"`)
  - `candidateId`: string (e.g., `"25BCS12751"`)
  - `currentSection`: `'coding' | 'viva'`
  - `remainingSeconds`: number (default: `5400` / 90 mins)
  - `isTimerRunning`: boolean
  - `wifiStatus`: `'connected' | 'unstable' | 'disconnected'`
- **Actions:**
  - `tick()`: Decrements remaining seconds, handles auto-submit at 0.
  - `setSection(section)`: Swaps between coding and viva modes.
  - `setStatus(status)`: Updates exam status badge.
  - `submitExam()`: Finalizes exam and opens verdict modal.

### 3.2. `useFileSystemStore`
- **Purpose:** Manages the multi-file project workspace, open tabs, active buffer, and file content modifications.
- **State Properties:**
  - `files`: Record<string, { path: string; name: string; content: string; initialContent: string; language: string; isModified: boolean }>
  - `activeFilePath`: string
  - `openTabPaths`: string[]
- **Actions:**
  - `openFile(path)`: Adds file to tab list and sets as active.
  - `closeTab(path)`: Removes file from tab list, activates adjacent tab.
  - `updateContent(path, content)`: Updates buffer content and marks modified.
  - `resetFile(path)`: Reverts active file to its `initialContent`.
  - `resetProject()`: Reverts all files to initial starter boilerplates.

### 3.3. `useTestRunnerStore`
- **Purpose:** Coordinates test execution, compilation simulation, test case status, custom stdin, and stdout logs.
- **State Properties:**
  - `isRunning`: boolean
  - `activeTab`: `'testcases' | 'custom_input' | 'console' | 'diff'`
  - `customInput`: string
  - `testCases`: Array<{ id: string; name: string; input: string; expectedOutput: string; actualOutput?: string; status: 'idle' | 'passed' | 'failed'; executionTimeMs?: number; memoryMb?: number; isHidden?: boolean }>
  - `consoleLogs`: string[]
- **Actions:**
  - `runCode(isCustomInput?: boolean)`: Triggers compilation simulation and test assertions.
  - `setCustomInput(input)`: Updates custom stdin value.
  - `setActiveTab(tab)`: Changes the bottom console tab.
  - `clearLogs()`: Resets terminal output logs.

### 3.4. `useThemeStore`
- **Purpose:** Manages light and dark mode preferences and synchronization with Monaco editor themes.
- **State Properties:**
  - `theme`: `'light' | 'dark'`
- **Actions:**
  - `toggleTheme()`: Toggles theme, updates HTML document class, and switches Monaco theme (`vs` <-> `vs-dark`).
