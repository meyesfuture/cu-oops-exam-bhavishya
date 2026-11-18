import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <aside
      aria-live="polite"
      aria-label="System notifications"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        maxWidth: '360px',
        userSelect: 'none',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        const borderColor = isSuccess ? '#bbf7d0' : isWarning ? '#fde68a' : '#bfdbfe';
        const bgColor = isSuccess ? '#f0fdf4' : isWarning ? '#fffbeb' : '#eff6ff';
        const textColor = isSuccess ? '#15803d' : isWarning ? '#b45309' : '#1d4ed8';

        return (
          <div
            key={toast.id}
            role="status"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              padding: '10px 14px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              color: textColor,
              fontSize: '12.5px',
              fontWeight: 500,
              animation: 'fadeInUp 150ms ease-out',
            }}
          >
            {isSuccess ? (
              <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
            ) : isWarning ? (
              <AlertTriangle size={16} color="#d97706" style={{ flexShrink: 0 }} />
            ) : (
              <Info size={16} color="#2563eb" style={{ flexShrink: 0 }} />
            )}
            <span style={{ flex: 1, lineHeight: 1.3 }}>{toast.text}</span>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              title="Dismiss notification"
              aria-label="Dismiss notification"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
