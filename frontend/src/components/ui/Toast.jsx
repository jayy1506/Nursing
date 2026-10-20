import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({
  id,
  type = 'info',
  title,
  message,
  onClose,
  className = ''
}) => {
  const typeStyles = {
    success: 'border-green-500 bg-white dark:bg-black text-black dark:text-white',
    error: 'border-2 border-black dark:border-white bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white',
    warning: 'border border-neutral-400 bg-black text-white dark:bg-white dark:text-black',
    info: 'border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-white'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-700 dark:text-green-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-black dark:text-white shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-green-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-neutral-500 dark:text-neutral-400 shrink-0" />
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all ${typeStyles[type] || typeStyles.info} ${className}`}
    >
      {icons[type]}
      <div className="flex-1 text-xs">
        {title && <h4 className="font-bold mb-0.5">{title}</h4>}
        {message && <p className="opacity-90">{message}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={() => onClose(id)}
          aria-label="Dismiss notification"
          className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
