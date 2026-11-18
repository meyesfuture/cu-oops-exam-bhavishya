import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  dotColor?: string;
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dotColor,
  size = 'md',
  className = '',
  style,
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    neutral: {
      backgroundColor: 'var(--bg-pill)',
      color: 'var(--text-secondary)',
    },
    info: {
      backgroundColor: 'var(--bg-timer)',
      color: 'var(--text-timer)',
    },
    success: {
      backgroundColor: 'rgba(34, 197, 94, 0.12)',
      color: 'var(--status-submitted)',
    },
    warning: {
      backgroundColor: 'var(--status-warning-bg)',
      color: 'var(--status-warning-text)',
    },
    danger: {
      backgroundColor: 'var(--status-danger-bg)',
      color: 'var(--status-danger-text)',
    },
  };

  const isSmall = size === 'sm';

  return (
    <span
      className={cn('ui-badge', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isSmall ? '2px 8px' : '3px 10px',
        fontSize: isSmall ? '11px' : '12px',
        fontWeight: 500,
        borderRadius: 'var(--radius-full)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
    >
      {dotColor && (
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: dotColor,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
};
