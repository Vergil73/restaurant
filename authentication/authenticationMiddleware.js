async function isUser(req, res, next){
    try {
        
        if(req.session.userId){
            next();
        } else{
            res.render('authentication/login', {error: "You must be logged in as a user"});
        } 


    } catch (error) {
        console.log('Error in is User middleware: ', error);     
    }
};

async function isAdmin(req, res, next){
    try {
        if(req.session.role === true){
            next();
        }else{
            res.render('homepage', {error: "Admin Only"});
        }

    } catch (error) {
        console.log('Error in isAdmin middleware: ', error);     
    }
};


module.exports =  { isUser, isAdmin };