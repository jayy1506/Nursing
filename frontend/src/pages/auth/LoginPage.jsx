import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, User, HelpCircle, X } from 'lucide-react';

export const getDestinationForRole = () => '/dashboard';

// Default Seeded Mappings for instant admin & demo resolution
const SEEDED_EMAIL_MAP = {
  'jthakre62@gmail.com': 'Jaythakre',
  'admin': 'Jaythakre',
  'admin@nursing.edu': 'Jaythakre',
  'admin@medpulse.edu': 'Jaythakre'
};

const getKnownUsername = (rawId) => {
  if (!rawId) return '';
  const norm = rawId.trim().toLowerCase();
  if (SEEDED_EMAIL_MAP[norm]) return SEEDED_EMAIL_MAP[norm];
  try {
    const savedMap = JSON.parse(localStorage.getItem('medpulse_email_username_map') || '{}');
    if (savedMap[norm]) return savedMap[norm];
  } catch { }
  return '';
};

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState(() => localStorage.getItem('medpulse_saved_identifier') || '');
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem('medpulse_saved_username') || '';
    const initialId = localStorage.getItem('medpulse_saved_identifier') || '';
    return saved || getKnownUsername(initialId);
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const { currentUser, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  // Auto-fill username whenever email / identifier changes
  useEffect(() => {
    const norm = identifier.trim().toLowerCase();
    if (!norm) return;

    // 1. Instant local lookup
    const localMatch = getKnownUsername(norm);
    if (localMatch) {
      setUsername(localMatch);
      return;
    }

    // 2. Debounced server lookup
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/lookup-username?identifier=${encodeURIComponent(norm)}`);
        const data = await res.json();
        if (data && data.success && data.username) {
          setUsername(data.username);
          // Cache in local dictionary
          const currentMap = JSON.parse(localStorage.getItem('medpulse_email_username_map') || '{}');
          currentMap[norm] = data.username;
          localStorage.setItem('medpulse_email_username_map', JSON.stringify(currentMap));
        }
      } catch { }
    }, 250);

    return () => clearTimeout(timer);
  }, [identifier]);

  // Auto-redirect to /dashboard (or previously intended route) once authenticated
  useEffect(() => {
    if (currentUser) {
      if (from && from !== '/' && from !== '/login') {
        navigate(from, { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [currentUser, navigate, from]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password || !username) {
      setError('Please provide your institutional email, username, and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const trimmedUser = username.trim();
      const trimmedId = identifier.trim();

      // Save username & identifier to localStorage for next time autofill
      localStorage.setItem('medpulse_saved_username', trimmedUser);
      localStorage.setItem('medpulse_saved_identifier', trimmedId);

      // Save mapping permanently for all users: next time same email comes, username auto-enters
      try {
        const currentMap = JSON.parse(localStorage.getItem('medpulse_email_username_map') || '{}');
        currentMap[trimmedId.toLowerCase()] = trimmedUser;
        if (trimmedId.toLowerCase() === 'admin') {
          currentMap['jthakre62@gmail.com'] = trimmedUser;
          currentMap['admin@nursing.edu'] = trimmedUser;
        }
        localStorage.setItem('medpulse_email_username_map', JSON.stringify(currentMap));
      } catch (err) {
        console.warn('Could not store email-username map:', err);
      }

      // If user typed 'admin', resolve to default admin email
      let emailToUse = trimmedId;
      if (emailToUse.toLowerCase() === 'admin') {
        emailToUse = 'jthakre62@gmail.com';
      }

      await login(emailToUse, password);

      // Store username and display name on user object in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('nursing_user') || '{}');
        stored.username = trimmedUser;
        stored.displayName = trimmedUser;
        stored.name = trimmedUser;
        localStorage.setItem('nursing_user', JSON.stringify(stored));
      } catch (e) {
        console.warn('Could not store username:', e);
      }

      // Enter directly to /dashboard as requested
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid institutional email or password. Please verify credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a moment and try again.');
      } else {
        setError(err.message || 'Failed to sign in. Please contact your Course Administrator.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F6F8] text-[#263746] flex flex-col justify-between p-4 sm:p-6 font-sans selection:bg-[#159A91] selection:text-white">
      {/* Top Header */}
      <header className="flex items-center justify-between max-w-xl mx-auto w-full pt-2">
        <Link
          to="/"
          className="text-xs font-bold text-[#123B50] hover:text-[#159A91] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>&larr; Back to Landing Page</span>
        </Link>
        <span className="text-[11px] font-bold text-[#159A91] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-[#159A91]/20">
          INC CBME v2026
        </span>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto py-6">
        {/* Brand & Heading matching user screenshot */}
        <div className="text-center mb-6">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#159A91] mb-1">
            Shalinitai Meghe College of Nursing
          </div>
          <h1 className="text-3xl font-black text-[#123B50] tracking-tight">
            MedPulse
          </h1>
          <div className="text-xs text-[#263746]/70 font-semibold tracking-wide mt-0.5">
            Academic Clinical Workstation
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#123B50]/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#123B50]/5 space-y-5">
          {/* Invite-Only Access Box (without admin password leak) */}
          <div className="p-3.5 rounded-2xl bg-[#E9F5F3]/80 border border-[#159A91]/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#159A91] shrink-0 mt-0.5" />
            <div className="text-xs text-[#263746] leading-relaxed">
              <span className="font-extrabold text-[#123B50]">Invite-Only Access: </span>
              Registration is provisioned exclusively by course administrators. Default initial password is{' '}
              <span className="font-mono font-bold text-[#123B50] bg-white px-1.5 py-0.5 rounded border border-[#159A91]/30">
                Med@123
              </span>.
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl text-xs bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="font-semibold leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Field 1: Institutional Email or Username */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider">
                Institutional Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="eg. user@nursing.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#159A91] focus:ring-2 focus:ring-[#159A91]/20 outline-none text-xs sm:text-sm font-medium transition-all bg-white"
                />
              </div>
            </div>

            {/* Field 2: Username (Auto-filled on matching email) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider">
                  Username
                </label>
                <span className="text-[10px] text-neutral-400 font-medium">
                  {username ? 'Auto-filled ✓' : 'Required on first login'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username (e.g. Scholar)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#159A91] focus:ring-2 focus:ring-[#159A91]/20 outline-none text-xs sm:text-sm font-medium transition-all bg-white"
                />
              </div>
            </div>

            {/* Field 3: Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-extrabold text-[#123B50] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-bold text-[#159A91] hover:underline cursor-pointer"
                >
                  First time / Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-300 focus:border-[#159A91] focus:ring-2 focus:ring-[#159A91]/20 outline-none text-xs sm:text-sm font-medium transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#123B50] hover:bg-[#159A91] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#123B50]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workstation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* DPDP Act Consent Statement */}
          <div className="pt-2 text-center">
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              By accessing this portal, you affirm you are 18+ or enrolled with verified institutional
              guardian consent under the <span className="font-bold text-neutral-700">DPDP Act, 2023 (Sec 9)</span>.
              Telemetry is processed solely for academic grading with zero keystroke recording or commercial tracking.
            </p>
          </div>
        </div>

        {/* Sub-card Footer Info */}
        <div className="text-center mt-5 space-y-1 text-xs text-neutral-500">
          <div>
            Enrolled student or faculty without access?{' '}
            <span className="font-bold text-[#123B50]">Contact Course Faculty or Dept Admin</span>
          </div>
          <div className="text-[11px] text-neutral-400">
            Adani University (AIHER) &bull; Accredited Academic Workstation
          </div>
        </div>
      </div>

      {/* Forgot Password / First Time Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#123B50]">Account Access Help</h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Student and faculty accounts are provisioned exclusively by institutional administrators.
              If this is your first time signing in, use your default credentials:
            </p>
            <div className="p-3 rounded-xl bg-[#E9F5F3] border border-[#159A91]/30 text-xs text-[#123B50] space-y-1">
              <div><strong>Default Initial Password:</strong> <code className="bg-white px-1.5 py-0.5 rounded">Med@123</code></div>
            </div>
            <p className="text-[11px] text-neutral-500">
              For password resets, contact your Department Administrator.
            </p>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#123B50] text-white text-xs font-bold hover:bg-[#159A91] transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Bottom Legal Footer */}
      <footer className="text-center text-[11px] text-neutral-400 pb-2">
        MedPulse &copy; {new Date().getFullYear()} &bull; Developed by <span className="text-neutral-700 font-bold">Jay</span>
      </footer>
    </div>
  );
};

export default LoginPage;
