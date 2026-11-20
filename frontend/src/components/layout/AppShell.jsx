import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MedPulseLogo } from '../brand/MedPulseLogo';
import ThemeToggle from './ThemeToggle';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import {
  Home,
  BookOpen,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
  Users,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Sparkles,
  BarChart3,
  Layers,
  Menu,
  X,
  Bone,
  Activity,
  Dna,
  Utensils,
  HelpCircle,
  RotateCcw,
  Compass,
  Box,
  Shield
} from 'lucide-react';
import { CloudSyncButton } from '../ui/CloudSyncButton';
import { initAutoSync } from '../../services/mongoSyncService';
import { resetAllStudentProgress } from '../../services/curriculumProgress';

export const AppShell = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auto background sync on reconnect
  useEffect(() => {
    initAutoSync();
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/login', { replace: true, state: {} });
  };

  const getNickname = () => {
    if (!currentUser) return 'Guest';
    if (currentUser.displayName) return currentUser.displayName.split(' ')[0];
    if (currentUser.name) return currentUser.name.split(' ')[0];
    if (currentUser.email) return currentUser.email.split('@')[0];
    return 'User';
  };

  const nickname = getNickname();
  const savedUsername = localStorage.getItem('medpulse_saved_username');
  const fullName = savedUsername || currentUser?.displayName || currentUser?.name || nickname;

  const getInitials = () => {
    if (!currentUser) return 'U';
    try {
      const savedUser = JSON.parse(localStorage.getItem('nursing_user') || '{}');
      const uName = savedUser.username || currentUser.displayName || currentUser.name || currentUser.email || 'Jay';
      if (role === 'admin' && (uName.toLowerCase().includes('jay') || uName.toLowerCase().includes('admin'))) {
        return 'JA';
      }
      const parts = uName.trim().split(/[\s._@-]+/);
      if (parts.length >= 2 && parts[1]) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return uName.slice(0, 2).toUpperCase();
    } catch {
      return 'JA';
    }
  };

  const initials = getInitials();

  // Navigation Items by Role
  const studentNavItems = [
    { label: 'Dashboard', to: '/dashboard', icon: <Home className="w-5 h-5 shrink-0" /> },
    { label: '3D Explorer', to: '/explorer', icon: <Compass className="w-5 h-5 shrink-0" /> },
    { label: 'Curriculum Hub', to: '/syllabus', icon: <BookOpen className="w-5 h-5 shrink-0" /> },
    { label: 'Question Bank', to: '/question-bank', icon: <Layers className="w-5 h-5 shrink-0" /> },
    { label: 'Assessments', to: '/student/quiz/comprehensive', icon: <ClipboardList className="w-5 h-5 shrink-0" /> },
    { label: 'My Results', to: '/student/results', icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
  ];

  const facultyNavItems = [
    { label: 'Faculty Hub', to: '/faculty/dashboard', icon: <Stethoscope className="w-5 h-5 shrink-0" /> },
    { label: '3D Explorer', to: '/explorer', icon: <Compass className="w-5 h-5 shrink-0" /> },
    { label: 'Question Bank', to: '/faculty/questions', icon: <BookOpen className="w-5 h-5 shrink-0" /> },
    { label: 'Cohort Results', to: '/faculty/results', icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
    { label: 'Curriculum View', to: '/syllabus', icon: <Layers className="w-5 h-5 shrink-0" /> },
  ];

  const adminNavItems = [
    { label: 'Admin Dashboard', to: '/admin/dashboard', icon: <ShieldCheck className="w-5 h-5 shrink-0" /> },
    { label: 'User Directory', to: '/admin/users', icon: <Users className="w-5 h-5 shrink-0" /> },
    { label: 'Curriculum Editor', to: '/admin/content', icon: <BookOpen className="w-5 h-5 shrink-0" /> },
    { label: 'Results Audit', to: '/admin/results', icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
    { label: 'Tutor Audit Logs', to: '/admin/chat-logs', icon: <Sparkles className="w-5 h-5 shrink-0" /> },
  ];

  let navItems = studentNavItems;
  if (role === 'faculty') navItems = facultyNavItems;
  if (role === 'admin') navItems = adminNavItems;

  const curriculumTracks = [
    { label: 'Applied Anatomy', to: '/anatomy-syllabus', icon: <Bone className="w-4 h-4 shrink-0 text-[#159A91]" />, units: '12 Units' },
    { label: 'Applied Physiology', to: '/physiology-syllabus', icon: <Activity className="w-4 h-4 shrink-0 text-[#159A91]" />, units: '12 Units' },
    { label: 'Applied Biochemistry', to: '/bio-chem-syllabus', icon: <Dna className="w-4 h-4 shrink-0 text-[#159A91]" />, units: '8 Units' },
    { label: 'Nutrition & Dietetics', to: '/nutrition-syllabus', icon: <Utensils className="w-4 h-4 shrink-0 text-[#159A91]" />, units: '10 Units' },
  ];

  const filteredTracks = curriculumTracks.filter(t =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-[#159A91] selection:text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-700 hover:bg-[#E9F5F3] lg:hidden focus-visible:ring-2 focus-visible:ring-[#159A91] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#123B50]" /> : <Menu className="w-5 h-5 text-[#123B50]" />}
          </button>

          {/* Logo with Tagline */}
          <MedPulseLogo showTagline={true} />
        </div>

        {/* Global Action Navigation Center (Matching User Images 1, 2 & 3) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 3D Anatomy Playground Link (Enters Anatomy Playground on click) */}
          <Link
            to="/explorer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#159A91]/40 bg-[#E9F5F3] hover:bg-[#159A91] hover:text-white text-xs font-black text-[#123B50] transition-all shadow-2xs cursor-pointer group"
            title="Enter 3D Anatomy Playground"
          >
            <Box className="w-3.5 h-3.5 text-[#159A91] group-hover:text-white group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Playground</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#159A91] group-hover:bg-white animate-pulse" />
          </Link>

          {/* Quick Curriculum Bank Link */}
          <Link
            to="/question-bank"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-[#E9F5F3] text-xs font-bold text-[#123B50] transition-colors shadow-2xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#159A91]" />
            <span>Curriculum Bank</span>
          </Link>

          {/* Quick Curriculum Dashboard Link */}
          <Link
            to="/dashboard"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-[#E9F5F3] text-xs font-bold text-[#123B50] transition-colors shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#159A91]" />
            <span>Curriculum Dashboard</span>
          </Link>

          {/* Faculty Studio (for Faculty / Admin) */}
          {(role === 'faculty' || role === 'admin') && (
            <Link
              to="/faculty/dashboard"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#159A91]/30 bg-[#E9F5F3] text-xs font-bold text-[#123B50] hover:bg-[#159A91] hover:text-white transition-all shadow-2xs cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#159A91] group-hover:text-white" />
              <span>Faculty Studio</span>
            </Link>
          )}

          {/* Separator */}
          <div className="hidden md:block w-[1px] h-5 bg-neutral-200 mx-1" />

          {/* Reset Learning Progress Circular Button (Image 3 & 4) */}
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-rose-400 bg-white text-neutral-600 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title="Reset Learning Progress"
            aria-label="Reset Learning Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* User Profile Avatar Circle (Matching Images 1, 2, 3, 5) */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#123B50] to-[#159A91] text-white flex items-center justify-center text-xs font-black shadow-md cursor-pointer hover:scale-105 transition-transform ring-2 ring-[#E9F5F3]"
                aria-label="User account"
                title="Account menu"
              >
                {initials}
              </button>

              {/* Exact Popover Dropdown matching Reference Image 5 */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200/90 rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-neutral-900"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  {/* Popover Header Card with JT Circle & Email */}
                  <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#123B50] to-[#159A91] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-inner">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-[#123B50] truncate">
                        {fullName}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {currentUser.email}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/30">
                          {role === 'admin' ? 'Super-Admin' : role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Links matching Reference Image 5 */}
                  <div className="py-2 space-y-0.5">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#123B50] hover:bg-[#E9F5F3] transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#159A91]" />
                      <span>Course Dashboard</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        window.dispatchEvent(new CustomEvent('open-nova-tutor'));
                        const aiBtn = document.querySelector('[aria-label="Ask Nova AI Clinical Tutor"]');
                        if (aiBtn) aiBtn.click();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#123B50] hover:bg-[#E9F5F3] transition-colors text-left cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#159A91]" />
                      <span>Nova Clinical Tutor</span>
                    </button>

                    {/* Admin Console (for Admin) */}
                    {role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#123B50] hover:bg-[#E9F5F3] transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#159A91]" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="my-1 border-t border-neutral-100" />

                    {/* Help & Documentation */}
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setHelpOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors text-left cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-neutral-500" />
                      <span>Help & Documentation</span>
                    </button>

                    <div className="my-1 border-t border-neutral-100" />

                    {/* Sign Out in red */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#123B50] hover:bg-[#159A91] rounded-xl shadow-xs transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area (Full-Width Clean Layout matching reference) */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white text-black min-h-screen">
        <main className="flex-1 pb-16 lg:pb-8 w-full">
          {children}
        </main>
        <footer className="mt-auto border-t border-neutral-200 py-3.5 px-6 text-xs text-neutral-500 bg-neutral-50/80 mb-14 lg:mb-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>MedPulse &copy; {new Date().getFullYear()} &bull; Foundational Medical Sciences &amp; Clinical Nursing LMS</span>
            <span className="font-medium text-neutral-600 flex items-center gap-1.5">
              <span>Developed by</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#E9F5F3] text-[#123B50] border border-[#159A91]/30 shadow-2xs">
                Jay
              </span>
            </span>
          </div>
        </footer>
      </div>

      {/* Mobile Drawer Navigation (When hamburger tapped) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="fixed inset-y-0 left-0 w-72 bg-white border-r border-neutral-200 p-5 flex flex-col space-y-5 animate-in slide-in-from-left duration-200 text-black">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <MedPulseLogo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-neutral-600 hover:text-black rounded-lg cursor-pointer"
                aria-label="Toggle sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 px-3">
                Menu
              </span>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isActive
                      ? 'border-l-4 border-[#159A91] bg-[#E9F5F3] text-[#123B50] font-extrabold pl-2.5'
                      : 'text-neutral-700 hover:bg-[#E9F5F3]/50'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}

              <div className="pt-4 mt-2 border-t border-neutral-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 px-3">
                  Syllabi Tracks
                </span>
                {curriculumTracks.map((track) => (
                  <Link
                    key={track.to}
                    to={track.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-700 hover:text-black"
                  >
                    <span className="flex items-center gap-2">
                      {track.icon}
                      <span>{track.label}</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">{track.units}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <div className="text-center text-[11px] text-neutral-500 font-medium">
                Developed by <span className="font-bold text-black">Jay</span>
              </div>
              {currentUser && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-black bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav aria-label="Mobile Navigation" className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 lg:hidden flex items-center justify-around py-2 px-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${isActive ? 'text-[#159A91]' : 'text-neutral-600'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/syllabus"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${isActive ? 'text-[#159A91]' : 'text-neutral-600'
            }`
          }
        >
          <BookOpen className="w-5 h-5" />
          <span>Syllabus</span>
        </NavLink>

        <NavLink
          to="/question-bank"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${isActive ? 'text-[#159A91]' : 'text-neutral-600'
            }`
          }
        >
          <Layers className="w-5 h-5" />
          <span>Q-Bank</span>
        </NavLink>

        {role === 'student' && (
          <NavLink
            to="/student/quiz/comprehensive"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${isActive ? 'text-[#159A91]' : 'text-neutral-600'
              }`
            }
          >
            <ClipboardList className="w-5 h-5" />
            <span>Quiz</span>
          </NavLink>
        )}

        {role === 'faculty' && (
          <NavLink
            to="/faculty/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${isActive ? 'text-[#159A91]' : 'text-neutral-600'
              }`
            }
          >
            <Stethoscope className="w-5 h-5" />
            <span>Faculty</span>
          </NavLink>
        )}

        {role === 'admin' && (
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${isActive ? 'text-[#159A91]' : 'text-neutral-600'
              }`
            }
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-white border border-neutral-300 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-black">
            <div className="p-3 border-b border-neutral-200 flex items-center gap-2.5">
              <Search className="w-5 h-5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search curriculum tracks, chapters, or topics..."
                className="w-full bg-transparent text-sm focus:outline-none placeholder-neutral-400 font-medium"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-neutral-500 hover:text-black rounded-lg text-xs font-bold cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="p-3 max-h-72 overflow-y-auto space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 px-2">
                Curriculum Modules
              </span>
              {filteredTracks.map((track) => (
                <Link
                  key={track.to}
                  to={track.to}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100 text-xs text-black transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    {track.icon}
                    <span>{track.label}</span>
                  </span>
                  <span className="text-[10px] text-[#123B50] font-bold">{track.units}</span>
                </Link>
              ))}

              <div className="pt-2 border-t border-neutral-200">
                <Link
                  to="/question-bank"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-100 text-xs text-black"
                >
                  <Layers className="w-4 h-4 text-neutral-500" />
                  <span>University Question Bank (All Modules)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Institutional Help & Support Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#159A91]" />
                <h3 className="font-black text-sm text-[#123B50]">MedPulse Help & Support</h3>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Welcome to the MedPulse Clinical Nursing LMS. If you need assistance with curriculum access,
              assessment gating, or institutional account credentials:
            </p>
            <div className="space-y-2 text-xs text-[#263746]">
              <div className="p-3 bg-[#E9F5F3] rounded-2xl border border-[#159A91]/25">
                <div className="font-extrabold text-[#123B50]">Academic Administration</div>
                <div className="text-[11px] text-neutral-600 mt-0.5">Dept. of Nursing Sciences &bull; admin@nursing.edu</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="font-extrabold text-[#123B50]">INC Assessment Benchmark</div>
                <div className="text-[11px] text-neutral-600 mt-0.5">Passing score is strictly &ge; 75% for unit clearance and Grand Final unlocking.</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="font-extrabold text-[#123B50]">Nova AI Clinical Tutor</div>
                <div className="text-[11px] text-neutral-600 mt-0.5">Tap the floating Nova icon on any learning page for instant chapter-scoped clinical rationale.</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#123B50] text-white text-xs font-bold hover:bg-[#159A91] transition-colors cursor-pointer"
            >
              Close Help
            </button>
          </div>
        </div>
      )}
      {/* Reset Learning Progress Modal (Exact Match to User Reference Image 4) */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 text-left space-y-4 animate-in zoom-in-95 duration-150">
            {/* Red Tinted Circular Icon */}
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
              <RotateCcw className="w-6 h-6 text-rose-600" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight">
                Reset Learning Progress?
              </h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                This will reset your completed syllabus topics and quiz scores back to 0%.
                This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await resetAllStudentProgress();
                  } catch (e) {
                    console.warn(e);
                  }
                  setResetModalOpen(false);
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                Yes, Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShell;
