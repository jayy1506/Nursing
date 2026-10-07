import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  User,
  BookOpen
} from 'lucide-react';

export const ResultAudit = () => {
  const [attempts, setAttempts] = useState([
    {
      _id: 'att-01',
      studentName: 'Elena Rostova',
      studentEmail: 'student@nursing-lms.edu',
      moduleName: 'Module 1: Carbohydrate Metabolism',
      score: 85,
      totalQuestions: 10,
      passed: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    {
      _id: 'att-02',
      studentName: 'David Kim',
      studentEmail: 'david.k@nursing-lms.edu',
      moduleName: 'Module 1: Carbohydrate Metabolism',
      score: 50,
      totalQuestions: 10,
      passed: false,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleDateString()
    },
    {
      _id: 'att-03',
      studentName: 'Amina Al-Mansoor',
      studentEmail: 'amina@nursing-lms.edu',
      moduleName: 'Module 2: Lipid Metabolism',
      score: 90,
      totalQuestions: 10,
      passed: true,
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toLocaleDateString()
    }
  ]);

  const [search, setSearch] = useState('');

  const filtered = attempts.filter((a) =>
    a.studentName.toLowerCase().includes(search.toLowerCase()) ||
    a.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
    a.moduleName.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore = Math.round(attempts.reduce((acc, curr) => acc + curr.score, 0) / (attempts.length || 1));
  const passRate = Math.round((attempts.filter(a => a.passed).length / (attempts.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ClipboardList className="w-7 h-7 text-emerald-600" />
            <span>Assessment Results & Performance Audit</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Complete records of student assessment attempts, pass/fail status, and clinical scores.
          </p>
        </div>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white/90 border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Submissions</span>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{attempts.length}</p>
          </div>
          <div className="bg-white/90 border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Cohort Score</span>
            <p className="text-3xl font-extrabold text-emerald-600 mt-2">{avgScore}%</p>
          </div>
          <div className="bg-white/90 border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Pass Rate</span>
            <p className="text-3xl font-extrabold text-sky-600 mt-2">{passRate}%</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl p-4 shadow-sm mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student or module..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Module / Topic</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((att) => (
                  <tr key={att._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{att.studentName}</p>
                      <p className="text-[11px] text-slate-400">{att.studentEmail}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{att.moduleName}</td>
                    <td className="px-6 py-4 font-extrabold text-sm text-slate-900">{att.score}%</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          att.passed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {att.passed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {att.passed ? 'PASSED (≥70%)' : 'REMEDIATION NEEDED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{att.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultAudit;
