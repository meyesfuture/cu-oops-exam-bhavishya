# Safe Exam Browser (SEB) Compatibility & Architecture Specification

> **Notice on Compatibility Verification:**
> In accordance with project requirements, this document outlines technical design specifications, architectural safeguards, and assumptions for Safe Exam Browser 3.x (Windows / Embedded Chromium/CEF). Full verified compatibility is pending formal validation within a configured live SEB 3.x test environment.

---

## 1. Target Environment & Scope

- **Target OS:** Windows 10 / 11
- **Host Application:** Safe Exam Browser 3.x
- **Browser Engine:** Embedded Chromium / Chromium Embedded Framework (CEF)
- **Deployment Protocol:** HTTPS required for all production/staging exam configurations
- **Network Constraints:** Strictly sandboxed network whitelist defined by exam administrator; all resources not on the whitelist domain are blocked.

---

## 2. Core Technical Requirements & Engineering Mitigations

| Requirement ID | Technical Specification | Engineering Implementation / Mitigation | Verification Status |
|:---|:---|:---|:---:|
| **SEB-REQ-01** | Browser-Standard React & TS | Built strictly on web standard APIs (React 19 + TypeScript + modern DOM standards). No non-standard runtime extensions. | Implemented |
| **SEB-REQ-02** | Zero Chrome Extension Dependency | No functionality relies on Chrome extensions, webstore APIs, or developer extensions. | Implemented |
| **SEB-REQ-03** | Zero External CDNs | All scripts, styles, workers, and assets are locally bundled. `index.html` has zero links to `cdn.jsdelivr.net`, `unpkg.com`, or other CDNs. | Implemented & Bundled |
| **SEB-REQ-04** | Local Monaco & Worker Bundling | Monaco Editor and its workers (`editor.worker`, `json.worker`, `css.worker`, `html.worker`, `ts.worker`) are pre-compiled and served directly from `/assets/`. | Implemented & Verified in `dist/` |
| **SEB-REQ-05** | Self-Hosted / System Fonts & Icons | Removed external Google Fonts. Uses resilient native OS font stacks (`Segoe UI`, `Consolas`, `Cascadia Code`). All icons are vector SVGs (`lucide-react`). | Implemented |
| **SEB-REQ-06** | Zero Unnecessary External Requests | No third-party analytics, telemetry, pingbacks, fonts, or tracking scripts. All network traffic is isolated to the origin server. | Implemented |
| **SEB-REQ-07** | HTTPS Deployment Readiness | Application operates cleanly over HTTPS; uses protocol-relative or relative paths for all bundled assets. | Implemented |
| **SEB-REQ-08** | No Popups or New Windows | No calls to `window.open()`, `alert()`, or `target="_blank"` links. All modals, drawers, and confirmations render inside in-DOM React overlays. | Implemented |
| **SEB-REQ-09** | Works Without Browser Context Menus | In-DOM UI controls provided for all operations (Copy, Paste, Reset, Run, Submit, Format). No reliance on browser right-click context menu. | Implemented |
| **SEB-REQ-10** | Graceful LocalStorage Failure | `src/utils/storage.ts` catches `SecurityError`, `QuotaExceededError`, or disabled storage in SEB kiosk/incognito sessions, falling back to in-memory state. | Implemented |
| **SEB-REQ-11** | Resilient Clipboard Fallbacks | `src/utils/clipboard.ts` attempts `navigator.clipboard.writeText`, falling back gracefully to hidden textarea `execCommand('copy')` when permissions are restricted. | Implemented |
| **SEB-REQ-12** | No Fullscreen API Reliance | Does not assume `requestFullscreen()` is permitted. Fullscreen button catches rejections gracefully and defers to SEB kiosk management. | Implemented |
| **SEB-REQ-13** | Editor Resizing & Scrolling | Dual-pane resizer and Monaco layout listener (`automaticLayout: true`) ensure zero layout breaks or frozen canvas rendering upon viewport adjustments. | Implemented |
| **SEB-REQ-14** | Zero Proprietary Browser APIs | Excludes Chromium-specific proprietary APIs (e.g. `chrome.*`, Web Bluetooth, Web USB). Uses standard ECMAScript / DOM standards. | Implemented |
| **SEB-REQ-15** | Self-Contained Execution | No student actions require file downloads, opening native applications, or invoking protocol handlers (`mailto:`, `tel:`, `custom://`). | Implemented |

---

## 3. Monaco Editor Local Bundling Architecture

By default, `@monaco-editor/react` fetches Monaco distribution files and language workers from public CDNs (`cdn.jsdelivr.net`). In Safe Exam Browser, URL filtering policies block external CDNs, causing Monaco to fail to initialize.

### Architectural Solution: `src/utils/monacoSetup.ts`

```typescript
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// Configure local worker instances
self.MonacoEnvironment = {
  getWorker(_: string, label: string): Worker {
    if (label === 'json') return new jsonWorker();
    if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker();
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker();
    if (label === 'typescript' || label === 'javascript') return new tsWorker();
    return new editorWorker();
  },
};

// Force @monaco-editor/react to use local instance
loader.config({ monaco });
```

### Production Build Verification Output:
```
dist/assets/editor.worker-*.js   (232 kB)
dist/assets/json.worker-*.js     (364 kB)
dist/assets/html.worker-*.js     (674 kB)
dist/assets/css.worker-*.js      (1,011 kB)
dist/assets/ts.worker-*.js       (6,023 kB)
```
All worker scripts are compiled into local Vite assets and loaded via standard `Worker` constructors from the same origin.

---

## 4. Keyboard Shortcuts & Security Compliance

### 4.1. Security Non-Intervention Mandate
- **Strict Prohibition:** Under no circumstances will this application attempt to detect, evade, disable, modify, or circumvent SEB kiosk protections, window restrictions, or monitoring mechanisms.
- **No Code Injection:** The application does not inject scripts or styles into SEB browser processes, host OS hooks, or other applications.
- **Kiosk Harmony:** The application behaves as a standard, compliant web client within the environment established by the exam administrator.

### 4.2. Keyboard Shortcut Containment
- Application shortcuts (`Ctrl+Enter` to Run, `Ctrl+F` to search within the active editor) are attached strictly to the focused Monaco editor element.
- **Banned Event Interceptions:** The application **never** calls `event.preventDefault()` on:
  - System keybindings (`Alt+Tab`, `Ctrl+Alt+Del`, `WinKey`, `Alt+F4`).
  - SEB exam keys (`F5`, `F11`, `F12`, `Ctrl+Q`, `Ctrl+W`, `Esc`).

---

## 5. Storage, Clipboard & Window Policy

### 5.1. Graceful Storage Fallback
Safe Exam Browser profiles frequently enable incognito mode or restrict persistent browser storage.
- `src/utils/storage.ts` wraps all `localStorage` access in `try...catch` blocks.
- If storage is denied or throws a `SecurityError`, an in-memory map retains user preferences and session data for the duration of the exam without crashing the interface.

### 5.2. Two-Tier Clipboard Strategy
- Primary: `navigator.clipboard.writeText()` (asynchronous standard).
- Fallback: Hidden `<textarea>` with `document.execCommand('copy')` (synchronous standard legacy).
- In addition to keyboard shortcuts, every code block (Schema, Sample Input, Sample Output) provides an explicit, visible **"Copy"** button with a temporary `"Copied"` confirmation state.

---

## 6. Pre-Flight Verification Checklist for SEB 3.x Testing

Prior to declaring certified SEB 3.x compatibility, the following tests must be conducted within an authorized SEB 3.x client:

- [ ] **Network Whitelist Test:** Verify application loads with only the application origin allowed in SEB URL filter (zero blocked domain alerts).
- [ ] **Monaco Initialization Test:** Verify editor renders syntax highlighting and line numbers without network errors.
- [ ] **Worker Communication Test:** Verify syntax validation worker spawns and communicates via Web Workers.
- [ ] **Dual-Pane Drag Test:** Verify resizable divider functions smoothly under embedded CEF mouse events.
- [ ] **Storage Resilience Test:** Verify app functions when SEB is configured to clear session cookies/cache upon exit.
- [ ] **Context Menu Absence Test:** Verify all editing, copying, and navigation actions can be performed entirely via on-screen buttons.
- [ ] **Timer Stability Test:** Verify countdown timer remains accurate when SEB window loses and regains focus.
