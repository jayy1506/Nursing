import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import {
  Stethoscope,
  BookOpen,
  ClipboardList,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Users
} from 'lucide-react';

export const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b bg-neutral-100 via-white to-green-50 text-neutral-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-green-700 text-xs font-bold mb-2">
              <Stethoscope className="w-4 h-4 text-green-700" />
              <span>Faculty Instructor Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Clinical Faculty Control Portal
            </h1>
            <p className="text-neutral-600 text-sm mt-1">
              Author assessment questions, monitor cohort performance, and review low-scoring student remediations.
            </p>
          </div>

          <Link
            to="/faculty/questions"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-500 text-white rounded-xl text-xs font-bold shadow-md shadow-green-400/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage & Add Questions</span>
          </Link>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/faculty/questions"
            className="group bg-white/90 hover:bg-white border border-neutral-200 hover:border-green-400 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-4 shadow-md shadow-green-400/20 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-green-500 transition-colors">
                Question Authoring & Management
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Add new NCLEX-style questions, modify choices, and write clear clinical rationales across all Biochemistry modules.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500 mt-4">
              <span>Open Authoring Tool</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/faculty/results"
            className="group bg-white/90 hover:bg-white border border-neutral-200 hover:border-green-400 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-4 shadow-md shadow-md group-hover:scale-105 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-green-700 transition-colors">
                Student Assessment Results
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Track passing rates, review score distributions, and identify students needing remediation study plans.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-700 mt-4">
              <span>View Student Submissions</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/bio-chem-syllabus"
            className="group bg-white/90 hover:bg-white border border-neutral-200 hover:border-green-400 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-4 shadow-md shadow-md group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-green-700 transition-colors">
                Review Curriculum & Modules
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Browse through all live interactive chapters and clinical case studies available to students.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-700 mt-4">
              <span>Explore Curriculum</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
