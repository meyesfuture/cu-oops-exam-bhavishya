import React from 'react';
import { Play } from 'lucide-react';

interface ActionControlsProps {
  onRun?: () => void;
  onSubmit?: () => void;
  isRunning?: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  onRun,
  onSubmit,
  isRunning = false,
}) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    width: '150px',
    height: '36px',
    borderRadius: '2px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: isRunning ? 'not-allowed' : 'pointer',
    opacity: isRunning ? 0.6 : 1,
    transition: 'background-color 150ms ease',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Run — outlined CodeChef style */}
      <button
        type="button"
        onClick={onRun}
        disabled={isRunning}
        aria-label="Run code"
        style={{
          ...base,
          backgroundColor: '#ffffff',
          border: '1px solid #2a67b1',
          color: '#2a67b1',
        }}
      >
        <Play size={13} fill="currentColor" />
        {isRunning ? 'Running…' : 'Run'}
      </button>

      {/* Submit — filled CodeChef style */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isRunning}
        aria-label="Submit solution"
        style={{
          ...base,
          backgroundColor: '#2a67b1',
          border: '1px solid #2a67b1',
          color: '#ffffff',
        }}
      >
        Submit
      </button>
    </div>
  );
};
