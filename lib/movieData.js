import moviesData from './movies.json';

export const getImageUrl = (path) => {
  return path;
};

export function getAllMovies() {
  return moviesData.movies;
}

export function getFeaturedMovies() {
  return moviesData.movies.filter(movie => movie.featured);
}

export function getMovieById(id) {
  return moviesData.movies.find(movie => String(movie.id) === String(id));
}
export async function getNowPlayingMovies() {
  return {
    results: moviesData.movies,
    total_results: moviesData.movies.length,
    page: 1,
    total_pages: 1
  };
}
export async function getMovieDetails(movieId) {
  const movie = getMovieById(movieId);
  if (!movie) return null;
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster,
    backdrop_path: movie.backdrop,
    release_date: movie.releaseDate,
    vote_average: movie.rating,
    runtime: parseInt(movie.duration) || 0,
    genres: movie.genres.map(genre => ({ name: genre })),
    credits: {
      cast: movie.cast.map(actor => ({ name: actor })),
      crew: [{ name: movie.director, job: 'Director' }]
    },
    videos: {
      results: [
        {
          key: movie.trailer.split('v=')[1] || '',
          name: `${movie.title} Trailer`,
          site: 'YouTube',
          type: 'Trailer'
        }
      ]
    }
  };
}

// Search movies
export async function searchMovies(query, page = 1) {
  const filteredMovies = moviesData.movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  );

  return {
    results: filteredMovies.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster,
      release_date: movie.releaseDate
    })),
    total_results: filteredMovies.length,
    page: page,
    total_pages: 1
  };
}

// Get theaters (mock data)
export function getTheaters() {
  return [
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
    }
  ];
}