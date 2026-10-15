import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import apiClient from '../../api/client';
import { getMemoryStats, getLocalMemories, clearClientMemory } from '../../services/openaiMemoryCache';
import {
  Bot,
  Search,
  Sparkles,
  Clock,
  Zap,
  Coins,
  TrendingUp,
  Database,
  Trash2,
  RefreshCw,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';

export const ChatLogsView = () => {
  const [activeTab, setActiveTab] = useState('memories'); // 'memories' | 'telemetry'
  const [stats, setStats] = useState({
    totalStored: 0,
    totalHits: 0,
    totalTokensSaved: 0,
    estimatedCostSavedUsd: 0,
    hitRatePercentage: 0
  });
  const [memoryEntries, setMemoryEntries] = useState([]);
  const [chatLogs, setChatLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Backend Stats & Entries
      const statsRes = await apiClient('/api/ai/stats');
      if (statsRes && statsRes.success && statsRes.stats) {
        setStats(statsRes.stats);
      } else {
        setStats(getMemoryStats());
      }

      const entriesRes = await apiClient('/api/ai/entries?limit=50');
      if (entriesRes && entriesRes.success && entriesRes.entries) {
        setMemoryEntries(entriesRes.entries);
      } else {
        setMemoryEntries(getLocalMemories());
      }

      // 2. Fetch Chat Logs from telemetry
      const savedLogs = localStorage.getItem('nursing_chat_logs');
      if (savedLogs) {
        setChatLogs(JSON.parse(savedLogs));
      } else {
        setChatLogs([
          {
            id: 'log-1',
            userName: 'Elena Rostova',
            userEmail: 'elena@nursing.edu',
            query: 'Can you explain the difference between SGLT1 and GLUT2 in carbohydrate absorption?',
            path: '/absorption-of-carb',
            fromMemory: true,
            tokens: 0,
            tokensSaved: 380,
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
          },
          {
            id: 'log-2',
            userName: 'David Kim',
            userEmail: 'david@nursing.edu',
            query: 'What are the classic clinical signs of Diabetes Mellitus Type 1 (polyuria, polydipsia, polyphagia)?',
            path: '/DiabetesMellitusType1',
            fromMemory: false,
            tokens: 340,
            tokensSaved: 0,
            timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
          },
          {
            id: 'log-3',
            userName: 'Amina Al-Mansoor',
            userEmail: 'amina@nursing.edu',
            query: 'How are carbs digested in the body?',
            path: '/DigestionOfCarb',
            fromMemory: true,
            tokens: 0,
            tokensSaved: 360,
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
          }
        ]);
      }
    } catch {
      setStats(getMemoryStats());
      setMemoryEntries(getLocalMemories());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClearCache = async () => {
    if (window.confirm('Are you sure you want to flush the OpenAI memory cache and reset token counters?')) {
      clearClientMemory();
      try {
        await apiClient('/api/ai/clear', { method: 'POST' });
      } catch {}
      loadData();
    }
  };

  const filteredMemories = memoryEntries.filter(
    (m) =>
      m.query?.toLowerCase().includes(search.toLowerCase()) ||
      m.response?.toLowerCase().includes(search.toLowerCase()) ||
      m.category?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLogs = chatLogs.filter(
    (l) =>
      l.userName?.toLowerCase().includes(search.toLowerCase()) ||
      l.query?.toLowerCase().includes(search.toLowerCase()) ||
      l.path?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900 pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>OpenAI Token Memory & Query Telemetry</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active System
                  </span>
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                  Semantic memory cache saves tokens by retrieving stored answers for identical and similar inquiries.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleClearCache}
              className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Memory</span>
            </button>
          </div>
        </div>

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 border border-emerald-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Tokens Saved</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {(stats.totalTokensSaved || 0).toLocaleString()}
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>0 Tokens consumed on hits</span>
            </p>
          </div>

          <div className="bg-white/90 border border-sky-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Memory Cache Hits</span>
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalHits || 0}
            </div>
            <p className="text-xs text-sky-700 font-semibold mt-1">
              Similar queries served from memory
            </p>
          </div>

          <div className="bg-white/90 border border-amber-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Topics In Memory</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalStored || memoryEntries.length}
            </div>
            <p className="text-xs text-amber-700 font-semibold mt-1">
              Semantic vectors stored in memory
            </p>
          </div>

          <div className="bg-white/90 border border-purple-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">API Cost Saved</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              ${(stats.estimatedCostSavedUsd || 0).toFixed(4)}
            </div>
            <p className="text-xs text-purple-700 font-semibold mt-1">
              OpenAI API expenses saved
            </p>
          </div>
        </div>

        {/* Tab & Search Bar */}
        <div className="bg-white/95 border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('memories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'memories'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🧠 Stored Memories ({memoryEntries.length})
            </button>
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              📜 Query Telemetry ({chatLogs.length})
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cached questions or responses..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* TAB 1: STORED SEMANTIC MEMORIES */}
        {activeTab === 'memories' && (
          <div className="space-y-4">
            {filteredMemories.length === 0 ? (
              <div className="text-center py-12 bg-white/80 border border-slate-200 rounded-2xl p-8">
                <Database className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
                <h3 className="font-bold text-slate-700 text-sm">No memories stored yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  When students ask clinical questions in the AI Tutor, they will be saved here automatically. Subsequent similar inquiries will fetch from this memory at 0 tokens.
                </p>
              </div>
            ) : (
              filteredMemories.map((entry, idx) => (
                <div
                  key={entry._id || entry.id || idx}
                  className="bg-white/95 border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 shadow-sm transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{entry.hitCount || 0} Cache Hits</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {entry.category || 'General'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                        Model: {entry.model || 'gpt-3.5-turbo'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                      <span className="text-emerald-700 font-bold">
                        Tokens Saved: {((entry.tokensSaved || 0) || (entry.hitCount || 0) * (entry.totalTokens || 350)).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'Active'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-2.5">
                    <span className="font-bold text-xs text-emerald-800 block mb-0.5">Stored Question:</span>
                    <p className="text-xs font-semibold text-slate-900">"{entry.query}"</p>
                  </div>

                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3.5 text-xs leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap font-sans">
                    {entry.response}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: QUERY TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="bg-white/95 border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                      {(log.userName || 'S')[0]}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{log.userName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      {log.path || '/syllabus'}
                    </span>
                    {log.fromMemory ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        0 Tokens Used (Memory Hit)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                        {log.tokens || 320} Tokens Used
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-800 font-medium mt-2">
                  <span className="font-bold text-emerald-700">Prompt: </span>
                  "{log.query}"
                </div>

                {log.response && (
                  <p className="text-[11px] text-slate-500 mt-2 px-1 line-clamp-2">
                    {log.response}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLogsView;
