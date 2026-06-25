import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase App configuration retrieved from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyBev_uokFJpAw2BWRrOlfDEkU9Q8FN4VJ8",
  authDomain: "hostnovapro-79471.firebaseapp.com",
  projectId: "hostnovapro-79471",
  storageBucket: "hostnovapro-79471.firebasestorage.app",
  messagingSenderId: "128320125043",
  appId: "1:128320125043:web:a1d2164dfe835ef820d206",
  measurementId: "G-Y5BGX58JSD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Custom helpers
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc
};
export type { User };
