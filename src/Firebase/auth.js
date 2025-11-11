// src/Firebase/auth.js
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const doSignInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const doCreateUserWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const doSignOut = () => signOut(auth);
