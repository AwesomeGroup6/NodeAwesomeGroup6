var express = require('express');
var router = express.Router();
const db = require('../connect_database');

/* GET home page. */


router.get('/', function(req, res, next) {

        let result = db.getFriends(req.user.id);

        console.log("id" + req.user.id);

        result.then(friends => {

            console.log("friends" +friends);

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



module.exports = router;