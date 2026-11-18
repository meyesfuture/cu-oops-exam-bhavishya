import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Trap focus or handle Escape key within app
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'var(--spacing-md)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={dialogRef}
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.15s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-app)',
          }}
        >
          <h2
            id="modal-title"
            style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {title}
          </h2>
          <IconButton
            icon={<X size={16} />}
            size="sm"
            label="Close modal"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: 'var(--spacing-lg)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--spacing-sm)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-app)',
          }}
        >
          {footer ? (
            footer
          ) : (
            <Button variant="primary" size="md" onClick={onClose}>
              Dismiss
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
