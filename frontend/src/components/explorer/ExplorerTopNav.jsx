import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Layers, 
  GraduationCap, 
  BookmarkCheck, 
  FileText, 
  Search, 
  Globe, 
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ExplorerTopNav = ({ onSearchChange, activeTab = 'explore', onTabChange }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const navTabs = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'systems', label: 'Systems', icon: Layers, to: '/syllabus' },
    { id: 'lessons', label: 'Lessons', icon: GraduationCap, to: '/anatomy-syllabus' },
    { id: 'library', label: 'Library', icon: BookmarkCheck, to: '/question-bank' },
    { id: 'notes', label: 'Notes', icon: FileText, to: '/dashboard' },
  ];

  const handleTabClick = (tab) => {
    if (tab.to && tab.id !== 'explore') {
      navigate(tab.to);
    } else if (onTabChange) {
      onTabChange(tab.id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: MedPulse Brand + Return Link */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-1.5 rounded-xl hover:bg-[#E9F5F3] text-[#263746] hover:text-[#159A91] transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link to="/explorer" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#123B50] to-[#159A91] flex items-center justify-center shadow-xs shadow-[#159A91]/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-[#123B50] group-hover:text-[#159A91] transition-colors">
                  MedPulse
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#E9F5F3] text-[#159A91] text-[10px] font-black uppercase tracking-wider border border-[#159A91]/30">
                  3D Studio
                </span>
              </div>
              <span className="text-[10px] text-[#263746] font-semibold tracking-wide hidden sm:block -mt-0.5">
                Interactive Anatomical Specimen Atelier
              </span>
            </div>
          </Link>
        </div>

        {/* Centered Pill Tabs */}
        <nav className="hidden md:flex items-center bg-[#E9F5F3]/70 p-1 rounded-full border border-[#159A91]/20">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#159A91] text-white shadow-xs font-bold'
                    : 'text-[#123B50] hover:text-[#159A91] hover:bg-white/80 font-semibold'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#159A91]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Search, Language, Profile */}
        <div className="flex items-center gap-2.5">
          {/* Rounded Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search organs, topics..."
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-44 lg:w-56 pl-8 pr-3 py-1.5 text-xs rounded-full bg-neutral-100 border border-neutral-200 placeholder-neutral-400 text-[#123B50] focus:outline-none focus:ring-2 focus:ring-[#159A91]/40 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-bold text-[#123B50] hover:bg-[#E9F5F3] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#159A91]" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl border border-neutral-200 shadow-lg py-1 z-50 text-xs font-bold animate-in fade-in">
                {['English', 'Latin (Cor)', 'Español', 'Français'].map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => {
                      setCurrentLang(lng.split(' ')[0]);
                      setLangMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#E9F5F3] hover:text-[#159A91] text-[#123B50]"
                  >
                    {lng}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <Link
            to="/dashboard"
            className="flex items-center pl-1 cursor-pointer group"
            title="User Profile"
          >
            <div className="w-8 h-8 rounded-full ring-2 ring-[#159A91]/40 bg-gradient-to-tr from-[#123B50] to-[#159A91] flex items-center justify-center text-white font-serif font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              {currentUser?.displayName ? currentUser.displayName[0] : 'Dr'}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
