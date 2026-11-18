# Architecture Specification: Coding Practice Workspace

## 1. Architectural Philosophy & Principles

The coding practice workspace architecture is designed around four core tenets:

1. **Zero-Bloat Dependency Policy:** Eliminate external dependencies wherever native browser APIs and React primitives suffice. We strictly avoid heavy state management libraries (Redux, MobX), CSS-in-JS runtimes, external panel libraries, paid cloud services, and proprietary APIs.
2. **Deterministic State via Custom Hooks:** State is encapsulated in cohesive, single-responsibility custom React hooks (`usePreferences`, `useCountdown`, `useResizable`, `useFileSystem`) combined with safe `localStorage` persistence.
3. **Double-Bezel & Design Token System:** All visual styling is governed by pure CSS custom properties in `src/styles/tokens.css`, ensuring instantaneous theme switching (`light` vs `dark`) and strict anti-slop visual consistency.
4. **Resilient Error Boundaries & Graceful Degradation:** A top-level React `ErrorBoundary` wraps the workspace to catch unexpected rendering exceptions, providing reload and cache-clearing recovery mechanisms.

---

## 2. Directory & Module Hierarchy

```
src/
├── assets/                  # Static media, icons, and branding vectors
├── components/
│   ├── common/              # Reusable UI primitives & safety guards
│   │   ├── Badge.tsx        # Status dot pills, timer unit badges, tags
│   │   ├── Button.tsx       # Primary, secondary, outline, ghost buttons
│   │   ├── ErrorBoundary.tsx# Top-level and panel-level error boundary
│   │   └── IconButton.tsx   # Accessible icon button with title/tooltip
│   ├── controls/            # Action controls
│   │   └── ActionControls.tsx# Run (▶) and Submit CTA action group
│   ├── editor/              # Monaco IDE workspace
│   │   └── EditorPane.tsx   # Tabs strip, breadcrumbs, Monaco wrapper
│   ├── layout/              # Shell, navigation, and panel structure
│   │   ├── ActivityRail.tsx # Vertical slim dock (48px)
│   │   ├── Header.tsx       # Top exam bar (50px)
│   │   └── WorkspaceLayout.tsx# Dual-pane resizable container
│   ├── output/              # Test runner & diagnostics
│   │   └── ConsoleDrawer.tsx# Collapsible bottom drawer for tests & logs
│   └── problem/             # Task statement & Viva view
│       └── ProblemPane.tsx  # Structured problem instructions, sample I/O
├── hooks/                   # Reactive state management hooks
│   ├── useCountdown.ts      # Live exam timer with low-time alerts
│   ├── useFileSystem.ts     # Virtual multi-file buffers & tab management
│   ├── usePreferences.ts    # Theme, font size, and split ratios
│   └── useResizable.ts      # Zero-dependency pointer-event splitter
├── styles/                  # CSS styling system
│   ├── layout.css           # App shell, flexbox, and splitter rules
│   ├── reset.css            # Modern accessible CSS resets & scrollbars
│   └── tokens.css           # CSS variables, colors, typography, radii
├── types/                   # TypeScript domain declarations
│   └── index.ts             # VirtualFile, ProblemSpec, TestCase, etc.
├── utils/                   # Pure helper functions
│   ├── cn.ts                # Lightweight class name merger
│   ├── formatters.ts        # Time, memory, and duration formatters
│   ├── sampleData.ts        # Reference problem & starter templates
│   └── storage.ts           # Safe localStorage getter/setter with fallback
├── App.tsx                  # Root application orchestrator
└── main.tsx                 # Entrypoint mount & CSS bundle imports
```

---

## 3. State Management Architecture

Instead of imposing external state management libraries, the application employs a decoupled local hook architecture:

```
[ App Orchestrator ]
       │
       ├── usePreferences()   --> LocalStorage sync (theme, panel sizes, font size)
       │
       ├── useCountdown()     --> 1s interval clock (formatTimeUnits, warning threshold)
       │
       ├── useFileSystem()    --> In-memory file buffers, active tab, edit flags, reset
       │
       └── useResizable()     --> Pointer capture, drag ratios (25% - 75%), keyboard step
```

### 3.1. `usePreferences`
- **Schema:**
  ```typescript
  interface UserPreferences {
    theme: 'light' | 'dark';
    leftPaneRatio: number;      // default: 42%
    consoleHeight: number;      // default: 200px
    fontSize: number;           // default: 14px
    isConsoleOpen: boolean;     // default: false
    isSidebarOpen: boolean;     // default: true
  }
  ```
- **Reactivity:** Writes to `localStorage` under `codechef_workspace_preferences`. Syncs `data-theme` attribute and `dark` class on `document.documentElement`.

### 3.2. `useCountdown`
- **Features:** Accurate 1-second interval ticking, pauses/resumes, auto-calculates `{ hours, minutes, seconds }` strings, flags warning state when `secondsRemaining <= 600` (10 minutes).

### 3.3. `useFileSystem`
- **Virtual Workspace:** Holds an array of `VirtualFile` objects.
- **Buffer Switching:** Tracks `openTabPaths` and `activeFilePath`. Switching tabs changes the active Monaco model without losing uncommitted edits.
- **Reversion:** Provides `resetFile(path)` to revert individual files and `resetAll()` to reset the entire project back to starter boilerplate.

### 3.4. `useResizable`
- **Zero Dependencies:** Uses standard DOM `PointerEvent` APIs (`pointerdown`, `pointermove`, `pointerup`).
- **Safety:** Automatically clamps size between `minSize` (25%) and `maxSize` (75%).
- **Double-Click Reset:** Resets ratio to `defaultSize` (42%).
- **Accessibility:** Supports keyboard `ArrowLeft` / `ArrowRight` (and `ArrowUp` / `ArrowDown` for vertical drawers) to resize via 1% steps.

---

## 4. Monaco Editor Integration Strategy & Local Worker Bundling

- **Package:** `@monaco-editor/react` (configured with local Vite workers).
- **100% Local Web Worker Bundling:**
  To guarantee complete offline operation and strict SEB kiosk security compliance (zero external CDN requests to unpkg/jsdelivr), all Monaco web workers are imported locally in `src/components/editor/EditorPane.tsx` using Vite worker loaders:
  ```typescript
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') return new jsonWorker();
      if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker();
      if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker();
      if (label === 'typescript' || label === 'javascript') return new tsWorker();
      return new editorWorker();
    },
  };
  ```
- **Language Support & Starter Templates:** Full syntax highlighting and boilerplate support for 5 languages: **Java, C, C++, Python, JavaScript**.
- **Independent Language Draft Management:** Drafts and file tabs are tracked per language, allowing candidates to switch languages without destroying edits.
- **Theme Synchronization:** Binds to `preferences.theme`:
  - `light` mode maps to Monaco `'vs'`.
  - `dark` mode maps to Monaco `'vs-dark'`.
- **Automatic Layout:** `automaticLayout: true` guarantees Monaco recalculates editor bounds whenever the user drags the splitter divider or toggles fullscreen.
- **Exam Placeholder Mode:** Formats fill-in-the-blank placeholders (`__________;`) and `// TODO:` comment guidelines with standard syntax highlighting.

---

## 5. Design Token System & Theming

Tokens are implemented as native CSS custom properties in `src/styles/tokens.css`:

| Category | Primary CSS Variables | Purpose |
|:---|:---|:---|
| **Backgrounds** | `--bg-app`, `--bg-chrome`, `--bg-dock`, `--bg-editor`, `--bg-code-box`, `--bg-timer` | Semantic surfaces across light and dark modes |
| **Borders** | `--border-subtle`, `--border-strong`, `--border-focus`, `--border-active-tab` | Hairline dividers and focus rings |
| **Text** | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-timer`, `--text-code-box` | WCAG AA compliant contrast tiers |
| **Brand** | `--brand-primary`, `--brand-primary-hover`, `--brand-secondary` | Primary blue actions (`#1677ff`) and secondary buttons |
| **Status** | `--status-not-attempted`, `--status-in-progress`, `--status-submitted`, `--status-wifi-active` | Dot indicators and badges |
| **Typography** | `--font-sans`, `--font-mono`, `--font-size-xs` to `--font-size-xl` | Plus Jakarta Sans / JetBrains Mono |
| **Transitions**| `--ease-spring: cubic-bezier(0.32, 0.72, 0, 1)`, `--duration-fast: 150ms` | Haptic, smooth micro-interactions |

---

## 6. Responsive Layout Strategy

- **Baseline Viewport:** **1366 × 768 px** (16:9 laptop screen).
- **Minimum Supported Width:** 1024px desktop/tablet landscape.
- **Splitter Bounds:**
  - Left Problem Pane: Minimum 25% (~340px at 1366px), maximum 70%, default 42% (~548px).
  - Right Editor Pane: Minimum 30% (~410px at 1366px), default 58% (~766px).
- **Console Drawer:** Minimum 100px, maximum 500px, default 200px. Collapsible to 28px collapsed bar.

---

## 7. Global Error Handling & Resilience

1. **`ErrorBoundary` Component:**
   - Wraps the root application tree in `App.tsx`.
   - Intercepts uncaught JavaScript exceptions during component lifecycle.
   - Renders a styled alert card displaying the error message, a "Reload Application" button, and a "Reset Cache" button to clear corrupt `localStorage` entries.
2. **Safe Storage Wrapper (`src/utils/storage.ts`):**
   - Catches quota exceeded errors and private browsing access exceptions, falling back gracefully to in-memory state.

---

## 8. Safe Exam Browser (SEB 3.x) Kiosk Integration

The application operates as an independent, high-fidelity offline coding practice simulator tailored for execution inside Safe Exam Browser 3.x (Embedded Chromium/CEF):

1. **Zero External Network Dependencies:**
   - All fonts, CSS styles, scripts, and Monaco web workers are bundled directly in the distribution directory.
   - Operates completely offline with zero calls to remote endpoints.
2. **Context-Menu Independence:**
   - Embedded Chromium builds in SEB disable native browser context menus. Every required action (compilation, running, draft saving, font resizing, file creation, tab switching, and clipboard operations) is bound to explicit on-screen visual controls.
3. **In-DOM Overlays vs Native Dialogs:**
   - SEB suppresses popup windows and blocks native browser dialogs (`window.open()`, `alert()`, `confirm()`).
   - All dialogs (Submission Confirmation, Revert File, Discard Changes, Settings, Candidate Profile, Proctor Chat) are implemented as accessible in-DOM modal overlays with keyboard trap management.
4. **Official Kiosk Quit Navigation:**
   - In SEB kiosk mode, OS windows and browser chrome are locked down.
   - The end page (`CompletionScreen.tsx`) provides the official `Quit Safe Exam Browser` button, which navigates the current tab to `https://safeexambrowser.org/exit`. When SEB is configured with this exit URL by the exam coordinator, the kiosk intercepts the request and terminates cleanly.

---

## 9. Practice Execution & Simulation Architecture

The bottom console workspace (`src/components/output/BottomWorkspace.tsx`) decouples local practice runs from official test evaluation:

1. **Local Run Simulation:**
   - Executes code against visible sample test cases.
   - Renders animated execution states, execution timing badges, and formatted standard output / error streams.
2. **Practice Submission Judging Engine:**
   - Simulates an automated grading service across multiple hidden test cases.
   - Emits realistic grading verdicts: `Accepted (100/100)`, `Wrong Answer`, `Compilation Error`, `Runtime Error`, and `Time Limit Exceeded`.
   - Clearly flags results as a local simulation to maintain academic integrity while preparing candidates for live contest environments.
   - Structured with modular interfaces to allow straightforward plugging into genuine backend sandbox executors (e.g. Judge0, Piston) without modifying UI components.

