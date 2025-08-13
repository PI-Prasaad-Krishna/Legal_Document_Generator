import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; // Ensure this path is correct

// 1. Create the Context
const AuthContext = createContext();

// Custom hook to use the auth context easily in other components
export function useAuth() {
  return useContext(AuthContext);
}

// 2. Create the Provider Component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // This effect runs once when the component mounts
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, user => {
      // This callback will fire whenever the user's auth state changes
      setCurrentUser(user);
      setLoading(false); // Set loading to false once we have the user status
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []); // The empty dependency array ensures this effect runs only once

  const value = {
    currentUser,
    // You can add other values like login/logout functions here later
  };

  // Don't render the rest of the app until the auth state has been checked
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}