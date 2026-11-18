# Forensic Reference Discrepancy Report

This report compares the current application implementation against the complete set of supplied reference screenshots (34 images in `images/` plus the newly uploaded opening screen `media_1794947728942_829c0ee8.jpg`).

---

## 1. Inventory of Supplied Reference Images & Interface States

| Reference State | Primary Reference Screenshots | Description & Visible Elements |
|:---|:---|:---|
| **State 1: SEB Opening / Start Screen** | `media_1794947728942_829c0ee8.jpg`, `01.49.48.jpeg` | Safe Exam Browser window frame (`|<`, `↻`, `≡`). Top-right `[Logout]` and `[Quit Safe Exam Browser]` buttons with red text/border. Centered assessment card: Exam title, checklist illustration, duration (1h 30m), Wi-Fi indicator, 2 questions, candidate identity & IP, 4 numbered rules, and countdown / "Start Assessment" trigger. |
| **State 2: Active Assessment IDE (Java JDBC Exam)** | `00.44.31.jpeg` through `00.44.43.jpeg` (28 screenshots) | Main split-pane coding environment: 50px top header, 48px left rail, problem statement pane (SQLite / H2 JDBC specification with dark schema blocks), tab bar directly under header (`QuizDatabase.java`, `QuizPanel.java`, `Main.java`), Monaco editor with Java fill-in-the-blanks (`_________________________;`), and floating blue scroll-to-top FAB (`↑`). |
| **State 3: Active Assessment IDE (C++ Queue Exam)** | `01.54.21.jpeg` | Alternative assessment layout: language selector (`C++ ▾`), right-aligned toolbar (`Format`, `Expand`, `Settings`), dark Monaco editor, custom input accordion (`Test against Custom Input`), bottom action bar (`[ ▶ Run ]`, `[ Submit ]`, `[ Next > ]`), question stepper (`< Prev 1/2 Next >`), and tiled candidate watermark. |
| **State 4: Viva Assessment Mode** | `00.44.44.jpeg` | Swapped left pane activated via `⏱ Viva Section ▾` dropdown: theoretical essay questions regarding JDBC, H2, Swing, and PreparedStatements; bottom docked search bar with query input, match arrows (`▲ ▼`), and `[ ] Case-sensitive search` checkbox. |
| **State 5: Post-Submission Screen** | `01.56.27.jpeg` | Assessment completion card: "Thank You! You've successfully completed the assessment. Your score will be shared with your college." with 5-star rating widget, student illustration, and "Save Feedback" button. |

---

## 2. Identified Discrepancies in Current Implementation

The following table documents every element introduced in prior turns that deviates from the reference screenshots:

| Component Area | Current Implementation (Deviations) | Reference Source of Truth | Action Required |
|:---|:---|:---|:---|
| **Theme / Night Mode** | Added dark mode toggle button (`Moon/Sun`), theme state switcher, and full dark UI mode. | In all active Java exam images (`00.44.31`–`00.44.43`), the workspace is strictly **Assessment Light Theme** (`#ffffff` / `#f0f2f5`). The crescent moon `☽` in the header is a static icon next to Wi-Fi. | **REMOVE** unrequested theme switching, dark mode overrides, and moon button toggling. Fix UI to authentic reference light theme. |
| **Top Header Controls** | Added extra "Contest ends soon" badge and Fullscreen toggle icon `⛶`. | In `00.44.36 (2).jpeg`: The header has `[ ▶ Run ]`, `[ Submit ]`, and plain text `Contest ends in 1...`. No fullscreen button exists (SEB is already in kiosk mode). | **REMOVE** fullscreen button and custom badges. Reconstruct exact button styling and `Contest ends in ...` text. |
| **Editor Header Toolbar** | Added an artificial 42px `EditorHeader` with `Java (OpenJDK 17)`, `JDK 17.0.8` chip, `Ctrl+Enter` pill, `Reset Code`, and `Settings` gear. | In `00.44.31.jpeg` and `00.44.36 (2).jpeg`, **no such toolbar exists above the tabs**. File tabs sit directly beneath the top header bar. | **PURGE** the entire artificial `EditorHeader` bar. Mount `FileTabBar` directly below the exam header. |
| **Tab Bar Right Controls** | Included split-editor and more buttons only. | Reference `00.44.36 (2).jpeg` shows `[ | ]`, `...`, and a square `↻` (reload/reset code) icon button on the right edge of the tab strip. | **RESTORE** exact icons (`Columns`, `MoreHorizontal`, `RotateCcw`) on the tab strip. |
| **Problem Statement Content** | Replaced reference task with fictional "Optimal Task Scheduler with Precedence & Deadlines". | The authentic reference content in `00.44.31`–`00.44.43` is: "Task: Complete the Java program using JDBC." (SQLite `jdbc:sqlite::memory:`, `products` table, operations ADD, GET, STOCK, LIST). | **REVERT** to the exact Java Swing JDBC problem statement from the reference images. |
| **Unrequested Problem Metadata** | Added `MEDIUM` difficulty badge, time limit chips, memory limit chips, and algorithm tags chips. | In `00.44.31.jpeg` and `00.44.36 (1).jpeg`, the title is simply bold "Task" or "Statement". No difficulty pill, tags, or memory chips exist. | **PURGE** difficulty badge, tags chips, and memory chips. |
| **Copy Buttons on Code Boxes** | Added "Copy" buttons with "Copied!" notifications to all code boxes. | In `00.44.32 (1).jpeg` and `00.44.34 (1).jpeg`, **zero copy buttons exist**. Code boxes are plain deep-black rectangles (`#1e1e1e` / `#000000`). | **REMOVE** all copy buttons from schema and sample code blocks. |
| **Constraints & Explanations** | Added artificial "Constraints & Bounds" box with shield icon and "Explanation" callout boxes. | The reference has simple `<hr />` separators between "Input Format", "Output Format", "Sample Input", and "Sample Output". No explanation callouts or constraint shields. | **PURGE** explanation callouts and shield icons. Restore exact reference typography and `<hr />` dividers. |
| **Fill-in-the-Blank Code Buffer** | Editor contained pre-completed or plain starter code. | References `00.44.33 (1).jpeg` and `00.44.36 (2).jpeg` show exact exam templates with underscore blanks (`_________________________;`) and comment instructions (`// Bind ...`). | **RESTORE** exact Java boilerplate with fill-in-the-blank underscore lines. |
| **Opening Screen** | Completely absent. | Reference `media_1794947728942_829c0ee8.jpg` shows the full SEB opening assessment card with rules, candidate info, and countdown. | **IMPLEMENT** the complete SEB Opening Screen with transition to active exam. |
| **Viva Mode** | Absent / placeholder only. | Reference `00.44.44.jpeg` shows complete Viva essay statement and bottom search dock with case-sensitive toggle. | **IMPLEMENT** authentic Viva Section mode accessible via the section dropdown. |
| **Completion Screen** | Absent / browser popup used. | Reference `01.56.27.jpeg` shows "Thank You! You've successfully completed the assessment." with 5-star rating. | **IMPLEMENT** authentic in-DOM Thank You screen triggered upon submission. |

---

## 3. Corrective Architecture Plan

```
App State Controller
├── State 1: SEB Opening Screen (media_1794947728942_829c0ee8.jpg)
│   ├── SEB Chrome Bar (|<, ↻, ≡, Logout, Quit SEB)
│   └── Assessment Start Card (Rules, Candidate details, Duration, Start Button)
│
├── State 2: Active Assessment IDE (00.44.31.jpeg - 00.44.43.jpeg)
│   ├── Exam Header (Hamburger, • Not Attempted, ☽, 📶, Candidate, ⏱ Coding/Viva ▾, Timer Badges, Run, Submit, Contest ends text)
│   ├── Left Activity Dock (Exact 7 reference icons)
│   ├── Left Panel (Exact JDBC Task, SQLite code block, <hr /> dividers, Sample I/O, Rating Widget, Floating ↑ FAB)
│   ├── Vertical 4px Splitter Handle
│   └── Right Panel
│       ├── File Tab Bar (QuizDatabase.java, QuizPanel.java, Main.java, [ | ], ..., ↻)
│       ├── Breadcrumbs Trail (ProductInventoryManager > src > main > java > com > swingquiz > J Main.java)
│       └── Editor Area (Monaco light theme with fill-in-the-blank code)
│
├── State 3: Viva Mode (00.44.44.jpeg)
│   ├── Header (⏱ Viva Section ▾, Countdown Timer)
│   ├── Left Panel (Viva essay questions on JDBC/H2/Swing)
│   └── Viva Bottom Search Bar (Query input, ▲ ▼, Case-sensitive checkbox)
│
└── State 4: Thank You Completion Screen (01.56.27.jpeg)
    └── Thank You Card (Submission confirmation, 5-star rating, Save Feedback)
```
