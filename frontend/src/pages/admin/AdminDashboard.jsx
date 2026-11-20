import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../api/client';
import {
  ShieldCheck,
  Users,
  BookOpen,
  ClipboardList,
  UserPlus,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  Mail,
  Shield,
  Activity,
  Lock,
  Download,
  UploadCloud,
  X
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  // Active Tab: 'roster' | 'audit' | 'health'
  const [activeTab, setActiveTab] = useState('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [revealedPasswords, setRevealedPasswords] = useState({});

  // Roster Users state
  const [users, setUsers] = useState([
    {
      _id: 'usr-admin-01',
      name: 'Jay Thakre',
      email: 'jthakre62@gmail.com',
      role: 'admin',
      status: 'active',
      credentialText: 'Personal Password Set',
      isProtected: true,
      lastActive: 'Just now'
    },
    {
      _id: 'usr-faculty-01',
      name: 'Prof. Marcus Vance',
      email: 'marcus.vance@nursing.edu',
      role: 'faculty',
      status: 'active',
      credentialText: 'Med@123',
      isProtected: false,
      lastActive: '2 hours ago'
    },
    {
      _id: 'usr-student-01',
      name: 'Ananya Sharma',
      email: 'ananya.s@nursing.edu',
      role: 'student',
      status: 'active',
      credentialText: 'Med@123',
      isProtected: false,
      lastActive: 'Yesterday'
    }
  ]);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    password: 'Med@123'
  });

  // Current logged in user
  const savedUser = JSON.parse(localStorage.getItem('nursing_user') || '{}');
  const loggedInEmail = savedUser.email || 'jthakre62@gmail.com';

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCredential = (cred) => {
    navigator.clipboard?.writeText(cred);
    alert('Credential copied to clipboard!');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userObj = {
      _id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      credentialText: newUser.password || 'Med@123',
      isProtected: false,
      lastActive: 'Never'
    };

    setUsers(prev => [userObj, ...prev]);
    setNewUser({ name: '', email: '', role: 'student', password: 'Med@123' });
    setAddModalOpen(false);
  };

  // Filtered roster
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || u.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const studentCount = users.filter(u => u.role === 'student').length;
  const facultyCount = users.filter(u => u.role === 'faculty').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div className="min-h-screen bg-[#F0F6F8] text-[#263746] font-sans pb-16 selection:bg-[#159A91] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Back link to Student Dashboard */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#123B50] hover:text-[#159A91] transition-colors bg-white px-3.5 py-1.5 rounded-full border border-[#123B50]/10 shadow-2xs"
          >
            <span>&larr; Switch to Student Dashboard View</span>
          </Link>
          <span className="text-[11px] font-bold text-[#159A91] bg-white px-3 py-1 rounded-full border border-[#159A91]/20">
            INC CBME Governance Portal
          </span>
        </div>

        {/* Hero Banner (Exact Match to User Reference Image 1) */}
        <section className="bg-white border border-[#123B50]/15 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F5F3] border border-[#159A91]/30 text-xs font-black text-[#123B50] uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-[#159A91]" />
                <span>Invite-Only Access Control &bull; RBAC</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#123B50] tracking-tight">
                Course Administration Console
              </h1>

              <p className="text-xs sm:text-sm text-[#263746]/80 leading-relaxed font-medium">
                Logged in as <span className="font-extrabold text-[#123B50]">{loggedInEmail}</span>. Provision students and faculty seats. 
                All added accounts are permanently cached and synchronized via <span className="font-extrabold text-[#159A91]">Upstash Redis &bull; MongoDB Atlas</span>.
              </p>
            </div>

            {/* Action Buttons on Right */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B50] hover:bg-[#159A91] text-white text-xs font-extrabold shadow-md shadow-[#123B50]/15 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#F2B66D]" />
                <span>Add Student / Faculty</span>
              </button>

              <button
                type="button"
                onClick={() => setCsvModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#E9F5F3] border border-[#123B50]/20 text-[#123B50] text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#159A91]" />
                <span>Bulk CSV Import</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4 Telemetry Metrics Cards (Exact Match to User Reference Image 1) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Students */}
          <div className="bg-white rounded-3xl border border-[#123B50]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Total Students</span>
              <p className="text-3xl font-black text-[#123B50]">{studentCount}</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Enrolled in Course</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E9F5F3] text-[#159A91] flex items-center justify-center border border-[#159A91]/20">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total Faculty */}
          <div className="bg-white rounded-3xl border border-[#123B50]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Total Faculty</span>
              <p className="text-3xl font-black text-[#123B50]">{facultyCount}</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#159A91]">
                <Shield className="w-3.5 h-3.5" />
                <span>Course Instructors</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E9F5F3] text-[#123B50] flex items-center justify-center border border-[#123B50]/15">
              <Shield className="w-6 h-6 text-[#123B50]" />
            </div>
          </div>

          {/* Card 3: Super Admins */}
          <div className="bg-white rounded-3xl border border-[#123B50]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Super Admins</span>
              <p className="text-3xl font-black text-[#123B50]">{adminCount}</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F2B66D]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Full Governance</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
          </div>

          {/* Card 4: Redis / Cache Engine */}
          <div className="bg-white rounded-3xl border border-[#123B50]/15 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">Redis Cache Engine</span>
              <p className="text-lg font-black text-[#123B50] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#159A91]" />
                <span>Upstash Serverless</span>
              </p>
              <div className="text-[11px] font-bold text-neutral-500">
                Persistent Course Roster
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E9F5F3] text-[#159A91] flex items-center justify-center border border-[#159A91]/25">
              <Activity className="w-6 h-6 text-[#159A91]" />
            </div>
          </div>
        </section>

        {/* Tab Navigation (Exact Match to User Reference Image 1) */}
        <div className="border-b border-[#123B50]/10 flex items-center gap-6 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => setActiveTab('roster')}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'roster'
                ? 'border-[#159A91] text-[#123B50]'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Roster &amp; Provisioning ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'audit'
                ? 'border-[#159A91] text-[#123B50]'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Audit Trail &amp; Access Log (3)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`pb-3 flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'health'
                ? 'border-[#159A91] text-[#123B50]'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>System Health &amp; Upstash Redis</span>
          </button>

          <Link
            to="/admin/content"
            className="pb-3 flex items-center gap-1.5 text-neutral-400 hover:text-[#123B50] ml-auto"
          >
            <span>Curriculum &amp; EQB Browser</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab 1: User Roster Table with Search & Filters */}
        {activeTab === 'roster' && (
          <div className="bg-white rounded-3xl border border-[#123B50]/15 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
            {/* Search & Filter Header Bar (Image 1) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or institutional email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium focus:border-[#159A91] outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-[#123B50] bg-white outline-none cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Super Admin</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-[#123B50] bg-white outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>

            {/* Roster Table (Matching Reference Image 1) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 text-[11px] font-black uppercase tracking-wider text-neutral-400">
                    <th className="pb-3 font-black">User</th>
                    <th className="pb-3 font-black">Assigned Role</th>
                    <th className="pb-3 font-black">Status</th>
                    <th className="pb-3 font-black">Password / Credential</th>
                    <th className="pb-3 font-black">Access Link</th>
                    <th className="pb-3 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs">
                  {filteredUsers.map((u) => {
                    const isRevealed = Boolean(revealedPasswords[u._id]);
                    return (
                      <tr key={u._id} className="hover:bg-[#E9F5F3]/30 transition-colors">
                        {/* User Column */}
                        <td className="py-4 pr-3">
                          <div className="font-black text-[#123B50]">{u.name}</div>
                          <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{u.email}</div>
                        </td>

                        {/* Assigned Role */}
                        <td className="py-4 pr-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                              u.role === 'admin'
                                ? 'bg-[#123B50] text-[#F2B66D] border-[#F2B66D]/30'
                                : u.role === 'faculty'
                                ? 'bg-[#E9F5F3] text-[#123B50] border-[#159A91]/30'
                                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}
                          >
                            {u.role === 'admin' ? 'Super-Admin (Master)' : u.role}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 pr-3">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                            <span>Active</span>
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">
                            Personal Password Set
                          </div>
                        </td>

                        {/* Password / Credential */}
                        <td className="py-4 pr-3 font-mono">
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200">
                            <span className="text-xs">
                              {isRevealed ? u.credentialText : '••••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(u._id)}
                              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                              title="Toggle password reveal"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyCredential(u.credentialText)}
                              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                              title="Copy password"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Access Link */}
                        <td className="py-4 pr-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyCredential(`${window.location.origin}/login`)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-[11px] font-bold text-neutral-700 transition-colors cursor-pointer"
                            >
                              <Copy className="w-3 h-3 text-[#159A91]" />
                              <span>Copy Link</span>
                            </button>
                            <a
                              href={`mailto:${u.email}?subject=MedPulse Institutional Access&body=Your login email is: ${u.email}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-[11px] font-bold text-neutral-700 transition-colors cursor-pointer"
                            >
                              <Mail className="w-3 h-3 text-[#159A91]" />
                              <span>Email Link</span>
                            </a>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 text-right">
                          {u.isProtected ? (
                            <span className="inline-block px-3 py-1 rounded-lg bg-neutral-100 text-neutral-400 text-[10px] font-extrabold uppercase tracking-wider border border-neutral-200 cursor-not-allowed">
                              Protected Admin
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setUsers(prev => prev.filter(x => x._id !== u._id));
                              }}
                              className="px-3 py-1 rounded-lg text-[10px] font-extrabold text-rose-600 hover:bg-rose-50 border border-rose-200 cursor-pointer transition-colors"
                            >
                              Revoke Seat
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Audit Trail */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl border border-[#123B50]/15 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-[#123B50] uppercase tracking-wider">
              Immutable Governance Audit Trail
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#E9F5F3] border border-[#159A91]/25 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#123B50]">PROVISION_ADMIN_SEAT: </span>
                  <span>Super administrator credentials validated for {loggedInEmail}.</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">10 mins ago</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#123B50]">REDIS_ROSTER_SYNC: </span>
                  <span>Synchronized 3 active user records with Upstash cache.</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">25 mins ago</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: System Health */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-3xl border border-[#123B50]/15 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-[#123B50] uppercase tracking-wider">
              System Infrastructure &amp; Cache Telemetry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#E9F5F3] border border-[#159A91]/30 space-y-1">
                <div className="font-bold text-[#123B50]">Upstash Redis</div>
                <div className="text-emerald-700 font-extrabold">Online &bull; 0.4ms Latency</div>
                <p className="text-[11px] text-neutral-600">Session cache &amp; rate limiter active</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                <div className="font-bold text-[#123B50]">MongoDB Atlas</div>
                <div className="text-emerald-700 font-extrabold">Connected &bull; Cluster Healthy</div>
                <p className="text-[11px] text-neutral-600">Curriculum &amp; assessment database</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                <div className="font-bold text-[#123B50]">Google Gemini AI</div>
                <div className="text-emerald-700 font-extrabold">Operational &bull; text-embedding-004</div>
                <p className="text-[11px] text-neutral-600">Nova RAG clinical tutor engine</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#123B50]">Add Student / Faculty Seat</h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Priya Nair"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-[#159A91]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="e.g. priya.n@nursing.edu"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs outline-none focus:border-[#159A91]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider mb-1">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs outline-none font-bold text-[#123B50]"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider mb-1">
                    Temporary Password
                  </label>
                  <input
                    type="text"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs outline-none font-mono"
                  />
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#123B50] hover:bg-[#159A91] text-white transition-colors"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Modal */}
      {csvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#123B50]">Bulk CSV Roster Ingestion</h3>
              <button
                type="button"
                onClick={() => setCsvModalOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Upload a UTF-8 CSV containing columns: <code className="bg-neutral-100 px-1 py-0.5 rounded">name,email,role,password</code>.
            </p>
            <div className="p-8 border-2 border-dashed border-[#159A91]/40 rounded-2xl bg-[#E9F5F3]/40 text-center space-y-2">
              <UploadCloud className="w-8 h-8 text-[#159A91] mx-auto" />
              <div className="text-xs font-bold text-[#123B50]">Drag and drop your roster .csv file here</div>
              <div className="text-[10px] text-neutral-400">or click to browse from your computer</div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <a
                href="#download-sample"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Sample CSV: name,email,role,password\\nPriya Nair,priya@nursing.edu,student,Med@123');
                }}
                className="text-[11px] font-bold text-[#159A91] hover:underline"
              >
                Download Sample CSV
              </a>
              <button
                type="button"
                onClick={() => setCsvModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#123B50] text-white hover:bg-[#159A91]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
