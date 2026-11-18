# CodeChef Problem-Solving IDE — Visual Style Benchmark & Audit

**Target Viewport:** 1366 × 768 px (Standard Laptop Baseline)  
**Investigation Mode:** Headless Chrome CDP / Live In-Browser Computed Style Extraction  
**Locked Constraints:** Top Bar is strictly locked (zero modifications to top bar component, CSS, dimensions, or interactions). All audit findings and proposed corrections apply strictly below the top bar.

---

## 1. Reference Screenshots and URLs

### 1.1 Reference URLs Evaluated
1. **Basic Java Problem-Solving Page:**  
   `https://www.codechef.com/practice/course/java-beginner-v2-p1/BJ00BP02_V2/problems/GSJ209A`
2. **Custom Input C++ Problem-Solving Page:**  
   `https://www.codechef.com/practice/course/cpp-beginner-v2-p1/BP00BC03_V2/problems/GSCV213B`
3. **Advanced Java Coding Problem (extracted from collection):**  
   `https://www.codechef.com/practice/course/advanced-java/COREJAVA/problems/COREJAVAT01`
4. **General Java Practice Collections:**  
   `https://www.codechef.com/practice/java` & `https://www.codechef.com/practice/advanced-java`
5. **Local Application Baseline (Port 4173):**  
   `http://127.0.0.1:4173/`

### 1.2 Benchmark Screenshots Captured (at 1366 × 768 px)
- **Basic Java IDE (Dark Theme Default):** [benchmark-codechef-basic-java.png](file:///b:/Projects/unsafed/benchmark-codechef-basic-java.png)
- **Custom Input IDE (Expanded Accordion):** [benchmark-codechef-custom-input.png](file:///b:/Projects/unsafed/benchmark-codechef-custom-input.png)
- **Advanced Java IDE:** [benchmark-codechef-adv-java.png](file:///b:/Projects/unsafed/benchmark-codechef-adv-java.png)
- **CodeChef Light Theme Mode:** [benchmark-codechef-light.png](file:///b:/Projects/unsafed/benchmark-codechef-light.png)
- **Current Local Application Baseline:** [benchmark-local-app-1366x768.png](file:///b:/Projects/unsafed/benchmark-local-app-1366x768.png)

---

## 2. Typography Specification (Measured Computed Values)

| UI Element | CodeChef Measured Font | Size | Weight | Line Height | Letter Spacing | Text Color (Dark / Light) |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| **Body / Global Text** | `"Open Sans", serif` | `14px` | `400` | `20.002px` | `normal` | `rgb(215, 215, 215)` / `rgb(51, 51, 51)` |
| **Problem Title** | `"Open Sans", serif` | `20px`–`22px` | `600` | `28px` | `normal` | `rgb(215, 215, 215)` / `rgb(17, 24, 39)` |
| **Statement Tabs (`Statement`, `Submissions`)** | `"Open Sans", serif` | `14px` | `600` (Active) / `400` (Inactive) | `17.5px` | `0.39998px` | `rgb(215, 215, 215)` / `rgba(0, 0, 0, 0.87)` |
| **Section Headings (`Task`, `Input Format`, `Constraints`)** | `"Open Sans", serif` | `18px` | `600` | `28.8px` | `normal` | `rgb(215, 215, 215)` / `rgb(33, 37, 41)` |
| **Inline Code Spans (`<code>`)** | `monospace` | `12.6px` | `400` / `700` | `25.2px` | `normal` | `rgb(215, 215, 215)` / `rgb(235, 87, 87)` |
| **Sample Input/Output Content** | `"Open Sans", serif` / `monospace` | `14px` | `400` | `22.4px` | `normal` | `rgb(215, 215, 215)` / `rgb(51, 51, 51)` |
| **Editor Code Text** | `Monaco, Menlo, "Ubuntu Mono", Consolas, "Source Code Pro", monospace` | `14px` | `400` | `17px`–`18px` | `normal` | `rgb(197, 200, 198)` / `rgb(51, 51, 51)` |
| **Editor Line Numbers** | `Monaco, Menlo, Consolas, monospace` | `14px` | `400` | `17px` | `normal` | `rgb(120, 120, 120)` |
| **Language Dropdown Selector** | `Roboto, Helvetica, Arial, sans-serif` | `12px` | `400` | `17.25px` | `normal` | `rgb(215, 215, 215)` / `rgb(51, 51, 51)` |
| **Custom Input Accordion Header** | `"Open Sans", serif` | `14px` | `400` | `22.4px` | `normal` | `rgb(215, 215, 215)` / `rgb(51, 51, 51)` |
| **Action Buttons (`Run`, `Submit`, `Next`)** | `"Open sans", "serif"` | `14px` | `600` | `normal` | `0.14px` | See Section 3 |

---

## 3. Colour Specification (Measured Values)

### 3.1 Dark Mode (CodeChef Problem IDE Default)
- **Problem Statement Panel Background:** `rgb(29, 30, 35)` (`#1d1e23`)
- **Statement Header / Tab Bar Background:** `rgb(29, 30, 35)` (`#1d1e23`)
- **Active Tab Underline Indicator:** `rgb(64, 121, 218)` (`#4079da`), `2px solid`
- **Inactive Tab Text Color:** `rgb(160, 160, 160)`
- **Splitter Divider Background:** `rgb(36, 38, 44)` (`#24262c`), `5px` width
- **Editor Background:** `rgb(29, 31, 33)` (`#1d1f21` — Ace Tomorrow Night)
- **Editor Gutter (Line Numbers) Background:** `rgb(37, 40, 44)` (`#25282c`)
- **Inline Code Background:** `rgb(45, 45, 45)` (`#2d2d2d`), border-radius: `4px`, padding: `2px 4px`
- **Custom Input Accordion Header Background:** `rgb(36, 38, 44)` (`#24262c`)
- **Custom Input Content Background:** `rgb(29, 30, 35)` (`#1d1e23`)
- **Run Button:**
  - Background: `rgb(255, 255, 255)` (`#ffffff`)
  - Border: `1px solid rgb(42, 103, 177)` (`#2a67b1`)
  - Text Color: `rgb(42, 103, 177)` (`#2a67b1`)
  - Hover: Background `rgba(42, 103, 177, 0.08)`, Text `rgb(42, 103, 177)`
- **Submit Button:**
  - Background: `rgb(42, 103, 177)` (`#2a67b1`)
  - Border: `0px none`
  - Text Color: `rgb(255, 255, 255)` (`#ffffff`)
  - Hover: Background `rgb(34, 82, 142)` (`#22528e`)

### 3.2 Light Mode (CodeChef Assessment / Clean Practice Light)
- **Problem Statement Panel Background:** `rgb(255, 255, 255)` (`#ffffff`)
- **Statement Tab Text Color:** `rgba(0, 0, 0, 0.87)`
- **Active Tab Underline Indicator:** `rgb(64, 121, 218)` (`#4079da`), `2px solid`
- **Splitter Divider Background:** `rgb(224, 224, 224)` (`#e0e0e0`)
- **Editor Background:** `rgb(29, 31, 33)` (`#1d1f21` — Ace Tomorrow Night retained for code contrast in IDE)
- **Run Button:** Background `rgb(255, 255, 255)`, Border `1px solid rgb(42, 103, 177)`, Text `rgb(42, 103, 177)`
- **Submit Button:** Background `rgb(44, 132, 219)` (`#2c84db`), Text `rgb(255, 255, 255)`

---

## 4. Problem Statement Panel Specification

1. **Tab Strip:**
   - Tabs: `Statement`, `Submissions`, `Solution`, `Help`.
   - Height: `43.5px`, Tab Width: `160px` each.
   - Padding: `12px 16px`.
   - Active state: 2px bottom border `#4079da`, bold text (`600` weight).
   - Inactive state: No border, normal text (`400` weight).
2. **Problem Content Container:**
   - Padding: `16px 24px` horizontal breathing room.
   - Headings: `18px` font size, `600` weight, line height `28.8px`, margin: `24px 0px 8px`.
   - Paragraph text: `14px` font size, line height `20px` to `22.4px`.
3. **Sample Test Case Formatting:**
   - Rendered in a clean 2-column or structured box (Input / Output).
   - Top header for Sample contains copy action icon button.
   - Code content has monospace alignment, `14px` font size.
4. **Metadata & Constraints:**
   - Constraints list marked with clean bullet points (`•`).
   - Limits section (`Time Limit: 1 secs`, `Memory Limit: 1.5 GB`, `Source Limit: 50000 Bytes`) at bottom of statement with subtle dividers.

---

## 5. Editor Specification

1. **Geometry & Toolbar:**
   - Editor header toolbar height: `40px`–`44px`.
   - Left side: Language selector dropdown (`width: 156px`, `height: 27px`, `font-size: 12px`, `border-radius: 2px`).
   - Right side: Utility icons (Settings gear `16px`, Revert/Reset, Fullscreen).
2. **Code Canvas:**
   - Font family: `Monaco, Menlo, "Ubuntu Mono", Consolas, "Source Code Pro", monospace`.
   - Font size: `14px` default.
   - Line height: `17px`–`18px` (compact, professional density).
   - Line numbers gutter: `49px` width, background `#25282c`, text color `#787878`.
3. **File Tabs vs Single File:**
   - In competitive problem mode, CodeChef uses a single active language buffer with the language selector directly controlling the active language template (no extraneous browser-style multi-file tabs by default unless multi-file project mode is triggered).

---

## 6. Input / Output & Execution Specification

1. **Custom Input Placement:**
   - Directly underneath the editor canvas within the right column (not a disconnected bottom drawer across the whole screen).
   - Formatted as an expandable accordion titled: **`Test against Custom Input`**.
   - Collapsed height: `36px` header bar.
   - Expanded height: `160px`–`180px` containing a dark-themed `<textarea>` with placeholder `Enter your custom input here...`.
2. **Footer Action Bar:**
   - Sits pinned at the bottom-right of the IDE column (`height: 52px`, padding: `8px 16px`).
   - Buttons aligned to the right:
     - **`Run` Button:** Secondary outline style (`width: 150px`, `height: 36px`, `border: 1px solid #2a67b1`, `color: #2a67b1`, `background: #ffffff`, `border-radius: 2px`, `font-size: 14px`, `font-weight: 600`).
     - **`Submit` Button:** Primary filled blue style (`width: 150px`, `height: 36px`, `background: #2a67b1`, `color: #ffffff`, `border: none`, `border-radius: 2px`, `font-size: 14px`, `font-weight: 600`).
3. **Output & Test Results:**
   - When code executes, the execution pane renders execution status (`Running...`, `Accepted`, `Wrong Answer`), stdout log, and diff comparison inside the right column below the editor.

---

## 7. Workspace Layout & Spacing Specification

1. **Overall Proportions at 1366 × 768 px:**
   - Top navigation bar: `54px` height (Remains Locked).
   - Working viewport height below top bar: `714px` (`768px - 54px`).
   - Split: **50% / 50% split** (`680.5px` Problem Pane / `680.5px` IDE Pane) separated by a `5px` vertical divider (`#24262c` / `#e0e0e0`).
2. **Divider Grip:**
   - Width: `5px`.
   - Cursor: `col-resize`.
   - Hover color: `#4079da` (CodeChef blue highlight).
3. **Zero Sidebar Bloat:**
   - CodeChef does not keep a persistent 48px activity rail taking up horizontal space during active problem solving; the problem pane starts at `x = 0`.

---

## 8. Component-by-Component Comparison (Below Top Bar)

| Component Area | Live CodeChef IDE Reference | Current Local Implementation | Discrepancy & Gap Analysis |
|:---|:---|:---|:---|
| **Left Activity Rail** | None during active problem solving; workspace spans 100% width from left edge. | Persistent 48px dark dock (`ActivityRail.tsx`) taking up 48px width. | **Major Layout:** The 48px rail reduces problem reading width. Needs option to collapse into a slide-over drawer or float. |
| **Workspace Split Ratio** | 50% / 50% (`680px` problem / `680px` editor). | 42% / 58% default (`551px` problem / `761px` editor). | Problem pane in local app is narrower than CodeChef's balanced 50/50 reading split. |
| **Splitter Divider** | Clean `5px` bar with `#24262c` (dark) / `#e0e0e0` (light). | `6px` bar with embedded chevron button. | Chevron handle is functional, but visual border tokens need alignment with CodeChef's minimal 5px divider. |
| **Problem Title** | `20px` `Open Sans` semi-bold (`600`), `#d7d7d7` / `#111827`. | `16px` `Segoe UI` bold (`700`). | Local font family is system sans instead of `Open Sans`; title size is too small (16px vs 20px). |
| **Statement Tabs** | `Statement` + `Submissions` + `Solution` + `Help`, `14px` `Open Sans`, `2px solid #4079da` underline. | `Statement` + `Submissions`, `13px` `Segoe UI`, `2px solid #0284c7`. | Missing tab options; font is `Segoe UI` 13px instead of `Open Sans` 14px; accent blue is `#0284c7` vs `#4079da`. |
| **Section Headings** | `18px` `Open Sans` (`600`), line-height `28.8px`, margin `24px 0 8px`. | `14.5px` `Segoe UI` (`700`), margin `0 0 8px`. | Section headings (`Input Format`, `Constraints`, etc.) lack CodeChef's editorial scale and spacing. |
| **Editor Gutter & Line Numbers** | Width `49px`, background `#25282c`, font `14px` Monaco/Consolas. | Width `47px`, background `#ffffff`, font `13px` Consolas. | In light mode, editor uses pure white gutter; CodeChef retains dark IDE background `#1d1f21` with `#25282c` gutter. |
| **Editor Language Selector** | Material-UI style select, height `27px`, width `156px`, font `12px` Roboto, border-radius `2px`. | Custom HTML select, height `30px`, font `13px` Segoe UI, border-radius `4px`. | Local language picker differs in height (30px vs 27px) and font size (13px vs 12px). |
| **Action Buttons Placement** | In editor footer bar on bottom-right (`Run` width `150px`, `Submit` width `150px`, height `36px`, border-radius `2px`). | In top header bar (`Run` 75px, `Submit` 84px) AND inside bottom drawer. | Button dimensions on CodeChef are prominent 150px wide buttons with 2px border radius. |
| **Custom Input Panel** | Expandable accordion (`Test against Custom Input`) sitting directly below code canvas in editor column. | Drawer (`BottomWorkspace.tsx`) spanning across bottom with separate tabs. | Drawer structure differs from CodeChef's accordion layout attached to editor column. |

---

## 9. Prioritized List of Corrections

Following the visual hierarchy guidelines, the recommended adjustments are ranked in order of impact:

### Priority 1: Major Geometry & Layout Structure
1. **Balance Splitter Ratio to 50% / 50%:** Adjust default problem/editor split from 42% / 58% to 50% / 50% (`680px` / `680px` at 1366px width).
2. **Activity Rail Auto-Docking:** Provide clean toggle or collapse for the 48px Activity Rail so the problem statement pane can align flush with the left boundary as in CodeChef.
3. **Editor Column Custom Input Accordion:** Align the custom input panel to sit directly within the right-hand editor column as an expandable `Test against Custom Input` accordion.

### Priority 2: Typography Alignment
1. **Adopt Open Sans Typography:** Update `--font-sans` token to prioritize `'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
2. **Problem Statement Section Headings:** Increase heading font size from `14.5px` to `18px`, `font-weight: 600`, line-height `28.8px`, and top margin to `24px`.
3. **Problem Title Scale:** Increase problem title from `16px` to `20px`–`22px`.
4. **Statement Tab Typography:** Standardize tabs to `14px`, weight `600` for active tab, `400` for inactive, with height `43.5px`.

### Priority 3: Component Sizing & Button Geometry
1. **Action Button Styling:**
   - `Run` button: Width `150px`, Height `36px`, Border `1px solid #2a67b1`, Text `#2a67b1`, Background `#ffffff`, Radius `2px`, Font `14px` weight `600`.
   - `Submit` button: Width `150px`, Height `36px`, Background `#2a67b1` (Dark) / `#2c84db` (Light), Text `#ffffff`, Radius `2px`, Font `14px` weight `600`.
2. **Language Dropdown Selector:** Compact height to `27px`, width `156px`, font size `12px`, radius `2px`.

### Priority 4: Colors & Theme Tokens
1. **Primary Accent Blue Token:** Align active accent blue from `#0284c7` (Sky-600) to `#4079da` / `#2a67b1` (CodeChef corporate blue).
2. **Splitter Color:** Align divider bar background to `#24262c` (dark) / `#e0e0e0` (light) with `5px` width.
3. **Inline Code Styling:** Use `background: #2d2d2d`, `color: #d7d7d7`, border-radius `4px`, padding `2px 4px`.

---

## 10. Exact Affected Source Files

When approved for implementation, changes will be isolated strictly to the following files below the locked top bar:

1. **Design Tokens & Global Styles:**
   - `src/styles/tokens.css` (Update font stack to Open Sans, primary blue tokens `#4079da` / `#2a67b1`, button radii `2px`, divider token `5px`).
   - `src/styles/layout.css` (Update splitter dimensions and panel flex rules).
2. **Problem Statement Panel:**
   - `src/components/problem/ProblemPane.tsx` (Update statement tab strip height `43.5px`, tab typography `14px`, section headings `18px`, margins `24px 0 8px`).
   - `src/components/problem/TaskStatement.tsx` (Format headings, constraints lists, sample tables, and inline code spans).
3. **Editor & Toolbar:**
   - `src/components/editor/EditorPane.tsx` (Adjust Monaco container layout, language selector dimensions `156px × 27px`, font size `12px`).
   - `src/components/editor/FileTabBar.tsx` (Ensure compact tab strip styling conforms to CodeChef single-or-multi buffer display).
4. **Custom Input & Execution Controls:**
   - `src/components/output/BottomWorkspace.tsx` / `ConsoleDrawer.tsx` (Reconfigure custom input as an expandable accordion `Test against Custom Input` with `Run` and `Submit` buttons sized `150px × 36px` with `2px` radius).
5. **Workspace Layout Orchestrator:**
   - `src/components/layout/WorkspaceLayout.tsx` (Set default split ratio to 50%, splitter width to 5px).
   - `src/components/layout/ActivityRail.tsx` (Ensure drawer behavior does not displace problem panel layout).

*(Top bar component `src/components/layout/Header.tsx` and all top-bar styling remain 100% UNTOUCHED and LOCKED).*
