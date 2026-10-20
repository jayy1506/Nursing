import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  size = 'md',
  className = ''
}) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    full: 'max-w-full'
  };

  const sideAnimations = {
    right: 'right-0 top-0 bottom-0 animate-in slide-in-from-right duration-200',
    left: 'left-0 top-0 bottom-0 animate-in slide-in-from-left duration-200',
    bottom: 'bottom-0 left-0 right-0 max-h-[85vh] animate-in slide-in-from-bottom duration-200 rounded-t-2xl'
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        tabIndex="-1"
        className={`fixed ${sideAnimations[side] || sideAnimations.right} w-full ${
          side !== 'bottom' ? sizeClasses[size] || sizeClasses.md : ''
        } bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col focus:outline-none ${className}`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <h2 className="text-base font-bold text-black dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus-visible:ring-2 focus-visible:ring-green-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
