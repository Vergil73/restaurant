const { Router } = require('express');
const routes = Router();

// authentication middleware
const { isUser } = require('../authentication/authenticationMiddleware');
const { isAdmin } = require('../authentication/authenticationMiddleware');

// Reservation Page and Data For Individual User
const { reservationData } = require('./reservationController');
routes.get('/reservation', reservationData);

// Making Post request for reserving the table
const { reservation } = require('./reservationController');
routes.post('/make-reservation', reservation);

// Showing all reservation made at once for Admin only
const { adminReservation } = require('./reservationController');
routes.get('/all-reservation', adminReservation);

module.exports = routes;