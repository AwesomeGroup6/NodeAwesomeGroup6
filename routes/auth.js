 const express = require('express');
const router = express.Router();
const db = require('../connect_database');

// GET
router.get('/', function(req, res, next) {
    res.send('You cant login 😱');
});

router.post('/home', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.get('/view/post', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});
router.get('/view/group', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});
router.get('/view/friend', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.get('/view/friendrequest', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

// post

// this is a post request which will add a post to the database.
router.post('/createpost', function(req, res, next){
    
    console.log(req.user.email);
    let email = req.user.email;
    let userId = 0;
    let dbUserId = db.getidfromemail(email);
    
        dbPassword.then(result => {

            console.log(result);
            userId = result;
            result.close();
        }).catch(err => {
            res.status(500).send({text: 'An error occured. Try again'});
            console.log(err)
        
        });

        
            
            let dbAccount = db.addpost(userId, req.body.postContent);
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

// deletes a post from the database by taking the input PostId from the frontend
router.post('/deletepost', function(req, res, next){
    
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

router.post('/createcomment', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.post('/deletecomment', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.post('/createfriendrequest', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.post('/deletefriendrequest', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.post('/acceptfriendrequest', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

router.post('/declinefriendrequest', function(req, res, next){
    console.dir(req.user);
    res.status(200).send('auth fam');
});

module.exports = router;
