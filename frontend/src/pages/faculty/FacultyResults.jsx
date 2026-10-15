import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  getAllRecordedAttempts,
  getStudentRosterHistory
} from '../../services/assessmentEngine';
import {
  ClipboardList,
  Search,
  CheckCircle,
  XCircle,
  Stethoscope,
  Clock,
  Award,
  User,
  ChevronRight,
  TrendingUp,
  X,
  FileText,
  Calendar,
  Layers
} from 'lucide-react';

export const FacultyResults = () => {
  const [attempts, setAttempts] = useState([]);
  const [studentRoster, setStudentRoster] = useState([]);
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'attempts'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAttemptDetail, setSelectedAttemptDetail] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // 1. Load local attempts from engine
    const localAttempts = getAllRecordedAttempts();
    const roster = getStudentRosterHistory();

    // 2. Fetch from backend API
    const token = localStorage.getItem('token') || localStorage.getItem('firebase_token');
    fetch('/api/assessments/attempts', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.attempts && data.attempts.length > 0) {
          // Merge server attempts with local
          const serverFormatted = data.attempts.map(a => ({
            id: a._id,
            studentName: a.studentName || 'Nursing Student',
            studentEmail: a.studentEmail || a.studentId,
            topicTitle: a.scopeName || 'Clinical Assessment',
            score: a.score,
            totalQuestions: a.totalQuestions,
            percentage: a.percentage,
            passed: a.passed,
            timeSpentFormatted: a.timeSpentSeconds ? `${Math.floor(a.timeSpentSeconds / 60)} min` : 'N/A',
            completedAt: a.timestamp ? new Date(a.timestamp).toLocaleString() : 'Recent',
            reviewData: a.answers || []
          }));
          setAttempts(serverFormatted);
        } else {
          setAttempts(localAttempts);
        }
      })
      .catch(() => {
        setAttempts(localAttempts);
      });

    setStudentRoster(roster);
  }, []);

  const filteredRoster = studentRoster.filter(s =>
    s.studentName.toLowerCase().includes(search.toLowerCase()) ||
    s.studentEmail.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAttempts = attempts.filter(a =>
    (a.studentName || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.studentEmail || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.topicTitle || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalTests = attempts.length;
  const avgScore = totalTests > 0 ? Math.round(attempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / totalTests) : 0;
  const passRate = totalTests > 0 ? Math.round((attempts.filter(a => a.passed).length / totalTests) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-slate-50 text-slate-900 pb-20 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-black border border-sky-200 mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
              <span>INC CBME Continuous Internal Assessment Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Student Assessment Records & Audit
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Complete student performance history, course completion percentages, and chapter-wise marks.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Roster & Completion ({studentRoster.length})
            </button>
            <button
              onClick={() => setActiveTab('attempts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'attempts'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Test Attempts ({attempts.length})
            </button>
          </div>
        </div>

        {/* Telemetry Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Submissions</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{totalTests}</p>
            <span className="text-[10px] text-slate-500 font-semibold">Across all 12 modules</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Enrolled Students</span>
            <p className="text-2xl sm:text-3xl font-black text-sky-600 mt-1">{studentRoster.length || 1}</p>
            <span className="text-[10px] text-slate-500 font-semibold">Active cohort accounts</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Cohort Score</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{avgScore}%</p>
            <span className="text-[10px] text-slate-500 font-semibold">Cumulative average</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Competency Pass Rate</span>
            <p className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">{passRate}%</p>
            <span className="text-[10px] text-slate-500 font-semibold">Passing threshold ≥ 75%</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, email, or module..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* TAB 1: STUDENT ROSTER (Shows Course Completion & Allows Opening Complete History) */}
        {activeTab === 'roster' && (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Student Name & Account</th>
                    <th className="px-6 py-4">Course Completion</th>
                    <th className="px-6 py-4">Tests Attempted</th>
                    <th className="px-6 py-4">Average Score</th>
                    <th className="px-6 py-4">Grand Final Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRoster.length > 0 ? (
                    filteredRoster.map((student, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-black flex items-center justify-center shrink-0">
                              {student.studentName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-900 text-xs sm:text-sm">{student.studentName}</p>
                              <p className="text-[11px] text-slate-400">{student.studentEmail}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="w-40 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span>{student.completedUnitsCount} / 12 Units</span>
                              <span className="text-sky-700 font-black">{student.completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-sky-500 to-indigo-600 h-2 rounded-full"
                                style={{ width: `${student.completionPercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 font-bold text-slate-900">
                          {student.totalAttempts} Submissions
                        </td>

                        <td className="px-6 py-4">
                          <span className={`font-black text-sm ${student.averageScore >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {student.averageScore}%
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {student.completionPercentage >= 100 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>Unlocked (Eligible)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              <span>Locked ({12 - student.completedUnitsCount} left)</span>
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-extrabold text-xs border border-sky-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Complete History</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-slate-400 text-xs">
                        No student assessments found. Complete a chapter quiz in the student view to record test data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ALL TEST ATTEMPTS LIST */}
        {activeTab === 'attempts' && (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Assessment Module</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Time Spent</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAttempts.length > 0 ? (
                    filteredAttempts.map((att, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-extrabold text-slate-900">{att.studentName}</p>
                          <p className="text-[11px] text-slate-400">{att.studentEmail}</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">{att.topicTitle}</td>
                        <td className="px-6 py-4 font-black text-sm text-slate-900">{att.percentage}%</td>
                        <td className="px-6 py-4 font-mono text-slate-600">{att.timeSpentFormatted || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {att.passed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{att.passed ? 'Passed (≥75%)' : 'Needs Review'}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium">{new Date(att.completedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-slate-400 text-xs">
                        No attempts recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: COMPLETE STUDENT ASSESSMENT HISTORY */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {selectedStudent.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Academic History: {selectedStudent.studentName}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedStudent.studentEmail}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Summary inside Modal */}
              <div className="p-6 border-b border-slate-100 bg-sky-50/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Course Completion</span>
                  <p className="text-lg font-black text-sky-800">
                    {selectedStudent.completedUnitsCount} of 12 Units Mastered ({selectedStudent.completionPercentage}%)
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Score</span>
                  <p className="text-lg font-black text-emerald-600">{selectedStudent.averageScore}%</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Attempts</span>
                  <p className="text-lg font-black text-slate-900">{selectedStudent.totalAttempts}</p>
                </div>
              </div>

              {/* List of all test attempts */}
              <div className="p-6 overflow-y-auto space-y-3 flex-1">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  Chronological Assessment Attempts ({selectedStudent.attempts.length})
                </h4>

                {selectedStudent.attempts.map((att, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-200/90 hover:border-sky-300 bg-white transition-all space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {att.topicTitle}
                        </h5>
                        <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(att.completedAt).toLocaleString()}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>Duration: {att.timeSpentFormatted}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className={`text-base font-black ${att.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {att.score} / {att.totalQuestions} ({att.percentage}%)
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {att.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs text-slate-800 transition-colors cursor-pointer"
                >
                  Close History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyResults;
