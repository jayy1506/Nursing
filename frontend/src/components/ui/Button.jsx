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
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-150 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
    icon: 'p-2 h-9 w-9 justify-center rounded-lg',
  };

  const variantStyles = {
    // Primary: green-500 fill with black text (strict AA requirement)
    primary: 'bg-green-500 hover:bg-green-400 text-black active:scale-[0.98]',
    // Secondary: neutral/white background with black text
    secondary: 'bg-neutral-100 hover:bg-neutral-200 text-black dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700',
    // Outline: crisp border, green hover
    outline: 'border border-black dark:border-neutral-300 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 text-black dark:text-white bg-transparent',
    // Ghost
    ghost: 'text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900',
    // Danger: never red! 2px heavy border
    danger: 'border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-extrabold hover:opacity-90 active:scale-[0.98]',
    // Subtle Green
    accent: 'bg-green-100 hover:bg-green-200 text-green-900 border border-green-500 font-bold active:scale-[0.98]'
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
          <Loader2 className="w-4 h-4 animate-spin text-black" />
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
