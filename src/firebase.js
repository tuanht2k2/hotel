// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBhQjNkibui3IF9mzJYY0I1a7buqN-t5WI',
  authDomain: 'hotel-management-8143a.firebaseapp.com',
  databaseURL:
    'https://hotel-management-8143a-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'hotel-management-8143a',
  storageBucket: 'hotel-management-8143a.appspot.com',
  messagingSenderId: '698656224703',
  appId: '1:698656224703:web:69bd3ed68522cea5cddd0a',
  measurementId: 'G-R7SVPZKT2Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
