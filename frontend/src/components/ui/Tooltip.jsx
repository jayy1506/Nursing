import React, { useState } from 'react';

export const Tooltip = ({ children, content, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          role="tooltip"
          className={`absolute ${positionStyles[position] || positionStyles.top} z-50 px-2.5 py-1 text-[11px] font-medium text-white bg-black dark:bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl pointer-events-none whitespace-nowrap animate-in fade-in duration-150 ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
