import React, { useState } from 'react';
import {
  Play,
  Clock,
  Wifi,
  List,
  Moon,
  Loader2,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { ExamSection, ExamStatus } from '../../types';
import { formatTimeUnits } from '../../utils/formatters';

interface HeaderProps {
  candidateName: string;
  candidateId?: string;
  username?: string;
  status: ExamStatus;
  remainingSeconds: number;
  currentSection: ExamSection;
  currentQuestionIndex?: number;
  onSectionChange: (section: ExamSection) => void;
  onQuestionSelect?: (qIndex: number) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  candidateName,
  candidateId = '25BCS12751',
  username = 'cuchd_cc_275 | TIWUKE',
  status,
  remainingSeconds,
  currentSection,
  currentQuestionIndex = 1,
  onSectionChange,
  onQuestionSelect,
  onRun,
  onSubmit,
  isRunning = false,
}) => {
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const { hours, minutes, seconds } = formatTimeUnits(remainingSeconds);

  const getStatusBadge = () => {
    switch (status) {
      case 'in_progress':
        return {
          label: 'In Progress',
          color: '#d97706',
          bg: '#fef3c7',
          dot: '#f59e0b',
        };
      case 'submitted':
        return {
          label: 'Submitted',
          color: '#16a34a',
          bg: '#dcfce7',
          dot: '#22c55e',
        };
      case 'not_attempted':
      default:
        return {
          label: 'Not Attempted',
          color: '#1e293b',
          bg: '#eaedf2',
          dot: '#94a3b8',
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <>
      <header
        role="banner"
        style={{
          height: '46px',
          minHeight: '46px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
          zIndex: 30,
          userSelect: 'none',
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Left: List Menu Icon, Status Pill, Moon glyph, Wi-Fi, Candidate Name, Divider, Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* SEB Navigation Menu Button */}
          <button
            type="button"
            title="Open Exam Navigation Menu"
            aria-label="Open Exam Navigation Menu"
            onClick={() => setIsNavDrawerOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#2563eb',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: '4px',
              transition: 'background-color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <List size={18} color="#2563eb" />
          </button>

          {/* Dynamic Status Pill (Exact Reference media_1794961245046_e8d58f82.png) */}
          <div
            title={`Assessment status: ${statusBadge.label}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: statusBadge.bg,
              borderRadius: '9999px',
              padding: '3px 12px',
              fontSize: '12px',
              color: statusBadge.color,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: statusBadge.dot,
              }}
            />
            <span>{statusBadge.label}</span>
          </div>

          {/* Dark Crescent Moon Glyph */}
          <span
            title="Safe Exam Browser: Assessment Light Mode"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#0f172a',
              cursor: 'default',
              margin: '0 2px',
            }}
          >
            <Moon size={15} fill="#0f172a" color="#0f172a" />
          </span>

          {/* Green Wi-Fi Signal Indicator */}
          <span
            title="Network: Connected | Authorized Safe Exam Session"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#16a34a',
              cursor: 'default',
              marginRight: '2px',
            }}
          >
            <Wifi size={16} color="#16a34a" />
          </span>

          {/* Candidate Name (Single Line, Exact Reference) */}
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#1e293b',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {candidateName}
          </span>

          {/* Vertical Divider */}
          <span
            style={{
              color: '#cbd5e1',
              margin: '0 6px',
              fontSize: '14px',
              fontWeight: 300,
              userSelect: 'none',
            }}
          >
            |
          </span>

          {/* Section Indicator */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setIsSectionMenuOpen((prev) => !prev)}
              title="Switch Exam Section"
              role="button"
              tabIndex={0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <Clock size={15} color="#0284c7" />
              <span>{currentSection === 'coding' ? 'Coding Section' : 'Viva Section'}</span>
            </div>

            {isSectionMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  zIndex: 50,
                  minWidth: '150px',
                  padding: '4px 0',
                  marginTop: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSectionChange('coding');
                    setIsSectionMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    fontWeight: currentSection === 'coding' ? 600 : 400,
                    color: currentSection === 'coding' ? '#0284c7' : '#334155',
                    backgroundColor: currentSection === 'coding' ? '#f0f9ff' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Coding Section
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSectionChange('viva');
                    setIsSectionMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    fontWeight: currentSection === 'viva' ? 600 : 400,
                    color: currentSection === 'viva' ? '#0284c7' : '#334155',
                    backgroundColor: currentSection === 'viva' ? '#f0f9ff' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Viva Section
                </button>
              </div>
            )}
          </div>

          {/* Active Countdown Timer Badges */}
          <div
            title="Time remaining in this assessment"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12.5px',
              fontWeight: 400,
              color: '#5f6368',
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              marginLeft: '4px',
            }}
          >
            {hours !== '00' && (
              <>
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
                  {hours}
                </span>
                <span>Hrs :</span>
              </>
            )}
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
              {minutes}
            </span>
            <span>Min</span>
            <span>:</span>
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
              {seconds}
            </span>
            <span>Sec</span>
          </div>
        </div>

        {/* Right: Primary Action Buttons (Run, Submit) & Contest ends metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Run Button with Loading State */}
          <button
            type="button"
            onClick={onRun}
            disabled={isRunning}
            title="Compile and run sample assertions (Ctrl+Enter)"
            aria-label="Run Code"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '30px',
              padding: '0 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #93c5fd',
              borderRadius: '4px',
              color: isRunning ? '#94a3b8' : '#1e293b',
              fontSize: '13px',
              fontWeight: 500,
              cursor: isRunning ? 'not-allowed' : 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              if (!isRunning) e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            onMouseLeave={(e) => {
              if (!isRunning) e.currentTarget.style.backgroundColor = '#ffffff';
            }}
            onMouseDown={(e) => {
              if (!isRunning) e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'none';
            }}
          >
            {isRunning ? (
              <Loader2 size={13} className="animate-spin" color="#0284c7" />
            ) : (
              <Play size={11} fill="#0284c7" color="#0284c7" />
            )}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          {/* Submit Button (Exact Reference media_1794961247784_6408fbb6.png) */}
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            title="Finalize and submit assessment"
            aria-label="Submit Assessment"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30px',
              padding: '0 18px',
              backgroundColor: '#0073e6',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0062c4')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0073e6')}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'none')}
          >
            Submit
          </button>

          {/* Contest Ends In Metadata Text */}
          <span
            className="contest-ends-meta"
            style={{
              fontSize: '12px',
              color: '#64748b',
              whiteSpace: 'nowrap',
              marginLeft: '4px',
            }}
          >
            Contest ends in 1...
          </span>
        </div>
      </header>

      {/* Slide-out Examination Navigation Drawer (Hamburger Menu) */}
      {isNavDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 9999,
            display: 'flex',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsNavDrawerOpen(false);
          }}
        >
          <div
            style={{
              width: '320px',
              maxWidth: '85vw',
              height: '100%',
              backgroundColor: '#ffffff',
              boxShadow: '4px 0 16px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              userSelect: 'none',
              animation: 'slideInLeft 0.2s ease-out',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8fafc',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                  Assessment Overview
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Safe Exam Browser Active Session
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNavDrawerOpen(false)}
                title="Close Drawer"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body: Questions & Sections Switcher */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                  EXAMINATION QUESTIONS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { id: 1, title: 'Question 1: Product Inventory Manager', desc: 'SQLite in-memory JDBC operations' },
                    { id: 2, title: 'Question 2: Method Overloading', desc: 'Compile-Time Polymorphism' },
                  ].map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onQuestionSelect?.(q.id);
                        onSectionChange('coding');
                        setIsNavDrawerOpen(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '4px',
                        border: currentQuestionIndex === q.id ? '1px solid #0284c7' : '1px solid #e2e8f0',
                        backgroundColor: currentQuestionIndex === q.id ? '#f0f9ff' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e293b' }}>
                          {q.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{q.desc}</div>
                      </div>
                      {currentQuestionIndex === q.id && (
                        <CheckCircle2 size={16} color="#0284c7" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                  SECTIONS
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      onSectionChange('coding');
                      setIsNavDrawerOpen(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '4px',
                      border: currentSection === 'coding' ? '1px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: currentSection === 'coding' ? '#f0f9ff' : '#ffffff',
                      color: currentSection === 'coding' ? '#0284c7' : '#334155',
                      fontWeight: 600,
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Coding Section
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSectionChange('viva');
                      setIsNavDrawerOpen(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '4px',
                      border: currentSection === 'viva' ? '1px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: currentSection === 'viva' ? '#f0f9ff' : '#ffffff',
                      color: currentSection === 'viva' ? '#0284c7' : '#334155',
                      fontWeight: 600,
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Viva Section
                  </button>
                </div>
              </div>

              {/* Assessment Candidate Details */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  padding: '12px',
                  fontSize: '11.5px',
                  color: '#475569',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div><strong>Candidate:</strong> {candidateName}</div>
                <div><strong>ID:</strong> {candidateId}</div>
                <div><strong>Username:</strong> {username}</div>
                <div><strong>Exam:</strong> CU CSE OOPS End Semester</div>
                <div><strong>Remaining:</strong> {hours}h {minutes}m {seconds}s</div>
              </div>
            </div>


          </div>
        </div>
      )}

      {/* In-DOM Submit Confirmation Modal (SEB Compliant - Zero Browser Popups) */}
      {isSubmitModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSubmitModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <AlertTriangle size={20} color="#d97706" />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Confirm Assessment Submission
              </h3>
            </div>

            <div style={{ padding: '20px', fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 12px 0' }}>
                Are you sure you want to finalize and submit your practical exam?
              </p>
              <div
                style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '4px',
                  padding: '10px 14px',
                  color: '#0369a1',
                  fontSize: '12.5px',
                  marginBottom: '12px',
                }}
              >
                You still have <strong>{hours}h {minutes}m {seconds}s</strong> remaining in this slot.
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                Once submitted, your final code draft will be evaluated and shared with your college department. You will not be able to modify your answers.
              </p>
            </div>

            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel &amp; Continue Coding
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onSubmit();
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '4px',
                  border: '1px solid #007bff',
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Yes, Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};
