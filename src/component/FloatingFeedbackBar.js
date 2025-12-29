import React from 'react';
import './FloatingFeedbackBar.css';

/**
 * Floating Feedback Bar Component
 * The main entry button that appears on the page
 */
const FloatingFeedbackBar = ({ position, onActivate, commentCount, onToggleSidebar }) => {
  const getPositionStyles = () => {
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' }
    };
    return positions[position] || positions['bottom-right'];
  };

  return (
    <div className="floating-feedback-bar" style={getPositionStyles()}>
      <div className="feedback-bar-container">
        {commentCount > 0 && (
          <button
            className="feedback-bar-comments-btn"
            onClick={onToggleSidebar}
            title="View feedback comments"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="feedback-bar-badge">{commentCount}</span>
          </button>
        )}
        
        <button
          className="feedback-bar-main-btn"
          onClick={onActivate}
          title="Give Feedback"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="feedback-bar-text">Feedback</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingFeedbackBar;
