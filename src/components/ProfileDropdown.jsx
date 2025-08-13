import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// A default avatar using the user's first initial
const FallbackAvatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    return (
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            <span>{initial}</span>
        </div>
    );
};

export default function ProfileDropdown({ user, handleSignOut }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // This effect handles closing the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* The circular profile button */}
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <FallbackAvatar name={user.email} />
                )}
            </button>

            {/* The dropdown menu with animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="py-2">
                            {/* --- ADD THIS LINK --- */}
                            <Link to="/my-documents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Documents</Link>
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                            <button
                                onClick={() => {
                                    handleSignOut();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}