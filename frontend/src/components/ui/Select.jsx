import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const Select = React.forwardRef(({
  label,
  error,
  helperText,
  children,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`w-full appearance-none rounded-xl border bg-white dark:bg-black text-black dark:text-white text-sm px-3.5 py-2.5 pr-9 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black ${
            error
              ? 'border-2 border-black dark:border-white font-medium'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500'
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-black dark:text-white">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
