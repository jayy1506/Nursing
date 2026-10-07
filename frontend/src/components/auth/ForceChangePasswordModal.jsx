import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForceChangePasswordModal = () => {
  const { currentUser, updateUserPassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Only show if user is logged in, not master admin, and isDefaultPassword is true
  const isProtectedAdmin = currentUser?.email?.toLowerCase() === 'jthakre62@gmail.com';
  const needsPasswordChange = currentUser && currentUser.isDefaultPassword && !isProtectedAdmin;

  if (!needsPasswordChange) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword === 'Srm123') {
      setError('New password cannot be the default password "Srm123".');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (updateUserPassword) {
        await updateUserPassword(newPassword);
      }
      setSuccess(true);
      setTimeout(() => {
        // Will close automatically since isDefaultPassword becomes false
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-emerald-100 blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-400/30">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Security Setup Required
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Welcome to the Nursing Portal! You are currently using a default temporary password (<span className="font-mono font-bold text-amber-700">Srm123</span>). Please create a secure password to continue.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <p className="flex-1">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <p className="flex-1">Password updated successfully! Redirecting...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Save New Password</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForceChangePasswordModal;
