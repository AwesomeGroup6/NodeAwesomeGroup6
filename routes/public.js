let express = require('express');
let router = express.Router();
const db = require('../connect_database');
const jwt = require('jsonwebtoken');
const sql = require('mssql')
const secret = require('../config').secret;
const auth = require('authenticator');
const fs = require('fs');

let path = './Authenticator/'
let userid = '';
/* for all the non */

router.post('/login', function(req, res, next) {

    // Method which checks if a login and password is and fits in the database. and will responds with with whatever case.
    let email = req.body.email;
    let password = req.body.password;

    console.log(email, password);

    let dbPassword = db.connection(email, password);


    dbPassword.then(result => {
        userid = result.UserId;
        let filePath = path + 'authUser' + result.UserId + '.json';
        console.log(filePath);
        try {
        let test = fs.readFileSync(filePath);
        }catch(err){
            console.log(err);
        }
        if (!fs.existsSync(filePath)) {

            const payload = {
                id: result.UserId
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
        
        }else{
            res.status(200).json({
                success: true,
                message: 1
            })
        }

            



    }).catch(err => {
        res.status(500).send({text: 'An error occured. Try again'});
        console.log(err)

    });



});

router.post('/authenticatekey', function(req,res,next) {
    let readPath = path + 'authUser'  +userid+ '.json';
    console.log('I AM HERE AND ARE TRYING TO SOLVE THIS', readPath);
        let rawdata = fs.readFileSync(readPath);  
        let user = JSON.parse(rawdata);



    let formattedKey = user.authtoken;
    console.log(formattedKey);
    console.log(req.body.key);
      if(testkey(formattedKey, req.body.key)) {
        const payload = {
            id: userid
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
        
        
    
      } else {
        res.status(500).send('token invalid');
          
      }
});



router.post('/signup', function(req, res,next){


    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;


    console.log(firstname);

    if(!email || !password || !firstname || !lastname){
        console.log(req.body);
        res.status(500).send({text: "you need information to send"});
    } else {

            console.log(req.body.Email, 'this is email', req.body.Password,'this is password', req.body.FirstName,'this is First Name', req.body.LastName, 'this is LastName');
        let dbAccount = db.addaccount(email, password, firstname, lastname);


            dbAccount.then(result => {
                console.log("result"+result);
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

    function testkey(token, key) {
        let testooo = auth.verifyToken(token, key)

        if (testooo == null) {
            return false;
        }else {
            return true;
        }
    }




module.exports = router;
