import React, { useState, useEffect } from 'react';
import {
  Clock,
  FileText,
  User,
  Wifi,
  LogOut,
} from 'lucide-react';
import { ExamSession } from '../../types';
import { SEBWindowChrome } from '../layout/SEBWindowChrome';

interface OpeningScreenProps {
  session: ExamSession;
  onStartExam: () => void;
}

const ExamIllustration: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue background card / folder */}
    <rect x="8" y="18" width="30" height="38" rx="3" fill="#2563eb" transform="rotate(-15 8 18)" />
    
    {/* White test paper with lines */}
    <rect x="18" y="10" width="32" height="42" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
    <line x1="24" y1="18" x2="42" y2="18" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="24" x2="38" y2="24" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="30" x2="42" y2="30" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="36" x2="36" y2="36" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="42" x2="40" y2="42" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

    {/* Blue pen */}
    <rect x="42" y="14" width="7" height="24" rx="3.5" fill="#1d4ed8" transform="rotate(18 42 14)" />
    <polygon points="46,38 43,44 49,42" fill="#cbd5e1" />

    {/* Gold approval seal / check */}
    <circle cx="50" cy="18" r="9" fill="#f59e0b" />
    <path d="M46 18 L49 21 L55 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ session, onStartExam }) => {
  // Live ticking countdown for the pre-exam waiting screen: starts at 02 Hrs : 33 Min (Image 2)
  const [minutes, setMinutes] = useState(33);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((m) => (m > 0 ? m - 1 : 0));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const examTitle = 'CU CSE OOPS end semester practical exam Slot 3 (01:30 PM-03:00 PM)';

  return (
    <SEBWindowChrome
      title={examTitle}
      timeString="10:56"
      dateString="18-11-2026"
    >
      {/* Centered Main Viewport Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        {/* Top-Right Action Buttons (Logout & Quit Safe Exam Browser) */}
        <div
          style={{
            width: '100%',
            maxWidth: '740px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          {/* Logout Button */}
          <button
            type="button"
            title="Logout from assessment session"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#475569',
              borderRadius: '3px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 400,
              cursor: 'pointer',
            }}
          >
            <LogOut size={12} color="#64748b" />
            <span>Logout</span>
          </button>

          {/* Quit Safe Exam Browser Button (Red Outline) */}
          <a
            href="https://safeexmbrowser.org/exit"
            title="Quit Safe Exam Browser"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#ffffff',
              border: '1px solid #dc2626',
              color: '#dc2626',
              borderRadius: '3px',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 400,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <LogOut size={12} color="#dc2626" />
            <span>Quit Safe Exam Browser</span>
          </a>
        </div>

        {/* Centered Assessment Card (Exact Reference Image 2: media_1794980396003_2331b03e.jpg) */}
        <div
          style={{
            width: '100%',
            maxWidth: '740px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Card Header: Slot 3 Title & Checklist Illustration */}
          <div
            style={{
              padding: '18px 24px 14px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <h1
              style={{
                fontSize: '15.5px',
                fontWeight: 600,
                color: '#1e293b',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {examTitle}
            </h1>

            <ExamIllustration />
          </div>

          {/* Card Middle: Soft Gray Inner Container */}
          <div style={{ padding: '16px 20px', backgroundColor: '#ffffff' }}>
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: '4px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Row 1: Duration & Circular Wi-Fi Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Clock size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                      1 Hour 30 Minutes
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '1px' }}>
                      Total time to attempt the assessment
                    </div>
                  </div>
                </div>

                {/* Circular Wi-Fi Indicator Badge */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  title="Network Connected (Safe Exam Browser Authorized)"
                >
                  <Wifi size={16} color="#16a34a" />
                </div>
              </div>

              {/* Row 2: Questions Count */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <FileText size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                    2 Questions
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '1px' }}>
                    Number of questions in the assessment
                  </div>
                </div>
              </div>

              {/* Row 3: Candidate Identity (NAVNEET) */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <User size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#1e293b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {session?.candidateName || 'NAVNEET'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                    CodeChef Username: {session?.username ? session.username.split(' ')[0] : 'cuchd_cc_253'}{' '}
                    <span style={{ color: '#0284c7', cursor: 'pointer' }}>(Not you? Logout)</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                    IP - 47.247.118.30 (Allowed for this test)
                  </div>
                </div>
              </div>

              {/* Row 4: Assessment Rules */}
              <div style={{ marginTop: '4px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                  Read the rules carefully before starting
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '11.5px',
                    color: '#475569',
                    lineHeight: 1.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                  }}
                >
                  <li>• You can only attempt this assessment once.</li>
                  <li>• You will not be able to pause the assessment after starting.</li>
                  <li>• you are not allowed to switch tabs during the assessment, otherwise you will be blocked from the assessment.</li>
                  <li>• You will get a detailed report on your performance at the end of the assessment.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card Footer: Starts In Countdown (Clickable to Enter Assessment) */}
          <div
            onClick={onStartExam}
            title="Click to start assessment"
            role="button"
            tabIndex={0}
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e5e7eb',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>
              Assessment Starts In
            </span>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12.5px',
                color: '#5f6368',
                fontWeight: 400,
              }}
            >
              <span
                style={{
                  backgroundColor: '#e8f0fe',
                  color: '#1a73e8',
                  padding: '2px 7px',
                  borderRadius: '3px',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }}
              >
                02
              </span>
              <span>Hrs :</span>
              <span
                style={{
                  backgroundColor: '#e8f0fe',
                  color: '#1a73e8',
                  padding: '2px 7px',
                  borderRadius: '3px',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }}
              >
                {String(minutes).padStart(2, '0')}
              </span>
              <span>Min</span>
              <span style={{ display: 'none' }}>{seconds}</span>
            </div>
          </div>
        </div>
      </div>
    </SEBWindowChrome>
  );
};
