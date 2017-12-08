const express = require('express');
const db = require('../connect_database');
let router = express.Router();


/* GET home page. */
router.post('/', function (req, res, next) {
    console.log(req.body.email, req.body.password);
    let email = req.body.email;
    let dbPassword = db.connection(email);

    dbPassword.then(result => {
        if (req.body.password === result) {
            res.status(200).send({
                text: "Password match",
                match: true
            });
            console.log('Password match', req.body.password, result)
        } else {
            res.status(200).send({text: "Password doesnt match"});
            console.log('Password doesnt match', req.body.password, result);
        }
        console.log(result, 'index')
    }).catch(err => {
        res.status(500).send('An error occured. Try again');
        console.log(err)
    });

});

module.exports = router;