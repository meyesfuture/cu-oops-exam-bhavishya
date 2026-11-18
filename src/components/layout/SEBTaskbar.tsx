import React from 'react';
import { Globe, Battery, Volume2, Wifi } from 'lucide-react';

interface SEBTaskbarProps {
  onOpenWebpages?: () => void;
  timeString?: string;
  dateString?: string;
}

export const SEBTaskbar: React.FC<SEBTaskbarProps> = ({
  onOpenWebpages,
  timeString = '01:49',
  dateString = '18-11-2026',
}) => {
  return (
    <div
      role="contentinfo"
      aria-label="Safe Exam Browser System Taskbar"
      style={{
        height: '32px',
        minHeight: '32px',
        backgroundColor: '#e5e7eb',
        borderTop: '1px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        fontSize: '11.5px',
        color: '#1f2937',
        flexShrink: 0,
        userSelect: 'none',
        zIndex: 40,
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Left: Open Webpages Button & Globe Launcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={onOpenWebpages}
          title="Safe Exam Browser: Open Webpages"
          aria-label="Open Webpages"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            border: '1px solid #9ca3af',
            borderRadius: '2px',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: 500,
            color: '#374151',
            cursor: 'pointer',
            height: '22px',
          }}
        >
          Open Webpages
        </button>

        <div
          title="Safe Exam Browser Embedded Session"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#2563eb',
          }}
        >
          <Globe size={15} />
        </div>
      </div>

      {/* Right: System Tray (Battery, Sound, Wi-Fi, Language, Clock) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          title="Battery: 85% Remaining"
          style={{ display: 'flex', alignItems: 'center', color: '#374151' }}
        >
          <Battery size={15} />
        </div>

        <div
          title="Audio: Normal"
          style={{ display: 'flex', alignItems: 'center', color: '#374151' }}
        >
          <Volume2 size={14} />
        </div>

        <div
          title="Wi-Fi: Connected (Protected Kiosk Network)"
          style={{ display: 'flex', alignItems: 'center', color: '#16a34a' }}
        >
          <Wifi size={14} />
        </div>

        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#374151',
            letterSpacing: '0.02em',
          }}
        >
          ENG
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: '10px',
            lineHeight: 1.15,
            color: '#374151',
          }}
        >
          <span>{timeString}</span>
          <span style={{ fontSize: '9.5px', color: '#4b5563' }}>{dateString}</span>
        </div>
      </div>
    </div>
  );
};
