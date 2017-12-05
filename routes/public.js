let express = require('express');
let router = express.Router();
const db = require('../connect_database');
const jwt = require('jsonwebtoken');
const sql = require('mssql')
const secret = require('../config').secret;

/* for all the non */



router.post('/login', function(req, res, next) {

    // Method which checks if a login and password is and fits in the database. and will responds with with whatever case.
    let email = req.body.email;
    let password = req.body.password;

    console.log(email, password)

    let dbPassword = db.connection(email, password);


    dbPassword.then(result => {

        if(!isNaN(result)){


            const payload = {
                id: result
            };
            var token = jwt.sign(payload, secret, {
                expiresIn: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });


        }else {
            res.status(401);
        }

    }).catch(err => {
        res.status(500).send({text: 'An error occured. Try again'});
        console.log(err)

    });



});


router.post('/signup', function(req, res){

    if(!req.body.Email || !req.body.Password || !req.body.FirstName || !req.body.LastName){
        console.log(req.body);
        res.status(500).send({text: "you need information to send"});
       
    } else {

        console.log(req.body.Email, 'this is email', req.body.Password,'this is password', req.body.FirstName,'this is First Name', req.body.LastName, 'this is LastName');
        let dbAccount = db.addaccount(req.body.Email, req.body.Password, req.body.FirstName, req.body.LastName);
            dbAccount.then(result => {
                console.log(result);
                if(result = 1) {
                res.status(200).send({text: 'all was done'});
                }else {
                    res.status(500);
                }
            }).catch(err => {
                res.sendStatus(500).send({text: 'An error occured. Try again'});
                console.log(err)
            
            });
        }

       
    });




module.exports = router;
