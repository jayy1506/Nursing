import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD2vdpUUglE2HaLIqVrvPWODst6Qrgkr-A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nursing-8f7fd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nursing-8f7fd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nursing-8f7fd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "54553531362",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:54553531362:web:0097e449700828d7f61fbb",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PKDV10SNRV"
};

// Initialize Primary Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Direct Admin provision helper that registers account in Firebase Auth & Firestore
// without signing out the active Admin session
export const provisionFirebaseUser = async (email, password, name, role = 'student') => {
  try {
    const secondaryApp =
      getApps().find((a) => a.name === 'SecondaryAdminProvisioner') ||
      initializeApp(firebaseConfig, 'SecondaryAdminProvisioner');

    const secondaryAuth = getAuth(secondaryApp);
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const uid = userCredential.user.uid;

    // Create user profile in Firestore
    try {
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, {
        uid,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: role || 'student',
        collegeId: 'COLLEGE_001',
        isDefaultPassword: true,
        createdAt: new Date().toISOString()
      });
    } catch (firestoreErr) {
      console.warn('[Firestore Doc Creation Warning]:', firestoreErr);
    }

    // Sign out secondary session immediately
    await signOut(secondaryAuth);
    return { success: true, uid };
  } catch (err) {
    console.warn('[Direct Firebase Provision Warning]:', err);
    return { success: false, error: err.message, code: err.code };
  }
};

export default app;
