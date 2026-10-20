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
    neutral: 'bg-neutral-100 text-black border-neutral-300',
    // Success / Primary
    primary: 'bg-green-50 text-green-900 border-green-300',
    success: 'bg-green-600 text-white border-transparent font-extrabold',
    // Active / In-progress: green outline
    active: 'bg-transparent text-green-700 border-green-600',
    // Locked
    locked: 'bg-neutral-100 text-neutral-500 border-neutral-300',
    // Warning: white filled pill with black text
    warning: 'bg-neutral-100 text-black border-neutral-300',
    // Danger / Error: heavy 2px border, no red
    danger: 'bg-white text-black border-2 border-neutral-800 font-extrabold',
    error: 'bg-white text-black border-2 border-neutral-800 font-extrabold',
    // High-Yield Priority Chips
    high: 'bg-green-600 text-white border-transparent font-extrabold',
    medium: 'bg-transparent text-green-700 border border-green-600 font-bold',
    low: 'bg-transparent text-neutral-600 border-transparent font-medium',
    // Legacy mapping aliases for safety
    info: 'bg-neutral-100 text-black border-neutral-300',
    accent: 'bg-green-50 text-green-900 border-green-400'
  };

  const dotStyles = {
    neutral: 'bg-neutral-400',
    primary: 'bg-green-600',
    success: 'bg-white',
    active: 'bg-green-600 animate-pulse',
    locked: 'bg-neutral-400',
    warning: 'bg-black',
    danger: 'bg-black',
    error: 'bg-black',
    high: 'bg-white',
    medium: 'bg-green-600',
    low: 'bg-neutral-400',
    info: 'bg-neutral-500',
    accent: 'bg-green-600'
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
