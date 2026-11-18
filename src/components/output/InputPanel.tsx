import React, { useState } from 'react';
import { Trash2, FileText, Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

interface InputPanelProps {
  customInput: string;
  useCustomInput: boolean;
  onCustomInputChange: (val: string) => void;
  onToggleUseCustomInput: (use: boolean) => void;
  onClearInput?: () => void;
  sampleInputPresets?: Array<{ label: string; value: string }>;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  customInput,
  useCustomInput,
  onCustomInputChange,
  onToggleUseCustomInput,
  onClearInput,
  sampleInputPresets = [
    {
      label: 'Tree Sample 1',
      value: '5\n1 2 L\n1 3 R\n3 4 L\n3 5 R',
    },
    {
      label: 'Tree Sample 2 (Skewed)',
      value: '4\n1 2 R\n2 3 R\n3 4 R',
    },
    {
      label: 'Single Node',
      value: '1',
    },
  ],
}) => {
  const [copied, setCopied] = useState(false);

  const linesCount = customInput.length > 0 ? customInput.split('\n').length : 0;
  const charsCount = customInput.length;

  const handleCopy = async () => {
    if (!customInput) return;
    const ok = await copyToClipboard(customInput);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="region"
      aria-label="Custom Input Editor"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Input Panel Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 12px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        {/* Left: Custom Input Toggle Checkbox */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            color: '#1e293b',
          }}
        >
          <input
            type="checkbox"
            checked={useCustomInput}
            onChange={(e) => onToggleUseCustomInput(e.target.checked)}
            style={{ cursor: 'pointer', accentColor: '#0284c7' }}
          />
          <span>Use custom input for Run</span>
        </label>

        {/* Right: Presets & Clear Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', marginRight: '4px' }}>Load Preset:</span>
          {sampleInputPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onCustomInputChange(preset.value);
                onToggleUseCustomInput(true);
              }}
              title={`Insert ${preset.label}`}
              style={{
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 500,
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <FileText size={11} color="#64748b" />
              <span>{preset.label}</span>
            </button>
          ))}

          <div style={{ width: '1px', height: '16px', backgroundColor: '#cbd5e1', margin: '0 4px' }} />

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!customInput}
            title="Copy input text"
            aria-label="Copy input"
            style={{
              padding: '2px 8px',
              fontSize: '11px',
              backgroundColor: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: '3px',
              color: '#475569',
              cursor: customInput ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {copied ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={() => {
              if (onClearInput) onClearInput();
              else onCustomInputChange('');
            }}
            disabled={!customInput}
            title="Clear custom input"
            aria-label="Clear input"
            style={{
              padding: '2px 8px',
              fontSize: '11px',
              backgroundColor: 'transparent',
              border: '1px solid #fecaca',
              borderRadius: '3px',
              color: '#dc2626',
              cursor: customInput ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Trash2 size={12} color="#dc2626" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Input Editor Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex' }}>
        <textarea
          value={customInput}
          onChange={(e) => onCustomInputChange(e.target.value)}
          placeholder="Enter custom stdin test input here... e.g.&#10;5&#10;1 2 L&#10;1 3 R&#10;3 4 L&#10;3 5 R"
          spellCheck={false}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            padding: '10px 14px',
            fontFamily: "Consolas, 'Courier New', monospace",
            fontSize: '12.5px',
            lineHeight: 1.5,
            border: 'none',
            outline: 'none',
            resize: 'none',
            backgroundColor: '#ffffff',
            color: '#0f172a',
          }}
        />
      </div>

      {/* Input Stats Footer */}
      <div
        style={{
          height: '22px',
          minHeight: '22px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '10.5px',
          color: '#64748b',
          userSelect: 'none',
        }}
      >
        <div>
          {useCustomInput ? (
            <span style={{ color: '#0284c7', fontWeight: 600 }}>Active: Will feed into Run execution</span>
          ) : (
            <span>Inactive: Sample test cases will be used instead</span>
          )}
        </div>
        <div>
          <span>{linesCount} line{linesCount !== 1 ? 's' : ''}</span>
          <span style={{ margin: '0 6px' }}>•</span>
          <span>{charsCount} character{charsCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
};
