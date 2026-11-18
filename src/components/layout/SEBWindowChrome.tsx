import React from 'react';

interface SEBWindowChromeProps {
  title?: string;
  timeString?: string;
  dateString?: string;
  children: React.ReactNode;
}

export const SEBWindowChrome: React.FC<SEBWindowChromeProps> = ({
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100vw',
        backgroundColor: '#ffffff',
        color: '#1f2937',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};
