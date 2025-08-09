'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedMovies } from '../lib/movieData';

export default function HeroSection() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedMovies() {
      try {
        // Get featured movies from local data
        const movies = getFeaturedMovies();
        if (movies && movies.length > 0) {
          // Format movies for display
          const formattedMovies = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            backdrop: movie.backdrop,
            video: movie.video || null, // YouTube embed URL for video background
            trailer: movie.trailer,
            description: movie.overview && movie.overview.length > 150 
              ? `${movie.overview.substring(0, 150)}...` 
              : (movie.overview || 'No description available')
          }));
          
          setFeaturedMovies(formattedMovies);
        }
      } catch (error) {
        // Fallback to empty array if data fails
        setFeaturedMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedMovies();
  }, []);



  if (loading || featuredMovies.length === 0) {
    return null; // Don't show spinner, let parent handle loading
  }

  const movie = featuredMovies[0];

  return (
    <div className="relative w-full">
      {/* Background Image or Video */}
      <div className="relative w-full aspect-video">
        {movie.video ? (
          <div className="relative w-full h-full">
            <iframe 
                src={movie.video}
                className="absolute top-0 left-0 w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay=1; mute=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 md:via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 md:from-black/30 via-black/50 md:via-black/70 to-transparent" />
          </div>
        ) : (
          <div 
            className="relative w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${movie.backdrop})`,
              opacity: 0.9
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 md:via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 md:from-black/80 via-black/40 md:via-black/60 to-transparent md:from-black/90 md:via-black/50 md:to-transparent" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="md:absolute md:py-[10rem] md:inset-0 md:flex md:items-end">
        <div className="container mx-auto px-3 md:px-4 md:pb-12 backdrop-blur-lg md:backdrop-blur-none md:bg-transparent">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl px-2 md:px-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 max-w-2xl">{movie.title}
               <span className="text-xs sm:text-sm block mt-1">Premiring on <span className="text-red-600">CINEMA</span>HUB</span></h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-6 max-w-md">{movie.description}</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Link 
                href={`/movies/${movie.id}`}
                className="flex items-center justify-center bg-white hover:bg-white/90 text-black px-4 py-2 md:px-6 md:py-3 rounded font-medium transition-colors duration-300 text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Book Now
              </Link>
            
            </div>
          </motion.div>
        </div>
      </div>
      {/* Mobile content background */}
      <div className="md:hidden bg-black"></div>
    </div>
  );
}