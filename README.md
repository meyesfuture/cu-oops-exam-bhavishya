# Coding Practice Workspace (Safe Exam Browser Kiosk Simulator)

A high-fidelity, independent offline coding practice simulator designed for competitive programming and academic examination preparation. Tailored for execution inside **Safe Exam Browser 3.x (Embedded Chromium/CEF)** as well as all modern evergreen web browsers.

---

## 🌟 Key Features

### 1. Zero External Dependencies & 100% Local Monaco Workers
- Bundles Monaco Editor web workers (`editor.worker`, `ts.worker`, `json.worker`, `html.worker`, `css.worker`) locally with Vite.
- **Zero CDN calls:** Operates completely air-gapped and offline without requesting assets from unpkg, jsdelivr, or Google Fonts.

### 2. Full Code Editor Experience
- **5 Supported Languages:** Java, C, C++, Python, JavaScript with language-specific starter boilerplate and templates.
- **Independent Language Draft Retention:** Switching languages preserves all file buffers, unsaved edits, and active tabs without destroying draft state.
- **Multi-File Tab Strip:** Active tab indicator (`2px solid #007bff` top border), file language badges, unsaved modification dot (`•`), and safety warnings when closing modified buffers.
- **Configurable Editor:** Font scaling (`A-` / `A+`, 12px–18px), word wrap toggle, tab size (2 vs 4 spaces), bracket pair colorization, line numbers, and in-DOM fullscreen mode.

### 3. Exam Shell & Navigation
- **Top Header Bar:** Segmented countdown timer (`01 Hrs : 17 Min : 34 Sec`), Wi-Fi status indicator (`47.247.118.30`), candidate metadata (`BHAVISHYA PAL | cuchd_cc_275 | TIWUKE`), and dynamic status pills (`• Not Attempted`, `• In Progress`, `• Submitted`).
- **Application Navigation Drawer:** Accessible via the top-left hamburger menu to switch between questions (Q1: Java SQLite JDBC, Q2: Swing Quiz H2, Q3: Binary Tree Level Order Traversal) and exam sections (`Coding Section` / `Viva Section`).
- **Activity Rail:** 8 functional sidebar tools (Statement, Problem Specs, File Explorer, Revision Snapshots, Workspace Reset, Console, Proctor Chat, Candidate Profile).

### 4. Interactive Workspace Layout
- **Draggable Vertical Splitter:** Adjust proportions between Problem Pane and Code Editor (25% to 75% range), double-click to reset (42%), with a one-click collapse/expand chevron.
- **Collapsible Bottom Drawer:** Draggable horizontal drawer with sub-tabs for `Test Cases`, `Execution Log`, and `Custom Input`.

### 5. Decoupled Practice Execution & Judging Engine
- **Local Run Simulation:** Real-time animated runner evaluating user code against sample assertions, displaying execution time and formatted standard output / error streams.
- **Practice Submission Judging Simulation:** Automated judging simulation testing hidden test cases with verdicts: `Accepted (100/100)`, `Wrong Answer`, `Compilation Error`, `Runtime Error`, and `Time Limit Exceeded`.
- **Modular Sandbox Design:** Structured with clean interfaces to allow straightforward plugging into genuine backend compiler services (e.g. Judge0, Piston).

### 6. Safe Exam Browser 3.x Compatibility
- **In-DOM Overlays:** Suppresses native popups and replaces all browser alerts/confirms with accessible in-DOM modal dialogs.
- **Context-Menu Independence:** 100% operational through visible on-screen toolbar controls.
- **Keyboard Discipline:** Scopes application shortcuts (`Ctrl+Enter`, `Ctrl+S`, `Escape`) to the editor, never intercepting OS or SEB security key combinations.
- **Official Quit SEB Protocol:** The completion screen includes the official `Quit Safe Exam Browser` button configured with `https://safeexambrowser.org/exit` to terminate kiosk sessions when configured by exam administrators.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript (Strict Mode) + Vite
- **Code Editor:** Monaco Editor (`monaco-editor` + `@monaco-editor/react` with local web workers)
- **Styling:** Design Tokens via Pure CSS Variables (`src/styles/tokens.css`, `src/styles/layout.css`, `src/styles/reset.css`)
- **Icons:** `lucide-react` (Vector SVGs only; zero emojis in UI)
- **State Management:** Custom React Hooks (`usePreferences`, `useCountdown`, `useResizable`, `useFileSystem`) + LocalStorage with in-memory fallback
- **Target Runtime:** Windows Safe Exam Browser 3.x + Chromium / CEF + Evergreen Desktop Browsers

---

## 🚀 Setup & Launch Instructions

### Prerequisites
- Node.js (v18+ recommended, verified on v24.14.1)
- npm (v9+)

### Installation
```bash
# Clone the repository and enter the directory
cd B:\Projects\unsafed

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### Production Build
```bash
npm run build
```
Executes strict TypeScript checking (`tsc -b`) and generates production bundles in `dist/`.

### Production Preview
```bash
npm run preview
# or specify port:
npx vite preview --port 4173 --host 127.0.0.1
```
Serves the built distribution at `http://127.0.0.1:4173/`.

---

## 🧪 Testing & Verification

A comprehensive automated testing suite using Chrome DevTools Protocol (CDP) is included to verify all interactions:

```bash
# Run comprehensive 16-point functional audit
node test-final-audit.mjs

# Verify Safe Exam Browser Quit button behavior
node verify-quit-button.mjs

# Run visual quality assurance screenshot comparison
node run-visual-qa.mjs
```

---

## 📁 Project Directory Structure

```
src/
├── assets/                  # Static SVG assets & brand icons
├── components/
│   ├── common/              # Reusable primitives (Badge, Button, IconButton, ErrorBoundary)
│   ├── completion/          # End-page completion card & Quit SEB button
│   ├── controls/            # Action controls (RunActionBtn, SubmitActionBtn)
│   ├── editor/              # Monaco EditorPane, FileTabBar, Breadcrumbs, SettingsModal
│   ├── layout/              # Header, ActivityRail, WorkspaceContainer, Splitter
│   ├── modals/              # In-DOM modals (Profile, ProctorChat, Reset, Revert, Submit)
│   ├── output/              # BottomWorkspace, ConsoleDrawer, TestCaseList, CustomInput
│   └── problem/             # ProblemPane, TaskStatement, SampleIO, VivaStatementViewer
├── hooks/                   # Custom state hooks (usePreferences, useCountdown, useResizable, useFileSystem)
├── styles/                  # Design tokens and responsive styles (tokens.css, layout.css, reset.css)
├── types/                   # TypeScript interfaces and domain models
└── utils/                   # Storage helpers, string formatters, sample problem catalog
```

---

## ⚠️ Known Limitations & Assumptions

1. **Simulated Execution Engine:** Code evaluation runs locally in client-side simulation mode. It does not invoke a genuine remote compiler backend. All results are explicitly identified as simulated practice assessments.
2. **SEB Administrator Configuration:** The `Quit Safe Exam Browser` button targets `https://safeexambrowser.org/exit`. In a live Safe Exam Browser environment, the exam coordinator must configure this exact URL as the SEB Quit URL in the `.seb` client profile for the browser kiosk to exit automatically upon click.
3. **Storage Access Policies:** In ultra-restricted kiosk environments where `localStorage` is disabled by group policy, the application seamlessly falls back to an in-memory session dictionary; drafts persist during the active session but will reset if the browser is hard-restarted.
