const express = require('express');
const routes = express.Router();

routes.get('/menu', (req, res) => {
    res.render('menu');
});

module.exports = routes;