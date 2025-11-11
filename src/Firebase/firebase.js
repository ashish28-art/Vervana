// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfI4MeTC0Ls4kEuYRFUTQ0RLHBDg0Yh5o",
  authDomain: "auth-development-19fbe.firebaseapp.com",
  projectId: "auth-development-19fbe",
  storageBucket: "auth-development-19fbe.firebasestorage.app",
  messagingSenderId: "221835668559",
  appId: "1:221835668559:web:ab1fda46286f73c7360e3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { app, auth }; // ✅ export auth here
