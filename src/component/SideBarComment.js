import React from 'react';
import './SideBarComment.css';

/**
 * Sidebar Comment List Component
 * Displays all feedback comments for the current page
 */
const SideBarComment = ({ comments, onClose, onCommentClick }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="sidebar-comment">
      <div className="sidebar-comment-header">
        <h3>Feedback Comments ({comments.length})</h3>
        <button className="sidebar-comment-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="sidebar-comment-list">
        {comments.length === 0 ? (
          <div className="sidebar-comment-empty">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>No feedback yet</p>
            <span>Comments will appear here</span>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={comment.id || index}
              className="sidebar-comment-item"
              data-feedback-id={comment.id || comment.feedbackId}
              onClick={() => onCommentClick(comment)}
            >
              <div className="sidebar-comment-item-header">
                <div className="sidebar-comment-avatar">
                  {comment.name ? comment.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="sidebar-comment-meta">
                  <span className="sidebar-comment-name">
                    {comment.name || 'Anonymous'}
                  </span>
                  <span className="sidebar-comment-time">
                    {formatDate(comment.metadata?.timestamp || Date.now())}
                  </span>
                </div>
              </div>

              <div className="sidebar-comment-text">
                {comment.comment}
              </div>

              {comment.screenshot && (
                <div className="sidebar-comment-screenshot">
                  <img src={comment.screenshot} alt="Screenshot" />
                </div>
              )}

              {comment.element && (
                <div className="sidebar-comment-element">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  <span>Element selected</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SideBarComment;
