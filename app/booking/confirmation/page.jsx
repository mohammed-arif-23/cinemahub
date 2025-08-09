'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';
import { sendBookingConfirmation } from '../../../lib/emailService';

function BookingConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        router.push('/');
        return;
      }

      try {
        const docRef = doc(db, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const bookingData = { id: docSnap.id, ...docSnap.data() };
          setBookingDetails(bookingData);
          
          // Send confirmation email if user email is available
          if (bookingData.userEmail) {
            try {
            await sendBookingConfirmation(bookingData.userEmail, {
              movieTitle: bookingData.movieTitle,
              theaterName: bookingData.theaterName,
              showtime: {
                date: bookingData.showtime.date,
                time: bookingData.showtime.time
              },
              seats: bookingData.seats,
              totalPrice: bookingData.totalPrice,
              bookingId: bookingData.id,
              bookingDate: bookingData.timestamp ? new Date(bookingData.timestamp.seconds * 1000) : new Date()
            });
          } catch (emailError) {
            window.alert('Booking confirmed, but email could not be sent due to :' + emailError.message + '. Please contact support if you need assistance.');
            // Continue even if email fails - booking is still valid
          }
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Booking Not Found</h1>
        <p className="text-gray-400 mb-8">We couldn't find your booking details.</p>
        <Link 
          href="/"
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }
  
  if (!bookingDetails) return null; // Should not happen if redirects work

  const { movieTitle, theaterName, showtime, seats, ticketPrice, bookingFee, tax, totalPrice, userName, userEmail, timestamp } = bookingDetails;
  const bookingDate = timestamp ? new Date(timestamp.seconds * 1000) : new Date();
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = bookingDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-xl"
          >
          {/* Success Header */}
          <div className="bg-green-600 p-4 md:p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white rounded-full mb-2 md:mb-4">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Booking Confirmed!</h1>
            <p className="text-green-100 text-sm md:text-base">Your tickets have been reserved and a confirmation email has been sent successfully.</p>
          </div>
          
          {/* Confirmation Details */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-white">{movieTitle}</h2>
                <p className="text-gray-300 text-sm md:text-base">{showtime.time} | {showtime.date}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs md:text-sm text-gray-400">Booking ID:</p>
                <p className="text-base md:text-lg font-mono font-bold text-white">{bookingId}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 md:pt-6 pb-4">
              <h3 className="text-lg font-medium text-white mb-4">Booking Details</h3>
              
              {userName && (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">User Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{userEmail}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Theater:</span>
                  <span className="text-white">{theaterName}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Date:</span>
                  <span className="text-white">{showtime.date}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Time:</span>
                  <span className="text-white">{showtime.time}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Seats:</span>
                  <span className="text-white">{seats.sort().join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Booking Time:</span>
                  <span className="text-white">{formattedDate} at {formattedTime}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 md:pt-6 pb-4">
              <h3 className="text-lg font-medium text-white mb-4">Payment Summary</h3>
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Tickets ({seats.length}):</span>
                  <span className="text-white">₹{Math.round(ticketPrice || 0)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Booking Fee:</span>
                  <span className="text-white">₹{Math.round(bookingFee || 50)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-300">Tax (2.4%):</span>
                  <span className="text-white">₹{Math.round(tax || 0)}</span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t border-gray-700 text-base md:text-lg">
                  <span className="text-white">Total:</span>
                  <span className="text-white">₹{Math.round(totalPrice || 0)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link 
                  href="/"
                  className="px-6 py-3 bg-black border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors text-center"
                >
                  Return to Home
                </Link>
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Print Ticket
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function BookingConfirmation() {
  return (
    <Suspense fallback={<div>Loading booking details...</div>}>
      <BookingConfirmationContent />
    </Suspense>
  );
}