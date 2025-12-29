import React from 'react';
import './DesignModeOnboarding.css';

/**
 * Design Mode Onboarding Component
 * Tutorial/guide for using design feedback mode
 */
const DesignModeOnboarding = ({ onComplete, onSkip }) => {
  return (
    <div className="design-mode-onboarding-overlay">
      <div className="design-mode-onboarding-popup">
        <button className="design-mode-onboarding-close" onClick={onSkip}>
          ×
        </button>

        <div className="design-mode-onboarding-content">
          <div className="design-mode-onboarding-text">
            <div className="design-mode-onboarding-header">
              <div className="design-mode-onboarding-icon">
                🎨
              </div>
              <h2 className="design-mode-onboarding-title">
                Design Feedback Mode
              </h2>
            </div>

            <div className="design-mode-onboarding-description">
              <p className="design-mode-onboarding-paragraph">
                Design feedback mode allows you to click on any element on the page to leave targeted feedback.
              </p>

              <div className="design-mode-onboarding-features">
                <div className="design-mode-onboarding-feature">
                  <div className="design-mode-onboarding-feature-icon">
                    👆
                  </div>
                  <span>Click any element to select it</span>
                </div>

                <div className="design-mode-onboarding-feature">
                  <div className="design-mode-onboarding-feature-icon">
                    💬
                  </div>
                  <span>Add your feedback comment</span>
                </div>

                <div className="design-mode-onboarding-feature">
                  <div className="design-mode-onboarding-feature-icon">
                    📍
                  </div>
                  <span>Your feedback is linked to that specific element</span>
                </div>

                <div className="design-mode-onboarding-feature">
                  <div className="design-mode-onboarding-feature-icon">
                    📊
                  </div>
                  <span>Team can see exactly what you're referring to</span>
                </div>
              </div>

              <p className="design-mode-onboarding-disclaimer">
                <span>⚠️</span>
                The page will be in selection mode. Click any element to start.
              </p>
            </div>

            <button className="design-mode-onboarding-button" onClick={onComplete}>
              Got it, let's start
            </button>
          </div>

          <div className="design-mode-onboarding-media">
            <div className="design-mode-onboarding-gif-container">
              {/* You can add a demo GIF here */}
              <div className="design-mode-onboarding-gif-placeholder">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
                <p>Visual Demo</p>
                <span>Click elements to give feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignModeOnboarding;
