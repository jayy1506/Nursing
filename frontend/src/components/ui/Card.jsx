import React from 'react';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs overflow-hidden ${
        hover ? 'hover:shadow-md hover:border-green-500 dark:hover:border-green-500 hover:-translate-y-0.5 transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-5 border-b border-neutral-100 dark:border-neutral-800 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component className={`text-base font-black text-black dark:text-white tracking-tight ${className}`} {...props}>
    {children}
  </Component>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-neutral-600 dark:text-neutral-400 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
