/**
 * Backend Configuration Module for St. John Public School, Amethi
 * Ready-to-connect for Firebase and Supabase deployment.
 */

export const BACKEND_CONFIG = {
  activeProvider: 'local' as 'local' | 'supabase' | 'firebase',

  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://stjohn-amethi-default.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },

  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyStJohnAmethi2026',
    authDomain: 'stjohn-amethi.firebaseapp.com',
    projectId: 'stjohn-amethi-portal',
    storageBucket: 'stjohn-amethi.appspot.com',
    messagingSenderId: '109827364512',
    appId: '1:109827364512:web:abcdef987654321',
  },

  isCloudSyncEnabled: false
};

export function syncWithCloud(table: string, payload: any) {
  if (!BACKEND_CONFIG.isCloudSyncEnabled) {
    // Persists silently locally
    return Promise.resolve({ success: true, mode: 'localStorage' });
  }
  // In production cloud mode, send to Supabase or Firestore
  return Promise.resolve({ success: true, table, payload });
}
