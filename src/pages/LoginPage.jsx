import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const LogoIcon = () => (
    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)' }}>
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm5 8a1 1 0 011-1h2a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    </div>
);

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redirect to the main app page on successful login
        } catch (err) {
            // Log the specific error code to the console for debugging
            console.error("Firebase sign-in error code:", err.code);

            // Set a more specific, user-friendly error message based on the error code
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password. Please try again.');
            } else {
                // For any other errors, show a generic message
                setError('Failed to sign in. Please try again later.');
            }
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg"
            >
                <LogoIcon />
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-8">Sign in to continue to LexiGen AI.</p>
                
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </motion.button>
                </form>
                <p className="text-center text-gray-600 mt-8">
                    Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
}