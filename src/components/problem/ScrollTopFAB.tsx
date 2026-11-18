import React from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollTopFABProps {
  visible: boolean;
  onClick: () => void;
}

export const ScrollTopFAB: React.FC<ScrollTopFABProps> = ({ visible, onClick }) => {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      title="Scroll to top of problem"
      aria-label="Scroll to top"
      style={{
        position: 'sticky',
        bottom: 'var(--space-4)',
        float: 'right',
        width: '36px',
        height: '36px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--brand-primary)',
        color: '#ffffff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        zIndex: 15,
        transition: 'transform var(--duration-fast) var(--ease-spring), background-color var(--duration-fast) ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.backgroundColor = 'var(--brand-primary)';
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
};
