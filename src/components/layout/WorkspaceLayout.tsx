import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useResizable } from '../../hooks/useResizable';

interface WorkspaceLayoutProps {
  leftPaneRatio: number;
  onLeftPaneRatioChange?: (ratio: number) => void;
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  leftPaneRatio,
  onLeftPaneRatioChange,
  leftPane,
  rightPane,
}) => {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const prevRatioRef = useRef<number>(leftPaneRatio > 10 ? leftPaneRatio : 50);

  const {
    size: splitRatio,
    isDragging,
    containerRef,
    handlePointerDown,
    handleDoubleClick,
    handleKeyDown,
  } = useResizable({
    direction: 'horizontal',
    initialSize: leftPaneRatio,
    minSize: 25,
    maxSize: 75,
    defaultSize: 50,
    isPercentage: true,
    onSizeChange: (newRatio) => {
      if (!isLeftCollapsed) {
        prevRatioRef.current = newRatio;
        onLeftPaneRatioChange?.(newRatio);
      }
    },
  });

  const toggleCollapseLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLeftCollapsed) {
      setIsLeftCollapsed(false);
      onLeftPaneRatioChange?.(prevRatioRef.current);
    } else {
      prevRatioRef.current = splitRatio;
      setIsLeftCollapsed(true);
      onLeftPaneRatioChange?.(0);
    }
  };

  const effectiveLeftRatio = isLeftCollapsed ? 0 : splitRatio;

  return (
    <main
      ref={containerRef}
      className="workspace-panels"
      role="main"
      aria-label="Code and Problem Workspace"
      style={{
        display: 'flex',
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left Pane (Task / Problem Statement) */}
      {!isLeftCollapsed && (
        <section
          className="pane-left"
          style={{
            width: `${effectiveLeftRatio}%`,
            minWidth: '320px',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          aria-label="Problem Description Pane"
        >
          {leftPane}
        </section>
      )}

      {/* Vertical Splitter Handle with Expand/Collapse Control */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(effectiveLeftRatio)}
        aria-valuemin={isLeftCollapsed ? 0 : 25}
        aria-valuemax={75}
        aria-label="Resize problem and editor panels"
        tabIndex={0}
        title={
          isLeftCollapsed
            ? 'Problem pane is collapsed'
            : 'Drag to resize panes (Double-click to reset to 42%)'
        }
        onPointerDown={isLeftCollapsed ? undefined : handlePointerDown}
        onDoubleClick={isLeftCollapsed ? undefined : handleDoubleClick}
        onKeyDown={isLeftCollapsed ? undefined : handleKeyDown}
        className={`splitter-vertical ${isDragging ? 'active' : ''}`}
        style={{
          width: '5px',
          backgroundColor: '#e2e8f0',
          cursor: isLeftCollapsed ? 'default' : 'col-resize',
          position: 'relative',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          transition: 'background-color 150ms ease',
        }}
      >
        {/* Subtle Collapse/Expand Toggle Button */}
        <button
          type="button"
          onClick={toggleCollapseLeft}
          title={isLeftCollapsed ? 'Expand Problem Description' : 'Collapse Problem Description'}
          aria-label={isLeftCollapsed ? 'Expand Problem Description' : 'Collapse Problem Description'}
          style={{
            position: 'absolute',
            top: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '32px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            zIndex: 30,
            padding: 0,
            color: '#64748b',
          }}
        >
          {isLeftCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Right Pane (Coding Workspace & Output) */}
      <section
        className="pane-right"
        style={{
          width: isLeftCollapsed ? '100%' : `${100 - effectiveLeftRatio}%`,
          minWidth: isLeftCollapsed ? '100%' : '380px',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        aria-label="Code Editor and Terminal Pane"
      >
        {rightPane}
      </section>
    </main>
  );
};
