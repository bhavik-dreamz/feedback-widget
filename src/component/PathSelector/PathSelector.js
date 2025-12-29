import React, { useState, useEffect } from 'react';
import './PathSelector.css';

/**
 * Path Selector Component
 * Allows users to select page elements
 */
const PathSelector = ({ onElementSelect, onCancel }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const handleMouseOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (e.target.closest('.feedback-widget-app')) {
        return;
      }

      setHoveredElement(e.target);
      e.target.style.outline = '2px solid #667eea';
      e.target.style.outlineOffset = '2px';
    };

    const handleMouseOut = (e) => {
      e.target.style.outline = '';
      e.target.style.outlineOffset = '';
    };

    const handleClick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.target.closest('.feedback-widget-app')) {
        return;
      }

      const element = e.target;
      setSelectedElement(element);

      // Get element info
      const elementInfo = {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        textContent: element.textContent?.substring(0, 100),
        xpath: getXPath(element),
        boundingRect: element.getBoundingClientRect()
      };

      onElementSelect(elementInfo);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [onElementSelect]);

  const getXPath = (element) => {
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

  return (
    <div className="path-selector-overlay">
      <div className="path-selector-instructions">
        <p>Click on any element to select it</p>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PathSelector;
