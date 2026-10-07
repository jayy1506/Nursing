import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import apiClient from '../../api/client';
import {
  ShieldCheck,
  Users,
  BookOpen,
  ClipboardList,
  Bot,
  UserPlus,
  PlusCircle,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    userCount: 3,
    studentCount: 2,
    facultyCount: 1,
    chapterCount: 2,
    topicCount: 12,
    questionCount: 48,
    attemptCount: 15
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const usersRes = await apiClient('/api/users');
        if (usersRes.success && usersRes.users) {
          const users = usersRes.users;
          setStats((prev) => ({
            ...prev,
            userCount: users.length,
            studentCount: users.filter((u) => u.role === 'student').length,
            facultyCount: users.filter((u) => u.role === 'faculty').length
          }));
        }
      } catch (err) {
        console.warn('Error loading admin stats:', err);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Super Control Panel</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Nursing AI & Clinical Administration
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage faculty, students, clinical curriculum, assessments, and AI telemetry.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-400/20 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Manage Users</span>
            </Link>
            <Link
              to="/admin/content"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Add / Remove Questions</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats.userCount}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              <span className="text-emerald-600 font-bold">{stats.studentCount} Students</span> • {stats.facultyCount} Faculty
            </p>
          </div>

          <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Curriculum Topics</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats.topicCount}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Biochemistry & Clinical Modules
            </p>
          </div>

          <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Bank</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats.questionCount}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">Active assessment items</p>
          </div>

          <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assessments Taken</span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats.attemptCount}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">Submitted student quizzes</p>
          </div>
        </div>

        {/* Administrative Modules Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/admin/users"
            className="group bg-white/90 hover:bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-400/30 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                User Management
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Add, remove, and assign roles for students and faculty members. Manage account status and permissions.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4">
              <span>Manage Directory</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/admin/content"
            className="group bg-white/90 hover:bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-4 shadow-md shadow-sky-400/30 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                Curriculum & Questions
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Add and remove subjects, chapters, modules, and assessment questions with custom rationales and options.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-sky-600 mt-4">
              <span>Edit Content</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/admin/results"
            className="group bg-white/90 hover:bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-400/30 group-hover:scale-105 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Assessment Results Audit
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Review all student quiz scores, pass/fail status, average performance metrics, and question-level telemetry.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mt-4">
              <span>Audit Scores</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/admin/chat-logs"
            className="group bg-white/90 hover:bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-400/30 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                AI Tutor Telemetry
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Inspect AI question prompts, response logs, and student knowledge inquiries across topics.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 mt-4">
              <span>View Logs</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
