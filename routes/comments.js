/**
 * Created by Palko on 04/12/2017.
 */
/**
 * Created by Palko on 03/12/2017.
 */
/**
 * Created by Palko on 02/12/2017.
 */
var express = require('express');
var router = express.Router();
const db = require('../connect_database');


router.post('/createcomment', function(req, res, next){

        let dbAccount = db.addcomment(req.body.PostId, req.user.id, req.body.CommentText);

        dbAccount.then(result => {

            console.log(result);

            if(!isNaN(result)) {
                res.status(200).send({CommentId: result});

            }else {
                res.status(500);
            }
        }).catch(err => {
            res.sendStatus(500).send({text: 'An error occured. Try again'});
            console.log(err)

        });

});


router.post('/deletecomment', function(req, res, next){

    let dbAccount = db.deleteComment(req.body.CommentId);

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

});

module.exports = router;