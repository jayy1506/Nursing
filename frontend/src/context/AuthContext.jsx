import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import { getApiUrl } from '../api/client';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Instant 0ms load from localStorage cache
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const cached = localStorage.getItem('nursing_user');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('nursing_token') || null;
  });

  // If user is already cached in localStorage, start with loading = false (instant render)
  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem('nursing_user');
    } catch {
      return false;
    }
  });

  const [authError, setAuthError] = useState(null);

  // Sync with MongoDB backend helper (non-blocking with strict timeout & host check)
  const syncWithBackend = async (userData, authToken) => {
    try {
      const isLocal = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const hasBaseUrl = Boolean((import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').trim());
      
      // On static hosting (Vercel) without explicit backend URL, skip to prevent proxy 404/delays
      if (!isLocal && !hasBaseUrl) {
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || ''}`
        },
        body: JSON.stringify({
          name: userData.name || userData.displayName || 'Nursing User',
          email: userData.email,
          role: userData.role || 'student',
          firebaseUid: userData.uid
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch {
      // Quietly ignore backend network / proxy timeouts so UI remains completely responsive
    }
  };

  const PRIMARY_ADMIN_NAME = 'Aachal Karande';
  const PRIMARY_ADMIN_EMAIL = 'karandeaachal@gmail.com';

  const SECONDARY_ADMIN_NAME = 'Jay Thakre';
  const SECONDARY_ADMIN_EMAIL = 'jthakre62@gmail.com';

  const ADMIN_EMAILS = [PRIMARY_ADMIN_EMAIL, SECONDARY_ADMIN_EMAIL].filter(Boolean);
  const isAdminEmailCheck = (email) => ADMIN_EMAILS.includes(email?.toLowerCase()?.trim());

  const DEFAULT_DIRECTORY = [
    {
      name: PRIMARY_ADMIN_NAME,
      email: PRIMARY_ADMIN_EMAIL,
      role: 'admin',
      isDefaultPassword: false
    },
    {
      name: SECONDARY_ADMIN_NAME,
      email: SECONDARY_ADMIN_EMAIL,
      role: 'admin',
      isDefaultPassword: false
    },
    {
      name: 'Prof. Marcus Vance',
      email: 'faculty@nursing-lms.edu',
      role: 'faculty',
      isDefaultPassword: true
    },
    {
      name: 'Elena Rostova (RN Student)',
      email: 'student@nursing-lms.edu',
      role: 'student',
      isDefaultPassword: true
    }
  ];

  // Helper to check user directory in persistent memory
  const getDirectoryInfo = (email) => {
    if (!email) return null;
    const emailNorm = email.toLowerCase().trim();
    try {
      const saved = localStorage.getItem('nursing_admin_users');
      if (saved) {
        const list = JSON.parse(saved);
        const match = list.find((u) => u.email?.toLowerCase().trim() === emailNorm);
        if (match) return match;
      }
    } catch {}

    const defaultMatch = DEFAULT_DIRECTORY.find(
      (u) => u.email?.toLowerCase().trim() === emailNorm
    );
    return defaultMatch || null;
  };

  // 1. Ultra-fast Email/Password Login
  const login = async (email, password) => {
    setAuthError(null);
    const emailNorm = email.toLowerCase().trim();

    // Check directory and master admin credentials
    const directoryInfo = getDirectoryInfo(emailNorm);
    const isMasterAdmin = isAdminEmailCheck(emailNorm);
    const isDirectoryMatch = Boolean(directoryInfo);

    // STRICT AUTHORIZATION CHECK: Only accounts registered by admin or system admins can access
    if (!isMasterAdmin && !isDirectoryMatch) {
      const accessErr = new Error('Access denied: Account not registered. Only students and faculty authorized by an administrator can access this portal.');
      setAuthError(accessErr.message);
      throw accessErr;
    }

    if (directoryInfo && (directoryInfo.status === 'disabled' || directoryInfo.isActive === false)) {
      const disabledErr = new Error('Access denied: Your account has been disabled by an administrator. Please contact your department admin.');
      setAuthError(disabledErr.message);
      throw disabledErr;
    }

    // Password verification helper
    const isValidAdminPass = isMasterAdmin && (
      (emailNorm === PRIMARY_ADMIN_EMAIL && password === 'aachal2026') ||
      (emailNorm === SECONDARY_ADMIN_EMAIL && password === 'Jay@1523') ||
      (directoryInfo?.password && password === directoryInfo.password)
    );

    const isValidDirectoryPass = directoryInfo && (
      (directoryInfo.password && password === directoryInfo.password) ||
      password === 'Srm123'
    );

    // Instant local resolver helper
    const loginViaDirectory = () => {
      const role = isMasterAdmin ? 'admin' : (directoryInfo?.role || 'student');
      const adminNames = {
        [PRIMARY_ADMIN_EMAIL]: PRIMARY_ADMIN_NAME,
        [SECONDARY_ADMIN_EMAIL]: SECONDARY_ADMIN_NAME
      };
      const defaultAdminName = adminNames[emailNorm] || 'Administrator';
      const name = isMasterAdmin 
        ? (directoryInfo?.name || defaultAdminName) 
        : (directoryInfo?.name || emailNorm.split('@')[0]);
      const isDefaultPassword = isMasterAdmin 
        ? false 
        : (directoryInfo?.isDefaultPassword ?? (password === 'Srm123'));

      const fallbackUser = {
        uid: directoryInfo?.firebaseUid || `usr-direct-${Date.now()}`,
        email: emailNorm,
        displayName: name,
        name: name,
        role: role,
        isDefaultPassword,
        collegeId: directoryInfo?.collegeId || 'COLLEGE_001',
        photoURL: null
      };

      const syntheticToken = `direct-token-${Date.now()}`;
      localStorage.setItem('nursing_token', syntheticToken);
      localStorage.setItem('token', syntheticToken);
      localStorage.setItem('firebase_token', syntheticToken);
      localStorage.setItem('nursing_user', JSON.stringify(fallbackUser));
      localStorage.setItem('user', JSON.stringify(fallbackUser));

      setToken(syntheticToken);
      setCurrentUser(fallbackUser);
      setLoading(false);

      // Background silent tasks (non-blocking)
      syncWithBackend(fallbackUser, syntheticToken);
      signInWithEmailAndPassword(auth, emailNorm, password).catch(() => {});

      return fallbackUser;
    };

    // If master admin password matches or directory password matches, log in immediately
    if (isValidAdminPass || isValidDirectoryPass) {
      return loginViaDirectory();
    }

    try {
      // Primary: Firebase Auth Sign-in with registered email
      const userCredential = await signInWithEmailAndPassword(auth, emailNorm, password);
      const user = userCredential.user;

      const isAdminEmail = isAdminEmailCheck(user.email);
      const initialRole = isAdminEmail ? 'admin' : (directoryInfo?.role || 'student');
      const initialName = user.displayName || directoryInfo?.name || emailNorm.split('@')[0];
      const isDefault = isAdminEmail ? false : (directoryInfo ? directoryInfo.isDefaultPassword : (password === 'Srm123'));

      const mergedUser = {
        uid: user.uid,
        email: user.email,
        displayName: initialName,
        name: initialName,
        role: initialRole,
        isDefaultPassword: isDefault,
        collegeId: directoryInfo?.collegeId || 'COLLEGE_001',
        photoURL: user.photoURL || null
      };

      const quickToken = user.accessToken || `fb-token-${Date.now()}`;
      localStorage.setItem('nursing_token', quickToken);
      localStorage.setItem('token', quickToken);
      localStorage.setItem('firebase_token', quickToken);
      localStorage.setItem('nursing_user', JSON.stringify(mergedUser));
      localStorage.setItem('user', JSON.stringify(mergedUser));

      setToken(quickToken);
      setCurrentUser(mergedUser);
      setLoading(false);

      // Non-blocking background token fetch
      user.getIdToken(false).then((freshToken) => {
        if (freshToken) {
          setToken(freshToken);
          localStorage.setItem('nursing_token', freshToken);
          localStorage.setItem('token', freshToken);
        }
      }).catch(() => {});

      // Non-blocking background Firestore sync with 1.2s timeout
      (async () => {
        try {
          const docPromise = getDoc(doc(db, 'users', user.uid));
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1200));
          const userDoc = await Promise.race([docPromise, timeoutPromise]);

          if (userDoc?.exists && userDoc.exists()) {
            const data = userDoc.data();
            setCurrentUser((prev) => {
              if (!prev) return prev;
              const updated = {
                ...prev,
                name: data.name || prev.name,
                displayName: data.name || prev.displayName,
                role: isAdminEmail ? 'admin' : (data.role || prev.role),
                collegeId: data.collegeId || prev.collegeId,
                isDefaultPassword: data.isDefaultPassword ?? prev.isDefaultPassword
              };
              localStorage.setItem('nursing_user', JSON.stringify(updated));
              localStorage.setItem('user', JSON.stringify(updated));
              return updated;
            });
          }
        } catch {}
      })();

      // Background sync to backend
      syncWithBackend(mergedUser, quickToken);

      return mergedUser;
    } catch (firebaseErr) {
      const errMessage = (firebaseErr.code === 'auth/invalid-credential' || firebaseErr.code === 'auth/wrong-password' || firebaseErr.code === 'auth/user-not-found')
        ? 'Invalid email or password.'
        : (firebaseErr.message || 'Invalid email or password.');
      setAuthError(errMessage);
      throw new Error(errMessage);
    }
  };

  // 2. High-Speed Email/Password Signup
  const signup = async (email, password, name, role = 'student') => {
    setAuthError(null);
    const emailNorm = email.toLowerCase().trim();
    const cleanName = name.trim();
    const isAdminEmail = isAdminEmailCheck(emailNorm);
    const assignedRole = isAdminEmail ? 'admin' : (role || 'student');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailNorm, password);
      const user = userCredential.user;

      // Update Firebase Auth profile displayName non-blockingly
      updateProfile(user, { displayName: cleanName }).catch(() => {});

      const mergedUser = {
        uid: user.uid,
        email: user.email,
        displayName: cleanName,
        name: cleanName,
        role: assignedRole,
        isDefaultPassword: false,
        collegeId: 'COLLEGE_001',
        photoURL: null
      };

      const quickToken = user.accessToken || `fb-token-${Date.now()}`;
      localStorage.setItem('nursing_token', quickToken);
      localStorage.setItem('nursing_user', JSON.stringify(mergedUser));

      // Save into local directory cache so subsequent logins are instant
      try {
        const saved = localStorage.getItem('nursing_admin_users');
        let list = saved ? JSON.parse(saved) : [];
        if (!list.some((u) => u.email?.toLowerCase().trim() === emailNorm)) {
          list.push({
            _id: `usr-${Date.now()}`,
            name: cleanName,
            email: emailNorm,
            password: password,
            role: assignedRole,
            firebaseUid: user.uid,
            status: 'active',
            isDefaultPassword: false,
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('nursing_admin_users', JSON.stringify(list));
        }
      } catch {}

      setToken(quickToken);
      setCurrentUser(mergedUser);
      setLoading(false);

      // Background fresh token retrieval
      user.getIdToken(false).then((freshToken) => {
        if (freshToken) {
          setToken(freshToken);
          localStorage.setItem('nursing_token', freshToken);
        }
      }).catch(() => {});

      // Non-blocking Firestore document creation in background
      setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: cleanName,
        email: user.email,
        role: assignedRole,
        collegeId: 'COLLEGE_001',
        isDefaultPassword: false,
        createdAt: new Date().toISOString()
      }).catch((firestoreErr) => {
        console.warn('[Firestore Set Warning]:', firestoreErr);
      });

      // Background sync to backend
      syncWithBackend(mergedUser, quickToken);

      return mergedUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // 3. Fast Google OAuth Sign-In
  const loginWithGoogle = async (role = 'student') => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const emailNorm = (user.email || '').toLowerCase().trim();
      const directoryInfo = getDirectoryInfo(emailNorm);
      const isAdminEmail = isAdminEmailCheck(emailNorm);

      // STRICT ACCESS CONTROL: Unregistered Google IDs are rejected immediately
      if (!isAdminEmail && !directoryInfo) {
        await signOut(auth);
        const accessErr = new Error(`Access denied: Google account "${user.email}" is not registered. Only students and faculty authorized by an administrator can access this portal.`);
        setAuthError(accessErr.message);
        throw accessErr;
      }

      if (directoryInfo && (directoryInfo.status === 'disabled' || directoryInfo.isActive === false)) {
        await signOut(auth);
        const disabledErr = new Error('Access denied: Your account has been disabled by an administrator.');
        setAuthError(disabledErr.message);
        throw disabledErr;
      }

      const userRole = isAdminEmail ? 'admin' : (directoryInfo?.role || 'student');
      const userName = directoryInfo?.name || user.displayName || emailNorm.split('@')[0] || 'User';

      const mergedUser = {
        uid: user.uid,
        email: user.email,
        displayName: userName,
        name: userName,
        role: userRole,
        isDefaultPassword: directoryInfo?.isDefaultPassword ?? false,
        collegeId: directoryInfo?.collegeId || 'COLLEGE_001',
        photoURL: user.photoURL || null
      };

      const quickToken = user.accessToken || `g-token-${Date.now()}`;
      localStorage.setItem('nursing_token', quickToken);
      localStorage.setItem('token', quickToken);
      localStorage.setItem('firebase_token', quickToken);
      localStorage.setItem('nursing_user', JSON.stringify(mergedUser));
      localStorage.setItem('user', JSON.stringify(mergedUser));

      setToken(quickToken);
      setCurrentUser(mergedUser);
      setLoading(false);

      // Background token and Firestore sync
      user.getIdToken(false).then((freshToken) => {
        if (freshToken) {
          setToken(freshToken);
          localStorage.setItem('nursing_token', freshToken);
          localStorage.setItem('token', freshToken);
        }
      }).catch(() => {});

      // Background profile sync with timeout
      (async () => {
        try {
          const docPromise = getDoc(doc(db, 'users', user.uid));
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1200));
          const userDoc = await Promise.race([docPromise, timeoutPromise]);

          if (userDoc?.exists && userDoc.exists()) {
            const data = userDoc.data();
            setCurrentUser((prev) => {
              if (!prev) return prev;
              const updated = {
                ...prev,
                name: data.name || prev.name,
                displayName: data.name || prev.displayName,
                role: isAdminEmail ? 'admin' : (data.role || prev.role)
              };
              localStorage.setItem('nursing_user', JSON.stringify(updated));
              localStorage.setItem('user', JSON.stringify(updated));
              return updated;
            });
          }
        } catch {}
      })();

      syncWithBackend(mergedUser, quickToken);

      return mergedUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // 4. One-Time Password Update Method
  const updateUserPassword = async (newPassword) => {
    if (!currentUser) return;

    // 1. Update in persistent user directory
    try {
      const saved = localStorage.getItem('nursing_admin_users');
      if (saved) {
        let list = JSON.parse(saved);
        list = list.map((u) => {
          if (u.email?.toLowerCase().trim() === currentUser.email?.toLowerCase().trim()) {
            return {
              ...u,
              password: newPassword,
              isDefaultPassword: false
            };
          }
          return u;
        });
        localStorage.setItem('nursing_admin_users', JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Error saving updated password to directory:', e);
    }

    // 2. Update active session
    const updated = {
      ...currentUser,
      password: newPassword,
      isDefaultPassword: false
    };
    setCurrentUser(updated);
    localStorage.setItem('nursing_user', JSON.stringify(updated));

    // 3. Sync to backend if available
    try {
      await fetch(getApiUrl('/api/auth/change-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: 'Srm123',
          newPassword
        })
      });
    } catch {}
  };

  // 5. Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('[SignOut Warning]:', err);
    } finally {
      localStorage.removeItem('nursing_token');
      localStorage.removeItem('token');
      localStorage.removeItem('firebase_token');
      localStorage.removeItem('nursing_user');
      localStorage.removeItem('user');
      setToken(null);
      setCurrentUser(null);
      setLoading(false);
    }
  };

  // Listen to Firebase Auth state changes (Non-blocking & Zero-stall)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const emailNorm = (user.email || '').toLowerCase().trim();
        const directoryInfo = getDirectoryInfo(emailNorm);
        const isAdminEmail = isAdminEmailCheck(emailNorm);

        // Strict rejection of un-enrolled Firebase sessions
        if (!isAdminEmail && !directoryInfo) {
          signOut(auth).catch(() => {});
          localStorage.removeItem('nursing_token');
          localStorage.removeItem('token');
          localStorage.removeItem('firebase_token');
          localStorage.removeItem('nursing_user');
          localStorage.removeItem('user');
          setCurrentUser(null);
          setToken(null);
          setLoading(false);
          return;
        }

        if (directoryInfo && (directoryInfo.status === 'disabled' || directoryInfo.isActive === false)) {
          signOut(auth).catch(() => {});
          localStorage.removeItem('nursing_token');
          localStorage.removeItem('token');
          localStorage.removeItem('firebase_token');
          localStorage.removeItem('nursing_user');
          localStorage.removeItem('user');
          setCurrentUser(null);
          setToken(null);
          setLoading(false);
          return;
        }

        let cachedUser = null;
        try {
          const raw = localStorage.getItem('nursing_user');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.email?.toLowerCase().trim() === emailNorm) {
              cachedUser = parsed;
            }
          }
        } catch {}

        const userRole = isAdminEmail ? 'admin' : (directoryInfo?.role || cachedUser?.role || 'student');
        const userName = directoryInfo?.name || cachedUser?.name || user.displayName || emailNorm.split('@')[0] || 'User';

        const mergedUser = {
          uid: user.uid,
          email: user.email,
          displayName: userName,
          name: userName,
          role: userRole,
          isDefaultPassword: cachedUser?.isDefaultPassword ?? (directoryInfo ? directoryInfo.isDefaultPassword : false),
          collegeId: cachedUser?.collegeId || directoryInfo?.collegeId || 'COLLEGE_001',
          photoURL: user.photoURL || null
        };

        // Immediately update session and clear loading (0ms wait!)
        setCurrentUser(mergedUser);
        localStorage.setItem('nursing_user', JSON.stringify(mergedUser));
        localStorage.setItem('user', JSON.stringify(mergedUser));
        setLoading(false);

        // Non-blocking fresh token fetch
        user.getIdToken(false).then((freshToken) => {
          if (freshToken) {
            setToken(freshToken);
            localStorage.setItem('nursing_token', freshToken);
            localStorage.setItem('token', freshToken);
          }
        }).catch(() => {});

        // Background non-blocking Firestore document check
        const fetchProfile = async () => {
          try {
            const docPromise = getDoc(doc(db, 'users', user.uid));
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1200));
            const userDoc = await Promise.race([docPromise, timeoutPromise]);

            if (userDoc?.exists && userDoc.exists()) {
              const uData = userDoc.data();
              setCurrentUser((prev) => {
                if (!prev || prev.uid !== user.uid) return prev;
                const updated = {
                  ...prev,
                  name: uData.name || prev.name,
                  displayName: uData.name || prev.displayName,
                  role: isAdminEmail ? 'admin' : (uData.role || prev.role),
                  collegeId: uData.collegeId || prev.collegeId,
                  isDefaultPassword: uData.isDefaultPassword ?? prev.isDefaultPassword
                };
                localStorage.setItem('nursing_user', JSON.stringify(updated));
                localStorage.setItem('user', JSON.stringify(updated));
                return updated;
              });
            }
          } catch {}
        };
        fetchProfile();

      } else {
        // If Firebase Auth has no active user, check if we have an authorized direct/admin session
        try {
          const cached = localStorage.getItem('nursing_user');
          if (cached) {
            const parsed = JSON.parse(cached);
            const emailNorm = (parsed?.email || '').toLowerCase().trim();
            const directoryInfo = getDirectoryInfo(emailNorm);
            const isMasterAdmin = isAdminEmailCheck(emailNorm);

            if ((isMasterAdmin || directoryInfo) && !(directoryInfo && (directoryInfo.status === 'disabled' || directoryInfo.isActive === false))) {
              // Authorized direct session is valid, keep active
              setLoading(false);
              return;
            }
          }
        } catch {}

        localStorage.removeItem('nursing_user');
        localStorage.removeItem('user');
        localStorage.removeItem('nursing_token');
        localStorage.removeItem('token');
        localStorage.removeItem('firebase_token');
        setCurrentUser(null);
        setToken(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userProfile: currentUser,
    token,
    role: currentUser?.role || 'student',
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    isFaculty: currentUser?.role === 'faculty' || currentUser?.role === 'admin',
    isStudent: currentUser?.role === 'student',
    loading,
    authError,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
