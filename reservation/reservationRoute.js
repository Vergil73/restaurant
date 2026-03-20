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

// Confirm reservation request for admin
const { confirmReservation } = require('./reservationController');
routes.post('/confirm-reservation', confirmReservation);

// Cancel reservation request for admin
const { cancelReservation } = require('./reservationController');
routes.post('/cancel-reservation', cancelReservation);


module.exports = routes;