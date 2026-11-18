import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProblemDescriptionProps {
  overview: string;
  requirements: string[];
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  overview,
  requirements,
}) => {
  // Split overview by double newlines into clean paragraphs
  const paragraphs = overview.split('\n\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      {/* Narrative Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            style={{
              margin: 0,
              fontSize: 'var(--font-size-base)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Structured Requirements Checklist */}
      {requirements && requirements.length > 0 && (
        <div
          style={{
            marginTop: 'var(--space-2)',
            backgroundColor: 'var(--bg-hover)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Core Implementation Requirements:
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {requirements.map((req, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}
              >
                <CheckCircle
                  size={15}
                  style={{
                    color: 'var(--brand-primary)',
                    flexShrink: 0,
                    marginTop: '3px',
                  }}
                />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
