import React, { useState } from 'react';
import { Star, LogOut } from 'lucide-react';
import { SEBWindowChrome } from '../layout/SEBWindowChrome';

interface CompletionScreenProps {
  onReturnToReview?: () => void;
}

const CharacterIllustration: React.FC = () => (
  <div
    style={{
      width: '84px',
      height: '84px',
      backgroundColor: '#f1f5f9',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
    }}
  >
    <svg width="78" height="78" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gold star */}
      <polygon
        points="24,38 27,45 34,45 28,49 31,56 24,51 17,56 20,49 14,45 21,45"
        fill="#f59e0b"
      />
      {/* Hand holding star */}
      <path d="M21 54 C21 51, 28 51, 30 54 L30 57 L21 57 Z" fill="#b46a55" />
      {/* Arm extended to star */}
      <path d="M29 55 C29 55, 39 63, 46 51 L54 55 C48 68, 35 65, 26 58 Z" fill="#38a169" />
      {/* Torso / Green Shirt */}
      <path d="M44 52 C47 46, 73 46, 76 52 L79 78 L41 78 Z" fill="#38a169" />
      {/* Right arm hanging */}
      <path d="M74 52 C77 58, 82 66, 84 74 L78 76 C76 68, 72 60, 70 54 Z" fill="#38a169" />
      <circle cx="81" cy="76" r="3.5" fill="#b46a55" />
      {/* Neck */}
      <rect x="56" y="38" width="8" height="8" rx="2" fill="#b46a55" />
      {/* Head */}
      <path d="M51 22 C51 15, 69 15, 69 22 L69 36 C69 43, 51 43, 51 36 Z" fill="#b46a55" />
      {/* Hair */}
      <path
        d="M50 22 C50 13, 70 13, 70 22 C70 24, 69 26, 68 28 C66 24, 64 23, 60 23 C56 23, 53 25, 51 27 C50 25, 50 23, 50 22 Z"
        fill="#2d3748"
      />
    </svg>
  </div>
);

export const CompletionScreen: React.FC<CompletionScreenProps> = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [saved, setSaved] = useState<boolean>(false);

  return (
    <SEBWindowChrome
      title="CU CSE OOPS end semester practical exam Slot 1(9:30 AM - 11:00 AM)"
      timeString="10:35"
      dateString="18-11-2026"
    >
      {/* Main Centered Content Viewport */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          overflowY: 'auto',
        }}
      >
        {/* Center Card (Exact Reference Image 1: media_1794980387623_9470818b.png) */}
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            padding: '42px 32px 38px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Main Heading */}
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b',
              margin: '0 0 12px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Thank You!
          </h1>

          {/* Subtitle Lines */}
          <p
            style={{
              fontSize: '14.5px',
              color: '#475569',
              lineHeight: 1.5,
              margin: '0 0 4px 0',
              maxWidth: '380px',
            }}
          >
            You've successfully completed the assessment.
          </p>

          <p
            style={{
              fontSize: '14px',
              color: '#475569',
              margin: '0 0 20px 0',
            }}
          >
            Your score will be shared with your college.
          </p>

          {/* Red Quit Safe Exam Browser Button (Exact Position: Above Rating in Image 1) */}
          <a
            href="https://safeexmbrowser.org/exit"
            title="Quit Safe Exam Browser"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: '#b91c1c',
              color: '#ffffff',
              border: '1px solid #991b1b',
              borderRadius: '3px',
              padding: '7px 18px',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer',
              marginBottom: '26px',
              boxShadow: '0 1px 2px rgba(185, 28, 28, 0.2)',
              transition: 'background-color 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#991b1b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#b91c1c';
            }}
          >
            <LogOut size={13} color="#ffffff" />
            <span>Quit Safe Exam Browser</span>
          </a>

          {/* Feedback & Star Rating Widget with Illustration */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              textAlign: 'center',
            }}
          >
            {/* Left side: Question, Stars, Button */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  color: '#475569',
                  marginBottom: '8px',
                }}
              >
                Did you like the assessment ?
              </div>

              {/* 5-Star Row */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} stars`}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Star
                      size={24}
                      strokeWidth={1.5}
                      color={star <= (hoverRating || rating) ? '#f59e0b' : '#94a3b8'}
                      fill={star <= (hoverRating || rating) ? '#f59e0b' : 'none'}
                    />
                  </button>
                ))}
              </div>

              {/* Save Feedback Button */}
              <button
                type="button"
                onClick={() => setSaved(true)}
                style={{
                  marginTop: '12px',
                  backgroundColor: '#6ba4d9',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '6px 16px',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a93c7')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6ba4d9')}
              >
                {saved ? 'Feedback Saved' : 'Save Feedback'}
              </button>
            </div>

            {/* Right side: Character holding gold star illustration */}
            <CharacterIllustration />
          </div>
        </div>
      </div>
    </SEBWindowChrome>
  );
};
