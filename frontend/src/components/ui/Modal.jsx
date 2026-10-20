import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  className = ''
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]'
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex="-1"
        className={`w-full ${sizeClasses[size] || sizeClasses.md} bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden focus:outline-none animate-in zoom-in-95 duration-200 ${className}`}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              {title && (
                <h2 id="modal-title" className="text-base font-bold text-black dark:text-white tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {description}
                </p>
              )}
            </div>

            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="p-5 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
