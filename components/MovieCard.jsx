'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MovieCard({ movie, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[9/16] overflow-hidden">
        <Image
          src={movie.poster || '/placeholder-poster.jpg'}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = '/placeholder-poster.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-sm font-bold text-white mb-1 truncate">{movie.title}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-red-600 text-xs text-white font-bold px-2 py-1 rounded">
            {movie.rating}
          </span>
          <span className="text-gray-300 text-xs">{movie.duration}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {movie.genres && movie.genres.length > 0 ? (
            movie.genres.slice(0, 2).map((genre, idx) => (
              <span 
                key={`${movie.id}-genre-${idx}`} 
                className="bg-black border border-gray-700 text-white text-xs px-2 py-0.5 rounded"
              >
                {typeof genre === 'string' ? genre : genre.name}
              </span>
            ))
          ) : (
            <span className="bg-black border border-gray-700 text-white text-xs px-2 py-0.5 rounded">
              Movie
            </span>
          )}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-300 text-xs mb-3 text-center line-clamp-4">
          {movie.description || 'No description available'}
        </p>
        <Link 
          href={`/movies/${movie.id}`}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors duration-300"
        >
          Watch Now
        </Link>
      </motion.div>
    </motion.div>
  );
}