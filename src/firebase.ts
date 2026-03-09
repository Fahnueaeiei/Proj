// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaSKQ34p1RVQmkk4BBeuVBRmM2L3PlpEU",
  authDomain: "mobile-proj-e2b0d.firebaseapp.com",
  projectId: "mobile-proj-e2b0d",
  storageBucket: "mobile-proj-e2b0d.firebasestorage.app",
  messagingSenderId: "512909694626",
  appId: "1:512909694626:web:d2e7fc0c61568e45f9a9fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);