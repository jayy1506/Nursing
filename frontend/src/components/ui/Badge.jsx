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
    neutral: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700',
    // Success / Primary
    primary: 'bg-green-100 text-green-900 dark:bg-green-900/60 dark:text-green-400 border-green-500',
    success: 'bg-green-500 text-black border-transparent font-extrabold',
    // Active / In-progress: green outline
    active: 'bg-transparent text-green-700 dark:text-green-400 border-green-500',
    // Locked
    locked: 'bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-500 border-neutral-300 dark:border-neutral-800',
    // Warning: black filled pill (or white in dark mode)
    warning: 'bg-black text-white dark:bg-white dark:text-black border-transparent',
    // Danger / Error: heavy 2px border, no red
    danger: 'bg-transparent text-black dark:text-white border-2 border-black dark:border-white font-extrabold',
    error: 'bg-transparent text-black dark:text-white border-2 border-black dark:border-white font-extrabold',
    // High-Yield Priority Chips
    high: 'bg-green-500 text-black border-transparent font-extrabold',
    medium: 'bg-transparent text-green-700 dark:text-green-400 border border-green-500 font-bold',
    low: 'bg-transparent text-neutral-600 dark:text-neutral-400 border-transparent font-medium',
    // Legacy mapping aliases for safety
    info: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700',
    accent: 'bg-green-50 text-green-900 dark:bg-green-900/40 dark:text-green-400 border-green-500'
  };

  const dotStyles = {
    neutral: 'bg-neutral-400',
    primary: 'bg-green-500',
    success: 'bg-black',
    active: 'bg-green-500 animate-pulse',
    locked: 'bg-neutral-400',
    warning: 'bg-white dark:bg-black',
    danger: 'bg-black dark:bg-white',
    error: 'bg-black dark:bg-white',
    high: 'bg-black',
    medium: 'bg-green-500',
    low: 'bg-neutral-400',
    info: 'bg-neutral-500',
    accent: 'bg-green-500'
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
