import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Feedback Widget Entry Point
 * This is the main initialization file for the feedback widget
 */

class FeedbackWidget {
  constructor() {
    this.root = null;
    this.container = null;
    this.config = {
      apiUrl: '',
      projectId: '',
      position: 'bottom-right',
      theme: 'light',
      allowScreenshot: true,
      allowAnnotation: true,
      allowFileUpload: true,
      maxFileSize: 5242880, // 5MB
      language: 'en'
    };
  }

  /**
   * Initialize the feedback widget
   * @param {Object} options - Configuration options
   */
  init(options = {}) {
    // Parse query parameters if no options provided
    if (Object.keys(options).length === 0) {
      options = this.parseQueryParams();
    }

    // Merge options with default config
    this.config = { ...this.config, ...options };

    // Validate required config
    if (!this.config.apiUrl) {
      console.error('Feedback Widget: apiUrl is required');
      return;
    }

    if (!this.config.projectId) {
      console.error('Feedback Widget: projectId is required');
      return;
    }

    // Create container for the widget
    this.createContainer();

    // Render the React app
    this.render();

    console.log('Feedback Widget initialized', this.config);
  }

  /**
   * Parse query parameters from script tag
   */
  parseQueryParams() {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const src = currentScript.src;
    
    const url = new URL(src);
    const params = new URLSearchParams(url.search);
    
    return {
      apiUrl: params.get('api') || params.get('apiUrl') || '',
      projectId: params.get('project') || params.get('projectId') || '',
      position: params.get('position') || 'bottom-right',
      theme: params.get('theme') || 'light'
    };
  }

  /**
   * Check if URL has feedback=true parameter
   */
  checkFeedbackParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      shouldActivate: urlParams.get('feedback') === 'true',
      feedbackId: urlParams.get('feedbackID') || urlParams.get('feedbackId')
    };
  }

  /**
   * Create DOM container for the widget
   */
  createContainer() {
    if (this.container) {
      return;
    }

    this.container = document.createElement('div');
    this.container.id = 'feedback-widget-container';
    this.container.style.cssText = `
      position: fixed;
      z-index: 2147483647;
      pointer-events: none;
    `;
    
    document.body.appendChild(this.container);
  }

  /**
   * Render the React app
   */
  render() {
    if (!this.container) {
      return;
    }

    // Check for ?feedback=true parameter
    const feedbackParams = this.checkFeedbackParam();

    this.root = ReactDOM.createRoot(this.container);
    this.root.render(
      <React.StrictMode>
        <App 
          config={this.config} 
          autoActivate={feedbackParams.shouldActivate}
          focusFeedbackId={feedbackParams.feedbackId}
        />
      </React.StrictMode>
    );
  }

  /**
   * Destroy the widget
   */
  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }

    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  /**
   * Show the widget
   */
  show() {
    if (this.container) {
      this.container.style.display = 'block';
    }
  }

  /**
   * Hide the widget
   */
  hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.render();
  }
}

// Create singleton instance
const feedbackWidget = new FeedbackWidget();

// Export for UMD
export default feedbackWidget;

// Auto-initialize if query params are present
if (typeof window !== 'undefined') {
  window.Feedback = feedbackWidget;
  
  // Check if script has query parameters for auto-init
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  if (currentScript && currentScript.src && currentScript.src.includes('?')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        feedbackWidget.init();
      });
    } else {
      feedbackWidget.init();
    }
  }
}
