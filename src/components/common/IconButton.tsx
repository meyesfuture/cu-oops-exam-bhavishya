import { forwardRef, ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, isActive = false, size = 'md', className = '', disabled, style, ...props }, ref) => {
    const sizeMap = {
      sm: '28px',
      md: '34px',
      lg: '40px',
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        title={label}
        aria-label={label}
        disabled={disabled}
        className={cn('ui-icon-btn', isActive && 'active', className)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeMap,
          height: sizeMap,
          borderRadius: 'var(--radius-md)',
          color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
          backgroundColor: isActive ? 'var(--bg-active)' : 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all var(--duration-fast) ease',
          ...style,
        }}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
