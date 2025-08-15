import React from 'react';
import { Link } from 'react-router-dom';

const LogoIcon = () => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)' }}>
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm5 8a1 1 0 011-1h2a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    </div>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <LogoIcon />
              <span className="text-lg font-bold">LexiGen AI</span>
            </div>
            <p className="text-gray-400 text-sm">AI-Powered legal document generation platform.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Documents</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Rental Agreements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Non-Disclosure Agreements</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@lexigenai.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LexiGen AI. All rights reserved. This platform provides document templates for informational purposes only and does not constitute legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
