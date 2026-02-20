const { Router } = require('express');
const routes = Router();

routes.get('/reservation', (req, res) => {
    res.render('reservation/reservation');
});

module.exports = routes;