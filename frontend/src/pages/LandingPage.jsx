import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MedPulseLogo } from '../components/brand/MedPulseLogo';
import {
  ChevronRight,
  Activity,
  ShieldCheck
} from 'lucide-react';

export const LandingPage = () => {
  const { currentUser, role } = useAuth();

  // Helper to determine destination if user is already logged in
  const getPortalDestination = () => {
    if (!currentUser) return '/login';
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'faculty') return '/faculty/dashboard';
    return '/dashboard';
  };

  const portalPath = getPortalDestination();

  return (
    <div className="min-h-screen lg:h-screen bg-[#E9F5F3]/40 text-[#263746] font-sans flex flex-col justify-between overflow-x-hidden selection:bg-[#159A91] selection:text-white">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#123B50] text-[#E9F5F3] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 shrink-0">
        <span className="inline-block w-2 h-2 rounded-full bg-[#159A91] animate-ping" />
        <span>Indian Nursing Council (INC) &bull; Competency-Based Medical Education (CBME) Accredited</span>
      </div>

      {/* 2. Navigation Header (Clean: Logo on Left, 'Sign In to Portal' on Right) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#123B50]/10 px-4 sm:px-8 py-3 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <MedPulseLogo size="md" showTagline={false} />
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={portalPath}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#159A91] hover:bg-[#123B50] text-white text-xs font-bold transition-all shadow-md shadow-[#159A91]/20 cursor-pointer"
          >
            <span>{currentUser ? 'Go to Dashboard' : 'Sign In to Portal'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* 3. Main Hero Section (Fit to Page, Centered, Focused CTAs) */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center items-center text-center my-auto">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9F5F3] border border-[#159A91]/30 text-[#123B50] text-xs font-bold tracking-wide shadow-2xs mb-4 sm:mb-6">
          <Activity className="w-3.5 h-3.5 text-[#159A91]" />
          <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-extrabold text-[#123B50]">
            INC B.SC NURSING &bull; CBME ACCREDITED CURRICULUM
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#123B50] tracking-tight leading-[1.08] max-w-3xl">
          Interactive Clinical <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#159A91] via-[#123B50] to-[#159A91]">
            Nursing &amp; Medical Sciences
          </span>
        </h1>

        {/* Subtitle (AI references removed) */}
        <p className="text-sm sm:text-base lg:text-lg text-[#263746]/85 font-medium leading-relaxed max-w-2xl mt-4 sm:mt-5">
          A purpose-built clinical learning workstation. Master applied anatomy, human physiology, 
          clinical biochemistry, and nutrition with real-time synchronized clinical telemetry 
          and nursing care plans (ADPIE).
        </p>

        {/* Single Primary Action Button */}
        <div className="mt-7 sm:mt-8 flex items-center justify-center w-full sm:w-auto">
          <Link
            to={portalPath}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#123B50] hover:bg-[#159A91] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#123B50]/20 hover:shadow-2xl transition-all duration-200 cursor-pointer group"
          >
            <span>{currentUser ? 'Enter Course Dashboard' : 'Enter Course Portal'}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Institutional Standard Pill */}
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-[#123B50]/75 mt-5">
          <ShieldCheck className="w-4 h-4 text-[#159A91] shrink-0" />
          <span>Strict Institutional Access &bull; Verified Indian Nursing Council Standard</span>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-[#123B50]/10 py-3.5 px-4 text-center shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#263746]/70">
          <div className="flex items-center gap-2">
            <MedPulseLogo size="sm" showTagline={false} />
            <span>&bull; Indian Nursing Council (INC) Accredited</span>
          </div>
          <div>
            MedPulse &bull; Developed by <span className="font-bold text-[#123B50]">Jay</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
