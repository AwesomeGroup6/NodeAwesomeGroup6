/**
 * Created by Palko on 04/12/2017.
 */

var express = require('express');
var router = express.Router();
const db = require('../connect_database');

router.get('/', function(req, res, next) {

    let result = db.getFriendsPost(req.user.id);

    result.then(posts => {


        res.status(200).json({
            posts
        });

    }).catch(err => {
        res.status(500).send({
            text: 'An error occured. Try again'
        });
        console.log(err)

    });

});

router.post('/createpost', function(req, res, next){


        let dbAccount = db.addpost(req.user.id, req.body.PostContent);

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


router.delete('/deletepost', function(req, res, next){

    let dbAccount = db.deletePost(req.body.PostId);

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