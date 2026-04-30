const { Router } = require('express');
const routes = Router();

// Create Account
const { createAccount } = require('./authenticationController');
routes.get('/create-account', (req, res) => {
    res.render('authentication/createAccount');
});

routes.post('/newAccount', createAccount);

// Login
const { loginAccount } = require('./authenticationController');
routes.get('/login', (req, res) => {
    res.render('authentication/login');
});

routes.post('/loginAccount', loginAccount);

// Logout
const { logout } = require('./authenticationController');
routes.post('/logout', logout); 
// routes.post('/logout', (req, res) => {
//     console.log(req.sessionId);
// }); 

module.exports = routes