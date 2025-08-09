export const movies = [
  {
    id: 1,
    title: 'Inception',
    poster: '/images/inception.svg',
    backdrop: '/images/inception-backdrop.jpg',
    rating: 8.8,
    duration: '2h 28m',
    releaseDate: '2010-07-16',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
    trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: '/images/dark-knight.svg',
    backdrop: '/images/dark-knight-backdrop.jpg',
    rating: 9.0,
    duration: '2h 32m',
    releaseDate: '2008-07-18',
    genres: ['Action', 'Crime', 'Drama'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY'
  },
  {
    id: 3,
    title: 'Interstellar',
    poster: '/images/interstellar.svg',
    backdrop: '/images/interstellar-backdrop.jpg',
    rating: 8.6,
    duration: '2h 49m',
    releaseDate: '2014-11-07',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
  },
  {
    id: 4,
    title: 'The Shawshank Redemption',
    poster: '/images/shawshank.svg',
    backdrop: '/images/shawshank-backdrop.jpg',
    rating: 9.3,
    duration: '2h 22m',
    releaseDate: '1994-10-14',
    genres: ['Drama'],
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
    trailer: 'https://www.youtube.com/watch?v=6hB3S9bIaco'
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    poster: '/images/pulp-fiction.svg',
    backdrop: '/images/pulp-fiction-backdrop.jpg',
    rating: 8.9,
    duration: '2h 34m',
    releaseDate: '1994-10-14',
    genres: ['Crime', 'Drama'],
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    trailer: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY'
  }
];

export const theaters = [
  {
    id: 1,
    name: 'CinemaHub IMAX',
    address: '123 Main Street, Downtown',
    distance: '2.5 miles',
    amenities: ['IMAX', 'Dolby Atmos', 'Recliner Seats', 'Food & Drinks'],
    showtimes: [
      { id: 101, time: '10:30 AM', type: 'Standard', available: true },
      { id: 102, time: '1:15 PM', type: 'IMAX', available: true },
      { id: 103, time: '4:00 PM', type: 'Standard', available: true },
      { id: 104, time: '7:30 PM', type: 'IMAX', available: true },
      { id: 105, time: '10:45 PM', type: 'Standard', available: true },
    ]
  },
  {
    id: 2,
    name: 'Starlight Cinema',
    address: '456 Park Avenue, Midtown',
    distance: '3.8 miles',
    amenities: ['Dolby Vision', 'Premium Seating', 'Bar'],
    showtimes: [
      { id: 201, time: '11:00 AM', type: 'Standard', available: true },
      { id: 202, time: '2:30 PM', type: 'Dolby', available: true },
      { id: 203, time: '5:45 PM', type: 'Standard', available: true },
      { id: 204, time: '8:15 PM', type: 'Dolby', available: true },
      { id: 205, time: '11:00 PM', type: 'Standard', available: false },
    ]
  },
  {
    id: 3,
    name: 'Metroplex Theaters',
    address: '789 Broadway, Uptown',
    distance: '1.2 miles',
    amenities: ['4DX', 'ScreenX', 'VIP Lounge'],
    showtimes: [
      { id: 301, time: '10:00 AM', type: 'Standard', available: true },
      { id: 302, time: '12:45 PM', type: '4DX', available: true },
      { id: 303, time: '3:30 PM', type: 'ScreenX', available: true },
      { id: 304, time: '6:15 PM', type: 'Standard', available: true },
      { id: 305, time: '9:00 PM', type: '4DX', available: true },
    ]
  },
  {
    id: 4,
    name: 'Grand Cinema Palace',
    address: '321 River Road, Eastside',
    distance: '5.1 miles',
    amenities: ['Luxury Seating', 'Dine-In', 'Arcade'],
    showtimes: [
      { id: 401, time: '11:30 AM', type: 'Standard', available: true },
      { id: 402, time: '2:00 PM', type: 'Standard', available: true },
      { id: 403, time: '4:30 PM', type: 'Standard', available: true },
      { id: 404, time: '7:00 PM', type: 'Standard', available: true },
      { id: 405, time: '9:30 PM', type: 'Standard', available: true },
    ]
  },
  {
    id: 5,
    name: 'Sunset Drive-In',
    address: '987 Coastal Highway, Westside',
    distance: '7.3 miles',
    amenities: ['Drive-In', 'Retro Experience', 'Food Trucks'],
    showtimes: [
      { id: 501, time: '8:00 PM', type: 'Drive-In', available: true },
      { id: 502, time: '10:30 PM', type: 'Drive-In', available: true },
    ]
  }
];