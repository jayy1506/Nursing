import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold text-black dark:text-white"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-neutral-500 dark:text-neutral-400 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full rounded-xl border bg-white dark:bg-neutral-900 text-black dark:text-white text-sm placeholder:text-neutral-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500 ${
            leftIcon ? 'pl-9' : 'pl-3.5'
          } ${rightIcon ? 'pr-9' : 'pr-3.5'} py-2.5 ${
            error
              ? 'border-2 border-black dark:border-white'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-neutral-400'
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 text-neutral-500 dark:text-neutral-400 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs font-bold text-black dark:text-white flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 text-black dark:text-white" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-neutral-600 dark:text-neutral-400">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
