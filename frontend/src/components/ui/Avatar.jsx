import React from 'react';

export const Avatar = ({
  name = 'User',
  src,
  size = 'md',
  status,
  className = ''
}) => {
  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base font-bold'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-neutral-400',
    busy: 'bg-black dark:bg-white',
    away: 'bg-neutral-600'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover border border-neutral-200 dark:border-neutral-700`}
        />
      ) : (
        <div
          className={`${
            sizeClasses[size] || sizeClasses.md
          } rounded-full bg-black dark:bg-white text-white dark:text-black font-extrabold flex items-center justify-center shadow-xs border border-neutral-300 dark:border-neutral-700 select-none`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-black ${
            statusColors[status] || statusColors.online
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;
