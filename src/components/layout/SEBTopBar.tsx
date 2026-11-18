import React from 'react';
import { ChevronLeft, RotateCcw, Menu } from 'lucide-react';

interface SEBTopBarProps {
  onBack?: () => void;
  onReload?: () => void;
  onMenuClick?: () => void;
}

export const SEBTopBar: React.FC<SEBTopBarProps> = ({
  onBack,
  onReload,
  onMenuClick,
}) => {
  return (
    <div
      role="toolbar"
      aria-label="Safe Exam Browser Window Bar"
      style={{
        height: '30px',
        minHeight: '30px',
        backgroundColor: '#e5e7eb',
        borderBottom: '1px solid #d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        fontSize: '12px',
        color: '#4b5563',
        flexShrink: 0,
        userSelect: 'none',
        zIndex: 40,
      }}
    >
      {/* Left: Navigation Controls (Back & Reload) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={onBack}
          title="Safe Exam Browser: Back"
          aria-label="Safe Exam Browser: Back"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#4b5563',
            padding: '2px',
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          onClick={onReload}
          title="Safe Exam Browser: Reload"
          aria-label="Safe Exam Browser: Reload"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#4b5563',
            padding: '2px',
          }}
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Right: SEB Browser Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        title="Safe Exam Browser Menu"
        aria-label="Safe Exam Browser Menu"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: '#4b5563',
          padding: '2px',
        }}
      >
        <Menu size={16} />
      </button>
    </div>
  );
};
