# Project Progress: Coding Practice Workspace (Safe Exam Browser Kiosk)

## Current Status: Visual Quality Assurance (QA) Complete (1366 × 768 px Verified)

All 8 application states have been captured via headless browser automation at the reference 1366 × 768 px viewport, verified against the source-of-truth camera photographs, and audited across 14 visual criteria. Detailed discrepancies, tolerances, and findings are documented in `docs/visual-qa.md`.

---

## Implemented Feature Matrix

### 1. Header Navigation & Workspace Information
- [x] **Application Navigation Drawer:**
  - Accessible via the hamburger menu (`Menu` icon) at top-left.
  - Displays assessment overview, current question selection (Q1: Java SQLite JDBC, Q2: Swing Quiz H2, Q3: Binary Tree Level Order Traversal) with active checkmarks and one-click switching.
  - Exam section switcher (`Coding Section` / `Viva Section`).
  - Active candidate metadata and remaining time.
  - "Quit Safe Exam Browser" button with in-DOM confirmation dialog.
- [x] **Workspace & Candidate Information:**
  - Candidate Name: `BHAVISHYA PAL`.
  - Subtext: `cuchd_cc_275 | TIWUKE` (matching reference photos `media_1794949149047_43eb9d9e.jpg` and `media_1794949151206_b2eac9f2.jpg`).
  - Network Wi-Fi status indicator with detailed IP tooltip (`47.247.118.30 Allowed for this test`).
  - Moon glyph indicator with SEB Light Mode tooltip.
- [x] **Dynamic Status Indicators:**
  - `• Not Attempted` (initial state, neutral slate pill).
  - Automatically transitions to `• In Progress` (amber pill with amber indicator dot) as soon as code is edited or executed.
  - `• Submitted` (green pill) once final assessment submission is completed.
- [x] **Primary Header Actions:**
  - Segmented light-blue countdown badges (`01 Hrs : 17 Min : 34 Sec`).
  - **Run Button:** Includes spinning `Loader2` animation, disabled loading state, sample assertion execution, and console log output.
  - **Submit Button:** Opens an in-DOM confirmation dialog (`Confirm Assessment Submission`) showing time remaining and submission warning, preventing accidental submissions in SEB kiosk mode.

---

### 2. Editor Toolbar Controls
- [x] **Language Selector Dropdown:**
  - Supports 5 programming languages: Java, C, C++, Python, JavaScript.
  - Switching languages preserves all file buffers, active tabs, and edits without loss.
- [x] **Font Size Controls:**
  - Direct `A-` (decrease font size, min 12px) and `A+` (increase font size, max 18px) buttons.
  - Dropdown selector (`12px`, `13px`, `14px`, `15px`, `16px`, `18px`).
  - Real-time Monaco layout updates on change.
- [x] **Word Wrap Toggle:**
  - In-DOM toggle button with active background and color indicator (`on` / `off`).
- [x] **Editor Settings Modal:**
  - Accessible via the gear icon (`Settings`) in the toolbar.
  - Tab Size configuration: `2 spaces` vs `4 spaces`.
  - Line numbers: `on` vs `off`.
  - Bracket pair colorization: `enabled` vs `disabled`.
  - Code minimap: `disabled (default)` vs `enabled`.
- [x] **Revert / Reset File Action:**
  - Dedicated `RotateCcw` icon in toolbar.
  - Prompts an in-DOM confirmation dialog (`Revert Current File?`) before reverting to starter template.
- [x] **Fullscreen Mode:**
  - In-DOM viewport expansion button (`Maximize2` / `Minimize2`).
  - Expands editor to 100% of viewport without triggering browser permission dialogs; press `Escape` or the restore button to return.

---

### 3. File System & Tab Operations
- [x] **File Tab Strip:**
  - Active tab highlighted with `2px solid #007bff` top accent border, bold weight, and `#ffffff` background.
  - Color-coded language badges (`J` for Java, `C++` for C++, `Py` for Python, `JS` for JavaScript, `C` for C).
  - Unsaved modifications indicator (`•` amber dot).
- [x] **New File Creation:**
  - `+` button opens in-DOM filename prompt with automatic language extension inference.
- [x] **Tab Close & Modification Safety:**
  - `×` button closes tabs when more than 1 tab is open.
  - If closing an unsaved modified file, triggers an in-DOM confirmation modal (`Discard Unsaved Changes?`) with "Keep Open" and "Discard & Close" options.

---

### 4. Workspace Panels & Resizing
- [x] **Draggable Vertical Splitter:**
  - Smooth mouse and pointer dragging between Problem Description and Code Editor.
  - Double-click resets split ratio to default (42%).
  - Keyboard accessibility (ArrowLeft / ArrowRight).
  - **Expand/Collapse Pane Controls:** Embedded chevron button (`<` / `>`) on splitter allows collapsing the problem pane to 0% width for full-width coding, and expanding back to previous ratio.
- [x] **Bottom Console & Test Runner Drawer:**
  - Draggable horizontal resizer handle (adjustable between 100px and 450px).
  - Collapsible header bar (`>_ Console & Test Cases`) with `Click to collapse` / `Click to open` indicator.
  - Sub-tabs: `Test Cases`, `Execution Log`, `Custom Input`.

---

### 5. Activity Rail (8 Functional Controls)
Every visible icon on the activity dock performs an advertised interactive action:
1. `List` (Task Statement) -> Selects Problem Statement tab.
2. `AlertCircle` (Problem Info) -> Opens `Problem Specifications & Scoring` in-DOM modal.
3. `Folder` (Files) -> Opens `Workspace File Explorer` in-DOM modal with buffer list and file creation.
4. `GitBranch` (Structure & History) -> Opens `Revision History & Snapshots` in-DOM modal.
5. `RotateCcw` (Reset Workspace) -> Opens `Reset Entire Workspace` confirmation in-DOM modal.
6. `Terminal` -> Toggles bottom test output console drawer.
7. `MessageSquare` (Proctor Chat) -> Opens `Live Invigilator & Proctor Support` in-DOM chat modal with quick messages.
8. `User` (Profile) -> Opens `Candidate Examination Profile` in-DOM card with UID, Lab, Seat, IP, and SEB integrity status.

---

### 6. Keyboard Shortcuts & Safety Guards
- [x] `Ctrl + Enter`: Run code & test assertions.
- [x] `Ctrl + S`: Persist current draft to local storage + show success toast.
- [x] `Ctrl + +` / `Ctrl + =`: Increase editor font size.
- [x] `Ctrl + -`: Decrease editor font size.
- [x] `Escape`: Exit fullscreen / dismiss active in-DOM modal.
- [x] **SEB Kiosk Protection:** Never intercepts OS or SEB security key combinations (F5, F11, Alt+Tab, Ctrl+W, Ctrl+Q, Ctrl+T, Ctrl+N).

---

### 7. Bottom Workspace & Practice Execution Experience
- [x] **Input Panel:**
  - Multiline custom input editor with line and character metrics.
  - Preset test case loader buttons (`Tree Sample 1`, `Tree Sample 2 (Skewed)`, `Single Node`).
  - Active toggle checkbox: "Use custom input for Run".
  - One-click copy with clipboard fallback and clear input action.
- [x] **Output Panel:**
  - Real-time execution logs with stream filters (`All Output`, `stdout`, `stderr`).
  - Stream metrics header: Exit Code, Execution Time, Peak Memory, and Client Simulation banner.
  - One-click copy with feedback and clear log actions.
- [x] **Run Experience (Sample Assertions):**
  - Predefined test cases runner with live progress bar and step descriptions.
  - Split-view case list with Passed/Failed status pills.
  - Deep-dive test case inspector displaying Input, Expected Output, and Actual Output.
- [x] **Submit Experience (Judging Simulation):**
  - Multi-stage evaluation sequence: "Queued..." -> "Compiling..." -> "Executing hidden test cases (10/10)..." -> "Calculating score...".
  - Full support and presentation for all 5 verdict states:
    - **Accepted (AC):** Score 100/100, green theme, 10/10 hidden cases passed.
    - **Wrong Answer (WA):** Score 20/100, red theme, output mismatch failure on Test Case 3.
    - **Compilation Error (CE):** Score 0/100, amber theme, compiler diagnostics trace.
    - **Runtime Error (RE):** Score 0/100, purple theme, stack trace (NullPointerException / SIGSEGV).
    - **Time Limit Exceeded (TLE):** Score 40/100, orange theme, CPU timeout (`> 1.000s`) on Test Case 5.
  - Subtask grading breakdown table (Subtask 1, 2, 3), memory benchmarks, and submission IDs.
  - Practice simulation verdict switcher (`Auto`, `AC`, `WA`, `CE`, `RE`, `TLE`) for on-demand grading validation.
  - Extensible service architecture (`IExecutionService`) allowing a genuine compiler backend (e.g. Judge0, Piston) to be plugged in seamlessly.

---

### 8. High-Fidelity Reference Reconstructions (New Camera References)
- [x] **Opening & Assessment Lobby Screen (`media_1794947728942_829c0ee8.jpg`):**
  - Complete SEB Window Top Chrome Bar (`|<` Back, `C` Reload, `≡` SEB Menu).
  - Header title: `CU CSE OOPS end semester practical exam Slot 1(9:30 AM - 11:00 AM)`.
  - Top action buttons: `[-> Logout]` and `[-> Quit Safe Exam Browser]` (red borders, red icons/text, white background).
  - Candidate details: `SUBHAM PANIGRAHI`, `CodeChef Username: cuchd_cc_311`, `IP - 47.247.118.30`.
  - Green circular Wi-Fi indicator badge, 1 Hour 30 Minutes duration, 2 Questions document icon.
  - Assessment Rules box with 4 exact bullet points.
  - Footer: `Assessment Starts In` with blue numeric badges `07` `Hrs :` `40` `Min`, plus a primary "Start Assessment" action.
  - SEB Bottom Taskbar: `Open Webpages` button, globe icon, battery, sound, wifi, `ENG`, date and time `01:49 \n 18-11-2026`.
- [x] **Question 3 Problem Description & Constraints (`media_1794949149047_43eb9d9e.jpg` & `media_1794949151206_b2eac9f2.jpg`):**
  - Header: `BHAVISHYA PAL`, `cuchd_cc_275 | TIWUKE`, `Coding Section 01 Hrs : 17 Min`.
  - Seamlessly begins under `Statement` tab with `Input Format` (no extraneous overarching title).
  - Mathematical variable subscripts for constraints (*p*<sub>i</sub>, *c*<sub>i</sub>, *R*<sub>i</sub>, *N*).
  - Authentic proctoring diagonal watermark: `25BCS12751@cuchd.in cuchd.in` repeating in background.
  - Two-column side-by-side Sample 1 table with copy buttons.
  - `More Info` section: Time limit (1 secs), Memory limit (1.5 GB), Source Limit (50000 Bytes).
  - "Did you like the problem?" feedback card (8 users found this helpful, thumbs up/down, comments).
  - Pinned circular blue scroll-to-top button (`↑`) fixed at the bottom-left corner with zero text collision.

---

### 9. Persistence, Design Polish, Responsiveness & Accessibility (Complete)
- [x] **Safe Serialization & Recovery Persistence (`localStorage`):**
  - **Code drafts:** Preserved across all 5 programming languages with independent file buffers, modification states, and tab selections.
  - **Selected language:** Restored automatically on page reload.
  - **Open files:** Preserved per language.
  - **Custom input:** Restored seamlessly into the input panel along with the "use custom input" toggle state.
  - **Editor font size:** Persisted (`11px` - `24px`).
  - **Word wrap:** Persisted (`on` / `off`).
  - **Panel proportions:** Split ratio (`leftPaneRatio`) and bottom drawer height (`consoleHeight`) safely clamped and persisted.
  - **Other editor settings:** Tab size (`2` vs `4`), line numbers (`on` vs `off`), bracket colorization, and minimap.
  - **Safe In-Memory Fallback:** Fully operational when `localStorage` is denied or disabled by SEB kiosk restrictions.
- [x] **Design Polish:**
  - Modern subtle desktop scrollbars (`6px` width, rounded `#cbd5e1` thumb).
  - Clear `:focus-visible` accessible ring (`2px solid #1677ff`, `1px` offset) across all 43 interactive buttons and controls.
  - Responsive collapse of secondary metadata at $\le 1024$px to prevent layout squeeze.
- [x] **Multi-Resolution Responsiveness (Zero Horizontal Overflow):**
  - **1920 × 1080 (Full HD):** [preview-responsive-1920x1080.png](file:///b:/Projects/unsafed/preview-responsive-1920x1080.png) — Zero scroll, complete proportional balance.
  - **1366 × 768 (Target Baseline):** [preview-responsive-1366x768.png](file:///b:/Projects/unsafed/preview-responsive-1366x768.png) — Source-of-truth reference baseline.
  - **1280 × 720 (720p HD):** [preview-responsive-1280x720.png](file:///b:/Projects/unsafed/preview-responsive-1280x720.png) — Zero overflow, clean Monaco layout.
  - **1024 × 768 (Compact Kiosk):** [preview-responsive-1024x768.png](file:///b:/Projects/unsafed/preview-responsive-1024x768.png) — Zero horizontal scrolling (`scrollWidth == windowWidth`), full Monaco usability.
- [x] **Accessibility (WCAG 2.2):**
  - Semantic landmark roles (`main`, `banner`, `contentinfo`, `tablist`, `tab`, `region`).
  - 43/43 interactive buttons equipped with accessible `aria-label` or visible text.

---

### 10. Verification Evidence
- [x] `npm run build`: Zero errors, exit code 0 (`tsc -b && vite build`).
- [x] Automated Persistence & Responsiveness Suite (`test-responsiveness-and-persistence.mjs`): All tests passed.
- [x] Visual Verification Captures (1366 × 768):
  - [preview-new-ref-opening-1366x768.png](file:///b:/Projects/unsafed/preview-new-ref-opening-1366x768.png)
  - [preview-new-ref-q3-top-1366x768.png](file:///b:/Projects/unsafed/preview-new-ref-q3-top-1366x768.png)
  - [preview-new-ref-q3-bottom-1366x768.png](file:///b:/Projects/unsafed/preview-new-ref-q3-bottom-1366x768.png)
  - [preview-run-experience-1366x768.png](file:///b:/Projects/unsafed/preview-run-experience-1366x768.png)
  - [preview-input-panel-1366x768.png](file:///b:/Projects/unsafed/preview-input-panel-1366x768.png)
  - [preview-output-panel-1366x768.png](file:///b:/Projects/unsafed/preview-output-panel-1366x768.png)
  - [preview-submit-accepted-1366x768.png](file:///b:/Projects/unsafed/preview-submit-accepted-1366x768.png)
  - [preview-submit-wa-1366x768.png](file:///b:/Projects/unsafed/preview-submit-wa-1366x768.png)
  - [preview-submit-ce-1366x768.png](file:///b:/Projects/unsafed/preview-submit-ce-1366x768.png)
  - [preview-submit-re-1366x768.png](file:///b:/Projects/unsafed/preview-submit-re-1366x768.png)
  - [preview-submit-tle-1366x768.png](file:///b:/Projects/unsafed/preview-submit-tle-1366x768.png)
  - [preview-responsive-1920x1080.png](file:///b:/Projects/unsafed/preview-responsive-1920x1080.png)
  - [preview-responsive-1366x768.png](file:///b:/Projects/unsafed/preview-responsive-1366x768.png)
  - [preview-responsive-1280x720.png](file:///b:/Projects/unsafed/preview-responsive-1280x720.png)
  - [preview-responsive-1024x768.png](file:///b:/Projects/unsafed/preview-responsive-1024x768.png)

---

### 11. Dedicated Visual QA Suite (1366 × 768 px Verified)
- [x] State 1 (Initial App / Lobby): [qa-state-1-initial-app.png](file:///b:/Projects/unsafed/qa-state-1-initial-app.png)
- [x] State 2 (Editor Containing Code): [qa-state-2-editor-code.png](file:///b:/Projects/unsafed/qa-state-2-editor-code.png)
- [x] State 3 (Language Dropdown Open): [qa-state-3-language-dropdown.png](file:///b:/Projects/unsafed/qa-state-3-language-dropdown.png)
- [x] State 4 (Multiple File Tabs): [qa-state-4-multiple-file-tabs.png](file:///b:/Projects/unsafed/qa-state-4-multiple-file-tabs.png)
- [x] State 5 (Input/Output Expanded): [qa-state-5-input-output-expanded.png](file:///b:/Projects/unsafed/qa-state-5-input-output-expanded.png)
- [x] State 6 (Run Result Displayed): [qa-state-6-run-result.png](file:///b:/Projects/unsafed/qa-state-6-run-result.png)
- [x] State 7 (Submit Result Displayed): [qa-state-7-submit-result.png](file:///b:/Projects/unsafed/qa-state-7-submit-result.png)
- [x] State 8 (Editor Fullscreen): [qa-state-8-editor-fullscreen.png](file:///b:/Projects/unsafed/qa-state-8-editor-fullscreen.png)
- [x] Formal Audit Report: [docs/visual-qa.md](file:///b:/Projects/unsafed/docs/visual-qa.md)

---

### 12. End-Page Safe Exam Browser Quit Action
- [x] **Quit Safe Exam Browser Button:**
  - Exclusively rendered on the assessment completion / end page (`CompletionScreen.tsx`), completely omitted during the active workflow.
  - Button text: `Quit Safe Exam Browser`.
  - Configured with the official SEB exit link: `https://safeexambrowser.org/exit`.
  - On click, triggers `window.location.href = 'https://safeexambrowser.org/exit'` in the current browser tab, enabling configured SEB clients to catch the quit link and exit.
  - Existing completion card layout, star rating widget, and feedback state remain completely intact.
  - Verified via [verify-quit-button.mjs](file:///b:/Projects/unsafed/verify-quit-button.mjs) and captured in [preview-completion-with-quit-1366x768.png](file:///b:/Projects/unsafed/preview-completion-with-quit-1366x768.png).

---

### 13. Final Engineering Audit & Release Preparation
- [x] **Comprehensive Functional Testing (16/16 Passed):**
  - Editor input, typing, and syntax highlighting tokenization.
  - Language switching across Java, C, C++, Python, JavaScript with non-destructive draft preservation.
  - File tabs switching, active indicators, creation, and safety confirmations.
  - Custom input editing and sample preset loading.
  - Output controls: output log inspection, clipboard copy with fallback, clear output.
  - Run simulation: progress animation, test assertions, stdout and execution metrics.
  - Submit simulation: test case evaluation, scoring, verdict badges (Accepted, WA, CE, RE, TLE).
  - Keyboard shortcuts: Ctrl+S, Ctrl+Enter, Escape.
  - Fullscreen toggle and split restore.
  - Font scaling (12px to 18px).
  - Draggable splitters and drawer resizers.
  - LocalStorage state persistence across full browser reloads.
  - Completion screen and Quit Safe Exam Browser URL dispatch.
- [x] **Code Quality & Static Analysis:**
  - Strict TypeScript mode passing (`tsc -b` code 0 with zero errors or warnings).
  - Clean imports, zero dead code, zero duplicate components, zero CSS duplication.
- [x] **Production Build & Verification:**
  - Vite production bundle generated without errors in `dist/`.
  - 100% local Monaco web workers (`dist/assets/*.worker-*.js`), zero external CDN dependencies.
  - Verified in live browser preview on port 4173.
- [x] **Documentation Delivered:**
  - [README.md](file:///b:/Projects/unsafed/README.md) created with architecture, setup, and usage guidelines.
  - [docs/test-report.md](file:///b:/Projects/unsafed/docs/test-report.md) comprehensive QA test matrix.
  - [docs/architecture.md](file:///b:/Projects/unsafed/docs/architecture.md) updated with worker bundling and SEB kiosk specifications.
  - [docs/progress.md](file:///b:/Projects/unsafed/docs/progress.md) updated to final release readiness status.

