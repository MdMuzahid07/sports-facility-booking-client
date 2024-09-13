
# Sports Facility Booking Platform

The **Sports Facility Booking Platform** allows users to book sports facilities easily and provides administrators with tools to manage bookings, users, and facilities. This project is an integrated full-stack MERN (MongoDB, Express, React, Node.js) application with a user-friendly interface.

## Features

- **Landing Page**: 
  - Hero section with a "Book Now" button.
  - Featured facilities and customer testimonials.
  - Clear explanation of the booking process.
- **User Dashboard**:
  - Manage bookings with options to view and cancel.
- **Admin Dashboard**:
  - Manage sports facilities (CRUD operations).
  - View and manage all bookings.
  - Add and manage admin users.
- **Facility Listing**: 
  - Filter, search, and view details of facilities.
- **Booking System**: 
  - Check availability and book facilities with secure payment.
- **Login & Registration**:
  - User registration and login forms with validation.
  - Admin and user roles.
- **Responsive UI**:
  - Mobile, tablet, and desktop views.
- **Additional Features**:
  - Error handling with custom 404 pages.
  - Scroll-to-top button, pagination for facilities.

## Installation

### Requirements

- **Node.js** (version 18.x or later)
- **MongoDB** (local or cloud)
- **pnpm** (version 8.x or later)

### Steps

1. **Clone the repository**:
   ```bash
git clone  https://github.com/MdMuzahid07/sports-facility-booking-client.git
   cd sports-facility-booking-client
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

5. **Preview production build**:
   ```bash
   pnpm preview
   ```

## Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the project for production.
- `pnpm preview`: Previews the production build.
- `pnpm lint`: Runs ESLint for code quality checks.

## Tech Stack

- **Frontend**: React, TailwindCSS, React Router, React Hook Form, Framer Motion
- **Backend**: Node.js, Express, MongoDB, JWT authentication
- **State Management**: Redux Toolkit, React-Redux
- **Database**: MongoDB
- **Payment Integration**: SSL Commerz/AmarPay
- **Deployment**: Vercel/Netlify (for frontend), Heroku (for backend)

