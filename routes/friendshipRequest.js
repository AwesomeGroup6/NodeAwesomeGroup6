/**
 * Created by Palko on 04/12/2017.
 */
var express = require('express');
var router = express.Router();
const db = require('../connect_database');



router.post('/createfriendrequest', function(req, res, next){

    let friendId = req.body.FriendId;

    console.log(friendId);

    let dbAccount = db.requestFriendship(req.user.id,friendId);

    dbAccount.then(result => {
        console.log(result);
        if(result = 1) {
            res.status(200).send({request: 'friend request has been inserted into the database'});

        }else {
            res.send({update: 'database has been updated, no data has been inserted, look into the stored procedure: requestfriendship'
            });
        }
    }).catch(err => {
        res.sendStatus(500).send({text: 'An error occured. Try again'});
        console.log(err)

    });

});


//receive friend request
router.post('/acceptFriendRequest', function(req, res, next){

    let requesterId = req.body.UserId


    let friendRequest = db.requestFriendship(requesterId,req.user.id);

    friendRequest.then(result => {
        console.log(result);
        res.status(200).json({
            result
        })
    }).catch(err=> {
        res.status(500).send({
            text: 'An error occured. Try again'
        })

        console.log(err);
    })

})


router.post('/friendrequest', function(req, res, next){

    let friendRequest = db.receiveFriendRequest(req.user.id);

    friendRequest.then(result => {
        console.log(result);
        res.status(200).json({
            result
        })
    }).catch(err=> {
        res.status(500).send({
            text: 'An error occured. Try again'
        })

        console.log(err);
    })

})

//delete request

router.post('/revokeFriendship', function(req, res, next){

    let friendId = req.body.FriendId

    let revokeFriend = db.revokeFriendship(req.user.id,friendId);

    revokeFriend.then(result => {
        console.log(result);
        res.status(200).json({
            result
        })
    }).catch(err=> {
        res.status(500).send({
            text: 'An error occured. Try again'
        })

        console.log(err);
    })

})

module.exports = router;