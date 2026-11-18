import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { SampleTestCase } from '../../types';
import { copyToClipboard } from '../../utils/clipboard';

interface SampleTestCasesProps {
  cases: SampleTestCase[];
}

export const SampleTestCases: React.FC<SampleTestCasesProps> = ({ cases }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div
      id="sample-cases"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}
    >
      <div
        style={{
          fontSize: 'var(--font-size-md)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.005em',
        }}
      >
        Sample Cases & Explanations
      </div>

      {cases.map((sample, index) => {
        const inputKey = `case-${sample.id}-input`;
        const outputKey = `case-${sample.id}-output`;

        return (
          <div
            key={sample.id ?? index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              backgroundColor: 'var(--bg-chrome)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
            }}
          >
            {/* Sample Case Header */}
            <div
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Sample Case {sample.id ?? index + 1}
            </div>

            {/* Inputs & Outputs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {/* Sample Input Block */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '4px',
                  }}
                >
                  <span>Sample Input</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(inputKey, sample.input)}
                    aria-label={`Copy Sample Input ${sample.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      color: copiedKey === inputKey ? 'var(--status-submitted)' : 'var(--text-muted)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {copiedKey === inputKey ? (
                      <>
                        <Check size={12} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-code-box)',
                    color: 'var(--text-code-box)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    overflowX: 'auto',
                    border: '1px solid var(--border-code-box)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  <code>{sample.input}</code>
                </pre>
              </div>

              {/* Sample Output Block */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '4px',
                  }}
                >
                  <span>Sample Output</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(outputKey, sample.output)}
                    aria-label={`Copy Sample Output ${sample.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      color: copiedKey === outputKey ? 'var(--status-submitted)' : 'var(--text-muted)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {copiedKey === outputKey ? (
                      <>
                        <Check size={12} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-code-box)',
                    color: 'var(--text-code-box)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    overflowX: 'auto',
                    border: '1px solid var(--border-code-box)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  <code>{sample.output}</code>
                </pre>
              </div>
            </div>

            {/* Explanation Block */}
            {sample.explanation && (
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 'var(--font-size-sm)',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  <Info size={13} style={{ color: 'var(--brand-primary)' }} />
                  <span>Explanation:</span>
                </div>
                <div style={{ whiteSpace: 'pre-line' }}>{sample.explanation}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
