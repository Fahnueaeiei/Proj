import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaSKQ34p1RVQmkk4BBeuVBRmM2L3PlpEU",
  authDomain: "mobile-proj-e2b0d.firebaseapp.com",
  projectId: "mobile-proj-e2b0d",
  storageBucket: "mobile-proj-e2b0d.firebasestorage.app",
  messagingSenderId: "512909694626",
  appId: "1:512909694626:web:d2e7fc0c61568e45f9a9fb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };