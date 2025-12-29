import React from 'react';
import './EmptyState.css';

/**
 * Empty State Component
 * Shows when there's no data
 */
const EmptyState = ({ title, description, icon }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon || (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>
      <h3 className="empty-state-title">{title || 'No data'}</h3>
      <p className="empty-state-description">
        {description || 'There is nothing to display'}
      </p>
    </div>
  );
};

export default EmptyState;
