'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TheaterList from '../../../components/TheaterList';
import { getMovieDetails } from '../../../lib/movieData';
import { theaters } from '../../../lib/data'; // Keep theaters data for now

export default function MovieDetail() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const movieId = params.id;
        const movieData = await getMovieDetails(movieId);
        
        if (movieData) {
          // Format the movie data to match our app's structure
          const formattedMovie = {
            id: movieData.id,
            title: movieData.title,
            poster: movieData.poster_path,
            backdrop: movieData.backdrop_path,
            rating: typeof movieData.vote_average === 'number' ? movieData.vote_average.toFixed(1) : 'N/A',
            duration: movieData.runtime ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m` : 'N/A',
            releaseDate: movieData.release_date,
            genres: Array.isArray(movieData.genres) ? movieData.genres.map(g => typeof g === 'string' ? g : g.name) : [],
            description: movieData.overview || 'No description available',
            director: movieData.credits?.crew?.find(person => person.job === 'Director')?.name || movieData.director || 'Unknown',
            cast: Array.isArray(movieData.credits?.cast) ? 
              movieData.credits.cast.slice(0, 5).map(person => typeof person === 'string' ? person : person.name) : 
              Array.isArray(movieData.cast) ? movieData.cast.slice(0, 5) : [],


          };
          
          setMovie(formattedMovie);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    
    fetchMovieDetails();
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <Link 
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" >
      <Header />
      
      {/* Movie Hero */}
      <div className="relative pt-16">
  
        
        <div className="relative container mx-auto px-3 md:px-4 pt-8 md:pt-20 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Movie Poster */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0"
            >
              <div className="relative w-full aspect-[2/3] max-w-[280px] md:max-w-none overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            {/* Movie Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-grow"
            >
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 md:space-x-4 mb-4">
                <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded text-sm md:text-base">
                  IMDb {movie.rating}
                </span>
                <span className="text-gray-400 text-sm md:text-base">{movie.duration}</span>
                <span className="text-gray-400 text-sm md:text-base">{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                {movie.genres && movie.genres.length > 0 ? (
                  movie.genres.map((genre) => (
                    <span 
                      key={genre} 
                      className="bg-gray-800 text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="bg-gray-800 text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    Movie
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-lg leading-relaxed">{movie.description}</p>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="text-sm md:text-base">
                  <span className="text-gray-400">Director: </span>
                  <span className="text-white">{movie.director || 'Unknown'}</span>
                </div>
                <div className="text-sm md:text-base">
                  <span className="text-gray-400">Cast: </span>
                  <span className="text-white">
                    {movie.cast && movie.cast.length > 0 ? movie.cast.join(', ') : 'Information not available'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0">
                <Link 
                  href={`#theaters`}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-colors duration-300 text-center text-sm md:text-base"
                >
                  Book Tickets
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Theater Selection */}
      <div id="theaters" className="bg-black border-t border-gray-800 py-12">
        <TheaterList movieId={movie.id} theaters={theaters} />
      </div>
      
      <Footer />
    </div>
  );
}