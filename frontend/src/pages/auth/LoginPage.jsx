import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { currentUser, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;
  const redirectPath = (from && from !== '/login' && from !== '/signup') ? from : '/';

  // If already logged in, redirect immediately to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate(redirectPath, { replace: true });
    }
  }, [currentUser, navigate, redirectPath]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Soft background accents matching frontend */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-16 h-80 w-80 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-emerald-200/70 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 p-[1px] shadow-lg shadow-emerald-400/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center shadow-inner">
                <Sparkles className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                MetaNutriBio AI
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Clinical Nutrition & Biochemistry
              </span>
            </div>
          </Link>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700">
              Welcome Back
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2">Sign in to your guided clinical learning portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 border border-slate-200/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/60">
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <span className="text-base">⚠️</span>
              <p className="flex-1 font-medium">{error}</p>
            </div>
          )}

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold transition-all duration-200 hover:border-slate-300 disabled:opacity-50 shadow-sm hover:shadow mb-5 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.3-.7-.5-1.5-.5-2.4z"
              />
              <path
                fill="#34A853"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 17c1.8 3.7 5.6 6.5 10.1 6.5z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Or with email</span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nurse@hospital.edu"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-sm shadow-lg shadow-emerald-400/30 hover:shadow-emerald-400/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Student and Faculty accounts are created and managed by the <span className="text-slate-800 font-bold">Nursing Administrator</span>.
            </p>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-[11px] font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secured with Firebase Auth & Role-Based Access Control</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
