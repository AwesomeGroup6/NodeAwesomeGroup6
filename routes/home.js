/**
 * Created by Palko on 03/12/2017.
 */
/**
 * Created by Palko on 02/12/2017.
 */
var express = require('express');
var router = express.Router();
const db = require('../connect_database');
let userId = 0;

/* GET home page. */


router.get('/friends', function(req, res, next) {

    let email = req.user.email;
    console.log(email);
    let dbUserId = db.getidfromemail(email);

    dbUserId.then(userId => {

        console.log(userId);
        userId = userId;

        let result = db.getFriends(userId);

        result.then(friends => {

            res.status(200).json({
                friends
            });

        }).catch(err => {
            res.status(500).send({
                text: 'An error occured. Try again'
            });
            console.log(err)

        });


    }).catch(err => {
        res.status(500).send({text: 'An error occured. Try again'});
        console.log(err)

    });


});

router.get('/posts', function(req, res, next) {

    let email = req.user.email;

    let dbUserId = db.getidfromemail(email);

    dbUserId.then(userId => {

        console.log(userId);
        userId = userId;

        let result = db.getFriendsPost(userId);

        result.then(friendsPosts => {

        res.status(200).json({
            friendsPosts
        });

    }).catch(err => {
        res.status(500).send({
            text: 'An error occured. Try again'
        });
        console.log(err)
    });

    });

});

router.get('/groups', function(req, res, next) {

    let email = req.user.email;

    let dbUserId = db.getidfromemail(email);

    dbUserId.then(userId => {

        console.log(userId);
        userId = userId;

    let result = db.getGroupsUserIsPartOf(userId);

    result.then(groups => {

        res.status(200).json({
            groups
        });

    }).catch(err => {
        res.status(500).send({
            text: 'An error occured. Try again'
        });
        console.log(err)

    });
    
    });

});

module.exports = router;