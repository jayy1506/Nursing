import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [], className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-neutral-500 dark:text-neutral-400 ${className}`}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-green-700 dark:hover:text-green-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-black dark:text-white truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-green-700 dark:hover:text-green-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
