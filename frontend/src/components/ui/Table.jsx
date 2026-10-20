import React from 'react';

export const Table = ({ children, className = '' }) => (
  <div className="w-full overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-black shadow-xs">
    <table className={`w-full text-left text-sm ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = '' }) => (
  <thead className={`bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = '' }) => (
  <tbody className={`divide-y divide-neutral-100 dark:divide-neutral-800 ${className}`}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = '', hover = true, ...props }) => (
  <tr
    className={`transition-colors ${
      hover ? 'hover:bg-neutral-50 dark:hover:bg-neutral-900/60' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead = ({ children, className = '', ...props }) => (
  <th className={`px-4 py-3 font-bold text-neutral-900 dark:text-neutral-100 ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell = ({ children, className = '', ...props }) => (
  <td className={`px-4 py-3.5 text-neutral-800 dark:text-neutral-200 align-middle ${className}`} {...props}>
    {children}
  </td>
);

export default Table;
