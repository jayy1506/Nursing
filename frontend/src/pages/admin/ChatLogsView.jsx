import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Bot, MessageSquare, Search, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const ChatLogsView = () => {
  const [logs] = useState([
    {
      id: 'log-1',
      studentName: 'Elena Rostova',
      query: 'Can you explain the difference between SGLT1 and GLUT2 in carbohydrate absorption?',
      route: '/absorption-of-carb',
      timestamp: '10 mins ago',
      tokens: 280
    },
    {
      id: 'log-2',
      studentName: 'David Kim',
      query: 'What are the classic clinical signs of Diabetes Mellitus Type 1 (polyuria, polydipsia, polyphagia)?',
      route: '/DiabetesMellitusType1',
      timestamp: '45 mins ago',
      tokens: 340
    },
    {
      id: 'log-3',
      studentName: 'Amina Al-Mansoor',
      query: 'Why are essential fatty acids like linoleic acid required in the human diet?',
      route: '/EssentialFattyAcids',
      timestamp: '2 hours ago',
      tokens: 215
    }
  ]);

  const [search, setSearch] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.studentName.toLowerCase().includes(search.toLowerCase()) ||
      l.query.toLowerCase().includes(search.toLowerCase()) ||
      l.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-emerald-600" />
            <span>AI Nursing Tutor Query Telemetry</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Real-time telemetry and student inquiries directed to the AI Clinical Tutor.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl p-4 shadow-sm mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search queries or students..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {filtered.map((log) => (
            <div key={log.id} className="bg-white/95 border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    {log.studentName[0]}
                  </div>
                  <span className="font-bold text-xs text-slate-900">{log.studentName}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    {log.route}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{log.timestamp}</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-800 font-medium mt-2">
                <span className="font-bold text-emerald-700">Prompt: </span>
                "{log.query}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatLogsView;
