/**
 * Created by Palko on 03/12/2017.
 */
/**
 * Created by Palko on 02/12/2017.
 */
var express = require('express');
var router = express.Router();
const db = require('../connect_database');

/* GET home page. */


router.get('/', function(req, res, next) {

        let result = db.getFriends(req.user.id);

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


});

router.post('/findFriend',function (req,res,next) {

    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;

    let friend = db.findFriends(FirstName,LastName);

    friend.then(result => {
        console.log(result);

    res.status(200).json({
        result
    });

}).catch(err => {
            res.status(500).send({text: 'An error occured. Try again'});
            console.log(err);

    }).catch(err => {
        res.status(500).send({text: 'An error occured. Try again'});
        console.log(err)

    });

});

router.post('/createfriendrequest', function(req, res, next){

    let friendId = req.body.UserId;

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

module.exports = router;