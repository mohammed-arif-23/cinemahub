<h1 align="center" style="color:#FF4C29;">🍿 <span style="color:#2EC4B6;">CinemaHub</span> — Movie Booking Platform 🎬</h1>

<p align="center">
  <b style="font-size:1.2rem;color:#0077ff;">Discover, book, and experience movies in real-time with a vibrant, modern web app!</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.3-blue?logo=nextdotjs"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react"/>
  <img src="https://img.shields.io/badge/Firebase-9.x-FFCA28?logo=firebase"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
</p>

---

## 🌟 Overview

CinemaHub is a full-stack, real-time movie ticket booking application. Users can:

- Browse a rich movie catalog
- Select showtimes and seats interactively
- Book tickets and receive instant confirmations
- Access booking history in a beautiful, responsive UI

Built with **Next.js**, **React**, **Firebase**, **Tailwind CSS**, and integrates real email notifications.

---

## 🗺️ Linked Relation Chart

```mermaid
graph TD
  A[User] -->|Login/Register| B((Firebase Auth))
  B --> C[Profile]
  A --> D[Movie Listings]
  D --> E[Movie Details]
  E --> F[Showtime Selection]
  F --> G[Seat Selection]
  G --> H[Booking Confirmation]
  H --> I((Firestore Bookings))
  H --> J((Email Service))
  C --> I
```

---

## ✨ Features

| Feature                     | Description                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| 🔒 Secure Auth              | Firebase Auth with Google Sign-in                                      |
| 🎥 Movie Browsing           | Explore movies, trailers, and details                                  |
| 🪑 Real-time Seat Selection | Interactive and animated seat maps                                     |
| 📨 Email Confirmations      | Instantly receive booking confirmation emails                          |
| 👤 Booking History          | Manage and review all bookings from your profile                       |
| 📱 Responsive UI            | Tailwind and Framer Motion for stunning visuals and smooth transitions |
| 🛠️ Modern Stack             | Next.js, React 18, Tailwind CSS, Firebase, Nodemailer, Framer Motion   |

---

## 🖼️ SVG & Stylish Effects

- **Custom SVG Banners:** For a unique, branded look!
- **Colorful Headings:** Using HTML/CSS for color effects.
- **Animated UI:** Framer Motion powers smooth transitions.
- **Tables & Mermaid Diagrams:** For clear structure and flow.

---

## 🏗️ Detailed Review of Main Files

### [`lib/movieData.js`](./lib/movieData.js)

- **Role:** Fetches movie listings and details from a local JSON file.
- **Key Functions:**
  - `getNowPlayingMovies()` – returns current movies
  - `getMovieDetails(id)` – fetches detailed info by ID
- **Usage:** Used by the homepage and details page for fast, mock-driven development.

### [`components/SeatSelection.jsx`](./components/SeatSelection.jsx)

- **Role:** Visual and interactive seat selection map.
- **Features:**
  - Animates seat selection with Framer Motion
  - Highlights available/unavailable seats
- **Usage:** Central to the booking flow for a rich user experience.

### [`components/HeroSection.jsx`](./components/HeroSection.jsx)

- **Role:** Eye-catching hero panel on the homepage.
- **Effects:**
  - Animated backgrounds and call-to-action
  - Responsive and theme-aware

### [`lib/firebaseConfig.js`](./lib/firebaseConfig.js)

- **Role:** Configures Firebase for authentication and Firestore data.
- **Usage:** Used app-wide for secure user management and real-time data.

### [`lib/emailService.js`](./lib/emailService.js)

- **Role:** Handles transactional emails using Nodemailer.
- **Usage:** Sends booking confirmations to users upon successful booking.

### [`app/booking/[movieId]/[theaterId]/[showtimeId]/page.jsx`](./app/booking/[movieId]/[theaterId]/[showtimeId]/page.jsx)

- **Role:** Renders the booking UI for a chosen movie/theater/showtime.
- **Features:**
  - Displays seat map, handles seat selection and booking logic.

---

## 🏁 Quickstart

```bash
git clone https://github.com/mohammed-arif-23/cinemahub.git
cd cinemahub
npm install
# Configure environment variables (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

---

## ⚙️ Environment Setup

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 🚀 Future Plans

- Add payment gateway integration
- User reviews and movie ratings
- Admin dashboard

---

## 📜 License

MIT License.  
Copyright © 2025

---

## 📬 Contact & Connect

<p align="center">
  <a href="https://github.com/mohammed-arif-23" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://linkedin.com/in/mohammed-arif-23" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="mailto:mohammedarif.dev@gmail.com">
    <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
 
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=mohammed-arif-23&label=Profile%20views&color=0e75b6&style=flat" alt="Profile Views">
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge">
  <img src="https://img.shields.io/badge/Nodemailer-008000?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer Badge">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion Badge">
</p>
