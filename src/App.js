import React, { useState, useEffect } from 'react';
import FloatingFeedbackBar from './component/FloatingFeedbackBar';
import CommentPopup from './component/CommentPopup';
import ScreenCaptureAnnotation from './component/ScreenCaptureAnnotation';
import DesignModeOnboarding from './component/DesignModeOnboarding';
import SideBarComment from './component/SideBarComment';
import PathSelector from './component/PathSelector/PathSelector';
import './App.css';
import './Render.css';

/**
 * Main Feedback Application Component
 */
const App = ({ config, autoActivate = false, focusFeedbackId = null }) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState(null); // 'design', 'screenshot', 'comment'
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Load existing comments for this page
    loadComments();
  }, []);

  // Auto-activate widget if ?feedback=true in URL
  useEffect(() => {
    if (autoActivate) {
      // Open sidebar to show comments
      setShowSidebar(true);
      
      // If there's a specific feedback ID, scroll to it after a short delay
      if (focusFeedbackId) {
        setTimeout(() => {
          scrollToFeedback(focusFeedbackId);
        }, 500);
      }
    }
  }, [autoActivate, focusFeedbackId]);

  const loadComments = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/comments?projectId=${config.projectId}&url=${encodeURIComponent(window.location.href)}`
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const handleActivate = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
    setMode(null);
    setSelectedElement(null);
    setScreenshot(null);
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    
    if (selectedMode === 'design' && !hasSeenOnboarding()) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    markOnboardingSeen();
  };

  const hasSeenOnboarding = () => {
    return localStorage.getItem('feedback_onboarding_seen') === 'true';
  };

  const markOnboardingSeen = () => {
    localStorage.setItem('feedback_onboarding_seen', 'true');
  };

  const handleScreenshotCapture = (screenshotData) => {
    setScreenshot(screenshotData);
    setMode('comment');
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
    setMode('comment');
  };

  const handleCommentSubmit = async (commentData) => {
    try {
      const payload = {
        projectId: config.projectId,
        url: window.location.href,
        comment: commentData.text,
        screenshot: screenshot,
        element: selectedElement,
        metadata: {
          userAgent: navigator.userAgent,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          timestamp: new Date().toISOString()
        },
        ...commentData
      };

      const response = await fetch(`${config.apiUrl}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
const scrollToFeedback = (feedbackId) => {
    // Find the feedback element by ID
    const element = document.querySelector(`[data-feedback-id="${feedbackId}"]`);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Highlight the feedback item
      element.classList.add('feedback-highlight');
      setTimeout(() => {
        element.classList.remove('feedback-highlight');
      }, 3000);
    } else {
      console.warn(`Feedback with ID ${feedbackId} not found on this page`);
    }
  };

  
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comment]);
        handleClose();
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="feedback-widget-app">
      {/* Floating Feedback Button */}
      {!isActive && (
        <FloatingFeedbackBar
          position={config.position}
          onActivate={handleActivate}
          commentCount={comments.length}
          onToggleSidebar={handleToggleSidebar}
        />
      )}

      {/* Sidebar with Comments List */}
      {showSidebar && (
        <SideBarComment
          comments={comments}
          onClose={() => setShowSidebar(false)}
          onCommentClick={(comment) => {
            // Handle comment click - scroll to element, show screenshot, etc.
            console.log('Comment clicked:', comment);
          }}
        />
      )}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <DesignModeOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      )}

      {/* Design Mode - Element Selection */}
      {isActive && mode === 'design' && (
        <PathSelector
          onElementSelect={handleElementSelect}
          onCancel={handleClose}
        />
      )}

      {/* Screenshot Capture & Annotation Mode */}
      {isActive && mode === 'screenshot' && config.allowScreenshot && (
        <ScreenCaptureAnnotation
          onCapture={handleScreenshotCapture}
          onCancel={handleClose}
          allowAnnotation={config.allowAnnotation}
        />
      )}

      {/* Comment Popup */}
      {isActive && mode === 'comment' && (
        <CommentPopup
          onSubmit={handleCommentSubmit}
          onCancel={handleClose}
          screenshot={screenshot}
          element={selectedElement}
          allowFileUpload={config.allowFileUpload}
          maxFileSize={config.maxFileSize}
        />
      )}

      {/* Mode Selection Popup (when first activated) */}
      {isActive && !mode && (
        <div className="feedback-mode-selector">
          <div className="feedback-mode-overlay" onClick={handleClose}></div>
          <div className="feedback-mode-popup">
            <div className="feedback-mode-header">
              <h3>Choose Feedback Type</h3>
              <button className="feedback-close-btn" onClick={handleClose}>
                ×
              </button>
            </div>
            <div className="feedback-mode-options">
              {config.allowScreenshot && (
                <button
                  className="feedback-mode-option"
                  onClick={() => handleModeSelect('screenshot')}
                >
                  <span className="feedback-mode-icon">📸</span>
                  <span className="feedback-mode-title">Screenshot</span>
                  <span className="feedback-mode-description">
                    Capture and annotate
                  </span>
                </button>
              )}
              <button
                className="feedback-mode-option"
                onClick={() => handleModeSelect('design')}
              >
                <span className="feedback-mode-icon">🎨</span>
                <span className="feedback-mode-title">Design Feedback</span>
                <span className="feedback-mode-description">
                  Select page elements
                </span>
              </button>
              <button
                className="feedback-mode-option"
                onClick={() => handleModeSelect('comment')}
              >
                <span className="feedback-mode-icon">💬</span>
                <span className="feedback-mode-title">General Comment</span>
                <span className="feedback-mode-description">
                  Add a comment
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
