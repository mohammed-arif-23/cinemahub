'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TheaterList({ movieId, theaters }) {
  const [selectedDate, setSelectedDate] = useState(0);
  
  // Generate next 7 days for date selection
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="container mx-auto px-3 md:px-4 py-6 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Select a Theater & Showtime</h2>
      
      {/* Date Selection */}
      <div className="mb-6 md:mb-10 overflow-x-auto pb-2 md:pb-4">
        <div className="flex space-x-2 md:space-x-4">
          {dates.map((date, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-full whitespace-nowrap transition-colors text-sm md:text-base ${selectedDate === index ? 'bg-red-600 text-white' : 'bg-black border border-gray-700 text-white hover:bg-gray-900'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formatDate(date)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Theater List */}
      <div className="space-y-4 md:space-y-6">
        {theaters.map((theater) => (
          <motion.div
            key={theater.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-black border border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">{theater.name}</h3>
                  <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">{theater.address}</p>
                  
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                    {theater.amenities.map((amenity) => (
                      <span 
                        key={amenity} 
                        className="bg-black border border-gray-600 text-white text-xs px-2 md:px-3 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-left md:text-right">
                  <span className="text-green-400 font-medium text-sm md:text-base">{theater.distance} away</span>
                </div>
              </div>
              
              <div className="mt-3 md:mt-4">
                <h4 className="font-medium mb-2 md:mb-3 text-white text-sm md:text-base">Available Showtimes:</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {theater.showtimes.map((showtime) => (
                    <Link 
                      key={showtime.time} 
                      href={`/booking/${movieId}/${theater.id}/${showtime.id}`}
                    >
                      <motion.div
                        className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-md text-center min-w-[80px] md:min-w-[90px] cursor-pointer text-sm ${showtime.available ? 'bg-black border border-gray-600 text-white hover:border-red-500 hover:text-red-400' : 'bg-gray-900 border border-gray-700 text-gray-400 cursor-not-allowed'}`}
                        whileHover={showtime.available ? { scale: 1.05 } : {}}
                        whileTap={showtime.available ? { scale: 0.95 } : {}}
                      >
                        <span className="block text-white">{showtime.time}</span>
                        <span className="text-xs text-gray-300">{showtime.type}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}