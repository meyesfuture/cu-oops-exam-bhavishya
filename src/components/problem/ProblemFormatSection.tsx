import React from 'react';
import { ArrowDownRight, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface ProblemFormatSectionProps {
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
}

export const ProblemFormatSection: React.FC<ProblemFormatSectionProps> = ({
  inputFormat,
  outputFormat,
  constraints,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
      {/* Input Format */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: 'var(--font-size-md)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          <ArrowDownRight size={17} style={{ color: 'var(--brand-primary)' }} />
          <span>Input Format</span>
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-base)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-line',
          }}
        >
          {inputFormat}
        </div>
      </div>

      {/* Output Format */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: 'var(--font-size-md)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          <ArrowUpRight size={17} style={{ color: 'var(--brand-primary)' }} />
          <span>Output Format</span>
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-base)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-line',
          }}
        >
          {outputFormat}
        </div>
      </div>

      {/* Constraints */}
      {constraints && constraints.length > 0 && (
        <div id="problem-constraints">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--font-size-md)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-2)',
            }}
          >
            <ShieldAlert size={17} style={{ color: 'var(--status-in-progress)' }} />
            <span>Constraints & Bounds</span>
          </div>
          <div
            style={{
              backgroundColor: 'var(--bg-code-box-inline)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-primary)',
            }}
          >
            {constraints.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
