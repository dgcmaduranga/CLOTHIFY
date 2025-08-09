// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";
// (db is for later when we save orders)
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIK17Xaa8Pt5J58drhyNmUEHzYsKAMD3M",
  authDomain: "llothify.firebaseapp.com",
  projectId: "llothify",
  storageBucket: "llothify.firebasestorage.app",
  messagingSenderId: "289670058603",
  appId: "1:289670058603:web:4416ee3e5052449dbdd72e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// optional: ensure auth persistence in the browser (keeps user logged in after refresh)
setPersistence(auth, browserLocalPersistence).catch(() => {});

/** Helper to subscribe to auth changes (used in AuthContext) */
export function listenAuth(callback){
  return onAuthStateChanged(auth, callback);
}
