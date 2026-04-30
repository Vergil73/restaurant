require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash');

// Express-Session
const session = require('express-session');

app.use(session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:  1000 * 60 * 60 * 24,
        secure: false, //change this to true when using https
    }
}));

// connect-flash for notifications
app.use(flash());

// Global middleware
// Global variable using res.locals for ejs 
app.use((req, res, next) => {
    res.locals.userId = req.session.userId; // Logged in User's id
    res.locals.role = req.session.role; // Checks for admin role
    res.locals.sucess_login = req.flash('sucess_login'); // Successfull login message
    res.locals.sucess_logout = req.flash('sucess_logout');
    res.locals.confirmReservation = req.flash('confirmReservation');
    res.locals.cancelReservation = req.flash('cancelReservation');
  next();
});


// views
app.set('views', './views');
app.set('view engine', 'ejs');

// public
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Authentication
const authentication = require('./authentication/authenticationRoute');
app.use('/', authentication);

// Homepage
const homepage = require('./routes/homepage');
app.use('/', homepage);

// Menu page 
const menu = require('./routes/menu');
app.use('/',menu);

// Contact page
const contact = require('./routes/contact');
app.use('/', contact);

// About us page
const aboutUs = require('./routes/aboutUs');
app.use('/', aboutUs);

//Reservation Section
// Reservation page
const reservation = require('./reservation/reservationRoute');
app.use('/', reservation);

// All Reservation 
const allReservation = require('./reservation/reservationRoute');
app.use('/', allReservation);

// Error Handling
// Catches every page that doesn't exist in this server
app.use((req, res) => {
    res.status(404).send('Sorry, page not found!');
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});
