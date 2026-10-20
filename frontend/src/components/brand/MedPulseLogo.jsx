import React from 'react';
import { Link } from 'react-router-dom';

export const MedPulseIcon = ({ className = 'w-8 h-8', showCross = true }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="medpulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0d9488" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Rounded Squircle Container */}
    <rect width="48" height="48" rx="14" fill="url(#medpulse-grad)" filter="url(#glow)" />

    {/* Soft Clinical Cross Motif */}
    {showCross && (
      <path
        d="M24 10V38M10 24H38"
        stroke="white"
        strokeOpacity="0.18"
        strokeWidth="6"
        strokeLinecap="round"
      />
    )}

    {/* Dynamic Heartbeat / Pulse Wave Line */}
    <path
      d="M8 24H16L19 15L23 33L27 19L30 27L33 24H40"
      stroke="#ffffff"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Active Pulse Node */}
    <circle cx="23" cy="33" r="2" fill="#38bdf8" />
  </svg>
);

export const MedPulseLogo = ({
  showTagline = false,
  size = 'md',
  to = '/',
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <div className="transition-transform duration-200 group-hover:scale-105">
        <MedPulseIcon className={iconSizes[size] || iconSizes.md} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`font-black tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-sky-600 dark:from-teal-400 dark:to-sky-400 bg-clip-text text-transparent ${textSizes[size] || textSizes.md}`}>
          MedPulse
        </span>
        {showTagline ? (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
            Foundational medical sciences, mastered.
          </span>
        ) : (
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            Clinical Nursing LMS
          </span>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl">
      {content}
    </Link>
  ) : (
    content
  );
};

export default MedPulseLogo;
