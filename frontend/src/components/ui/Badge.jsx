import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-0.5 font-bold',
    lg: 'text-xs px-3 py-1 font-extrabold'
  };

  const variantStyles = {
    // Neutral gray
    neutral: 'bg-neutral-100 text-[#263746] border-neutral-300',
    // Success / Primary
    primary: 'bg-[#E9F5F3] text-[#123B50] border-[#159A91]/30',
    success: 'bg-[#159A91] text-white border-transparent font-extrabold',
    // Active / In-progress: teal outline
    active: 'bg-transparent text-[#159A91] border-[#159A91]',
    // Locked
    locked: 'bg-neutral-100 text-neutral-500 border-neutral-300',
    // Warning: Amber
    warning: 'bg-[#F2B66D]/20 text-[#123B50] border-[#F2B66D]/40 font-bold',
    // Danger / Error
    danger: 'bg-rose-50 text-rose-700 border border-rose-200 font-extrabold',
    error: 'bg-rose-50 text-rose-700 border border-rose-200 font-extrabold',
    // High-Yield Priority Chips
    high: 'bg-[#159A91] text-white border-transparent font-extrabold',
    medium: 'bg-transparent text-[#159A91] border border-[#159A91] font-bold',
    low: 'bg-transparent text-neutral-600 border-transparent font-medium',
    // Legacy mapping aliases for safety
    info: 'bg-[#E9F5F3] text-[#123B50] border-[#159A91]/30',
    accent: 'bg-[#E9F5F3] text-[#123B50] border-[#159A91]/40'
  };

  const dotStyles = {
    neutral: 'bg-neutral-400',
    primary: 'bg-[#159A91]',
    success: 'bg-white',
    active: 'bg-[#159A91] animate-pulse',
    locked: 'bg-neutral-400',
    warning: 'bg-[#F2B66D]',
    danger: 'bg-rose-600',
    error: 'bg-rose-600',
    high: 'bg-white',
    medium: 'bg-[#159A91]',
    low: 'bg-neutral-400',
    info: 'bg-[#159A91]',
    accent: 'bg-[#159A91]'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border leading-normal uppercase tracking-wide select-none ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.neutral} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotStyles[variant] || dotStyles.neutral
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
