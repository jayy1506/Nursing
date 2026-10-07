import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let firebaseInitialized = false;

export const initFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin;
  }

  try {
    // 1. Try FIREBASE_SERVICE_ACCOUNT JSON string or file path from env
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      let serviceAccount;
      if (process.env.FIREBASE_SERVICE_ACCOUNT.trim().startsWith('{')) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      } else if (fs.existsSync(process.env.FIREBASE_SERVICE_ACCOUNT)) {
        serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, 'utf8'));
      }

      if (serviceAccount) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID
        });
        firebaseInitialized = true;
        console.log(`[Firebase Admin] Initialized with Service Account (${serviceAccount.project_id || 'custom'})`);
        return admin;
      }
    }

    // 2. Try default credentials or project ID
    const projectId = process.env.FIREBASE_PROJECT_ID || 'nursing-lms-demo';
    admin.initializeApp({
      projectId
    });
    firebaseInitialized = true;
    console.log(`[Firebase Admin] Initialized with Project ID: ${projectId}`);
    return admin;
  } catch (error) {
    console.warn(`[Firebase Admin] Warning during initialization: ${error.message}. Running in simulated admin mode.`);
    firebaseInitialized = false;
    return admin;
  }
};

export const isFirebaseReady = () => firebaseInitialized;
export default admin;
