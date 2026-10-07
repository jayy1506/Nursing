import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  User as UserIcon,
  Sparkles,
  LogIn,
  UserPlus,
  ChevronDown,
  ShieldCheck,
  Stethoscope,
  BookOpen,
  ClipboardList,
  Users
} from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdown(false);
    navigate('/login');
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

  const navLinkBase = "px-3.5 py-1.5 text-xs font-bold transition-all rounded-full flex items-center gap-1.5";
  const navLinkInactive = "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/70";
  const navLinkActive = "text-white bg-emerald-500 shadow-sm shadow-emerald-400/30 hover:bg-emerald-600";

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 p-[1px] shadow-md shadow-emerald-400/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              MetaNutriBio AI
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Clinical & Nutrition Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1.5 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/syllabus"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive || window.location.pathname.includes('syllabus') ? navLinkActive : navLinkInactive}`
            }
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Syllabus</span>
          </NavLink>

          <NavLink
            to="/question-bank"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Question Bank</span>
          </NavLink>

          {/* Student Assessment Link */}
          {role === 'student' && (
            <NavLink
              to="/student/quiz/comprehensive"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Assessment & Quiz</span>
            </NavLink>
          )}

          {/* Faculty Links */}
          {role === 'faculty' && (
            <>
              <NavLink
                to="/faculty/dashboard"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Faculty Hub</span>
              </NavLink>
              <NavLink
                to="/faculty/questions"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                <span>Questions</span>
              </NavLink>
              <NavLink
                to="/faculty/results"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                <span>Cohort Results</span>
              </NavLink>
            </>
          )}

          {/* Admin Links */}
          {role === 'admin' && (
            <>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                <Users className="w-3.5 h-3.5" />
                <span>Users</span>
              </NavLink>
              <NavLink
                to="/admin/content"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Curriculum</span>
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 py-1 px-3 rounded-full border border-slate-200 hover:border-emerald-400 bg-slate-50/90 hover:bg-emerald-50/40 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500 text-white flex items-center justify-center text-xs font-extrabold uppercase shadow-sm">
                  {nickname ? nickname[0] : 'U'}
                </div>

                <div className="text-left flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-medium">Hi,</span>
                    <span className="text-xs font-bold text-slate-800 leading-none">
                      {nickname}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 leading-none mt-0.5">
                    {role}
                  </span>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${userDropdown ? 'rotate-180' : ''}`} />
              </button>

              {userDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setUserDropdown(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {fullName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {currentUser.email}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wide">
                      {role} Role
                    </span>
                  </div>

                  {/* Role Specific Shortcuts in Menu */}
                  {role === 'admin' && (
                    <div className="py-1 border-b border-slate-100">
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                        <span>Admin Overview</span>
                      </Link>
                      <Link
                        to="/admin/users"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        <span>User Management</span>
                      </Link>
                    </div>
                  )}

                  {role === 'faculty' && (
                    <div className="py-1 border-b border-slate-100">
                      <Link
                        to="/faculty/dashboard"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                        <span>Faculty Portal</span>
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-sm shadow-emerald-400/30 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden px-4 py-3 space-y-2">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/syllabus"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${navLinkBase} ${isActive || window.location.pathname.includes('syllabus') ? navLinkActive : navLinkInactive}`
            }
          >
            Academic Syllabus (Biochem & Nutrition)
          </NavLink>

          <NavLink
            to="/question-bank"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block ${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
            }
          >
            Official Question Bank
          </NavLink>

          {role === 'student' && (
            <NavLink
              to="/student/quiz/comprehensive"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block ${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Assessments & Quiz
            </NavLink>
          )}

          {role === 'faculty' && (
            <NavLink
              to="/faculty/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block ${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Faculty Hub
            </NavLink>
          )}

          {role === 'admin' && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block ${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Admin Control Panel
            </NavLink>
          )}

          <div className="pt-2 border-t border-slate-100">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {nickname ? nickname[0] : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-none">
                      Hi, {nickname}
                    </p>
                    <p className="text-[10px] text-emerald-600 uppercase font-bold mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-1">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-emerald-500 rounded-xl shadow-sm hover:bg-emerald-600"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
