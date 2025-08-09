'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../../../../components/Header';
import Footer from '../../../../../components/Footer';
import SeatSelection from '../../../../../components/SeatSelection';
import { getMovieById } from '../../../../../lib/movieData';
import { theaters } from '../../../../../lib/data';

export default function BookingPage() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [theater, setTheater] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Find the movie, theater, and showtime by ID
        const movieId = params.movieId;
        const theaterId = parseInt(params.theaterId);
        const showtimeId = parseInt(params.showtimeId);
        
        const foundMovie = await getMovieById(movieId);
        const foundTheater = theaters.find(t => t.id === theaterId);
        
        if (foundMovie && foundTheater) {
          const foundShowtime = foundTheater.showtimes.find(s => s.id === showtimeId);
          
          // Format movie data to match the expected structure
          const formattedMovie = {
            id: foundMovie.id,
            title: foundMovie.title,
            poster: foundMovie.poster,
            backdrop: foundMovie.backdrop,
            rating: foundMovie.rating,
            duration: foundMovie.duration,
            releaseDate: foundMovie.releaseDate,
            genres: foundMovie.genres,
            description: foundMovie.overview,
            director: foundMovie.director,
            cast: foundMovie.cast
          };
          
          setMovie(formattedMovie);
          setTheater(foundTheater);
          setShowtime(foundShowtime);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params.movieId, params.theaterId, params.showtimeId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!movie || !theater || !showtime) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Booking Information Not Found</h1>
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
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Booking Header */}
      <div className="pt-24 pb-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-white">{theater.name}</span>
                <span className="text-gray-300">•</span>
                <span className="text-white">{showtime.time}</span>
                <span className="text-gray-300">•</span>
                <span className="bg-black border border-gray-700 text-white text-xs px-2 py-1 rounded">{showtime.type}</span>
              </div>
            </div>
            
            <Link 
                href={`/movies/${movie.id}`}
                className="text-white hover:text-gray-300 transition-colors"
              >
                ← Back to Theaters
              </Link>
          </div>
        </div>
      </div>
      
      {/* Seat Selection */}
      <SeatSelection 
        movieId={movie.id} 
        theaterId={theater.id} 
        showtimeId={showtime.id} 
        movieTitle={movie.title}
        theaterName={theater.name}
        showtimeTime={showtime.time}
        showtimeDate={showtime.date || new Date().toISOString().split('T')[0]}
      />
      
      <Footer />
    </div>
  );
}