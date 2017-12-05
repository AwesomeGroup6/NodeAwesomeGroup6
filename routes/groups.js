/**
 * Created by Palko on 03/12/2017.
 */
var express = require('express');
var router = express.Router();
const db = require('../connect_database');


router.get('/findGroup',function (req,res,next) {

    let title = req.body.title;

    let group = db.findGroup(title);

    group.then(result => {

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

router.post('/joinGroup',function (req,res,next) {

    let groupId = req.body.groupId;

    let joinGroup = db.joinGroup(req.user.id,groupId);

        joinGroup.then(result => {
            if(result = 1) {
                res.status(200).send({text: 'all was done'});

            }else {
                res.status(500);
            }

        }).catch(err => {
            res.sendStatus(500).send({text: 'An error occured. Try again'});
            console.log(err)

        });

})


router.get('/', function(req, res, next) {


    let result = db.getGroupsUserIsPartOf(req.user.id);

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
module.exports = router;