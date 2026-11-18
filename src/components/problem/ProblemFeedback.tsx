import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

export const ProblemFeedback: React.FC = () => {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [upCount, setUpCount] = useState<number>(342);

  const handleVote = (type: 'up' | 'down') => {
    if (vote === type) {
      setVote(null);
      if (type === 'up') setUpCount((c) => c - 1);
    } else {
      if (vote === 'up') setUpCount((c) => c - 1);
      if (type === 'up') setUpCount((c) => c + 1);
      setVote(type);
    }
  };

  return (
    <div
      style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'var(--space-4)',
        marginTop: 'var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--text-muted)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span>Did you like this problem?</span>
        <button
          type="button"
          onClick={() => handleVote('up')}
          aria-label="Vote Up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: vote === 'up' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            color: vote === 'up' ? 'var(--status-submitted)' : 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px 8px',
            cursor: 'pointer',
            transition: 'all var(--duration-fast) ease',
          }}
        >
          <ThumbsUp size={13} />
          <span>{upCount}</span>
        </button>

        <button
          type="button"
          onClick={() => handleVote('down')}
          aria-label="Vote Down"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: vote === 'down' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
            color: vote === 'down' ? 'var(--status-error)' : 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px 8px',
            cursor: 'pointer',
            transition: 'all var(--duration-fast) ease',
          }}
        >
          <ThumbsDown size={13} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <MessageSquare size={13} />
        <span>48 Discussions</span>
      </div>
    </div>
  );
};
