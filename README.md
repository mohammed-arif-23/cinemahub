<!-- PROJECT BANNER -->

<h1 align="center">🎬 Movie Booking App 🍿</h1>

<p align="center">
  <b>Your seamless experience for discovering movies and booking tickets in real-time!</b>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Next.js-14.2.3-blue?logo=nextdotjs"/></a>
  <a href="#"><img src="https://img.shields.io/badge/React-18-61DAFB?logo=react"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Firebase-9.x-FFCA28?logo=firebase"/></a>
  <a href="#"><img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss"/></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-yellow.svg"/></a>
</p>

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Core Functionality](#core-functionality)
- [UI Components & Design](#ui-components--design)
- [Backend & Data Model](#backend--data-model)
- [Setup & Development](#setup--development)
- [Future Enhancements](#future-enhancements)
- [Credits & License](#credits--license)

---

## 🚀 Project Overview

A full-stack, real-time movie ticket booking application. This project combines:

- 🍿 **Extensive Movie Listings**: Browse and discover a wide range of movies.
- 💺 **Interactive Seat Selection**: Visually select your preferred seats for any showtime.
- 📧 **Automated Booking Confirmations**: Receive instant email confirmations for your tickets.
- 👤 **User Profile & History**: Manage your bookings and view past ticket purchases.
- 🌐 **Responsive Design**: Optimized for a seamless experience across all devices.

---

### UI Flow Diagram

```mermaid
graph LR;
  User((User)) -->|Authenticates| Auth[Authentication Service];
  Auth --> FirebaseAuth{Firebase Auth};
  User --> MovieList[Movie Listings Page];
  MovieList --> MovieDetails[Movie Details Page];
  MovieDetails --> ShowtimeSelect[Showtime Selection];
  ShowtimeSelect --> SeatSelect[Seat Selection Page];
  SeatSelect --> Payment[Payment Processing (Conceptual)];
  Payment --> BookingConfirm[Booking Confirmation Page];
  BookingConfirm --> FirebaseDB{Firebase Firestore - Bookings};
  BookingConfirm --> EmailService{Email Service};
  User --> Profile[User Profile Page];
  Profile --> FirebaseDB;
```

---

## 🛠️ Technology Stack

| Layer     | Technology                                                  |
| --------- | ----------------------------------------------------------- |
| Frontend  | Next.js 14.2.3, React 18, Tailwind CSS 3.4.1, Framer Motion |
| Backend   | Node.js (Next.js API routes), Firebase (Auth, Firestore)    |
| Email     | Nodemailer                                                  |
| Utilities | UUID, ESLint, PostCSS, Autoprefixer                         |

---

## ✨ Features

- **Secure User Authentication**: Powered by Firebase Authentication with Google Sign-In.
- **Dynamic Movie Browsing**: Explore movies with detailed information and trailers.
- **Real-time Seat Availability**: See and select available seats in real-time.
- **Personalized User Profiles**: Access booking history and manage account details.
- **Responsive & Intuitive UI**: Designed for an optimal experience on any device.

---

## 🎬 Core Functionality

### Movie Data & Display

> Implemented in <mcfile name="movieData.js" path="lib\movieData.js"></mcfile> and <mcfile name="page.js" path="app\page.js"></mcfile>

- **Movie Fetching**: Retrieves movie details from local mock data (<mcfile name="movies.json" path="lib\movies.json"></mcfile>).
- **Details Page**: Displays comprehensive movie information including synopsis, cast, and showtimes.

#### Example: Fetching Movies

```javascript
// lib/movieData.js
import movies from "./movies.json";

export async function getNowPlayingMovies() {
  return movies.filter((movie) => movie.now_playing);
}

export async function getMovieDetails(id) {
  return movies.find((movie) => movie.id === parseInt(id));
}
```

### Booking Process

> Handled across <mcfile name="[showtimeId]\page.jsx" path="app\booking\[movieId]\[theaterId]\[showtimeId]\page.jsx"></mcfile> and <mcfile name="confirmation\page.jsx" path="app\booking\confirmation\page.jsx"></mcfile>

- **Theater & Showtime Selection**: Users select their preferred theater and showtime.
- **Seat Selection**: Interactive UI for choosing seats (<mcsymbol name="SeatSelection" filename="SeatSelection.jsx" path="components\SeatSelection.jsx" type="function"></mcsymbol>).
- **Booking Confirmation**: Generates a unique booking ID and sends an email confirmation.

---

## 🖥️ UI Components & Design

> All UI components are located in <mcfolder name="components" path="components"></mcfolder>

### Key Components

| Component                                                                                                                   | Description                               |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| <mcsymbol name="Header" filename="Header.jsx" path="components\Header.jsx" type="function"></mcsymbol>                      | Navigation bar with authentication links. |
| <mcsymbol name="HeroSection" filename="HeroSection.jsx" path="components\HeroSection.jsx" type="function"></mcsymbol>       | Dynamic hero section on the homepage.     |
| <mcsymbol name="MovieCard" filename="MovieCard.jsx" path="components\MovieCard.jsx" type="function"></mcsymbol>             | Displays individual movie details.        |
| <mcsymbol name="SeatSelection" filename="SeatSelection.jsx" path="components\SeatSelection.jsx" type="function"></mcsymbol> | Interactive seat map for booking.         |
| <mcsymbol name="TheaterList" filename="TheaterList.jsx" path="components\TheaterList.jsx" type="function"></mcsymbol>       | Lists available theaters and showtimes.   |

### Styling & Effects

- **Tailwind CSS**: For rapid and responsive UI development.
- **Framer Motion**: For smooth animations and transitions (e.g., in <mcsymbol name="HeroSection" filename="HeroSection.jsx" path="components\HeroSection.jsx" type="function"></mcsymbol>).

---

## 🗄️ Backend & Data Model

### Firebase Integration

> Configuration in <mcfile name="firebaseConfig.js" path="lib\firebaseConfig.js"></mcfile>

- **Authentication**: Manages user sign-up/in (<mcsymbol name="AuthContext" filename="AuthContext.jsx" path="components\AuthContext.jsx" type="function"></mcsymbol>).
- **Firestore**: Stores booking details, user profiles, and potentially movie/theater data.

### Email Service

> Implemented in <mcfile name="emailService.js" path="lib\emailService.js"></mcfile> and <mcfile name="route.js" path="app\api\send-email\route.js"></mcfile>

- **Nodemailer**: Used for sending transactional emails, primarily booking confirmations.

---

## 🛠️ Setup & Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd movie-booking-app/my-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Firebase Configuration:**
    - Create a Firebase project and enable Firestore and Authentication (Google Sign-in).
    - Copy your Firebase configuration to a `.env.local` file in the root of `my-app`:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```
4.  **Email Service Configuration (Optional, for sending real emails):**
    - Set up a Nodemailer transporter (e.g., with Gmail or SendGrid).
    - Add the following to your `.env.local` file:
    ```
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password_or_app_specific_password
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Future Enhancements

- Implement a robust payment gateway.
- Add user reviews and ratings for movies.
- Integrate with a real-time movie API (e.g., TMDB).
- Enhance search and filtering capabilities.
- Introduce admin panel for content management.

---

## 📜 Credits & License

This project is open source and available under the MIT License.

---

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge">
  <img src="https://img.shields.io/badge/Nodemailer-008000?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer Badge">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion Badge">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge">
</p>
