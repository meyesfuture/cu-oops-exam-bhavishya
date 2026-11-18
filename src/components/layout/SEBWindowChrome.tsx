import React from 'react';

interface SEBWindowChromeProps {
  title?: string;
  timeString?: string;
  dateString?: string;
  children: React.ReactNode;
}

export const SEBWindowChrome: React.FC<SEBWindowChromeProps> = ({
  title = 'CU CSE OOPS end semester practical exam Slot 3 (01:30 PM-03:00 PM)',
  timeString = '10:56',
  dateString = '18-11-2026',
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100vw',
        backgroundColor: '#ebeef2',
        color: '#1f2937',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 1. SEB Window Title Bar (Topmost) */}
      <div
        style={{
          height: '26px',
          minHeight: '26px',
          backgroundColor: '#e2e8f0',
          borderBottom: '1px solid #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 10px',
          fontSize: '11px',
          color: '#334155',
          flexShrink: 0,
        }}
      >
        {/* Left: CodeChef Icon & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '15px',
              height: '15px',
              backgroundColor: '#5b4636',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '9px',
              fontWeight: 800,
              fontFamily: 'sans-serif',
              lineHeight: 1,
            }}
          >
            cc
          </div>
          <span style={{ fontWeight: 400, color: '#1e293b' }}>{title}</span>
        </div>

        {/* Right: Window Controls (Minimize, Maximize, Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#64748b' }}>
          <span style={{ fontSize: '13px', lineHeight: 1, cursor: 'default' }}>—</span>
          <span style={{ fontSize: '11px', lineHeight: 1, cursor: 'default' }}>□</span>
          <span style={{ fontSize: '13px', lineHeight: 1, cursor: 'default' }}>✕</span>
        </div>
      </div>

      {/* 2. SEB Browser Navigation Toolbar */}
      <div
        style={{
          height: '28px',
          minHeight: '28px',
          backgroundColor: '#f1f5f9',
          borderBottom: '1px solid #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          flexShrink: 0,
        }}
      >
        {/* Left: Navigation Buttons (|<, <, >, ↻) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* SkipBack |< */}
          <button
            type="button"
            title="First page"
            style={{ background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', color: '#475569', cursor: 'default' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>

          {/* Back < */}
          <button
            type="button"
            title="Back"
            style={{ background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', color: '#475569', cursor: 'default' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Forward > (disabled) */}
          <button
            type="button"
            disabled
            title="Forward"
            style={{ background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', color: '#cbd5e1', cursor: 'default' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Reload ↻ */}
          <button
            type="button"
            title="Reload"
            style={{ background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', color: '#475569', cursor: 'default' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* Right: Menu ☰ */}
        <div style={{ color: '#475569', display: 'flex', alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* 3. SEB Bottom Taskbar */}
      <div
        style={{
          height: '32px',
          minHeight: '32px',
          backgroundColor: '#e2e8f0',
          borderTop: '1px solid #cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          fontSize: '11px',
          color: '#334155',
          flexShrink: 0,
        }}
      >
        {/* Left: SEB Circular Blue Shield / Keyhole Icon */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#1d4ed8" />
            <path
              d="M12 6 C9.5 6 7.5 8 7.5 10.5 L7.5 12 L7 12 C6.4 12 6 12.4 6 13 L6 18 C6 18.6 6.4 19 7 19 L17 19 C17.6 19 18 18.6 18 18 L18 13 C18 12.4 17.6 12 17 12 L16.5 12 L16.5 10.5 C16.5 8 14.5 6 12 6 Z M12 8 C13.4 8 14.5 9.1 14.5 10.5 L14.5 12 L9.5 12 L9.5 10.5 C9.5 9.1 10.6 8 12 8 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Right: System Tray (Battery, Wi-Fi Slashed, Speaker, ENG, Time/Date, Power) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Green Battery */}
          <div style={{ display: 'inline-flex', alignItems: 'center' }} title="Battery: 95%">
            <svg width="20" height="12" viewBox="0 0 24 14" fill="none">
              <rect x="1" y="1" width="19" height="12" rx="2" stroke="#334155" strokeWidth="1.5" />
              <rect x="2.5" y="2.5" width="14" height="9" rx="1" fill="#16a34a" />
              <path d="M22 4.5 C22.8 4.5 23 5.2 23 7 C23 8.8 22.8 9.5 22 9.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Orange Wi-Fi with Slash/Exclamation */}
          <div style={{ display: 'inline-flex', alignItems: 'center' }} title="Restricted Network">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13a10 10 0 0 1 14 0" />
              <path d="M8.5 16.5a5 5 0 0 1 7 0" />
              <path d="M2 8.82a15 15 0 0 1 20 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
              <circle cx="19" cy="19" r="3.5" fill="#e2e8f0" stroke="#ea580c" strokeWidth="1.8" />
              <line x1="17" y1="17" x2="21" y2="21" stroke="#ea580c" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Speaker */}
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </div>

          <span style={{ fontWeight: 600, fontSize: '11px', color: '#1e293b' }}>ENG</span>

          {/* Time & Date */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1 }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>{timeString}</span>
            <span style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>{dateString}</span>
          </div>

          {/* Power Button ⏻ */}
          <div style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default', marginLeft: '4px' }} title="Shut Down">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
