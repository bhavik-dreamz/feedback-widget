/**
 * Helper Utility Functions
 * General helper functions for the feedback widget
 */

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format date/time
 */
export const formatDateTime = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval + ' ' + unit + (interval === 1 ? '' : 's') + ' ago';
    }
  }

  return 'just now';
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Get element XPath
 */
export const getXPath = (element) => {
  if (element.id) {
    return `//*[@id="${element.id}"]`;
  }
  
  if (element === document.body) {
    return '/html/body';
  }

  let ix = 0;
  const siblings = element.parentNode?.childNodes || [];
  
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
  
  return '';
};

/**
 * Get element CSS selector
 */
export const getCSSSelector = (element) => {
  if (element.id) {
    return `#${element.id}`;
  }

  if (element.className) {
    const classes = element.className.split(' ').filter(c => c);
    if (classes.length > 0) {
      return element.tagName.toLowerCase() + '.' + classes.join('.');
    }
  }

  return element.tagName.toLowerCase();
};

/**
 * Check if element is visible
 */
export const isElementVisible = (element) => {
  return !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  );
};

/**
 * Scroll to element
 */
export const scrollToElement = (element, options = {}) => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
    ...options,
  });
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Sanitize HTML
 */
export const sanitizeHTML = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Get browser info
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
    browserVersion = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Edge') > -1) {
    browserName = 'Edge';
    browserVersion = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
  }

  return {
    name: browserName,
    version: browserVersion,
    userAgent: ua,
  };
};

/**
 * Get device info
 */
export const getDeviceInfo = () => {
  return {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    devicePixelRatio: window.devicePixelRatio || 1,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
};
