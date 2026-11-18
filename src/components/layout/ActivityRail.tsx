import React, { useState } from 'react';
import {
  AlertCircle,
  Folder,
  CheckSquare,
  Sliders,
  Lightbulb,
  RotateCcw,
  Globe,
  Terminal,
  MessageSquare,
} from 'lucide-react';
import {
  ProblemInfoModal,
  WorkspaceFilesModal,
  RevisionHistoryModal,
  ResetWorkspaceModal,
  ProctorChatModal,
  CandidateProfileModal,
} from '../modals/ActivityRailModals';
import { TabInfo, ReferenceTaskSpec, SupportedLanguage } from '../../types';

interface ActivityRailProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onResetWorkspace?: () => void;
  task?: ReferenceTaskSpec;
  tabs?: TabInfo[];
  activeFilePath?: string;
  currentLanguage?: SupportedLanguage;
  candidateName?: string;
  username?: string;
  ipAddress?: string;
  onSelectFile?: (path: string) => void;
  onCreateFile?: () => void;
  onRestoreStarter?: () => void;
  onSendNotice?: (msg: string) => void;
}

export const ActivityRail: React.FC<ActivityRailProps> = ({
  activeTab = 'problem',
  onSelectTab,
  onResetWorkspace,
  task,
  tabs = [],
  activeFilePath = '',
  currentLanguage = 'java',
  candidateName = 'BHAVISHYA PAL',
  username = 'cuchd_cc_275 | TIWUKE',
  ipAddress = '47.247.118.30',
  onSelectFile,
  onCreateFile,
  onRestoreStarter,
  onSendNotice,
}) => {
  const [activeModal, setActiveModal] = useState<
    'none' | 'info' | 'files' | 'structure' | 'reset' | 'chat' | 'profile'
  >('none');

  const defaultTask: ReferenceTaskSpec = task ?? {
    id: 'q1-jdbc-inventory',
    questionNumber: 1,
    title: 'Product Inventory Manager using JDBC',
    subtitle: 'You are building a small Product Inventory Manager using Java and JDBC.',
    requirementsHeader: 'Create the following table:',
    requirements: ['Connect to an in-memory SQLite database.'],
    sampleInput: '9\nADD 101 Laptop 55000.00 5\nGET 101',
    sampleOutput: '101 Laptop 55000.00 5',
  };

  return (
    <>
      <aside
        role="toolbar"
        aria-label="Activity Rail"
        style={{
          width: '42px',
          minWidth: '42px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 0',
          flexShrink: 0,
          zIndex: 25,
          userSelect: 'none',
        }}
      >
        {/* Top Group of Icons (Exact Reference media_1794958805937_26296933.png & media_1794958805889_44a3110b.png) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center', width: '100%' }}>
          {/* 1. Problem Info (!) */}
          <button
            type="button"
            title="Problem Specifications & Info"
            aria-label="Problem Info"
            onClick={() => setActiveModal('info')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeModal === 'info' ? '#2563eb' : '#4b5563',
              backgroundColor: activeModal === 'info' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 150ms ease',
            }}
          >
            {activeModal === 'info' && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '4px',
                  bottom: '4px',
                  width: '3px',
                  backgroundColor: '#2563eb',
                  borderRadius: '0 2px 2px 0',
                }}
              />
            )}
            <AlertCircle size={18} />
          </button>

          {/* 2. Project Files [folder] */}
          <button
            type="button"
            title="Workspace File Explorer"
            aria-label="Project Files"
            onClick={() => setActiveModal('files')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeModal === 'files' ? '#2563eb' : '#4b5563',
              backgroundColor: activeModal === 'files' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 150ms ease',
            }}
          >
            {activeModal === 'files' && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '4px',
                  bottom: '4px',
                  width: '3px',
                  backgroundColor: '#2563eb',
                  borderRadius: '0 2px 2px 0',
                }}
              />
            )}
            <Folder size={18} />
          </button>

          {/* 3. CheckSquare [tasks/grading] */}
          <button
            type="button"
            title="Grading Criteria & Tasks"
            aria-label="Grading Tasks"
            onClick={() => onSelectTab?.('problem')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeTab === 'problem' ? '#2563eb' : '#4b5563',
              backgroundColor: activeTab === 'problem' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 150ms ease',
            }}
          >
            {activeTab === 'problem' && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '4px',
                  bottom: '4px',
                  width: '3px',
                  backgroundColor: '#2563eb',
                  borderRadius: '0 2px 2px 0',
                }}
              />
            )}
            <CheckSquare size={18} />
          </button>

          {/* 4. Sliders [settings/configurations] */}
          <button
            type="button"
            title="Environment Settings"
            aria-label="Environment Settings"
            onClick={() => setActiveModal('structure')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeModal === 'structure' ? '#2563eb' : '#4b5563',
              backgroundColor: activeModal === 'structure' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 150ms ease',
            }}
          >
            {activeModal === 'structure' && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '4px',
                  bottom: '4px',
                  width: '3px',
                  backgroundColor: '#2563eb',
                  borderRadius: '0 2px 2px 0',
                }}
              />
            )}
            <Sliders size={18} />
          </button>

          {/* 5. Lightbulb [hints/instructions] */}
          <button
            type="button"
            title="Hints & Documentation"
            aria-label="Hints & Documentation"
            onClick={() => setActiveModal('info')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4b5563',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            <Lightbulb size={18} />
          </button>

          {/* 6. RotateCcw [reset workspace] */}
          <button
            type="button"
            title="Reset Workspace"
            aria-label="Reset Workspace"
            onClick={() => setActiveModal('reset')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeModal === 'reset' ? '#dc2626' : '#4b5563',
              backgroundColor: activeModal === 'reset' ? '#fee2e2' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            <RotateCcw size={17} />
          </button>
        </div>

        {/* Bottom Group of Icons (media_1794958805889_44a3110b.png) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center', width: '100%' }}>
          {/* Globe */}
          <button
            type="button"
            title="Network & Host Connectivity"
            aria-label="Network Connectivity"
            onClick={() => setActiveModal('profile')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4b5563',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            <Globe size={17} />
          </button>

          {/* Terminal / Test Output */}
          <button
            type="button"
            title="Toggle Console & Test Runner"
            aria-label="Output Terminal"
            onClick={() => onSelectTab?.('terminal')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4b5563',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            <Terminal size={17} />
          </button>

          {/* Proctor Chat / Support */}
          <button
            type="button"
            title="Proctor Chat Support"
            aria-label="Proctor Chat"
            onClick={() => setActiveModal('chat')}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: activeModal === 'chat' ? '#2563eb' : '#4b5563',
              backgroundColor: activeModal === 'chat' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            <MessageSquare size={17} />
          </button>
        </div>
      </aside>

      {/* Render Active In-DOM Modals */}
      {activeModal === 'info' && (
        <ProblemInfoModal task={defaultTask} onClose={() => setActiveModal('none')} />
      )}

      {activeModal === 'files' && (
        <WorkspaceFilesModal
          tabs={tabs}
          activeFilePath={activeFilePath}
          onSelectFile={(p) => onSelectFile?.(p)}
          onCreateFile={() => onCreateFile?.()}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'structure' && (
        <RevisionHistoryModal
          fileName={tabs.find((t) => t.path === activeFilePath)?.title ?? 'Main.java'}
          onClose={() => setActiveModal('none')}
          onRestoreStarter={() => onRestoreStarter?.()}
        />
      )}

      {activeModal === 'reset' && (
        <ResetWorkspaceModal
          currentLanguage={currentLanguage}
          onConfirm={() => onResetWorkspace?.()}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'chat' && (
        <ProctorChatModal
          onClose={() => setActiveModal('none')}
          onSendNotice={(msg) => onSendNotice?.(msg)}
        />
      )}

      {activeModal === 'profile' && (
        <CandidateProfileModal
          candidateName={candidateName}
          username={username}
          ipAddress={ipAddress}
          onClose={() => setActiveModal('none')}
        />
      )}
    </>
  );
};
