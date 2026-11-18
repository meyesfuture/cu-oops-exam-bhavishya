# CodeChef Visual Style Specification

**Source:** Visual extraction from 11 reference screenshots of the live CodeChef problem-solving IDE.  
**Scope:** Everything below the top navigation bar. Header (`src/components/layout/Header.tsx`) is frozen — zero changes.  
**Status:** Awaiting user approval before any source edits.

---

## 1. Typography

### 1.1 Global / Body

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font family | `"Open Sans", serif` | `'Segoe UI', -apple-system, …` | **Change** — but Open Sans is an external CDN font; use system fallback |
| Font size (body) | `14px` | `13.5px` | **Change to `14px`** |
| Font weight (body) | `400` | `400` | Match |
| Line height | `1.6` (`20px` on 14px) | `1.6` | Match |
| Body text colour | `rgb(51, 51, 51)` = `#333333` | `#1f2937` | **Change to `#333333`** |

> [!NOTE] Open Sans is a Google Font (CDN). SEB blocks external CDNs. We keep the system font stack but set Open Sans as the first listed name so it resolves if already installed on the exam machine, then falls back gracefully.

### 1.2 Problem Title

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font size | `20–22px` | `16px` | **Change to `20px`** |
| Font weight | `700` (bold) | `700` | Match |
| Colour | `#111827` / near-black | `#111827` | Match |
| Margin bottom | `~16px` | `12px` | **Change to `16px`** |

### 1.3 Section Headings (Input Format, Output Format, Constraints, Sample 1:)

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font size | `18px` | `14.5px` | **Change to `18px`** |
| Font weight | `600` | `700` | Minor — keep `700`, visually close |
| Colour | `#111827` | `#111827` | Match |
| Margin top | `24px` | `0` | **Change to `24px 0 8px`** |

### 1.4 Statement Tab Strip

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font size | `14px` | `13px` | **Change to `14px`** |
| Font weight active | `600` | `600` | Match |
| Font weight inactive | `400` | `500` | **Change to `400`** |
| Active tab colour | `#4079da` | `#0284c7` | **Change to `#4079da`** |
| Inactive tab colour | `rgb(51,51,51)` = `#333333` | `#64748b` | **Change to `#555555`** |
| Active underline | `2px solid #4079da` | `2px solid #0284c7` | **Change colour** |
| Letter spacing | `0.4px` | none | **Add `letter-spacing: 0.4px`** |
| Tab strip height | `43.5px` | `38px` | **Change to `44px`** |

### 1.5 Inline Code (`<code>` spans)

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font family | Monospace (Consolas / Courier) | `Consolas, Courier New, monospace` | Match |
| Font size | `~12.6px` | `12px`–`12.5px` | Match (close enough) |
| Background | `rgb(241,241,241)` = `#f1f1f1` | `#f1f5f9` | Minor — close enough |
| Radius | `4px` | `3px` | **Change to `4px`** |
| Padding | `2px 4px` | `2px 8px` | **Change to `2px 4px`** |

### 1.6 Output Code Blocks (dark blocks)

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Background | `#1e1e1e` | `#000000` | **Change to `#1e1e1e`** |
| Text colour | `#ffffff` / near-white | `#f8fafc` | Close — keep |
| Padding | `12px 16px` | `12px 16px` | Match |
| Radius | `4px` | `2px` | **Change to `4px`** |
| Font size | `13px` | `12.5px`–`13px` | Match |

### 1.7 Sample I/O Header Labels

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| "Input" / "Output" colour | `#4079da` (blue) | `#475569` (gray) | **Change to `#4079da`** |
| Font weight | `600` | `600` | Match |
| Font size | `12px`–`13px` | `12px` | Match |

### 1.8 Editor File Tab Strip

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Background (tab bar) | `#ffffff` (light) | `var(--bg-chrome)` = `#f8fafc` | **Change active tab bg to `#ffffff`** |
| Active tab top border | `2px solid #4079da` | `2px solid var(--border-active-tab)` = `#1677ff` | Colour change — `#4079da` |
| Tab height | Same as `--tab-bar-height` | `36px` | Match |
| Active tab text | `#111111` (near-black) | `var(--text-primary)` = `#0f172a` | Match |

### 1.9 Breadcrumb Bar

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font size | `~12px` | `var(--font-size-sm)` = `12px` | Match |
| Colour | `#858585` / gray | `var(--text-muted)` = `#94a3b8` | Minor — keep |
| Background | `#ffffff` | `var(--bg-editor)` = `#ffffff` | Match |

### 1.10 Language Selector Dropdown

| Property | CodeChef reference | Current (ours) | Delta |
|---|---|---|---|
| Font family | `Roboto, Helvetica` | system stack | Minor — keep |
| Font size | `12px` | `var(--font-size-xs)` = `11px` | **Change to `12px`** |
| Height | `27px` | `42px` toolbar (selector itself smaller) | Minor — selector is inline |
| Width | `~156px` | auto | Acceptable |
| Border radius | `2px` | `var(--radius-md)` = `6px` | **Change selector radius to `2px`** |

---

## 2. Colour Palette

### 2.1 Primary Blue (CodeChef Brand)

| Role | CodeChef | Current | Action |
|---|---|---|---|
| Active tab underline | `#4079da` | `#1677ff` | **Replace** |
| Active tab text | `#4079da` | `#0284c7` | **Replace** |
| Submit button background | `#2a67b1` | `#1677ff` | **Replace** |
| Submit button border | `#2a67b1` | — | **Add border** |
| Run button border | `#2a67b1` | `#cbd5e1` | **Replace** |
| Run button text | `#2a67b1` | `#1677ff` | **Replace** |
| Sample I/O header text | `#4079da` | `#475569` | **Replace** |
| Scroll-to-top FAB | `#4079da` / `#2a67b1` | `#0284c7` | **Replace** |

### 2.2 Backgrounds

| Element | CodeChef | Current | Action |
|---|---|---|---|
| Statement panel bg | `#ffffff` | `#ffffff` | Match |
| Tab strip bg | `#ffffff` | `#f8fafc` | Minor — acceptable |
| Constraints box bg | `#f0f7ff` / `#eef5ff` (light blue tint) | No tint (plain `#ffffff`) | **Add tinted bg** |
| Constraints box border | `1px solid #c8dff4` | No border | **Add border** |
| Sample I/O table bg | `#ffffff` | `#f8fafc` | **Change to `#ffffff`** |
| Sample I/O table border | `1px solid #d5e8f8` (light blue-gray) | `1px solid #e2e8f0` | **Change colour** |
| Sample I/O divider | `1px solid #d5e8f8` | `1px solid #e2e8f0` | **Change colour** |
| Output code block bg | `#1e1e1e` | `#000000` | **Change** |
| Splitter | `#e0e0e0` (light) | `#e2e8f0` | Match (close) |

### 2.3 Text

| Role | CodeChef | Current | Action |
|---|---|---|---|
| Body text | `#333333` | `#1f2937` | **Change** |
| Muted / secondary text | `#555555`–`#666666` | `#475569` | Minor |
| Active tab | `#4079da` | `#0284c7` | **Change** |
| Inactive tab | `#333333` | `#64748b` | **Change** |
| Hyperlinks in body | `#4079da` underlined | n/a (no links in body) | n/a |

---

## 3. Component Dimensions & Styling

### 3.1 Statement Panel Tab Strip

```
height:          44px          (was 38px)
padding:         0 24px
font-size:       14px
active-weight:   600
active-colour:   #4079da
active-underline: 2px solid #4079da
inactive-weight: 400
letter-spacing:  0.4px
```

### 3.2 Statement Body Scroll Area

```
padding:         24px 28px 64px 28px     (unchanged)
font-size:       14px                     (was 13.5px)
line-height:     1.6
colour:          #333333                  (was #1f2937)
```

### 3.3 Problem Title (h1)

```
font-size:       20px                     (was 16px)
font-weight:     700
margin:          0 0 16px 0              (was 0 0 12px 0)
```

### 3.4 Section Headings (h2: Input Format, Output Format, Constraints)

```
font-size:       18px                     (was 14.5px)
font-weight:     700
margin:          24px 0 8px 0            (was 0 0 8px 0)
colour:          #111827
```

### 3.5 Sample 1 heading (h3)

```
font-size:       18px                     (was 14.5px)
font-weight:     700
margin:          24px 0 10px 0           (was 0 0 10px 0)
```

### 3.6 Constraints Box

```
background:      #f0f7ff
border:          1px solid #c8dff4
border-radius:   4px
padding:         12px 16px
margin-bottom:   20px
```
Wrap the `<ul>` constraints list inside this box; include the "Constraints" heading outside the box (above it).

### 3.7 Sample I/O Table

```
outer-border:    1px solid #d5e8f8
border-radius:   4px
background:      #ffffff
Input/Output label colour: #4079da
divider:         1px solid #d5e8f8
padding:         12px 16px
pre font-size:   12px
pre colour:      #333333                  (was #0f172a)
```

### 3.8 Output Code Blocks (dark)

```
background:      #1e1e1e                  (was #000000)
color:           #f8fafc
padding:         12px 16px
border-radius:   4px                      (was 2px)
font-size:       13px
```

### 3.9 Run / Submit Buttons

```
-- Run button (outlined) --
background:      #ffffff
border:          1px solid #2a67b1
color:           #2a67b1
width:           150px
height:          36px
border-radius:   2px                      (was var(--radius-md) = 6px)
font-weight:     600
font-size:       14px

-- Submit button (filled) --
background:      #2a67b1
color:           #ffffff
width:           150px
height:          36px
border-radius:   2px
font-weight:     600
font-size:       14px
```

### 3.10 Language Selector

```
font-size:       12px                     (was 11px)
height:          27px (of select itself)
border-radius:   2px                      (was 6px)
```

### 3.11 Splitter

```
width:           5px                      (was 6px)
background:      #e0e0e0 (light) / #24262c (dark)
```

### 3.12 File Tab (active)

```
border-top:      2px solid #4079da       (was #1677ff)
background:      #ffffff
```

---

## 4. Layout

### 4.1 Split Ratio

| Property | CodeChef | Current | Action |
|---|---|---|---|
| Default left/right | `50 / 50` | `42 / 58` | **Change default to `50`** |
| Min left | — | `25%` | Keep |
| Splitter width | `5px` | `6px` | **Change to `5px`** |

### 4.2 Activity Rail (left sidebar)

| Property | CodeChef | Current |
|---|---|---|
| Width | `~40px` | `48px` |
| Background | slightly darker than white | `var(--bg-dock)` |
| Icons | clock, folder, checklist, bulb, history | lucide equivalents |

> [!NOTE] Rail width change is a one-line token change (`--rail-width: 40px`). Deferred — not a primary visual difference.

### 4.3 Header height (frozen)

`50px` — **no change, frozen**.

---

## 5. Component-by-Component Comparison

| Component | Key CodeChef value | Ours now | Priority |
|---|---|---|---|
| Statement tab strip height | 44px | 38px | **High** |
| Statement tab active colour | `#4079da` | `#0284c7` | **High** |
| Problem title size | 20px | 16px | **High** |
| Section headings size | 18px | 14.5px | **High** |
| Body text colour | `#333333` | `#1f2937` | **High** |
| Body font size | 14px | 13.5px | **Medium** |
| Constraints light-blue box | yes | no | **High** |
| Sample I/O border colour | `#d5e8f8` | `#e2e8f0` | **Medium** |
| Sample I/O "Input/Output" label colour | `#4079da` | `#475569` | **High** |
| Output code block bg | `#1e1e1e` | `#000000` | **Medium** |
| Output code block radius | 4px | 2px | **Low** |
| Run/Submit button border-radius | 2px | 6px | **Medium** |
| Run button colour scheme | outlined `#2a67b1` | outlined `#1677ff` | **Medium** |
| Submit button colour | `#2a67b1` | `#1677ff` | **Medium** |
| Default split ratio | 50/50 | 42/58 | **Medium** |
| Splitter width | 5px | 6px | **Low** |
| File tab active border colour | `#4079da` | `#1677ff` | **Medium** |
| Language selector radius | 2px | 6px | **Low** |
| Language selector font-size | 12px | 11px | **Low** |
| Inline code radius | 4px | 3px | **Low** |

---

## 6. Prioritised Change List (Files → Changes)

> Changes are ordered High → Medium → Low. Apply only after user approval.

### 6.1 `src/styles/tokens.css`

```css
/* CHANGE */
--brand-primary:          #4079da;    /* was #1677ff — CodeChef primary blue */
--brand-primary-hover:    #2a67b1;    /* was #0958d9 */
--border-active-tab:      #4079da;    /* was #1677ff */
--border-focus:           #4079da;    /* was #1677ff */

--text-primary:           #333333;    /* was #0f172a — CodeChef body text */
--text-secondary:         #555555;    /* was #475569 */

--font-size-base:         14px;       /* was 13.5px */

--splitter-width:         5px;        /* was 4px */
--tab-bar-height:         44px;       /* was 36px — matches problem tab strip */

/* NEW tokens */
--constraints-bg:         #f0f7ff;
--constraints-border:     #c8dff4;
--sample-io-border:       #d5e8f8;
--codechef-blue:          #4079da;
--codechef-blue-dark:     #2a67b1;
--bg-code-box:            #1e1e1e;    /* was #000000 in hard-coded places */
```

### 6.2 `src/components/problem/ProblemPane.tsx`

1. **Tab strip height**: `38px` → `44px`, font-size `13px` → `14px`, letter-spacing add `0.4px`, active/inactive colours → `#4079da` / `#333333`, inactive weight `500` → `400`.
2. **Problem title (h1)**: `16px` → `20px`, margin-bottom `12px` → `16px`.
3. **Section headings (h2)**: `14.5px` → `18px`, margin `0 0 8px 0` → `24px 0 8px 0`.
4. **Sample 1 heading (h3)**: `14.5px` → `18px`, margin `0 0 10px 0` → `24px 0 10px 0`.
5. **Body scroll area**: `fontSize: '13.5px'` → `'14px'`, colour `#1f2937` → `#333333`.
6. **Constraints list**: wrap `<ul>` in a tinted box with `background: #f0f7ff`, `border: 1px solid #c8dff4`, `borderRadius: 4px`, `padding: 12px 16px`. Move heading outside box above it.
7. **Sample I/O table**: outer border → `1px solid #d5e8f8`, background → `#ffffff`, "Input"/"Output" label colour → `#4079da`, divider → `1px solid #d5e8f8`, pre colour → `#333333`.
8. **Dark code blocks**: `backgroundColor: '#000000'` → `'#1e1e1e'`, `borderRadius: '2px'` → `'4px'`.
9. **Scroll-to-top FAB**: `#0284c7` → `#2a67b1`.

### 6.3 `src/components/workspace/FileTabBar.tsx`

- Active tab `borderTop` colour: `var(--border-active-tab)` now resolves to `#4079da` via token change — **no component edit needed**.

### 6.4 `src/components/controls/ActionControls.tsx` (Run / Submit buttons)

- Run button: border → `1px solid #2a67b1`, colour → `#2a67b1`, radius → `2px`, width → `150px`, height → `36px`.
- Submit button: background → `#2a67b1`, radius → `2px`, width → `150px`, height → `36px`.

### 6.5 `src/components/workspace/EditorHeader.tsx`

- Language selector: `borderRadius` → `2px`, `fontSize` → `12px`.

### 6.6 `src/components/layout/WorkspaceLayout.tsx`

- Default split ratio: `defaultSize: 42` → `defaultSize: 50`.
- Splitter `width: '6px'` → `'5px'`.

---

## 7. What We Are NOT Changing

- Top navigation bar (`Header.tsx`) — **frozen**.
- Editor Monaco syntax highlighting — already close to CodeChef's VS Code theme.
- Dark theme token values — only light theme is targeted; dark theme tokens left as-is.
- Activity rail icons or width — minor visual difference, no functional impact.
- Font family switch away from system stack — SEB environment cannot load external CDNs.
- New features, buttons, or toolbar items — none added.

---

## 8. Known Remaining Gaps (Post-Apply)

| Gap | Reason not addressed |
|---|---|
| `"Open Sans"` font exact match | Google CDN — SEB blocks it; system stack used |
| Exact editor Monaco theme (Ace Tomorrow Night) | Monaco already uses a close dark theme |
| CodeChef watermark | Already simulated with synthetic watermark |
| Left-panel blue `3–4px` left-border accent | Visible in some screens, not all — deferred |
| `>index.jsp` breadcrumb for multi-file projects | Minor cosmetic, breadcrumb already shows file path |

---

*Document generated from visual inspection of 11 reference screenshots. No computed CSS was directly read; values confirmed by colour-pick and measurement of reference images.*
