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
  ShieldCheck
} from 'lucide-react';

const DEFAULT_USERS = [
  {
    _id: 'usr-admin-01',
    name: 'Jay Thakre',
    email: 'jthakre62@gmail.com',
    password: 'Jay@1523',
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
        // Ensure Jay Thakre admin is always present and protected
        const hasAdmin = parsed.some(u => u.email?.toLowerCase() === 'jthakre62@gmail.com');
        if (!hasAdmin) {
          return [DEFAULT_USERS[0], ...parsed];
        }
        return parsed;
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
      isProtected: emailNorm === 'jthakre62@gmail.com',
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
    if (targetUser?.email?.toLowerCase() === 'jthakre62@gmail.com') {
      setMessage({
        type: 'error',
        text: 'Admin role for jthakre62@gmail.com is permanent and cannot be modified.'
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
    if (targetUser?.email?.toLowerCase() === 'jthakre62@gmail.com') {
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
    if (targetUser?.email?.toLowerCase() === 'jthakre62@gmail.com') {
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Persistent User & Security Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>User, Faculty & Credentials Control</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Admin provision portal with real-time credential viewing, default password assignments, and role enforcement.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-400/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student / Faculty</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in duration-200 ${
              message.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Role:
            </span>
            {['all', 'student', 'faculty', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  roleFilter === r
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Users */}
        <div className="bg-white/95 border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Current Password (Admin View)</th>
                  <th className="px-6 py-4">Role Promotion / Demotion</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const isAdminProtected = user.email?.toLowerCase() === 'jthakre62@gmail.com';
                  const isPassVisible = visiblePasswords[user._id];

                  return (
                    <tr key={user._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase shadow-sm ${
                              isAdminProtected
                                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white ring-2 ring-amber-300'
                                : 'bg-gradient-to-tr from-emerald-500 to-sky-500 text-white'
                            }`}
                          >
                            {user.name ? user.name[0] : 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-900">{user.name}</p>
                              {isAdminProtected && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                                  MASTER ADMIN
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400">
                              {user.isDefaultPassword ? (
                                <span className="text-orange-600 font-semibold">• One-Time Change Pending</span>
                              ) : (
                                <span className="text-emerald-600 font-semibold">• Password Customized</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 font-medium text-slate-600">{user.email}</td>

                      {/* Password with Eye Toggle */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200 text-slate-800">
                            {isPassVisible ? (user.password || 'Srm123') : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user._id)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                            title={isPassVisible ? 'Hide Password' : 'Show Password'}
                          >
                            {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Role Selector */}
                      <td className="px-6 py-4">
                        {isAdminProtected ? (
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                            Admin (Fixed)
                          </span>
                        ) : (
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className={`text-xs font-bold rounded-full px-3 py-1 border focus:outline-none cursor-pointer transition-colors ${
                              user.role === 'faculty'
                                ? 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400'
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
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Always Active
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(user._id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              user.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
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
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-600" />
                  <span>Provision Student or Faculty</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="e.g. Dr. Jordan Henderson"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="jordan@hospital.edu"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-700">Assigned Password</label>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Default: Srm123
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    User will be prompted for a mandatory one-time password update on first login.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assign Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="student">Student (Clinical Learner)</option>
                    <option value="faculty">Faculty (Course Author & Auditor)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-400/20 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Provision User'}
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
