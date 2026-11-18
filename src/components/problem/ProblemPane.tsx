import React, { useState, useRef, useCallback } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ArrowUp,
} from 'lucide-react';
import { ExamSection, ReferenceTaskSpec, VivaStatementSpec } from '../../types';
import { REFERENCE_EXAM_SESSION } from '../../utils/sampleData';

interface ProblemPaneProps {
  currentSection: ExamSection;
  task: ReferenceTaskSpec;
  viva: VivaStatementSpec;
}

export const ProblemPane: React.FC<ProblemPaneProps> = ({
  currentSection,
  task,
  viva,
}) => {
  const [activeProblemTab, setActiveProblemTab] = useState<'statement' | 'submissions'>('statement');
  const [vivaQuery, setVivaQuery] = useState<string>('');
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const watermarkText = `${REFERENCE_EXAM_SESSION.candidateId}@cuchd.in ${REFERENCE_EXAM_SESSION.username.split(' ')[0]}`;

  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      setShowScrollTop(contentRef.current.scrollTop > 120);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // State 4: Viva Mode (Screenshot 00.44.44.jpeg)
  if (currentSection === 'viva') {
    return (
      <div
        role="region"
        aria-label="Viva Examination"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          minWidth: 0,
          backgroundColor: '#ffffff',
          color: '#1f2937',
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Viva Statement Tab */}
        <div
          style={{
            height: '38px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: '16px',
            backgroundColor: '#ffffff',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0284c7',
              borderBottom: '2px solid #0284c7',
              padding: '0 4px',
            }}
          >
            {viva.title}
          </div>
        </div>

        {/* Viva Statement Body */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#1e293b',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            userSelect: 'text',
          }}
        >
          <p style={{ margin: 0 }}>{viva.paragraphs[0]}</p>

          <ul style={{ listStyle: 'none', paddingLeft: '4px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {viva.bulletPoints.map((bp, i) => (
              <li key={i} style={{ fontFamily: bp.includes('(') ? 'monospace' : 'inherit' }}>
                {bp}
              </li>
            ))}
          </ul>

          <p style={{ margin: 0 }}>{viva.paragraphs[1]}</p>
          <p style={{ margin: 0, fontWeight: 600 }}>{viva.paragraphs[2]}</p>
          <p style={{ margin: 0 }}>{viva.paragraphs[3]}</p>
          <p style={{ margin: 0 }}>{viva.paragraphs[4]}</p>
          <p style={{ margin: 0, fontStyle: 'italic' }}>{viva.paragraphs[5]}</p>

          <div style={{ marginTop: '8px', fontWeight: 700 }}>{viva.paragraphs[6]}</div>
          <ul style={{ listStyle: 'none', paddingLeft: '4px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {viva.questionsToAnswer.map((qa, i) => (
              <li key={i}>{qa}</li>
            ))}
          </ul>
        </div>

        {/* Bottom Search Bar (Exact Reference 00.44.44.jpeg) */}
        <div
          style={{
            height: '38px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '8px',
            fontSize: '12px',
            color: '#475569',
            flexShrink: 0,
          }}
        >
          <input
            type="text"
            value={vivaQuery}
            onChange={(e) => setVivaQuery(e.target.value)}
            placeholder="Search statement..."
            style={{
              height: '24px',
              padding: '2px 8px',
              border: '1px solid #cbd5e1',
              borderRadius: '2px',
              fontSize: '12px',
              outline: 'none',
              width: '180px',
              backgroundColor: '#ffffff',
            }}
          />

          <button
            type="button"
            title="Previous match"
            aria-label="Previous match"
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <ChevronUp size={14} />
          </button>

          <button
            type="button"
            title="Next match"
            aria-label="Next match"
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <ChevronDown size={14} />
          </button>

          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginLeft: '6px' }}>
            <input
              type="checkbox"
              checked={isCaseSensitive}
              onChange={(e) => setIsCaseSensitive(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>Case-sensitive search</span>
          </label>
        </div>
      </div>
    );
  }



  // Coding Section: Statement | Submissions Tab Pane (Exact Reference media_1794949151206_b2eac9f2.jpg)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        minWidth: 0,
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Statement | Submissions Tab Strip (Exact Reference media_1794949151206_b2eac9f2.jpg & 01.54.21.jpeg) */}
      <div
        role="tablist"
        aria-label="Problem Section Tabs"
        style={{
          height: '44px',
          minHeight: '44px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '24px',
          backgroundColor: '#ffffff',
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeProblemTab === 'statement'}
          onClick={() => setActiveProblemTab('statement')}
          style={{
            height: '100%',
            border: 'none',
            background: 'transparent',
            fontSize: '14px',
            fontWeight: activeProblemTab === 'statement' ? 600 : 400,
            color: activeProblemTab === 'statement' ? '#4079da' : '#555555',
            borderBottom: activeProblemTab === 'statement' ? '2px solid #4079da' : '2px solid transparent',
            cursor: 'pointer',
            padding: '0 4px',
            letterSpacing: '0.4px',
          }}
        >
          Statement
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeProblemTab === 'submissions'}
          onClick={() => setActiveProblemTab('submissions')}
          style={{
            height: '100%',
            border: 'none',
            background: 'transparent',
            fontSize: '14px',
            fontWeight: activeProblemTab === 'submissions' ? 600 : 400,
            color: activeProblemTab === 'submissions' ? '#4079da' : '#555555',
            borderBottom: activeProblemTab === 'submissions' ? '2px solid #4079da' : '2px solid transparent',
            cursor: 'pointer',
            padding: '0 4px',
            letterSpacing: '0.4px',
          }}
        >
          Submissions
        </button>
      </div>

      {activeProblemTab === 'submissions' ? (
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            fontSize: '13px',
            color: '#64748b',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>No submissions yet</div>
          <div>Run or submit your solution to view evaluation results and verdicts.</div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            position: 'relative',
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Watermark Security Layer (Matches Reference UID 25BCS12751 @ cuchd.in) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="exam-watermark"
                  width="280"
                  height="96"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(-26.5)"
                >
                  <text
                    x="0"
                    y="24"
                    fill="#475569"
                    fillOpacity="0.14"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    fontSize="12.5px"
                    fontWeight="500"
                    letterSpacing="0.2px"
                  >
                    {watermarkText}
                  </text>
                  <text
                    x="140"
                    y="72"
                    fill="#475569"
                    fillOpacity="0.14"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    fontSize="12.5px"
                    fontWeight="500"
                    letterSpacing="0.2px"
                  >
                    {watermarkText}
                  </text>
                  <text
                    x="-140"
                    y="72"
                    fill="#475569"
                    fillOpacity="0.14"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    fontSize="12.5px"
                    fontWeight="500"
                    letterSpacing="0.2px"
                  >
                    {watermarkText}
                  </text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#exam-watermark)" />
            </svg>
          </div>

          <div
            ref={contentRef}
            onScroll={handleScroll}
            role="region"
            aria-label="Task Description"
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 28px 64px 28px',
              userSelect: 'text',
              backgroundColor: 'transparent',
              color: '#333333',
              fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              fontSize: '14px',
              lineHeight: 1.6,
              minWidth: 0,
            }}
          >
          {/* Task Heading */}
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#111827',
              margin: '0 0 16px 0',
            }}
          >
            Product Inventory Manager using JDBC
          </h1>

          {/* Intro Description */}
          <p style={{ margin: '0 0 12px 0' }}>
            You are building a small <strong>Product Inventory Manager</strong> using Java and JDBC.
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            The application must connect to an in-memory SQLite database, store product information, retrieve individual products, and display all products.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            Each product contains:
          </p>

          <ul style={{ listStyle: 'none', paddingLeft: '4px', margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 6px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#111827' }}>id</code>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 6px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#111827' }}>name</code>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 6px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#111827' }}>price</code>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 6px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#111827' }}>quantity</code>
            </li>
          </ul>

          <div style={{ fontWeight: 600, color: '#111827', margin: '14px 0 6px 0' }}>
            Create the following table:
          </div>

          <div
            style={{
              backgroundColor: '#1e222d',
              color: '#f8fafc',
              padding: '12px 16px',
              fontFamily: "Consolas, 'Courier New', monospace",
              fontSize: '12.5px',
              borderRadius: '4px',
              margin: '8px 0 16px 0',
              lineHeight: 1.6,
              overflowX: 'auto',
            }}
          >
            <span style={{ color: '#60a5fa', fontWeight: 600 }}>CREATE TABLE</span> <span style={{ color: '#ffffff' }}>products</span> (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ffffff' }}>id</span> <span style={{ color: '#60a5fa' }}>INTEGER PRIMARY KEY</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ffffff' }}>name</span> <span style={{ color: '#60a5fa' }}>TEXT</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ffffff' }}>price</span> <span style={{ color: '#60a5fa' }}>REAL</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ffffff' }}>quantity</span> <span style={{ color: '#60a5fa' }}>INTEGER</span><br />
            );
          </div>

          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '22px 0 10px 0' }}>
            Supported Operations
          </h2>
          <p style={{ margin: '0 0 10px 0' }}>
            Process the following commands:
          </p>

          <ul style={{ listStyle: 'none', paddingLeft: '4px', margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <span><code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>ADD id name price quantity</code> - Insert a new product.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <span><code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>GET id</code> - Display the product with the given ID.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <span><code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>STOCK id quantity</code> - Update the quantity of an existing product.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <span><code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>LIST</code> - Display all products sorted by ID.</span>
            </li>
          </ul>

          <p style={{ margin: '14px 0 6px 0' }}>
            For <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>GET</code>, if the product does not exist, print:
          </p>
          <div style={{ backgroundColor: '#1e222d', color: '#f8fafc', padding: '12px 16px', fontFamily: "Consolas, 'Courier New', monospace", fontSize: '12.5px', borderRadius: '4px', margin: '8px 0 14px 0' }}>
            NOT_FOUND
          </div>

          <p style={{ margin: '14px 0 6px 0' }}>
            For <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>STOCK</code>, if the product does not exist, perform no operation.
          </p>

          <p style={{ margin: '14px 0 6px 0' }}>
            For <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>LIST</code>, if the database contains no products, print:
          </p>
          <div style={{ backgroundColor: '#1e222d', color: '#f8fafc', padding: '12px 16px', fontFamily: "Consolas, 'Courier New', monospace", fontSize: '12.5px', borderRadius: '4px', margin: '8px 0 14px 0' }}>
            EMPTY
          </div>

          <hr style={{ border: 0, borderTop: '1px solid #e5e7eb', margin: '22px 0' }} />

          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '22px 0 10px 0' }}>
            Task
          </h2>
          <p style={{ margin: '0 0 10px 0' }}>
            Complete the Java program using JDBC.
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            Your implementation must:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              1. Connect to the following SQLite database using <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>DriverManager</code>:
              <div style={{ backgroundColor: '#1e222d', color: '#f8fafc', padding: '12px 16px', fontFamily: "Consolas, 'Courier New', monospace", fontSize: '12.5px', borderRadius: '4px', margin: '8px 0 14px 0' }}>
                jdbc:sqlite::memory:
              </div>
            </div>
            <div>
              2. Use <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>Connection</code> to manage communication with the database.
            </div>
            <div>
              3. Use <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>Statement</code> to create the <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>products</code> table.
            </div>
            <div>
              4. Use <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>PreparedStatement</code> for <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>ADD</code>, <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>GET</code>, and <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>STOCK</code>.
            </div>
            <div>
              5. Use <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>ResultSet</code> to process records returned by <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>GET</code> and <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>LIST</code>.
            </div>
            <div>
              6. Use <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>executeUpdate()</code> for insert and update operations.
            </div>
            <div>
              7. Use <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>executeQuery()</code> for retrieving records.
            </div>
            <div>
              8. Handle database errors using <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>SQLException</code>.
            </div>
            <div>
              9. Properly close JDBC resources using <strong>try-with-resources</strong>.
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid #e5e7eb', margin: '22px 0' }} />

          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '22px 0 10px 0' }}>
            Input Format
          </h2>
          <ul style={{ listStyle: 'none', paddingLeft: '4px', margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <span>The first line contains an integer <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>q</code>, the number of operations.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>•</span>
              <span>Each of the next <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>q</code> lines contains one operation.</span>
            </li>
          </ul>

          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '22px 0 10px 0' }}>
            Output Format
          </h2>
          <p style={{ margin: '0 0 10px 0' }}>
            For every <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>GET</code> and <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>LIST</code> operation, print the required result.
          </p>
          <p style={{ margin: '0 0 6px 0' }}>
            Print each product in the format:
          </p>
          <div style={{ backgroundColor: '#1e222d', color: '#f8fafc', padding: '12px 16px', fontFamily: "Consolas, 'Courier New', monospace", fontSize: '12.5px', borderRadius: '4px', margin: '8px 0 14px 0' }}>
            id name price quantity
          </div>
          <p style={{ margin: '0 0 16px 0' }}>
            Print <code style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '3px', padding: '1px 5px', fontFamily: 'Consolas, Courier New, monospace', fontSize: '12px', color: '#374151' }}>price</code> with exactly two digits after the decimal point.
          </p>

          <hr style={{ border: 0, borderTop: '1px solid #e5e7eb', margin: '22px 0' }} />

          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '22px 0 10px 0' }}>
            Sample Input
          </h2>
          <div
            style={{
              backgroundColor: '#1e222d',
              color: '#f8fafc',
              padding: '12px 16px',
              fontFamily: "Consolas, 'Courier New', monospace",
              fontSize: '12.5px',
              borderRadius: '4px',
              margin: '8px 0 16px 0',
              lineHeight: 1.6,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
            {task.sampleInput}
          </div>

          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '22px 0 10px 0' }}>
            Sample Output
          </h2>
          <div
            style={{
              backgroundColor: '#1e222d',
              color: '#f8fafc',
              padding: '12px 16px',
              fontFamily: "Consolas, 'Courier New', monospace",
              fontSize: '12.5px',
              borderRadius: '4px',
              margin: '8px 0 16px 0',
              lineHeight: 1.6,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
            {task.sampleOutput}
          </div>
        </div>
      </div>
      )}

      {/* Floating Scroll to Top Circular Blue Button (Pinned to Bottom-Left per Photo 2) */}
      {showScrollTop && activeProblemTab === 'statement' && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#2a67b1',
            color: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            zIndex: 30,
          }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};
