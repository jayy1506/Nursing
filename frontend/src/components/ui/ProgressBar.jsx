import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  color = 'green',
  showLabel = false,
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colorClasses = {
    green: 'bg-green-500',
    black: 'bg-black dark:bg-white',
    neutral: 'bg-neutral-500 dark:bg-neutral-400'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <span>Progress</span>
          <span className="font-mono">{percent}%</span>
        </div>
      )}
      <div className={`w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={`${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.green} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export const ProgressRing = ({
  value = 0,
  max = 100,
  size = 64,
  strokeWidth = 6,
  color = '#22C55E',
  trackColor = '#E5E5E5',
  children,
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="dark:stroke-neutral-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children ? (
          children
        ) : (
          <span className="text-xs font-extrabold text-black dark:text-white">
            {percent}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
