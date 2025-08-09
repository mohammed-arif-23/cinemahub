'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedBookings = [];
          querySnapshot.forEach((doc) => {
            fetchedBookings.push({ id: doc.id, ...doc.data() });
          });
          setBookings(fetchedBookings);
        } catch (error) {
        } finally {
          setIsLoadingBookings(false);
        }
      } else if (!loading) {
        setIsLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user, loading]);

  if (loading || isLoadingBookings) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-white">Please sign in to view your profile.</div>;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              {user.photoURL && !imageError ? (
                <img
                  src={user.photoURL}
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full border-4 border-red-600"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-red-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-red-600">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-bold text-red-600 mb-2">User Profile</h1>
              <p className="text-2xl font-semibold mb-1">{user.displayName || 'N/A'}</p>
              <p className="text-lg text-gray-400 mb-2">{user.email || 'N/A'}</p>
              <p className="text-sm text-gray-500">Member since: {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-red-600">Booking History</h2>
          {bookings.length === 0 ? (
            <p className="text-center text-xl text-gray-400">You have no bookings yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-white mb-2">{booking.movieTitle}</h3>
                  <p className="text-gray-300 mb-1"><span className="font-medium">Theater:</span> {booking.theaterName}</p>
                  <p className="text-gray-300 mb-1"><span className="font-medium">Date:</span> {booking.showtimeDate || new Date(booking.showtime?.seconds * 1000).toLocaleDateString()}</p>
                  <p className="text-gray-300 mb-1"><span className="font-medium">Time:</span> {booking.showtimeTime || new Date(booking.showtime?.seconds * 1000).toLocaleTimeString()}</p>
                  <p className="text-gray-300 mb-1"><span className="font-medium">Seats:</span> {booking.seats?.join(', ') || 'N/A'}</p>
                  <p className="text-gray-300 mb-3"><span className="font-medium">Total:</span>  ₹{booking.totalPrice?.toFixed(2) || '0.00'}</p>
                  <Link 
                    href={`/booking/confirmation?bookingId=${booking.id}`} 
                    className="text-red-500 hover:text-red-400 font-medium transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}