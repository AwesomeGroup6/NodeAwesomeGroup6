
var express = require('express');
var router = express.Router();
const db = require('../connect_database');


router.post('/createcomment', function(req, res, next){

        let dbAccount = db.addcomment(req.body.PostId, req.user.id, req.body.CommentText);

        console.log(req.body.CommentText);

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



router.post('/', function(req, res, next){

    let comment = db.getComments(req.body.PostId);

    comment.then(comments => {

        res.status(200).json({
            comments
        });

    }).catch(err => {
        res.status(500).send({
            text: 'An error occured. Try again'
        });
        console.log(err)

    });

});

module.exports = router;