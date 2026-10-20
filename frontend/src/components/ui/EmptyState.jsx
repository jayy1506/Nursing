import React from 'react';
import { BookOpen } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = BookOpen,
  title = 'No records found',
  description = 'There is currently no data to display for this selection.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-green-700 dark:text-green-400 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-black dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
