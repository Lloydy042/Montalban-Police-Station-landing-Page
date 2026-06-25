import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase configuration - use environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is properly configured
const isConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'PLACEHOLDER'
  && firebaseConfig.databaseURL && firebaseConfig.databaseURL.startsWith('https://');

// Initialize Firebase app only if configured
let app, auth, storage, database;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
    database = getDatabase(app);
  } catch (e) {
    console.warn('[AGAPAY] Firebase initialization error:', e.message);
    app = null;
    auth = null;
    storage = null;
    database = null;
  }
} else {
  console.info('[AGAPAY] Firebase not configured — running in offline/demo mode with mock data.');
  app = null;
  auth = null;
  storage = null;
  database = null;
}

export { auth, storage, database };
export default app;
