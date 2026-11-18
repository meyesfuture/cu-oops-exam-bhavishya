# Design Specification: Coding Practice Workspace

## 1. System Overview & Baseline Viewport

- **Target Primary Viewport:** **1366 × 768 px** (Standard 16:9 laptop display, as verified from reference hardware).
- **Secondary Viewport Targets:** 1920 × 1080 px (FHD Desktop), 1280 × 800 px (Compact Laptop).
- **Layout Paradigm:** Full-height application frame (`height: 100vh / 100dvh`, `overflow: hidden`). No window-level scrolling; all scrolling is isolated within internal panels.
- **Design Philosophy:** Anti-slop, agency-tier precision, authentic assessment utility without violating official branding or impersonating third-party services.

---

## 2. Spatial Hierarchy & Dimensional Blueprint

```
+---------------------------------------------------------------------------------------------------------------+
| TOP HEADER (Height: 50px [Measured])                                                                          |
| [Collapse] [Status Pill] [Theme] [Wi-Fi] [Candidate Name]  |  [Timer Badge]  |  [Run] [Submit] [Contest Ends] |
+----+----------------------------------------------------+---+-------------------------------------------------+
| A  | LEFT PANE: Problem Statement                       | S | RIGHT PANE: Monaco Editor & Test Runner         |
| C  | (Width: 42% / ~548px [Estimated])                  | P | (Width: 58% / ~766px [Estimated])               |
| T  |                                                    | L | - Tab Strip (Height: 36px [Measured])           |
| I  | - Task Header & Title                              | I | - Breadcrumbs Bar (Height: 28px [Estimated])    |
| V  | - Description & Rules                              | T | - Monaco Code Area                              |
| I  | - Inlined Code Pills & Dark Schema Blocks          | T | - Line numbers gutter (Width: 44px [Measured])  |
| T  | - Sample Input / Output Blocks                     | E | - Code folding markers & blanks                 |
| Y  | - Problem Rating Widget                            | R |                                                 |
|    | - Floating Scroll-to-Top Button                    |   |-------------------------------------------------|
| R  |                                                    | 4 | BOTTOM CONSOLE DRAWER (Collapsible)             |
| A  |                                                    | px| Height: 180px - 220px [Estimated]              |
| I  |                                                    |   | [Test Cases] [Custom Input] [Console] [Diff]    |
| L  |                                                    |   |                                                 |
| 48 |                                                    |   |                                                 |
| px |                                                    |   |                                                 |
+----+----------------------------------------------------+---+-------------------------------------------------+
```

### Exact Dimension Measurements & Tolerances

| Component | Dimension | Value Type | CSS Representation | Notes |
|:---|:---|:---:|:---|:---|
| **Header Height** | 50px | **Measured** | `h-[50px] min-h-[50px]` | Fixed across top. 1px bottom border. |
| **Activity Rail Width** | 48px | **Measured** | `w-[48px] min-w-[48px]` | Fixed left edge below header. |
| **Activity Rail Icon Target** | 36 × 36px | **Estimated** | `w-9 h-9 flex items-center justify-center` | 20px SVG icon inside. |
| **Left Pane Width** | ~548px (42%) | **Estimated** | `defaultSize={42} minSize={25} maxSize={70}` | Draggable via resizable panels. |
| **Splitter Width** | 4px | **Measured** | `w-1 hover:w-1.5 transition-all` | Draggable divider with grab cursor. |
| **Right Pane Width** | ~766px (58%) | **Estimated** | `defaultSize={58} minSize={30} maxSize={75}` | Host for Editor + Console. |
| **Tab Bar Height** | 36px | **Measured** | `h-[36px] min-h-[36px]` | Multi-file horizontal strip. |
| **Breadcrumbs Height** | 28px | **Estimated** | `h-[28px] min-h-[28px]` | Path segment navigation. |
| **Editor Gutter Width** | 44px | **Measured** | Monaco option: `lineNumbersMinChars: 3` | Houses line numbers & fold markers. |
| **Bottom Console Drawer**| 200px (open) | **Estimated** | `defaultSize={28} minSize={15} maxSize={60}` | Collapsible to 0px. |
| **Scroll-to-Top Button** | 36 × 36px | **Measured** | `w-9 h-9 rounded-full fixed/absolute` | Circular button with elevation. |

---

## 3. Design Tokens (CSS Variables)

```css
:root {
  /* Canvas & Backgrounds */
  --bg-app: #ffffff;
  --bg-chrome: #f8fafc;
  --bg-dock: #f1f5f9;
  --bg-editor: #ffffff;
  --bg-tab-active: #ffffff;
  --bg-tab-inactive: #f1f5f9;
  --bg-code-box: #1e1e1e;
  --bg-timer: #e0f2fe;

  /* Borders & Dividers */
  --border-subtle: #e2e8f0;
  --border-strong: #cbd5e1;
  --border-focus: #1677ff;
  --border-active-tab: #1677ff;

  /* Typography Colors */
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --text-inverse: #f8fafc;
  --text-code-box: #e2e8f0;
  --text-timer: #0369a1;

  /* Brand Accents */
  --brand-primary: #1677ff;
  --brand-primary-hover: #0958d9;
  --brand-primary-active: #003eb3;
  --brand-secondary: #f8fafc;
  --brand-secondary-border: #cbd5e1;

  /* Status Colors */
  --status-not-attempted: #94a3b8;
  --status-in-progress: #f59e0b;
  --status-submitted: #10b981;
  --status-wifi-active: #22c55e;
  --status-error: #ef4444;

  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-floating: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 9999px;

  /* Transitions */
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --duration-normal: 200ms;
}

/* Dark Mode Tokens */
.dark {
  --bg-app: #0d1117;
  --bg-chrome: #161b22;
  --bg-dock: #090d16;
  --bg-editor: #0d1117;
  --bg-tab-active: #0d1117;
  --bg-tab-inactive: #161b22;
  --bg-code-box: #161b22;
  --bg-timer: #1e3a5f;

  --border-subtle: #30363d;
  --border-strong: #484f58;
  --border-focus: #388bfd;
  --border-active-tab: #388bfd;

  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  --text-muted: #6e7681;
  --text-inverse: #0d1117;
  --text-code-box: #e6edf3;
  --text-timer: #70b8ff;

  --brand-primary: #388bfd;
  --brand-primary-hover: #1f6feb;
  --brand-primary-active: #1158c7;
  --brand-secondary: #21262d;
  --brand-secondary-border: #30363d;
}
```

---

## 4. Typography Scale & Font Architecture

- **Primary UI Font:** `Plus Jakarta Sans`, `Geist`, or `Segoe UI`, `-apple-system`, `sans-serif`.
- **Code & Monospace Font:** `JetBrains Mono`, `Fira Code`, `Consolas`, `monospace`.

| Style Identifier | Size (px / rem) | Weight | Line Height | Tracking | Usage |
|:---|:---:|:---:|:---:|:---:|:---|
| `display-task-title` | 18px / 1.125rem | 700 | 1.35 | -0.01em | Task heading ("Task", "Statement") |
| `heading-section` | 15px / 0.9375rem | 600 | 1.4 | -0.005em | Subsections ("Output Format", "Sample Input") |
| `body-task` | 14px / 0.875rem | 400 | 1.65 | normal | Task statement text and explanations |
| `ui-candidate-name` | 13px / 0.8125rem | 600 | 1.0 | 0.05em | Candidate name badge (uppercase) |
| `ui-timer` | 14px / 0.875rem | 700 | 1.0 | normal | Countdown clock numbers |
| `ui-pill` | 12px / 0.75rem | 500 | 1.0 | normal | Status indicator pills |
| `ui-tab-label` | 13px / 0.8125rem | 500 | 1.0 | normal | Editor file tabs |
| `ui-breadcrumb` | 12px / 0.75rem | 400 | 1.2 | normal | Hierarchy breadcrumbs |
| `code-editor` | 13.5px / 0.843rem | 400 | 1.55 | normal | Monaco editor code buffer |
| `code-sample-box` | 13px / 0.8125rem | 400 | 1.5 | normal | Sample Input & Sample Output boxes |
| `code-inline` | 12.5px / 0.781rem | 500 | 1.4 | normal | Inlined identifiers (`QuizDatabase.java`) |

---

## 5. Component Interaction Specifications

### 5.1. Top Header Component
- **Layout:** Flex row with `items-center justify-between px-4 h-[50px] border-b border-[var(--border-subtle)] bg-[var(--bg-chrome)]`.
- **Status Indicator:**
  - Pill badge with `px-2.5 py-1 rounded-full bg-[var(--border-subtle)]/40 flex items-center gap-2`.
  - 8px circular dot pulsing with amber during active run or solid slate when not attempted.
- **Theme Switcher:**
  - Icon button with smooth 360-degree rotation animation on toggle (`transition-transform duration-300`).
- **Timer Badge:**
  - Container with `px-3 py-1.5 rounded-md bg-[var(--bg-timer)] text-[var(--text-timer)] flex items-center gap-1.5 font-mono font-bold text-sm`.
  - Warning state triggers when `< 600` seconds remain: switches background to soft rose (`#ffe4e6`) and text to dark red (`#be123c`) with an alert pulse.
- **Run Button:**
  - Secondary button: `h-8 px-4 rounded-md border border-[var(--border-strong)] bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 flex items-center gap-1.5 active:scale-[0.98] transition-all`.
- **Submit Button:**
  - Primary button: `h-8 px-5 rounded-md bg-[var(--brand-primary)] text-white text-sm font-semibold hover:bg-[var(--brand-primary-hover)] active:bg-[var(--brand-primary-active)] active:scale-[0.98] transition-all shadow-sm`.

### 5.2. Problem Statement Viewer (Left Pane)
- **Container:** `overflow-y-auto h-full p-6 space-y-5 bg-[var(--bg-app)]`.
- **Code Schema Boxes:**
  - Styled with `bg-[var(--bg-code-box)] text-[var(--text-code-box)] p-4 rounded-lg font-mono text-sm leading-relaxed border border-slate-700/50 relative group`.
  - Copy action button appears on hover in top-right of block.
- **Sample Input & Sample Output:**
  - Paired sequential blocks with crisp black background, white text, and clean margin separation.
- **Problem Feedback Widget:**
  - Docked at bottom of task content: `border-t border-[var(--border-subtle)] pt-4 mt-8 flex items-center justify-between text-xs text-[var(--text-muted)]`.
  - Buttons for thumbs up, thumbs down, and comments with hover active states.
- **Scroll-to-Top Floating Action Button:**
  - Fixed at `bottom-6 left-[68px] z-20 w-9 h-9 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all`.
  - Automatically fades out when scroll position is near top (`scrollTop < 120px`).

### 5.3. Viva Section Mode
- **Toggle:** Switched via Top Bar section dropdown or Activity Rail.
- **Display:** Swaps the left pane content to conceptual questions (e.g. Java Swing JDBC architecture questions from screenshot `00.44.44.jpeg`).
- **Bottom Search Dock:**
  - Fixed bottom bar inside left pane: `h-10 px-3 border-t border-[var(--border-subtle)] bg-[var(--bg-chrome)] flex items-center gap-2`.
  - Input field for query, "Case-sensitive search" checkbox, and `▲ ▼` match navigation.

### 5.4. Monaco Code Editor & Tab Strip
- **Tab Strip:**
  - `h-9 flex items-center border-b border-[var(--border-subtle)] bg-[var(--bg-chrome)] px-2 gap-1 overflow-x-auto`.
  - Tab Item: `h-8 px-3 flex items-center gap-2 text-xs font-medium rounded-t border-t-2 border-transparent hover:bg-[var(--bg-tab-active)] transition-colors cursor-pointer`.
  - Active Tab Item: `bg-[var(--bg-tab-active)] border-t-[var(--border-active-tab)] text-[var(--text-primary)] shadow-sm`.
  - File Type Badges: Red `J` badge for Java files, blue `TS`, cyan `SQL`.
  - Close button `×` on active tab and on hover for inactive tabs.
- **Breadcrumbs:**
  - `h-7 px-4 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] border-b border-[var(--border-subtle)] bg-[var(--bg-app)]`.
- **Editor Canvas:**
  - Integrated with `@monaco-editor/react`.
  - Fill-in-the-blank assessment support: pre-populated blanks (`__________;`) and `// TODO:` comment guidelines.

### 5.5. Bottom Test Runner & Console Drawer
- **Drawer Header:** Tab strip with `Test Cases`, `Custom Input`, `Execution Output`, and `Diff Viewer`.
- **Test Cases Tab:**
  - List of test cards: `Test 1 (Passed - 12ms)`, `Test 2 (Failed - Assertion Error)`, `Test 3 (Hidden)`.
  - Expandable accordion for each test case showing Input, Expected Output, and Actual Output.
- **Custom Input Tab:**
  - Textarea for typing arbitrary standard input before clicking `Run`.
- **Execution Output Tab:**
  - Monospace dark terminal output with ANSI color support for runtime errors and standard out.

---

## 6. Accessibility & WCAG 2.2 Compliance

1. **Color Contrast:**
   - Normal text against canvas: `>= 5.5:1` (exceeding WCAG AA 4.5:1 requirement).
   - UI components and button boundaries: `>= 3.2:1` against adjacent background.
   - Status indicators do not rely on color alone; each badge pairs color with text labels or distinct glyphs.
2. **Keyboard Navigation:**
   - Full keyboard focusability with high-visibility focus ring (`ring-2 ring-[var(--border-focus)] ring-offset-1`).
   - Shortcuts:
     - `Ctrl + Enter`: Trigger `Run`.
     - `Ctrl + Shift + Enter`: Trigger `Submit`.
     - `Ctrl + \`: Toggle bottom console drawer.
     - `Ctrl + B`: Toggle left activity rail / sidebar.
     - `Ctrl + S`: Prevent default browser save and trigger format/lint.
3. **Screen Reader Semantics:**
   - Standard ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `role="region"`, `aria-label`).
   - Live announcements for test runner results via `aria-live="polite"`.
