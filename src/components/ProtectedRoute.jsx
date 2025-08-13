import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // User is logged in, show the page
  return children;
}