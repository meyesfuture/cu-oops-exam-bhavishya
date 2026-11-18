import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught application error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            backgroundColor: 'var(--bg-app)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-chrome)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                lineHeight: 1.5,
              }}
            >
              The workspace encountered an unexpected rendering error. You can reload the application
              or reset cached preferences.
            </p>
            {this.state.error && (
              <pre
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-code-box)',
                  color: 'var(--text-code-box)',
                  fontSize: '0.75rem',
                  textAlign: 'left',
                  overflowX: 'auto',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Reload Application
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                Reset Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
