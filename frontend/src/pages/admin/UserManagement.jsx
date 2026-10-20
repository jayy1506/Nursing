import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import apiClient from '../../api/client';
import { provisionFirebaseUser } from '../../config/firebase';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Shield,
  GraduationCap,
  Stethoscope,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  KeyRound,
  ShieldCheck,
  UploadCloud,
  FileText,
  Download
} from 'lucide-react';

const PRIMARY_ADMIN_NAME = 'Aachal Karande';
const PRIMARY_ADMIN_EMAIL = 'karandeaachal@gmail.com';

const SECONDARY_ADMIN_NAME = 'Jay Thakre';
const SECONDARY_ADMIN_EMAIL = 'jthakre62@gmail.com';

const PROTECTED_ADMIN_EMAILS = [PRIMARY_ADMIN_EMAIL, SECONDARY_ADMIN_EMAIL].filter(Boolean);
const isProtectedAdminEmail = (email) => PROTECTED_ADMIN_EMAILS.includes(email?.toLowerCase()?.trim());

const DEFAULT_USERS = [
  {
    _id: 'usr-admin-01',
    name: PRIMARY_ADMIN_NAME,
    email: PRIMARY_ADMIN_EMAIL,
    role: 'admin',
    status: 'active',
    isDefaultPassword: false,
    isProtected: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'usr-admin-02',
    name: SECONDARY_ADMIN_NAME,
    email: SECONDARY_ADMIN_EMAIL,
    role: 'admin',
    status: 'active',
    isDefaultPassword: false,
    isProtected: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'usr-faculty-02',
    name: 'Prof. Marcus Vance',
    email: 'faculty@nursing-lms.edu',
    password: 'Srm123',
    role: 'faculty',
    status: 'active',
    isDefaultPassword: true,
    isProtected: false,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'usr-student-03',
    name: 'Elena Rostova (RN Student)',
    email: 'student@nursing-lms.edu',
    password: 'Srm123',
    role: 'student',
    status: 'active',
    isDefaultPassword: true,
    isProtected: false,
    createdAt: new Date().toISOString()
  }
];

export const UserManagement = () => {
  // Always load from persistent memory / localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('nursing_admin_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default system admins are always present and protected
        let list = parsed;
        if (!list.some((u) => u.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL)) {
          list = [DEFAULT_USERS[0], ...list];
        }
        if (!list.some((u) => u.email?.toLowerCase() === SECONDARY_ADMIN_EMAIL)) {
          list = [DEFAULT_USERS[1], ...list];
        }
        return list;
      }
    } catch {
      // ignore
    }
    return DEFAULT_USERS;
  });

  // Save to persistent storage on every change
  useEffect(() => {
    localStorage.setItem('nursing_admin_users', JSON.stringify(users));
  }, [users]);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [csvInput, setCsvInput] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Form for adding user with default password Srm123
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: 'Srm123',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleBulkImport = async (e) => {
    e.preventDefault();
    if (!csvInput.trim()) return;

    setBulkLoading(true);
    setImportResult(null);

    try {
      const res = await apiClient('/api/users/bulk-import', {
        method: 'POST',
        body: JSON.stringify({ csvContent: csvInput })
      });

      if (res && res.success) {
        setImportResult(res);
        if (res.importedUsers && res.importedUsers.length > 0) {
          setUsers((prev) => [...res.importedUsers, ...prev]);
        }
        setMessage({
          type: res.importedCount > 0 ? 'success' : 'error',
          text: `Bulk Import Result: ${res.importedCount} user(s) imported successfully. ${res.failedCount > 0 ? `${res.failedCount} row(s) had errors.` : ''}`
        });
      } else {
        setMessage({
          type: 'error',
          text: res.error || 'Failed to process bulk import.'
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error processing bulk import' });
    } finally {
      setBulkLoading(false);
    }
  };

  const handleCsvFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvInput(event.target?.result || '');
    };
    reader.readAsText(file);
  };

  const loadSampleCsv = () => {
    const sample = `name,email,role,password,collegeId
Elena Rostova,elena.rostova@nursing-lms.edu,student,StudentPass@2026,COLLEGE_001
Prof. Marcus Vance,marcus.vance@nursing-lms.edu,faculty,FacultyPass@2026,COLLEGE_001
Sarah Connor,sarah.connor@nursing-lms.edu,student,StudentPass@2026,COLLEGE_001
Dr. Gregory House,house@nursing-lms.edu,faculty,FacultyPass@2026,COLLEGE_001`;
    setCsvInput(sample);
  };

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      setMessage({ type: 'error', text: 'Please provide full name and email address.' });
      return;
    }

    const emailNorm = newUser.email.toLowerCase().trim();
    if (users.some((u) => u.email?.toLowerCase() === emailNorm)) {
      setMessage({ type: 'error', text: 'A user with this email already exists.' });
      return;
    }

    setLoading(true);

    const userObj = {
      _id: `usr-${Date.now()}`,
      name: newUser.name.trim(),
      email: emailNorm,
      password: newUser.password || 'Srm123',
      role: newUser.role,
      status: 'active',
      isDefaultPassword: true, // Requires password change on first login
      isProtected: ['jthakre62@gmail.com', 'karandeaachal@gmail.com'].includes(emailNorm),
      createdAt: new Date().toISOString()
    };

    // 1. Directly register account into Firebase Auth & Firestore
    const fbRes = await provisionFirebaseUser(
      userObj.email,
      userObj.password,
      userObj.name,
      userObj.role
    );

    if (fbRes.uid) {
      userObj.firebaseUid = fbRes.uid;
    }

    // 2. Update persistent state in memory
    setUsers((prev) => [userObj, ...prev]);

    if (fbRes.success) {
      setMessage({
        type: 'success',
        text: `Account "${userObj.name}" (${userObj.email}) registered directly in Firebase Auth with default password "${userObj.password}".`
      });
    } else if (fbRes.code === 'auth/email-already-in-use') {
      setMessage({
        type: 'success',
        text: `User "${userObj.name}" (${userObj.email}) added to portal directory (Firebase Auth credentials already active).`
      });
    } else {
      setMessage({
        type: 'success',
        text: `User "${userObj.name}" added to portal directory with password "${userObj.password}".`
      });
    }

    setShowAddModal(false);
    setNewUser({ name: '', email: '', password: 'Srm123', role: 'student' });
    setLoading(false);

    // Sync in background to backend
    apiClient('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userObj)
    }).catch(() => {});
  };

  const handleRoleChange = (userId, newRole) => {
    const targetUser = users.find((u) => u._id === userId);
    // Protected Admin can NOT be demoted or promoted
    if (['jthakre62@gmail.com', 'karandeaachal@gmail.com'].includes(targetUser?.email?.toLowerCase())) {
      setMessage({
        type: 'error',
        text: `Admin role for ${targetUser.email} is permanent and cannot be modified.`
      });
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
    setMessage({ type: 'success', text: `Role updated to ${newRole}.` });
  };

  const handleToggleStatus = (userId) => {
    const targetUser = users.find((u) => u._id === userId);
    if (['jthakre62@gmail.com', 'karandeaachal@gmail.com'].includes(targetUser?.email?.toLowerCase())) {
      setMessage({ type: 'error', text: 'Admin account cannot be disabled.' });
      return;
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u._id === userId) {
          const nextStatus = u.status === 'active' ? 'disabled' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId) => {
    const targetUser = users.find((u) => u._id === userId);
    if (['jthakre62@gmail.com', 'karandeaachal@gmail.com'].includes(targetUser?.email?.toLowerCase())) {
      setMessage({ type: 'error', text: 'Admin account is permanent and cannot be removed.' });
      return;
    }

    if (window.confirm(`Are you sure you want to delete user "${targetUser.name}"?`)) {
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setMessage({ type: 'success', text: 'User removed from system memory.' });
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b bg-neutral-100 via-white to-green-50 text-neutral-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Persistent User & Security Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <span>User, Faculty & Credentials Control</span>
            </h1>
            <p className="text-neutral-600 text-xs sm:text-sm mt-1">
              Admin provision portal with real-time credential viewing, default password assignments, and role enforcement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => {
                const headers = ['Name', 'Email', 'Role', 'Status', 'CreatedAt'];
                const rows = filteredUsers.map(u => [
                  `"${u.name || ''}"`,
                  `"${u.email || ''}"`,
                  `"${u.role || ''}"`,
                  `"${u.status || 'active'}"`,
                  `"${u.createdAt || ''}"`
                ]);
                const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `medpulse_users_${new Date().toISOString().slice(0, 10)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-neutral-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                setImportResult(null);
                setShowBulkImportModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer border border-neutral-700"
            >
              <UploadCloud className="w-4 h-4 text-green-400" />
              <span>Bulk CSV Import</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Student / Faculty</span>
            </button>
          </div>
        </div>

        {/* Feedback Messages */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in duration-200 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-100 text-green-700'
                : 'bg-neutral-100 border border-neutral-400 text-black dark:text-white'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-black dark:text-white" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white/90 border border-neutral-200 rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-10 pr-4 text-xs text-neutral-900 focus:outline-none focus:border-green-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Role:
            </span>
            {['all', 'student', 'faculty', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  roleFilter === r
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Users */}
        <div className="bg-white/95 border border-neutral-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-bold text-[10px] border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Current Password (Admin View)</th>
                  <th className="px-6 py-4">Role Promotion / Demotion</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredUsers.map((user) => {
                  const isAdminProtected = ['jthakre62@gmail.com', 'karandeaachal@gmail.com'].includes(user.email?.toLowerCase());
                  const isPassVisible = visiblePasswords[user._id];

                  return (
                    <tr key={user._id} className="hover:bg-neutral-50/60 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase shadow-sm ${
                              isAdminProtected
                                ? 'bg-gradient-to-tr from-neutral-800 to-neutral-800 text-white ring-2 ring-neutral-400'
                                : 'bg-gradient-to-tr from-green-500 to-green-500 text-white'
                            }`}
                          >
                            {user.name ? user.name[0] : 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-neutral-900">{user.name}</p>
                              {isAdminProtected && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-neutral-100 text-neutral-800 border border-neutral-300">
                                  MASTER ADMIN
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-neutral-400">
                              {user.isDefaultPassword ? (
                                <span className="text-neutral-800 font-semibold">• One-Time Change Pending</span>
                              ) : (
                                <span className="text-green-500 font-semibold">• Password Customized</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 font-medium text-neutral-600">{user.email}</td>

                      {/* Password with Eye Toggle */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 bg-neutral-100 rounded-lg border border-neutral-200 text-neutral-800">
                            {isPassVisible ? (user.password || 'Srm123') : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user._id)}
                            className="p-1 text-neutral-400 hover:text-neutral-700 rounded transition-colors cursor-pointer"
                            title={isPassVisible ? 'Hide Password' : 'Show Password'}
                          >
                            {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Role Selector */}
                      <td className="px-6 py-4">
                        {isAdminProtected ? (
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-neutral-100 text-neutral-800 border border-neutral-300">
                            Admin (Fixed)
                          </span>
                        ) : (
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className={`text-xs font-bold rounded-full px-3 py-1 border focus:outline-none cursor-pointer transition-colors ${
                              user.role === 'faculty'
                                ? 'bg-neutral-100 text-green-700 border-neutral-300 border-neutral-300'
                                : 'bg-green-50 text-green-700 border-green-100 hover:border-green-400'
                            }`}
                          >
                            <option value="student">Student (Learner)</option>
                            <option value="faculty">Faculty (Author)</option>
                          </select>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isAdminProtected ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Always Active
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(user._id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                : 'bg-neutral-100 text-black dark:text-white hover:bg-neutral-100'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === 'active' ? 'bg-green-500' : 'bg-black dark:bg-white'
                              }`}
                            ></span>
                            {user.status === 'active' ? 'Active' : 'Disabled'}
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        {!isAdminProtected && (
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-1.5 text-neutral-400 hover:text-black dark:text-white hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* Modal: Add User with Default Password Srm123 */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-neutral-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-green-500" />
                  <span>Provision Student or Faculty</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="e.g. Dr. Jordan Henderson"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-green-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="jordan@hospital.edu"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-green-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-neutral-700">Assigned Password</label>
                    <span className="text-[10px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded">
                      Default: Srm123
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-900 font-mono font-bold focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    User will be prompted for a mandatory one-time password update on first login.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Assign Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-green-500 cursor-pointer"
                  >
                    <option value="student">Student (Clinical Learner)</option>
                    <option value="faculty">Faculty (Course Author & Auditor)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-green-500 hover:bg-green-500 text-white shadow-md shadow-green-400/20 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Provision User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bulk CSV Import Modal with Row Error Breakdown */}
        {showBulkImportModal && (
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-neutral-900">Bulk Import Students & Faculty</h2>
                    <p className="text-[11px] text-neutral-500">Upload or paste CSV with row-level validation & error reporting</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBulkImportModal(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBulkImport} className="space-y-4">
                {/* CSV File Upload / Paste Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-700">CSV Data Source</label>
                    <button
                      type="button"
                      onClick={loadSampleCsv}
                      className="text-[11px] font-bold text-green-500 hover:text-green-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Load Sample Template</span>
                    </button>
                  </div>

                  <div className="mb-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-600 font-medium flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-green-500" />
                      <span>Select .csv file from your computer:</span>
                    </span>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleCsvFileUpload}
                      className="text-xs text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                    />
                  </div>

                  <textarea
                    rows={6}
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    placeholder="name,email,role,password,collegeId&#10;Elena Rostova,elena@medpulse.edu,student,Pass@2026,COLLEGE_001&#10;Prof. Marcus Vance,marcus@medpulse.edu,faculty,Pass@2026,COLLEGE_001"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-3 text-xs font-mono text-neutral-800 focus:outline-none focus:border-green-500 font-medium leading-relaxed"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Columns: <code className="bg-neutral-100 px-1 py-0.5 rounded font-bold text-neutral-600">name, email, role, password, collegeId</code> (password & collegeId optional)
                  </p>
                </div>

                {/* Import Results Box */}
                {importResult && (
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-green-700 bg-green-100/80 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Successfully Imported: {importResult.importedCount}</span>
                      </span>
                      {importResult.failedCount > 0 && (
                        <span className="flex items-center gap-1.5 text-black dark:text-white bg-neutral-100/80 px-2.5 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Failed Rows: {importResult.failedCount}</span>
                        </span>
                      )}
                    </div>

                    {/* Detailed Row-Level Errors */}
                    {importResult.errors && importResult.errors.length > 0 && (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                          Row-Level Error Details:
                        </span>
                        {importResult.errors.map((err, errIdx) => (
                          <div
                            key={errIdx}
                            className="p-2 rounded-xl bg-neutral-100 border border-neutral-400 text-black dark:text-white text-[11px] flex items-start gap-2"
                          >
                            <AlertCircle className="w-3.5 h-3.5 text-black dark:text-white shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold">Row {err.row}</strong> ({err.email}): {err.reason}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setShowBulkImportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={bulkLoading || !csvInput.trim()}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-green-500 hover:bg-green-500 text-white shadow-md shadow-green-400/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{bulkLoading ? 'Processing Import...' : 'Import CSV Users'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
