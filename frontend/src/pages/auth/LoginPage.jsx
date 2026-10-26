
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MedPulseLogo } from '../../components/brand/MedPulseLogo';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

// Helper to resolve appropriate dashboard and prevent cross-role redirect leaks
// (e.g., student logging in when previous admin session was on /admin/*)
export const getDestinationForRole = (userRole, requestedPath) => {
  const role = userRole || 'student';
  const defaultDashboard =
    role === 'admin'
      ? '/admin/dashboard'
      : role === 'faculty'
        ? '/faculty/dashboard'
        : '/';

  // If no path requested, or requested path is an auth page or root '/'
  if (!requestedPath || requestedPath === '/login' || requestedPath === '/signup' || requestedPath === '/') {
    return defaultDashboard;
  }

  const isAdminPath = requestedPath.startsWith('/admin');
  const isFacultyPath = requestedPath.startsWith('/faculty');

  // Prevent cross-role redirect leak
  if (isAdminPath) {
    return role === 'admin' ? requestedPath : defaultDashboard;
  }

  if (isFacultyPath) {
    return (role === 'faculty' || role === 'admin') ? requestedPath : defaultDashboard;
  }

  // Any other learning/syllabus/quiz path is accessible by all roles
  return requestedPath;
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { currentUser, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  // Redirect if user is already authenticated
  useEffect(() => {
    if (currentUser) {
      const destination = getDestinationForRole(currentUser.role, from);
      navigate(destination, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      const destination = getDestinationForRole(loggedInUser?.role, from);
      navigate(destination, { replace: true });
    } catch (err) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a moment and try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError(
          `Unauthorized domain (${window.location.hostname}). Please authorize this domain in Firebase Console.`
        );
      } else {
        setError(err.message || 'Failed to sign in. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const loggedInUser = await loginWithGoogle();
      const destination = getDestinationForRole(loggedInUser?.role, from);
      navigate(destination, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/unauthorized-domain') {
        setError(
          `Unauthorized domain (${window.location.hostname}). Please add this domain to Firebase Console.`
        );
      } else if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Top Bar with Brand & Clean Light Header */}
      <header className="flex items-center justify-between max-w-5xl mx-auto w-full pt-2">
        <MedPulseLogo size="md" showTagline={true} />
        <ThemeToggle />
      </header>

      {/* Background soft medical glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-neutral-200/50 blur-3xl" />
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10 py-6">
        <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/60">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full bg-green-50 text-green-750 border border-green-200">
              Institutional Clinical Access
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 mt-2 tracking-tight">
              Sign In to MedPulse
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Foundational medical sciences, mastered.
            </p>
          </div>

          {error && (
            <div className={`mb-5 p-3.5 rounded-2xl text-xs flex items-center gap-2.5 ${error.includes('Access denied') || error.includes('disabled')
                ? 'bg-rose-50 border border-rose-200 text-rose-800'
                : 'bg-neutral-100 border border-neutral-300 text-neutral-900'
              }`}>
              <AlertCircle className={`w-4 h-4 shrink-0 ${error.includes('Access denied') || error.includes('disabled') ? 'text-rose-600' : 'text-neutral-900'
                }`} />
              <p className="flex-1 font-semibold leading-relaxed">{error}</p>
            </div>
          )}

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 text-neutral-700 text-sm font-semibold transition-all duration-150 disabled:opacity-50 shadow-2xs mb-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-green-500"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#22C55E"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#22C55E"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#22C55E"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.3-.7-.5-1.5-.5-2.4z"
              />
              <path
                fill="#22C55E"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 17c1.8 3.7 5.6 6.5 10.1 6.5z"
              />
            </svg>
            Continue with Institutional Google ID
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-[1px] bg-neutral-200" />
            <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              Or with credentials
            </span>
            <div className="flex-1 h-[1px] bg-neutral-200" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input
              label="Institutional Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nurse@hospital.edu"
              leftIcon={<Mail className="w-4 h-4 text-neutral-400" />}
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4 text-neutral-400" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>

          {/* Closed Access Notice */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Closed institutional platform. Student and Faculty accounts are provisioned and authorized by the{' '}
              <span className="font-semibold text-neutral-800">Department Administrator</span>.
            </p>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="flex items-center justify-center gap-2 mt-5 text-neutral-500 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>INC CBME Standards &bull; Encrypted Session Authentication</span>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-[11px] text-neutral-400 pb-2">
        MedPulse &copy; {new Date().getFullYear()} &bull; Foundational Medical Sciences & Clinical Nursing LMS
      </footer>
    </div>
  );
};

export default LoginPage;
