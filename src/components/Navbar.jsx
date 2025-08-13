import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import ProfileDropdown from './ProfileDropdown'; // Import the new component

const LogoIcon = () => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)' }}>
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm5 8a1 1 0 011-1h2a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    </div>
);

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const activeLinkStyle = {
    color: '#2563EB', // blue-600
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <NavLink to="/" className="flex items-center gap-3">
          <LogoIcon />
          <div>
            <h1 className="text-xl font-bold text-gray-900">LexiGen AI</h1>
            <p className="text-xs text-gray-500 -mt-1">AI-Powered Legal Docs</p>
          </div>
        </NavLink>
        <div className="hidden md:flex items-center gap-8 text-base text-gray-700 font-medium">
          <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-blue-600 transition-colors">Home</NavLink>
          <NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-blue-600 transition-colors">About</NavLink>
          <NavLink to="/pricing" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-blue-600 transition-colors">Pricing</NavLink>
          <NavLink to="/contact" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-blue-600 transition-colors">Support</NavLink>
        </div>
        
        <div className="hidden md:block">
          {currentUser ? (
            // If user is logged in, show the new ProfileDropdown
            <ProfileDropdown user={currentUser} handleSignOut={handleSignOut} />
          ) : (
            // If user is not logged in, show the Sign In button
            <NavLink to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Sign In
              </motion.button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}