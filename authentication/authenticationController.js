
const { pool } = require('../data/dbConnection');
const bcrypt = require('bcrypt');


// Creating a new account

function usernameValidator(username){
    const regexUser = /[-'/`~!#*$@%+=.,^&(){}[\]|;:”<>?\\]/; //Checks for any special characters
    if(username.length === 0 || username.length > 55 || typeof username !== 'string'){
       return false;
    } else if(regexUser.test(username)){
        return false;
    } else{
        return true;
    }
}

function passwordValidator(password){
    const regex = /[^A-Za-z0-9]/;
    const num = /[0-9]/; 
    return typeof password === 'string' && password.length >= 8 && regex.test(password) && num.test(password) ;
}

async function createAccount(req, res) {
    try {

        const username = req.body.username;

        if (!usernameValidator(username)){
            return res.render('authentication/createAccount', { error: 'Invalid username' });
        }

        const plainPassword = req.body.password;
        
        if (!passwordValidator(plainPassword)){
            return res.render('authentication/createAccount', { error: 'Invalid password' });
        }
        
        const salt = 10;
        const hashPassword = await bcrypt.hash(plainPassword, salt);
        
        await pool.query('INSERT INTO users(username, password_hash) VALUES($1, $2)', [username, hashPassword]);
        res.redirect('/login');

    } catch (error) {

    
        if (error.code === '23505') {
            return res.render('authentication/createAccount', {
                error: 'User already exists'
            });
        }
        
        console.log('Error in creating account POST request: ', error)        
    }
};


// Account Login

async function loginAccount(req, res) {
    try {

        const username = req.body.username;

        if (!usernameValidator(username)){
            return res.render('authentication/login', { error: 'Invalid Credentials' });
        }
        
        const plainPassword = req.body.password;

        if (!passwordValidator(plainPassword)){
            return res.render('authentication/login', { error: 'Invalid Credentials' });
        }

        const {rows}  = await pool.query('SELECT user_id, username, password_hash, role FROM users WHERE username=$1', [ username ]);

        // Checks if the user is available in the database 
        if(rows.length === 0)
            return res.render('authentication/login', { error: 'Invalid Credentials' });
            const userId = rows[0].user_id;
            const usernameDb = rows[0].username;
            const passwordDb = rows[0].password_hash;
            const roledb = rows[0].role;
            const passwordCmpr  = await bcrypt.compare(plainPassword, passwordDb);

                                                                                                        
        if(username === usernameDb && passwordCmpr){

            // Remebers the logged in user and it's role for authentication middleware and protected routes and has nothing to do with the actual session cookie so stop being confused here
            req.session.role = roledb;
            req.session.userId = userId;
    
            res.redirect('/');
        } else{
            return res.render('authentication/login', { error: 'Invalid Credentials. Try Again' });
        }      
        
    } catch (error) {
        console.log('Error in logging accout POST request ', error);        
    }
}

// Lohout
function logout(req, res){
    req.session.destroy(() => {
		res.clearCookie("sessionId");
		res.redirect("/");
	});
}

module.exports = { createAccount, loginAccount, logout };