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
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-150 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A91] focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12',
    icon: 'p-2 h-9 w-9 justify-center rounded-lg',
  };

  const variantStyles = {
    // Primary: Clinical Teal (#159A91) with Deep Navy (#123B50) hover
    primary: 'bg-[#159A91] hover:bg-[#123B50] text-white font-extrabold shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]',
    // Secondary: pure white background with neutral border and Deep Navy text
    secondary: 'bg-white hover:bg-[#E9F5F3] text-[#123B50] border border-neutral-300 shadow-2xs font-bold hover:border-[#159A91] active:scale-[0.98]',
    // Outline: crisp teal border with mint hover state
    outline: 'border border-[#159A91]/40 hover:border-[#159A91] hover:text-[#123B50] hover:bg-[#E9F5F3] text-[#263746] bg-white font-bold transition-all active:scale-[0.98]',
    // Ghost
    ghost: 'text-[#263746] hover:text-[#123B50] hover:bg-[#E9F5F3] font-semibold transition-all',
    // Danger: high-contrast dark button / rose
    danger: 'bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs active:scale-[0.98]',
    // Accent: Deep Navy (#123B50) with Clinical Teal (#159A91) hover
    accent: 'bg-[#123B50] hover:bg-[#159A91] text-white font-extrabold shadow-sm active:scale-[0.98]'
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
