# Project Rules

Please follow the rules and guidelines specified in [AGENTS.md](./AGENTS.md) and [docs/seb-compatibility.md](./docs/seb-compatibility.md).

Key Highlights:
- Framework: React 19 + TypeScript (Strict Mode) + Vite
- Target Runtime: Windows + Safe Exam Browser 3.x (Embedded Chromium/CEF)
- Editor: Monaco Editor (@monaco-editor/react) with 100% locally bundled workers (Zero CDNs)
- Styling: Modern CSS with Design Tokens in `src/styles/tokens.css` (No Tailwind runtime, no styled-components)
- Icons: `lucide-react` (Vector SVGs only, No emojis as structural icons)
- State Management: React hooks only (no Redux, no MobX, no Zustand)
- SEB Mandatory Rules:
  - Zero external CDN network requests (self-hosted/system fonts & icons)
  - No popups, new windows (`window.open`), or unhandled full-screen requests
  - Full functionality without browser right-click context menus
  - Graceful localStorage and clipboard fallbacks
  - Never detect, evade, disable, or modify SEB restrictions or kiosk mode
  - Do not claim compatibility until tested against the target SEB version
- Baseline Viewport: 1366 × 768 desktop
- Verification: Always run `npm run build` to confirm zero TypeScript errors and successful production bundling.
