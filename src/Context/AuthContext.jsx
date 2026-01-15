// src/Context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { auth, googleProvider } from "../Firebase/firebase"; // make sure googleProvider is exported
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), []);
  const signup = useCallback((email, password) => createUserWithEmailAndPassword(auth, email, password), []);
  const googleLogin = useCallback(() => signInWithPopup(auth, googleProvider), []);
  const logout = useCallback(() => signOut(auth), []);

  const userLoggedIn = !!currentUser;

  const value = useMemo(() => ({
    currentUser,
    userLoggedIn,
    login,
    signup,
    googleLogin,
    logout
  }), [currentUser, userLoggedIn, login, signup, googleLogin, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
