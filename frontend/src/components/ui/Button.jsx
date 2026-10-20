import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-150 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
    icon: 'p-2 h-9 w-9 justify-center rounded-lg',
  };

  const variantStyles = {
    // Primary: vibrant medical green fill with crisp white text
    primary: 'bg-green-600 hover:bg-green-700 text-white font-extrabold shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]',
    // Secondary: pure white background with neutral border and dark text
    secondary: 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 shadow-2xs font-bold hover:border-neutral-400 active:scale-[0.98]',
    // Outline: crisp border with clean hover state
    outline: 'border border-neutral-300 hover:border-green-600 hover:text-green-700 hover:bg-green-50 text-neutral-800 bg-white font-bold transition-all active:scale-[0.98]',
    // Ghost
    ghost: 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 font-semibold transition-all',
    // Danger: high-contrast dark button
    danger: 'bg-neutral-900 hover:bg-black text-white font-bold shadow-xs active:scale-[0.98]',
    // Accent: emerald green
    accent: 'bg-green-600 hover:bg-green-700 text-white font-extrabold shadow-sm active:scale-[0.98]'
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
