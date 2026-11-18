import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'secondary',
      size = 'md',
      icon,
      iconPosition = 'left',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: { height: '28px', padding: '0 10px', fontSize: '12px' },
      md: { height: '32px', padding: '0 14px', fontSize: '13px' },
      lg: { height: '38px', padding: '0 18px', fontSize: '14px' },
    }[size];

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--brand-primary)',
        color: '#ffffff',
        border: '1px solid transparent',
      },
      secondary: {
        backgroundColor: 'var(--brand-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--brand-secondary-border)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-strong)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid transparent',
      },
      danger: {
        backgroundColor: 'var(--status-danger-bg)',
        color: 'var(--status-danger-text)',
        border: '1px solid var(--status-danger-text)',
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn('ui-btn', className)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontWeight: 600,
          borderRadius: 'var(--radius-md)',
          cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
          opacity: disabled || isLoading ? 0.6 : 1,
          transition: 'all var(--duration-fast) ease',
          ...sizeStyles,
          ...variantStyles[variant],
        }}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="ui-btn-icon">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ui-btn-icon">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
