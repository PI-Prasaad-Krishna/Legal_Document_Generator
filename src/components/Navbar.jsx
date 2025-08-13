import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const ScalesOfJusticeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-16.5 0c-1.01.143-2.01.317-3 .52m0 0a2.25 2.25 0 00-2.25 2.25v9.75c0 1.243 1.007 2.25 2.25 2.25h13.5c1.243 0 2.25-1.007 2.25-2.25v-9.75a2.25 2.25 0 00-2.25-2.25h-4.5m-7.5 0h7.5" /></svg>
);

export default function Navbar() {
  const activeLinkStyle = {
    color: '#2563EB', // blue-600
    fontWeight: '600',
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <ScalesOfJusticeIcon />
          <span className="text-2xl font-bold text-slate-900">DocuGen AI</span>
        </NavLink>
        <div className="hidden md:flex items-center gap-8 text-lg text-slate-600">
          <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
          <NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>About</NavLink>
          <NavLink to="/pricing" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Pricing</NavLink>
          <NavLink to="/contact" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Contact</NavLink>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </motion.button>
      </nav>
    </header>
  );
}
