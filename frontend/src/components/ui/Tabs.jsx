import React from 'react';

export const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 ${
              isActive
                ? 'bg-white dark:bg-black text-black dark:text-white border-b-2 border-green-500 shadow-xs font-extrabold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive
                  ? 'bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-300 font-extrabold'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
