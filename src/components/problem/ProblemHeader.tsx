import React from 'react';
import { Clock, HardDrive, Tag, Award } from 'lucide-react';
import { DifficultyLevel } from '../../types';

interface ProblemHeaderProps {
  title: string;
  difficulty: DifficultyLevel;
  timeLimit: string;
  memoryLimit: string;
  tags?: string[];
}

export const ProblemHeader: React.FC<ProblemHeaderProps> = ({
  title,
  difficulty,
  timeLimit,
  memoryLimit,
  tags = [],
}) => {
  const getDifficultyColor = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'Easy':
        return {
          bg: 'rgba(16, 185, 129, 0.12)',
          text: 'var(--status-submitted, #10b981)',
          border: 'rgba(16, 185, 129, 0.3)',
        };
      case 'Hard':
        return {
          bg: 'rgba(239, 68, 68, 0.12)',
          text: 'var(--status-error, #ef4444)',
          border: 'rgba(239, 68, 68, 0.3)',
        };
      case 'Medium':
      default:
        return {
          bg: 'rgba(245, 158, 11, 0.12)',
          text: 'var(--status-in-progress, #f59e0b)',
          border: 'rgba(245, 158, 11, 0.3)',
        };
    }
  };

  const diffStyle = getDifficultyColor(difficulty);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: 'var(--space-5)',
      }}
    >
      {/* Title & Difficulty Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          {title}
        </h1>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            backgroundColor: diffStyle.bg,
            color: diffStyle.text,
            border: `1px solid ${diffStyle.border}`,
            flexShrink: 0,
          }}
        >
          <Award size={13} />
          {difficulty}
        </span>
      </div>

      {/* Limits & Tags Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-secondary)',
        }}
      >
        {/* Time Limit */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: 'var(--bg-hover)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
          title="Execution Time Limit"
        >
          <Clock size={13} style={{ color: 'var(--text-muted)' }} />
          <span>Time Limit: <strong>{timeLimit}</strong></span>
        </div>

        {/* Memory Limit */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: 'var(--bg-hover)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
          title="Memory Limit"
        >
          <HardDrive size={13} style={{ color: 'var(--text-muted)' }} />
          <span>Memory: <strong>{memoryLimit}</strong></span>
        </div>

        {/* Tags */}
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--bg-code-box-inline)',
              color: 'var(--text-secondary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            <Tag size={11} style={{ opacity: 0.6 }} />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
