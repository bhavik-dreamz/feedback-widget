import React, { useState, useRef } from 'react';
import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';
import './CommentPopup.css';

/**
 * Comment Popup Component
 * Form for submitting feedback comments
 */
const CommentPopup = ({ onSubmit, onCancel, screenshot, element, allowFileUpload, maxFileSize }) => {
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        text: comment,
        email: email || undefined,
        name: name || 'Anonymous',
        files: files,
        screenshot: screenshot,
        element: element
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });
    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="comment-popup-overlay">
      <div className="comment-popup">
        <div className="comment-popup-header">
          <h3>Submit Feedback</h3>
          <button className="comment-popup-close" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="comment-popup-form">
          {screenshot && (
            <div className="comment-popup-screenshot">
              <img src={screenshot} alt="Screenshot" />
              <span className="screenshot-label">Screenshot attached</span>
            </div>
          )}

          <div className="comment-popup-field">
            <label htmlFor="comment-name">Name (optional)</label>
            <input
              id="comment-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="comment-popup-field">
            <label htmlFor="comment-email">Email (optional)</label>
            <input
              id="comment-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="comment-popup-field">
            <label htmlFor="comment-text">Comment *</label>
            <textarea
              id="comment-text"
              placeholder="Describe your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              required
            />
          </div>

          {allowFileUpload && (
            <div className="comment-popup-field">
              <label>Attachments</label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="comment-popup-upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                📎 Attach Files
              </button>
              
              {files.length > 0 && (
                <div className="comment-popup-files">
                  {files.map((file, index) => (
                    <div key={index} className="comment-popup-file">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="comment-popup-file-remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="comment-popup-actions">
            <button
              type="button"
              className="comment-popup-btn comment-popup-btn-cancel"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="comment-popup-btn comment-popup-btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentPopup;
