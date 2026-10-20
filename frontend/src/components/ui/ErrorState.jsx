import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'Failed to load data. Please check your connection and try again.',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border-2 border-black dark:border-white bg-neutral-100 dark:bg-neutral-900 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mb-3 shadow-sm">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-black dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mb-4">
        {description}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          onClick={onRetry}
          className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
