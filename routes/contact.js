const express = require('express');
const routes = express.Router();

routes.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports =  routes;