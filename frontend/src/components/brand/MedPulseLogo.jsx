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
    {/* Squircle Container */}
    <rect width="48" height="48" rx="14" fill="#123B50" />

    {/* Soft Clinical Cross Motif */}
    {showCross && (
      <path
        d="M24 10V38M10 24H38"
        stroke="#159A91"
        strokeOpacity="0.4"
        strokeWidth="5"
        strokeLinecap="round"
      />
    )}

    {/* Dynamic Heartbeat / Pulse Wave Line */}
    <path
      d="M8 24H16L19 15L23 33L27 19L30 27L33 24H40"
      stroke="#159A91"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Active Pulse Node */}
    <circle cx="23" cy="33" r="2.2" fill="#F2B66D" />
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
        <div className={`font-black tracking-tight text-[#123B50] ${textSizes[size] || textSizes.md}`}>
          Med<span className="text-[#159A91]">Pulse</span>
        </div>
        {showTagline ? (
          <span className="text-[10px] text-neutral-500 font-semibold tracking-wide">
            Foundational medical sciences, mastered.
          </span>
        ) : (
          <span className="text-[10px] text-neutral-500 font-medium">
            Clinical Nursing LMS
          </span>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-xl">
      {content}
    </Link>
  ) : (
    content
  );
};

export default MedPulseLogo;
