require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');

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
// Login
const login = require('./authentication/authenticationRoute');
app.use('/', login);

const createAccount = require('./authentication/authenticationRoute');
app.use('/', createAccount);

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