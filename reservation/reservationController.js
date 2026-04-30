const { pool } = require('../data/dbConnection');
const nodemailer = require("nodemailer");

// Sending email the admin on reservation made
const transporter = nodemailer.createTransport({
  host: process.env.hostmail,
  port: process.env.port,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.userGmail,
    pass: process.env.userPass
  },
});

// Sanitizing use inputs
function timeValidator(time){

    const regexTime = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

    if(time.length === 0 && typeof(time) === 'string'){
        return false;
    } if(regexTime.test(time) === true){
        return true;
    } else{
        return false;
    }
}

// function peopleValidator(people){
//     const regexPeople = /[0-9]g/;

//     if(people.length === 0 && typeof(people) === 'string'){
//         return false;
//     } if(regexPeople.test(people) === true){
//         return true;
//     } else{
//         return false;
//     }
// }

// Getting The reservation Data for a single user
async function reservationData(req, res) {
    try {
        const { rows } = await pool.query('SELECT user_id FROM reservation'); 
        
        // Uses some to return the bool value to check wether user exists or not
        const userExist = rows.some(row => {
            return row.user_id === req.session.userId;
        }); 


        //  Checks if user is logged in or not
        if(!req.session.userId){
            return res.render('reservation/reservation', { error:'User not Logged in'});
        } 

        // Checks if user exists in the reservation database or not
        else if(!userExist){
            return res.render('reservation/reservation', { error:'No reservation made yet..'});
        }

        // If user exist in reservation database get the reservation data 
        else{
            const user_Id = req.session.userId;
            const { rows } = await pool.query('SELECT date, people, time FROM reservation WHERE user_id  = $1', [user_Id]);
            const date = rows[0].date;
            const people = rows[0].people;
            const time = rows[0].time;
            res.render('reservation/reservation', { date, people, time,  user_Id}); 
        }
  
    } catch (error) {
        console.log('Error in getting Reservation Data: ', error);        
    }
}


// Making reservation for a single user
async function reservation(req, res){
    try{
        // Getting inputs from the user
        const time = req.body.time;
        if(!timeValidator(time)){
            return res.render('reservation/reservation', { error:'Invalid Time Input'})
        }

        // Got too lazy to validate these input field or simply don't know how..
        const date = req.body.date;
        const people = req.body.people;
        const userId = req.session.userId;

        // Checks whether user is logged in or not
        if(!userId){
            return res.render('reservation/reservation', { error:'User not Logged in'});
        }

        // Inserts data into the reservation database
        await pool.query('INSERT INTO reservation (time, date, people, user_Id) VALUES ($1, $2, $3, $4)', [ time, date, people, userId]);
        


        const db = await pool.query('SELECT users.user_id AS user_id, username, reservation.user_id AS user_id FROM users INNER JOIN reservation ON users.user_id = reservation.user_id WHERE users.user_id=$1', [userId] );

        const resultUsername = db.rows[0].username;
        
        // console.log(resultUsername);

        // Sending a reservation message to the admin via gmail
        const info = await transporter.sendMail({
            from: "Restaurant Costumer",
            to: "jl6892139@gmail.com",
            subject: "Reservation",
            text: `Reservation Requested by ${resultUsername}
                Name: ${resultUsername} 
                Time: ${time}
                Date: ${date} 
                People: ${people}`
        });
    

        res.redirect('/');

    } catch(error){
        console.log('Error in making reservation with POST request: ', error);
    }
};

// Reservation page for admin
async function adminReservation(req, res) {
    try {
        // Uses Inner Join method for retrieving information from 2 different tables and it worked...lol
        const { rows } = await pool.query('SELECT users.user_id AS user_id, username, reservation.user_id AS user_id, date, people, reservation_id, time FROM users INNER JOIN reservation ON users.user_id = reservation.user_id');
        
         

        const result  = await pool.query('SELECT reservation_id FROM reservation');
        // console.log(result.rows[0].reservation_id);
        // console.log(rows);

        // When reservation database is empty
        if(rows.length === 0){
            return res.render('reservation/allReservation', { error: 'No Reservation Made.' });
        }

        res.render('reservation/allReservation', { rows });
        
    } catch (error) {
        console.log('Error in the Admin Reservation Page: ', error);        
    }    
}

// Confirm reservation request for admin
async function confirmReservation(req, res){
    try {
        
        // Used reservation_id to delete the reservation from the reservation table
        const reservationId = req.body.reservation_id;
        await pool.query('UPDATE reservation SET confirmation=TRUE WHERE reservation_id=$1', [ reservationId ]);
        res.redirect('/verified-reservation');

    } catch (error) {
        console.log('Error in Confirm Reservation ', error);
    }
};

// Cancel reservation request for admin
async function cancelReservation(req, res){
    try {
        
        const reservationId = req.body.reservation_id;
        const { rows } = await pool.query('DELETE FROM reservation WHERE reservation_id=$1',[reservationId] );
        res.redirect('/all-reservation');

    } catch (error) {
        console.log('Error in Confirm Reservation ', error);
    }
};

async function verifiedReservation(req, res) {
    try {

        const{rows} = await pool.query('SELECT * FROM reservation WHERE confirmation=TRUE');

        // When reservation database is empty
        if(rows.length === 0){
            return res.render('reservation/allReservation', { error: 'No reservation are Verified' });
        }
        res.render('reservation/verifiedReservation', { rows });

    } catch (error) {
        console.log('Error in showing Verified Reservation');     
    }    
}

module.exports = { reservation, reservationData, adminReservation, confirmReservation, cancelReservation, verifiedReservation };