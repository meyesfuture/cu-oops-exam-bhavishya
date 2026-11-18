# Visual Analysis of Supplied Reference Material (CodeChef Assessment Workspace)

## 1. Overview & Image Catalog (31 Images)

This document provides a forensic visual inspection and layout analysis of all 31 reference photographs supplied in `images/` (archived in `references/reference-codechef-workspace.zip`). The images capture a live laptop screen (Acer hardware chassis, Windows OS taskbar timestamped 10:33 AM 10/27/2026) running the CodeChef assessment and coding examination workspace.

### Complete Image-by-Image Catalog

| Image File Name | Screen Captured & Key Visual Elements |
|:---|:---|
| **`WhatsApp Image 2026-11-18 at 00.44.31 (1).jpeg`** | Left problem statement: Task description for Java Swing + JDBC SQLite Product Inventory Manager; table definition in dark code box; supported commands (`ADD`, `GET`, `STOCK`, `LIST`); line number gutter visible on right edge. |
| **`WhatsApp Image 2026-11-18 at 00.44.31.jpeg`** | Dual-pane split: Top header ("Not Attempted", candidate "BHAVISHYA PAL", timer "01 Hrs : 17 Min"); left task pane ("Complete Java program using JDBC", `jdbc:sqlite::memory:`); right pane tab `Main.java` inside `ProductInventoryManager > src > main > java > Main.java`. |
| **`WhatsApp Image 2026-11-18 at 00.44.32 (1).jpeg`** | Full view of left task statement pane with vertical activity rail on left edge (`☰`, `!`, `📁`, `⪢`, `↻`, `🌐`, `>_`, `💬`); floating blue scroll-to-top button at bottom; dark code box for `jdbc:sqlite::memory:`; Input/Output format specifications. |
| **`WhatsApp Image 2026-11-18 at 00.44.32.jpeg`** | Top bar + upper left task pane: `Not Attempted` status dot; dark mode crescent moon icon; green Wi-Fi signal icon; candidate badge; task bullet points; dark code box for `NOT_FOUND` and `EMPTY` return values. |
| **`WhatsApp Image 2026-11-18 at 00.44.33 (1).jpeg`** | Editor code view: `Main.java` implementation of `INSERT INTO products`, `try (PreparedStatement ps = _________)`, fill-in-the-blank underline template lines; Windows taskbar visible at bottom. |
| **`WhatsApp Image 2026-11-18 at 00.44.33.jpeg`** | Editor code view: `getProduct` and `updateStock` methods; `System.out.printf("%d %s %.2f %d%n")`; fill-in-the-blank placeholders; vertical scrollbar track visible on editor. |
| **`WhatsApp Image 2026-11-18 at 00.44.34 (1).jpeg`** | Task pane: Output Format, precision specifications ("Print price with exactly two digits after the decimal point"); high-contrast dark code boxes for "Sample Input" and "Sample Output"; floating scroll-to-top button. |
| **`WhatsApp Image 2026-11-18 at 00.44.34.jpeg`** | Editor view: Tab `Main.java` [X]; breadcrumb path `ProductInventoryManager > src > main > java > Main.java`; split editor icon `[ \| ]` and `...` on tab bar; `static final String DB_URL = _________;`. |
| **`WhatsApp Image 2026-11-18 at 00.44.35 (1).jpeg`** | Editor view: `main(String[] args)` parsing loop with `BufferedReader` and `StringTokenizer`; `if (command.equals("ADD"))`; fill-in-the-blank template markers. |
| **`WhatsApp Image 2026-11-18 at 00.44.35 (2).jpeg`** | Editor view: `listProducts` method; `ResultSet rs = _________;`, `while (_________)`; `System.out.println("EMPTY")`. |
| **`WhatsApp Image 2026-11-18 at 00.44.35.jpeg`** | Editor view: `main` method dispatch logic; `else if (command.equals("GET"))`, `else if (command.equals("STOCK"))`, `else if (command.equals("LIST"))`; `catch (SQLException e)`. |
| **`WhatsApp Image 2026-11-18 at 00.44.36 (1).jpeg`** | Task pane: Second problem (`JdbcQuizLab`); H2 database specifications; file list (`QuizDatabase.java`, `QuizPanel.java`, `Main.java`); method requirements (`getConnection()`, `loadQuestions()`); vertical activity dock visible. |
| **`WhatsApp Image 2026-11-18 at 00.44.36 (2).jpeg`** | Top right controls + editor: Timer badge `57 Min : 43 Sec`; outline `▶ Run` button; solid blue `Submit` button; "Contest ends in..."; tab bar with 3 files; `CREATE TABLE IF NOT EXISTS questions` and `quiz_results`. |
| **`WhatsApp Image 2026-11-18 at 00.44.36.jpeg`** | Editor view: `updateStock` and `listProducts` implementation blanks; line numbers 78 through 111. |
| **`WhatsApp Image 2026-11-18 at 00.44.37.jpeg`** | Editor view: `QuizDatabase.java` tab active; breadcrumb `QuizLab > src > main > java > com > swingquiz > QuizDatabase.java`; `getConnection()` with H2 URL `jdbc:h2:mem:quizdb;DB_CLOSE_DELAY=-1`; `TODO: Load H2 driver`. |
| **`WhatsApp Image 2026-11-18 at 00.44.38.jpeg`** | Task pane bottom: Instructions for `Main.java` and `QuizPanel.java`; interactive "Did you like the problem?" feedback widget with thumbs up, thumbs down, comment icon, and "2 users found this helpful". |
| **`WhatsApp Image 2026-11-18 at 00.44.39 (1).jpeg`** | Header + tab bar + editor: Timer `57 Min : 08 Sec`; tab `QuizPanel.java` [X] active; `package com.swingquiz;`; field declarations (`progressLabel`, `questionLabel`, `statusLabel`, `optionButtons[]`). |
| **`WhatsApp Image 2026-11-18 at 00.44.39 (2).jpeg`** | Header + editor: Timer `57 Min : 14 Sec`; `QuizDatabase.java` active; `loadQuestions()` returning `List<Question>`; `saveResult(int score, int totalQuestions)` using `PreparedStatement`. |
| **`WhatsApp Image 2026-11-18 at 00.44.39.jpeg`** | Task pane: Steps for `saveResult()` and `Main.java` requirements; scrollbar thumb visible on task pane right edge; floating blue scroll-to-top button at bottom. |
| **`WhatsApp Image 2026-11-18 at 00.44.40 (1).jpeg`** | Header + editor: Timer `57 Min : 30 Sec`; `QuizDatabase.java` active; `seedQuestions` adding quiz questions into H2 database ("Which keyword is used to inherit a class in Java?", "Which Swing component creates a clickable button?"). |
| **`WhatsApp Image 2026-11-18 at 00.44.40 (2).jpeg`** | Header + editor: Timer `57 Min : 38 Sec`; `QuizDatabase.java` active; `initializeDatabase()` and `seedQuestions` method signatures; breadcrumb bar clearly shown. |
| **`WhatsApp Image 2026-11-18 at 00.44.40.jpeg`** | Header + editor: Timer `57 Min : 23 Sec`; `QuizDatabase.java` active; question seeding logic with `ps.setString(1, question)` and `ps.setInt(6, correctOption)`. |
| **`WhatsApp Image 2026-11-18 at 00.44.41 (1).jpeg`** | Header + editor: Timer `56 Min : 48 Sec`; `QuizPanel.java` [X] active; `displayQuestion()` logic; setting radio button text from options array; updating `progressLabel`. |
| **`WhatsApp Image 2026-11-18 at 00.44.41 (2).jpeg`** | Header + editor: Timer `56 Min : 53 Sec`; `QuizPanel.java` [X] active; `JPanel` layout configuration with `GridLayout(4, 1, 5, 5)` and `BorderLayout.CENTER`. |
| **`WhatsApp Image 2026-11-18 at 00.44.41.jpeg`** | Header + editor: Timer `56 Min : 39 Sec`; `QuizPanel.java` [X] active; `nextButton.setText("Submit" : "Next")`; `optionGroup.clearSelection()`. |
| **`WhatsApp Image 2026-11-18 at 00.44.42 (1).jpeg`** | Header + editor: Timer `56 Min : 12 Sec`; `Main.java` [X] active; `SwingUtilities.invokeLater(() -> { ... })`; `JFrame frame = new JFrame("Java Swing JDBC Quiz Application")`. |
| **`WhatsApp Image 2026-11-18 at 00.44.42 (2).jpeg`** | Header + editor: Timer `56 Min : 17 Sec`; `Main.java` [X] active; `createQuestions()` calling `QuizDatabase.loadQuestions()`; `TODO: Initialize the database`. |
| **`WhatsApp Image 2026-11-18 at 00.44.42.jpeg`** | Header + editor: Timer `57 Min : 01 Sec`; `QuizPanel.java` [X] active; input validation `if (questions == null \|\| questions.isEmpty()) throw new IllegalArgumentException`; setting dimensions `new Dimension(700, 400)`. |
| **`WhatsApp Image 2026-11-18 at 00.44.43 (1).jpeg`** | Header + editor: Timer `56 Min : 31 Sec`; `QuizPanel.java` [X] active; `handleNext()` implementation validating selected option index (`if (selectedIndex == -1) statusLabel.setText("Please select an answer.")`). |
| **`WhatsApp Image 2026-11-18 at 00.44.43.jpeg`** | Header + editor: Timer `56 Min : 23 Sec`; `QuizPanel.java` [X] active; scoring logic and completion check `if (currentQuestionIndex == questions.size() - 1) showResult()`. |
| **`WhatsApp Image 2026-11-18 at 00.44.44.jpeg`** | **Viva Section Mode:** Top header shows `Viva Section 19 Min : 26 Sec`; left pane title `Statement` with conceptual essay questions; bottom dock contains a search bar with `Case-sensitive search` checkbox, match counter, and up/down navigation buttons (`▲ ▼`). |

---

## 2. Page Geometry & Viewport Proportions (1366 × 768 Baseline)

The target primary viewport is **1366 × 768 px** (standard 16:9 laptop resolution):

```
+---------------------------------------------------------------------------------------------------------+
| Top Examination Header (Height: 50px)                                                                    |
| [Status Pill] [Theme] [Wi-Fi] [Candidate Name]  |  [Timer Badge 01h 17m]  |  [Run] [Submit] [Fullscreen]|
+----+--------------------------------------------+---+---------------------------------------------------+
| R  | Left Pane: Problem Statement / Task        | S | Right Pane: Monaco IDE                            |
| A  | (Width: 42% / ~548px)                      | P | (Width: 58% / ~766px)                             |
| I  | - Header & Section Title                   | L | - Tab Strip: Main.java | QuizPanel.java (36px)    |
| L  | - Description & Rules                      | I | - Breadcrumbs Bar (28px)                          |
|    | - Inline Code & Dark Schema Boxes          | T | - Monaco Code Area with Line Numbers              |
| 48 | - Sample Input / Output Blocks             | T | - Inline Blanks (________;)                       |
| px | - Feedback Widget & Rating                 | E |                                                   |
|    | - Floating Scroll-to-Top Button            | R |---------------------------------------------------|
|    |                                            | 4 | Bottom Collapsible Console & Test Runner (Drawer) |
|    |                                            | px| [Test Cases] [Custom Input] [Console] [Diff]      |
+----+--------------------------------------------+---+---------------------------------------------------+
```

### Measured Proportions Table

| Region / Zone | Measured / Estimated Dimension | Ratio of 1366 × 768 | Visual Characteristics |
|:---|:---|:---:|:---|
| **Top Header** | Height: 50px (measured) | 6.5% of height | Full width (1366px), 1px bottom border, light grey/white background. |
| **Left Activity Rail** | Width: 48px (measured) | 3.5% of width | Full height below header (718px), centered 20px icons, 1px right border. |
| **Left Task Pane** | Width: ~548px (estimated 42%) | 40.1% of width | Vertical scroll, 20-24px internal padding, white canvas. |
| **Splitter Divider** | Width: 4px to 6px | ~0.4% of width | Centered vertical bar, hover grab handle, `col-resize` cursor. |
| **Right Editor Pane** | Width: ~766px (estimated 58%) | 56.0% of width | Tab bar (36px) + Breadcrumb (28px) + Monaco workspace. |
| **Console Drawer** | Height: 180px - 220px (when open) | ~25-30% of pane | Collapsible, horizontal tab bar, dark terminal output. |

---

## 3. Structural & Component Breakdown

### 3.1. Top Header Bar
- **Height:** 50px.
- **Left Group:**
  - Sidebar Toggle: `☰` icon button (32 × 32px hit target).
  - Status Indicator: Rounded pill badge (`rounded-full`), 24px height. Contains an 8px circular status indicator dot (slate `#94a3b8` for "Not Attempted", amber `#f59e0b` for "In Progress", green `#10b981` for "Submitted") and 12px medium text ("Not Attempted").
  - Theme Toggle: Crescent moon icon `🌙` (in light mode) / Sun `☀️` (in dark mode).
  - Wi-Fi Indicator: 4 curved signal bars in bright green (`#22c55e`).
  - Candidate Name: Upper-case tracking font ("BHAVISHYA PAL"), font size 13px, weight 600, color `#334155`.
- **Center Group:**
  - Section Badge: Icon `🕒` + label `"Coding Section"` (blue `#0284c7`) or `"Viva Section"`.
  - Countdown Clock: Distinct numerical boxes:
    - Format: `[ 01 ] Hrs : [ 17 ] Min : [ 43 ] Sec` or `[ 57 ] Min : [ 30 ] Sec`.
    - Box style: Soft blue/cyan tinted background (`#e0f2fe`), dark blue text (`#0369a1`), bold 700 font.
- **Right Group:**
  - `▶ Run` Button:
    - Width ~84px, Height 32px.
    - Style: Secondary outline/light button. White background, 1px border (`#cbd5e1`), dark text (`#0f172a`), small right-facing triangle icon.
  - `Submit` Button:
    - Width ~96px, Height 32px.
    - Style: Solid primary button. Vibrant blue (`#1677ff` / `#2563eb`), white bold text, rounded 4px.
  - Contest Status Pill: "Contest ends in..."
  - Fullscreen Toggle: `⛶` icon button.

### 3.2. Left Activity Rail
- **Width:** 48px.
- **Position:** Far left, below header, running down to viewport bottom.
- **Top Icon Stack:**
  1. `☰` Drawer / Question index menu.
  2. `!` Circle exclamation / Problem statement (active with blue indicator bar or tinted background).
  3. `📁` Folder icon / Virtual file explorer.
  4. `⪢` Test suite / Submissions history.
  5. `↻` Reset file / Project code back to default starter boilerplate.
- **Bottom Icon Stack:**
  6. `🌐` Language selector / Docs link.
  7. `>_` Terminal toggle.
  8. `💬` Proctor chat / Issue reporting.
  9. Candidate avatar circle.

### 3.3. Left Problem Pane
- **Container:** Padded scrollable view (`padding: 20px 24px`).
- **Heading:** "Task" or "Statement" (H2, 18px, weight 700, `#0f172a`).
- **Description Prose:**
  - Font size: 14px, line-height 1.6, color `#334155`.
  - Bold phrases for emphasis ("Product Inventory Manager", "in-memory SQLite database").
  - Inlined code tokens: `<code>` tags with grey background (`#f1f5f9`), 1px border (`#e2e8f0`), rounded 4px, monospace text (`jdbc:sqlite::memory:`).
- **Code & Schema Blocks:**
  - High-contrast black/dark slate background (`#1e1e1e` / `#0f172a`).
  - Text: Monospace syntax highlighted or cyan/white code text.
  - Padding: 12px 16px, rounded 6px.
- **Sample Input & Output Blocks:**
  - Title: "Sample Input" (14px, weight 600).
  - Box: Deep dark box (`#111827`) with crisp white/light gray monospace text.
- **Feedback Rating Widget (at bottom):**
  - Text: "Did you like the problem?" (13px, weight 500).
  - Icons: Thumbs up outline `👍`, Thumbs down outline `👎`, Comment icon `💬`.
  - Counter: "2 users found this helpful" (12px, muted `#64748b`).
- **Floating Scroll-to-Top Button:**
  - Circular button (36 × 36px), primary blue background (`#2563eb`), white upward arrow (`↑`), soft elevation shadow (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`). Positioned bottom-left of task pane.

### 3.4. Viva Mode (from Image `00.44.44.jpeg`)
- **Header:** Shows `Viva Section 19 Min : 26 Sec`.
- **Content:** Conceptual essay prompts and architectural analysis tasks ("Two things puzzle a student...", "Explain how the rows become Question objects...").
- **Bottom Search Bar:**
  - Docked at bottom of pane.
  - Controls: Text search input, "Case-sensitive search" checkbox, Up/Down navigation arrows (`▲ ▼`).

### 3.5. Right Monaco Editor Pane
- **Tab Bar:**
  - Height: 36px.
  - Tabs:
    - Language badge: Red `J` (for Java), `TS`, `PY`, `SQL`.
    - Label: `QuizDatabase.java`, `QuizPanel.java`, `Main.java`.
    - Active Tab: Pure white background, active blue line indicator, close button `×`.
    - Inactive Tabs: Tinted grey background (`#f1f5f9`), muted text.
  - Right toolbar:
    - Split editor icon `[ | ]`.
    - Context menu `...`.
    - Refresh/revert button.
- **Breadcrumbs Bar:**
  - Height: 26px.
  - Font size: 12px, color `#64748b`.
  - Format: `ProjectName > src > main > java > package > FileName.java`.
  - Language icon preceding the file name.
- **Monaco Code Canvas:**
  - Line Numbers: Gutter width ~44px, font size 13px, font family `JetBrains Mono` / `Consolas`, color `#858585`.
  - Folding Controls: Down arrow `⌄` (expanded) / Right chevron `›` (collapsed) on hover.
  - Active Line Highlight: Subtle horizontal band across current row.
  - Assessment Blanks: Pre-seeded blanks (`__________;`) and guided `// TODO:` comments simulating college/university practical assessments.

---

## 4. Visual Styles, Colors & Typographic Palette

### Color Palette (Hex Values Measured & Inferred)

| Token Name | Light Mode (Reference) | Dark Mode (Pro Theme) | Purpose |
|:---|:---:|:---:|:---|
| `--color-canvas-bg` | `#ffffff` | `#0d1117` | Main content canvas |
| `--color-chrome-bg` | `#f8fafc` | `#161b22` | Header & toolbar background |
| `--color-dock-bg` | `#f1f5f9` | `#090d16` | Left vertical activity rail |
| `--color-border-subtle` | `#e2e8f0` | `#30363d` | 1px dividers, card outlines |
| `--color-text-primary` | `#0f172a` | `#f0f6fc` | Main headings & active text |
| `--color-text-secondary`| `#475569` | `#8b949e` | Description paragraphs |
| `--color-text-muted` | `#94a3b8` | `#6e7681` | Breadcrumbs, metadata |
| `--color-brand-blue` | `#1677ff` | `#388bfd` | Submit button, active tab indicator |
| `--color-brand-blue-hover` | `#0958d9` | `#1f6feb` | Button hover states |
| `--color-timer-bg` | `#e0f2fe` | `#1e3a5f` | Countdown timer badge background |
| `--color-timer-text` | `#0369a1` | `#70b8ff` | Countdown timer text |
| `--color-code-box-bg` | `#1e1e1e` | `#161b22` | Dark container for sample input/output |
| `--color-code-box-text` | `#e2e8f0` | `#e6edf3` | Text inside dark sample blocks |
| `--color-success-green` | `#22c55e` | `#2ea043` | Wi-Fi active bars, test passed badge |
| `--color-error-rose` | `#ef4444` | `#f85149` | Java `J` icon, test failed badge |

### Typographic Specifications

| Hierarchy Level | Font Family | Size (px) | Weight | Line Height |
|:---|:---|:---:|:---:|:---:|
| **Section Headings (H2)** | `Plus Jakarta Sans` / `Geist` | 18px | 700 (Bold) | 1.3 |
| **Subsection Titles (H3)**| `Plus Jakarta Sans` / `Geist` | 14px | 600 (Semibold) | 1.4 |
| **Body Paragraphs** | `Plus Jakarta Sans` / `Geist` | 14px | 400 (Regular) | 1.65 |
| **Header Candidate Name** | `Plus Jakarta Sans` / `Geist` | 13px | 600 (Semibold) | 1.0 (tracking: 0.05em) |
| **Timer Display** | `JetBrains Mono` / `Geist Mono`| 14px | 700 (Bold) | 1.0 |
| **Status Pills / Badges**| `Plus Jakarta Sans` / `Geist` | 12px | 500 (Medium) | 1.0 |
| **Breadcrumbs** | `Plus Jakarta Sans` / `Geist` | 12px | 400 (Regular) | 1.2 |
| **Editor Code** | `JetBrains Mono` / `Consolas` | 13.5px | 400 (Regular) | 1.55 |
| **Sample I/O Boxes** | `JetBrains Mono` / `Consolas` | 13px | 400 (Regular) | 1.5 |
