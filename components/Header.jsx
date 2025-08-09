'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuth } from './AuthContext'; // Import useAuth hook

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user, googleSignIn, logOut } = useAuth(); // Use the auth context
  
  useEffect(() => {
    // User state tracking
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-2 md:py-3 transition-all duration-300',
        isScrolled ? 'bg-transparent backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-3 md:px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-bold text-white">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-red-600 font-extrabold"
          >
            CINEMA
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-extrabold"
          >
            HUB
          </motion.span>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-6">

          <Link href="/profile" className="text-white hover:text-red-600 transition-colors duration-200 text-sm md:text-base">
            My Profile
          </Link>
          {user ? (
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/profile" className="text-white hover:text-red-600 transition-colors duration-200 flex items-center space-x-1 md:space-x-2">
                {user.photoURL && !imageError ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-red-600"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 border-2 border-red-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden md:inline">{user.displayName || 'User Profile'}</span>
              </Link>
              <button
                onClick={logOut}
                className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={googleSignIn}
              className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}