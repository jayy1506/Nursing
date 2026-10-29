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
  ChevronRight,
  ChevronDown,
  LogOut,
  Sparkles,
  BarChart3,
  Layers,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Bone,
  Activity,
  Dna,
  Utensils
} from 'lucide-react';
import { CloudSyncButton } from '../ui/CloudSyncButton';
import { initAutoSync } from '../../services/mongoSyncService';

export const AppShell = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auto background sync on reconnect
  useEffect(() => {
    initAutoSync();
  }, []);

  // Auto-collapse sidebar when student enters syllabus, lesson, or quiz views for full-screen focus
  useEffect(() => {
    const isCurriculumView =
      location.pathname.includes('syllabus') ||
      location.pathname.includes('/lesson/') ||
      location.pathname.includes('/quiz/');
    if (isCurriculumView) {
      setCollapsed(true);
    }
  }, [location.pathname]);

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
  const fullName = currentUser?.displayName || currentUser?.name || nickname;

  // Navigation Items by Role
  const studentNavItems = [
    { label: 'Dashboard', to: '/', icon: <Home className="w-5 h-5 shrink-0" /> },
    { label: 'Curriculum Hub', to: '/syllabus', icon: <BookOpen className="w-5 h-5 shrink-0" /> },
    { label: 'Question Bank', to: '/question-bank', icon: <Layers className="w-5 h-5 shrink-0" /> },
    { label: 'Assessments', to: '/student/quiz/comprehensive', icon: <ClipboardList className="w-5 h-5 shrink-0" /> },
    { label: 'My Results', to: '/student/results', icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
  ];

  const facultyNavItems = [
    { label: 'Faculty Hub', to: '/faculty/dashboard', icon: <Stethoscope className="w-5 h-5 shrink-0" /> },
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
    { label: 'Applied Anatomy', to: '/anatomy-syllabus', icon: <Bone className="w-4 h-4 shrink-0 text-green-600" />, units: '12 Units' },
    { label: 'Applied Physiology', to: '/physiology-syllabus', icon: <Activity className="w-4 h-4 shrink-0 text-green-700" />, units: '12 Units' },
    { label: 'Applied Biochemistry', to: '/bio-chem-syllabus', icon: <Dna className="w-4 h-4 shrink-0 text-green-600" />, units: '8 Units' },
    { label: 'Nutrition & Dietetics', to: '/nutrition-syllabus', icon: <Utensils className="w-4 h-4 shrink-0 text-green-600" />, units: '10 Units' },
  ];

  const filteredTracks = curriculumTracks.filter(t =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-green-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 lg:hidden focus-visible:ring-2 focus-visible:ring-green-600 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Icon-only toggle with tooltip and aria-label */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-2 rounded-xl bg-white hover:bg-neutral-100 text-black border border-neutral-300 text-xs font-bold transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-green-600"
            aria-label="Toggle sidebar"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-green-700" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-neutral-700" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </button>

          {/* Logo with Tagline */}
          <MedPulseLogo showTagline={true} />
        </div>

        {/* Global Search & Action Center */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 bg-white hover:bg-neutral-100 rounded-xl border border-neutral-300 transition-colors cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-neutral-600" />
            <span className="hidden md:inline font-medium">Quick search curriculum...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-neutral-100 border border-neutral-300 rounded text-neutral-600 font-semibold">
              Ctrl+K
            </kbd>
          </button>

          {/* Theme Mode Toggle */}
          <ThemeToggle />

          {/* MongoDB Cloud Sync Button */}
          <CloudSyncButton compact={true} />

          {/* Notifications Placeholder */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-green-600 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-600 rounded-full ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-black"
                onMouseLeave={() => setNotificationsOpen(false)}
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 mb-3">
                  <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                    Notifications
                  </h4>
                  <Badge variant="high" size="sm">New</Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-green-50 border border-green-200">
                    <p className="font-bold text-green-900">Welcome to MedPulse</p>
                    <p className="text-neutral-700 text-[11px] mt-0.5">
                      Explore all 4 foundational tracks with chapter-scoped AI tutoring.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <p className="font-semibold text-black">Formative Assessments Ready</p>
                    <p className="text-neutral-600 text-[11px] mt-0.5">
                      Practice INC question bank with bedside rationales.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 rounded-full border border-neutral-300 bg-white hover:border-green-600 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-green-600 shadow-xs"
                aria-label="User navigation menu"
              >
                <Avatar name={nickname} size="sm" />
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-black">
                    {nickname}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-green-700 mt-0.5">
                    {role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-black"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-neutral-200">
                    <p className="text-xs font-bold text-black truncate">
                      {fullName}
                    </p>
                    <p className="text-[11px] text-neutral-600 truncate">
                      {currentUser.email}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <Badge variant="medium" size="sm">{role}</Badge>
                      {role === 'student' && (
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                          B.Sc Nursing • Year 1
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-800 hover:bg-neutral-100"
                    >
                      <Home className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Home Hub</span>
                    </Link>
                    <Link
                      to="/syllabus"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-800 hover:bg-neutral-100"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Curriculum Tracks</span>
                    </Link>
                  </div>

                  <div className="p-2 border-t border-neutral-100 bg-neutral-50/60">
                    <CloudSyncButton compact={false} className="border-0 bg-transparent p-0" />
                  </div>

                  <div className="pt-1 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-xs transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Shell Layout (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Floating Quick Menu Access Tab when collapsed */}
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="hidden lg:flex fixed left-0 top-20 z-30 items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:border-green-600 rounded-r-xl shadow-md text-xs font-bold transition-all hover:translate-x-0.5 cursor-pointer border border-neutral-300 border-l-0"
            title="Open Navigation Menu"
            aria-label="Toggle sidebar"
          >
            <ChevronRight className="w-3.5 h-3.5 text-green-700" />
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-green-700">Menu</span>
          </button>
        )}

        {/* Desktop Sidebar: Pure White Background with Black Text */}
        <aside
          className={`hidden lg:flex flex-col bg-white text-black border-r border-neutral-200 transition-all duration-300 shrink-0 select-none ${
            collapsed
              ? 'w-0 opacity-0 overflow-hidden border-none pointer-events-none'
              : 'w-64 opacity-100'
          }`}
        >
          <div className="p-3.5 flex-1 flex flex-col space-y-6 overflow-y-auto">
            {/* Primary Nav Links */}
            <div className="space-y-1">
              {!collapsed && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 px-3">
                  Main Navigation
                </span>
              )}
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'border-l-4 border-green-600 bg-green-50 text-green-800 font-extrabold pl-2.5'
                        : 'text-neutral-700 hover:text-black hover:bg-neutral-100 border-l-4 border-transparent'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>

            {/* Single style monochrome line icons for curriculum tracks */}
            {!collapsed && (
              <div className="space-y-1.5 pt-3 border-t border-neutral-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 px-3">
                  Curriculum Tracks
                </span>
                {curriculumTracks.map((track) => (
                  <Link
                    key={track.to}
                    to={track.to}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-xl transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      {track.icon}
                      <span className="truncate">{track.label}</span>
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">{track.units}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-neutral-200 text-[11px] text-neutral-500">
            {!collapsed ? (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span>INC CBME v2026</span>
                  <span className="w-2 h-2 rounded-full bg-green-600" title="System Operational" />
                </div>
                <div className="text-[10px] text-neutral-500 font-medium flex items-center justify-between pt-1 border-t border-neutral-100">
                  <span>Developed by</span>
                  <span className="font-bold text-black bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                    Jay
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-600" title="Online" />
                <span className="text-[8px] font-bold text-neutral-400">JAY</span>
              </div>
            )}
          </div>
        </aside>

        {/* Content Outlet Container */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white text-black min-h-screen">
          <main className="flex-1 pb-16 lg:pb-8">
            {children}
          </main>
          <footer className="mt-auto border-t border-neutral-200 py-3.5 px-6 text-xs text-neutral-500 bg-neutral-50/80 mb-14 lg:mb-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
              <span>MedPulse &copy; {new Date().getFullYear()} &bull; Foundational Medical Sciences & Clinical Nursing LMS</span>
              <span className="font-medium text-neutral-600 flex items-center gap-1.5">
                <span>Developed by</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200 shadow-xs">
                  Jay
                </span>
              </span>
            </div>
          </footer>
        </div>
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
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'border-l-4 border-green-600 bg-green-50 text-green-800 font-extrabold pl-2.5'
                        : 'text-neutral-700 hover:bg-neutral-100'
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
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${
              isActive ? 'text-green-700' : 'text-neutral-600'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/syllabus"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${
              isActive ? 'text-green-700' : 'text-neutral-600'
            }`
          }
        >
          <BookOpen className="w-5 h-5" />
          <span>Syllabus</span>
        </NavLink>

        <NavLink
          to="/question-bank"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${
              isActive ? 'text-green-700' : 'text-neutral-600'
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
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${
                isActive ? 'text-green-700' : 'text-neutral-600'
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
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${
                isActive ? 'text-green-700' : 'text-neutral-600'
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
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold ${
                isActive ? 'text-green-700' : 'text-neutral-600'
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
                  <span className="text-[10px] text-green-700 font-semibold">{track.units}</span>
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
    </div>
  );
};

export default AppShell;
