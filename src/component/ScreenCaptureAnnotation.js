import React, { useState, useEffect, useRef } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import html2canvas from 'html2canvas';
import './ScreenCaptureAnnotation.css';

/**
 * Screen Capture and Annotation Component
 * Captures screenshot and allows drawing annotations
 */
const ScreenCaptureAnnotation = ({ onCapture, onCancel, allowAnnotation }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    captureScreen();
  }, []);

  const captureScreen = async () => {
    try {
      setLoading(true);
      
      // Capture the entire page
      const canvas = await html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      });

      const screenshotData = canvas.toDataURL('image/png');
      setScreenshot(screenshotData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      setLoading(false);
      onCancel();
    }
  };

  const handleDone = async () => {
    if (!allowAnnotation || !excalidrawAPI) {
      onCapture(screenshot);
      return;
    }

    try {
      // Export the Excalidraw canvas with annotations
      const elements = excalidrawAPI.getSceneElements();
      
      if (elements.length > 0) {
        // Get the annotated screenshot
        const blob = await excalidrawAPI.exportToBlob({
          mimeType: 'image/png',
          elements: elements
        });
        
        const reader = new FileReader();
        reader.onloadend = () => {
          onCapture(reader.result);
        };
        reader.readAsDataURL(blob);
      } else {
        // No annotations, use original screenshot
        onCapture(screenshot);
      }
    } catch (error) {
      console.error('Failed to export annotations:', error);
      onCapture(screenshot);
    }
  };

  if (loading) {
    return (
      <div className="screen-capture-annotation">
        <div className="excalidraw-loading">
          Capturing screenshot...
        </div>
      </div>
    );
  }

  return (
    <div className="screen-capture-annotation">
      <div className="excalidraw-wrapper">
        <div className="excalidraw-controls">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="done-btn" onClick={handleDone}>
            Done
          </button>
        </div>

        {allowAnnotation && screenshot ? (
          <div className="excalidraw-container">
            <Excalidraw
              excalidrawAPI={(api) => setExcalidrawAPI(api)}
              initialData={{
                appState: {
                  viewBackgroundColor: '#000000',
                  currentItemBackgroundColor: 'transparent'
                },
                elements: [],
                files: {
                  screenshot: {
                    mimeType: 'image/png',
                    id: 'screenshot',
                    dataURL: screenshot,
                    created: Date.now()
                  }
                }
              }}
            />
          </div>
        ) : (
          <div className="screenshot-preview">
            <img src={screenshot} alt="Screenshot" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenCaptureAnnotation;
