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
    // Primary: green fill with white text
    primary: 'bg-green-600 hover:bg-green-700 text-white font-extrabold shadow-xs active:scale-[0.98]',
    // Secondary: white background with black text
    secondary: 'bg-white hover:bg-neutral-100 text-black border border-neutral-300',
    // Outline: crisp border with black text, green on hover
    outline: 'border-2 border-neutral-800 hover:border-green-600 hover:text-green-700 text-black bg-white',
    // Ghost
    ghost: 'text-neutral-700 hover:text-black hover:bg-neutral-100',
    // Danger: white background with heavy border and black text
    danger: 'border-2 border-neutral-800 bg-white text-black font-extrabold hover:bg-neutral-100 active:scale-[0.98]',
    // Accent: green with white text
    accent: 'bg-green-700 hover:bg-green-800 text-white font-bold active:scale-[0.98]'
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
