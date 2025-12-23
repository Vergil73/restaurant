const express = require('express');
const routes = express.Router();

routes.get('/aboutUs', (req, res)=> {
    res.render('aboutUs');
});

module.exports =  routes;