import React from 'react';
import './FilePreviewModal.css';

/**
 * File Preview Modal Component
 * Displays file previews in a modal
 */
const FilePreviewModal = ({ file, onClose }) => {
  const isImage = file.type?.startsWith('image/');
  const isPDF = file.type === 'application/pdf';
  const isVideo = file.type?.startsWith('video/');

  const renderPreview = () => {
    if (isImage) {
      return <img src={URL.createObjectURL(file)} alt={file.name} />;
    }

    if (isPDF) {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title={file.name}
          width="100%"
          height="100%"
        />
      );
    }

    if (isVideo) {
      return (
        <video controls width="100%">
          <source src={URL.createObjectURL(file)} type={file.type} />
        </video>
      );
    }

    return (
      <div className="file-preview-no-preview">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
        <p>No preview available</p>
        <span>{file.name}</span>
      </div>
    );
  };

  return (
    <div className="file-preview-modal-overlay" onClick={onClose}>
      <div className="file-preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="file-preview-header">
          <h3>{file.name}</h3>
          <button className="file-preview-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="file-preview-content">{renderPreview()}</div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
