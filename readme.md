# Restaurant Reservation Web App

A full-stack restaurant web application built with Node.js, Express, and EJS, featuring user authentication and a reservation management system.

## Overview

This project provides a restaurant website with a user-facing menu, contact page, reservation system, and authentication pages. It also includes admin-style reservation management views for reviewing and verifying bookings.

## Features

- User registration and login
- Menu browsing with a dedicated menu page
- Contact page for restaurant inquiries
- Reservation form for table booking
- Admin / reservation verification pages for managing bookings
- Responsive layouts using custom CSS

## Tech Stack

- Node.js
- Express.js
- EJS template engine
- CSS for styling
- Modular route structure

## Project Structure

- `app.js` - Main application entry point
- `package.json` - Project dependencies and scripts
- `routes/` - Front-end route handlers for pages such as home, menu, contact, and about
- `authentication/` - Authentication logic, middleware, controllers, and routes
- `reservation/` - Reservation controllers and routes
- `data/` - Database connection setup
- `views/` - EJS view templates and partials
- `public/` - Static assets: CSS, JavaScript, and images

## Pages Included

- Home page
- About page
- Menu page
- Contact page
- Login page
- Create account page
- Reservation form page
- Reservation listing and verification pages

## Usage

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the app in your browser at `http://localhost:3000`

## Notes

- The project is built as a mock restaurant web app and can be extended with a real database, payment integration, and additional admin features.
- Styling is organized under `public/css` and reusable page components are stored in `views/templates`.

