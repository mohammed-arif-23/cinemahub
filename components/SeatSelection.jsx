'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { db } from '../lib/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function SeatSelection({ movieId, theaterId, showtimeId, movieTitle, theaterName, showtimeTime, showtimeDate }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrice, setSeatPrice] = useState(299);
  const { user } = useAuth();
  const router = useRouter();

  // Sample seat layout
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  const seatsPerRow = 15;

  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);

  // Function to handle booking submission
  const handleBooking = async () => {
    if (!user) {
      alert('Please sign in to book tickets.');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    try {
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'Guest User',
        movieId: movieId,
        movieTitle: movieTitle,
        theaterId: theaterId,
        theaterName: theaterName,
        showtimeId: showtimeId,
        showtime: { 
          time: showtimeTime, 
          date: showtimeDate || new Date().toISOString().split('T')[0] 
        },
        seats: selectedSeats,
        ticketPrice: ticketPrice,
        bookingFee: bookingFee,
        tax: tax,
        totalPrice: totalPrice,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
        router.push(`/booking/confirmation?bookingId=${docRef.id}`);
      } catch (error) {
        // Error handling for adding document
        alert('Failed to book tickets. Please try again.');
      }
  };
  
  const toggleSeat = (seat) => {
    if (unavailableSeats.includes(seat)) return;
    
    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      } else {
        return [...prev, seat];
      }
    });
  };
  
  const getSeatStatus = (seat) => {
    if (unavailableSeats.includes(seat)) return 'unavailable';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };
  
  const getSeatColor = (status) => {
    switch (status) {
      case 'unavailable':
        return 'bg-red-900 border border-red-800 text-gray-400 cursor-not-allowed opacity-60';
      case 'selected':
        return 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30';
      default:
        return 'bg-gray-900 border border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500';
    }
  };
  
  const ticketPrice = selectedSeats.length * seatPrice;
  const bookingFee = parseFloat((ticketPrice * 0.011).toFixed(2));
  const tax = parseFloat((ticketPrice * 0.024).toFixed(2));
  const totalPrice = Math.round(ticketPrice + bookingFee + tax);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        setLoadingSeats(true);
        const today = new Date().toISOString().split('T')[0];
        const bookingsRef = collection(db, 'bookings');
        const q = query(
          bookingsRef,
          where('movieId', '==', movieId),
          where('theaterId', '==', theaterId),
          where('showtimeId', '==', showtimeId),
          where('showtime.date', '==', showtimeDate || today)
        );
        
        const querySnapshot = await getDocs(q);
        const bookedSeats = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.seats && Array.isArray(data.seats)) {
            bookedSeats.push(...data.seats);
          }
        });
        
        setUnavailableSeats(bookedSeats);
        } catch (error) {
          console.error('Error fetching booked seats:', error);
          setUnavailableSeats([]);
        } finally {
          setLoadingSeats(false);
        }
    };

    if (movieId && theaterId && showtimeId) {
      fetchBookedSeats();
    }
  }, [movieId, theaterId, showtimeId, showtimeDate]);
  
  return (
    <div className="container mx-auto px-2 py-6 md:px-4 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Select Your Seats</h2>
      
      <div className="flex flex-col items-center mb-10">
        <div className="w-full max-w-3xl bg-black border border-gray-700 p-8 rounded-lg">
          {/* Screen */}
          <div className="relative mb-10">
            <div className="h-4 bg-gray-700 rounded-t-lg w-full mb-2"></div>
            <div className="h-12 bg-gray-600 w-full rounded-lg transform perspective-500 rotateX-60 shadow-md"></div>
            <p className="text-center text-gray-300 mt-2">SCREEN</p>
          </div>
          
          {loadingSeats && (
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
              <span className="ml-2 text-sm text-gray-300">Loading booked seats...</span>
            </div>
          )}
          
          {/* Seat Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:space-x-8 mb-6 md:mb-8">
            <div className="flex items-center">
              <div className="w-5 h-5 md:w-7 md:h-7 bg-gray-900 border border-gray-600 rounded-t-lg mr-2"></div>
              <span className="text-xs md:text-sm text-white">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 md:w-7 md:h-7 bg-red-600 border border-red-600 rounded-t-lg mr-2 shadow-lg shadow-red-600/30"></div>
              <span className="text-xs md:text-sm text-white">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 md:w-7 md:h-7 bg-red-900 border border-red-800 rounded-t-lg mr-2 opacity-60"></div>
              <span className="text-xs md:text-sm text-white">Booked</span>
            </div>
          </div>
          
          {/* Seats */}
          <div className="space-y-1 md:space-y-2 mb-6 md:mb-8 overflow-x-auto">
            <div className="inline-block min-w-full">
              {rows.map((row, index) => (
                <React.Fragment key={row}>
                  <div className="flex items-center mb-2">
                    <div className="w-8 text-white text-center mr-2">{row}</div>
                    <div className="flex gap-1 md:gap-2">
                      {/* Group 1: 4 seats */}
                      {Array.from({ length: 4 }, (_, i) => {
                        const seatNumber = i + 1;
                        const seat = `${row}${seatNumber}`;
                        const status = getSeatStatus(seat);

                        return (
                          <motion.button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            className={`w-4 h-4 md:w-7 md:h-7 border rounded-t-lg flex items-center justify-center text-[7px] md:text-xs ${getSeatColor(status)} flex-shrink-0 transition-all duration-200`}
                            disabled={status === 'unavailable' || loadingSeats}
                            whileHover={status !== 'unavailable' && !loadingSeats ? { scale: 1.05 } : {}}
                            whileTap={status !== 'unavailable' && !loadingSeats ? { scale: 0.95 } : {}}
                            title={status === 'unavailable' ? `${seat} - Booked` : seat}
                          >
                            {seatNumber}
                          </motion.button>
                        );
                      })}

                      {/* Gap 1 */}
                      <div className="w-4 md:w-8"></div>

                      {/* Group 2: 7 seats */}
                      {Array.from({ length: 7 }, (_, i) => {
                        const seatNumber = 4 + i + 1;
                        const seat = `${row}${seatNumber}`;
                        const status = getSeatStatus(seat);

                        return (
                          <motion.button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            className={`w-4 h-4 md:w-7 md:h-7 border rounded-t-lg flex items-center justify-center text-[7px] md:text-xs ${getSeatColor(status)} flex-shrink-0 transition-all duration-200`}
                            disabled={status === 'unavailable' || loadingSeats}
                            whileHover={status !== 'unavailable' && !loadingSeats ? { scale: 1.05 } : {}}
                            whileTap={status !== 'unavailable' && !loadingSeats ? { scale: 0.95 } : {}}
                            title={status === 'unavailable' ? `${seat} - Booked` : seat}
                          >
                            {seatNumber}
                          </motion.button>
                        );
                      })}

                      {/* Gap 2 */}
                      <div className="w-4 md:w-8"></div>

                      {/* Group 3: 4 seats */}
                      {Array.from({ length: 4 }, (_, i) => {
                        const seatNumber = 4 + 7 + i + 1;
                        const seat = `${row}${seatNumber}`;
                        const status = getSeatStatus(seat);

                        return (
                          <motion.button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            className={`w-4 h-4 md:w-7 md:h-7 border rounded-t-lg flex items-center justify-center text-[7px] md:text-xs ${getSeatColor(status)} flex-shrink-0 transition-all duration-200`}
                            disabled={status === 'unavailable' || loadingSeats}
                            whileHover={status !== 'unavailable' && !loadingSeats ? { scale: 1.05 } : {}}
                            whileTap={status !== 'unavailable' && !loadingSeats ? { scale: 0.95 } : {}}
                            title={status === 'unavailable' ? `${seat} - Booked` : seat}
                          >
                            {seatNumber}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  {(index === 2 || index === 7 || index === 12) && (
                    <div className="my-4 w-full h-px bg-gray-700"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Summary */}
      <div className="max-w-md mx-auto bg-black border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Booking Summary</h3>
          
          {user && (
            <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-2">User Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{user.displayName || 'Guest User'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{user.email}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Selected Seats:</span>
              <span className="font-medium text-white">
                {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'None'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Tickets ({selectedSeats.length}):</span>
              <span className="font-medium text-white">₹{ticketPrice}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Booking Fee:</span>
              <span className="font-medium text-white">₹{bookingFee}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Tax (2.4%):</span>
              <span className="font-medium text-white">₹{tax}</span>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span className="text-white">Total (Rounded off):</span>
                <span className="text-white">₹{totalPrice}</span>
              </div>
            </div>
          </div>
          
          <motion.button
            onClick={handleBooking}
            className={`w-full mt-6 py-3 rounded-lg font-medium ${selectedSeats.length > 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed'}`}
            disabled={selectedSeats.length === 0}
            whileHover={selectedSeats.length > 0 ? { scale: 1.02 } : {}}
            whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
          >
            {selectedSeats.length > 0 ? 'Proceed to Payment' : 'Select Seats to Continue'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
