import React, { useState } from 'react';
import {
  X,
  AlertCircle,
  Folder,
  FileCode2,
  GitBranch,
  RotateCcw,
  MessageSquare,
  User,
  Plus,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { TabInfo, ReferenceTaskSpec, SupportedLanguage } from '../../types';

// Common in-DOM Modal backdrop and container
const ModalOverlay: React.FC<{
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}> = ({ title, subtitle, icon, onClose, children, footer, maxWidth = '520px' }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(1px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 120ms ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden',
          animation: 'fadeInUp 150ms ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {icon}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{title}</div>
              {subtitle && <div style={{ fontSize: '11.5px', color: '#64748b' }}>{subtitle}</div>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            title="Close dialog (Escape)"
            aria-label="Close dialog"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '18px', overflowY: 'auto', flex: 1, fontSize: '13px', color: '#334155' }}>
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div
            style={{
              padding: '12px 18px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// 1. Problem Information Modal
export const ProblemInfoModal: React.FC<{
  task: ReferenceTaskSpec;
  onClose: () => void;
}> = ({ task, onClose }) => {
  return (
    <ModalOverlay
      title="Problem Specifications & Scoring"
      subtitle={`Question ${task.questionNumber}: ${task.title}`}
      icon={<AlertCircle size={20} color="#0284c7" />}
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '6px 14px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Got it
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            backgroundColor: '#f8fafc',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>MAX SCORE</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>100 Pts</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>TIME LIMIT</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              {task.moreInfo?.timeLimit ?? '1.0 sec'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>MEMORY LIMIT</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              {task.moreInfo?.memoryLimit ?? '1.5 GB'}
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, fontSize: '12.5px', marginBottom: '6px', color: '#0f172a' }}>
            Grading Breakdown
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>Sample Test Cases: 30% of total score (Visible assertions)</li>
            <li>Hidden Edge Cases: 50% of total score (Boundary constraints & scaling)</li>
            <li>Code Quality & Standards: 20% of total score</li>
          </ul>
        </div>

        <div>
          <div style={{ fontWeight: 600, fontSize: '12.5px', marginBottom: '6px', color: '#0f172a' }}>
            Syllabus Topics & Tags
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['Binary Trees', 'Level Order Traversal', 'Breadth First Search', 'Queue ADT', 'Time: O(N)', 'Space: O(N)'].map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

// 2. Project Files Explorer Modal
export const WorkspaceFilesModal: React.FC<{
  tabs: TabInfo[];
  activeFilePath: string;
  onSelectFile: (path: string) => void;
  onCreateFile: () => void;
  onClose: () => void;
}> = ({ tabs, activeFilePath, onSelectFile, onCreateFile, onClose }) => {
  return (
    <ModalOverlay
      title="Project Workspace Files"
      subtitle="View, open, and manage files in the active session"
      icon={<Folder size={20} color="#0284c7" />}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              onClose();
              onCreateFile();
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              color: '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Plus size={14} />
            <span>New File</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px 14px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
          {tabs.length} file{tabs.length > 1 ? 's' : ''} in workspace buffer:
        </div>
        {tabs.map((tab) => {
          const isActive = tab.path === activeFilePath;
          return (
            <div
              key={tab.path}
              onClick={() => {
                onSelectFile(tab.path);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '6px',
                border: isActive ? '1px solid #0284c7' : '1px solid #e2e8f0',
                backgroundColor: isActive ? '#f0f9ff' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCode2 size={18} color={isActive ? '#0284c7' : '#64748b'} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{tab.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{tab.path}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {tab.isModified && (
                  <span
                    style={{
                      fontSize: '11px',
                      backgroundColor: '#fef3c7',
                      color: '#d97706',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    Modified
                  </span>
                )}
                {isActive && (
                  <span
                    style={{
                      fontSize: '11px',
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    Active
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ModalOverlay>
  );
};

// 3. File Revisions / History Modal
export const RevisionHistoryModal: React.FC<{
  fileName: string;
  onClose: () => void;
  onRestoreStarter: () => void;
}> = ({ fileName, onClose, onRestoreStarter }) => {
  return (
    <ModalOverlay
      title="Revision & Snapshot History"
      subtitle={`Local buffer history for ${fileName}`}
      icon={<GitBranch size={20} color="#0284c7" />}
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '6px 14px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                marginTop: '4px',
              }}
            />
            <div style={{ width: '2px', flex: 1, backgroundColor: '#e2e8f0', margin: '4px 0' }} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Current Working Draft</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Active in Monaco Editor buffer</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                marginTop: '4px',
              }}
            />
            <div style={{ width: '2px', flex: 1, backgroundColor: '#e2e8f0', margin: '4px 0' }} />
          </div>
          <div style={{ paddingBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Local Storage Snapshot</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Automatically synchronized locally</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#94a3b8',
                marginTop: '4px',
              }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Starter Code Template</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>Original assessment skeleton</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onRestoreStarter();
                  onClose();
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  color: '#0f172a',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Revert to this
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

// 4. Reset Workspace Confirmation Modal
export const ResetWorkspaceModal: React.FC<{
  currentLanguage: SupportedLanguage;
  onConfirm: () => void;
  onClose: () => void;
}> = ({ currentLanguage, onConfirm, onClose }) => {
  return (
    <ModalOverlay
      title="Reset Workspace"
      subtitle={`Revert all files for ${currentLanguage.toUpperCase()}`}
      icon={<RotateCcw size={20} color="#dc2626" />}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px 14px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: '6px 14px',
              backgroundColor: '#dc2626',
              border: '1px solid #dc2626',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Reset Workspace
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0, lineHeight: 1.5 }}>
          Are you sure you want to revert <strong>all files in {currentLanguage.toUpperCase()}</strong> to their default starter templates?
        </p>
        <p style={{ margin: 0, color: '#dc2626', fontWeight: 500, fontSize: '12px' }}>
          This will permanently discard all unsaved edits made during this session.
        </p>
      </div>
    </ModalOverlay>
  );
};

// 5. Proctor Chat Modal
export const ProctorChatModal: React.FC<{
  onClose: () => void;
  onSendNotice: (msg: string) => void;
}> = ({ onClose, onSendNotice }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'proctor' | 'system' | 'student'; text: string; time: string }>>([
    { sender: 'system', text: 'Safe Exam Browser session verified. Webcam stream active.', time: '09:30 AM' },
    { sender: 'proctor', text: 'Welcome to your exam. Ensure you stay focused within your screen viewport.', time: '09:31 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'student', text: inputText.trim(), time: now }]);
    onSendNotice(inputText.trim());
    setInputText('');

    // Automated proctor acknowledgment
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'proctor',
          text: 'Notice received by exam invigilator desk. Please continue working on your solutions.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <ModalOverlay
      title="Exam Invigilator & Proctor Desk"
      subtitle="Authorized SEB Proctor Communication Channel"
      icon={<MessageSquare size={20} color="#0284c7" />}
      onClose={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '340px' }}>
        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px',
            backgroundColor: '#f8fafc',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          {messages.map((m, idx) => {
            const isStudent = m.sender === 'student';
            const isSystem = m.sender === 'system';
            return (
              <div
                key={idx}
                style={{
                  alignSelf: isStudent ? 'flex-end' : isSystem ? 'center' : 'flex-start',
                  maxWidth: isSystem ? '90%' : '80%',
                  backgroundColor: isStudent ? '#0284c7' : isSystem ? '#e2e8f0' : '#ffffff',
                  color: isStudent ? '#ffffff' : '#0f172a',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  border: isSystem ? 'none' : '1px solid #cbd5e1',
                }}
              >
                <div>{m.text}</div>
                <div
                  style={{
                    fontSize: '10px',
                    color: isStudent ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
                    textAlign: 'right',
                    marginTop: '2px',
                  }}
                >
                  {m.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Question Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
          {['Network Check OK', 'Question Typo Check', 'Need Rough Sheet'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setInputText(preset);
              }}
              style={{
                padding: '3px 8px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type your query to the proctor..."
            style={{
              flex: 1,
              height: '32px',
              padding: '0 10px',
              fontSize: '12px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            style={{
              padding: '0 12px',
              height: '32px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
            }}
          >
            <Send size={13} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

// 6. Candidate Profile Modal
export const CandidateProfileModal: React.FC<{
  candidateName: string;
  username: string;
  ipAddress: string;
  onClose: () => void;
}> = ({ candidateName, username, ipAddress, onClose }) => {
  return (
    <ModalOverlay
      title="Candidate Examination Profile"
      subtitle="Verified Identity for Assessment Session"
      icon={<User size={20} color="#0284c7" />}
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '6px 14px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            BP
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{candidateName}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{username}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>STUDENT ROLL / UID</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>25BCS12751</div>
          </div>
          <div style={{ padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>EXAM CENTER</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Chandigarh Univ</div>
          </div>
          <div style={{ padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>ASSIGNED LAB &amp; SEAT</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Block 3 / Lab 204 (Seat 42)</div>
          </div>
          <div style={{ padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>AUTHORIZED CLIENT IP</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{ipAddress}</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '4px',
            color: '#15803d',
            fontSize: '12px',
          }}
        >
          <ShieldCheck size={16} />
          <span>Safe Exam Browser 3.7.1 integrity validated. Network locked.</span>
        </div>
      </div>
    </ModalOverlay>
  );
};
