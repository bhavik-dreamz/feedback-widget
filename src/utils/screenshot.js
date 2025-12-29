import html2canvas from 'html2canvas';

/**
 * Screenshot Utility Functions
 * Handles screenshot capture functionality
 */

/**
 * Capture full page screenshot
 */
export const captureFullPage = async (options = {}) => {
  try {
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      ...options,
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
    throw error;
  }
};

/**
 * Capture specific element screenshot
 */
export const captureElement = async (element, options = {}) => {
  try {
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      ...options,
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to capture element:', error);
    throw error;
  }
};

/**
 * Capture viewport screenshot
 */
export const captureViewport = async (options = {}) => {
  try {
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      width: window.innerWidth,
      height: window.innerHeight,
      x: window.scrollX,
      y: window.scrollY,
      ...options,
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to capture viewport:', error);
    throw error;
  }
};

/**
 * Download screenshot
 */
export const downloadScreenshot = (dataUrl, filename = 'screenshot.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

/**
 * Convert data URL to blob
 */
export const dataURLtoBlob = (dataUrl) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Convert data URL to file
 */
export const dataURLtoFile = (dataUrl, filename) => {
  const blob = dataURLtoBlob(dataUrl);
  return new File([blob], filename, { type: blob.type });
};
