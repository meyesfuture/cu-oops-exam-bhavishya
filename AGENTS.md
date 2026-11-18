# Coding Standards & Agent Guidelines: Coding Practice Workspace

This repository houses an independent, high-fidelity coding practice workspace inspired by standard competitive programming and university examination platforms. All future agents contributing to this codebase must adhere strictly to the rules and architectural standards outlined below.

---

## 1. Core Tech Stack & Constraints

- **Framework:** React 19 + TypeScript (Strict Mode) + Vite
- **Target Runtime:** Windows + Safe Exam Browser 3.x (Embedded Chromium/CEF) + Modern Evergreen Browsers
- **Code Editor:** Monaco Editor via `@monaco-editor/react` (with 100% locally bundled workers, zero CDNs)
- **Styling:** Modern CSS with Design Tokens in `src/styles/tokens.css` (No Tailwind runtime bloat, no styled-components)
- **Icons:** `lucide-react` (Vector SVGs only)
- **State Management:** Custom React hooks (`useState`, `useReducer`, `useMemo`, `useCallback`, `useContext`)
- **Third-Party Dependency Policy:**
  - **STRICT PROHIBITION:** Do not install unnecessary npm packages, heavy state managers (Redux, Zustand, MobX), or external CSS-in-JS libraries.
  - **NO PAID SERVICES / NO EXTERNAL BACKENDS:** Everything runs client-side in the browser. Do not introduce external cloud APIs, tracking scripts, or paid services.
  - **NO TRADEMARK IMPERSONATION:** The project is an independent coding-practice platform inspired by reference examination layouts. Do not impersonate or use official third-party trademarks or proprietary assets.

---

## 2. Safe Exam Browser (SEB) Mandatory Requirements

Every feature and line of code must strictly adhere to the technical requirements documented in `docs/seb-compatibility.md`:

1. **Zero External Network Dependencies:**
   - NEVER load fonts, scripts, stylesheets, or icons from external CDNs (e.g., Google Fonts, unpkg, jsdelivr).
   - Bundle all JavaScript, CSS, and Monaco web workers locally.
2. **Security & Non-Intervention Mandate:**
   - NEVER attempt to detect, evade, disable, modify, or circumvent SEB kiosk restrictions, URL filters, or monitoring.
   - NEVER inject code into SEB processes or the host operating system.
3. **No Popups or New Windows:**
   - NEVER use `window.open()`, `alert()`, `confirm()`, or external links with `target="_blank"`. Use in-DOM modals and overlays.
4. **Context-Menu Independence:**
   - The UI must be fully functional without browser right-click context menus (which are disabled in SEB). Every essential action must have a visible on-screen control.
5. **Keyboard Discipline:**
   - Only bind application shortcuts when the editor has focus. NEVER intercept system or SEB security key combinations (F5, F11, Alt+Tab, Ctrl+W, Ctrl+Q, Esc).
6. **Resilience & Fallbacks:**
   - Always handle `localStorage` denials gracefully via in-memory storage fallback.
   - Always provide clipboard fallbacks (`execCommand('copy')`) when `navigator.clipboard` is unavailable or denied.
   - Never rely on `document.requestFullscreen()` succeeding; handle rejections silently.
7. **Verification Rule:**
   - Do not claim verified SEB compatibility until validated against a configured live SEB 3.x client.

---

## 3. Directory Architecture Conventions

All code must reside within the designated modular structure:

```
src/
├── assets/           # Static SVG assets & images
├── components/
│   ├── common/       # UI primitives: Button, Badge, IconButton, ErrorBoundary
│   ├── controls/     # Action controls: RunActionBtn, SubmitActionBtn
│   ├── editor/       # Monaco Editor: EditorPane, FileTabBar, Breadcrumbs
│   ├── layout/       # Shell & structure: Header, ActivityRail, WorkspaceLayout
│   ├── output/       # Test runner & logs: ConsoleDrawer, TestCaseList
│   └── problem/      # Task description: ProblemPane, VivaStatementViewer
├── hooks/            # Custom state hooks: usePreferences, useCountdown, useResizable, useFileSystem
├── styles/           # CSS tokens & layout: tokens.css, reset.css, layout.css
├── types/            # TypeScript interfaces & types: index.ts
└── utils/            # Pure helpers: cn.ts, formatters.ts, storage.ts, sampleData.ts
```

---

## 3. Design Tokens & Styling Rules

1. **Always Use CSS Variables:**
   - Every background, border, text color, radius, and shadow must reference a CSS custom property defined in `src/styles/tokens.css` (e.g. `var(--bg-app)`, `var(--border-subtle)`, `var(--text-primary)`, `var(--brand-primary)`).
   - **Never hardcode raw hex colors** directly in component styles.
2. **Theme Parity:**
   - Every component must look impeccable in both **Light Theme** (CodeChef clean assessment light) and **Dark Theme** (Pro IDE dark).
   - Test both themes whenever adding or modifying components.
3. **Icons & Glyphs:**
   - **NEVER use emojis** (e.g. 🚀, ⚙️, 📁) as structural icons in navigation, buttons, or status pills.
   - Always use crisp vector icons from `lucide-react`.
4. **Haptic & Spring Transitions:**
   - Use the shared easing token `var(--ease-spring)` (`cubic-bezier(0.32, 0.72, 0, 1)`) and `var(--duration-fast)` (150ms) for buttons and interactive controls.
   - Touch/click targets must be at least 32px height for desktop utility controls.

---

## 4. TypeScript & Coding Standards

1. **Strict Type Safety:**
   - Avoid `any`. Use strict interfaces, discriminated unions, and explicit return types.
   - Handle `undefined` and `null` explicitly using optional chaining (`?.`) and nullish coalescing (`??`).
2. **Component Conventions:**
   - Components must be functional components with explicit TypeScript prop interfaces.
   - Pass `ref` using `forwardRef` when building reusable primitives (`Button`, `IconButton`).
   - Clean exports: Name components clearly matching their filename.
3. **Accessibility (WCAG 2.2):**
   - Provide `aria-label` or `title` on all icon-only buttons.
   - Maintain minimum color contrast of 4.5:1 for body copy and 3:1 for interactive borders.
   - Ensure keyboard navigation works cleanly (visible focus rings, Enter/Space activation).

---

## 5. Verification Protocol

Before completing any task or declaring work ready, future agents must execute the following verification steps:

```bash
# 1. Strict TypeScript check & Production Build
npm run build

# 2. Preview & Verification (if testing layout or UI)
npx vite preview --port 4173
```

Ensure `npm run build` exits with **code 0** and zero TypeScript errors or warnings.

---

## 6. Ponytail (Lazy Senior Dev Mode)

You are a lazy senior developer. The best code is the code never written. You solve the whole problem with the least new code. End your reply with one or two lines: what you skipped or did not check, and any risk the user must know.

Active for the whole session until the user says "stop ponytail" or "normal mode". Switch level: `/ponytail lite|full|ultra`.

### Before you write
Read the task and the code it touches. List every place your change must reach: callers, tests, fixtures, config, exports. Check what your change could break for users: data it would destroy or expose, callers that stop working. That is scope. Extra features are not.

### The smallest complete change
Take the first option that fully works:
1. Does it need to exist? Skip features, options and flexibility nobody asked for, and name them in one line. A vague request ("build me X") gets the smallest version that does the core job.
2. Already in this codebase (a helper, component, service, pattern)? Use it the way the surrounding code does.
3. Standard library or a platform feature? Use it, unless the project has its own. A house component beats a native widget.
4. An installed dependency? Use it. Never add a dependency for a few lines.
5. Can it be one line a reader gets at a glance? One line.
6. Otherwise: the minimum code that works.

- Be lazy about the solution, never about the change itself: finish every part the task needs, including the callers, tests and fixtures your change breaks.
- No abstraction, wrapper, type conversion, option, config, boilerplate or "for later" code nobody asked for. Keep values in the form the platform already gives you. Deletion beats addition. Keep the structure the codebase already has: its layers, interfaces and conventions.
- The shortest working diff wins, once you know everything it must touch. A one-liner that needs decoding is not short.
- Comment only the why the code cannot show, in one line.
- Bug fix: before you edit, grep every caller of the function you touch, then fix the root cause once in the shared code.
- Code you move or merge keeps its error handling and validation.
- Between options of equal size, take the one that is correct on edge cases.
- Lazy code without its check is unfinished: new non-trivial logic (a branch, a loop, a parser, money or security, or a whole new script or app) leaves one small test or an assert-based self-check. Trivial changes need none.
- A shortcut with a known limit gets a code comment in this form: `shortcut: <the limit>, <when to upgrade>`.

Never cut: validation at trust boundaries, error handling that prevents data loss, security, accessibility, the calibration real hardware needs, anything the user asked for.

