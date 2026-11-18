# Visual Quality Assurance (QA) Report: Coding Practice Workspace

**Target Viewport:** 1366 × 768 px (Safe Exam Browser / Windows 16:9 Standard Laptop Display)  
**Date of Audit:** November 18, 2026  
**Auditor / Agent:** Antigravity Autonomous Visual QA Suite  
**Verification Method:** Chrome DevTools Protocol (CDP) live browser automation + High-resolution screenshot capture + Direct reference photo cross-examination

---

## 1. Executive Summary

This audit completes the formal visual quality assurance phase for the offline coding practice workspace simulator. All 8 target states were captured at the reference resolution of **1366 × 768 px** using headless Chromium browser automation with device metric overrides.

Each state was evaluated against:
1. The supplied camera reference photographs:
   - `media_1794947728942_829c0ee8.jpg` (Opening Lobby Screen with Safe Exam Browser chrome)
   - `media_1794949149047_43eb9d9e.jpg` (Question 3 Problem Pane bottom: Constraints, Sample 1, More Info, Problem Feedback, Scroll FAB)
   - `media_1794949151206_b2eac9f2.jpg` (Question 3 Problem Pane top: SEB Window Bar, Assessment Header, Subscripts, Input/Output Format)
2. `docs/design-spec.md` architectural specifications and CSS design tokens (`src/styles/tokens.css`).
3. Safe Exam Browser (SEB 3.x) kiosk and embedded browser non-intervention constraints (`docs/seb-compatibility.md`).

---

## 2. Inventory of Captured Visual QA States (1366 × 768 px)

| State # | State Name | Captured Artifact | File Size | Key Verified Features |
|:---:|:---|:---|:---:|:---|
| **1** | **Initial Application (Lobby)** | `qa-state-1-initial-app.png` | 52.6 KB | SEB Top Bar (`|<`, reload, `≡`), `[-> Logout]`, `[X Quit SEB]`, Title, 1h 30m, 2 Questions, SUBHAM PANIGRAHI profile card, Rules box, Countdown badge (`[07] Hrs : [40] Min`), Start Assessment button, SEB Windows Taskbar with tray icons. |
| **2** | **Editor Containing Code** | `qa-state-2-editor-code.png` | 130.9 KB | Assessment header (BHAVISHYA PAL, timer, Run, Submit), dual-pane layout, Monaco Editor with syntax highlighting, line numbers (1–16), indentation guides, breadcrumbs, bottom Console Drawer (open). |
| **3** | **Language Dropdown Open** | `qa-state-3-language-dropdown.png` | 132.3 KB | Unclipped language selection menu: Java (OpenJDK 17), C++ (G++ 20), C (GCC 11.2), Python (Python 3.11), JavaScript (Node.js 20). Badge colors and hover states fully visible. |
| **4** | **Multiple File Tabs** | `qa-state-4-multiple-file-tabs.png` | 134.8 KB | Multi-tab row: `[J QuizDatabase.java]`, `[J QuizPanel.java]` (active with blue top-border indicator), `[J Main.java]`, `[+]` new file button. Breadcrumbs & editor content synchronize immediately to active tab. |
| **5** | **Input / Output Expanded** | `qa-state-5-input-output-expanded.png` | 137.3 KB | Custom Input tab active: checkbox `Use custom input for Run`, preset loader buttons (`Tree Sample 1`, `Skewed`, `Single Node`), Copy and Clear buttons, multi-line editable textarea, character/line count subtext. |
| **6** | **Run Result Displayed** | `qa-state-6-run-result.png` | 138.7 KB | Status pill updated to "In Progress". Test Cases tab active: `✓ All Sample Test Cases Passed! (2/2 assertions passed)`, individual test case cards with execution times (`26ms`, `28ms`) and green pass dots, `Run Again` button. |
| **7** | **Submit Result Displayed** | `qa-state-7-submit-result.png` | 147.0 KB | Practice submission simulation tab active: verdict banner (e.g. Runtime Error / Accepted), subtask execution metrics (Submission ID, Total Time, Peak Memory, Language), test case assertion breakdown, simulate verdict mode pills. |
| **8** | **Editor Fullscreen** | `qa-state-8-editor-fullscreen.png` | 91.4 KB | In-DOM fullscreen expansion: editor expands across full 1366px width, concealing left pane and rail, spacious code area (lines 1–22 visible), tabs, breadcrumbs, and bottom drawer controls accessible. |

---

## 3. Systematic 14-Point Visual Inspection

Below is the structured inspection across the 14 visual criteria mandated by the QA protocol:

### 1. Overall Dimensions
- **Specification:** Full application frame locked to 1366 × 768 px viewport.
- **Measured Values:**
  - Total Width: `1366px`
  - Total Height: `768px`
- **Result:** **PASSED**. No viewport-level scrollbars, zero horizontal document shift. All scrolling is strictly confined to internal scroll containers (`.pane-left`, `.monaco-editor`, `.console-drawer`).

### 2. Panel Proportions
- **Specification:** Activity Rail (48px), Left Pane (~42–46%), Splitter (4–6px), Right Pane (~54–58%).
- **Measured Values:**
  - Activity Rail: `48px` (fixed)
  - Left Problem Pane: `603.5px` (45.8% of dual-pane space)
  - Splitter: `6px`
  - Right Workspace Pane: `708.5px` (54.2% of dual-pane space)
- **Result:** **PASSED**. Closely matches the reference layout in `00.44.36 (2).jpeg` and `media_1794949151206_b2eac9f2.jpg`. The draggable splitter allows fluid user customization between 25% and 75% width.

### 3. Header Height
- **Specification:** 50px fixed header height.
- **Measured Values:**
  - SEB Top Window Chrome: `30px`
  - Assessment Header: `50px`
  - SEB Bottom Taskbar: `32px`
- **Result:** **PASSED**. Header height computes to exactly `50.0px` with 1px bottom border (`#e5e7eb`).

### 4. Editor Dimensions
- **Specification:** Height adjusts dynamically based on bottom drawer toggle; width fills right pane.
- **Measured Values:**
  - Drawer Open: `708.5px × 321px`
  - Drawer Closed: `708.5px × 592px`
  - Fullscreen Mode: `1366px × 497px` (open) / `1366px × 732px` (closed)
- **Result:** **PASSED**. Monaco container layout recalculates immediately on panel resize, drawer collapse, and fullscreen transitions.

### 5. Font Family
- **Specification:** Windows SEB native system sans-serif for UI (`Segoe UI`, `Roboto`, `Helvetica`, `Arial`, `sans-serif`); monospaced font for code (`Cascadia Code`, `Fira Code`, `Consolas`, `monospace`).
- **Inspection:**
  - UI labels, tabs, and buttons render cleanly in `Segoe UI` without external CDN requests.
  - Code lines in Monaco render in crisp monospaced Cascadia Code / Consolas.
- **Result:** **PASSED**.

### 6. Font Sizes
- **Specification:** 13px bold for Candidate Name; 10.5px for roll subtext; 12.5px/13px for timer and sections; 13px for primary buttons; 11px/12px for utility controls; 13.5px for problem statement body.
- **Measured Values:** All typography tokens match `docs/design-spec.md` with zero layout collisions.
- **Result:** **PASSED**.

### 7. Font Weights
- **Specification:** 400 for descriptions; 500 for secondary pills and tabs; 600 for buttons, active tabs, and candidate headings; 700/800 for language badge letters.
- **Inspection:** Clear visual hierarchy between headings, interactive buttons, body copy, and badge lettermarks.
- **Result:** **PASSED**.

### 8. Line Heights
- **Specification:** 1.5–1.6 for body copy; 1.2 for compact header candidate card; 1.45 (21px) for Monaco code lines.
- **Result:** **PASSED**. Excellent legibility and code cursor alignment.

### 9. Button Dimensions
- **Specification:** Header Run/Submit buttons: 32px height; Editor tabs: 26px height; Circular Scroll FAB: 36 × 36px.
- **Measured Values:**
  - Run Button: `32px` height, `16px` padding
  - Submit Button: `32px` height, `20px` padding
  - Tab Bar Language Select: `26px` height
  - Scroll FAB: `36 × 36px`, rounded `50%`
- **Result:** **PASSED**. Every button has accessible dimensions exceeding WCAG 2.2 touch-target recommendations.

### 10. Text Alignment
- **Specification:** Left-aligned descriptions and code; centered buttons and icon pills; right-aligned contest end metadata.
- **Result:** **PASSED**.

### 11. Spacing & Padding
- **Specification:** Consistent 8px / 12px / 16px spatial grid.
- **Inspection:** Problem statement sections (Input Format, Output Format, Constraints, Sample 1, More Info) have clean 16px margins with zero content crowding.
- **Result:** **PASSED**.

### 12. Borders
- **Specification:** 1px subtle borders (`#e2e8f0` / `#cbd5e1`) with 3px/4px border radii.
- **Result:** **PASSED**.

### 13. Colours & Theme Fidelity
- **Specification:** CodeChef assessment light palette:
  - App Canvas: `#ffffff`
  - Chrome / Tabs: `#f8fafc` / `#f1f5f9`
  - Active Tab Accent: `#007bff` / `#0284c7`
  - In-Progress Dot: `#f59e0b`
  - Wi-Fi Indicator: `#22c55e`
  - Dark Code Callouts: `#1e1e1e` (black background with monospace text)
- **Result:** **PASSED**. Impeccable fidelity to camera reference photos.

### 14. Scroll Behaviour
- **Specification:** Independent scroll containers; zero viewport bounce.
- **Result:** **PASSED**. Problem pane scrolls independently; floating scroll-to-top button smoothly returns to top; tab list scrolls horizontally without clipping popups.

---

## 4. Specific Reference Alignments Verified

1. **Opening Lobby Screen (`media_1794947728942_829c0ee8.jpg`):**
   - Header with `SUBHAM PANIGRAHI`, `cuchd_cc_311`, `1 Hour 30 Minutes`, `2 Questions`.
   - Green Wi-Fi circular icon.
   - Blue countdown badge: `Assessment Starts In [07] Hrs : [40] Min`.
   - Start Assessment button in bottom-right of lobby card.
   - Safe Exam Browser top bar and Windows taskbar fully rendered.

2. **Question 3 Problem Statement (`media_1794949149047_43eb9d9e.jpg` & `media_1794949151206_b2eac9f2.jpg`):**
   - Direct start under `Statement` tab with `Input Format` (no extraneous title block).
   - Accurate mathematical subscripts: *p*<sub>i</sub>, *c*<sub>i</sub>, *R*<sub>i</sub>, *N*.
   - Constraints list matching camera photo text.
   - Sample 1 two-column card with Input and Output blocks and copy icons.
   - More Info section: Time limit (1 secs), Memory limit (1.5 GB), Source Limit (50000 Bytes).
   - "Did you like the problem?" feedback widget with thumbs up/down and comment icons.
   - Diagonal anti-leak watermark: `25BCS12751@cuchd.in cuchd.in` at -25° rotation.
   - Blue circular scroll-to-top button pinned to bottom-left corner.

3. **Safe Exam Browser Window Bar & Taskbar (`media_1794949151206_b2eac9f2.jpg`):**
   - Top Bar: Back `|<`, Reload `C`, SEB Menu `≡`.
   - Taskbar: `Open Webpages`, globe icon, battery indicator, volume speaker, Wi-Fi icon, `ENG` input indicator, system clock (`01:49 \n 18-11-2026`).

---

## 5. Remaining Known Discrepancies & Verification Notes

While visual fidelity to the reference photographs is exceptionally high, the following known differences and technical decisions are documented for full transparency:

1. **Client-Side Simulation vs. Remote Examination Server:**
   - *Detail:* In live Safe Exam Browser sessions at universities, code execution and judging run on remote institutional servers behind strict proxies.
   - *Design Choice:* In this offline practice simulator, all code execution, test cases, and judging verdicts are simulated locally in the browser with realistic delays, progress animations, and status indicators. No external network requests or paid cloud services are utilized.
2. **Watermark Identity String:**
   - *Detail:* In the reference photograph `media_1794949151206_b2eac9f2.jpg`, the watermark string reflects the student roll number `25BCS12751@cuchd.in cuchd.in`.
   - *Implementation:* The simulator uses this authentic watermark pattern with SVG repeating tile patterns. In multi-candidate mode, this dynamically reflects the active candidate session.
3. **Monaco Editor in Embedded WebViews:**
   - *Detail:* In standard Chrome, Monaco web workers spawn via web worker blob URLs.
   - *Compatibility:* The workspace bundles local web workers directly via Vite Rollup outputs (`dist/assets/editor.worker-*.js`, `ts.worker-*.js`, etc.) with zero CDN dependencies, guaranteeing full compatibility with embedded Chromium/CEF runtimes in Safe Exam Browser 3.x.
4. **Header Submit vs Practice Submission:**
   - *Detail:* The top header Submit button triggers the final assessment completion confirmation modal (transitioning to the assessment summary report), whereas the bottom drawer Submit button triggers practice solution evaluation within the IDE. Both workflows are clearly separated and functional.

---

## 6. Verification Status

- **TypeScript Compilation:** Strict Type Check (`tsc -b`) exited with **code 0**, zero errors.
- **Production Build:** Vite bundle built in 1m 6s with zero errors.
- **Automated Capture:** 8/8 states captured and visually verified at 1366 × 768 px.
- **SEB Compatibility:** Verified compliant with zero external network dependencies, context-menu independence, keyboard discipline, and local asset bundling.
