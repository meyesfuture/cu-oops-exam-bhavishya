# Tech Stack Specification: High-Fidelity Coding Practice Workspace

## 1. Core Architecture Rationale

The tech stack is selected to achieve instantaneous interactivity, zero-lag code editing, authentic CodeChef visual fidelity, and robust cross-platform responsiveness.

| Layer | Selected Technology | Version / Spec | Primary Rationale |
|:---|:---|:---|:---|
| **Runtime & Bundler** | Vite + Node.js (v24.14.1) | Vite 6.x | Instant HMR, native ES modules, lightweight build pipeline, rapid iteration. |
| **Frontend Framework** | React + TypeScript | React 19 / TS 5.7+ | Strict static typing, concurrent rendering, component composability, clean state hooks. |
| **Styling & Design Tokens** | Tailwind CSS v4 + CSS Variables | Tailwind 4.x / PostCSS | Utility-first styling, zero-runtime CSS, native CSS variable theme tokens (dark/light mode). |
| **Code Editor Engine** | Monaco Editor (`@monaco-editor/react`) | Latest stable | The gold standard engine powering VS Code; syntax highlighting, folding, multi-tab buffer support. |
| **Layout & Split Panes** | `react-resizable-panels` | Latest stable | Accessible, buttery-smooth panel resizers with flexbox-safe sizing and persistent panel state. |
| **State Management** | Zustand | v5.x | Minimalist, unopinionated reactive store for multi-file virtual filesystem, timer, and test runner state. |
| **Icons & Visual Semantics** | `@phosphor-icons/react` / `lucide-react` | Latest | Crisp, uniform, scalable SVG vector icons adhering to the anti-emoji and hairline border standards. |
| **Markdown & Formatting** | `react-markdown` + `remark-gfm` | Latest | High-fidelity rendering of problem specifications, tables, task lists, and syntax blocks. |
| **Unit & Integration Tests** | Vitest + React Testing Library | Latest | Blazing-fast Vite-native test runner, zero extra config, full TypeScript support. |
| **E2E & Visual Testing** | Playwright (`playwright-skill`) | 1.50+ | Multi-viewport automation, screenshot visual regression, automated test coverage. |

---

## 2. Component & Library Breakdown

### 2.1. Monaco Editor Integration
- **Package:** `@monaco-editor/react` + `monaco-editor`
- **Features:**
  - Multi-file tab support: dynamically binding Monaco models (`monaco.editor.createModel`) to tabs.
  - Multi-language support: Java, SQL, Python, C++, TypeScript.
  - Theme syncing: Seamless switching between `vs` (light theme matching CodeChef) and `vs-dark` / custom dark palette.
  - Editor layout recalculation on pane resize using `editor.layout()`.
  - Fill-in-the-blank exam template markers (`// TODO:` and blank underlines).
  - Breadcrumbs integration showing real-time file hierarchy.

### 2.2. Splitter & Pane Management
- **Package:** `react-resizable-panels`
- **Configuration:**
  - Left Pane (Task View): Default 42% width, min 25%, max 70%, collapsible.
  - Right Pane (Monaco IDE): Default 58% width, min 30%, max 75%.
  - Bottom Panel (Test Runner / Console): Vertical split inside Right Pane with default 30% height, collapsible to zero.
  - Custom handle: Clean 3px resizer bar with hover glow and grab cursor.

### 2.3. State Management Architecture (Zustand Stores)
1. **`useFileSystemStore`**:
   - Manages virtual project tree:
     - `files`: Dictionary of file records (`path`, `name`, `content`, `initialContent`, `language`, `isModified`).
     - `activeFilePath`: Path of currently focused tab.
     - `openTabs`: Ordered array of open file paths.
     - Actions: `openFile`, `closeTab`, `updateFileContent`, `resetFile`, `resetProject`.
2. **`useExamStore`**:
   - Manages exam session:
     - `section`: `"coding"` | `"viva"`.
     - `timeRemainingSeconds`: Live countdown (starts at e.g. 5400s / 1h 30m).
     - `status`: `"not_attempted"` | `"in_progress"` | `"submitted"`.
     - `candidateName`: `"BHAVISHYA PAL"`.
     - `wifiStatus`: `"connected"` | `"unstable"` | `"disconnected"`.
     - Actions: `tick`, `toggleSection`, `submitExam`.
3. **`useTestRunnerStore`**:
   - Manages code execution:
     - `isRunning`: Boolean execution flag.
     - `activeBottomTab`: `"testcases"` | `"custom_input"` | `"console"` | `"diff"`.
     - `testCases`: Array of test scenarios with inputs, expected outputs, actual outputs, status (`idle` | `passed` | `failed`), duration, and memory.
     - `consoleOutput`: Streamed stdout/stderr log lines.
     - Actions: `runCode`, `submitCode`, `setCustomInput`, `clearConsole`.

---

## 3. Tooling, MCP Servers, and Skills Inventory

### 3.1. Antigravity Skills Selected & Activated

| Skill | Role in Project | Verification Status |
|:---|:---|:---|
| **`frontend-design`** | Enforces bold, distinctive aesthetic direction; prevents generic AI templates and clichéd layouts. | Active & Verified |
| **`high-end-visual-design`** | Strict anti-pattern gate (no banned fonts/icons), double-bezel card architecture, fluid cubic-bezier motion. | Active & Verified |
| **`ui-ux-pro-max`** | UI/UX intelligence, accessibility guidelines (WCAG 2.2), touch target dimensions, color contrast rules. | Active & Verified |
| **`gravitas-typescript`** | Strict TypeScript verification chain (`tsc --noEmit`, strict null checks, Vitest patterns). | Active & Verified |
| **`ui-styling`** | Tailwind utility patterns, CSS variable theming, dark/light mode toggle consistency. | Active & Verified |
| **`playwright-skill`** | Automated browser execution, multi-viewport verification, screenshot regression testing. | Active & Verified |
| **`modern-web-guidance-plugin`**| Modern web platform capabilities (container queries, CSS variables, `subgrid`, accessible dialogs). | Active & Verified |

### 3.2. MCP Servers & Native Tools Available

| Server / Tool | Capabilities | Integration Point |
|:---|:---|:---|
| **`chrome_devtools` MCP** | 33 tools: `navigate_page`, `click`, `fill`, `take_screenshot`, `evaluate_script`, `list_console_messages`, `resize_page`. | Live browser verification and automated screenshot captures. |
| **`browser` Subagent** | DevTools-driven autonomous browser navigator. | Interactive end-to-end user journey inspection. |
| **`run_command`** | Powershell command executor. | Scaffolding, dependency installation, build and test runs. |

---

## 4. Quality & Verification Gates

```
+-------------------------------------------------------------+
|                     GRAVITAS Verification Chain             |
|                                                             |
|  1. TypeScript Typecheck :  tsc --noEmit                    |
|  2. Lint & Code Quality  :  eslint . --max-warnings 0       |
|  3. Unit & Component Test:  vitest run                      |
|  4. Production Build     :  vite build                      |
|  5. Visual Regression    :  playwright-skill screenshot test|
|  6. Accessibility Audit  :  wcag-audit-patterns check       |
+-------------------------------------------------------------+
```
