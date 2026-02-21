const { Router } = require('express');
const routes = Router();

// authentication middleware
const { isUser } = require('../authentication/authenticationMiddleware');
const { isAdmin } = require('../authentication/authenticationMiddleware');

routes.get('/reservation',isUser, (req, res) => {
    res.render('reservation/reservation');
});

routes.get('/all-reservation', isAdmin, (req, res) => {
    res.render('reservation/allReservation');
});

module.exports = routes;