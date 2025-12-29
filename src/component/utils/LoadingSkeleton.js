import React from 'react';
import './component/utils/LoadingSkeleton.css';

/**
 * Loading Skeleton Component
 * Shows loading state with skeleton screens
 */
const LoadingSkeleton = ({ type = 'comment', count = 3 }) => {
  const renderCommentSkeleton = () => (
    <div className="skeleton-comment">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton-header">
          <div className="skeleton-name"></div>
          <div className="skeleton-time"></div>
        </div>
        <div className="skeleton-text-container">
          <div className="skeleton-text" style={{ width: '100%' }}></div>
          <div className="skeleton-text" style={{ width: '95%' }}></div>
          <div className="skeleton-text" style={{ width: '80%' }}></div>
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-action-btn"></div>
          <div className="skeleton-action-btn"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="skeleton-list-item">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-list-content">
        <div className="skeleton-list-title"></div>
        <div className="skeleton-list-description"></div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'comment':
        return renderCommentSkeleton();
      case 'list':
        return renderListSkeleton();
      default:
        return renderCommentSkeleton();
    }
  };

  return (
    <div className="loading-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
