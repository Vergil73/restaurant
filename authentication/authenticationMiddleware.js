async function isUser(req, res, next){
    try {
        
        if(req.session.id){
            
        } else{
            res.render('login', {error: "You must be logged in as a user"});
        }


    } catch (error) {
        console.log('Error in is User middleware: ', error);     
    }
}

async function isAdmin(req, res, next){
    try {
        
        if(req.session.role){
            next();
        }else{
            res.render('login', {error: "You must be logged in as a user"});
        }

    } catch (error) {
        console.log('Error in is User middleware: ', error);     
    }
}


module.exports =  { isUser, isAdmin };