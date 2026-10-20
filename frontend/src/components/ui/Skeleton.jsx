import React from 'react';

export const Skeleton = ({ className = '', ...props }) => (
  <div
    className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-lg ${className}`}
    {...props}
  />
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-3/5' : 'w-full'}`}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-5 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-black space-y-4 ${className}`}>
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
    <Skeleton className="h-16 w-full rounded-xl" />
    <div className="flex justify-between items-center pt-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-20 rounded-lg" />
    </div>
  </div>
);

export default Skeleton;
