'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { getFeaturedMovies } from '../lib/movieData';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movies = getFeaturedMovies();
        if (movies && movies.length > 0) {
          // Format local movie data
          const formattedMovies = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster || movie.poster_path,
            backdrop: movie.backdrop || movie.backdrop_path,
            rating: movie.rating || movie.vote_average || 0,
            duration: movie.duration || (movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'),
            releaseDate: movie.release_date,
            genres: movie.genres || [],
            description: movie.overview || movie.description || 'No description available',
            director: movie.director || 'Unknown',
            cast: movie.cast || [],
            trailer: movie.trailer || ''
          }));
          setMovies(formattedMovies);
        }
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Now Showing Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold mb-1">Popular on CinemaHub</h2>
            <p className="text-gray-400 text-sm">The most watched movies this week</p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((movie, index) => (
                <MovieCard key={`movie-${movie.id || index}`} movie={movie} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      
      
      {!loading && <Footer />}
    </div>
  );
}

